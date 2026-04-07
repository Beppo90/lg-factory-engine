import React from 'react';

export default function TelemetryHUD({ tokens = 0, apiCalls = 0, cost = 0 }) {
  return (
    <div className="glass-panel" style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '1rem 1.5rem', marginBottom: '1.5rem',
      background: 'rgba(20, 20, 25, 0.6)',
      border: '1px solid rgba(80, 80, 100, 0.3)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'rgba(100, 150, 255, 0.15)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: '#64a0ff'
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>T</span>
        </div>
        <div>
          <h5 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token Workload</h5>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
            {tokens.toLocaleString()}
          </span>
        </div>
      </div>

      <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.1)' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'rgba(150, 255, 150, 0.15)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: '#82f5b6'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>📡</span>
        </div>
        <div>
          <h5 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>API Prompts</h5>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
            {apiCalls} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>calls</span>
          </span>
        </div>
      </div>

      <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.1)' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'rgba(255, 180, 100, 0.15)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: '#ffb464'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$</span>
        </div>
        <div>
          <h5 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Est. Cost</h5>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffb464' }}>
            <span style={{ fontSize: '0.95rem' }}>$</span>{cost.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}
