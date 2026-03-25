import React from 'react';
import { useEngine } from '../../context/EngineContext';

// Generic Optional Product Confirmation Prompt
export default function ConfirmationPrompt({ runId, confirmationId = "C-1", productName = "Canva Deck Specs (PM-3.3)" }) {
  const { submitDecision } = useEngine();

  const handleResponse = (isConfirmed) => {
    submitDecision(confirmationId, { confirmed: isConfirmed });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-warning)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-warning)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', color: 'black' }}>
        CONFIRMATION {confirmationId}
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Generate Optional Document?</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The learning guide generated successfully. Do you want the engine to build the <strong>{productName}</strong>?
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn-outline" 
          style={{ flex: 1 }}
          onClick={() => handleResponse(false)}
        >
          No, Skip
        </button>
        <button 
          className="btn-primary" 
          style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-warning), #d97706)' }}
          onClick={() => handleResponse(true)}
        >
          Yes, Generate
        </button>
      </div>
    </div>
  );
}
