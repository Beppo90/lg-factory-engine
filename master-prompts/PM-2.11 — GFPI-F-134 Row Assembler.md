---
pm_id: PM-2.11
name: GFPI-F-134 Row Assembler
phase: 2
session: null
fase_sena: Post-diseño
type: assembler
version: 2.6.3
created: 2026-04-13
last_verified: 2026-04-20
changelog:
  - "2.6.3 (2026-04-20) — Check 16 añadido: activity card schema v2.6.3 en pm-3-6.json (12 campos canónicos, 10 tipos de scaffold_inline, 4 campos obsoletos prohibidos, meta.activities_schema_version, badges en 6 evidencias). Bloquea emisión de DOCX si falla. Delega ejecución al script canónico check-activity-card-schema.js. Total de checks: 16."
  - "2.6.1 (2026-04-20) — Check 15 añadido: activity_footer derivado desde upstream (PM-3.1 sessions_logistics + PM-3.2-sX activity_logistics + PM-4.1/PM-4.2 evidencia). Prohíbe footer autoreado en pm-3-5/pm-3-6. Delega ejecución al script canónico check-no-orphan-footer.js. Total de checks: 15."
  - "2.5 (2026-04-20) — Check 14 añadido: propagación de estrategias didácticas a pm-3-2-sX.json (momento_sena, estrategia_didactica, justificacion_didactica, tecnica_didactica por bloque WHILE). Cross-reference obligatorio con pm-3-1.json.sessions[i].logistics_box. Campo strategy_propagation en YAML validation_report. Cierra gap descubierto en DIESEL-2026-04-19 (patch no ejecutado, 8 sesiones sin campos pedagógicos). Total de checks: 14."
  - "2.4 (2026-04-20) — Check 13 operacionalizado: CHECK 9 del DOCUMENTO MAESTRO §10 (uniqueness of pedagogical content universe) implementado como check enumerado + campo content_uniqueness en YAML validation_report. Hash SHA256 sobre canonical JSON sin run_id."
  - "2.0 (2026-04-13) — Versión inicial: 12 checks estructurales, ensamblaje de 11 columnas GFPI-F-134."
inputs:
  - Session Blueprint (output de PM-2.0)
  - Activity Cards de todos los PM-2.x (PM-2.1 a PM-2.10)
  - PM-1.2 output (columnas 1-5 de la matriz GFPI-F-134)
outputs:
  - Fila completa GFPI-F-134 (11 columnas pobladas)
  - Validation Report detallado
depends_on: [PM-2.0, PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10]
feeds_into: [PM-3.1, PM-4.1, PM-4.2]
---

# PM-2.11: GFPI-F-134 ROW ASSEMBLER

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-2.11 |
| **Nombre** | GFPI-F-134 Row Assembler |
| **Subfase guía SENA** | 3.5 Consolidación de guía |
| **Ubicación en la Guía** | Post-guía — matriz pedagógica oficial |
| **Tipo de Evidencia SENA** | N/A (herramienta de validación) |
| **Instrumento** | Fila GFPI-F-134 completa + Validation Report |
| **Rol estratégico** | Convergencia de Fase 2 — convierte 10 Activity Cards en 1 fila oficial |

---

## PROPÓSITO

El **Row Assembler** es el último paso de la Fase 2 (Diseño de Actividades). Recibe:

1. El **Session Blueprint** de PM-2.0 (el mapa maestro de 8 sesiones)
2. Las **Activity Cards** de todos los PM-2.x (PM-2.1 a PM-2.10) — fragmentos de diseño pedagógico
3. El **output de PM-1.2** (columnas 1-5: Competencia, RAP, Saberes, Criterios)

Y produce: **Una fila GFPI-F-134 completa y validada** — la matriz pedagógica oficial que el instructor usará para la planeación formal, que PM-4.1 usará para generar instrumentos de evaluación, y que PM-3.1 usará como fuente para construir el Playbook.

Sin PM-2.11, los 10 PMs de Fase 2 quedan como piezas sueltas. Con PM-2.11, arman un único documento coherente, legal y pedagógicamente válido.

---

## INPUTS REQUERIDOS

### Input 1: Session Blueprint (PM-2.0)
```
{
  "rap_id": "RAP-[CODE]-[NUM]-[AÑO]",
  "rap_name": "...",
  "competencia": "...",
  "total_hours": 60,
  "sessions": [
    {"session": 1, "pms_active": ["PM-2.1", "PM-2.2"], ...},
    ...
  ]
}
```
Necesario para: Validar que todas las Activity Cards están ubicadas, que las horas suman correctamente, que las evidencias están bien distribuidas.

### Input 2: Activity Cards (PM-2.1 a PM-2.10)
```
activity_card:
  pm_id: "PM-2.x"
  session: 1-8
  activities:
    - number: 1
      type: "cognitiva" | "procedimental"
      statement: "Verbo + Objeto + Condición"
      didactic_strategy: "..."
      didactic_technique: "..."
  
  hours:
    direct: X
    autonomous: Y
  
  evidence:
    generates_evidence: true|false
    type: "Conocimiento" | "Desempeño" | "Producto"
    ...
  
  environment:
    type: "Aula" | "Laboratorio" | "Virtual" | "Campo/Contextual" | "Híbrido"
    materials: [...]
    instructors: "..."
  
  contributes_to_consolidated_quiz: true|false
  quiz_skill: "Reading" | "Writing" | "Listening" | "Vocabulary" | "Grammar" | "Language Functions"
  quiz_points: 5|0
```

Se reciben 10 Activity Cards (una por cada PM-2.x), con toda la información desmenuzada que luego se ensambla en las columnas 6-10 de GFPI-F-134.

### Input 3: PM-1.2 Output
```
| Columna | Contenido |
|---------|-----------|
| 1 | COMPETENCIA |
| 2 | RESULTADOS DE APRENDIZAJE (RAP) |
| 3 | SABERES DE CONCEPTOS Y PRINCIPIOS |
| 4 | SABERES DE PROCESO |
| 5 | CRITERIOS DE EVALUACIÓN |
```

Estas 5 columnas se copian directamente a la salida de PM-2.11.

---

## PROCESO DE ENSAMBLAJE

### Fase 1: Poblamiento Directo (Columnas 1-5)

**Tarea:** Copiar tal cual de PM-1.2 a la fila de salida:

| Columna | Acción |
|---------|--------|
| 1. COMPETENCIA | Copiar texto literal de PM-1.2 |
| 2. RAP | Copiar texto literal de PM-1.2 |
| 3. SABERES CONCEPTOS | Copiar lista de PM-1.2 |
| 4. SABERES PROCESO | Copiar lista de PM-1.2 |
| 5. CRITERIOS EVALUACIÓN | Copiar lista de PM-1.2 |

**Validación:** ¿Nada es null? ¿Los textos encajan en la matriz (sin caracteres especiales que rompan el formato)?

### Fase 2: Ensamblaje de Actividades (Columna 6)

**Tarea:** Extraer todas las actividades de todas las Activity Cards, ordenarlas por sesión (S1 → S8), y numerar secuencialmente.

**Proceso:**

1. **Iterar sobre Activity Cards en orden de sesión (S1, S2, ..., S8):**
   - PM-2.1 (S1, 1-2 actividades)
   - PM-2.2 (S1, 1-2 actividades)
   - PM-2.5 (S2, 1-3 actividades)
   - PM-2.3 (S2, 1-3 actividades)
   - ... etc

2. **Para cada actividad, producir:**
   ```
   N. [TIPO DE ACTIVIDAD EN MAYÚS] — Verbo infinitivo + Objeto + Condición
   
   Formato: 
   1. Actividad cognitiva — Analizar estructura de texto técnico en inglés...
   2. Actividad procedimental — Redactar interpretación de plano...
   3. Actividad cognitiva — Completar matriz...
   ```

3. **Restricción:**
   - Verbo + Objeto + Condición (estructura obligatoria)
   - Máximo 120 caracteres por actividad
   - Tipificación explícita (Actividad cognitiva | Actividad procedimental)

**Ejemplo de salida:**
```
1. Actividad cognitiva — Reflexionar sobre aplicación laboral del RAP en contexto técnico actual
2. Actividad cognitiva — Identificar brechas de conocimiento comparando expectativas vs realidad
3. Actividad cognitiva — Identificar y clasificar vocabulario técnico según categorías semánticas
4. Actividad procedimental — Pronunciar y usar vocabulario técnico en contexto de escenario simulado
5. Actividad cognitiva — Analizar estructura y contenido de texto técnico en inglés usando SQ3R
6. Actividad cognitiva — Completar matriz de comprensión sobre conceptos clave del texto técnico
7. Actividad cognitiva — Identificar estructuras gramaticales objetivo en textos técnicos reales
8. Actividad procedimental — Redactar descripción de componente/proceso siguiendo plantilla técnica
9. Actividad procedimental — Participar en juego de roles: defensor de decisión técnica en debate
10. Actividad procedimental — Ejecutar simulación técnica bajo presión comunicativa en inglés
11. Actividad procedimental — Participar en contexto laboral real aplicando competencia completa
...
```

**Validación:**
- ¿Total de actividades está entre 5-9? (obligatorio)
- ¿Cada actividad tiene verbo infinitivo + objeto + condición?
- ¿Cada actividad ≤ 120 caracteres?
- ¿Están secuenciadas (menor a mayor complejidad Bloom)?

### Fase 3: Cálculo de Horas (Columna 7)

**Tarea:** Sumar todas las horas de todas las Activity Cards.

**Proceso:**

1. **Para cada Activity Card:**
   - Extraer `hours.direct` y `hours.autonomous`
   - Acumular en dos contadores

2. **Suma final:**
   ```
   Total Horas Trabajo Directo = Σ hours.direct = 48
   Total Horas Trabajo Independiente = Σ hours.autonomous = 12
   Total = 60
   ```

3. **Distribución por actividad:**
   Se puede hacer de dos formas:
   
   **Opción A (Recomendada):** Agregar a nivel de sesión:
   ```
   Sesión 1 (Actividades 1-2): 6h directo | 1.5h independiente
   Sesión 2 (Actividades 3-6): 6h directo | 1.5h independiente
   ...
   ```
   
   **Opción B:** Desagregar por actividad (más granular, pero más complejo):
   ```
   Actividad 1: 1h directo | 0.25h independiente
   Actividad 2: 1h directo | 0.25h independiente
   ...
   ```

**Validación:**
- ¿Total directo = 48h exacto?
- ¿Total autónomo = 12h exacto?
- ¿No hay actividad con hora < 0?

### Fase 4: Ensamblaje de Evidencias (Columna 8)

**Regla Crítica:** Las evidencias formales de la matriz GFPI-F-134 SOLO provienen de Activity Cards donde `generates_evidence: true` EN FASE APROPIACIÓN (S2-S5 y cuestionario consolidado S6 primera mitad).

**Proceso:**

1. **Filtrar Activity Cards por:** `generates_evidence: true` AND `phase_sena == "Apropiación"`

2. **Para cada una, extraer:**
   ```
   {
     "type": "Conocimiento" | "Desempeño" | "Producto",
     "evaluation_technique": "Preguntas" | "Observación" | "Verificación del producto",
     "instrument_number": 1-6,
     "instrument_type": "Cuestionario" | "Lista de Chequeo" | "Lista de verificación" | "Escala de estimación",
     "description": "..."
   }
   ```

3. **Numeración obligatoria (1-6, sin saltos, sin repeticiones):**
   ```
   Evidencia 1: [Reading] — Tipo: Conocimiento, Técnica: Preguntas, Instrumento: Cuestionario No 1
   Evidencia 2: [Writing] — Tipo: Producto, Técnica: Verificación del producto, Instrumento: Lista de verificación No 2
   Evidencia 3: [Listening] — Tipo: Desempeño, Técnica: Observación, Instrumento: Cuestionario No 3 + Lista de Chequeo
   Evidencia 4: [Speaking] — Tipo: Desempeño, Técnica: Observación, Instrumento: Escala de estimación No 4
   Evidencia 5: [Language Functions] — Tipo: Desempeño, Técnica: Observación, Instrumento: Escala de estimación No 5
   Evidencia 6: [Cuestionario Consolidado] — Tipo: Conocimiento, Técnica: Preguntas, Instrumento: Cuestionario No 6
   ```

4. **Descripción de cada evidencia:** Máximo 250 caracteres, formato: [Tipo][Técnica][Instrumento]

**Ejemplo:**
```
Evidencia 1 - Tipo: Conocimiento. Técnica: Preguntas sobre contenido de lectura. 
Instrumento: Cuestionario No 1 (5 ítems de selección múltiple sobre texto técnico en inglés).

Evidencia 2 - Tipo: Producto. Técnica: Verificación del producto con rúbrica. 
Instrumento: Lista de verificación No 2 (10 criterios: gramática, vocabulario, coherencia, formato).

...

Evidencia 6 - Tipo: Conocimiento. Técnica: Preguntas (evaluación sumativa). 
Instrumento: Cuestionario No 6 (25 ítems: 5 Reading, 5 Writing, 5 Listening, 5 Vocabulary, 5 Grammar).
```

**Validación:**
- ¿Exactamente 6 evidencias?
- ¿Numeradas 1-6 sin saltos ni repeticiones?
- ¿Cada una tiene type, technique, instrument_number, instrument_type?
- ¿Cada descripción ≤ 250 caracteres?
- ¿Evidencias 1-5 de S2-S5 (Apropiación)?
- ¿Evidencia 6 de S6 (cuestionario)?
- ¿S7-S8 (Transferencia) cero evidencias?

### Fase 5: Estrategias Didácticas (Columna 9)

**Tarea:** 1:1 con actividades de columna 6. Para cada actividad, especificar estrategia + técnica.

**Proceso:**

1. **Para cada actividad N:**
   - Buscar en su Activity Card el `didactic_strategy` y `didactic_technique`
   - Producir línea:
     ```
     Actividad N: [Estrategia Didáctica]
     Técnica: [Técnica 1] + [Técnica 2 (opcional)]
     ```

2. **Formato:**
   ```
   Actividad 1: Aprendizaje colaborativo
   Técnica: Lluvia de ideas + Panel discussion
   
   Actividad 3: Content-Based Learning
   Técnica: Mapas conceptuales
   
   Actividad 5: TBLT (Task-Based Language Teaching)
   Técnica: Investigación guiada
   ```

3. **Validaciones:**
   - Estrategia está en lista permitida (ABP, CLIL, CBL, TBLT, Simulación, etc.)
   - Técnica(s) está(n) en lista permitida
   - 1 estrategia por actividad (obligatorio)
   - 1-2 técnicas por actividad (máximo 2)

**Ejemplo de salida completa (Columna 9):**
```
Actividad 1: Aprendizaje colaborativo | Técnica: Lluvia de ideas
Actividad 2: Aprendizaje colaborativo | Técnica: Panel discussion
Actividad 3: CLIL | Técnica: Mapas conceptuales
Actividad 4: Aprendizaje basado en tareas | Técnica: Simulación
Actividad 5: Content-Based Learning | Técnica: Investigación guiada
Actividad 6: Aprendizaje colaborativo | Técnica: Jigsaw
Actividad 7: CLIL | Técnica: Análisis de casos
Actividad 8: Aprendizaje basado en tareas | Técnica: Taller
Actividad 9: Juego de roles | Técnica: Dramatización + Role play
Actividad 10: Simulación | Técnica: Juego educativo
Actividad 11: Aprendizaje basado en proyectos | Técnica: Práctica de campo
```

### Fase 6: Ambientes de Aprendizaje (Columna 10)

**Tarea:** 1:1 con actividades. Para cada actividad, especificar: Ambiente | Materiales | Instructores.

**Proceso:**

1. **Para cada actividad N:**
   - Extraer de su Activity Card: `environment.type`, `environment.materials`, `environment.instructors`
   - Producir entrada con 3 sub-columnas:

2. **Formato de entrada:**
   ```
   Actividad N:
   Ambiente: [tipo]
   Materiales: [lista específica]
   Instructores: [nombre/rol responsable]
   ```

3. **Validaciones por tipo de ambiente:**
   - **Aula:** Proyector, pizarrón, computadores, materiales impresos
   - **Laboratorio:** Software específico, máquinas, equipos de medición
   - **Virtual:** Plataforma LMS, videoconferencia, repositorio en línea
   - **Campo/Contextual:** Ubicación de práctica real, empresa, sitio
   - **Híbrido:** Combinación presencial + virtual

**Ejemplo de salida (Columna 10):**
```
Actividad 1:
Ambiente: Aula
Materiales: Proyector, pizarrón, flip chart, marcadores, papeles grandes
Instructores: Instructor de inglés + Técnico especialista

Actividad 3:
Ambiente: Virtual
Materiales: Plataforma Moodle, glossario interactivo (Quizlet), mapa semántico (Miro)
Instructores: Instructor de inglés

Actividad 5:
Ambiente: Aula
Materiales: Proyector, computadores (1 por pareja), PDF de norma ISO, plantilla SQ3R impresa
Instructores: Instructor de inglés técnico

Actividad 9:
Ambiente: Aula
Materiales: Micrófono de diadema (1 por aprendiz), proyector para feedback, grabadora opcional
Instructores: Instructor de inglés técnico

Actividad 11:
Ambiente: Campo/Contextual
Materiales: Acceso a sitio de obra o empresa, manuales técnicos reales, software de diseño
Instructores: Técnico especialista + Supervisor de sitio
```

**Validación:**
- ¿Cada actividad tiene ambiente asignado?
- ¿Los materiales son ESPECÍFICOS (no genéricos)?
- ¿Hay al menos 1 instructor responsable por actividad?

### Fase 7: Columna 11 — Observaciones

**Tarea:** Campo libre para el instructor. PM-2.11 lo deja vacío o con notas técnicas mínimas.

**Restricción:** Máximo 300 caracteres.

**Ejemplo:**
```
"PM-2.3 requiere acceso a planos reales de proyecto en curso. 
Coordinar 1 semana antes. PM-2.8 simulación requiere micrófono de calidad: 
verificar disponibilidad."
```

---

## OUTPUT REQUERIDO

### Parte A: La Fila GFPI-F-134 Completa

Tabla Markdown con 11 columnas, pobladas según el proceso anterior:

```markdown
# GFPI-F-134 — MATRIZ PEDAGÓGICA

| 1. COMPETENCIA | 2. RESULTADOS DE APRENDIZAJE (RAP) | 3. SABERES DE CONCEPTOS Y PRINCIPIOS | 4. SABERES DE PROCESO | 5. CRITERIOS DE EVALUACIÓN | 6. ACTIVIDADES DE APRENDIZAJE A DESARROLLAR | 7. DURACIÓN (HORAS) | 8. DESCRIPCIÓN DE LA EVIDENCIA DE APRENDIZAJE | 9. ESTRATEGIAS DIDÁCTICAS ACTIVAS | 10. AMBIENTES DE APRENDIZAJE TIPIFICADOS | 11. OBSERVACIONES |
|---|---|---|---|---|---|---|---|---|---|---|
| [Competencia literal] | [RAP literal] | - Saber 1...<br>- Saber 2... | - Proceso 1...<br>- Proceso 2... | - Criterio 1...<br>- Criterio 2... | 1. Actividad cognitiva — ...<br>2. Actividad procedimental — ...<br>...<br>N. Actividad X — ... | DIRECTO: 48h<br>INDEPENDIENTE: 12h<br>TOTAL: 60h | Evidencia 1 — Tipo: Conocimiento. Técnica: Preguntas...<br><br>Evidencia 2 — Tipo: Producto...<br><br>...<br><br>Evidencia 6 — Tipo: Conocimiento... | Actividad 1: [Estrategia]<br>Técnica: [Técnica]<br><br>Actividad 2: ...<br><br>... | Actividad 1:<br>Ambiente: [tipo]<br>Materiales: [lista]<br>Instructores: [nombre/rol]<br><br>... | [Notas técnicas ≤ 300 chars] |
```

### Parte B: Validation Report

Documento estructurado en YAML que valida si la fila cumple con todos los criterios:

```yaml
validation_report:
  
  # IDENTIDAD
  rap_id: "RAP-[CODE]-[NUM]-[AÑO]"
  rap_name: ""
  assembly_date: "2026-04-13"
  assembled_by: "PM-2.11 Row Assembler"
  
  # VALIDACIONES NUMÉRICAS
  checks:
    
    hours_direct:
      expected: 48
      actual: 0
      detail: "Suma de hours.direct de todas las Activity Cards"
      passed: false
    
    hours_autonomous:
      expected: 12
      actual: 0
      detail: "Suma de hours.autonomous de todas las Activity Cards"
      passed: false
    
    hours_total:
      expected: 60
      actual: 0
      detail: "Suma directo + autónomo"
      passed: false
    
    evidence_count:
      expected: 6
      actual: 0
      detail: "Cantidad de generates_evidence == true en Apropiación"
      passed: false
    
    cuestionario_points:
      expected: 25
      actual: 0
      detail: "Suma de quiz_points de Activity Cards"
      passed: false
    
    cuestionario_items:
      expected: 25
      actual: 0
      detail: "Suma de quiz_item_count"
      passed: false
    
    # VALIDACIONES ESTRUCTURALES
    
    all_activities_typed:
      detail: "¿Cada actividad tiene type: cognitiva | procedimental?"
      passed: false
      count_cognitive: 0
      count_procedural: 0
    
    all_activities_vobjcon:
      detail: "¿Cada actividad cumple Verbo Infinitivo + Objeto + Condición?"
      passed: false
      failed_activities: []
    
    all_activities_under_120chars:
      detail: "¿Cada actividad ≤ 120 caracteres?"
      passed: false
      failed_activities: []
    
    all_evidences_have_details:
      detail: "¿Cada evidencia tiene type + technique + instrument?"
      passed: false
      failed_evidences: []
    
    no_evidence_in_transferencia:
      detail: "¿S7-S8 (Transferencia) tienen cero evidencias?"
      passed: false
      evidences_found_in_transfer: 0
    
    # VALIDACIONES PEDAGÓGICAS
    
    continuity_criterion:
      detail: "¿Cada S2-S5 cruza RAP técnico + RAP transversal (inglés)?"
      passed: false
      sessions_without_transversal: []
    
    evidence_alignment:
      detail: "¿Cada evidencia responde a al menos 1 criterio de evaluación?"
      passed: false
      orphan_evidences: []
    
    bloom_sequence:
      detail: "¿Secuencia de Bloom ascendente (S1 < S2-S3 < S4-S5 < S6 < S7-S8)?"
      passed: false
      analysis: ""
    
    # VALIDACIONES DE CONFORMIDAD
    
    columns_1_5_populated:
      detail: "¿Columnas 1-5 (de PM-1.2) están completas?"
      passed: false
    
    all_strategies_valid:
      detail: "¿Todas las estrategias didácticas están en lista permitida?"
      passed: false
      invalid_strategies: []
    
    all_techniques_valid:
      detail: "¿Todas las técnicas didácticas están en lista permitida?"
      passed: false
      invalid_techniques: []
    
    all_environments_valid:
      detail: "¿Todos los tipos de ambiente están en lista permitida?"
      passed: false
      invalid_environments: []
    
    materials_specific_not_generic:
      detail: "¿Los materiales son ESPECÍFICOS (no genéricos)?"
      passed: false
      generic_materials_found: []
    
    instructors_assigned:
      detail: "¿Cada actividad tiene al menos 1 instructor asignado?"
      passed: false
      activities_without_instructor: []
    
    # VALIDACIÓN DE UNICIDAD (Check 13 = CHECK 9 DOCUMENTO MAESTRO §10)
    
    content_uniqueness:
      detail: "¿pm-2-3, pm-2-4, pm-2-5, pm-2-6, pm-2-8, pm-2-9, pm-2-10 NO son byte-idénticos (excluyendo run_id) a ninguna guía previa del mismo programa?"
      passed: false
      normalization: "SHA256 sobre canonical JSON (alfabético) sin run_id/generated_at/timestamp"
      files_checked:
        - "pm-2-3.json"
        - "pm-2-4.json"
        - "pm-2-5.json"
        - "pm-2-6.json"
        - "pm-2-8.json"
        - "pm-2-9.json"
        - "pm-2-10.json"
      previous_guides_compared: []   # ej: ["G1", "G2", "G3"]
      matched_files: []              # ej: [{file: "pm-2-3.json", matched_against: "G2", hash: "ab12..."}]
      remediation: "Regenerar contenido desde universo propio (pm-1-2.json de esta guía). Referencia: DOCUMENTO MAESTRO v2.3 §10 PASO 4."
    
    # VALIDACIÓN DE PROPAGACIÓN DE ESTRATEGIAS (Check 14 — v2.5)
    
    strategy_propagation:
      detail: "¿Los 8 pm-3-2-sX.json contienen momento_sena + estrategia_didactica + justificacion_didactica + tecnica_didactica por bloque WHILE, y coinciden con pm-3-1.json.sessions[i].logistics_box?"
      passed: false
      files_checked:
        - "pm-3-2-s1.json"
        - "pm-3-2-s2.json"
        - "pm-3-2-s3.json"
        - "pm-3-2-s4.json"
        - "pm-3-2-s5.json"
        - "pm-3-2-s6.json"
        - "pm-3-2-s7.json"
        - "pm-3-2-s8.json"
      source_of_truth: "pm-3-1.json.sessions[i].logistics_box (momento_sena, estrategia, justificacion, tecnicas[])"
      missing_fields: []             # ej: [{file: "pm-3-2-s3.json", field: "estrategia_didactica"}]
      mismatched_values: []          # ej: [{file: "pm-3-2-s5.json", field: "momento_sena", expected: "3.3 Apropiación", actual: "3.2 Contextualización"}]
      block_technique_gaps: []       # ej: [{file: "pm-3-2-s2.json", block: "while_c", missing: "tecnica_didactica"}]
      remediation: "Ejecutar pm-3-2-estrategias-patch.js sobre el run. Si persiste, regenerar PM-3.1 §11.2 logistics_box. Ver DOCUMENTO MAESTRO §10 PASO 7.b y PM-3.2 Required Output Schema (v2.5)."
  
  # RESUMEN FINAL
  overall_passed: false   # AND lógico de los 14 checks
  
  # ALERTAS Y ERRORES
  warnings:
    - ""
  
  errors:
    - ""
  
  # ACCIÓN RECOMENDADA
  recommendation: |
    Si overall_passed == true:
      "La fila está lista para PM-3.1 (Playbook Outline) y PM-4.1 (Instrumentos)"
    
    Si overall_passed == false:
      "Revisar errores arriba. Solicitar correcciones a los PMs involucrados.
       Reejecutar PM-2.11 una vez corregidas las Activity Cards."
```

---

## VALIDACIONES OBLIGATORIAS

Antes de entregar PM-2.11, el Validation Report DEBE pasar estos **14 checks enumerados**.

> [!important] Nomenclatura y correspondencia con el DOCUMENTO MAESTRO
> El DOCUMENTO MAESTRO v2.3 §10 introdujo "CHECK 9 — Unicidad de Contenido" y el DOCUMENTO MAESTRO v2.5 §10 PASO 7.b introdujo "Propagación de Estrategias Didácticas" como reglas obligatorias del pipeline. En PM-2.11 esos checks se implementan como **Check 13** y **Check 14** (dado que los Checks 1–12 ya existían desde v2.0). Para evitar ambigüedad:
>
> | Referencia | Valor |
> |---|---|
> | "CHECK 9" en DOCUMENTO MAESTRO §10 / §v2.3 historial | = **Check 13** de PM-2.11 (Uniqueness of Pedagogical Content Universe) |
> | "PASO 7.b" en DOCUMENTO MAESTRO §10 / §v2.5 historial | = **Check 14** de PM-2.11 (Propagación de Estrategias Didácticas) |
> | "Check 1" a "Check 12" de PM-2.11 | Igual que antes (horas, evidencias, V+O+C, estrategias, ambientes…) |
>
> Todo PM, script generador o validador automático debe implementar los 14 checks como una lista ordenada. El overall_passed del Validation Report es `AND` de los 14.

### ✓ Check 1: Horas Directas = 48
```
Σ activity_card.hours.direct == 48
Si ≠ 48 → ERROR: Repasar Activity Cards
```

### ✓ Check 2: Horas Autónomas = 12
```
Σ activity_card.hours.autonomous == 12
Si ≠ 12 → ERROR: Repasar Activity Cards
```

### ✓ Check 3: Total de Evidencias = 6
```
COUNT(activity_card WHERE generates_evidence == true) == 6
Si ≠ 6 → ERROR: Faltan evidencias o hay evidencias en fase equivocada
```

### ✓ Check 4: Numeración de Evidencias
```
Evidencias numeradas 1-6 sin saltos ni repeticiones
Si hay gaps o duplicados → ERROR: Renumerar
```

### ✓ Check 5: Cuestionario S6 = 25 Puntos
```
Σ quiz_points (donde contributes_to_consolidated_quiz == true) == 25
Si ≠ 25 → ERROR: Revisar contribuciones PM-2.5, PM-2.3, PM-2.6, PM-2.9, PM-2.10
```

### ✓ Check 6: Cuestionario S6 = 25 Ítems
```
Σ quiz_item_count == 25
Si ≠ 25 → ERROR: Cada PM debe aportar 5 ítems
```

### ✓ Check 7: Tipificación de Actividades
```
PARA CADA actividad:
  type ∈ {"cognitiva", "procedimental"}
Si hay tipo ≠ → ERROR: PM-2.x debe especificar
```

### ✓ Check 8: V+O+C en Actividades
```
PARA CADA actividad:
  statement contiene [Verbo Infinitivo] + [Objeto] + [Condición]
Si falta algún componente → ERROR: Revisar descripción
```

### ✓ Check 9: Longitud de Actividades
```
PARA CADA actividad:
  len(statement) ≤ 120 caracteres
Si excede → ERROR: Acortar descripción
```

### ✓ Check 10: Sin Evidencias en Transferencia
```
PARA S7-S8:
  generates_evidence DEBE SER false
Si hay true → ERROR: Evidencias solo en S2-S5 + S6
```

### ✓ Check 11: Estrategias Válidas
```
PARA CADA actividad:
  didactic_strategy ∈ {ABP, CLIL, CBL, TBLT, Simulación, Juego de roles, 
                        Aprendizaje colaborativo, Trabajo colaborativo, 
                        Investigación guiada, Content-Based Learning}
Si ∉ → ERROR: Estrategia no permitida
```

### ✓ Check 12: Ambientes Válidos
```
PARA CADA actividad:
  environment.type ∈ {Aula, Laboratorio, Virtual, Campo/Contextual, Híbrido}
Si ∉ → ERROR: Ambiente no permitido
```

### ✓ Check 13: Uniqueness of Pedagogical Content Universe (= CHECK 9 del DOCUMENTO MAESTRO §10)

> **Propósito:** Prevenir el error de "copia fantasma" — documentos con el `run_id` correcto pero cuyo contenido pedagógico (texto de lectura, vocabulario, diálogo de listening, tarea de escritura, etc.) fue copiado byte-a-byte de otra guía. Ver DOCUMENTO MAESTRO v2.3 §10 (PASO 4 + Validación + Exportación) y §v2.3 historial.

**Archivos bajo escrutinio (originales obligatorios por guía):**

| # | Archivo | Contenido que debe ser único por guía |
|---|---------|----------------------------------------|
| 1 | `pm-2-3.json` | Texto de lectura (Story A) derivado de src-A en pm-1-2.json de ESA guía |
| 2 | `pm-2-5.json` | 30 términos de vocabulario + ejercicios del nivel CEFR de ESA guía |
| 3 | `pm-2-6.json` | Diálogo de listening (src-B) con personajes y datos técnicos de ESA guía |
| 4 | `pm-2-4.json` | Tarea de escritura correspondiente al producto de ESA guía |
| 5 | `pm-2-8.json` | Tarea speaking con contexto técnico de ESA guía |
| 6 | `pm-2-9.json` | Language functions F1–F5 con ejemplos del universo de ESA guía |
| 7 | `pm-2-10.json` | Grammar items del nivel CEFR + vocabulario técnico de ESA guía |

**Lógica de validación (pseudocódigo):**

```
PARA CADA archivo f ∈ {pm-2-3, pm-2-4, pm-2-5, pm-2-6, pm-2-8, pm-2-9, pm-2-10}:

  hash_current   = SHA256(normalize(strip_field(f_current.json, "run_id")))
  previous_guides = discover_previous_guides_in_same_program()  # ej: G1, G2, G3 si estoy en G4

  PARA CADA g ∈ previous_guides:
    hash_previous = SHA256(normalize(strip_field(f_g.json, "run_id")))

    SI hash_current == hash_previous:
      matched_files.append({
        file: f,
        matched_against: g,
        reason: "Byte-identical content (excluding run_id field)"
      })
      overall_passed = false

SI len(matched_files) > 0:
  ERROR: "Copia fantasma detectada. Los archivos siguientes son byte-idénticos a una guía previa:"
         [para cada match: mostrar file + matched_against]
  ACCIÓN: Regenerar el contenido pedagógico desde el universo de ESTA guía
          (bloques + CEFR + key_vocabulary + fuentes curadas definidos en su pm-1-2.json).
  REFERENCIA: DOCUMENTO MAESTRO v2.3 §10 PASO 4 regla de contenido original.
```

**Normalización obligatoria antes de hashear:**
- Eliminar claves dinámicas de metadata: `run_id`, `generated_at`, `timestamp`, `last_updated`.
- Ordenar claves del JSON alfabéticamente (canonical JSON).
- Trim whitespace trailing y colapsar line endings a `\n`.
- Así la comparación es sobre **contenido pedagógico puro**, no sobre ruido de generación.

**Umbral de falla:**
- **Cero tolerancia:** si CUALQUIER archivo de la lista 1–7 coincide byte-a-byte con cualquier guía previa del mismo programa → Check 13 FAIL → `overall_passed = false`.
- La única excepción legítima es el scaffolding estructural compartido (scripts `.js`, esqueleto de pm-4-1/pm-4-2) — esos NO están en la lista 1–7.

**Lección aprendida DIESEL-2026-04-18 G3–G5:** pm-2-1 a pm-2-11 y pm-3-2-s1..s8 fueron copiados de G2 con solo `run_id` reemplazado. Los docx generados contenían el universo B3+B4/A1.2 en G3 (que debía ser B5+B6/A1.3), G4 (B7+B8/A2.0) y G5 (B9+B10/A2.1). Detectado post-generación. **Check 13 existe precisamente para detectar este patrón antes de ensamblar el Row y bloquear el avance a Fase 3.**

### ✓ Check 14: Propagación de Estrategias Didácticas a pm-3-2-sX.json (v2.5)

> **Propósito:** Garantizar que el contrato declarado en PM-3.2 v2.5 "Required Output Schema" se cumple — es decir, que cada `pm-3-2-sX.json` hereda correctamente los campos pedagógicos (`momento_sena`, `estrategia_didactica`, `justificacion_didactica`, `tecnica_didactica` por bloque) desde `pm-3-1.json.sessions[i].logistics_box`. Este es el check que detecta el fallo del run DIESEL-2026-04-19, donde los Build-Outs quedaron huérfanos de estrategias.

**Archivos bajo escrutinio:** los 8 `pm-3-2-s1.json` … `pm-3-2-s8.json` del run actual, cross-referenciados contra `pm-3-1.json` del mismo run.

**Lógica de validación (pseudocódigo):**

```
pm31 = load("pm-3-1.json")
estrategias_por_sesion = pm31.sessions[i].logistics_box  # i ∈ 1..8

PARA CADA i ∈ 1..8:
  pm32 = load(f"pm-3-2-s{i}.json")

  # 14.1 — Campos obligatorios a nivel raíz
  ASSERT pm32.momento_sena           es string no vacío
  ASSERT pm32.estrategia_didactica   es string no vacío
  ASSERT pm32.justificacion_didactica es string con ≥ 40 palabras

  # 14.2 — Valores deben heredarse de pm-3-1.json (no inventarse)
  ASSERT pm32.momento_sena         == estrategias_por_sesion[i].momento_sena
  ASSERT pm32.estrategia_didactica == estrategias_por_sesion[i].estrategia

  # 14.3 — Propagación a bloques WHILE
  bloques_activos = [b for b in ["a","b","c","d","e"] if pm32[f"while_{b}"] existe]
  ASSERT len(bloques_activos) ≥ 3   # mínimo 3 bloques WHILE por sesión

  PARA CADA b en bloques_activos:
    ASSERT pm32[f"while_{b}"].tecnica_didactica es string con ≥ 6 palabras

    # 14.4 — Cross-reference con logistics_box.tecnicas[]
    tecnica_esperada = next(
      t.tecnica for t in estrategias_por_sesion[i].tecnicas
      if t.bloque.upper() == b.upper()
    )
    ASSERT pm32[f"while_{b}"].tecnica_didactica == tecnica_esperada

SI alguna aserción falla:
  missing_fields.append({session: i, field: "...", expected: "...", actual: "..."})
  overall_passed = false
```

**Reglas de falla:**

1. **Campo ausente:** cualquier sesión sin `momento_sena`, `estrategia_didactica`, o `justificacion_didactica` a nivel raíz → FAIL.
2. **Mismatch con PM-3.1:** si el valor de `momento_sena` o `estrategia_didactica` en el `pm-3-2-sX.json` no coincide con lo declarado en `pm-3-1.json.sessions[i].logistics_box` → FAIL (indica que el LLM inventó en lugar de heredar).
3. **Técnicas insuficientes:** menos de 3 `while_*.tecnica_didactica` poblados por sesión → FAIL.
4. **Justificación placeholder:** `justificacion_didactica` con menos de 40 palabras → FAIL (señal de generación vacía).

**Remediación automática:**
- Si el fallo es por campos ausentes (no por mismatch), ejecutar `pm-3-2-estrategias-patch.js` — el script fallback canonizado en DM §10 PASO 7.b — que lee desde `pm-3-1.json` y popula los campos faltantes.
- Re-correr Check 14.
- Si tras el patch sigue fallando, STOP. El problema está aguas arriba en PM-3.1 (`logistics_box` incompleto) — regenerar PM-3.1 §11.2 antes de intentar PM-3.2 de nuevo.

**Lección aprendida DIESEL-2026-04-19:** los 8 `pm-3-2-sX.json` nunca se serializaron (solo quedaron `.md` en draft). El patch script existía en `scripts/` pero no se ejecutó. CHANGELOG del run marcó "Módulos 13–22 pendiente revisión" y el pipeline avanzó a Fase 4 sin Check 14 (que no existía). **Check 14 existe precisamente para bloquear este escenario: sin estrategias propagadas, no hay paso a PM-3.6 / PM-4.1 / PM-4.2.**

### ✓ Check 15: Coherencia de `activity_footer` con Upstream — v2.6.1

> **Propósito:** Garantizar que la regla v2.6.1 (Data-Flow Inversion del Activity Footer) se cumple — el bloque `activity_footer` de cada actividad en pm-3-5 y pm-3-6 debe ser **derivado** desde `pm-3-1.sessions_logistics` + `pm-3-2-sX.activity_logistics` + (si aplica) `pm-4-1`/`pm-4-2`, no autoreado. Este check detecta footers huérfanos (datos que no encuentran su fuente canónica).

**Archivos bajo escrutinio:** `pm-3-6.json` (30 actividades en G1 MGV), `pm-3-5.json` (5 sub-fases ABP).

**Lógica de validación (pseudocódigo):**

```
pm31 = load("pm-3-1.json")
pm4_instruments = load_instruments()  # PM-4.1 + PM-4.2

PARA CADA actividad EN pm-3-6.seccion_3_actividades_aprendizaje + pm-3-5.subfases:
  f = actividad.activity_footer

  # 15.1 — Campos de logística derivables desde upstream
  sesion_id = extraer_sesion_de(actividad.actividad_id)  # ej A3.3.S2.4 → S2
  upstream_session = pm31.sessions_logistics[sesion_id]
  upstream_activity = load(f"pm-3-2-{sesion_id}.json").activity_logistics[actividad.actividad_id]

  ASSERT f.ambiente       == upstream_session.ambiente
  ASSERT f.momento_sena   == upstream_session.momento_sena  (si presente)
  ASSERT f.estrategia     ∈ [upstream_activity.estrategia, upstream_session.estrategia_dominante]
  ASSERT f.tecnica        == upstream_activity.tecnica
  ASSERT f.duracion_horas == upstream_activity.duracion_horas
  ASSERT f.materiales     == upstream_activity.materiales
  ASSERT f.material_apoyo == upstream_activity.material_apoyo

  # 15.2 — Bloque evidencia (solo para 6 actividades canónicas)
  SI actividad.actividad_id ∈ EVIDENCE_IDS:  # [A3.3.S2.4, A3.3.S3.4, A3.3.S4.2, A3.3.S4.4, A3.3.S5.3, A3.3b.2]
    ASSERT f.evidencia.codigo              == mapping[actividad.actividad_id].codigo  # E1..E6
    ASSERT f.evidencia.nombre              == pm4_instruments[codigo].nombre
    ASSERT f.evidencia.tipo_sena           == pm4_instruments[codigo].tipo_sena
    ASSERT f.evidencia.tecnica_evaluacion  == pm4_instruments[codigo].tecnica_evaluacion
    ASSERT f.evidencia.instrumento         == pm4_instruments[codigo].instrumento
  SI NO:
    ASSERT f.evidencia no está presente

SI alguna aserción falla:
  orphan_footers.append({activity_id, campo, expected, actual})
  overall_passed = false
```

**Reglas de falla:**

1. **Campo autoreado:** si algún campo de `activity_footer` no coincide con su fuente canónica upstream → FAIL (indica que un LLM o editor modificó el footer directamente).
2. **Evidencia ausente en actividad evidencial:** si una de las 6 activities canónicas no tiene `evidencia` en su footer → FAIL.
3. **Evidencia presente en actividad no-evidencial:** si una actividad no-canónica tiene `evidencia` → FAIL.
4. **Valores de evidencia no alineados con PM-4.1/PM-4.2:** cualquier desviación del instrumento canónico → FAIL.

**Remediación automática:**
- Ejecutar `derive_activity_footer_from_playbook.js` — el script idempotente que reconstruye el footer desde upstream y sobre-escribe el footer actual. Preservar backup.
- Re-correr Check 15.
- Si tras re-derive sigue fallando, STOP: el problema está upstream. Verificar `pm-3-1.sessions_logistics` y `pm-3-2-sX.activity_logistics` antes de re-emitir.

**Script canónico:** `check-no-orphan-footer.js` (exit 0 = PASS, exit 1 = FAIL con lista de orphans).

**Lección aprendida MGV-2026-04-20:** v2.6 inicial tenía `activity_footer` autoreado en pm-3-6. Creaba duplicación (mismo dato en Playbook + Guía sin garantía de coherencia) y huérfanos (footer con ambiente "Aula" cuando el Playbook decía "Laboratorio"). **Check 15 garantiza single source of truth: toda edición va upstream y se re-deriva.**

### ✓ Check 16: Activity Card Schema v2.6.3 en `pm-3-6.json` — v2.6.3

> **Propósito:** Garantizar que la regla v2.6.3 (Inline Scaffolds + Learner-Facing Schema) se cumple — cada actividad de `seccion_3_actividades_aprendizaje` respeta el contrato de 12 campos canónicos, sus `scaffold_inline.tipo` ∈ 10 tipos canónicos, no sobreviven los 4 campos obsoletos, y las 6 actividades evidencia tienen badge alineado a PM-4.1/PM-4.2. Este check bloquea la emisión del DOCX final si el schema está desalineado.

**Archivos bajo escrutinio:** `pm-3-6.json.seccion_3_actividades_aprendizaje[*]` + `pm-3-6.json.meta`.

**Lógica de validación (pseudocódigo):**

```
pm36 = load("pm-3-6.json")
EVIDENCE_IDS = ["A3.3.S2.4","A3.3.S3.4","A3.3.S4.2","A3.3.S4.4","A3.3.S5.3","A3.3b.2"]
EVIDENCE_BADGE = {
  "A3.3.S2.4":  "instrument_1_reading",
  "A3.3.S3.4":  "instrument_2_writing",
  "A3.3.S4.2":  "instrument_3_listening",
  "A3.3.S4.4":  "instrument_4_speaking",
  "A3.3.S5.3":  "instrument_5_language_functions",
  "A3.3b.2":    "pm_4_2_consolidado"
}
SCAFFOLD_TYPES = {
  "matching", "checklist", "form", "t_chart", "writing_template",
  "listening_capture", "quiz_preview", "speaking_script",
  "reflection_lines", "rating"
}
OBSOLETE_FIELDS = ["nombre_aprendiz","etiquetas_dimension","instruccion_2pers_en","instruccion_supervivencia_es"]
TIPO_SENA = {"directa","directa_con_trabajo_autonomo","trabajo_autonomo"}

# 16.a — Meta del documento
ASSERT pm36.meta.activities_schema_version == "v2.6.3"

# 16.b — Schema por actividad (12 campos + shape checks)
PARA CADA a EN pm36.seccion_3_actividades_aprendizaje:

  # Campos obligatorios presentes
  PARA CADA f EN ["actividad_id","titulo_en","titulo_es","tipo_actividad_sena",
                  "tiempo_min","agrupacion","voc_dimension","descripcion_aprendiz",
                  "paso_a_paso","scaffold_inline","entregable"]:
    ASSERT f ∈ a  ELSE missing_field(a.actividad_id, f)

  # Shape checks
  ASSERT a.tipo_actividad_sena ∈ TIPO_SENA
  ASSERT isArray(a.voc_dimension) AND len(a.voc_dimension) ≥ 1
  ASSERT a.descripcion_aprendiz.en AND a.descripcion_aprendiz.es
  ASSERT isArray(a.paso_a_paso) AND 3 ≤ len(a.paso_a_paso) ≤ 8
  PARA CADA p EN a.paso_a_paso:
    ASSERT p.en AND p.es

  # scaffold_inline (v2.6.3 core)
  ASSERT a.scaffold_inline.tipo ∈ SCAFFOLD_TYPES
  ASSERT a.scaffold_inline.titulo_en AND a.scaffold_inline.titulo_es
  ASSERT a.scaffold_inline.estructura  # no vacío
  validateScaffoldStructure(a.actividad_id, a.scaffold_inline)

  # entregable completo bilingüe
  PARA CADA k EN ["producto","formato","criterio_minimo"]:
    ASSERT a.entregable[k].en AND a.entregable[k].es

# 16.c — Campos obsoletos ausentes
PARA CADA a EN pm36.seccion_3_actividades_aprendizaje:
  PARA CADA f EN OBSOLETE_FIELDS:
    ASSERT f ∉ a  ELSE obsolete_field_present(a.actividad_id, f)

# 16.d — Badge en 6 evidencias
PARA CADA eid EN EVIDENCE_IDS:
  a = find_activity(pm36, eid)
  ASSERT a.scaffold_inline.badge == EVIDENCE_BADGE[eid]

# 16.e — Count y distribución
ASSERT len(pm36.seccion_3_actividades_aprendizaje) > 0
registrar_distribucion_de_scaffold_types()  # info para reporte, no falla
```

**Reglas de falla:**

1. **Campo obligatorio ausente:** cualquiera de los 12 campos canónicos falta en una actividad → FAIL.
2. **Tipo de scaffold fuera del enum:** `scaffold_inline.tipo` no está en los 10 canónicos → FAIL.
3. **paso_a_paso fuera de rango:** menos de 3 o más de 8 pasos → FAIL.
4. **Bilingüismo incompleto:** cualquier `{en, es}` con un lado vacío → FAIL.
5. **Campo obsoleto sobreviviente:** alguno de los 4 campos v2.6.x en una actividad v2.6.3 → FAIL.
6. **Badge faltante o incorrecto en evidencia:** una de las 6 actividades canónicas sin `scaffold_inline.badge` o con valor distinto del mapping → FAIL.
7. **Meta desalineada:** `meta.activities_schema_version ≠ "v2.6.3"` → FAIL.

**Remediación automática:**
- Ejecutar `rewrite_activities_v263.js` (migrador idempotente con backup) leyendo desde `v263-activities-data.js`. Re-aplica el schema limpio.
- Re-correr Check 16.
- Si tras re-aplicar migrador sigue fallando: el problema está en `v263-activities-data.js` (spec incompleta o inconsistente). Corregir specs antes de migrar de nuevo.

**Script canónico:** `check-activity-card-schema.js` (exit 0 = PASS, exit 1 = FAIL con lista de errores, exit 2 = PASS con warnings). **Este script es la implementación de referencia de Check 16** — PM-2.11 lo invoca y agrega el resultado al YAML validation_report.

**Consumo del resultado por PM-2.11:**
```yaml
validation_report:
  ...
  check_16_activity_card_schema_v263:
    passed: true|false
    total_activities: 30
    schema_clean: 30
    schema_with_error: 0
    scaffold_type_distribution:
      form: 11
      matching: 4
      checklist: 3
      ...
    missing_fields: []
    obsolete_fields_present: []
    invalid_scaffold_types: []
    missing_badges: []
    exit_code: 0
```

**Lección aprendida MGV-2026-04-20 G1 Fase 4:** la iteración sin Check 16 permitió que 4 actividades quedaran con campos obsoletos `nombre_aprendiz` + `etiquetas_dimension` mezclados con los nuevos `titulo_en`/`voc_dimension`. El DOCX se generó sin errores pero el aprendiz veía doble encabezado y doble etiqueta de dimensión. **Check 16 existe para detectar esta clase de "migración parcial" antes de emitir el DOCX final.**

---

## INSTRUCCIÓN AL LLM

```
ACTÚA COMO: GFPI-F-134 Row Assembler — Senior Curriculum Integration Architect.

Tu trabajo: Recibir 10 Activity Cards (fragmentos de diseño de PM-2.1 a PM-2.10),
el Session Blueprint de PM-2.0, y el output de PM-1.2 (columnas 1-5), y ensamblarlos
en UNA FILA GFPI-F-134 COMPLETA, COHERENTE, VALIDADA.

Eres el CONVERGIDOR de toda la Fase 2. Sin ti, los 10 PMs quedan como piezas sueltas.
Con tu output, hay UNA MATRIZ PEDAGÓGICA OFICIAL lista para Instructor + PM-4.1 + PM-3.1.

### DATOS DE ENTRADA:

1. Session Blueprint (PM-2.0):
   - RAP ID, nombre, competencia
   - 8 sesiones con PMs asignados, horas, fase SENA
   - Validaciones de Bloom y transversales

2. Activity Cards (PM-2.1 a PM-2.10):
   - Cada una con: identificación, actividades, horas, evidencia, ambiente, metadata quiz
   - Totales: 10 cards

3. PM-1.2 Output:
   - Columnas 1-5 (Competencia, RAP, Saberes Conceptos, Saberes Proceso, Criterios)

### INSTRUCCIONES DE ENSAMBLAJE:

1. POBLAMIENTO (Columnas 1-5):
   - Copiar literal de PM-1.2
   - Verificar: ¿Nada es null?

2. ACTIVIDADES (Columna 6):
   - Extraer de todas las Activity Cards
   - Ordenar por sesión (S1 → S8)
   - Numerar 1, 2, 3, ...
   - Formato: [TIPO] — Verbo + Objeto + Condición
   - Validar: ≤ 120 caracteres, 5-9 actividades totales

3. HORAS (Columna 7):
   - Sumar hours.direct de todas las cards → debe = 48h
   - Sumar hours.autonomous → debe = 12h
   - Mostrar: directo | independiente | total

4. EVIDENCIAS (Columna 8):
   - Filtrar: generates_evidence == true EN Apropiación
   - Numerar 1-6 (sin saltos)
   - Cada una: [Tipo] [Técnica] [Instrumento]
   - Máximo 250 caracteres por evidencia

5. ESTRATEGIAS (Columna 9):
   - 1:1 con actividades de columna 6
   - Formato: [Estrategia] | Técnica: [Técnica 1] + [Técnica 2]
   - Validar: estrategia + técnica en listas permitidas

6. AMBIENTES (Columna 10):
   - 1:1 con actividades de columna 6
   - Formato: Ambiente | Materiales | Instructores
   - Validar: materiales específicos, instructores asignados

7. OBSERVACIONES (Columna 11):
   - Notas técnicas ≤ 300 caracteres
   - O dejar vacío si no aplica

8. VALIDATION REPORT:
   - 16 checks (horas, evidencias, tipificación, Bloom, transversales, estrategias, ambientes, unicidad, propagación pedagógica, footer derivation, activity card schema v2.6.3)
   - Check 13 = CHECK 9 del DOCUMENTO MAESTRO §10 (unicidad de contenido pedagógico)
   - Check 14 = PASO 7.b del DOCUMENTO MAESTRO §10 (propagación de estrategias didácticas a pm-3-2-sX.json)
   - Check 15 = v2.6.1 Data-Flow Inversion del activity_footer (delegado a `check-no-orphan-footer.js`)
   - Check 16 = v2.6.3 Activity Card Schema (delegado a `check-activity-card-schema.js`)
   - overall_passed: true|false (AND lógico de los 16)
   - Warnings y errors detallados

### RESTRICCIONES:

- Tabla Markdown limpia (sin caracteres especiales que rompan formato)
- Numeración de actividades secuencial sin saltos
- Cada evidencia tiene type + technique + instrument + description
- Zero Meta-Talk: output listo para imprimir
- Lenguaje: español (excepto ejemplos técnicos en inglés)
- Tono: formal, preciso, sin ambigüedad

### ACCIÓN FINAL:

Si overall_passed == true:
  Salida lista para PM-3.1 (Playbook Outline) y PM-4.1 (Instrumentos)

Si overall_passed == false:
  Listar todos los errores. Solicitar correcciones a PMs involucrados.
  Reejecutar PM-2.11 una vez corregidas las Activity Cards.
```

---

## EJEMPLO DE OUTPUT (Parcial)

Para el RAP ficticio "Interpretación de Planos Técnicos":

### PARTE A: Fila GFPI-F-134 (Parcial)

| 1. COMPETENCIA | 2. RAP | 3. SABERES CONCEPTOS | 4. SABERES PROCESO | 5. CRITERIOS | 6. ACTIVIDADES | 7. HORAS | 8. EVIDENCIAS | 9. ESTRATEGIAS | 10. AMBIENTES | 11. OBSERVACIONES |
|---|---|---|---|---|---|---|---|---|---|---|
| Interpretar planos técnicos en contexto industrial aplicando simbología normalizada | Analizar planos arquitectónicos e interpretar simbología técnica siguiendo estándares CAD | - Simbología técnica ISO 1219<br>- Escalas en planos<br>- Sistemas de proyección<br>- Componentes en planos<br>- Tolerancias y anotaciones | - Acceder a archivo CAD<br>- Identificar capas y elementos<br>- Localizar simbología ISO<br>- Anotar medidas<br>- Generar reporte | - Identifica 90% símbolos ISO correctamente<br>- Interpreta escalas sin error<br>- Aplica procedimientos con seguridad | 1. Actividad cognitiva — Reflexionar sobre aplicación laboral del RAP en contexto técnico industrial<br><br>2. Actividad cognitiva — Identificar brechas comparando expectativas de desempeño vs realidad actual<br><br>3. Actividad cognitiva — Clasificar vocabulario técnico según categorías (componentes, mediciones, procesos)<br><br>4. Actividad procedimental — Pronunciar términos técnicos en inglés usando grabadora de audio<br><br>5. Actividad cognitiva — Analizar estructura de plano técnico en inglés usando estrategia SQ3R<br><br>6. Actividad cognitiva — Completar matriz de comprensión sobre componentes y simbología del plano<br><br>7. Actividad cognitiva — Identificar estructuras gramaticales presentes en manual técnico de componentes<br><br>8. Actividad procedimental — Redactar descripción técnica de componente siguiendo formato de reporte<br><br>9. Actividad procedimental — Participar en simulación defendiendo selección técnica bajo presión de debate<br><br>10. Actividad procedimental — Ejecutar proyecto final: interpretar plano real de proyecto en curso | DIRECTO: 48h<br>INDEPENDIENTE: 12h<br>TOTAL: 60h | Evidencia 1 — Tipo: Conocimiento. Técnica: Preguntas sobre comprensión de lectura técnica. Instrumento: Cuestionario No 1 (5 ítems sobre simbología y componentes del plano leído)<br><br>Evidencia 2 — Tipo: Producto. Técnica: Verificación de producto. Instrumento: Lista de verificación No 2 (10 criterios: gramática, vocabulario técnico, coherencia, formato, precisión)<br><br>Evidencia 3 — Tipo: Desempeño. Técnica: Observación + Preguntas. Instrumento: Cuestionario No 3 (5 ítems de comprensión auditiva) + Lista de Chequeo (4 indicadores de atención)<br><br>Evidencia 4 — Tipo: Desempeño. Técnica: Observación. Instrumento: Escala de estimación No 4 (5 criterios: pronunciación, fluidez, precisión gramatical, vocabulario, manejo de turno)<br><br>Evidencia 5 — Tipo: Desempeño. Técnica: Observación. Instrumento: Escala de estimación No 5 (5 criterios: funciones comunicativas, registro, interacción, estrategias de comunicación)<br><br>Evidencia 6 — Tipo: Conocimiento. Técnica: Preguntas. Instrumento: Cuestionario No 6 (25 ítems: 5 Reading, 5 Writing, 5 Listening, 5 Vocabulary, 5 Grammar sobre contenido acumulado) | Actividad 1: Aprendizaje colaborativo \| Técnica: Lluvia de ideas + Panel discussion<br><br>Actividad 3: CLIL \| Técnica: Mapas conceptuales<br><br>Actividad 5: Content-Based Learning \| Técnica: Investigación guiada<br><br>Actividad 6: Aprendizaje colaborativo \| Técnica: Jigsaw<br><br>Actividad 9: Juego de roles \| Técnica: Dramatización + Role play | Actividad 1:<br>Ambiente: Aula<br>Materiales: Proyector, pizarrón, flip chart, marcadores<br>Instructores: Instructor inglés + Técnico especialista<br><br>Actividad 5:<br>Ambiente: Aula<br>Materiales: Proyector, computadores 1 por pareja, planos ISO impresos, plantilla SQ3R<br>Instructores: Instructor inglés técnico<br><br>Actividad 10:<br>Ambiente: Campo/Contextual<br>Materiales: Acceso a sitio, planos reales, software CAD, documentación técnica<br>Instructores: Técnico especialista + Supervisor de sitio | PM-2.3 requiere acceso a planos reales de proyecto. Coordinar 1 semana antes. PM-2.8 simulación requiere micrófono calidad: verificar disponibilidad. |

### PARTE B: Validation Report (Resumen)

```yaml
validation_report:
  rap_id: "RAP-ADM-2024-001"
  overall_passed: true
  
  checks:
    hours_direct: {expected: 48, actual: 48, passed: true}
    hours_autonomous: {expected: 12, actual: 12, passed: true}
    evidence_count: {expected: 6, actual: 6, passed: true}
    cuestionario_points: {expected: 25, actual: 25, passed: true}
    all_activities_typed: {passed: true, cognitive: 6, procedural: 4}
    all_activities_vobjcon: {passed: true}
    no_evidence_in_transferencia: {passed: true, evidences_in_transfer: 0}
    continuity_criterion: {passed: true}
    bloom_sequence: {passed: true}
  
  recommendation: "Fila lista para PM-3.1 y PM-4.1"
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-2.0 | Session Blueprint (mapeo de 8 sesiones) |
| **Recibe input de** | PM-2.1 a PM-2.10 | Activity Cards (fragmentos de diseño) |
| **Recibe input de** | PM-1.2 | Columnas 1-5 (Competencia, RAP, Saberes, Criterios) |
| **Produce** | GFPI-F-134 | Fila completa, validada, lista para usar |
| **Alimenta a** | PM-3.1 | Fila oficial es la fuente del Playbook Outline |
| **Alimenta a** | PM-4.1 | Fila oficial define especificaciones de instrumentos |
| **Alimenta a** | PM-4.2 | Fila oficial define la estructura del cuestionario S6 |

---

*PM-2.11: GFPI-F-134 Row Assembler*  
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*  
*Versión 2.6.3 — 2026-04-20 (Check 15 añadido en v2.6.1: data-flow inversion del activity_footer · Check 16 añadido en v2.6.3: activity card schema con scaffold_inline embebido)*
