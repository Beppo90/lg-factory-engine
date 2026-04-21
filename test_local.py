print("Importing modules...")
import asyncio
import json
import logging
import traceback
from pathlib import Path
import os
import sys
print("sys path...")
sys.path.insert(0, "/Users/Beppo/Projects/fpi-sena-factory")

print("Importing from engine...")
from engine.models import RunStatus
print("Importing from api...")
from api import _load_program_config, STATE_MANAGER, _run_pipeline_background
print("Imports done.")

logging.basicConfig(level=logging.DEBUG)

def get_dummy_program():
    # Force units to empty so it tests the start phase
    program_config = _load_program_config("ADSO")
    program_config.units = []
    return program_config

async def run_test():
    try:
        program_config = get_dummy_program()
        print("Program loaded successfully.")
    except Exception as e:
        print(f"Error loading program: {e}")
        return

    try:
        state = STATE_MANAGER.create_run(program_config.id)
        state.program = program_config
        state.status = RunStatus.RUNNING
        STATE_MANAGER.save(state)
        print(f"Run created. Testing pipeline for {state.run_id}...")
        
        await _run_pipeline_background(
            run_id=state.run_id,
            program_config=program_config,
            dry_run=True, # Prevent API calls to test logic
            profile=None,
            provider="google"
        )
        
        final_state = STATE_MANAGER.get_run(state.run_id)
        print(f"Pipeline finished! Final state: {final_state.status}")
        if final_state.errors:
            print("Captured errors in state:")
            for e in final_state.errors:
                print(e)
                
    except Exception as e:
        print("Uncaught exception!")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(run_test())
