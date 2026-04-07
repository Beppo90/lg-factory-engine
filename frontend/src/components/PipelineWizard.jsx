import React from 'react';
import { useEngine } from '../context/EngineContext';

import ConsoleLog from './ConsoleLog';
import Gate0Macrotheme from './gates/Gate0Macrotheme';
import Gate1TextSelection from './gates/Gate1TextSelection';
import Gate2Archetype from './gates/Gate2Archetype';
import Gate3Transversal from './gates/Gate3Transversal';
import Gate4Mission from './gates/Gate4Mission';
import Gate5Validation from './gates/Gate5Validation';
import Gate6Export from './gates/Gate6Export';
import ConfirmationPrompt from './confirmations/ConfirmationPrompt';

export default function PipelineWizard() {
  const { activeRun, consoleLogs, cancelRun } = useEngine();
  
  const renderInteractionLayer = () => {
    if (activeRun?.status === 'waiting_confirmation') {
      return <ConfirmationPrompt runId={activeRun.run_id} confirmationId={activeRun.pending_confirmation} />;
    }

    if (activeRun?.status !== 'waiting_human' || !activeRun?.pending_gate) {
      return (
        <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
          <p>Processing Orchestrator Queue...</p>
        </div>
      );
    }
    
    switch (activeRun.pending_gate) {
      case 'G0': return <Gate0Macrotheme runId={activeRun.run_id} />;
      case 'G1': return <Gate1TextSelection runId={activeRun.run_id} />;
      case 'G2': return <Gate2Archetype runId={activeRun.run_id} pmId={activeRun.pm_id} />;
      case 'G3': return <Gate3Transversal runId={activeRun.run_id} />;
      case 'G4': return <Gate4Mission runId={activeRun.run_id} />;
      case 'G5': return <Gate5Validation runId={activeRun.run_id} report={activeRun.validation_report} />;
      case 'G6': return <Gate6Export runId={activeRun.run_id} manifest={activeRun.manifest} />;
      default:
        return (
          <div className="glass-panel animate-fade-in">
            <h4 style={{ color: 'var(--accent-warning)' }}>Unsupported Gate: {activeRun.pending_gate}</h4>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '2rem' }}>
      
      {/* Left Column: Pipeline Execution Console */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Pipeline Execution: <span className="text-gradient">Moment {activeRun?.current_moment || '?'}</span></h2>
          <button className="btn-outline" onClick={cancelRun}>Abort Run</button>
        </div>

        <ConsoleLog 
          logs={consoleLogs} 
          isActive={activeRun?.status !== 'waiting_human' && activeRun?.status !== 'waiting_confirmation'} 
        />
      </section>

      {/* Right Column: Interaction Layer */}
      <section>
        <h3 style={{ marginBottom: '1rem' }}>Human Interaction layer</h3>
        {renderInteractionLayer()}
      </section>
      
    </div>
  );
}
