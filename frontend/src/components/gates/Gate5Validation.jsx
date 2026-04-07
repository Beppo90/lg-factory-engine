import React, { useState } from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G5: Validation Report
export default function Gate5Validation({ runId, report }) {
  const { submitDecision } = useEngine();
  
  // Example dummy report if nothing passed
  const validation = report || {
    status: 'warnings_only',
    issues: [
      { pm_id: 'PM-2.6', severity: 'warning', message: 'Word count exceeded safe limits by 150 words.' },
      { pm_id: 'PM-2.8', severity: 'info', message: 'Grammar struct aligns perfectly with macrotheme.' }
    ]
  };

  const hasCritical = validation.status === 'critical_errors';

  const handleSubmit = (action) => {
    // action could be 'approve' or 'abort'
    submitDecision('G5', { confirmed: action === 'approve' });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: `1px solid ${hasCritical ? 'var(--accent-danger)' : 'var(--accent-success)'}` }}>
      <div style={{ display: 'inline-block', background: hasCritical ? 'var(--accent-danger)' : 'var(--accent-success)', color: hasCritical ? 'white' : 'black', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        GATE G5: VALIDATION REPORT
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Automated QA Engine</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        All Prompt Models generated. Deterministic checks ran across the corpus.
      </p>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        {validation.issues.map((issue, i) => (
          <div key={i} style={{ 
            marginBottom: '0.75rem', 
            paddingLeft: '0.75rem', 
            borderLeft: `3px solid ${issue.severity === 'critical' ? 'var(--accent-danger)' : issue.severity === 'warning' ? 'var(--accent-warning)' : 'var(--text-muted)'}`
          }}>
            <strong style={{ fontSize: '0.85rem' }}>{issue.pm_id}</strong>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{issue.message}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn-outline" 
          style={{ flex: 1, borderColor: 'var(--accent-danger)', color: 'var(--accent-danger)' }}
          onClick={() => handleSubmit('abort')}
        >
          Abort Generation
        </button>
        {hasCritical ? (
          <button className="btn-primary" style={{ flex: 1, background: 'var(--text-muted)' }} disabled>
            Fix Required
          </button>
        ) : (
          <button className="btn-primary" style={{ flex: 1, background: 'var(--accent-success)' }} onClick={() => handleSubmit('approve')}>
            Approve & Proceed
          </button>
        )}
      </div>
    </div>
  );
}
