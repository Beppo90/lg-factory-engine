import React, { useState } from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G1: Text Selection (Moment 2)
export default function Gate1TextSelection({ runId, curatedSources = [] }) {
  const { submitDecision } = useEngine();
  const [selectedSources, setSelectedSources] = useState([]);

  // Mock data if none passed
  const sources = curatedSources.length > 0 ? curatedSources : [
    { id: 'src-1', title: 'The Disastrous Mooring Incident', author: 'Luis Herrera', type: 'Story A' },
    { id: 'src-2', title: 'Radar Failure in the Storm', author: 'Captain Jane', type: 'Story B' },
    { id: 'src-3', title: 'Routine Inspection Audit', author: 'Inspector Gadget', type: 'Story C' }
  ];

  const toggleSource = (id) => {
    setSelectedSources(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const handleSubmit = () => {
    if (selectedSources.length !== 2) return;
    submitDecision('G1', { sources: selectedSources });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-success)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-success)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000' }}>
        GATE G1
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Curated Source Selection</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The orchestrator found 3 candidate texts. Select exactly 2 to serve as the narrative foundation (Story A and Story B).
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {sources.map(src => (
          <button 
            key={src.id}
            className="btn-outline"
            style={{ 
              textAlign: 'left', 
              borderColor: selectedSources.includes(src.id) ? 'var(--accent-success)' : 'var(--panel-border)',
              background: selectedSources.includes(src.id) ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
            }}
            onClick={() => toggleSource(src.id)}
          >
            <div style={{ fontWeight: 600, color: selectedSources.includes(src.id) ? 'var(--accent-success)' : 'inherit' }}>
              {src.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 'normal' }}>
              {src.author} — {src.type}
            </div>
          </button>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: selectedSources.length === 2 ? 1 : 0.5, cursor: selectedSources.length === 2 ? 'pointer' : 'not-allowed' }} 
        onClick={handleSubmit}
        disabled={selectedSources.length !== 2}
      >
        {selectedSources.length === 2 ? "Confirm Stories" : `Select ${2 - selectedSources.length} more`}
      </button>
    </div>
  );
}
