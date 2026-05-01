# PM-0.0: MATRIZ PEDAGÓGICA ALINEADORA

## FPI SENA — Bilingüismo · Pre-Phase 1

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-0.0 |
| **Nombre** | Matriz Pedagógica Alineadora · alineación curricular pre-Fase 1 |
| **Versión** | 1.0 |
| **Last Verified** | 2026-05-01 |
| **Destinatario** | Pipeline (insumo CRÍTICO de PM-0 · PM-1.1 · PM-1.2 · PM-2.x · PM-2.11 · PM-3.7) |
| **Función** | Tomar la información curricular SOFÍA agregada (saberes de concepto + saberes de proceso + criterios de evaluación) y ALINEARLA explícitamente por cada RAP del programa. Produce matriz pedagógica que se vuelve fundamento de toda la cadena downstream. |
| **Analogía** | Es el "ADN curricular pre-clasificado" · sin esto, todo el pipeline opera sobre información agregada y la alineación se reconstruye retroactivamente al final (PM-2.11) · con esto, el diseño es verdaderamente de adentro hacia afuera por RAP desde día 0. |
| **Camino arquitectónico** | Camino 2 LLM puro · NO renderer Python · NO transformación mecánica |
| **Phase** | 0 (pre-Phase 1) |
| **Depends On** | Form xlsx parsed (or contenido pegado directo · agnóstico fuente) |
| **Trigger** | Antes de PM-0 · primer subagente del pipeline · gate humano implícito (Sergio aprueba la alineación antes de avanzar) |
| **Fuente de verdad** | `pm-0-0-matriz-alineada.json` (single source of truth · downstream PMs lo consumen literal) |

> [!warning] PARADIGM SHIFT v1.0 · 2026-05-01 · Sergio Cortés
> 
> **Trigger:** Sergio detectó que el sistema diseñaba "de adentro hacia afuera" en teoría (DM declara Diseño UbD desde v2.0) pero en práctica reconstruía la matriz GFPI-F-134 retroactivamente en PM-2.11 (al final de Fase 2) usando información agregada que el LLM había procesado sin saber a qué RAP pertenecía cada saber/criterio.
>
> **Decisión arquitectónica fundamental:** crear PM-0.0 como PRIMER subagente del pipeline. Toma la información agregada del form (saberes de concepto + saberes de proceso + criterios de evaluación · sin clasificar por RAP) y la ALINEA explícitamente por cada RAP. El output (`pm-0-0-matriz-alineada.json`) se vuelve el fundamento pedagógico de toda la cadena downstream.
>
> **Impacto cascada:** PM-0 + PM-1.1 + PM-1.2 + PM-2.0 + PM-2.x + PM-2.11 + PM-3.7 ahora consumen matriz alineada como input. PM-0 simplifica de 1077 → ~300 lines (libertad LLM con contenido alineado). PM-2.11 simplifica de "row assembler con reconstrucción matriz" a "row assembler con matriz heredada". PM-3.7 V04 multi-RAP rows se llenan con contenido REAL por RAP (no solo título RAP en R18-R21).

---

## ⚠️ PRE-GENERATION CHECKLIST — CANON v1.0 OBLIGATORIO

**ANTES de generar pm-0-0-matriz-alineada.json para CUALQUIER programa, completar este checklist:**

- [ ] **PASO A · Leer este master prompt completo** (especialmente §INPUT REQUERIDO + §OUTPUT ESPERADO + §REGLAS 1-7)
- [ ] **PASO B · Identificar fuente del input:**
  - Form xlsx parseado a JSON (`pm-0-0-input.json` o equivalent · si existe pre-procesamiento)
  - Contenido pegado directo en chat (Sergio dicta saberes/procesos/criterios + N RAPs)
  - JSON pre-existente con campos canónicos
- [ ] **PASO C · Validar inputs RAW canónicos disponibles:**
  - `competencia` (texto literal · 1 sola string)
  - `raps[]` (array · N elementos · cada uno con `rap_id` + `rap_codigo_sofia` + `rap_titulo` literal)
  - `saberes_conceptos_y_principios[]` (array agregado · sin clasificar por RAP · típicamente 5-15 ítems)
  - `saberes_proceso[]` (array agregado · sin clasificar por RAP · típicamente 8-15 ítems)
  - `criterios_evaluacion[]` (array agregado · sin clasificar por RAP · típicamente 5-12 ítems)
- [ ] **PASO D · Si algún input falta · STOP · pedir a Sergio antes de continuar.** NO inventar saberes/criterios · son canon SOFÍA Plus.
- [ ] **PASO E · Validar consistencia interna del input:**
  - N RAPs > 0 · text content non-empty
  - Saberes/criterios non-empty · son string content de SOFÍA
- [ ] **PASO F · Validar 7 checks PASS post-alineación** (ver §VALIDATION CHECKS)

---

## INPUT REQUERIDO

| Input | Fuente | Required | Descripción |
|-------|--------|----------|-------------|
| `competencia` | Form xlsx (Sheet B · R8-12) o JSON parseado | ✅ | Texto literal de la competencia laboral SOFÍA · 1 string |
| `raps[]` | Form xlsx (Sheet B · R19-22 · etc.) | ✅ | Array N elementos · cada uno {rap_id, rap_codigo_sofia, rap_titulo} |
| `saberes_conceptos_y_principios[]` | Form xlsx (Sheet B · R23-28) | ✅ | Array string · típicamente 5-15 UNITS / temas |
| `saberes_proceso[]` | Form xlsx (Sheet B · R29-39) | ✅ | Array string · típicamente 8-15 procesos |
| `criterios_evaluacion[]` | Form xlsx (Sheet B · R40-48) | ✅ | Array string · típicamente 5-12 criterios |
| `programa_metadata` | Form xlsx (Sheet A) | ⚙️ opcional | Para context · NO afecta alineación · solo annotation |

**Nota canónica:** PM-0.0 NO consume `universo_narrativo` ni `principios_pedagogicos` ni `cefr_descriptors`. Esos son input de PM-0 (que se ejecuta DESPUÉS). PM-0.0 trabaja solo con la matriz curricular SOFÍA pura.

---

## OUTPUT ESPERADO

### Artefacto único · `pm-0-0-matriz-alineada.json`

Schema canon-conforme · N RAPs dinámico:

```json
{
  "schema_version": "v1.0",
  "pm_id": "PM-0.0",
  "pm_name": "Matriz Pedagógica Alineadora",
  "pm_version": "1.0",
  "run_id": "<RUN-ID>",
  "guide_id": "<GUIDE-ID-if-applicable>",
  "generated_date": "YYYY-MM-DD",
  "instructor": "<nombre>",
  "phase": 0,
  "tipo_artefacto": "matriz_pedagogica_alineada_pre_pm0",

  "competencia": "TEXTO LITERAL DE LA COMPETENCIA SOFÍA",

  "raps_count": N,

  "raps": [
    {
      "rap_id": "RA1",
      "rap_codigo_sofia": "220301011",
      "rap_titulo": "TEXTO LITERAL DEL RAP SOFÍA",
      "saberes_conceptos_y_principios": [
        "UNIT 1: SHIP OVERVIEW",
        "PARTS OF THE SHIPS",
        "TYPES OF MERCHANT VESSELS",
        "..."
      ],
      "saberes_proceso": [
        "IDENTIFICAR Y EXTRAER INFORMACIÓN PRECISA EN INGLÉS...",
        "RECONOCER LOS DISTINTOS OFICIOS ENMARCADOS EN..."
      ],
      "criterios_evaluacion": [
        "Identifica vocablos básicos relacionados con partes del barco...",
        "Reconoce oficios enmarcados en sector marítimo..."
      ],
      "rationale_alineacion": "RA1 trata vocabulario básico de identificación. Agrupé las UNITS relacionadas con elementos físicos del puerto (ship overview · parts) y oficios (crew · professions) porque ambos son vocabulario fundacional. Excluí gramática (va a RA3) y SMCP (va a RA2). Asigné los procesos de IDENTIFICAR/RECONOCER porque son los procesos cognitivos centrales del RAP. Los criterios elegidos validan reconocimiento de vocabulario."
    },
    {
      "rap_id": "RA2",
      "rap_codigo_sofia": "...",
      "rap_titulo": "...",
      "saberes_conceptos_y_principios": [...],
      "saberes_proceso": [...],
      "criterios_evaluacion": [...],
      "rationale_alineacion": "..."
    }
    // ... N RAPs
  ],

  "alignment_audit": {
    "saberes_conceptos_total_input": 15,
    "saberes_conceptos_total_asignados_en_raps": 18,
    "saberes_conceptos_huerfanos": [],
    "saberes_conceptos_con_overlap": [
      {
        "saber": "MODAL VERBS: CAN, COULD, SHOULD, MUST",
        "raps": ["RA3", "RA4"],
        "razon_overlap": "Es contenido gramatical (RA3) que también se aplica en describing functions (RA4)"
      }
    ],
    "saberes_proceso_total_input": 10,
    "saberes_proceso_total_asignados_en_raps": 10,
    "saberes_proceso_huerfanos": [],
    "criterios_total_input": 5,
    "criterios_total_asignados_en_raps": 7,
    "criterios_con_overlap": [
      {
        "criterio": "Identifica vocabulario común en frases SMCP",
        "raps": ["RA1", "RA2"],
        "razon_overlap": "Toca vocabulario básico (RA1) y específicamente SMCP (RA2)"
      }
    ],
    "cobertura": {
      "saberes_conceptos": "100% · 15/15 saberes asignados a 1+ RAPs · 0 huérfanos",
      "saberes_proceso": "100% · 10/10 procesos asignados · 0 huérfanos",
      "criterios": "100% · 5/5 criterios asignados · 0 huérfanos"
    }
  },

  "alignment_strategy": {
    "criterio_principal": "Alineación pedagógica por verbo cognitivo del RAP (RECONOCER → vocabulario básico · COMPRENDER → frases estandarizadas · APLICAR → reglas gramaticales · DESCRIBIR → funciones)",
    "overlap_policy": "Permitido cuando 1 saber/criterio sirve a múltiples RAPs · documentado explícitamente con razón pedagógica · NO arbitrario",
    "huerfanos_policy": "Cero tolerancia · todo saber/criterio del input debe asignarse a 1+ RAP · si no encuentra hogar · STOP y pedir clarification",
    "secuencia_pedagogica": "RA1 < RA2 < RA3 < ... · respetar orden numérico SOFÍA · NO reordenar"
  },

  "validation_checks": [
    {"id": 1, "name": "competencia_present", "status": "PASS|FAIL", "evidence": "..."},
    {"id": 2, "name": "raps_count_match_input", "status": "PASS", "evidence": "Input declares 4 RAPs · output has 4 raps[]"},
    {"id": 3, "name": "saberes_conceptos_cobertura_100", "status": "PASS", "evidence": "..."},
    {"id": 4, "name": "saberes_proceso_cobertura_100", "status": "PASS", "evidence": "..."},
    {"id": 5, "name": "criterios_cobertura_100", "status": "PASS", "evidence": "..."},
    {"id": 6, "name": "rap_titulos_verbatim", "status": "PASS", "evidence": "All 4 rap_titulo match input literal"},
    {"id": 7, "name": "rationale_alineacion_present_per_rap", "status": "PASS", "evidence": "All N RAPs have rationale 50-200 words"}
  ],

  "downstream_consumers": [
    "PM-0 (consume matriz alineada como insumo principal · simplifica decisiones)",
    "PM-1.1 (ruta macrotemática construida POR RAP · NO agregada)",
    "PM-1.2 (scope/curación POR RAP · saberes target específicos)",
    "PM-2.x ACs (cada actividad explícitamente atribuida a RAP target)",
    "PM-2.11 (row assembler simplificado · matriz ya viene alineada de origen)",
    "PM-3.7 V04 (multi-RAP rows con contenido real · NO solo título RAP)"
  ],

  "_audit": {
    "input_source": "form_xlsx | contenido_pegado | json_preexistente",
    "input_completeness": "...",
    "input_normalizations": [...]
  }
}
```

---

## 7 REGLAS CANÓNICAS

### REGLA 1 — ALINEACIÓN POR VERBO COGNITIVO DEL RAP

Cada RAP empieza con un verbo cognitivo (RECONOCER · COMPRENDER · APLICAR · DESCRIBIR · ANALIZAR · SINTETIZAR · etc.). Ese verbo es la **brújula pedagógica** de la alineación.

| Verbo del RAP | Tipo de saber/criterio que pertenece |
|---|---|
| **RECONOCER · IDENTIFICAR** | Vocabulario básico · elementos físicos · oficios · etiquetas |
| **COMPRENDER · ENTENDER** | Frases estandarizadas · diálogos · contextos comunicativos |
| **APLICAR · USAR** | Reglas gramaticales · estructuras · funciones del idioma |
| **DESCRIBIR · NARRAR** | Procesos · funciones · ubicaciones · roles |
| **ANALIZAR · COMPARAR** | Estructuras complejas · contrastes · patrones |
| **SINTETIZAR · CREAR** | Producción auténtica · proyectos integradores |

NO copiar mecánicamente del input al primer RAP. **Mapear por intent pedagógico del RAP.**

### REGLA 2 — COBERTURA 100% · CERO HUÉRFANOS

Todo saber/proceso/criterio del input DEBE asignarse a 1+ RAPs. Si encuentras un ítem que no parece pertenecer a ningún RAP:

1. STOP · NO inventar pertenencia
2. Documentar el ítem como "huérfano detectado"
3. Pedir clarification a Sergio antes de generar output

NO eliminar ítems del input. NO agruparlos en un "RAP genérico". Cada ítem tiene hogar pedagógico.

### REGLA 3 — OVERLAPS PERMITIDOS · DOCUMENTADOS

Cuando un saber/criterio sirve a múltiples RAPs (e.g., "MODAL VERBS" sirve a RA3 gramática Y a RA4 describir funciones):

1. Asignar a TODOS los RAPs relevantes
2. Documentar overlap en `alignment_audit.saberes_conceptos_con_overlap[]`
3. Razón pedagógica explícita · NO "porque sí"

NO forzar overlap artificial · solo cuando hay justificación clara.

### REGLA 4 — VERBATIM RAPs · NO PARÁFRASIS

Los `rap_titulo` del output deben ser **literales** del input. Cero edits · cero abreviaciones · cero corrección ortográfica. Son canon SOFÍA Plus · respetar.

Ejemplo:
```
Input: "RA 1 RECONOCER VOCABLOS Y EXPRESIONES BÁSICAS EN INGLÉS, DE FORMA ESCRITA Y AUDITIVA, ENMARCADOS EN EL DESEMPEÑO DE FUNCIONES PROPIAS EN EL SECTOR MARÍTIMO Y PORTUARIO."

Output rap_titulo: "RA 1 RECONOCER VOCABLOS Y EXPRESIONES BÁSICAS EN INGLÉS, DE FORMA ESCRITA Y AUDITIVA, ENMARCADOS EN EL DESEMPEÑO DE FUNCIONES PROPIAS EN EL SECTOR MARÍTIMO Y PORTUARIO."

✅ Verbatim · OK
```

### REGLA 5 — RATIONALE PEDAGÓGICO POR CADA RAP

Cada RAP debe tener un `rationale_alineacion` field de 50-200 palabras explicando:
- Cuál es la lógica pedagógica de la agrupación
- Qué saberes/criterios se asignaron y por qué
- Qué saberes/criterios se EXCLUYERON y a qué RAP fueron (referencia cruzada)
- Qué overlaps documentaste

Esto permite trazabilidad cuando alguien (Sergio o auditor) pregunta "¿por qué este saber está en RA1 y no en RA3?".

### REGLA 6 — ORDEN PEDAGÓGICO RESPETADO

Los RAPs aparecen en el output en el orden secuencial que vienen en el input (RA1 < RA2 < RA3 < ...). NO reordenar por dificultad · NO reordenar por temporalidad · NO reordenar por tema. Es secuencia pedagógica SOFÍA · respetar.

### REGLA 7 — DYNAMIC RAP COUNT · N FLEXIBLE

PM-0.0 NO asume `raps_count = 4`. Funciona para cualquier N:

| Tipo de programa | Típico raps_count |
|---|---|
| **Curso Complementario** (single-guía absorpción) | 1-6 RAPs |
| **Técnico** (alineación 1:1) | 5 RAPs (1 per bloque) |
| **Tecnológico** (alineación 1:1) | 10 RAPs |
| **Especial** (mapping libre) | 1-N |

Validar: `raps_count = len(raps[])` · NO hardcoded.

---

## VALIDATION CHECKS · 7 BLOQUEANTES

1. **competencia_present** · texto literal · NO empty
2. **raps_count_match_input** · N output = N input
3. **saberes_conceptos_cobertura_100** · 0 huérfanos
4. **saberes_proceso_cobertura_100** · 0 huérfanos
5. **criterios_cobertura_100** · 0 huérfanos
6. **rap_titulos_verbatim** · todos los rap_titulo == input literal
7. **rationale_alineacion_present_per_rap** · cada RAP tiene rationale 50-200 words

Si CUALQUIER check FAIL · output marcado como `enriched: false` y `_block_downstream: true`. Sergio debe revisar antes de avanzar a PM-0.

---

## EJEMPLO COMPLETO · IMARPOR-CC

### Input recibido (parsed del form xlsx)

```json
{
  "competencia": "INTERACTUAR CON OTROS EN IDIOMA EXTRANJERO SEGÚN ESTIPULACIONES DEL MARCO COMÚN EUROPEO DE REFERENCIA PARA IDIOMAS.",
  "raps": [
    {"rap_id": "RA1", "rap_titulo": "RA 1 RECONOCER VOCABLOS Y EXPRESIONES BÁSICAS..."},
    {"rap_id": "RA2", "rap_titulo": "RA2 COMPRENDER VOCABLOS PRINCIPALES DE LAS FRASES ESTANDARIZADAS POR LA OMI..."},
    {"rap_id": "RA3", "rap_titulo": "RA3 APLICAR LAS REGLAS GRAMATICALES BÁSICAS DEL IDIOMA INGLÉS..."},
    {"rap_id": "RA4", "rap_titulo": "RA 4 DESCRIBIR EN INGLÉS LAS FUNCIONES HABITUALES Y/O MOMENTÁNEAS PROPIAS..."}
  ],
  "saberes_conceptos_y_principios": [
    "UNIT 1: SHIP OVERVIEW",
    "PARTS OF THE SHIPS",
    "TYPES OF MERCHANT VESSELS",
    "NAVIGATIONAL AND SAFETY-RELATED EQUIPMENT",
    "REVIEW OF DEMONSTRATIVES ADJECTIVES AND VERB TO BE",
    "SINGULAR AND PLURAL NOUNS",
    "UNIT 2: THE CREW",
    "PROFESSIONS IN PORT AND ABOARD",
    "COMMANDS (TO: OFFICERS, SAILORS, HELMSMAN, CAPTAINS, ENGINEERS, STEWARD, CRANE OPERATORS)",
    "REVIEW OF PRESENT SIMPLE TENSE",
    "IMPERATIVE",
    "UNIT 3: PLACES IN PORT AND POSITION",
    "PLACES IN PORT · LOCATIONS",
    "WEATHER CONDITIONS",
    "TAG QUESTIONS",
    "REVIEW OF PRESENT PROGRESSIVE AND PREPOSITIONAL PHRASES OF GEOGRAPHIC LOCATION AND DISTANCE",
    "UNIT 4: IN PORT",
    "CONTAINERIZATION",
    "PACKING, SHIPPING AND CARGO HANDLING",
    "MANEUVERING (MOORING, DOCKING, DEPARTURE)",
    "QUANTIFIERS",
    "MODAL VERBS: CAN, COULD, SHOULD, MUST",
    "UNIT 5: INTRODUCING IMO STANDARD MARINE COMMUNICATION PHRASES (SMCP)",
    "STANDARD SPELLING",
    "MESSAGE MARKERS",
    "STANDARD RESPONSES AND ORGANIZATIONAL PHRASES"
  ],
  "saberes_proceso": [
    "IDENTIFICAR Y EXTRAER INFORMACIÓN PRECISA EN INGLÉS GENERADA EN EL INTERCAMBIO ORAL Y/O ESCRITO...",
    "IDENTIFICAR ESTRUCTURAS GRAMATICALES BÁSICAS EN INGLÉS, TALES COMO VERBOS RELACIONADOS CON LAS ACCIONES...",
    "RECONOCER LOS DISTINTOS OFICIOS ENMARCADOS EN LOS CAMPOS MARÍTIMO Y PORTUARIO",
    "EXPRESAR E INTERPRETAR ÓRDENES QUE SE DAN EN EL CUMPLIMIENTO DE LAS DISTINTAS FUNCIONES...",
    "HABLAR SOBRE UBICACIONES EN INGLÉS QUE PERMITAN AL INTERLOCUTOR CONOCER EL ESPACIO FÍSICO...",
    "DESCRIBIR ELEMENTOS Y PROCESOS EN INGLÉS, DERIVADOS DE LOS DISTINTOS ROLES...",
    "EXPRESAR PROHIBICIÓN, PERMISIÓN, POSIBILIDAD O HACER PEDIDOS EN INGLÉS...",
    "RECONOCER LA MANERA DE DELETREAR LOS VOCABLOS EN INGLÉS",
    "RESPONDER EN INGLÉS EN CONVERSACIONES SENCILLAS Y UTILIZANDO LAS FRASES ESTANDARIZADAS POR LA OMI...",
    "IDENTIFICAR VOCABULARIO COMÚN EN INGLÉS, EN LAS FRASES ESTANDARIZADAS DE LA OMI..."
  ],
  "criterios_evaluacion": [
    "INTERPRETA MENSAJES SENCILLOS DE COMUNICACIÓN EN INGLÉS, SEGÚN CONTEXTO DE LAS OPERACIONES A BORDO Y EN EL PUERTO",
    "RESPONDE EN INGLÉS EN CONVERSACIONES SENCILLAS UTILIZANDO LAS FRASES ESTANDARIZADAS POR LA OMI",
    "IDENTIFICA VOCABLOS BÁSICOS EN INGLÉS RELACIONADOS CON ELEMENTOS FÍSICOS DEL BUQUE Y PUERTO",
    "DESCRIBE EN INGLÉS PROCESOS Y FUNCIONES PROPIAS DEL CONTEXTO MARÍTIMO Y PORTUARIO",
    "APLICA REGLAS GRAMATICALES BÁSICAS EN INGLÉS PARA COMUNICACIÓN PUERTO-BUQUE"
  ]
}
```

### Output esperado (alineación pedagógica · ejemplo)

```json
{
  "raps": [
    {
      "rap_id": "RA1",
      "rap_titulo": "RA 1 RECONOCER VOCABLOS Y EXPRESIONES BÁSICAS...",
      "saberes_conceptos_y_principios": [
        "UNIT 1: SHIP OVERVIEW",
        "PARTS OF THE SHIPS",
        "TYPES OF MERCHANT VESSELS",
        "NAVIGATIONAL AND SAFETY-RELATED EQUIPMENT",
        "UNIT 2: THE CREW",
        "PROFESSIONS IN PORT AND ABOARD",
        "SINGULAR AND PLURAL NOUNS"
      ],
      "saberes_proceso": [
        "IDENTIFICAR Y EXTRAER INFORMACIÓN PRECISA EN INGLÉS...",
        "RECONOCER LOS DISTINTOS OFICIOS ENMARCADOS EN..."
      ],
      "criterios_evaluacion": [
        "IDENTIFICA VOCABLOS BÁSICOS EN INGLÉS RELACIONADOS CON ELEMENTOS FÍSICOS..."
      ],
      "rationale_alineacion": "RA1 trata vocabulario básico de identificación. Verbo cognitivo: RECONOCER. Agrupé UNITS 1-2 (ship overview · parts · types · equipment · crew · professions) porque ambas son vocabulario fundacional de elementos físicos y oficios. Excluí gramática de UNIT 1 (verb to be · demonstratives) que va a RA3 porque RA3 es el RAP de aplicar reglas gramaticales. SINGULAR AND PLURAL NOUNS sí va aquí porque es vocabulario más que gramática estructural. Asigné los procesos IDENTIFICAR/RECONOCER porque son los procesos cognitivos centrales del verbo del RAP. Criterio elegido valida reconocimiento de vocablos básicos."
    },
    {
      "rap_id": "RA2",
      "rap_titulo": "RA2 COMPRENDER VOCABLOS PRINCIPALES DE LAS FRASES ESTANDARIZADAS POR LA OMI...",
      "saberes_conceptos_y_principios": [
        "UNIT 5: INTRODUCING IMO STANDARD MARINE COMMUNICATION PHRASES (SMCP)",
        "STANDARD SPELLING",
        "MESSAGE MARKERS",
        "STANDARD RESPONSES AND ORGANIZATIONAL PHRASES"
      ],
      "saberes_proceso": [
        "RESPONDER EN INGLÉS EN CONVERSACIONES SENCILLAS Y UTILIZANDO LAS FRASES ESTANDARIZADAS POR LA OMI...",
        "IDENTIFICAR VOCABULARIO COMÚN EN INGLÉS, EN LAS FRASES ESTANDARIZADAS DE LA OMI...",
        "RECONOCER LA MANERA DE DELETREAR LOS VOCABLOS EN INGLÉS"
      ],
      "criterios_evaluacion": [
        "INTERPRETA MENSAJES SENCILLOS DE COMUNICACIÓN EN INGLÉS, SEGÚN CONTEXTO DE LAS OPERACIONES A BORDO Y EN EL PUERTO",
        "RESPONDE EN INGLÉS EN CONVERSACIONES SENCILLAS UTILIZANDO LAS FRASES ESTANDARIZADAS POR LA OMI"
      ],
      "rationale_alineacion": "RA2 es específicamente sobre frases SMCP estandarizadas OMI. Verbo cognitivo: COMPRENDER. UNIT 5 entera va aquí (SMCP · message markers · standard responses · standard spelling). RECONOCER LA MANERA DE DELETREAR está aquí porque NATO Phonetic spelling es parte canónica del SMCP. Criterios INTERPRETA MENSAJES SENCILLOS y RESPONDE CON FRASES OMI son evaluación directa de SMCP."
    },
    {
      "rap_id": "RA3",
      "rap_titulo": "RA3 APLICAR LAS REGLAS GRAMATICALES BÁSICAS DEL IDIOMA INGLÉS...",
      "saberes_conceptos_y_principios": [
        "REVIEW OF DEMONSTRATIVES ADJECTIVES AND VERB TO BE",
        "REVIEW OF PRESENT SIMPLE TENSE",
        "IMPERATIVE",
        "TAG QUESTIONS",
        "REVIEW OF PRESENT PROGRESSIVE AND PREPOSITIONAL PHRASES OF GEOGRAPHIC LOCATION AND DISTANCE",
        "QUANTIFIERS",
        "MODAL VERBS: CAN, COULD, SHOULD, MUST"
      ],
      "saberes_proceso": [
        "IDENTIFICAR ESTRUCTURAS GRAMATICALES BÁSICAS EN INGLÉS, TALES COMO VERBOS...",
        "EXPRESAR PROHIBICIÓN, PERMISIÓN, POSIBILIDAD O HACER PEDIDOS EN INGLÉS..."
      ],
      "criterios_evaluacion": [
        "APLICA REGLAS GRAMATICALES BÁSICAS EN INGLÉS PARA COMUNICACIÓN PUERTO-BUQUE"
      ],
      "rationale_alineacion": "RA3 es el RAP de gramática. Verbo cognitivo: APLICAR. Agrupé TODA la gramática del programa (verb to be · simple tense · imperative · tag questions · progressive · prepositions · quantifiers · modals). Estos son los building blocks gramaticales para comunicación puerto-buque. EXPRESAR PROHIBICIÓN/PERMISIÓN/POSIBILIDAD es proceso directo de modal verbs. Criterio APLICA REGLAS GRAMATICALES es evaluación directa. NO incluí MODAL VERBS overlap con RA4 porque la APLICACIÓN gramatical es lo que se evalúa aquí · en RA4 se DESCRIBE usando esas estructuras (consumidor)."
    },
    {
      "rap_id": "RA4",
      "rap_titulo": "RA 4 DESCRIBIR EN INGLÉS LAS FUNCIONES HABITUALES Y/O MOMENTÁNEAS PROPIAS...",
      "saberes_conceptos_y_principios": [
        "COMMANDS (TO: OFFICERS, SAILORS, HELMSMAN, CAPTAINS, ENGINEERS, STEWARD, CRANE OPERATORS)",
        "UNIT 3: PLACES IN PORT AND POSITION",
        "PLACES IN PORT · LOCATIONS",
        "WEATHER CONDITIONS",
        "UNIT 4: IN PORT",
        "CONTAINERIZATION",
        "PACKING, SHIPPING AND CARGO HANDLING",
        "MANEUVERING (MOORING, DOCKING, DEPARTURE)"
      ],
      "saberes_proceso": [
        "EXPRESAR E INTERPRETAR ÓRDENES QUE SE DAN EN EL CUMPLIMIENTO...",
        "HABLAR SOBRE UBICACIONES EN INGLÉS QUE PERMITAN AL INTERLOCUTOR CONOCER EL ESPACIO FÍSICO...",
        "DESCRIBIR ELEMENTOS Y PROCESOS EN INGLÉS, DERIVADOS DE LOS DISTINTOS ROLES..."
      ],
      "criterios_evaluacion": [
        "DESCRIBE EN INGLÉS PROCESOS Y FUNCIONES PROPIAS DEL CONTEXTO MARÍTIMO Y PORTUARIO"
      ],
      "rationale_alineacion": "RA4 es DESCRIPCIÓN funcional. Verbo cognitivo: DESCRIBIR. Agrupé UNITS 3-4 (places · weather · containerization · cargo · maneuvering) más COMMANDS porque estos son los CONTEXTOS donde se describen funciones. Procesos: HABLAR SOBRE UBICACIONES y DESCRIBIR ELEMENTOS Y PROCESOS son los más directos. EXPRESAR E INTERPRETAR ÓRDENES toca commands del UNIT 2 (que está en RA1) pero el VERBO de la acción (expresar/describir) lo pone aquí. Criterio DESCRIBE PROCESOS valida directamente. Hay overlap de modal verbs como herramienta gramatical (RA3) que se aplica al describir functions (RA4) · documentado en alignment_audit."
  ],
  "alignment_audit": {
    "saberes_conceptos_total_input": 26,
    "saberes_conceptos_total_asignados_en_raps": 26,
    "saberes_conceptos_huerfanos": [],
    "saberes_conceptos_con_overlap": [],
    "saberes_proceso_total_input": 10,
    "saberes_proceso_total_asignados_en_raps": 10,
    "saberes_proceso_huerfanos": [],
    "criterios_total_input": 5,
    "criterios_total_asignados_en_raps": 5,
    "criterios_con_overlap": [],
    "cobertura": {
      "saberes_conceptos": "100% · 26/26 · 0 huérfanos",
      "saberes_proceso": "100% · 10/10 · 0 huérfanos",
      "criterios": "100% · 5/5 · 0 huérfanos"
    }
  }
}
```

---

## ANTI-PATRONES (NO HACER)

1. **❌ Alineación arbitraria sin rationale.** Cada decisión debe estar documentada en `rationale_alineacion`.

2. **❌ Inventar saberes/criterios.** Son canon SOFÍA Plus · respetar verbatim.

3. **❌ Eliminar ítems del input que "no encajan".** STOP y pedir clarification a Sergio.

4. **❌ Asumir raps_count = 4.** Funciona para cualquier N (1-10+).

5. **❌ Saltar checklist pre-generation REGLA 19 PASOS A-F.** Cualquier nuevo run ejecuta los 6 pasos.

6. **❌ Reordenar RAPs por dificultad/temporalidad.** Respetar orden secuencial SOFÍA.

7. **❌ Ignorar overlaps · forzar 1 saber a 1 RAP solamente.** Si hay overlap pedagógico real · documentarlo.

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Alimenta a (CRÍTICO)** | PM-0 | Insumo principal · matriz alineada → context simplificado |
| **Alimenta a (CRÍTICO)** | PM-1.1 | Ruta macrotemática construida POR RAP · NO agregada |
| **Alimenta a (CRÍTICO)** | PM-1.2 | Scope/curación POR RAP · saberes target específicos |
| **Alimenta a** | PM-2.0 | Session blueprint con awareness RAP |
| **Alimenta a** | PM-2.x ACs | Cada actividad explícitamente atribuida a RAP target |
| **Alimenta a** | PM-2.11 | Row assembler simplificado · matriz heredada |
| **Alimenta a** | PM-3.7 V04 | Multi-RAP rows con contenido real · NO solo título |
| **Consume de** | Form xlsx parsed (o contenido pegado · o JSON pre-existente) | Datos curriculares SOFÍA agregados |
| **Decisiones cascada** | TODA la pipeline downstream | PM-0.0 es el ÚNICO punto donde se toma la decisión de alineación · todo lo demás la hereda |

---

## FORMATO DE SALIDA ESTÁNDAR

```
runs/<RUN-ID>/
├── pm-0-0-input.json (opcional · si form parseado)  ← input pre-procesado
└── pm-0-0-matriz-alineada.json                      ← OUTPUT canónico (este PM)
```

Después · PM-0 consume `pm-0-0-matriz-alineada.json` para generar `pm-0-context.json` simplificado.

---

*PM-0.0 v1.0 · escrito 2026-05-01 (NEW · paradigm shift Phase 1 · pre-PM-0 alineación matriz pedagógica · Sergio Cortés decisión arquitectónica)*
*Próximo paso: build wrapper `subagente_pm_0_0_matriz.py` (Camino 2 LLM) + bump PM-0 v3.0 simplificado + bump DM v3.0 + bump PLAN-FASE-1 + form-schema clarification + skill update*
