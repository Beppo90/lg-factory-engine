import React, { useState, useEffect } from 'react';
import { useEngine } from '../context/EngineContext';
import PipelineWizard from './PipelineWizard';
import { api } from '../services/api';

export default function Dashboard() {
  const { engineStatus, activeRun, startPipeline } = useEngine();
  const [programId, setProgramId] = useState('maritime-g1');
  const [availablePrograms, setAvailablePrograms] = useState([]);

  useEffect(() => {
    async function loadPrograms() {
      const progs = await api.getPrograms();
      setAvailablePrograms(progs);
      if (progs.length > 0) {
        setProgramId(progs[0].id);
      }
    }
    if (engineStatus === 'connected') {
      loadPrograms();
    }
  }, [engineStatus]);

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
              width: '64px', height: '64px', background: 'white', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 1.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <img 
                src="/sena-logo-green.svg" 
                alt="SENA" 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
              />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fábrica de Guías ESP (English for Specific Purposes)</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              Transforma el inglés general en inglés técnico en segundos. Ingresa tu red o especialidad (Ej: <strong>software-dev</strong>) y nuestro sistema de 20 Prompts Maestros procesará la solicitud para exportar al instante un ecosistema ESP completo: Guía de Aprendizaje, Playbook e Instrumentos de Evaluación.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              {availablePrograms.length > 0 ? (
                <select 
                  value={programId} 
                  onChange={(e) => setProgramId(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.5)',
                    color: 'white', fontSize: '1.1rem', width: '250px', outline: 'none'
                  }}
                >
                  {availablePrograms.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  value={programId} 
                  onChange={(e) => setProgramId(e.target.value)} 
                  placeholder="e.g. maritime-g1"
                  style={{
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.5)',
                    color: 'white', fontSize: '1.1rem', width: '250px', outline: 'none'
                  }}
                />
              )}
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
