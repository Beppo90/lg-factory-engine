import React, { useState } from 'react';

export default function ProgramBuilderModal({ programId, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('técnica');
  const [cefr, setCefr] = useState('A2.1');
  const [macrotheme, setMacrotheme] = useState('');
  const [domain, setDomain] = useState('software');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: programId, name, type, cefr, macrotheme, domain });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '600px', maxWidth: '90vw' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Generar Nuevo Programa</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          No se encontró el programa pre-ensamblado <strong>{programId}</strong>. Ingresa estos datos <i>semilla</i> para que la IA construya el currículo desde cero ("Zero-to-Hero").
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Nombre del Programa</label>
            <input 
              required
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ej. Análisis y Desarrollo de Software"
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Tipo</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                <option value="técnica">Técnica (5 Unidades)</option>
                <option value="tecnología">Tecnología (10 Unidades)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Nivel CEFR</label>
              <select value={cefr} onChange={e => setCefr(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                <option value="A1.1">A1.1</option>
                <option value="A1.2">A1.2</option>
                <option value="A2.1">A2.1</option>
                <option value="A2.2">A2.2</option>
                <option value="B1.1">B1.1</option>
                <option value="B1.2">B1.2</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Dominio</label>
              <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="Ej. software" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Insumo del Diseño Curricular</label>
            <textarea 
              required
              rows={5}
              value={macrotheme} 
              onChange={e => setMacrotheme(e.target.value)} 
              placeholder="Pega aquí los temas base, competencias técnicas o cualquier requerimiento del programa..."
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: 'var(--radius-md)', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onCancel} className="btn-outline">Cancelar</button>
            <button type="submit" className="btn-primary">Sintetizar & Arrancar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
