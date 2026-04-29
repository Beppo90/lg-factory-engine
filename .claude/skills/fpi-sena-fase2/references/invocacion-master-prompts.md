# Invocación de Master Prompts → Subagentes — Cadena Ejecutable Fase 2

Este documento cierra el gap arquitectónico detectado por Sergio el 2026-04-29: los master prompts PM-2.0 a PM-2.11 NO son referencia pasiva del orquestador · **son la INSTRUCCIÓN ejecutable principal de cada subagente**.

---

## Principio arquitectónico fundamental

> Cada master prompt PM-2.X es el contexto operacional principal del subagente PM-2.X · NO es documentación humana. El orquestador inyecta el TEXTO COMPLETO del master prompt al subagente vía Task tool · el subagente lo USA literal como su contrato de generación.

**Consecuencia 1:** sin master prompt cargado, el subagente improvisa sin canon · genera contenido que no respeta arquetipos, dependencias, estructura de Activity Card, ni reglas operacionales.

**Consecuencia 2:** los 11 master prompts viven como artefactos canónicos en `master-prompts/PM-*.md` · el orquestador los lee UNA VEZ en pre-flight (REGLA 19 PASOS A-K) y los mantiene en su contexto · al lanzar cada subagente, le PASA el texto del master prompt correspondiente como input principal.

**Consecuencia 3:** cuando un master prompt se actualiza (ej. PM-2.1 v2.0 → v3.0 · 2026-04-28), TODOS los subagentes futuros automáticamente operan con la nueva versión sin necesidad de reescribir la skill. La skill versiona indirectamente vía sus master prompts referenciados.

---

## Tabla de mapeo — qué subagente carga qué master prompt y cuándo

| Subagente | Master prompt cargado (path completo) | Versión vigente | Sub-fase del orquestador | Nivel de paralelización |
|---|---|---|---|---|
| **PM-2.0 architect** | `master-prompts/PM-2.0 — RAP Session Architect.md` | v2.6 | Sub-fase 2A | Único · primero |
| **PM-2.1 spark** | `master-prompts/PM-2.1 — The Spark — Reflexión Inicial.md` | **v3.0** | Sub-fase 2D · Nivel 1 (S1) | Secuencial dentro de S1 · paralelo entre guías |
| **PM-2.2 gap** | `master-prompts/PM-2.2 — Gap Analysis — Contextualización.md` | **v3.0** | Sub-fase 2D · Nivel 1 (S1) | Después de PM-2.1 · paralelo entre guías |
| **PM-2.3 reading** | `master-prompts/PM-2.3 — Reading — The Master Anchor.md` | v2.0 | Sub-fase 2D · Nivel 2 (S2) | **PRIMERO** · es productor del Master Anchor Text |
| **PM-2.5 vocabulary** | `master-prompts/PM-2.5 — Literacy & Vocabulary Skills.md` | v2.0 | Sub-fase 2D · Nivel 2 (S2) | Después de PM-2.3 · CONSUME el Master Anchor |
| **PM-2.10 grammar (S3)** | `master-prompts/PM-2.10 — Grammar — Structure Use.md` | v2.0 | Sub-fase 2D · Nivel 3 (S3) | **PRIMERO** · es productor de Grammar targets |
| **PM-2.4 writing** | `master-prompts/PM-2.4 — Writing — Task-Based.md` | v2.0 | Sub-fase 2D · Nivel 3 (S3) | Después de PM-2.10 · CONSUME Grammar targets |
| **PM-2.6 listening** | `master-prompts/PM-2.6 — Listening — The Auditory Anchor.md` | v2.0 | Sub-fase 2D · Nivel 4 (S4) | Paralelo a PM-2.8 |
| **PM-2.8 speaking** | `master-prompts/PM-2.8 — Speaking — The Mission.md` | v2.0 | Sub-fase 2D · Nivel 4 (S4) | Paralelo a PM-2.6 (PM-2.7 deprecated · funcionalidad en PM-2.8) |
| **PM-2.9 functions** | `master-prompts/PM-2.9 — Language Functions — Communicative Competence.md` | v2.0 | Sub-fase 2D · Nivel 5 (S5) | Único en S5 · paralelo entre guías |
| **PM-2.11 assembler** | `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` | **v2.6.3** | Sub-fase 2E | ÚLTIMO · ensambla + 16 checks |

**Adicionales (PMs mecánicos no de Fase 2 generación de actividades):**

| Subagente | Master prompt | Cuándo |
|---|---|---|
| PM-4.1 instruments derivador | `master-prompts/PM-4.1 — Instrumentos de Evaluación Formativa.md` | Sub-fase 2E · paralelo a PM-2.11 |
| PM-4.2 cuestionario S6 | `master-prompts/PM-4.2 — Cuestionario Técnico — Evidencia de Conocimiento.md` | Sub-fase 2E · paralelo a PM-2.11 |

---

## Cómo el orquestador inyecta el master prompt al subagente

### Patrón canónico (pseudocódigo)

```python
# El orquestador YA leyó los 11 master prompts en pre-flight (REGLA 19 PASOS A-K)
# Los mantiene en memoria orquestadora

def lanzar_subagente_pm(pm_id, run_id, guide_id, sesion_id):
    # 1. Cargar master prompt completo del PM correspondiente
    master_prompt_path = f"master-prompts/PM-{pm_id} — *.md"
    master_prompt_text = read_file(master_prompt_path)
    
    # 2. Cargar inputs específicos del subagente
    pm0_context = read_json(f"runs/{run_id}/pm-0-context.json")
    pm12 = read_json(f"runs/{run_id}/{guide_id}/pm-1-2.json")
    pm20 = read_json(f"runs/{run_id}/pm-2-0.json")
    arquetipos_elegidos = read_json(f"runs/{run_id}/arquetipos-elegidos.json")
    
    # 3. Cargar ref operacional más cercana (ground truth)
    ref_op_path = f"runs/MGV-2026-04-20/pm-{pm_id}.json"  # o DIESEL según estilo
    ref_op = read_json(ref_op_path)
    
    # 4. Cargar previous_pms si los hay (cadena dentro de la sesión)
    prev_pms = obtener_chain_previa(sesion_id, pm_id)
    
    # 5. Lanzar Task tool con master prompt como instrucción principal
    return Task(
        description=f"Generar Activity Card PM-{pm_id} para guía {guide_id}",
        subagent_type="general-purpose",
        prompt=f"""
        Eres el subagente PM-{pm_id} del orquestador fpi-sena-fase2.
        
        TU CONTRATO DE GENERACIÓN (master prompt canónico · LEE COMPLETO ANTES DE GENERAR):
        ---
        {master_prompt_text}
        ---
        
        TUS INPUTS PARA ESTA INVOCACIÓN:
        - Estilo declarado por instructor: {arquetipos_elegidos['elecciones'][pm_id]['estilo']}
        - Arquetipos seleccionados: {arquetipos_elegidos['elecciones'][pm_id]}
        - pm-0-context: {pm0_context}
        - pm-1-2: {pm12}
        - pm-2-0 blueprint: {pm20}
        - previous_pms_chain: {prev_pms}
        
        REF OPERACIONAL (ground truth · usa como guía de calidad NO como copia):
        - {ref_op_path}: {ref_op}
        
        DELIVERABLE:
        - Activity Card según el schema definido en el master prompt
        - Marcar enriched: false (espera Instructor Selection)
        - NO improvises fuera del master prompt · NO inventes campos
        - SI tienes duda, sigue el master prompt literal
        - SI hay ramificación (PM-2.1/PM-2.2 v3.0 con 2 modos), ramifica según `estilo` declarado
        
        Output: archivo JSON pm-{pm_id}.json con la Activity Card completa.
        """
    )
```

### Por qué el master prompt va EN el prompt del Task tool

- **El subagente NO tiene acceso a `master-prompts/`** — vive en su propio contexto aislado
- El orquestador es quien tiene acceso al sistema de archivos
- El master prompt debe viajar como TEXTO en el prompt del Task tool, no como path
- Si el orquestador solo pasa el path "lee `master-prompts/PM-2.3.md`", el subagente puede no tener acceso · puede improvisar

---

## Ramificación específica para PM-2.1 v3.0 y PM-2.2 v3.0 (2 modos canonizados)

PM-2.1 v3.0 y PM-2.2 v3.0 documentan 2 modos legítimos. El subagente ramifica según el `estilo` declarado en `arquetipos-elegidos.json`:

```python
# Pseudocódigo dentro del subagente PM-2.1
estilo = arquetipos_elegidos['elecciones']['PM-2.1']['estilo']

if estilo == "mgv_compendio_metodologico":
    # MODO DEFAULT — single archetype "The Narrative Scenario"
    # Estructura interna fija: EXPLORE / ENGAGE / DISCOVER (ver master prompt §63-86)
    archetypes_to_implement = ["NARRATIVE_SCENARIO"]
    # Generar 1 Activity Card con 3 sub-actividades
    
elif estilo == "diesel_secuencia_encadenada":
    # MODO EXTENSIBLE — N arquetipos como momentos secuenciales
    # Estructura: 4 momentos cada uno con su archetype específico
    archetypes_to_implement = arquetipos_elegidos['elecciones']['PM-2.1']['archetype_used']
    archetype_mode = arquetipos_elegidos['elecciones']['PM-2.1']['archetype_mode']
    # Generar 1 Activity Card con N momentos · cada momento.archetype específico
```

**Crítico:** sin el master prompt v3.0 cargado completo, el subagente puede pensar que PM-2.1 sigue siendo v2.0 ("DETONANTE ÚNICO") y NO ramifica · pierde el modo extensible canonizado por Sergio.

---

## Cadena de inputs por subagente (qué necesita cada uno · referencia rápida)

| Subagente | Master prompt | + Inputs |
|---|---|---|
| PM-2.0 | `PM-2.0` v2.6 | pm-0-context · pm-1-1 · pm-1-2 (todos los del run) |
| PM-2.1 | `PM-2.1` **v3.0** | pm-0 · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.1] · stories curadas (Story A) |
| PM-2.2 | `PM-2.2` **v3.0** | pm-0 · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.2] · previous_pms[PM-2.1] |
| PM-2.3 | `PM-2.3` v2.0 | pm-0 · pm-1-2 (Story A asignada) · pm-2-0 · arquetipos-elegidos[PM-2.3] |
| PM-2.5 | `PM-2.5` v2.0 | pm-0 · pm-1-2 (Toolbelt 20) · pm-2-0 · arquetipos-elegidos[PM-2.5] · **previous_pms[PM-2.3] con Master Anchor** |
| PM-2.10 (S3) | `PM-2.10` v2.0 | pm-0 (silabus 17) · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.10] |
| PM-2.4 | `PM-2.4` v2.0 | pm-0 · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.4] · **previous_pms[PM-2.10] con Grammar targets** |
| PM-2.6 | `PM-2.6` v2.0 | pm-0 · pm-1-2 (Story B asignada) · pm-2-0 · arquetipos-elegidos[PM-2.6] |
| PM-2.8 | `PM-2.8` v2.0 | pm-0 · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.8] |
| PM-2.9 | `PM-2.9` v2.0 | pm-0 · pm-1-2 · pm-2-0 · arquetipos-elegidos[PM-2.9] |
| PM-2.10 (S5) | `PM-2.10` v2.0 | mismo + previous_pms[PM-2.10 S3] (consolidación) |
| PM-2.11 | `PM-2.11` **v2.6.3** | TODOS los pm-2-X.json + pm-1-2 (cols 1-5 GFPI) + pm-2-0 |

---

## Anti-patrón crítico — "Subagente improvisa sin master prompt cargado"

**Síntoma:** Claude (en rol de subagente PM-2.X) recibe inputs (pm-0-context, pm-1-2, etc.) pero NO recibe el master prompt completo. Genera Activity Card improvisando estructura, arquetipos, dependencias.

**Problema:** sin master prompt, el subagente NO sabe:
- Qué arquetipos válidos existen para ese PM (los inventa)
- Cómo estructurar la Activity Card (Schema canónico)
- Qué reglas operacionales aplicar (ej. PM-2.1 v3.0 ramificación 2 modos)
- Qué dependencias respetar (PM-2.5 debe consumir Master Anchor de PM-2.3)
- Qué evidencia formal generar (PM-2.3 = E1 Reading · PM-2.4 = E2 Writing · etc.)

**Caso histórico hipotético:** orquestador lanza subagente PM-2.5 con solo pm-0 + pm-1-2 + pm-2-0. NO le pasa master prompt PM-2.5. NO le pasa previous_pms[PM-2.3]. El subagente improvisa una Activity Card de vocabulario sin Master Anchor base · vocabulario inventado · arquetipos inventados. PM-2.11 detecta inconsistencia en Check 8 (V+O+C) o Check 11 (estrategias válidas) · FAIL · regenerar.

**Costo:** 1 ciclo completo de subagente desperdiciado + tiempo de regeneración.

**Fix:** orquestador SIEMPRE inyecta master prompt completo + previous_pms_chain en el prompt del Task tool. Si el subagente reporta que no recibió master prompt: NO continuar · re-lanzar.

---

## Checklist de validación pre-lanzamiento de cada subagente

Antes de invocar Task tool para un subagente PM-2.X, el orquestador verifica:

- [ ] Master prompt PM-2.X cargado y disponible en memoria del orquestador (versión correcta verificada en frontmatter)
- [ ] Inputs pm-0-context, pm-1-2 (de la guía correspondiente), pm-2-0 listos
- [ ] arquetipos-elegidos.json existe y tiene entrada para PM-2.X
- [ ] Si PM-2.X tiene dependencias (PM-2.5 ← PM-2.3, PM-2.4 ← PM-2.10): los previous_pms están generados Y disponibles
- [ ] Ref operacional más cercana identificada (MGV-2026-04-20 si estilo MGV · DIESEL-2026-04-19 si estilo DIESEL)
- [ ] Task tool prompt incluye: master prompt completo + estilo declarado + inputs + ref operacional + deliverable claro

Si falta CUALQUIER ítem: NO lanzar · pedir al instructor o resolver el faltante.

---

## Implicaciones para Semana 2 (cuando se construyan subagentes)

Cuando se implementen los 4 subagentes mecánicos (PM-2.0, PM-2.11, PM-4.1, PM-4.2) en Semana 2:

1. Cada subagente debe tener una **función de invocación dedicada** que:
   - Lea su master prompt del filesystem
   - Lo inyecte como string completo en el prompt del Task tool
   - Pase inputs estructurados según la tabla de arriba
   - Verifique versión del master prompt en frontmatter antes de continuar

2. El orquestador debe tener un **registro de versiones de master prompts vigentes** y validarlas en pre-flight:
   ```
   PM-2.0 == v2.6
   PM-2.1 == v3.0
   PM-2.2 == v3.0
   PM-2.3 a PM-2.10 == v2.0
   PM-2.11 == v2.6.3
   ```
   Si una versión NO coincide: STOP · alguien tocó el canon · validar antes de continuar.

3. Cuando se actualice un master prompt (ej. PM-2.X v2.0 → v2.1), el orquestador detecta automáticamente vía frontmatter `version:` · NO requiere reescribir la skill · solo actualizar el registro de versiones vigentes.

---

## Resumen de la cadena ejecutable Fase 2

```
Pre-flight orquestador
   ├─ Lee 11 master prompts canon (REGLA 19 PASOS A-K)
   ├─ Verifica versiones vigentes en frontmatter
   └─ Carga refs operacionales (MGV + DIESEL)

Sub-fase 2A
   └─ Lanza PM-2.0 con master prompt v2.6 + inputs
       Output: Session Blueprint + catálogo arquetipos

Gate Humano 1 → arquetipos-elegidos.json

Sub-fase 2C (mecánicos · PM-4.1 + PM-4.2)
   ├─ Lanza PM-4.1 con master prompt + inputs
   └─ Lanza PM-4.2 con master prompt + inputs

Sub-fase 2D (creativos · niveles paralelos)
   ├─ Nivel 1 S1: PM-2.1 (master prompt v3.0 · ramifica según estilo) → PM-2.2 (v3.0 · ramifica)
   ├─ Nivel 2 S2: PM-2.3 (productor) → PM-2.5 (consumidor)
   ├─ Nivel 3 S3: PM-2.10 (productor) → PM-2.4 (consumidor)
   ├─ Nivel 4 S4: PM-2.6 || PM-2.8 (paralelo)
   └─ Nivel 5 S5: PM-2.9 (único)
   
   Cada subagente:
   - Recibe SU master prompt completo
   - Recibe SU subset de inputs según tabla de arriba
   - Recibe arquetipos-elegidos[SU PM]
   - Genera Activity Card con enriched: false

Sub-fase 2E (cierre)
   └─ Lanza PM-2.11 con master prompt v2.6.3 + las 9 Activity Cards + cols 1-5 GFPI
       Output: pm-2-11.json + pm-2-validation-report.json (16 checks)

Gate Humano 2 → enriched: true en lote → autoriza Fase 3
```

**Cada flecha del flujo lleva implícita la inyección del master prompt al Task tool del subagente correspondiente.**
