import React, { useState } from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G0: Select Macrotheme (Moment 1)
export default function Gate0Macrotheme({ runId }) {
  const { submitDecision } = useEngine();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const mockThemes = [
    { id: 'theme-1', title: 'Maritime Safety Protocols', desc: 'Focuses on hazard prevention in vessels.' },
    { id: 'theme-2', title: 'Port Logistics & Tools', desc: 'Covers cargo operations and technical vocabulary.' },
    { id: 'theme-3', title: 'Navigation Instruments', desc: 'Operating advanced GPS and radar systems.' }
  ];

  const handleSubmit = () => {
    if (!selectedTheme) return;
    submitDecision('G0', { macrotheme: selectedTheme });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-primary)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        GATE G0
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Select Macrotheme</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The engine has analyzed the program data and suggests the following macrothemes. Select the foundation for the learning guides:
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {mockThemes.map(theme => (
          <button 
            key={theme.id}
            className={`btn-outline ${selectedTheme === theme.id ? 'selected' : ''}`}
            style={{ 
              textAlign: 'left', 
              borderColor: selectedTheme === theme.id ? 'var(--accent-success)' : 'var(--panel-border)',
              background: selectedTheme === theme.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
            }}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <div style={{ fontWeight: 600, color: selectedTheme === theme.id ? 'var(--accent-success)' : 'inherit' }}>
              {theme.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 'normal' }}>
              {theme.desc}
            </div>
          </button>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: selectedTheme ? 1 : 0.5, cursor: selectedTheme ? 'pointer' : 'not-allowed' }} 
        onClick={handleSubmit}
        disabled={!selectedTheme}
      >
        Confirm Selection & Continue
      </button>
    </div>
  );
}
