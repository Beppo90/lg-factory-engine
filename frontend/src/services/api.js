/**
 * Mockable API Service for interacting with the Python Engine Orchestrator.
 * Connects the frontend to the backend REST/WebSocket endpoints.
 */

const BASE_URL = 'http://localhost:8000/api';

class ApiService {
  async getEngineStatus() {
    // Mock response for now: disconnected or idle
    return { status: 'idle', connected: true };
  }

  async fetchActiveRun(runId) {
    // Fetches the entire RunState from the active session
    // Expected structure matches SPEC-003 orchestrator.RunState
    return {
      run_id: runId,
      status: 'waiting_human',
      current_moment: 2,
      current_unit: 1,
      pending_gate: 'G2', 
      pm_id: 'PM-2.1', // Example state where the engine paused at Spark Archetype
    };
  }

  async startNewRun(programConfig) {
    // Calls orchestrator initialization
    console.log("Starting a new run for program: ", programConfig);
    return { run_id: `run-${Date.now()}`, status: 'initializing' };
  }

  async submitGateDecision(runId, gateId, decisionData) {
    // Example: user selects macrotheme or archetype
    console.log(`Submitting decision to ${gateId}:`, decisionData);
    return { success: true };
  }

  async submitConfirmation(runId, confirmationId, isConfirmed) {
    // Example: user says "Yes" to C-1 (Canva Deck)
    console.log(`Submitting confirmation for ${confirmationId}:`, isConfirmed);
    return { success: true };
  }

  async pollConsoleLogs(runId) {
    // Fetches real-time log messages output by the engine (the pipeline wizard uses this)
    return [
      `[INFO] Starting Orchestrator for Run ${runId}`,
      `[INFO] PM-1.1 resolved successfully.`,
      `[WAIT] Halting at Gate G0...`
    ];
  }
}

export const api = new ApiService();
