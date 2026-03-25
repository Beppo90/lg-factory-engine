import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const EngineContext = createContext(null);

export function EngineProvider({ children }) {
  const [engineStatus, setEngineStatus] = useState('disconnected');
  const [activeRun, setActiveRun] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Check connection status periodically
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.getEngineStatus();
        setEngineStatus(res.connected ? 'connected' : 'disconnected');
      } catch (err) {
        setEngineStatus('disconnected');
      }
    };
    checkStatus();
    const int = setInterval(checkStatus, 10000);
    return () => clearInterval(int);
  }, []);

  // Poll for run updates if we have an active run
  useEffect(() => {
    if (!activeRun) return;
    
    const pollState = async () => {
      try {
        const latestState = await api.fetchActiveRun(activeRun.run_id);
        setActiveRun(latestState);
        
        // Also fetch console logs
        const logs = await api.pollConsoleLogs(activeRun.run_id);
        setConsoleLogs(logs);
      } catch (err) {
        console.error("Failed to poll run state", err);
      }
    };
    
    pollState();
    const int = setInterval(pollState, 3000); // UI poll explicitly 3s
    return () => clearInterval(int);
  }, [activeRun?.run_id]);

  const startPipeline = useCallback(async (programId) => {
    setConsoleLogs([]); // Clear logs on start
    const newRun = await api.startNewRun({ program: programId });
    setActiveRun(newRun);
  }, []);

  const submitDecision = useCallback(async (gateId, data) => {
    if (!activeRun) return;
    await api.submitGateDecision(activeRun.run_id, gateId, data);
    // Optimistically update status so UI hides gate
    setActiveRun(prev => ({ ...prev, status: 'running', pending_gate: null }));
  }, [activeRun]);

  const cancelRun = useCallback(() => {
    setActiveRun(null);
  }, []);

  return (
    <EngineContext.Provider value={{
      engineStatus,
      activeRun,
      consoleLogs,
      startPipeline,
      submitDecision,
      cancelRun,
    }}>
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
}
