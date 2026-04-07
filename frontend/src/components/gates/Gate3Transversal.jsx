import React from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G3: Transversal Function Map Approval
export default function Gate3Transversal({ runId }) {
  const { submitDecision } = useEngine();

  const handleResponse = (isConfirmed) => {
    submitDecision('G3', { confirmed: isConfirmed });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-primary)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        GATE G3
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Transversal Function Map Review</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The orchestrator has drafted the transversal skills map aligning the chosen archetypes, language tasks, and the selected texts. Please review the map in the output folder. Does it meet expectations?
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn-outline" 
          style={{ flex: 1, borderColor: 'var(--accent-warning)', color: 'var(--accent-warning)' }}
          onClick={() => handleResponse(false)}
        >
          Reject Map
        </button>
        <button 
          className="btn-primary" 
          style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-primary), #3b82f6)' }}
          onClick={() => handleResponse(true)}
        >
          Approve Map
        </button>
      </div>
    </div>
  );
}
