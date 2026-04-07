import React from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G4: Final Mission Design Approval
export default function Gate4Mission({ runId }) {
  const { submitDecision } = useEngine();

  const handleResponse = (isConfirmed) => {
    submitDecision('G4', { confirmed: isConfirmed });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-primary)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        GATE G4
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Final Mission Design Review</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The orchestrator has designed the Final Mission for this learning sequence. Please review the blueprint parameters in the output. Should we continue to build out the mission?
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn-outline" 
          style={{ flex: 1, borderColor: 'var(--accent-warning)', color: 'var(--accent-warning)' }}
          onClick={() => handleResponse(false)}
        >
          Reject Mission
        </button>
        <button 
          className="btn-primary" 
          style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-primary), #3b82f6)' }}
          onClick={() => handleResponse(true)}
        >
          Approve Design
        </button>
      </div>
    </div>
  );
}
