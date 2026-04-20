---
type: data-contract
version: 2.0
created: 2026-04-13
last_verified: 2026-04-13
status: active
---

# GFPI-F-134 — Data Contract

## Propósito

La matriz GFPI-F-134 es el algoritmo maestro de la planeación pedagógica del SENA. Es el documento oficial que traduce el diseño curricular en una secuencia de actividades de aprendizaje, evidencias e instrumentos de evaluación. Cada fila representa un Resultado de Aprendizaje (RAP) desplegado en sus 8 sesiones (60 horas: 48 directo + 12 independiente).

Este data contract documenta la estructura, significado, origen y restricciones de cada una de las 11 columnas de la matriz. Es el contrato entre PM-1.2 (análisis curricular), PM-2.x (diseño de actividades) y PM-2.11 (ensamblador de filas). Sin cumplimiento de este contrato, la matriz pierde validez pedagógica y legal.

---

## Las 11 Columnas de GFPI-F-134

### 1. COMPETENCIA

**Contenido:** Enunciado de la competencia laboral o académica que enmarca el RAP.

**Origen:** PM-1.2 (Scope & Sequence) — Salida directa de análisis curricular.

**Formato:** Texto conciso (máximo 150 caracteres). Comienza con verbo infinitivo + objeto + contexto laboral.

**Ejemplo:**  
`Interpretar planos técnicos en contexto industrial aplicando simbología normalizada.`

**Restricciones:** No puede ser nula. Debe estar alineada con norma de competencia SENA o estándar sectorial.

---

### 2. RESULTADOS DE APRENDIZAJE (RAP)

**Contenido:** Enunciado específico del RAP que desglosa la competencia.

**Origen:** PM-1.2 (Scope & Sequence).

**Formato:** Estructura `Verbo Bloom Nivel 3+ + Objeto + Condición de desempeño`.

**Ejemplo:**  
`Analizar planos arquitectónicos e interpretar simbología técnica siguiendo estándares CAD.`

**Restricciones:**  
- Verbo mínimo: Nivel de Taxonomía Bloom 3 (Aplicar) o superior.
- Debe ser evaluable directamente por las evidencias de la columna 8.
- Un RAP por fila. Duración: 8 sesiones = 60 horas.

---

### 3. SABERES DE CONCEPTOS Y PRINCIPIOS

**Contenido:** El "saber" cognitivo — conceptos, principios, leyes y marcos teóricos que el aprendiz debe comprender.

**Origen:** PM-1.2 (Scope & Sequence).

**Formato:** Lista estructurada de conceptos clave. Cada concepto puede incluir sub-ítems. Se recomienda jerarquía: concepto principal → definición → ejemplos aplicados.

**Ejemplo:**  
```
- Simbología técnica (norma ISO 1219)
  - Símbolos de válvulas, cilindros, bombas
  - Líneas: simples, discontinuas, de control
- Escalas en planos
  - Escala 1:50, 1:100 en arquitectura
  - Escala 1:1 en detalles constructivos
```

**Restricciones:**  
- Máximo 8-10 saberes principales por RAP.
- Deben poder verificarse en el cuestionario S6 (preguntas de conocimiento).

---

### 4. SABERES DE PROCESO

**Contenido:** El "saber hacer" — procedimientos, secuencias, algoritmos y técnicas aplicadas en contexto real.

**Origen:** PM-1.2 (Scope & Sequence).

**Formato:** Procedimientos ordenados con pasos claramente secuenciados. Se puede usar notación de pasos numerados o diagramas de flujo.

**Ejemplo:**  
```
1. Acceder al archivo de plano en software CAD
2. Identificar capas y elementos de referencia
3. Localizar simbología según norma ISO
4. Anotar e interpretar medidas y tolerancias
5. Genera reporte de interpretación
```

**Restricciones:**  
- Máximo 6-8 saberes de proceso por RAP.
- Cada uno debe ser observable en actividades de S3-S5 (Writing, Speaking, Listening, Language Functions).

---

### 5. CRITERIOS DE EVALUACIÓN

**Contenido:** Criterios explícitos contra los que se valida el desempeño del aprendiz en el RAP.

**Origen:** PM-1.2 (Scope & Sequence).

**Formato:** Cada criterio empieza con verbo observable + objeto + estándar de calidad.

**Ejemplo:**  
```
- Identifica correctamente el 90% de símbolos técnicos en planos de complejidad media.
- Interpreta escalas y medidas sin errores de magnitud.
- Aplica procedimientos de lectura de planos con seguridad en contexto industrial.
```

**Restricciones:**  
- 4-6 criterios por RAP.
- Deben ser 1:1 con las 6 evidencias de columna 8.
- Cada criterio es verificable, específico y medible.

---

### 6. ACTIVIDADES DE APRENDIZAJE A DESARROLLAR

**Contenido:** Listado de todas las actividades pedagógicas que el aprendiz realiza en el RAP.

**Origen:** PM-2.x (todos los PMs de Fase 2). Se estructuran en la Activity Card y se ensamblan en PM-2.11.

**Formato obligatorio:** `[Verbo infinitivo] + [Objeto] + [Condición]`

**Ejemplo:**  
```
1. Analizar símbolos técnicos ISO 1219 en manuales de maquinaria industrial (Actividad cognitiva)
2. Completar cuadro comparativo de simbología antigua vs. actual (Actividad cognitiva)
3. Redactar interpretación de plano arquitectónico siguiendo plantilla de reporte (Actividad procedimental)
4. Pronunciar términos técnicos en inglés usando grabadora de audio (Actividad procedimental)
5. Participar en simulación: defensor de decisiones técnicas basadas en plano (Actividad procedimental)
```

**Restricciones:**  
- De 5 a 9 actividades por RAP.
- Cada actividad debe estar tipificada como:
  - **Actividad cognitiva:** enfoque en comprensión, análisis, síntesis (PM-2.1, PM-2.2, PM-2.3, PM-2.5, PM-2.10).
  - **Actividad procedimental:** enfoque en ejecución, creación, comunicación (PM-2.4, PM-2.6, PM-2.8, PM-2.9).
- Deben estar secuenciadas (de menor a mayor complejidad Bloom).
- Cada actividad contribuye a una estrategia didáctica (columna 9) y un ambiente (columna 10).

---

### 7. DURACIÓN ACTIVIDAD DE APRENDIZAJE (HORAS)

**Contenido:** Distribución de tiempo para cada actividad.

**Origen:** PM-2.x proporciona horas en la Activity Card.

**Formato:** Dos sub-columnas:

| HORAS TRABAJO DIRECTO | HORAS TRABAJO INDEPENDIENTE |
|---|---|
| Tiempo bajo guía del instructor | Tiempo de estudio/práctica autónoma |

**Restricciones numéticas por RAP (8 sesiones):**  
- **Total Trabajo Directo:** 48 horas (6 horas por sesión × 8 sesiones)
- **Total Trabajo Independiente:** 12 horas (1.5 horas por sesión × 8 sesiones)
- **Suma total:** 60 horas

**Distribución orientativa por sesión:**
- S1 (Reflexión + Contextualización): 6h directo + 1.5h independiente = 7.5h
- S2 (Apropiación - Reading, Vocab): 6h directo + 1.5h independiente = 7.5h
- S3 (Apropiación - Writing, Grammar): 6h directo + 1.5h independiente = 7.5h
- S4 (Apropiación - Listening, Speaking): 6h directo + 1.5h independiente = 7.5h
- S5 (Apropiación - Language Functions): 6h directo + 1.5h independiente = 7.5h
- S6 (Evaluación primera mitad + Transferencia segunda mitad): 6h directo + 1.5h independiente = 7.5h
- S7-S8 (Transferencia - Final Mission): 12h directo + 3h independiente = 15h

**Validación:** PM-2.11 suma todas las horas de PM-2.x para verificar = 48h directo y 12h independiente.

---

### 8. DESCRIPCIÓN DE LA EVIDENCIA DE APRENDIZAJE

**Contenido:** Especificación detallada de cada una de las 6 evidencias formales del RAP.

**Origen:** PM-2.x en Activity Card (solo actividades de APROPIACIÓN: S2-S5 + cuestionario S6). PM-4.1 genera instrumentos.

**REGLA CRÍTICA:** Las evidencias formales de la matriz GFPI-F-134 **SOLO** provienen de actividades de APROPIACIÓN (S2-S5 y cuestionario consolidado de S6, primera mitad). La transferencia (S6 segunda mitad, S7, S8) NO genera evidencias en esta matriz.

**Estructura de cada evidencia: 3 componentes**

```
[Tipo: Conocimiento | Desempeño | Producto]
Técnica de evaluación: [Preguntas | Observación | Verificación del producto]
Instrumento No X: [Cuestionario | Lista de Chequeo | Lista de verificación | Escala de estimación]
```

**Las 6 evidencias obligatorias por RAP:**

| # | Origen | Tipo | Técnica | Instrumento | Sesión | Puntos |
|---|---|---|---|---|---|---|
| 1 | PM-2.3 (Reading) | Conocimiento | Preguntas | Cuestionario | S2 | 5 pts |
| 2 | PM-2.4 (Writing) | Producto | Verificación del producto | Lista de verificación | S3 | 5 pts |
| 3 | PM-2.6 (Listening) | Desempeño | Observación + Preguntas | Cuestionario + Lista de Chequeo | S4 | 5 pts |
| 4 | PM-2.8 (Speaking) | Desempeño | Observación | Escala de estimación | S4 | 5 pts |
| 5 | PM-2.9 (Language Functions) | Desempeño | Observación + Preguntas | Escala de estimación | S5 | 5 pts |
| 6 | PM-2.x (Cuestionario consolidado) | Conocimiento | Preguntas | Cuestionario | S6 (1ª mitad) | 5 pts |

**Detalles de cada evidencia:**

**Evidencia 1: Reading Comprehension**
```
Tipo: Conocimiento
Técnica: Preguntas (comprensión de lectura)
Instrumento: Cuestionario No 1 (5 ítems de selección múltiple o respuesta corta sobre texto técnico)
Descripción: El aprendiz demuestra comprensión de textos técnicos en inglés (manuales, 
especificaciones, artículos especializados) respondiendo preguntas de nivel literal e inferencial.
```

**Evidencia 2: Written Production**
```
Tipo: Producto
Técnica: Verificación del producto (rúbrica)
Instrumento: Lista de verificación No 2 (checklist con 8-10 criterios: gramática, vocabulario, 
coherencia, formato, cumplimiento de tarea)
Descripción: El aprendiz produce un texto escrito completo (párrafo, reporte, resumen, 
descripción de proceso) en inglés técnico que demuestra control de estructuras gramaticales, 
vocabulario especializado y organización lógica.
```

**Evidencia 3: Listening Comprehension**
```
Tipo: Desempeño
Técnica: Preguntas + Observación (durante escucha de audio/video técnico)
Instrumento: Cuestionario No 3 (5 ítems sobre contenido de audio) + Lista de Chequeo (4-5 
indicadores de atención/participación)
Descripción: El aprendiz demuestra comprensión de contenido oral en inglés (instrucciones, 
diálogos técnicos, exposiciones, videos) respondiendo preguntas y completando tareas de 
escucha (notetaking, secuenciación, verificación).
```

**Evidencia 4: Oral Production (Speaking)**
```
Tipo: Desempeño
Técnica: Observación (durante participación oral)
Instrumento: Escala de estimación No 4 (5-7 criterios: pronunciación, fluidez, precisión 
gramatical, vocabulario, manejo de turno conversacional)
Descripción: El aprendiz demuestra capacidad de comunicación oral en inglés ejecutando tareas 
funcionales (describir procesos, participar en simulación, presentar información, defender 
posición). Se evalúa fluidez, precisión y adecuación al contexto técnico.
```

**Evidencia 5: Language Functions (Communicative Competence)**
```
Tipo: Desempeño
Técnica: Observación + Preguntas (durante actividad de Language Functions de S5)
Instrumento: Escala de estimación No 5 (4-6 criterios: uso apropiado de funciones comunicativas, 
registro, interacción, manejo de estrategias de comunicación)
Descripción: El aprendiz demuestra dominio de funciones comunicativas contextualizadas 
(pedir información, dar instrucciones, debatir, explicar decisiones técnicas) en contexto 
de la especialidad. Se evalúa adecuación pragmática y efectividad comunicativa.
```

**Evidencia 6: Consolidated Questionnaire (Knowledge Synthesis)**
```
Tipo: Conocimiento
Técnica: Preguntas (evaluación sumativa de conceptos del RAP)
Instrumento: Cuestionario No 6 (25 ítems totales: 5 de Reading, 5 de Vocabulary, 5 de Grammar, 
5 de Listening, 5 de Language Functions — distribuidos según aporte de PM-2.x)
Descripción: El aprendiz responde un cuestionario consolidado que evalúa síntesis y retención 
de conocimiento conceptual del RAP (saber qué): terminología técnica, reglas gramaticales, 
patrones de lectura, patrones auditivos, patrones de interacción. Se administra en S6 
(primera mitad = evaluación acumulativa del RAP).
```

**Restricciones:**  
- Las 6 evidencias son fijas por RAP (no negociables).
- Total de puntos: 30 (6 evidencias × 5 puntos cada una).
- Cada evidencia tiene instrumento numerado (Instrumento No 1 a No 6).
- Las evidencias NO son 1:1 con actividades (una actividad puede alimentar múltiples evidencias; una evidencia emerge de múltiples actividades).

---

### 9. ESTRATEGIAS DIDÁCTICAS ACTIVAS

**Contenido:** Estrategia didáctica + Técnica didáctica asociada a cada actividad.

**Origen:** PM-2.x (cada Activity Card especifica estrategia y técnica por actividad).

**Relación:** 1:1 con actividades de columna 6.

**Formato:**
```
Actividad N: [Estrategia Didáctica]
Técnica: [Técnica Didáctica]
```

**Estrategias didácticas permitidas (basadas en SENA + bilingüismo):**
- Aprendizaje Basado en Problemas (ABP)
- Aprendizaje colaborativo
- Aprendizaje basado en proyectos
- Trabajo colaborativo
- Aprendizaje basado en tareas (TBLT)
- Simulación
- Juego de roles
- Aprendizaje orientado por investigación
- Aprendizaje basado en contenido (Content-Based Learning)
- CLIL (Content and Language Integrated Learning)

**Técnicas didácticas permitidas:**
- Dramatización
- Exposición y debate
- Simulación
- Investigación guiada
- Práctica de campo
- Taller
- Conversatorio
- Análisis de casos
- Lluvia de ideas
- Mapas conceptuales
- Juegos educativos
- Role play
- Jigsaw
- Think-Pair-Share
- Panel discussion

**Ejemplo:**
```
Actividad 1 (Analizar símbolos técnicos): Aprendizaje basado en tareas
Técnica: Investigación guiada

Actividad 3 (Redactar interpretación): Aprendizaje colaborativo
Técnica: Taller + Análisis de casos

Actividad 5 (Simulación técnica): Juego de roles
Técnica: Dramatización + Role play
```

**Restricciones:**  
- Cada actividad debe tener 1 estrategia primaria.
- Se puede indicar técnicas múltiples (máximo 2) si la actividad lo requiere.
- La estrategia debe alinearse con el tipo de actividad (cognitiva vs. procedimental).
- Se prioriza pedagogía activa: mínimo CLIL o Content-Based en todos los PMs, sin excepciones.

---

### 10. AMBIENTES DE APRENDIZAJE TIPIFICADOS

**Contenido:** Especificación del ambiente físico/virtual, materiales de formación e instructor responsable.

**Origen:** PM-2.x en Activity Card.

**Formato:** Tres sub-columnas por cada ambiente:

| AMBIENTE | MATERIALES DE FORMACIÓN | INSTRUCTORES RESPONSABLES |
|---|---|---|
| Aula, Laboratorio, Virtual, Campo, etc. | Lista de recursos (software, equipos, textos, etc.) | Nombre/rol del instructor |

**Tipos de ambientes permitidos:**
- **Aula:** Salón de clase presencial con recursos básicos.
- **Laboratorio:** Espacio especializado con máquinas, software técnico o simuladores.
- **Virtual:** Plataforma LMS, videoconferencia, plataformas educativas en línea.
- **Campo/Contextual:** Empresa, sitio de obra, espacio real de desempeño laboral.
- **Híbrido:** Combinación de presencial y virtual.

**Materiales de Formación:**
- Software (CAD, Matlab, Python, SolidWorks, etc.)
- Equipos (máquinas industriales, computadores, proyectores, etc.)
- Textos (manuales, guías, artículos especializados, libros)
- Recursos digitales (videos, simuladores, webinars, repositorios)
- Plataformas (Moodle, Teams, Zoom, Blackboard, etc.)
- Materiales concretos (modelos, maquetas, herramientas, componentes)

**Instructores Responsables:**
- Nombre del instructor (o rol genérico: "Instructor de inglés técnico", "Técnico especialista en X")
- Puede haber 1-2 instructores por RAP (codocencia permitida).

**Ejemplo:**
```
Actividad 1 (Analizar símbolos):
Ambiente: Aula
Materiales: Proyector, PDF de norma ISO 1219, pizarrón, computadores (1 por pareja)
Instructores: Instructor de Inglés + Técnico especialista en Hidráulica

Actividad 3 (Redactar interpretación):
Ambiente: Virtual
Materiales: Plataforma Moodle, plantilla de reporte en Word, rubrique en PDF, repositorio de planos
Instructores: Instructor de inglés técnico

Actividad 5 (Simulación):
Ambiente: Laboratorio + Aula
Materiales: Simulator de plantas industriales (software), tablero de control, manuales de operación, proyector
Instructores: Técnico especialista en automática + Instructor de inglés
```

**Restricciones:**  
- Cada actividad debe tener al menos 1 ambiente asignado.
- Los ambientes deben estar disponibles en el centro de formación SENA.
- Cada actividad requiere un listado específico de materiales (no genérico).
- Mínimo 1 instructor responsable por actividad.

---

### 11. OBSERVACIONES

**Contenido:** Campo libre para notas, advertencias, aclaraciones o recomendaciones del instructor/diseñador.

**Uso recomendado:**
- Aclaraciones sobre prerrequisitos o limitaciones logísticas.
- Notas sobre flexibilidad en tiempo (si una actividad requiere más horas).
- Recomendaciones de recursos externos o actualizaciones de normas.
- Alertas de seguridad o consideraciones éticas.
- Conexiones con otros RAPs o programas paralelos.
- Sugerencias de mejora para próximas iteraciones.

**Ejemplo:**
```
"PM-2.3 requiere acceso a planos reales de proyecto en curso en planta. Coordinar con 
supervisor de sitio 1 semana antes. PM-2.8 simulación requiere micrófono de calidad: 
verificar antes de S4. Vocabulario técnico de ISO 1219 debe estar impreso y disponible en 
aula (budget $30 por copia)."
```

**Restricciones:**  
- Máximo 300 caracteres por RAP.
- No reemplaza especificaciones técnicas de otras columnas.
- Se utiliza solo cuando hay información que no encaja en las columnas 1-10.

---

## Criterios Pedagógicos Obligatorios

Toda fila de GFPI-F-134 DEBE cumplir estos 4 criterios para ser válida:

### 1. Continuidad e Integralidad

**Definición:** La planeación de un RAP técnico específico SIEMPRE cruza con RAPs transversales (inglés, ética, emprendimiento, sostenibilidad).

**Prohibido:** Bloque de aprendizaje puramente técnico sin integración L2 o transversal.

**Verificación:** 
- ¿El RAP incluye evidencias de inglés (Reading, Writing, Listening, Speaking)? → Sí obligatoriamente.
- ¿El RAP incluye reflexión sobre impacto ético o sostenibilidad del tema? → Sí, en PM-2.1 o PM-2.2.
- ¿El RAP conecta con competencias genéricas (comunicación, trabajo en equipo)? → Sí, en Language Functions (PM-2.9).

---

### 2. Antecedente-Consecuente

**Definición:** Las actividades se secuencian de menor a mayor complejidad cognitiva (Bloom L1-2 → L3 → L4-6). Las bases (conceptos fundamentales) se enseñan primero; la complejidad viene después.

**Secuencia fija de Bloom por sesión:**
- S1 (Reflexión): Bloom L1-2 (Recordar, Comprender)
- S2 (Reading, Vocabulary): Bloom L2-3 (Comprender, Aplicar)
- S3 (Writing, Grammar): Bloom L2-3 (Comprender, Aplicar)
- S4 (Listening, Speaking): Bloom L3-4 (Aplicar, Analizar)
- S5 (Language Functions): Bloom L3-5 (Aplicar, Analizar, Evaluar)
- S6 (Evaluación): Bloom L2-3 (Recordar, Comprender)
- S7-S8 (Transferencia): Bloom L4-6 (Analizar, Evaluar, Crear)

**Verificación:** ¿Cada actividad posterior presupone dominio de la anterior? → Sí. ¿Hay saltos de complejidad inesperados? → No.

---

### 3. Economía

**Definición:** Redacción concisa, sin rodeos. Cada instrucción sigue estructura `Verbo+Objeto+Condición`. Toda palabra cuenta; nada sobra.

**Ejemplos de buena economía:**
- ✅ "Analizar símbolos ISO 1219 en manual de maquinaria industrial"
- ✅ "Redactar reporte de interpretación de plano siguiendo plantilla SENA-2026"

**Ejemplos de mala economía:**
- ❌ "Los aprendices van a proceder a analizar y a tratar de entender los símbolos que aparecen en los manuales técnicos de maquinaria industrial según la norma ISO 1219"
- ❌ "Se sugiere que el aprendiz intente redactar un documento que contenga una interpretación del plano, si es posible que siga una plantilla"

**Restricción:** Descripción de actividad máximo 120 caracteres. Descripción de evidencia máximo 250 caracteres.

---

### 4. Alineación de Evidencias

**Definición:** Cada evidencia de la columna 8 responde exactamente a uno o más criterios de evaluación (columna 5).

**Regla 1:1+ (no muchos a muchos sin justificación):**

| Criterio de Evaluación | Evidencia que lo verifica |
|---|---|
| Identifica correctamente símbolos ISO 1219 | Evidencia 1 (Reading) + Evidencia 3 (Listening) |
| Interpreta escalas y medidas sin error | Evidencia 2 (Writing) |
| Aplica procedimientos de lectura técnica | Evidencia 1 (Reading) + Evidencia 6 (Cuestionario) |
| Comunica análisis técnico con precisión | Evidencia 4 (Speaking) + Evidencia 5 (Language Functions) |

**Verificación:** ¿Cada criterio tiene al menos 1 evidencia que lo mide? → Sí. ¿Hay evidencias "huérfanas" sin criterio asociado? → No.

---

## Marco Pedagógico Integrado

El LG Factory Engine implementa una síntesis de marcos pedagógicos para garantizar que el inglés técnico NO es "inglés + técnica en paralelo", sino **lenguaje integrado con contenido**:

### 1. ESP (English for Specific Purposes)
- Enfoque: El inglés se enseña como herramienta para realizar tareas técnicas reales.
- Aplicación: PM-2.3 (Reading técnico), PM-2.4 (Writing de reportes), PM-2.6 (Listening de instrucciones).
- Principio: "No enseñar inglés aislado; enseñar inglés para **hacer** cosas técnicas".

### 2. CLIL (Content and Language Integrated Learning)
- Enfoque: El contenido técnico es el vehículo para aprendizaje de L2. L2 no es "materia adicional" sino **medio de instrucción**.
- Aplicación: Todas las actividades de PM-2.x se nombran, explican y ejecutan en inglés.
- Principio: "El alumno aprende inglés porque lo necesita para aprender el contenido; el contenido se aprende EN inglés".

### 3. Content-Based Learning (CBL)
- Enfoque: Organizar el currículo alrededor de contenido de especialidad real, no alrededor de secuencias de estructuras gramaticales.
- Aplicación: PM-1.2 (Scope & Sequence) parte de temas técnicos del diseño curricular y desde allí se derivan estructuras lingüísticas necesarias.
- Principio: "La gramática es **sierva** del contenido; no al revés".

### 4. Understanding by Design (UbD)
- Enfoque: Diseño de atrás hacia adelante (backward design). Se comienza con evidencias de entendimiento transferible, no con objetivos de cobertura.
- Aplicación: PM-1.2 → PM-2.x → PM-4.x todas orientadas a 6 evidencias específicas y medibles.
- Principio: "Enseñar para transferencia y aplicación real; no para examen memorístico".

### 5. SIOP Model (Sheltered Instruction Observation Protocol)
- Enfoque: Scaffolding sistemático para aprendices L2. Estructuración explícita, input comprensible, oportunidades de interacción.
- Aplicación: PM-2.5 (Vocabulary scaffolding), PM-2.10 (Grammar scaffolding), uso de visuals, realia, modelos.
- Principio: "Hazlo comprensible; hazlo accesible; hazlo participativo".

---

## Relaciones con Otros Componentes del Sistema

### Inputs
- **PM-1.2 (Scope & Sequence)** → Columnas 1-5 (COMPETENCIA, RAP, SABERES, CRITERIOS)
- **PM-2.x (Todos los PMs de Fase 2)** → Activity Cards que se ensamblan en columnas 6-10

### Procesamiento
- **PM-2.11 (Row Assembler)** → Recibe Activity Cards de PM-2.x y las integra en una fila GFPI-F-134 coherente

### Outputs
- **GFPI-F-134 (esta matriz)** → Fuente oficial de validación pedagógica
- **GFPI-F-135 (Formulario del aprendiz)** → Se genera derivadamente a partir de F-134
- **PM-4.1 (Instrumentos de Evaluación)** → Recibe especificaciones de evidencia de F-134 y elabora cuestionarios, listas de chequeo, etc.
- **PM-4.2 (Question Bank Consolidado)** → Recibe ítems de cuestionario de cada evidencia para armar el cuestionario S6

### Referencias Cruzadas
- Toda fila debe citar qué PM-1.2 la originó (trazabilidad)
- Toda fila debe listar de qué PM-2.x se derivó (trazabilidad)
- Toda fila debe enlazar a los 6 instrumentos de evaluación que genera (trazabilidad)

---

## Validación e Implementación

### Checklist de validación antes de publicar una fila GFPI-F-134

- [ ] Columna 1: COMPETENCIA ≠ nula, alineada a norma SENA
- [ ] Columna 2: RAP en Bloom L3+, evaluable
- [ ] Columna 3: Saberes conceptuales 8-10 items, verificables en evidencias
- [ ] Columna 4: Saberes de proceso 6-8 items, observables en S3-S5
- [ ] Columna 5: Criterios 4-6, 1:1+ con evidencias
- [ ] Columna 6: Actividades 5-9, verbo+objeto+condición, cognitivas y procedimentales distribuidas
- [ ] Columna 7: Horas = 48 directo + 12 independiente (suma validada por PM-2.11)
- [ ] Columna 8: 6 evidencias obligatorias, todas con tipo + técnica + instrumento numerado
- [ ] Columna 9: 1 estrategia + 1-2 técnicas por actividad
- [ ] Columna 10: Ambientes con materiales específicos + instructores responsables
- [ ] Columna 11: Observaciones ≤ 300 caracteres (si aplican)
- [ ] Criterio 1: ¿Cruza RAP técnico con inglés + transversal? ✓
- [ ] Criterio 2: ¿Secuencia Bloom ascendente? ✓
- [ ] Criterio 3: ¿Redacción económica? ✓
- [ ] Criterio 4: ¿Evidencias alineadas con criterios? ✓

---

**Versión:** 2.0  
**Vigencia:** A partir del 2026-04-13  
**Última revisión:** 2026-04-13  
**Responsable:** LG Factory Engine — SENA Colombia
