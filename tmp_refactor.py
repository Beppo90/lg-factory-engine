import os
import re
from pathlib import Path

DIR = Path("/Users/Beppo/Projects/fpi-sena-factory/master-prompts")

subphase_mapping = {
    "PM-1.1": "1. Datos del programa",
    "PM-1.2": "2. Presentación de la guía",
    "PM-2.1": "3.1 Actividades de reflexión inicial",
    "PM-2.2": "3.2 Actividades de contextualización",
    "PM-2.3": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.4": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.5": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.6": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.7": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.8": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.9": "3.3 Actividades de apropiación del conocimiento",
    "PM-2.10": "3.3 Actividades de apropiación del conocimiento",
    "PM-3.5": "3.4 Actividades de transferencia del conocimiento",
    "PM-4.1": "4. Actividades de Evaluación",
    "PM-4.2": "4. Actividades de Evaluación",
}

for root, _, files in os.walk(DIR):
    for f in files:
        if not f.startswith("PM-") or not f.endswith(".md"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        original_content = content
        
        # 1. Remove the "## Fase X · ..." line
        content = re.sub(r'(?m)^##\s*Fase\s*\d+.*?$', '', content)
        
        # 2. Remove the "| **Fase** | X. Planeación |" row
        content = re.sub(r'(?m)^\|\s*\*\*Fase\*\*\s*\|.*?\|\r?\n', '', content)
        
        # 3. Update the Subfase guía SENA mapping
        pm_code_match = re.search(r'PM-\d\.\d+', f)
        if pm_code_match:
            pm_code = pm_code_match.group(0)
            if pm_code in subphase_mapping:
                new_subfase = subphase_mapping[pm_code]
                if "| **Subfase guía SENA** |" in content:
                    content = re.sub(
                        r'(?m)^\|\s*\*\*Subfase guía SENA\*\*\s*\|.*?\|$', 
                        f'| **Subfase guía SENA** | {new_subfase} |', 
                        content
                    )
                else:
                    # If it doesn't exist, insert it after the Nombre row
                    content = re.sub(
                        r'(?m)^(\|\s*\*\*Nombre\*\*\s*\|.*?\|)$',
                        f'\\1\n| **Subfase guía SENA** | {new_subfase} |',
                        content
                    )
                    
        # 4. Special injection for PM-1.2
        if "PM-1.2" in f:
            if "### BLOQUE 0 — PRESENTACIÓN DE LA GUÍA" not in content:
                presentation_block = """
### BLOQUE 0 — PRESENTACIÓN DE LA GUÍA (NUEVO)
0. **Presentación:** Un texto motivacional a modo de introducción dirigido al aprendiz. Describe el objeto de estudio y su importancia en el ámbito productivo. Explica cómo será la formación y cuáles son los temas principales que se van a abordar. Texto conciso, extensión máxima de diez renglones.
"""
                content = content.replace("### BLOQUE A —", presentation_block + "\n### BLOQUE A —")
        
        # 5. Special injection for PM-4.1 Feedback Loop
        if "PM-4.1" in f:
            if "FEEDBACK LOOP" not in content:
                feedback_loop = """
---

#### 🔄 5. FEEDBACK LOOP — RETROALIMENTACIÓN AL CICLO (THE SPIRAL CLOSE)

**Uso:** Este es el momento de reflexión del INSTRUCTOR (no del aprendiz). Después de aplicar los instrumentos de evaluación, el instructor analiza los resultados para alimentar el siguiente ciclo de Análisis (PM-1.1).

**Output obligatorio:**

**5A. Tres Preguntas de Reflexión Docente:**

Genera tres preguntas de reflexión que obliguen al instructor a analizar sus propios resultados de evaluación:
* Una pregunta sobre **efectividad del contenido:** ¿Los temas técnicos y el vocabulario ESP seleccionados fueron relevantes y suficientes para que los aprendices completaran las tareas?
* Una pregunta sobre **calibración del nivel:** ¿El nivel de dificultad lingüístico (A1/A2) fue apropiado? ¿Hubo frustración excesiva o, al contrario, la tarea fue demasiado fácil?
* Una pregunta sobre **transferencia real:** ¿Los aprendices demostraron capacidad de usar lo aprendido en un contexto que se acerque a su realidad laboral, o solo reprodujeron mecánicamente?

**5B. Tabla de Retroalimentación al Ciclo:**

Genera una tabla con el siguiente formato:

| ¿Qué funcionó bien? | ¿Qué brecha persiste? | ¿Qué ajustar en el PM-1.1 del próximo ciclo? |
|---|---|---|
| *(Ej: El vocabulario de troubleshooting fue altamente motivacional y los aprendices lo retuvieron)* | *(Ej: La simulación oral reveló que los aprendices no lograron formular preguntas, solo responder)* | *(Ej: En el próximo ciclo, incluir "Question Formation" como función comunicativa prioritaria desde el PM-1.2)* |
| | | |
| | | |

**5C. Declaración de Cierre Circular:**

Incluye la siguiente nota al pie del instrumento:

*"Los hallazgos de esta tabla alimentan directamente la Fase 1 — Análisis del siguiente ciclo formativo. El instructor debe revisar el PM-1.1 (Ruta Macrotemática) y el PM-1.2 (Scope & Sequence) a la luz de estos resultados antes de iniciar la planeación de la siguiente guía o del siguiente grupo."*
"""
                content = content + feedback_loop
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Updated {f}")

print("Batch replace completed successfully.")
