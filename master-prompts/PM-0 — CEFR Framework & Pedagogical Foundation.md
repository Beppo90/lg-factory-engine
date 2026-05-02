# PM-0 — CEFR Framework & FPI SENA Pedagogical Foundation

**Status:** Capa fundacional del sistema — referencia obligatoria para todos los PM-2.x, PM-3.x y PM-4.x
**Alcance CEFR:** A1.1 — A2.2
**Versión:** 3.1 — 2026-05-01 (v3.1 agrega REGLA 11 anti-prescriptive prompt operacional · canonizada del cascade Step 1.1 IMARPOR-V2 · v3.0 fue paradigm shift simplificado post-PM-0.0)
**Versiones legacy:** v1.0 (2026-04-18) · v1.1 (2026-04-20 · pm-0-context.json schema)

> [!warning] PARADIGM SHIFT v3.0 · 2026-05-01
>
> PM-0 v2.x (1077 líneas · 13 sub-principios pedagógicos prescriptivos · 17 grupos gramaticales hardcoded · 22 ítems trazabilidad · schema 30+ fields) está DEPRECATED como spec operacional. v3.0 simplifica a ~300 líneas · 5 principios maestros · schema mínimo viable · libertad LLM.
>
> **Razón:** Sergio detectó (2026-05-01) que PM-0 v2.x sobre-prescribe · el LLM repite mecánicamente · pierde capacidad analítica. Además · la matriz pedagógica curricular ahora se alinea explícitamente en PM-0.0 (NEW · pre-PM-0) · entonces PM-0 ya NO necesita reconstruir alineación · solo aplica principios pedagógicos contra matriz heredada.
>
> **Cambio cascada:** PM-0 ahora consume `pm-0-0-matriz-alineada.json` (PM-0.0 output) como insumo principal · agrega CEFR descriptors + universo narrativo + principios pedagógicos · NO duplica info de matriz curricular.
>
> **Legacy preserved:** las secciones v1.x con tabla 17 grupos gramaticales · L1 reduction tabla · 22 ítems trazabilidad permanecen en este documento como REFERENCIA · NO son requirements operacionales v3.0 · son sugerencias que el LLM puede consultar cuando necesite profundizar.

---

## EXTENSIÓN v3.0 — SIMPLIFICACIÓN CANÓNICA (2026-05-01)

### REGLA 1 — INPUT PRINCIPAL · pm-0-0-matriz-alineada.json

PM-0 v3.0 consume como input PRIMARIO el output de PM-0.0 (matriz pedagógica alineada por RAP):

```json
{
  "competencia": "...",
  "raps_count": N,
  "raps": [
    {"rap_id": "RA1", "rap_titulo": "...", "saberes_conceptos_y_principios": [...], "saberes_proceso": [...], "criterios_evaluacion": [...]},
    ...
  ]
}
```

**PM-0 NO reconstruye alineación.** PM-0 NO toca saberes/criterios. PM-0 solo agrega capa pedagógica (CEFR + universo + principios) sobre la matriz heredada.

### REGLA 2 — 5 PRINCIPIOS MAESTROS (sintetizados de §5 v1.x)

El LLM aplica estos 5 principios maestros al contexto del programa · CON LIBERTAD ANALÍTICA · NO mecánicamente:

1. **CONTENIDO TÉCNICO PRIMARIO** · El idioma se enseña ALREDEDOR de contenido técnico real del sector. Realia · fotografías · video · vocabulario auténtico SOFÍA. No se enseña gramática descontextualizada · se enseña gramática que sirve la operación.

2. **PROGRESIÓN CEFR DIFERENCIADA** · Cada guía sirve un subnivel CEFR específico (A1.1 / A1.2 / A1.3 / A2.0 / A2.1 / A2.2). El LLM elige el subnivel basándose en el RAP target · NO obligado a producir descriptores de los 6 subniveles.

3. **L1 DECRECE PROGRESIVAMENTE** · El L1 (español) cae de ~30% en S1 a 0% en sesiones finales. NO hardcoded por sesión · el LLM ajusta per cohort/perfil aprendices con justificación explícita.

4. **FEEDBACK DIFERENCIADO accuracy ↔ fluency** · Accuracy (gramática · pronunciación · spelling) se corrige inmediato. Fluency (oralidad · interacción) se respeta · feedback diferido. El LLM decide cuándo cada tipo según la actividad.

5. **EVIDENCIA ALINEADA AL CRITERIO** · Cada actividad genera evidencia que valida un criterio específico del RAP (heredado de PM-0.0). NO se inventan criterios · se asignan instrumentos a criterios canon.

### REGLA 3 — GRAMÁTICA SECTOR-RELEVANTE · NO 17 GRUPOS HARDCODED

PM-0 v3.0 NO obliga a cubrir 17 grupos gramaticales prescriptivos. El LLM:
- Lee `saberes_conceptos_y_principios` de cada RAP en `pm-0-0-matriz-alineada.json` (donde PM-0.0 ya asignó la gramática del sector)
- Identifica los grupos gramaticales relevantes al sector (típicamente 5-8 · NO 17)
- Decide qué grupos activar Intro / Consolida / Aplica per guía · CON LIBERTAD

Ejemplo IMARPOR-CC: gramática activa son `verb to be · simple tense · imperative · tag questions · progressive · prepositions · quantifiers · modals` (~8 grupos · NO 17). NO se fuerza Past Tense ni Future Perfect porque el sector NO los necesita en A1-A2.

**Tabla v1.x de 17 grupos permanece como referencia · NO requirement.**

### REGLA 4 — SCHEMA MÍNIMO VIABLE · 8 fields esenciales

El output `pm-0-context.json` v3.0 requiere mínimo 8 campos:

| Field | Required | Origen |
|-------|----------|--------|
| `pm_id`, `pm_name`, `pm_version`, `run_id` | ✅ | metadata canónica |
| `generated_date`, `instructor` | ✅ | metadata canónica |
| `programa` (denominacion · sector · CEFR) | ✅ | form xlsx parseado |
| `universo_narrativo` | ✅ | LLM decide · personajes · escenarios · vocabulario sector |
| `cefr_subnivel_objetivo` | ✅ | LLM decide para esta guía |
| `principios_pedagogicos_aplicables` | ✅ | LLM aplica los 5 principios maestros |
| `_matriz_alineada_ref` | ✅ | path o referencia a pm-0-0-matriz-alineada.json |

**Campos opcionales** (LLM agrega si el sector lo pide):
- `final_mission_scenario`
- `grammar_focus_per_session`
- `l1_policy_per_session`
- `imagery_guidance_sector`
- `iconografia_tone`
- `cultural_realia`

NO requerimos schema 30+ fields como v1.x. LLM tiene libertad de innovar campos sector-específicos.

### REGLA 5 — TRAZABILIDAD ESENCIAL · 6 ÍTEMS (no 22)

Validación post-output v3.0 requiere 6 checks · NO 22:

1. ✅ `_matriz_alineada_ref` apunta a archivo válido pm-0-0-matriz-alineada.json
2. ✅ `cefr_subnivel_objetivo` ∈ {A1.1, A1.2, A1.3, A2.0, A2.1, A2.2}
3. ✅ `universo_narrativo` non-empty · sector-coherent · personajes >= 2
4. ✅ `principios_pedagogicos_aplicables` referencia los 5 principios maestros (todos · selectivo · combinación · documentado)
5. ✅ NO duplicación con matriz alineada (pm-0-context.json NO debe contener saberes/criterios literales · solo referencia a matriz)
6. ✅ Anti-copia-fantasma · 0 cross-program leaks (universo es ESTE programa · NO copy de IMARPOR-CC u otro)

### REGLA 6 — DESCRIPTORES CEFR · SOLO NIVEL RELEVANTE

PM-0 v3.0 produce descriptores CEFR SOLO del subnivel objetivo de la guía. NO produce los 6 subniveles A1.1 → A2.2.

Ejemplo:
- Guía 1 técnico CEFR A1.1 → solo descriptors A1.1
- Guía 3 tecnológico CEFR A2.0 → solo descriptors A2.0
- Curso Complementario A1.2 → A2.1 progresivo → solo descriptors entrada A1.2 + salida A2.1

Tabla v1.x §6 con 6 subniveles permanece como REFERENCIA · NO requirement.

### REGLA 7 — VALIDATION POST-GENERATION · 6 CHECKS

```json
"validation_checks": [
  {"id": 1, "name": "matriz_alineada_ref_valid", "status": "PASS|FAIL"},
  {"id": 2, "name": "cefr_subnivel_canonical", "status": "PASS|FAIL"},
  {"id": 3, "name": "universo_narrativo_complete", "status": "PASS|FAIL"},
  {"id": 4, "name": "principios_aplicados", "status": "PASS|FAIL"},
  {"id": 5, "name": "no_duplication_matriz", "status": "PASS|FAIL"},
  {"id": 6, "name": "anti_copia_fantasma", "status": "PASS|FAIL"}
]
```

Si CUALQUIER check FAIL · output marcado `enriched: false` · Sergio revisa antes de avanzar a PM-1.1.

### REGLA 8 — RELACIÓN CON OTROS PROMPTS v3.0

| Relación | Prompt | v1.x → v3.0 |
|----------|--------|-------------|
| **Consume de (NEW · CRÍTICO)** | PM-0.0 | matriz pedagógica alineada |
| Alimenta a | PM-1.1 | ruta macrotemática (NO duplicar matriz · solo agregar capa visual/temática) |
| Alimenta a | PM-1.2 | scope (NO duplicar matriz · solo curar fuentes auténticas per RAP) |
| Alimenta a | PM-2.x | universo narrativo + principios pedagógicos |
| Alimenta a | PM-3.x | universo + CEFR descriptores · NO matriz curricular (esa va de PM-0.0) |

PM-2.11 NO consume PM-0 · consume directamente PM-0.0 (matriz alineada).
PM-3.7 NO consume PM-0 · consume PM-0.0 + PM-2.11.

### REGLA 9 — DEPRECATION PATH v1.x → v3.0

Programas con `pm-0-context.json` v1.x (30+ fields · 22 ítems trazabilidad · descriptores 6 subniveles):
- KEEP los archivos legacy en run dir (NO eliminar · son canon histórico)
- Generar nuevo pm-0-context.json v3.0 cuando se re-run el programa
- Marcar artefactos v1.x como `*.legacy-v1x` (sufijo informativo · NO mover)

Run resultante puede tener AMBOS: legacy v1.x (para auditoría) + v3.0 (operacional).

### REGLA 10 — LIBERTAD LLM EXPLÍCITA

El LLM tiene libertad analítica sobre:
- Cuántos personajes inventa (mínimo 2 · sin máximo)
- Qué escenario laboral elige como hero del universo
- Cómo redacta los principios pedagógicos aplicables (selectivo · combinado · todos)
- Qué campos opcionales agrega según el sector (e.g., `cold_chain_notes` si banana · `vhf_protocol_focus` si marítimo · etc.)
- Tono pedagógico que propone (concentrado · colaborativo · ágil · reflexivo · etc.)
- Cuántos grupos gramaticales activar (5-10 típico · NO los 17 v1.x)

El LLM NO tiene libertad sobre:
- Cambiar la matriz alineada (esa viene de PM-0.0 · canon)
- Inventar criterios de evaluación (vienen de SOFÍA · canon)
- Reordenar RAPs
- Saltar validation_checks

### REGLA 11 — PROMPT OPERACIONAL DEBE RESPETAR LIBERTAD LLM (v3.1 · 2026-05-01)

> [!warning] Anti-patrón #16 canonizado · Sergio Cortés trigger mutual REGLA 21
>
> REGLA 10 declara libertad analítica del LLM. Pero el orchestrator (Claude principal) puede caer en pasar al subagente un template JSON literal con todas las keys pre-fabricadas + listas cerradas + estructura prescriptiva. Eso CONTRADICE la libertad declarada en REGLA 10. El Agent solo rellena · NO innova · output mecánico-prescriptivo.

**Trigger del problema:** detectado 2026-05-01 en cascade Phase 1 IMARPOR-V2 Step 1.1 inicial. Mi (orchestrator) prompt al Agent fue prescriptivo: "5 principios numbered fijas" · "grupos_activos: [...]" · "rituales_canon: [...]" · "L1 policy: S1-S3 30% · S4-S8 15% · S9-S12 0%". El Agent rellenó · output 25 keys fijos · contradice REGLA 10. Sergio detectó: "FUE MUY MECÁNICO Y NO TUVO LA LIBERTAD DEL LLM?". RE-RUN restaurativo produjo output muy distinto: 19 keys emergentes · `instructor_briefing` narrativo 1ª persona · 6 innovaciones sector-driven · `pedagogical_compass` entrelazado.

**Mecánica canónica del prompt operacional al Agent (cuando se ejecute PM-0):**

SÍ pasar al Agent:
- Master prompt PM-0 v3.x completo (canon strict · REGLAS 1-11)
- pm-0-0-matriz-alineada.json (input principal · NO duplicar)
- pm-0-context-input.json (programa metadata)
- 8 fields obligatorios mínimos (REGLA 4)
- Bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL" explícito
- Pista (NO obligatoria · marcada como ejemplo)

NO pasar al Agent:
- Template JSON literal con todas las keys pre-fabricadas
- 5 principios numbered fijos como dict keys obligatorios
- Listas cerradas que el Agent debe "llenar"
- Tono pedagógico decidido por orchestrator (e.g., "colaborativo" porque YO lo dije)
- Grupos gramaticales enumerados pre-decididos
- L1 policy con tabla per fase pre-decidida
- Rituales pedagógicos lista cerrada

**Bloque template canonical (reusable cross-PM):**

```
## INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL

Master prompt PM-0 v3.1 declara REGLA 10 LIBERTAD LLM EXPLÍCITA. Este prompt
operacional debe respetarla. NO sigas plantilla · NO inventes keys numbered
fijas · NO enumeres listas cerradas si una narrativa funciona mejor.

TIENES LIBERTAD REAL sobre:
- Cuántas keys top-level usas (8 obligatorias · resto LLM decide cuántas y cuáles)
- Cómo redactas los principios pedagógicos (narrativa · enumerados · combinados · selectivos)
- Cuántos personajes inventas (mínimo 2 · sin máximo)
- Qué escenarios laborales eliges como hero del universo
- Tono pedagógico que propones (NO me dices porque yo te lo dije · DECIDES tú)
- Cuántos grupos gramaticales activar (5-10 típico · NO 17)
- Qué campos opcionales agregas según el sector
- L1 policy (puede ser tabla · narrativa · principio sin números · TÚ decides)

NO TIENES LIBERTAD sobre:
- 8 fields obligatorios canon strict (REGLA 4)
- Cambiar matriz alineada (REGLA 1 · canon PM-0.0)
- Inventar criterios SOFÍA
- Saltar 6 validation_checks (REGLA 7)

Diseña la estructura coherente con [SECTOR/PROGRAMA] · NO sigas template
universal.
```

**Trigger interno orchestrator** (ANTES de dispatchear Agent que ejecute PM-0):
1. ¿Mi prompt incluye bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL"? Si NO · refactor.
2. ¿Mi prompt pasa template JSON literal con keys pre-fabricadas? Si SÍ · STOP · solo obligatorios + contexto + libertad explícita.
3. ¿Mi prompt indica explícitamente qué SÍ/NO libertad LLM tiene? Si NO · agregar.

**Aplicabilidad cross-PM:** REGLA 11 aplica a TODOS los subagentes downstream (PM-1.1 · PM-1.2 · PM-2.x · PM-3.x · etc.) cuando su master prompt declare libertad LLM. Documentado en memory operacional `feedback_anti_patron_16_prompt_operacional_prescriptivo.md` (trigger interno orchestrator).

**Caso operacional confirmado:** Step 1.1 IMARPOR-V2 RE-RUN · 19 keys emergentes (vs 25 prescriptive) · 6 innovaciones libres detectadas · 6/6 validation PASS · 2026-05-01.

---

## ESTRUCTURA OPERACIONAL v3.0 (resumen ejecutivo)

```
Form xlsx parseado → PM-0.0 (NEW · alinea matriz por RAP) → pm-0-0-matriz-alineada.json
                                                            ↓
                                                          PM-0 v3.0
                                                            ↓
                                                    pm-0-context.json (8 fields min)
                                                       - universo_narrativo
                                                       - cefr_subnivel_objetivo
                                                       - principios_pedagogicos_aplicables
                                                       - _matriz_alineada_ref (no duplicate)
                                                            ↓
                                                          PM-1.1 / PM-1.2 / PM-2.x / etc.
```

---

## SECCIONES LEGACY v1.x (REFERENCIA · NO REQUIREMENTS)

> [!info] Las siguientes secciones permanecen como REFERENCIA del canon v1.x. NO son requirements operacionales v3.0. El LLM puede consultarlas cuando necesite profundizar en un tema · pero NO está obligado a cumplirlas mecánicamente.

---

## 1. ¿Qué es el Marco Común Europeo de Referencia (MCER / CEFR)?

El Consejo de Europa desarrolló el Marco Común Europeo de Referencia para las Lenguas: Aprendizaje, Enseñanza, Evaluación (MCER o CEFR en inglés) con el propósito de promover la enseñanza y el aprendizaje de lenguas en Europa y a nivel global.

El CEFR ofrece un marco descriptivo que promueve el desarrollo de habilidades lingüísticas, la conciencia intercultural, la autonomía del aprendiz y el aprendizaje a lo largo de la vida. Es de interés para diseñadores curriculares, autores de materiales, docentes, evaluadores y formadores de formadores.

El CEFR adopta un enfoque basado en lo que el aprendiz **puede hacer** con el idioma. Provee además un sistema que permite comparar el nivel lingüístico de los individuos de manera objetiva e imparcial.

### Principios clave del CEFR

- Es un conjunto de puntos de referencia comunes, **no una prescripción curricular**
- Un nivel no equivale a un año de estudio ni a un número fijo de horas
- Reconoce que los aprendices tienen objetivos diferentes y aprenden a ritmos distintos
- **No prescribe un método de enseñanza** — reconoce la diversidad de métodos según el contexto
- Tiene un foco claro en las cuatro habilidades (Reading, Writing, Listening, Speaking) y en desarrollar la capacidad de **comunicar**, no solo de acumular conocimiento
- Enfatiza la adquisición de habilidades para el aprendizaje autónomo e independiente

### Niveles del CEFR

| Nivel | Descripción | Descriptor global |
|-------|-------------|-------------------|
| C2 | Mastery | Uso preciso y fluido con competencia casi nativa |
| C1 | Effective Operational Proficiency | Dominio amplio con vocabulario extenso |
| B2 | Vantage | Expresión en formas cada vez más abstractas |
| B1 | Threshold | Capacidad de mantener conversaciones |
| A2 | Waystage | Desempeño en un rango creciente de situaciones sociales |
| A1 | Breakthrough | Expresión en lenguaje simple y básico |

*El CEFR reconoce niveles intermedios entre los niveles globales: A2+, B1+, B2+, etc. El sistema FPI SENA emplea subniveles internos: A1.1, A1.2, A1.3, A2.0, A2.1.*

---

## 2. ¿Cómo se corresponde el CEFR con el sistema FPI SENA?

El sistema FPI SENA (Fluency Program Integration) adopta un enfoque comunicativo-técnico que sitúa el aprendizaje del inglés dentro de escenarios reales del puesto de trabajo. A diferencia de los programas de inglés general, el FPI embebe el desarrollo de la lengua en tareas técnicas auténticas: leer reportes de diagnóstico, escribir listas de verificación de mantenimiento, escuchar briefings del supervisor, y presentar hallazgos a un equipo técnico. Este enfoque refleja directamente el principio fundamental del CEFR: definir la competencia lingüística a través de lo que el aprendiz puede hacer con el idioma en situaciones reales.

El sistema FPI estructura cada programa en **guías** (unidades didácticas de larga duración), asignando a cada guía un subnivel CEFR específico. El contenido técnico de cada guía es definido por el programa al que pertenece — no por el sistema FPI como tal. El sistema provee la arquitectura; cada programa provee el contenido.

> **Ejemplo de mapeo — Programa de referencia: Mantenimiento de Motores Diesel**
>
> *El siguiente mapeo ilustra cómo un programa técnico específico instancia la arquitectura FPI. Cada programa técnico y tecnológico de SENA genera su propio mapa de guías con su propio contenido de dominio.*

| Guía | Subnivel CEFR | Contenido técnico (ejemplo: Motores Diesel) |
|------|:-------------:|---------------------------------------------|
| G1 | A1.1 | Comunicación foundational en el taller: herramientas, procedimientos básicos, vocabulario de seguridad |
| G2 | A1.2 | Mantenimiento preventivo: especificaciones, unidades de medida, procedimientos PM |
| G3 | A1.3 | Inspección de fluidos y sistemas eléctricos: lectura de circuitos, reporte de inspección |
| G4 | A2.0 | Chasis y sistemas de seguridad: diagnóstico, evaluación de riesgos, MSDS |
| G5 | A2.1 | Diagnóstico avanzado: scan tool, análisis RCA, causa raíz |

Cada guía consolida las competencias de la guía anterior antes de introducir las nuevas. Cada actividad, instrumento de evaluación y plan de sesión del sistema FPI está mapeado contra los descriptores CEFR del nivel correspondiente, garantizando que lo que se enseña, practica y evalúa corresponde directamente a las competencias comunicativas definidas por el CEFR para ese nivel.

---

## 3. ¿Cómo responde este proyecto a los objetivos del CEFR?

El diseño de vocabulario y gramática del sistema FPI está incrustado en contextos técnicos auténticos — procedimientos de taller, especificaciones de equipo, reportes de diagnóstico — y construye las competencias lingüísticas que los aprendices necesitan para comunicarse en su entorno laboral específico. La sección de vocabulario de cada guía (PM-2.5 y Word Wall) provee el repertorio de dominio técnico necesario para la comunicación especializada, mientras que la gramática se enfoca en las estructuras de mayor rentabilidad comunicativa en cada nivel:

- Presente simple → procedimientos
- Imperativo → instrucciones de seguridad
- Presente perfecto → historial de servicio
- Condicional tipo 1 y 2 → hipótesis y advertencias

Las cuatro habilidades — Reading, Writing, Listening y Speaking — se desarrollan en cada guía, con un componente adicional de Language Functions (F1–F5) que refleja los descriptores de competencia pragmática del CEFR.

Los escenarios auténticos del entorno laboral — con personajes recurrentes definidos por cada programa (un supervisor, un técnico senior y un aprendiz) — reflejan el énfasis del CEFR en la comunicación en situaciones realistas. El aprendiz no practica inglés abstracto: reporta hallazgos a su supervisor, solicita aclaraciones a su mentor, y presenta diagnósticos o resultados a un equipo técnico. Los nombres y roles específicos de estos personajes son propios de cada programa y se definen en el PM-1.x correspondiente.

Las herramientas de autoevaluación integradas en cada sesión — Gap Cards, KWL, Learning Contract — desarrollan la autonomía del aprendiz y la conciencia metacognitiva, en línea con el énfasis del CEFR en el aprendizaje autónomo y permanente.

La Misión Final de cada guía (PM-3.5) es la tarea de transferencia que exige al aprendiz integrar todas las competencias acumuladas en una performance auténtica, completa y evaluada — correspondencia directa con la orientación "can do" del CEFR.

---

## 4. CEF Overview — Descriptores A1 (Nivel de referencia del programa)

### Actividades comunicativas de recepción

**Comprensión oral general**  
Puede comprender un discurso muy lento y cuidadosamente articulado, con pausas largas para asimilar el significado.

**Comprensión lectora general**  
Puede comprender textos muy cortos y simples, frase por frase, identificando nombres familiares, palabras y frases básicas, con relectura cuando es necesario.

**Lectura para orientación**  
Puede reconocer nombres familiares, palabras y frases muy básicas en avisos simples en situaciones cotidianas comunes.

**Lectura para obtener información**  
Puede hacerse una idea del contenido de material informacional simple y descripciones cortas, especialmente si hay apoyo visual.

### Actividades comunicativas de interacción

**Interacción oral general**  
Puede interactuar de manera simple, pero la comunicación depende totalmente de la repetición a un ritmo más lento, la reformulación y la reparación. Puede hacer y responder preguntas simples, iniciar y responder a afirmaciones simples sobre necesidades inmediatas o temas muy familiares.

**Conversación**  
Puede presentarse y usar expresiones básicas de saludo y despedida. Puede preguntar cómo están las personas y reaccionar ante noticias. Puede comprender expresiones cotidianas dirigidas a satisfacer necesidades simples de tipo concreto, pronunciadas claramente, despacio y con repetición.

**Cooperación orientada a metas**  
Puede comprender preguntas e instrucciones dirigidas cuidadosamente y despacio, y seguir instrucciones cortas y simples.

**Intercambio de información**  
Puede hacer y responder preguntas simples sobre sí mismo y otras personas, dónde viven, personas que conocen, cosas que tienen.

**Interacción escrita general**  
Puede solicitar o transmitir detalles personales por escrito.

### Actividades comunicativas de producción

**Producción oral general**  
Puede producir frases simples, principalmente aisladas, sobre personas y lugares.

**Monólogo sostenido**  
Puede describirse a sí mismo, lo que hace y dónde vive.

**Producción escrita general**  
Puede escribir frases y oraciones simples aisladas.

### Competencia lingüística comunicativa

**Rango de vocabulario**  
Repertorio básico de palabras y frases aisladas relacionadas con situaciones concretas particulares.

**Precisión gramatical**  
Muestra control limitado de unas pocas estructuras gramaticales simples y patrones de oraciones en un repertorio aprendido.

**Control fonológico**  
La pronunciación de un repertorio muy limitado de palabras y frases aprendidas puede ser comprendida con cierto esfuerzo por hablantes nativos habituados a tratar con hablantes de su grupo lingüístico.

**Control ortográfico**  
Puede copiar palabras familiares y frases cortas, por ejemplo, señales simples o instrucciones, nombres de objetos cotidianos, nombres de tiendas y frases fijas de uso regular.

**Competencia sociolingüística**  
Puede establecer contacto social básico usando las formas más simples y cotidianas de cortesía: saludos y despedidas; presentaciones; decir por favor, gracias, lo siento, etc.

**Coherencia pragmática**  
Puede unir palabras o grupos de palabras con conectores lineales muy básicos como "and" o "then".

---

## 5. Principios Pedagógicos y Didácticos — Capa Fundacional

*Marco adaptado de la metodología Life Second Edition (National Geographic Learning) para el contexto técnico-vocacional del sistema FPI SENA.*

---

### 5.1 Contenido técnico como punto de partida

Al igual que en Life Second Edition el contenido de National Geographic es el punto de partida de cada lección, en el sistema FPI SENA el **contenido técnico del programa** es el punto de partida de cada sesión. Los temas no son pretextos para practicar gramática: son el motor de la comunicación.

La riqueza de los textos técnicos — manuales de procedimiento, reportes de diagnóstico, listas de verificación, especificaciones del fabricante — garantiza que los aprendices estén tan comprometidos con el contenido que el aprendizaje del inglés se convierte en una necesidad, no en un fin en sí mismo. Este elemento de transferencia — del contenido técnico a la realidad laboral del aprendiz — convierte el input en un vehículo de práctica y producción lingüística mapeado directamente a las escalas CEFR.

> **Nota de implementación:** La tabla de dominios técnicos por guía es específica de cada programa. El sistema FPI define la *arquitectura* de las guías (G1 → A1.1, G2 → A1.2, etc.); el *contenido* de cada guía es definido por el diseñador del programa al redactar el PM-1.x correspondiente. El ejemplo siguiente es del programa de referencia (Mantenimiento de Motores Diesel) y no debe usarse como plantilla para otros programas.

| Guía | CEFR | Dominio técnico — *Ej.: Motores Diesel* |
|------|:----:|-----------------------------------------|
| G1 | A1.1 | Herramientas, procedimientos básicos, vocabulario de seguridad y PPE |
| G2 | A1.2 | Mantenimiento preventivo: especificaciones, unidades de medida, procedimientos PM |
| G3 | A1.3 | Inspección de fluidos y sistemas eléctricos: lectura de circuitos, reporte de inspección |
| G4 | A2.0 | Chasis y sistemas de seguridad: diagnóstico, evaluación de riesgos, MSDS |
| G5 | A2.1 | Diagnóstico avanzado: scan tool, análisis RCA, causa raíz |

---

### 5.2 Fotografía y realia técnica

La realia técnica del taller — fotos de herramientas, diagramas de circuitos, placas de especificaciones, etiquetas de seguridad, instrumentos de diagnóstico — cumple la misma función que la fotografía de National Geographic en Life Second Edition: sirve como punto de entrada afectivo y cognitivo para cada actividad.

Las imágenes y realia técnica en el sistema FPI:
- Cuentan una historia procedimental por sí solas
- Atraen al aprendiz y generan compromiso emocional con el contenido
- Apoyan la comprensión del texto técnico y lo hacen memorable
- Provocan discusión diagnóstica y pensamiento técnico crítico
- Ayudan a recordar conjuntos léxicos técnicos (lexical sets)
- Sirven de apoyo para la enseñanza del lenguaje funcional (F1–F5)
- Se prestan a la práctica de estructuras gramaticales específicas del nivel

**Principio de aula**: *Show, don't tell.* Antes de nombrar un objeto o proceso técnico, el docente lo muestra — mediante realia, imagen o demostración. La instrucción visual y por mímica reduce la dependencia del L1 y ancla el vocabulario a referentes concretos del entorno laboral del programa.

---

### 5.3 Video e instrucción en vivo (Live Listening)

El video y el live listening son herramientas de alto impacto en el aula técnica. Cada guía del sistema FPI incluye componentes audiovisuales que siguen la estructura de tres fases:

**Antes (Before)** — Introduce el tema y compromete al aprendiz en una tarea de pre-observación. Pre-enseña vocabulario clave para que el aprendiz pueda comprometerse inmediatamente sin ser bloqueado por léxico desconocido.

**Durante (While)** — Tareas de comprensión que asisten el procesamiento del video o demostración, tanto en lo que el aprendiz ve como en lo que escucha. Los ejercicios explotan el lenguaje técnico del contexto.

**Después (After)** — Permite al aprendiz responder al video en su conjunto y participar en una discusión o tarea nacida del contexto técnico observado.

Técnicas de variación para video en el aula FPI:
- Reproducir sin sonido: el aprendiz predice lo que se describe, luego compara
- Reproducir solo audio: el aprendiz predice la escena del taller, luego verifica
- Pausar en el momento crítico del procedimiento: el aprendiz predice el siguiente paso
- Dar el script del video: el aprendiz diseña qué filmaría, luego compara con el original

El **live listening** — el docente habla inglés en tiempo real describiendo un procedimiento, una herramienta, o un diagnóstico — demuestra que el inglés técnico es una habilidad viva y usable en el taller, no solo un texto impreso.

---

### 5.4 Pensamiento crítico y diagnóstico técnico

En el sistema FPI SENA, el pensamiento crítico se manifiesta como **razonamiento diagnóstico técnico**: la capacidad del aprendiz de leer un reporte, analizar síntomas, evaluar condiciones, y llegar a conclusiones fundamentadas — en inglés.

Las tareas de pensamiento crítico en FPI SENA:
- Resolución de problemas técnicos en equipo (pairwork, groupwork)
- Análisis de causa raíz (RCA) progresivo a través de los niveles
- Diferenciación entre síntoma y causa en reportes de diagnóstico
- Evaluación de la fiabilidad de una especificación técnica
- Identificación de riesgos y medidas preventivas en contexto real

La progresión pedagógica dentro de cada sesión va de baja a alta complejidad cognitiva: de actividades de verificación y práctica controlada a producción libre, creativa e intelectualmente comprometedora.

---

### 5.5 Memorización y retención

Según Gairns y Redman (*Working with Words*, Cambridge University Press, 1986), el 80% de lo aprendido se olvida dentro de las primeras 24 horas. El sistema FPI SENA incorpora los factores SUCCESS de memorabilidad:

| Factor | Aplicación FPI SENA |
|--------|---------------------|
| **S**implicity | Lenguaje técnico presentado en contexto real, sin sobrecarga de metalenguaje |
| **U**nexpectedness | Escenarios auténticos de taller que generan impacto y sorpresa |
| **C**oncreteness | Vocabulario técnico concreto, siempre anclado a objetos y procedimientos reales |
| **C**redibility | Textos de manuales reales, especificaciones del fabricante, reportes de diagnóstico |
| **E**motion | Personajes recurrentes propios de cada programa que crean resonancia narrativa (definidos en PM-1.x) |
| **S**tories | Cada sesión es un episodio de una historia técnica continua que el aprendiz vive |

Para garantizar la retención, el sistema FPI implementa:
- Reciclaje de vocabulario y gramática dentro de cada sesión y entre guías
- Actividades de revisión al inicio de sesión que reciclan la sesión anterior
- Instrumentos de autoevaluación: Gap Cards, KWL, Learning Contract
- Word Wall: referencia visual permanente del vocabulario técnico activo

Principios metodológicos de las actividades de memorización:
- **Relacionabilidad** — el aprendiz aplica el lenguaje nuevo a su propia experiencia laboral
- **Multisensorial** — escuchar, ver, manipular realia, pronunciar, escribir: más de un sentido en la retención
- **Repetición con variación** — el aprendiz recupera ítems de memoria y los aplica a situaciones distintas
- **Profundidad cognitiva** — predicciones y suposiciones activas favorecen el aprendizaje profundo
- **Utilidad** — vocabulario con alta rentabilidad comunicativa en el taller es más fácil de recordar
- **Sin ansiedad** — el aula técnica es segura para el error: el error es datos, no fracaso
- **Enseñanza entre pares** — el aprendiz que explica a otro consolida su propio aprendizaje
- **Individualidad** — la cooperación compensa la variabilidad en los estilos de memorización individual

---

### 5.6 Tratamiento de la gramática

La gramática target se presenta en las primeras fases de cada sesión FPI a través de textos de lectura o escucha técnicos. Estos textos provienen de fuentes auténticas: manuales de taller, reportes de diagnóstico, listas de verificación de PM.

Principios del tratamiento gramatical en FPI SENA:
1. El foco principal está en el **contenido técnico** antes de dirigir la atención a las estructuras gramaticales
2. Los aprendices son guiados a **notar** (noticing) estructuras target: resaltado, extracción de oraciones ejemplo, búsqueda activa en el texto
3. Cada punto gramatical incluye un **cuadro resumen** con ejemplos tomados del texto de presentación
4. Los ejercicios de práctica favorecen **actividades de pensamiento profundo** sobre producción mecánica
5. El primer ejercicio está siempre vinculado al tema técnico de la sesión
6. Los ejercicios subsiguientes se mueven hacia contextos laborales que el aprendiz puede **personalizar**
7. Cada sesión culmina con una tarea de producción oral (**My Turn**) con énfasis en la **fluencia**

El drilling explícito — choral drilling, drilling de sustitución, backchaining — fija pronunciación y automatiza estructuras antes de exigir producción libre.

#### Sílabo gramatical estandarizado del sistema FPI SENA

*Distribución de estructuras gramaticales a través de las cinco guías (A1.1 → A2.1). Derivado del marco gramatical de Life Second Edition (National Geographic Learning), adaptado al contexto técnico-vocacional de SENA. Aplica a cualquier programa técnico o tecnológico. El Grupo 17 es el espacio abierto para estructuras adicionales específicas del sector.*

**Convenciones:** **Intro** = primera presentación · **Consolida** = fijación y práctica · **Aplica** = uso auténtico sin foco explícito de forma · **—** = no cubierto en esta guía

---

##### Grupo 1 — Verbo be

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Formas afirmativas contratadas: I'm, you're, he's, she's, it's, we're, they're | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Formas negativas: isn't, aren't, 'm not | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Preguntas e inversión: Is he...? Are you...? | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Respuestas cortas: Yes, I am. / No, it isn't. | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Be con la edad: He's twelve. | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Formas pasadas: was / were (afirmativo, negativo, pregunta) | — | **Intro** | Consolida | Aplica | Aplica |

##### Grupo 2 — Pronombres y adjetivos determinativos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Pronombres sujeto: I, you, he, she, it, we, they | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Adjetivos posesivos: my, your, his, her, its, our, their | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Pronombres demostrativos: this, that, these, those | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Pronombres objeto: me, you, him, her, it, us, them | — | **Intro** | Consolida | Aplica | Aplica |
| Posesivo 's y s': Alan's tool / the workers' area | **Intro** | Consolida | Aplica | Aplica | Aplica |

##### Grupo 3 — Sustantivos y artículos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Plural regular: -s, -es, -ies | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Plural irregular: feet, teeth, people, equipment | — | **Intro** | Consolida | Aplica | Aplica |
| Artículos indefinidos: a / an | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Artículo definido: the / sin artículo | — | **Intro** | Consolida | Aplica | Aplica |
| Sustantivos incontables (information, equipment, water) | — | — | **Intro** | Consolida | Aplica |
| Some / any con contables e incontables | — | **Intro** | Consolida | Aplica | Aplica |
| Uso de mayúsculas en nombres propios | **Intro** | Consolida | Aplica | Aplica | Aplica |

##### Grupo 4 — Adjetivos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Posición del adjetivo: antes del sustantivo | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Adjetivos invariables en plural (big engines, NOT bigs engines) | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Comparativos: bigger / more complex | — | — | **Intro** | Consolida | Aplica |
| Superlativos: the biggest / the most critical | — | — | — | **Intro** | Consolida |

##### Grupo 5 — Imperativo

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Imperativo afirmativo: base form (Check / Open / Use) | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Imperativo negativo: Don't + base form | — | **Intro** | Consolida | Aplica | Aplica |

##### Grupo 6 — Can y verbos modales

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Can / can't: habilidad | — | **Intro** | Consolida | Aplica | Aplica |
| Can: permiso, solicitud e invitación | — | **Intro** | Consolida | Aplica | Aplica |
| Must / mustn't: obligación y prohibición técnica | — | — | **Intro** | Consolida | Aplica |
| Should / shouldn't: recomendación técnica | — | — | **Intro** | Consolida | Aplica |
| I'd like / We'd like: solicitud formal cortés | — | — | **Intro** | Consolida | Aplica |
| Could / might: posibilidad y alternativa de diagnóstico | — | — | — | **Intro** | Consolida |
| Would: condicional y solicitudes | — | — | — | **Intro** | Consolida |

##### Grupo 7 — Have / Has y There is / There are

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Have / has: posesión | — | **Intro** | Consolida | Aplica | Aplica |
| There is / there are: afirmativo | — | **Intro** | Consolida | Aplica | Aplica |
| There is / there are: negativo y pregunta + some/any | — | **Intro** | Consolida | Aplica | Aplica |

##### Grupo 8 — Presente simple

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: I/you/we/they + base form | — | **Intro** | Consolida | Aplica | Aplica |
| 3ra persona singular: he/she/it + -s/-es | — | **Intro** | Consolida | Aplica | Aplica |
| Negativo: don't / doesn't + base form | — | **Intro** | Consolida | Aplica | Aplica |
| Preguntas: Do/Does...? + respuestas cortas | — | **Intro** | Consolida | Aplica | Aplica |
| Preguntas Wh- con presente simple | — | **Intro** | Consolida | Aplica | Aplica |
| Adverbios de frecuencia: always, usually, often, sometimes, never | — | **Intro** | Consolida | Aplica | Aplica |
| Preposiciones de tiempo: at, in, on | — | **Intro** | Consolida | Aplica | Aplica |

##### Grupo 9 — Pasado simple

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Verbos regulares: -ed / -d | — | — | **Intro** | Consolida | Aplica |
| Verbos irregulares de alta frecuencia | — | — | **Intro** | Consolida | Aplica |
| Negativo: didn't + base form | — | — | **Intro** | Consolida | Aplica |
| Preguntas: Did...? + base form + respuestas cortas | — | — | **Intro** | Consolida | Aplica |
| Preguntas Wh-: What did you...? | — | — | **Intro** | Consolida | Aplica |
| Uso de When con el pasado | — | — | **Intro** | Consolida | Aplica |
| Números ordinales y fechas | — | — | **Intro** | Consolida | Aplica |

##### Grupo 10 — Presente continuo

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: is/are + -ing | — | — | **Intro** | Consolida | Aplica |
| Negativo y preguntas | — | — | **Intro** | Consolida | Aplica |
| Para planes y arreglos futuros + expresión de tiempo | — | — | — | **Intro** | Consolida |
| Reglas de spelling -ing: sitting, coming, lying | — | — | **Intro** | Consolida | Aplica |
| Contraste: presente simple vs. presente continuo | — | — | — | **Intro** | Consolida |

##### Grupo 11 — Presente perfecto

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: have/has + participio pasado | — | — | — | **Intro** | Consolida |
| Negativo y preguntas | — | — | — | **Intro** | Consolida |
| Marcadores: already, yet, just, ever, never | — | — | — | — | **Intro** |
| Contraste: presente perfecto vs. pasado simple | — | — | — | — | **Intro** |

##### Grupo 12 — Condicionales

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Tipo 1: If + presente simple, will + base form | — | — | — | **Intro** | Consolida |
| Tipo 2: If + pasado simple, would + base form | — | — | — | — | **Intro** |

##### Grupo 13 — Voz pasiva

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Presente: is/are + participio pasado | — | — | — | **Intro** | Consolida |
| Pasado: was/were + participio pasado | — | — | — | — | **Intro** |

##### Grupo 14 — Preposiciones

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| In: lugar (in the workshop, in a tank, in English) | **Intro** | Consolida | Aplica | Aplica | Aplica |
| At: lugar específico y hora | — | **Intro** | Consolida | Aplica | Aplica |
| Next to / near: relación espacial de componentes | — | **Intro** | Consolida | Aplica | Aplica |
| On: superficies y transporte | — | **Intro** | Consolida | Aplica | Aplica |

##### Grupo 15 — Conectores y puntuación

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Conectores básicos: and, but, or, because | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Contracciones: reglas y apostrofe | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Puntuación básica: . , ? ! | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Sugerencias: Let's..., How about...? | — | — | **Intro** | Consolida | Aplica |
| Conectores de secuencia: first, then, next, after that, finally | — | — | **Intro** | Consolida | Aplica |

##### Grupo 16 — Palabras interrogativas (Wh-)

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| What, Where, Who, Why, When | — | **Intro** | Consolida | Aplica | Aplica |
| How + adjetivo/adverbio (How much? How often? How long?) | — | — | **Intro** | Consolida | Aplica |
| Which / Whose | — | — | — | **Intro** | Consolida |

##### Grupo 17 — Temas adicionales específicos del sector *(definidos por el diseñador del programa en PM-1.x)*

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| [Tema adicional 1] | | | | | |
| [Tema adicional 2] | | | | | |
| [Tema adicional 3] | | | | | |

---

### 5.7 Tratamiento del vocabulario

El sistema FPI SENA presta especial atención al vocabulario tanto receptivo como productivo. Todos los textos de input han sido revisados para reducir el léxico fuera de nivel manteniendo el sabor técnico y la riqueza del original.

**1. Conjuntos léxicos técnicos (Lexical Sets)**
El sistema FPI organiza el vocabulario por dominio: herramientas, medidas, sistemas del motor, PPE, procedimientos de mantenimiento. Aprender palabras en un conjunto requiere menos esfuerzo cognitivo y refleja cómo se almacena la información especializada en la memoria.

**2. Word Wall**
Referencia visual permanente del vocabulario técnico activo de cada guía. Provee el término, su pronunciación con marcación de stress, ejemplo en contexto técnico, y collocations del dominio. El vocabulario del Word Wall es el vocabulario de producción activa esperada en la Misión Final.

**3. Glosario técnico por guía (PM-2.5)**
Entradas que incluyen: fonética, definición, parte del discurso, ejemplo en contexto técnico, y familia de palabras.

**Pre-enseñanza de vocabulario — 4 propósitos:**
1. Reducir la carga cognitiva durante la actividad principal (reading/listening)
2. Garantizar que los aprendices puedan comprometerse inmediatamente con el contenido
3. Introducir el vocabulario que el aprendiz necesitará para producir en la tarea final
4. Crear anticipación e interés en el tema técnico antes de abordarlo

---

### 5.8 Habilidades de aprendizaje autónomo

El sistema FPI SENA desarrolla sistemáticamente la autonomía del aprendiz a través de:

- **Gap Cards** — identificación activa de brechas de conocimiento antes y después de la sesión
- **KWL** — Know / Want to know / Learned: estructura de metacognición aplicada al inicio y cierre de cada sesión
- **Learning Contract** — compromiso personal con objetivos de aprendizaje específicos y medibles para la guía
- **Registro de vocabulario** — técnicas de registro del léxico técnico para revisión autónoma fuera del aula
- **Can-do statements** — al final de cada sesión, el aprendiz verifica qué puede hacer con el inglés aprendido

---

### 5.9 Evaluación

El progreso se evalúa de las siguientes maneras:

- Cada sesión cierra con **can-do statements** para autoevaluación formativa continua
- Cada guía cierra con la **Misión Final (PM-3.5)**: tarea de transferencia donde el aprendiz integra todas las competencias acumuladas en una performance auténtica evaluada con rúbrica
- La rúbrica de la Misión Final mapea directamente a los **descriptores CEFR** del nivel correspondiente
- El Learning Contract al inicio de la guía sirve como línea de base para medir el progreso al final

---

### 5.10 Estructura de sesión FPI — Progresión pedagógica

| Bloque | Tiempo | Función pedagógica |
|--------|:------:|--------------------|
| **SET-UP** | ~25 min | Check-in, reciclaje de sesión anterior, presentación del contexto técnico, pre-enseñanza de vocabulario |
| **WHILE — A** | ~35 min | Presentación de gramática/vocabulario via texto técnico; noticing; cuadro resumen |
| **WHILE — B** | ~35 min | Práctica controlada, drilling (choral, sustitución, backchaining), forma y uso |
| **BREAK** | 15 min | Pausa activa |
| **WHILE — C** | ~35 min | Lectura profunda, pensamiento crítico/diagnóstico, análisis de texto técnico auténtico |
| **WHILE — D** | ~35 min | Lenguaje funcional (F1–F5), role play situacional con los personajes del programa (PM-1.x) |
| **WHILE — E** | ~35 min | Producción escrita, writing skill técnico |
| **WRAP-UP** | ~25 min | My Turn (producción oral personalizada), autoevaluación, Gap Cards, cierre |
| **TOTAL** | **~240 min** | |

Cada sesión cierra con **My Turn**: tarea de producción oral que habilita al aprendiz a crear su propio output usando el lenguaje target en un contexto técnico significativo, con énfasis en la **fluencia** dentro del marco gramatical de la tarea.

---

### 5.11 Feedback diferenciado: accuracy vs. fluency

El feedback es la palanca de mayor impacto en el aprendizaje lingüístico — y también la más usada de manera incorrecta. El error crítico más frecuente en el aula de inglés técnico es corregir siempre, en todo momento, sin distinguir si el aprendiz está trabajando la forma o la comunicación. Ese error destruye la confianza y bloquea la producción oral.

**El principio fundamental**: el tipo de feedback debe corresponder al propósito de la actividad.

#### Modo accuracy (foco en la forma)

Aplica durante: drilling (WHILE B), cuadro resumen gramatical, ejercicios de práctica controlada.

El aprendiz sabe que se espera corrección. La corrección es parte del contrato pedagógico del momento. Técnicas:

- **Recast (implícito)** — El docente repite la producción del aprendiz en forma correcta, sin interrumpir el flujo, sin señalar el error explícitamente. *Aprendiz: "I go to the workshop yesterday." Docente: "You went to the workshop — good, and what did you do there?"* El aprendiz recibe el modelo correcto sin ser detenido.
- **Elicitación** — El docente señala que hay un error y le devuelve la responsabilidad al aprendiz: *"I go... ¿puedes intentar de nuevo?"*. Promueve la auto-corrección.
- **Pista metalingüística** — El docente da una clave sin dar la respuesta: *"Cuidado — estamos en pasado."*
- **Corrección explícita** — Solo cuando los otros métodos han fallado repetidamente: *"No, la forma correcta es 'went'. Repitamos juntos."* Seguida inmediatamente de práctica de la forma correcta.
- **Repetición con entonación ascendente** — *"I go?"* — señala que algo no está bien sin decirlo directamente.

#### Modo fluency (foco en la comunicación)

Aplica durante: role play (WHILE D), My Turn (WRAP-UP), Misión Final, interacciones espontáneas.

El aprendiz está intentando comunicar. Interrumpir para corregir forma en este momento destruye el acto comunicativo y envía el mensaje equivocado: que el inglés es una trampa, no una herramienta.

**Regla en modo fluency**: el docente no interrumpe. Toma nota de los errores recurrentes o sistémicos en silencio durante la actividad. Después de la actividad: feedback diferido a nivel de clase.

**Feedback diferido post-tarea**:
1. El docente escribe en la pizarra 2-3 errores frecuentes (sin atribuirlos a nadie): *"Escuché: 'I am go to check'. ¿Cómo podemos mejorar esto?"*
2. El grupo analiza, corrige, y practica la forma correcta brevemente.
3. El docente también destaca 2-3 aciertos comunicativos: refuerza lo que funcionó.

#### Señalización del modo al aprendiz

Los aprendices necesitan saber en qué modo están. El docente puede establecer una señal visual consistente (por ejemplo, un cartel de "FORM" vs "FLUENCY" o una señal de mano acordada) para que el aprendiz sepa si debe esperar corrección o si debe continuar aunque cometa errores.

#### Feedback escrito

En tareas de producción escrita (WHILE E, reportes, listas de verificación):
- **Códigos de error**: el docente subraya el error y usa un código (*G = grammar, V = vocabulary, Sp = spelling, WO = word order*). El aprendiz corrige él mismo usando el código. No borra y rescribe — trabaja con su propio texto.
- Nunca corregir todo: seleccionar los errores más sistémicos o los relacionados con la gramática target de la sesión.

---

### 5.12 Gestión del L1 en el aula técnica

La pregunta sobre el uso del español en el aula de inglés técnico es real, compleja, y no tiene una respuesta única. La posición de la investigación contemporánea en adquisición de segundas lenguas es clara: **el L1 es un recurso cognitivo, no un enemigo**. La pregunta correcta no es *¿se puede usar español?* sino *¿para qué se está usando, y en qué momento?*

#### El mapa de uso del L1 en FPI SENA

| Uso del L1 | ¿Legítimo? | Nota |
|-----------|:----------:|------|
| Explicar una regla gramatical compleja (cuadro resumen) | ✓ Sí | Más eficiente y seguro que un metalenguaje en L2 que el aprendiz no comprende |
| Instrucciones de seguridad críticas en el taller | ✓ Sí | La seguridad no se compromete por principio pedagógico |
| Verificar comprensión de un texto técnico clave | ✓ Condicional | Solo si hay evidencia de bloqueo total de comprensión |
| Apoyo emocional o metacognitivo (Gap Cards, KWL) | ✓ Sí | El pensamiento reflexivo ocurre naturalmente en L1 al nivel A1 |
| Ejecutar una tarea de producción oral en L1 | ✗ No | La tarea pierde su propósito comunicativo |
| Responder en español cuando el inglés era posible | ✗ No | Patrón a reducir sistemáticamente con cada guía |
| Traducir automáticamente todo el vocabulario nuevo | ✗ No | Impide el desarrollo de pensamiento en L2; usar imagen/gesto primero |

#### La reducción progresiva del L1

El sistema FPI no exige "English only" desde el primer día — eso es pedagógicamente agresivo a nivel A1.1 y genera ansiedad sin beneficio. La política es de **reducción progresiva y señalizada**:

- **A1.1**: Alto uso del L1 en instrucciones, explicaciones gramaticales, y apoyo emocional. Las tareas de producción son en L2.
- **A1.2**: L1 se reduce. Instrucciones en L2 con soporte visual. Explicaciones gramaticales preferiblemente en L2, con L1 de respaldo.
- **A1.3**: L1 mínimo. Solo para seguridad y casos de bloqueo genuino. Las tareas de producción y la dinámica de clase son en L2.
- **A2.0+**: L2 como norma de aula. L1 solo en emergencias.

#### Técnicas prácticas

- **"English Zone" visual**: una señal visual acordada (cartel, color en la pizarra, gesto) que indica que estamos en modo L2. El aprendiz sabe que en ese momento la expectativa es inglés.
- **"Can you say that in English?"**: frase de docente consistente y no punitiva que recuerda al aprendiz el registro esperado.
- **Show before tell**: el docente siempre intenta primero con imagen, gesto o demostración antes de recurrir a la traducción. Si el objeto es visible, no hay necesidad de decir su nombre en español.
- **Evitar la traducción refleja**: cuando un aprendiz pregunta *"¿Qué significa 'torque'?"*, la respuesta no es *"significa par de torsión"* — es mostrar la imagen, el gesto de rotación, el contexto. La traducción es el último recurso, no el primero.
- **L1 de decodificación, L2 de producción**: el aprendiz puede procesar una instrucción compleja en L1 mentalmente, pero su respuesta, reporte, o producción debe ser en L2.

#### El riesgo del exceso de restricción

Prohibir el L1 completamente a nivel A1.1 genera ansiedad elevada, reduce la participación, y produce aprendices que prefieren el silencio al error. Un ambiente de aula donde el error es datos — no fracaso — solo se sostiene si el aprendiz siente que tiene acceso a herramientas de apoyo, incluyendo su propio idioma, en los momentos apropiados.

---

### 5.13 Noticing de stress con soporte físico

El inglés es una lengua *stress-timed*: el ritmo no es igual para cada sílaba, sino que las sílabas acentuadas ocurren a intervalos aproximadamente regulares y las no acentuadas se comprimen, reducen, o eliden. El español es *syllable-timed*: cada sílaba recibe un peso temporal similar.

Esta diferencia es la causa más frecuente de incomprensión entre hablantes de inglés técnico cuya L1 es español: el aprendiz produce inglés con ritmo español — cada sílaba igual — y el oyente nativo no puede procesar el patrón rítmico. Igualmente, el aprendiz escucha inglés nativo y no reconoce las palabras porque las sílabas débiles han desaparecido o cambiado de forma.

**El trabajo de stress no es opcional ni decorativo — es la diferencia entre ser comprendido y no serlo.**

#### Stress de palabra (word stress)

Todo término técnico nuevo debe enseñarse con su patrón de stress desde el primer encuentro. Nunca introducir vocabulario sin marcar el stress.

Convenciones de marcación:
- **Mayúscula en la sílaba tónica**: diAGnosis, INspection, toRQUE, CYLinder
- **Punto grande sobre la sílaba tónica** en la pizarra: `•  ○  ○` para "diagnosis"
- **Subrayado de la sílaba tónica** en Word Wall y glosario

Errores de stress frecuentes en vocabulario técnico para hablantes de español:
| Palabra | Error frecuente | Correcto |
|---------|----------------|---------|
| engine | en-GI-ne | EN-gine |
| cylinder | ci-LIN-der | CYL-in-der |
| maintenance | main-TE-nan-ce | MAIN-te-nance |
| diagnose | diag-NO-se | DI-ag-nose (v.) |
| procedure | pro-CE-du-re | pro-CE-dure |
| pressure | pres-SU-re | PRES-sure |

#### Soporte físico — técnicas

**1. Finger drilling (dedos)**
El docente extiende los dedos de una mano, uno por sílaba. Al pronunciar la palabra, golpea (o aprieta) más fuerte el dedo que corresponde a la sílaba tónica. Los aprendices replican con sus propias manos. La clave: el cuerpo registra el stress como información física, no solo auditiva.

*Ejemplo — "maintenance" (3 sílabas):*
- Dedo 1 (índice) = MAIN → golpe fuerte
- Dedo 2 (medio) = te → golpe suave
- Dedo 3 (anular) = nance → golpe suave

**2. Clapping / tapping**
El grupo aplaude o golpea la mesa siguiendo el patrón rítmico de la frase. Las sílabas tónicas reciben un golpe más fuerte. Útil para frases completas donde el ritmo de la oración importa.

**3. Backchaining desde la sílaba tónica**
Se construye la palabra hacia atrás, empezando siempre en la sílaba tónica:
- "...nance" → "...tenance" → "maintenance" → "preventive maintenance"
El aprendiz siempre tiene claro dónde está el eje rítmico de la palabra.

**4. Marcación en la pizarra**
El docente escribe la palabra en la pizarra con la sílaba tónica en un tamaño de letra visiblemente mayor, o con un círculo grande sobre ella:
```
  ●   ○   ○
MAIN-te-nance
```

**5. Choral drilling con gesto físico**
El docente modela con un gesto de mano ascendente-descendente que marca la sílaba tónica (mano sube en la tónica, baja en las átonas). El grupo repite copiando el gesto. El gesto ancla el patrón en la memoria motriz.

#### Stress de oración (sentence stress)

En inglés, dentro de una oración, las **palabras de contenido** (sustantivos, verbos principales, adjetivos, adverbios) reciben stress; las **palabras de función** (artículos, preposiciones, pronombres, auxiliares) se reducen o eliden.

*"The ENGINE has LOST OIL PRESSURE."* — no: *"The engine has lost oil pressure."* con stress igual en cada palabra.

Esta distinción es crítica para la comprensión del listening técnico: cuando el aprendiz escucha a un hablante nativo, las palabras de función se vuelven casi inaudibles, y si el aprendiz las espera con el mismo peso que en español, pierde el hilo.

Técnica de práctica: el docente presenta la frase y pide al grupo que identifique las palabras "importantes" (las que llevarían stress). Luego practica la frase marcando físicamente cada palabra de contenido con un golpe de mano.

---

## 6. Descriptores CEFR por Subnivel — Tabla de Referencia para Diseñadores

*Esta tabla es el instrumento operativo central para el diseño de actividades. Cada PM debe poder ser trazado a al menos una celda de esta tabla. Las descripciones son relativas al contexto técnico y vocacional del programa, no al inglés general.*

| Competencia | A1.1 — Breakthrough inicial | A1.2 — Breakthrough consolidado | A1.3 — Breakthrough avanzado |
|-------------|----------------------------|--------------------------------|------------------------------|
| **Comprensión oral** | Comprende instrucciones de 1–2 pasos pronunciadas muy despacio, con pausas largas. Reconoce términos técnicos básicos pronunciados aislados con apoyo visual. | Comprende instrucciones de 2–3 pasos pronunciadas despacio. Comprende valores numéricos y unidades de medida en contexto. Sigue un diálogo simple si el ritmo es lento. | Comprende instrucciones de procedimiento multi-paso. Sigue un briefing técnico breve con apoyo visual. Comprende la idea principal de una explicación simple si el hablante habla despacio y articula. |
| **Comprensión lectora** | Reconoce nombres, etiquetas y símbolos en herramientas y equipos. Lee listas con apoyo visual. Identifica números y unidades básicas. | Lee procedimientos simples de mantenimiento (pasos numerados). Identifica valores en especificaciones básicas. Comprende advertencias de seguridad simples. | Lee un reporte de inspección básico. Comprende diagramas con leyendas. Localiza información específica en una especificación técnica de extensión media. |
| **Interacción oral** | Puede saludar, presentarse y responder Sí/No. Puede dar nombre, programa y turno. Puede pedir repetición con frase fija ("Please repeat"). | Puede describir brevemente lo que está haciendo. Puede pedir aclaración ("Can you say that again?"). Puede reportar el estado simple de una tarea a su supervisor. | Puede describir un problema técnico con vocabulario limitado. Puede solicitar información técnica específica. Puede participar en un intercambio de información estructurado con pares. |
| **Producción oral** | Produce palabras y frases aisladas. Puede nombrar objetos presentes en el entorno laboral. | Produce frases completas simples. Puede describir un procedimiento de 2–3 pasos. Puede reportar un hallazgo simple. | Puede presentar los hallazgos de una inspección básica. Puede describir un proceso de 4–5 pasos en secuencia. Puede hacer recomendaciones simples. |
| **Producción escrita** | Puede completar un formulario con datos personales. Puede escribir listas de palabras o ítems. | Puede completar un formato de reporte con datos técnicos. Puede escribir una lista de verificación básica. | Puede redactar un reporte de inspección básico. Puede escribir una nota técnica simple. Puede completar un formato de diagnóstico estructurado. |
| **Vocabulario activo** | 50–100 términos del dominio técnico del programa. Usa palabras de manera aislada o en frases muy fijas. | 150–250 términos. Conoce collocations básicas del dominio (*check the level / drain the filter / tighten the bolt*). | 300–400 términos. Usa collocations con confianza. Comienza a usar expresiones fraseológicas del dominio. |
| **Gramática** | Presente simple afirmativo (I use / He checks). Imperativo básico (Open / Close / Check). Números y unidades básicas. | Presente simple afirmativo, negativo e interrogativo. Imperativo con expresiones de seguridad. Modal *must* para obligación. Números ordinales y cardinales en contexto técnico. | Presente perfecto para historial de servicio. Condicional tipo 1 para advertencias. Voz pasiva básica para procedimientos. Conectores de secuencia (*first, then, next, after that, finally*). |
| **Fonología** | Pronuncia palabras conocidas de manera comprensible con esfuerzo. Identifica el número de sílabas de palabras familiares. | Pronuncia frases cortas con stress correcto en la palabra clave. Produce ritmo reconocible en frases de 3–5 palabras. Distingue pares mínimos frecuentes en el dominio. | Produce frases y oraciones cortas con ritmo reconocible. Aplica stress de manera consistente en vocabulario técnico conocido. Procesa listening con velocidad ligeramente aumentada. |
| **Funciones comunicativas** | Saludar, presentarse, agradecer, pedir repetición, nombrar objetos. | Describir acciones en curso, reportar estado, pedir aclaración, dar instrucción simple. | Describir problema, recomendar acción, presentar hallazgos, solicitar información técnica, expresar obligación/necesidad. |

---

## 7. Instrumento de Trazabilidad Pedagógica

*Checklist de verificación para diseñadores de PM. Debe completarse para cada PM antes de su aprobación para producción. Un PM que no aprueba este instrumento debe ser revisado antes de avanzar al siguiente.*

### A. Trazabilidad CEFR

| # | Verificación | ✓ / ✗ | Nota |
|---|-------------|:-----:|------|
| A1 | El PM está asignado a un subnivel CEFR específico (A1.1 / A1.2 / A1.3 / A2.0 / A2.1) | | |
| A2 | Cada actividad del PM puede ser trazada a al menos un descriptor de la Sección 4 de PM-0 | | |
| A3 | El descriptor citado corresponde al subnivel asignado según la Sección 6 de PM-0 | | |
| A4 | Las competencias exigidas por las actividades están dentro del alcance del subnivel (no sobreexige) | | |
| A5 | El vocabulario activo del PM proviene del Word Wall o del glosario del nivel correspondiente (PM-2.5) | | |
| A6 | Los textos de input están adaptados al nivel: longitud, velocidad, densidad léxica | | |

### B. Trazabilidad pedagógica

| # | Verificación | ✓ / ✗ | Nota |
|---|-------------|:-----:|------|
| B1 | El PM incluye pre-enseñanza de vocabulario con al menos uno de los 4 propósitos (§ 5.7) | | |
| B2 | El PM incluye drilling explícito (choral, sustitución y/o backchaining) donde corresponde (§ 5.6) | | |
| B3 | El PM diferencia explícitamente los momentos de accuracy y fluency (§ 5.11) | | |
| B4 | El PM gestiona el uso del L1 de manera consciente y señalada para el nivel (§ 5.12) | | |
| B5 | El PM incluye trabajo de stress al introducir vocabulario nuevo (§ 5.13) | | |
| B6 | El PM incluye un componente de producción personalizada (My Turn o equivalente) (§ 5.10) | | |
| B7 | El PM incluye al menos un instrumento de autoevaluación (can-do / KWL / Gap Card) (§ 5.8) | | |
| B8 | El PM proporciona andamiaje apropiado al subnivel (más andamiaje en A1.1, menos en A1.3) | | |

### C. Trazabilidad de estructura de sesión

| # | Verificación | ✓ / ✗ | Nota |
|---|-------------|:-----:|------|
| C1 | El PM puede ubicarse en un bloque específico de la estructura de sesión FPI (§ 5.10) | | |
| C2 | El tiempo estimado del PM es realista para el bloque al que pertenece | | |
| C3 | El PM conecta de manera lógica con el PM precedente y el siguiente en la secuencia de la sesión | | |
| C4 | El PM contribuye a la progresión de baja a alta complejidad cognitiva dentro de la sesión | | |

### D. Trazabilidad de evaluación

| # | Verificación | ✓ / ✗ | Nota |
|---|-------------|:-----:|------|
| D1 | El PM contribuye a la Misión Final (PM-3.5) de la guía | | |
| D2 | Hay al menos un can-do statement asociado a este PM | | |
| D3 | El criterio de evaluación está expresado en términos de desempeño observable ("puede hacer X") | | |
| D4 | El criterio de evaluación es consistente con los descriptores CEFR del subnivel (no evalúa lo que no corresponde al nivel) | | |

### Resultado

| Sección | Ítems | Aprobados | Estado |
|---------|:-----:|:---------:|--------|
| A — CEFR | 6 | ___ | |
| B — Pedagógico | 8 | ___ | |
| C — Estructura | 4 | ___ | |
| D — Evaluación | 4 | ___ | |
| **TOTAL** | **22** | **___** | **Aprobado si ≥ 20/22** |

*Un PM con 1–2 ítems sin aprobar puede avanzar con observación documentada. Un PM con 3 o más ítems sin aprobar debe ser revisado antes de producción.*

---

## 8. Hoja de Ruta del Sistema FPI — Alcance A1.1 → A2.x

*Esta sección describe qué cambia metodológicamente al escalar de subnivel. Su propósito es prevenir que diseñadores apliquen los principios de A1.1 a niveles superiores, o que asuman que lo que funciona en A1.3 es adecuado para A1.1.*

| Dimensión | A1.1 | A1.2 | A1.3 | A2.0–A2.1 |
|-----------|------|------|------|-----------|
| **Velocidad del input oral** | Muy lenta — pausas largas frecuentes | Lenta — pausas frecuentes | Moderada — pausas ocasionales | Moderada natural — algunas pausas |
| **Extensión de textos escritos** | 1–3 oraciones, apoyo visual obligatorio | 3–7 oraciones, apoyo visual frecuente | Párrafos cortos (5–10 oraciones), apoyo visual opcional | Textos multi-párrafo, apoyo visual como enriquecimiento |
| **Autonomía del aprendiz** | Alta dependencia del docente — instrucciones paso a paso | Dependencia moderada — instrucciones con andamiaje | Semi-autónomo en tareas conocidas — instrucciones generales | Progresivamente autónomo — directivas abiertas |
| **Uso del L1** | Alto — permitido para explicación, apoyo y metacognición | Reducido — L2 en tareas, L1 de respaldo en explicación | Mínimo — L2 como norma, L1 solo en seguridad o bloqueo genuino | L2 exclusivo — L1 solo en emergencia |
| **Tipos de interacción** | Docente → aprendiz, pares con guión fijo | Pares con andamiaje, diálogos estructurados | Grupos pequeños, mingle, interacción semi-espontánea | Debate estructurado, presentación, negociación |
| **Andamiaje** | Máximo — sentence starters, word banks, frames completos | Alto — frames parciales, word banks | Moderado — prompts iniciales, sin frames completos | Mínimo — aprendiz construye sin andamiaje previo |
| **Complejidad gramatical** | Presente simple, imperativo básico | + Negativo, interrogativo, *must*, modales de obligación | + Presente perfecto, Condicional tipo 1, voz pasiva básica | + Condicional tipo 2, reported speech, modales de posibilidad |
| **Densidad léxica activa** | 50–100 términos | 150–250 términos | 300–400 términos | 400–600 términos |
| **Feedback predominante** | Inmediato, choral — accuracy prioritario | Mixto: inmediato en drilling, diferido en fluency | Diferido post-tarea predominante — errores sistémicos | Peer feedback + self-assessment — feedback del docente como monitor |
| **Misión Final** | Oral simple (nombrar, describir) + formulario básico | Reporte básico + presentación oral estructurada | Presentación de hallazgos + reporte de diagnóstico | Diagnóstico complejo + presentación + defensa técnica |
| **Pensamiento crítico** | Reconocimiento y clasificación | Secuenciación y descripción de procedimientos | Análisis de síntomas, diferenciación causa/efecto | Diagnóstico, RCA, evaluación y recomendación fundamentada |
| **Rol del docente** | Modelo central — driller y fuente de input | Modelo y andamio — guía la práctica | Facilitador — estructura el contexto, el aprendiz produce | Monitor y retroalimentador — el aprendiz lidera |

### Señales de que el diseño está desajustado por nivel

**Sobreexigencia** (el PM pide más de lo que el subnivel permite):
- Textos de más de 10 oraciones en A1.1
- Producción libre sin andamiaje en A1.1 o A1.2
- Análisis de causa raíz en A1.1
- Velocidad de audio natural en A1.1 o A1.2

**Subeexigencia** (el PM no llega al piso del subnivel):
- Solo reconocimiento de palabras aisladas en A1.2 o A1.3
- Ningún componente de producción oral en cualquier guía
- Andamiaje total (frames completos) en A1.3 o A2.x
- Ausencia de pensamiento crítico desde A1.2 en adelante

---

*Este documento es la raíz del sistema FPI SENA. Todo PM que no pueda ser trazado a un descriptor CEFR o a un principio pedagógico de esta capa debe ser revisado antes de producción.*

---

## 9. Implementación del Protocolo PM-0 en el Pipeline — Referencia Técnica

Esta sección documenta cómo los principios de PM-0 se implementan concretamente en el pipeline de generación de guías. Es el puente entre la teoría pedagógica y el código.

> [!warning] AVISO PARA EL LLM — Leer antes de usar §9
> - **§9.1 (tabla L1%)** y **§9.2 (grupos gramaticales)**: Los **porcentajes y la convención Intro/Consolida/Aplica** son NORMATIVOS para cualquier programa. Los **nombres de sesión** ("The Wake-Up Call", etc.) y **grupos gramaticales específicos** (Gr 1, 2, 5, 7, 3) son de la instancia DIESEL G1 — son **ejemplos de referencia**. Para un nuevo programa, mantener los porcentajes de L1 y el framework CEFR; elegir grupos gramaticales apropiados para ese RAP y ese nivel.
> - **§9.3 (schema JSON)**: El esquema de campos es NORMATIVO para todos los programas. Los valores de ejemplo dentro del schema (cuando aparecen) son ilustrativos, no prescriptivos.
> - **§9.4 (script de referencia)**: `pm-3-2-pm0-patch.js` es el script canónico de DIESEL G1. Cualquier nuevo programa genera su propio script siguiendo el mismo patrón pero con valores propios.

---

### 9.1 Reducción Progresiva del L1 — Tabla por Sesión (Guía A1.1)

La política de L1 del §5.12 se operacionaliza en porcentajes concretos por sesión dentro de una guía A1.1. Los **porcentajes son normativos**; los nombres de sesión son de referencia (DIESEL G1):

> **Ejemplo de referencia — DIESEL G1.** Los nombres de sesión ("The Wake-Up Call", "Reading the Workshop", etc.) son específicos de ese programa. El tipo de actividad dominante por sesión (diagnóstico, reading/vocabulary, grammar/writing, etc.) sí es un patrón generalizable.

La política de L1 del §5.12 se operacionaliza en porcentajes concretos por sesión dentro de una guía A1.1. Esta tabla es normativa para el diseño de sesiones:

| Sesión | Nombre típico | L1 máximo | Justificación |
|--------|--------------|-----------|---------------|
| S1 | The Wake-Up Call (Diagnóstico) | ≤ 30 % | Día 1 — establecer confianza, reducir filtro afectivo |
| S2 | Reading / Vocabulary | ≤ 25 % | Primera exposición sistemática — scaffolding permitido |
| S3 | Grammar / Writing | ≤ 20 % | Foco en forma — tablero + ejemplos reemplazan explicación en L1 |
| S4 | Listening / Speaking | ≤ 15 % | Tareas comunicativas — mayor autonomía esperada |
| S5 | Language Functions | ≤ 12 % | Peer scaffolding — aprendices fuertes como language coaches |
| S6 | Cuestionario / Evaluación | ≤ 10 % | Condición de evidencia — cuestionario 100 % en L2 |
| S7 | Final Mission Prep | ≤ 10 % | Ensayo de presentación completo en L2 |
| S8 | Final Mission Live | ≤ 5 %  | Evidencia sumativa — presentación oral 100 % en L2 |

**Progresión por subnivel:**
- **A1.1** (Guía 1): S1 30% → S8 5%
- **A1.2** (Guía 2): S1 20% → S8 3%
- **A1.3** (Guía 3): S1 10% → S8 0%
- **A2.x**: L2 como norma de aula desde S1

---

### 9.2 Activación de Grupos Gramaticales por Sesión

Los 17 grupos del silabus gramatical (§5.6) se activan progresivamente. Convención: **Intro** = primera exposición receptiva, **Consolida** = práctica controlada, **Aplica** = producción libre o semi-libre.

> **Ejemplo de referencia — DIESEL G1 (A1.1).** Los grupos gramaticales activados (Gr 1, 2, 5, 7, 3) y su distribución por sesión son específicos de ese RAP. Para un programa diferente, seleccionar grupos del silabus §5.6 apropiados para las funciones comunicativas del RAP y el nivel CEFR. La **convención Intro/Consolida/Aplica** y el **principio de carga** (máx. 2 grupos nuevos por sesión) son normativos para todos los programas.

| Grupo | Estructura | S1 | S2 | S3 | S4 | S5 | S6–S8 |
|-------|-----------|:--:|:--:|:--:|:--:|:--:|:-----:|
| Gr 1 | Verbo be (afirm., neg., pregunta) | Intro | Consolida | Consolida | Aplica | Aplica | Aplica |
| Gr 2 | There is / There are | — | Intro | Consolida | Consolida | Aplica | Aplica |
| Gr 5 | Imperativos | — | — | Intro | Consolida | Aplica | Aplica |
| Gr 7 | Can / Can't (ability) | — | — | — | Intro | Consolida | Aplica |
| Gr 3 | Presente simple | — | — | — | — | Intro | Consolida |

**Principio de carga (normativo)**: nunca más de 2 grupos nuevos (Intro) en una misma sesión. Los grupos en Aplica no requieren instrucción explícita — solo práctica en contexto.

---

### 9.3 Esquema JSON del Campo `pm0_protocol`

Todo JSON de sesión (pm-3-2-sX.json) debe incluir el campo `pm0_protocol` con la siguiente estructura. Este campo es **obligatorio** desde la versión 2.1 del pipeline.

```json
"pm0_protocol": {
  "grammar_groups": [
    "Grupo N — Nombre: estado (Intro / Consolida / Aplica). Estructuras target.",
    "..."
  ],
  "feedback": {
    "mode": "ACCURACY | FLUENCY | MIXTO — descripción del modo dominante",
    "accuracy_techniques": [
      "Recast: ...",
      "Elicitación: ...",
      "Metalinguistic cue: ...",
      "Corrección explícita: solo si...",
      "Rising intonation: ..."
    ],
    "fluency_techniques": [
      "Sin interrupciones durante...",
      "Post-task delayed feedback: ...",
      "Error codes: G / V / WO / Sp — ..."
    ],
    "notes": "Nota operativa específica de esta sesión."
  },
  "l1_management": {
    "l1_percentage": "≤ X % L1. Justificación.",
    "english_zone_declaration": "Cómo y cuándo se declara el English Zone esta sesión.",
    "l1_allowed_for": [
      "Caso 1 donde L1 es legítimo.",
      "Caso 2 donde L1 es legítimo."
    ],
    "reduction_strategy": "Técnica específica para reducir L1 en esta sesión."
  },
  "stress_pronunciation": {
    "focus_words": ["palabra1", "palabra2", "frase técnica"],
    "techniques": [
      "Finger drilling: descripción.",
      "Backchaining: punto de partida → palabra completa.",
      "Clapping: patrón rítmico target.",
      "Choral drill × N: secuencia instructor → grupo A → grupo B → clase.",
      "Board marking: cómo se marca en el tablero."
    ],
    "board_marking": "Representación visual del stress para esta sesión. Ej: MAIN-te-nance",
    "notes": "Nota específica de pronunciación para esta sesión."
  },
  "success_vocabulary": {
    "target_words": ["término1", "término2"],
    "factors_applied": [
      "S — Sounds: cómo se trabaja la fonología.",
      "U — Use: dónde usan el término en contexto.",
      "C — Conceptualize: actividad de mapa mental / imagen.",
      "C — Creativity: tarea generativa del aprendiz.",
      "E — Encounter again: en qué otro momento de la sesión reaparece.",
      "S — Self-expression: cómo lo usa el aprendiz con sus propias palabras."
    ]
  }
}
```

**Notas de implementación:**
- Los campos `accuracy_techniques` y `fluency_techniques` pueden ser arrays vacíos `[]` si el modo no aplica a esa sesión.
- `focus_words` puede ser array vacío en sesiones de evaluación escrita (S6).
- `target_words` en `success_vocabulary` puede ser `["All Toolbelt terms — review"]` en sesiones de cierre.
- El script `pm-3-2-pm0-patch.js` es la referencia canónica de implementación para G1 DIESEL.

---

### 9.4 Script de referencia

El archivo `pm-3-2-pm0-patch.js` (runs/DIESEL-2026-04-15/) contiene la implementación canónica del `pm0_protocol` para las 8 sesiones de G1 — The Workshop Specialist. Cualquier nueva guía debe generar su propio script de patch siguiendo el mismo patrón, adaptando:
- Los grupos gramaticales activos por sesión
- Los términos de vocabulario del Toolbelt del programa
- El nivel de L1 por subnivel (ver tabla §9.1)
- Las técnicas de stress para el vocabulario técnico específico del programa

---

## 10. Implementación Técnica por Run — `pm-0-context.json` (v1.1, 2026-04-20)

### 10.1 Propósito del artefacto

PM-0 es **genérico**: cubre el marco CEFR A1.1–A2.2, los 13 principios pedagógicos (§5.1–§5.13), el silabus de 17 grupos gramaticales, y la hoja de ruta A1.1→A2.x. Pero cada **programa FPI SENA** tiene características que lo particularizan:

- Un universo narrativo propio (personajes, empresa ficticia, sector productivo)
- Un rango CEFR objetivo específico (no todas las guías cubren A1.1→A2.2)
- Una progresión CEFR decidida por el instructor (lineal o con refuerzo)
- Un vocabulario técnico específico del sector (mecánica diesel, diseño gráfico, seguridad marítima, etc.)
- Un Grupo 17 sector-específico en el silabus gramatical

Antes de v2.6, esta contextualización se duplicaba dentro de cada pm-1-1.json y pm-1-2.json de cada guía. Esto generaba **drift** entre las 6–10 guías del mismo programa (diferentes nombres de personajes, diferentes interpretaciones del CEFR, diferentes activaciones gramaticales para lo que debía ser la misma secuencia).

**`pm-0-context.json` consolida esta contextualización a nivel de programa** (no de guía). Es un artefacto que se genera **UNA vez por programa** y lo comparten todas las guías G1..GN del mismo.

### 10.2 Schema canónico de `pm-0-context.json`

```json
{
  "programa_id": "MGV-2026",
  "programa_nombre": "Desarrollo de Medios Gráficos Visuales",
  "programa_codigo_sofia": "522309",
  "tipo": "Tecnológico",
  "duracion_total_horas": 360,
  "rango_cefr": "A1.1 → A2.2",
  "numero_guias": 6,
  "progresion_cefr_decision": "Opción A — A1.1 → A1.2 → A1.3 → A2.0 → A2.1 → A2.2",
  "progresion_cefr_justificacion": "…",

  "universo_narrativo": {
    "empresa_ficticia": "Pixel & Ink Studio",
    "sector": "Diseño gráfico / Medios visuales",
    "escenario_principal": "…",
    "personajes": [
      { "nombre": "Andrés", "rol": "Junior Designer (aprendiz)", "descripcion": "…" },
      { "nombre": "Sophia", "rol": "Art Director (cliente La Esquina Bakery)", "descripcion": "…" },
      { "nombre": "Laura", "rol": "Creative Director (mentora)", "descripcion": "…" }
    ],
    "productos_tipicos": ["logo", "poster", "packaging", "social media post"],
    "terminologia_sector": ["brand", "typography", "palette", "brief", "mood board"]
  },

  "grammar_roadmap": [
    {
      "group_id": "G01",
      "nombre": "Verb to be (present)",
      "activacion_por_guia": {
        "G1": "Intro",
        "G2": "Consolida",
        "G3": "Aplica",
        "G4": "Aplica",
        "G5": "Aplica",
        "G6": "Aplica"
      }
    },
    "… (17 grupos total, incluyendo el Grupo 17 sector-específico)"
  ],
  "grammar_group_17_sector": {
    "group_id": "G17",
    "nombre": "Visual design verbs + adjectives",
    "ejemplos": ["design", "sketch", "render", "bold", "minimal"],
    "aplicabilidad": "Programa MGV específico — no aplica a otros sectores"
  },

  "l1_percentage_per_session": {
    "G1": { "S1": "70-80%", "S2": "60-70%", "S3": "50-60%", "S4": "40-50%", "S5": "30-40%", "S6": "30%", "S7": "20-30%", "S8": "10-20%" },
    "G2": { "…": "…" },
    "…": "…"
  },

  "shifts_metodologicos": [
    {
      "de_nivel": "A1.1",
      "a_nivel": "A1.2",
      "descriptor": "De presentación propia con frases aisladas → a interacción corta con preguntas/respuestas siguiendo un guion",
      "implicacion_pedagogica": "…"
    },
    "…"
  ],

  "principios_aplicables": {
    "G1": ["§5.1 ESP realia", "§5.4 L1 scaffolding", "§5.7 Vocabulary chunks", "§5.12 L1 management high"],
    "G2": ["…"],
    "…": "…"
  },

  "pm0_protocol_template": {
    "grammar_groups": { "intro": [], "consolida": [], "aplica": [] },
    "feedback": { "dominant_mode": "", "accuracy_techniques": [], "fluency_techniques": [] },
    "l1_management": { "target_percentage": "", "english_zone": "", "legitimate_uses": [], "reduction_strategy": "" },
    "stress_pronunciation": { "focus_words": [], "physical_techniques": [], "board_marking": "" },
    "success_vocabulary": { "target_words": [], "success_factors": [] }
  },

  "fase_0_metadata": {
    "fecha_generacion": "2026-04-20",
    "aprobado_por_instructor": true,
    "version": "1.0",
    "ultima_revision": "2026-04-20"
  }
}
```

### 10.3 Decisión obligatoria con el instructor — Opción A / B / Otro

Al generar `pm-0-context.json`, se debe PREGUNTAR al instructor explícitamente qué progresión CEFR aplicar:

**Opción A (lineal):** 1 sub-nivel por guía  
`A1.1 (G1) → A1.2 (G2) → A1.3 (G3) → A2.0 (G4) → A2.1 (G5) → A2.2 (G6)`  
Recomendado cuando: 6 guías, cohorte con ritmo homogéneo, sector sin necesidad particular de refuerzo.

**Opción B (con refuerzo):** 2 guías por sub-nivel  
`A1.1 (G1) → A1.1+ (G2) → A1.2 (G3) → A1.2+ (G4) → A1.3 (G5) → A2.0 (G6)`  
Recomendado cuando: cohorte heterogénea, necesidad de consolidar antes de avanzar, sector con vocabulario especializado que requiere más exposición.

**Otro:** Progresión ad-hoc definida por el instructor  
Ejemplo: `A1.1 (G1) → A1.2 (G2) → A1.2 (G3) → A1.3 (G4) → A2.0 (G5) → A2.1 (G6)`  
Documentar en `progresion_cefr_justificacion` el criterio aplicado.

### 10.4 Descriptores CEFR diferenciados por guía

La tabla completa de descriptores por subnivel (§6 de este PM-0) se **desdobla** en `pm-0-context.json` para cada guía:

```
G1 (A1.1): ["Can greet and introduce self...", "Can name familiar objects..."]
G2 (A1.2): ["Can describe people and routines...", "Can ask and answer simple questions..."]
G3 (A1.3): ["Can give short descriptions of events...", "Can follow simple directions..."]
G4 (A2.0): ["Can describe past experiences...", "Can write short connected texts..."]
G5 (A2.1): ["Can explain opinions briefly...", "Can handle short transactions..."]
G6 (A2.2): ["Can describe plans and preferences...", "Can write short reports..."]
```

Esta tabla alimenta directamente a `pm-3-1.json.pm0_alignment_by_session[i].cefr_descriptors` (Principio 10 DM).

### 10.5 Grupo 17 sector-específico

El silabus canónico de PM-0 tiene 17 grupos. Los grupos 1–16 son universales (verbos, tiempos, preguntas, comparativos, etc.). El **Grupo 17 es sector-específico** y se construye en `pm-0-context.json.grammar_group_17_sector` adaptado al programa:

- **DIESEL:** "Engine troubleshooting modals" (should, must, might, can't — para diagnóstico)
- **MGV:** "Visual design verbs + adjectives" (design, sketch, render, bold, minimal)
- **Inglés Marítimo:** "Navigation imperatives" (steer, anchor, berth, clear — en modo imperativo)
- **ADSO:** "Software conditional" (if + present, subject + will — para debugging logic)

### 10.6 Uso posterior en el pipeline

```
pm-0-context.json (Fase 0, por programa)
    ↓ referenced via pm0_anchors_ref
pm-1-1.json (Fase 1, por guía)
    ↓ hereda universo + CEFR
pm-1-2.json (4 bloques)
    ↓ hereda grammar_roadmap[G_actual]
pm-2-0..pm-2-11 (Fase 2, Activity Cards)
    ↓ usan l1_percentage_per_session + grammar activations
pm-3-1.json (Fase 3, Playbook Outline)
    ↓ construye pm0_alignment_by_session usando pm-0-context
pm-3-2-sX.json (Fase 3, Build-Out por sesión)
    ↓ copia pm0_protocol_template y lo rellena por sesión
pm-3-5/pm-3-6 (Fase 4, derivados)
    ↓ activity_footer heredan duration/ambiente desde aquí
```

### 10.7 Validación

- El instructor aprueba `pm-0-context.json` ANTES de ejecutar PM-1.1 (Fase 1).
- pm-1-1.json debe contener `pm0_anchors_ref` apuntando al archivo.
- PM-2.11 Check 16 (v2.6 futuro) validará que `pm-1-1.pm0_anchors_ref` resuelve a un archivo existente y que `programa_id` coincide entre ambos.

### 10.8 Implementación de referencia

**MGV-2026-04-20** es la primera implementación completa de `pm-0-context.json`. Ubicación: `runs/MGV-2026-04-20/pm-0-context.json`. Futuros programas pueden copiar el schema (no el contenido) y rellenar sus propios valores.

---
