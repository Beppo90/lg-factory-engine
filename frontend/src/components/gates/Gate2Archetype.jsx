import React, { useState } from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G2: Archetype Selection (Moment 3)
export default function Gate2Archetype({ runId, pmId = "PM-2.5", pmName = "Literacy & Vocabulary" }) {
  const { submitDecision } = useEngine();
  const [selectedArchetype, setSelectedArchetype] = useState(null);

  const mockArchetypes = [
    { id: 'arch-1', title: 'The Visual Decoder', desc: 'Heavy on diagrams, labeling, and spatial correlation.' },
    { id: 'arch-2', title: 'The Technical Translator', desc: 'Focuses on translation memory, cognates, and definition mapping.' },
  ];

  const handleSubmit = () => {
    if (!selectedArchetype) return;
    submitDecision('G2', { pmId, archetype: selectedArchetype });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-secondary)' }}>
      <div style={{ display: 'inline-block', background: 'var(--accent-secondary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
        GATE G2
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Select Pedagogical Archetype</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The orchestrator is generating <strong>{pmId} — {pmName}</strong>. Choose the instructional archetype to inject.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {mockArchetypes.map(arch => (
          <button 
            key={arch.id}
            className="btn-outline"
            style={{ 
              textAlign: 'left', 
              borderColor: selectedArchetype === arch.id ? 'var(--accent-secondary)' : 'var(--panel-border)',
              background: selectedArchetype === arch.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent'
            }}
            onClick={() => setSelectedArchetype(arch.id)}
          >
            <div style={{ fontWeight: 600, color: selectedArchetype === arch.id ? '#c4b5fd' : 'inherit' }}>
              {arch.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 'normal' }}>
              {arch.desc}
            </div>
          </button>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: selectedArchetype ? 1 : 0.5, cursor: selectedArchetype ? 'pointer' : 'not-allowed' }} 
        onClick={handleSubmit}
        disabled={!selectedArchetype}
      >
        Inject & Generate
      </button>
    </div>
  );
}
