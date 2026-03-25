import React, { useState } from 'react';
import { useEngine } from '../context/EngineContext';
import PipelineWizard from './PipelineWizard';

export default function Dashboard() {
  const { engineStatus, activeRun, startPipeline } = useEngine();
  const [programId, setProgramId] = useState('maritime-g1');

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>FPI SENA Factory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Automated English Curriculum Engine
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'var(--panel-bg)', padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)', border: '1px solid var(--panel-border)' 
          }}>
            <span style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              background: engineStatus === 'connected' ? 'var(--accent-success)' : 'var(--accent-warning)', 
              boxShadow: engineStatus === 'connected' ? '0 0 10px var(--accent-success)' : 'none'
            }}></span>
            {engineStatus === 'connected' ? 'Engine Connected' : 'Engine Idle/Disconnected'}
          </span>
        </div>
      </header>

      {!activeRun ? (
        <main className="animate-fade-in">
          <section className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', height: '64px', background: 'var(--accent-primary)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 1.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Start Generation Pipeline</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Enter the target Program ID. Ensure its configuration file exists in the \`config/programs/\` directory.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <input 
                type="text" 
                value={programId} 
                onChange={(e) => setProgramId(e.target.value)} 
                placeholder="e.g. software-dev"
                style={{
                  padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.5)',
                  color: 'white', fontSize: '1.1rem', width: '250px', outline: 'none'
                }}
              />
              <button 
                className="btn-primary" 
                style={{ fontSize: '1.1rem' }} 
                onClick={() => startPipeline(programId)}
                disabled={!programId.trim()}
              >
                Launch Engine
              </button>
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: '1rem' }}>Recent Factory Runs</h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              <div className="glass-panel" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0 }}>enfermeria-g1</h4>
                  <span style={{ color: 'var(--accent-success)', fontSize: '0.85rem' }}>Complete</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>run-mock-12345</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <PipelineWizard />
      )}
    </div>
  );
}
