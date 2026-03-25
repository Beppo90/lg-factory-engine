import React, { useEffect, useRef } from 'react';

export default function ConsoleLog({ logs, isActive }) {
  const logsEndRef = useRef(null);
  
  // Auto scroll terminal to the bottom whenever logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="glass-panel" style={{ 
      background: '#04060b', 
      fontFamily: 'monospace', 
      color: 'var(--accent-success)',
      height: '550px',
      overflowY: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      padding: '1.25rem 1.5rem',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flexGrow: 1 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '0.2rem', wordBreak: 'break-all' }}>{log}</div>
        ))}
        {isActive && <div className="blinking-cursor">_</div>}
      </div>
      <div ref={logsEndRef} />
      
      <style>{`
        .blinking-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
