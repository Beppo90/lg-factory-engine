/**
 * API Service for interacting with the Python Engine Orchestrator
 * Connects the frontend to the backend REST/FastAPI endpoints.
 */

const BASE_URL = '/api';

class ApiService {
  async getEngineStatus() {
    try {
      const resp = await fetch(`${BASE_URL}/health`);
      if (!resp.ok) return { status: 'disconnected', connected: false };
      return { status: 'idle', connected: true };
    } catch (e) {
      return { status: 'disconnected', connected: false };
    }
  }

  async getPrograms() {
    try {
      const resp = await fetch(`${BASE_URL}/programs`);
      if (!resp.ok) return [];
      return await resp.json();
    } catch {
      return [];
    }
  }

  async fetchActiveRun(runId) {
    const resp = await fetch(`${BASE_URL}/runs/${runId}`);
    if (!resp.ok) throw new Error('Failed to fetch run status');
    return await resp.json();
  }

  async startNewRun(programConfig) {
    const resp = await fetch(`${BASE_URL}/runs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        program_id: programConfig.program, 
        provider: 'google',
        dry_run: false
      })
    });
    if (!resp.ok) {
        if (resp.status === 404) {
            alert(`Error: The program requested ("${programConfig.program}") does not exist in the backend config/programs/ directory.`);
        }
        const text = await resp.text();
        console.error(`Status: ${resp.status}, Text: ${text}`);
        throw new Error(`Failed to start pipeline: ${resp.status} ${text}`);
    }
    return await resp.json();
  }

  async submitGateDecision(runId, gateId, decisionData) {
    let endpoint = `${BASE_URL}/runs/${runId}/gate/${gateId}`;
    if (gateId === 'G2') {
        endpoint = `${BASE_URL}/runs/${runId}/gate/G2/${decisionData.pm_id || 'PM-2.1'}`;
    }
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisionData)
    });
    if (!resp.ok) throw new Error(`Failed to submit decision to ${gateId}`);
    return await resp.json();
  }

  async submitConfirmation(runId, confirmationId, isConfirmed) {
    const resp = await fetch(`${BASE_URL}/runs/${runId}/confirm/${confirmationId}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ confirmed: isConfirmed })
    });
    if (!resp.ok) throw new Error(`Failed to submit confirmation to ${confirmationId}`);
    return await resp.json();
  }

  async pollConsoleLogs(runId) {
    try {
       const resp = await fetch(`${BASE_URL}/runs/${runId}`);
       if (!resp.ok) return [];
       const data = await resp.json();
       const logs = [];
       logs.push(`[INFO] Run connected: ${runId}`);
       logs.push(`[INFO] Status: ${data.status}`);
       if (data.current_pm && data.status === 'running') logs.push(`[WORK] Generating: ${data.current_pm}`);
       if (data.pending_gate) logs.push(`[WAIT] Halting at Gate ${data.pending_gate}...`);
       if (data.errors && data.errors.length) {
           data.errors.forEach(e => logs.push(`[ERR] ${e.pm_id}: ${e.message}`));
       }
       return logs;
    } catch {
       return [];
    }
  }
}

export const api = new ApiService();
