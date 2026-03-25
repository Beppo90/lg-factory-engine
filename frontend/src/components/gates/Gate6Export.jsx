import React from 'react';
import { useEngine } from '../../context/EngineContext';

// Presenting G6: Export Confirmation
export default function Gate6Export({ runId, manifest = [] }) {
  const { submitDecision } = useEngine();

  // Mock manifest if none passed
  const files = manifest.length > 0 ? manifest : [
    'GFPI-F-135-learner.docx',
    'Instructor-Playbook.docx',
    'quiz-ie-01.docx',
    'workbook-autonomous.docx',
    'canva-specs.docx'
  ];

  return (
    <div className="glass-panel animate-fade-in" style={{ border: '1px solid #c084fc' }}>
      <div style={{ display: 'inline-block', background: '#c084fc', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
        GATE G6: EXPORT PIPELINE
      </div>
      
      <h4 style={{ marginBottom: '1rem' }}>Final Export Manifest</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Validation passed. The following documents are ready to be compiled to your disk.
      </p>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
        {files.map((file, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--accent-success)' }}>✓</span> {file}
          </div>
        ))}
      </div>

      <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #c084fc, #9333ea)' }} onClick={() => submitDecision('G6', { confirmed: true })}>
        Compile & Export to output/
      </button>
    </div>
  );
}
