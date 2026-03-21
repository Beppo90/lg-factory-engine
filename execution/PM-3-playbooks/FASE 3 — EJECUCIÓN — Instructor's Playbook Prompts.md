# FASE 3 — EJECUCIÓN: INSTRUCTOR'S PLAYBOOK
### Sistema de Prompts Maestros — Fábrica Curricular FPI SENA
### Portafolio del Instructor — Sergio | Bilingüismo SENA
*Versión 2.0 · Marzo 2026*

---

## ¿QUÉ ES EL INSTRUCTOR'S PLAYBOOK?

El Playbook es el **documento de apoyo operativo** del instructor para ejecutar en el aula las actividades diseñadas en la Fase 2 (Planeación). Mientras que la Guía de Aprendizaje es el documento del **aprendiz**, el Playbook es el documento del **instructor**.

```
FASE 2 (Planeación) genera:
├── Learner's Worksheets (para el aprendiz)
└── ¿Cómo las ejecuto en el aula? ← EL PLAYBOOK RESUELVE ESTO

PLAYBOOK = 1 documento por GUÍA COMPLETA (24 horas)
```

### Elementos del Playbook

| Elemento | Descripción |
|---|---|
| **Instrucciones de facilitación** | Qué decir, qué hacer, cómo modelar, qué preguntas lanzar en cada momento |
| **Materiales y recursos** | Lista de materiales necesarios: equipos, proyector, handouts, audios, marcadores |
| **Contingencias y diferenciación** | Qué hacer si el grupo es más lento/rápido, actividades de extensión o simplificación |

### Arquitectura de Prompts de la Fase 3

```
PM-3.1 (Outline) ──→ PM-3.2 (Build-Out) ──→ PM-3.3 (Canva) ──→ PM-3.4 (Workbook)
   │                      │                      │                     │
   │  Genera la           │  Desarrolla cada     │  Transforma los     │  Genera el
   │  estructura macro    │  sesión en detalle   │  worksheets en      │  Practice Lab
   │  del Playbook        │  paso a paso con     │  presentación       │  para formación
   │  (sesiones,          │  facilitación,       │  visual de 20       │  autónoma:
   │  secuencia,          │  materiales y        │  slides para        │  Reinforce +
   │  flujo general)      │  contingencias       │  Canva              │  Extend + Prepare
   ▼                      ▼                      ▼                     ▼
 PLAYBOOK OUTLINE      PLAYBOOK COMPLETO      CANVA DECK           WORKBOOK
 (Mapa de ruta)        (Doc. operativo)       (Apoyo visual)       (PDF / Digital)
```

---

## PM-3.1: GENERADOR DEL PLAYBOOK OUTLINE (THE SESSION MAP)

*Usa este prompt para generar la estructura macro del Instructor's Playbook. Este prompt toma como insumo el output de toda la Fase 2 (los worksheets y actividades diseñadas) y los organiza en una secuencia lógica de sesiones presenciales, creando el mapa de ruta que el instructor seguirá en el aula.*

**Copia y pega lo siguiente:**

> **ACTÚA COMO:** Senior Instructional Facilitator, Expert in FPI (SENA) Pedagogical Model & Master Session Designer. Eres experto en gestión del aula, facilitación de aprendizaje activo y diseño de secuencias instruccionales para formación profesional técnica bilingüe.
>
> **MISIÓN:** Generar el OUTLINE (Estructura Macro) del Instructor's Playbook para una Guía de Aprendizaje completa de 24 horas. Este outline organiza todas las actividades diseñadas en la Fase 2 en una secuencia lógica de sesiones presenciales, asignando el flujo general de cada sesión sin entrar aún en el paso a paso detallado.
>
> **VARIABLES DE ENTRADA:**
> * **Programa:** [INSERTA PROGRAMA, ej: Análisis y Desarrollo de Software - ADSO]
> * **Nombre de la Guía / Macrotemática:** [INSERTA NOMBRE, ej: "The Code Hunter — Debugging & Error Reporting"]
> * **Competencia / Resultado de Aprendizaje:** [INSERTA RAP LITERAL DE SOFÍA PLUS — opcional pero recomendado]
> * **Nivel CEFR:** A1.1-A1.2 (ajustar si aplica)
> * **Número de sesiones presenciales disponibles:** [INSERTA, ej: 6 sesiones de 4 horas / 8 sesiones de 3 horas]
> * **Resumen de los materiales diseñados en Fase 2:** [PEGA AQUÍ UNA LISTA RESUMIDA DE LOS OUTPUTS DE LOS PM-2.1 A PM-2.9, ej:
>   - PM-2.1: Escenario "El día que se cayó WhatsApp" + 3 actividades de reflexión
>   - PM-2.2: Mind map de saberes previos + Learning Contract
>   - PM-2.3: Reading — Ticket de soporte técnico (150 palabras) + 3 actividades HOTS
>   - PM-2.4: Listening — Llamada por radio reportando bug + 3 actividades
>   - PM-2.5: Vocabulary — 10 chunks técnicos de troubleshooting
>   - PM-2.6: Pronunciation — Word stress en términos técnicos
>   - PM-2.7: Grammar — Present Simple + Imperativos (gramática inductiva)
>   - PM-2.8: Writing — Redacción de ticket de soporte propio
>   - PM-2.9: Speaking — Simulación de Daily Scrum Meeting]
>
> **REGLAS DE DISEÑO (OBLIGATORIAS):**
>
> 1. **Estructura por sesiones:** Organiza el outline en bloques de sesión numerados (Sesión 1, Sesión 2... Sesión N). Cada sesión debe tener un **nombre temático** que refleje la misión de ese día (Ej: *"Session 1: The Wake-Up Call"*, *"Session 4: The Hands-On Lab"*). NO asignes tiempos en minutos — el instructor gestiona su propio ritmo.
>
> 2. **Flujo progresivo de la guía SENA:** Respeta estrictamente la secuencia de las 4 fases de la guía de aprendizaje:
>    * **Sesión(es) inicial(es):** Reflexión Inicial (PM-2.1) + Contextualización (PM-2.2)
>    * **Sesiones centrales:** Apropiación — despliega los PM-2.3 a PM-2.7 en la secuencia que maximice el Reciclaje Circular de Input (Reading → Listening → Vocabulary → Pronunciation → Grammar)
>    * **Sesión(es) de producción:** Writing (PM-2.8) + Speaking Simulation (PM-2.9)
>    * **Sesión final:** Transferencia/Evaluación — aplicación del examen escrito (PM-2.10) y/o evaluación de desempeño y producto
>
> 3. **Para cada sesión, incluye SOLO:**
>    * **Nombre de la sesión** (temático y motivacional)
>    * **Fase de la guía SENA** que cubre (Reflexión / Contextualización / Apropiación / Transferencia)
>    * **Materiales PM que se ejecutan** (ej: PM-2.3 Reading + PM-2.5 Vocabulary)
>    * **Objetivo de la sesión** en una oración (lo que el aprendiz logrará al finalizar)
>    * **Materiales físicos/digitales necesarios** (proyector, handouts, audio, marcadores, etc.)
>    * **Nota de transición** (cómo conecta esta sesión con la siguiente — el "puente")
>
> 4. **Coherencia con Reciclaje Circular:** El outline debe mostrar explícitamente cómo el input de una sesión alimenta el output de la siguiente. Si en la Sesión 2 se trabaja el Reading, la Sesión 3 debe reciclar ese texto en el Listening o el Vocabulary. Nada queda suelto.
>
> 5. **FORMATO DE SALIDA:** Presenta el outline como una tabla limpia o lista estructurada, un documento de planificación macro que quepa en 1-2 páginas. Este outline será el input del PM-3.2 para el desarrollo detallado.

---

### 💡 Por qué el Outline es esencial antes del Build-Out:

1. **Evita la improvisación:** El instructor ve el mapa completo de la guía ANTES de planear el detalle de cada sesión. Sabe exactamente qué material entra en qué día y por qué.

2. **Materializa el Reciclaje Circular:** Al ver todas las sesiones en una sola vista, el instructor verifica que el input de Reading se recicle en Listening, luego en Vocabulary, luego en Grammar, luego en Writing y Speaking. Si hay un cabo suelto, se detecta aquí.

3. **Facilita la gestión de imprevistos:** Si una sesión se extiende o se pierde un día, el instructor puede reorganizar el mapa sin perder la coherencia del ciclo.

---

## PM-3.2: GENERADOR DEL PLAYBOOK BUILD-OUT (THE STEP-BY-STEP)

*Usa este prompt para desarrollar el detalle operativo de CADA SESIÓN del Playbook. Toma como insumo el outline generado en PM-3.1 y lo expande en instrucciones de facilitación paso a paso, materiales preparados y planes de contingencia. Este prompt se ejecuta UNA VEZ POR SESIÓN.*

**Copia y pega lo siguiente:**

> **ACTÚA COMO:** Senior Classroom Facilitator, Expert in Active Learning Methodologies & Master Bilingual Instructor (SENA). Eres experto en instrucciones de facilitación, gestión de grupo, andamiaje en tiempo real y diferenciación para perfiles técnicos de nivel A1.
>
> **MISIÓN:** Generar el desarrollo detallado (Build-Out) de UNA SESIÓN del Instructor's Playbook. Este documento le dice al instructor exactamente qué hacer, qué decir, qué modelar y cómo reaccionar en cada momento de la sesión, con un nivel de detalle que permita que cualquier instructor (incluso uno nuevo) pueda ejecutar la guía con confianza.
>
> **VARIABLES DE ENTRADA:**
> * **Programa:** [INSERTA PROGRAMA, ej: Análisis y Desarrollo de Software - ADSO]
> * **Nombre de la Guía / Macrotemática:** [INSERTA NOMBRE]
> * **Sesión a desarrollar:** [INSERTA NÚMERO Y NOMBRE DE LA SESIÓN DEL OUTLINE, ej: Sesión 3 — "The Hands-On Lab"]
> * **Fase de la guía SENA:** [INSERTA FASE, ej: Apropiación]
> * **Materiales PM que se ejecutan en esta sesión:** [INSERTA, ej: PM-2.5 (Vocabulary) + PM-2.6 (Pronunciation)]
> * **Nivel CEFR:** A1.1-A1.2 (ajustar si aplica)
> * **OUTPUT de los PM correspondientes:** [PEGA AQUÍ LOS WORKSHEETS / ACTIVIDADES GENERADOS EN FASE 2 QUE CORRESPONDEN A ESTA SESIÓN. Este es el material que el instructor va a facilitar.]
>
> **REGLAS DE DISEÑO (OBLIGATORIAS):**
>
> 1. **Estructura por momentos (no por minutos):** Divide la sesión en **momentos pedagógicos** secuenciales, no en bloques de tiempo rígidos. Cada momento tiene un nombre y un propósito claro. Sugiere los siguientes momentos base (adaptables):
>    * **WARM-UP (El Encendido):** Cómo abre la sesión. Conexión con la sesión anterior. Activación.
>    * **CORE ACTIVITIES (El Motor):** Facilitación de las actividades PM correspondientes. Este es el bloque central.
>    * **COOL-DOWN (El Cierre):** Recapitulación, preview de la próxima sesión, tarea autónoma si aplica.
>
> 2. **Instrucciones de Facilitación (The Teacher's Script):** Para cada momento y cada actividad dentro de ese momento, incluye:
>    * **SET-UP:** Cómo introduce la actividad al grupo (qué dice, qué muestra, cómo modela).
>    * **WHILE:** Qué hace el instructor MIENTRAS los aprendices trabajan (circula, observa, interviene, pregunta).
>    * **WRAP-UP:** Cómo cierra esa actividad (socialización, corrección de pares, feedback inmediato).
>    * **TEACHER TALK SAMPLES:** 2-3 frases modelo que el instructor puede decir literalmente en cada momento. Deben ser híbridas (Inglés simple + apoyo en español cuando sea necesario para nivel A1). Ej: *"Ok team, open your worksheet. / Abran su hoja de trabajo. Look at Activity 1..."*
>
> 3. **Materiales y Preparación (The Logistics Box):** Al inicio de cada sesión, incluye una caja de preparación que liste:
>    * **Antes de clase:** Qué debe preparar/imprimir/cargar el instructor antes de que lleguen los aprendices
>    * **En el aula:** Qué recursos físicos/digitales necesita tener listos (proyector, parlante, marcadores, handouts impresos, etc.)
>    * **Handouts:** Referencia exacta a cuáles worksheets del PM-2.x se entregan en esta sesión
>
> 4. **Contingencias y Diferenciación (The Plan B Panel):** Al final de cada sesión, incluye un panel con:
>    * **Si el grupo va más rápido de lo esperado:** Una actividad de extensión (Extension Task) que profundice sin avanzar a contenido nuevo. Puede ser un reto, un mini-quiz oral entre pares, o una variación HOTS de la actividad recién completada.
>    * **Si el grupo va más lento o presenta dificultades:** Una estrategia de simplificación (Scaffolding Boost) — cómo reducir la complejidad de la actividad sin eliminarla. Puede ser: dar más modelo, permitir más L1, reducir el número de ítems, trabajar en parejas en lugar de individual.
>    * **Si hay aprendices con nivel superior (A2+):** Una micro-tarea de liderazgo donde el aprendiz avanzado actúe como monitor/tutor de un compañero, reforzando su propio aprendizaje mientras apoya al grupo.
>
> 5. **Transición a la siguiente sesión (The Bridge):** Cierra el playbook de esta sesión con una nota de transición explícita:
>    * Qué debe quedar resuelto HOY para que la próxima sesión funcione
>    * Qué anticipar o asignar como tarea autónoma
>    * Una frase de cierre motivacional para el grupo (tipo "cliffhanger" o adelanto de lo que viene)
>
> 6. **FORMATO DE SALIDA:** Presenta el documento como un **Instructor's Session Guide** — limpio, con secciones claramente separadas mediante encabezados. NO es un formato de worksheet para el aprendiz. Es un documento interno de facilitación para el instructor. Usa formato profesional con tablas donde aplique.

---

### 💡 Por qué este Playbook transforma la ejecución:

1. **Elimina la improvisación sin eliminar la flexibilidad:** El instructor tiene su guion de facilitación pero no un cronómetro. Sabe qué hacer y decir en cada momento, pero gestiona su propio ritmo según la respuesta del grupo.

2. **Teacher Talk Samples (Regla 2):** Un instructor nuevo de Bilingüismo que nunca ha dado clase en inglés técnico a aprendices A1 tiene literalmente las frases modelo para abrir cada actividad. Un instructor experimentado las usa como referencia y las adapta con su estilo propio.

3. **Plan B Panel (Regla 4):** En formación presencial SENA, los grupos son heterogéneos. Siempre hay aprendices que terminan en 5 minutos y otros que necesitan 20. El Plan B evita que el instructor pierda al grupo rápido por aburrimiento o al grupo lento por frustración.

4. **The Bridge (Regla 5):** Cada sesión termina creando expectativa por la siguiente. Esto es neuroeducación aplicada — el cerebro retiene mejor cuando hay un "gancho abierto" (efecto Zeigarnik).

---

## PM-3.3: GENERADOR DE PRESENTACIÓN VISUAL PARA CANVA (THE SLIDE DECK)

*Usa este prompt para transformar los outputs de la Fase 2 (Learner's Worksheets) en un documento estructurado por páginas/diapositivas, listo para ser copiado y pegado directamente en Canva. Genera una presentación de 20 slides que funciona como recurso de apoyo visual para toda la guía de 24 horas.*

**Copia y pega lo siguiente:**

> **ACTÚA COMO:** Senior Visual Content Architect & ESP Instructional Designer (SENA). Eres experto en diseño de materiales educativos bilingües para formación técnica, paginación visual para Canva y accesibilidad para aprendices A1. Tu enfoque es transformar hojas de trabajo técnicas en experiencias visuales limpias, motivacionales y fáciles de seguir en pantalla.
>
> **MISIÓN:** Tomar el contenido de las Learner's Worksheets generadas en la Fase 2 (PM-2.1 a PM-2.9) y las Rúbricas/Instrumentos de Evaluación (PM-4.1), y transformarlos en un documento estructurado por 20 diapositivas, listo para ser copiado y pegado directamente en las cajas de texto de Canva. Este recurso funciona como presentación de apoyo visual para el instructor durante la ejecución de la guía completa.
>
> **VARIABLES DE ENTRADA:**
> * **Programa:** [INSERTA PROGRAMA, ej: Análisis y Desarrollo de Software - ADSO]
> * **Nombre de la Guía / Macrotemática:** [INSERTA NOMBRE, ej: "The Code Hunter — Debugging & Error Reporting"]
> * **Nivel CEFR:** A1.1-A1.2 (ajustar si aplica)
> * **Contenido a formatear (outputs de Fase 2):** [PEGA AQUÍ LOS OUTPUTS DE LOS PM-2.1 A PM-2.9 Y PM-4.1 GENERADOS PARA ESTA GUÍA. Si no tienes todos, indica cuáles faltan y la IA organizará solo lo disponible.]
> * **Identidad visual (opcional):** [INSERTA, ej: Colores SENA verde/blanco + logo del Centro de Formación / Paleta personalizada]
>
> **REGLAS DE DISEÑO (OBLIGATORIAS):**
>
> 1. **Distribución estándar de 20 slides:** Organiza el contenido siguiendo esta estructura base (adaptable según el contenido disponible):
>
>    ```
>    SLIDE 1:       Portada (Nombre de la Guía + Macrotemática + Programa + Logo)
>    SLIDE 2:       Objetivos de Aprendizaje / Learning Goals + RAP
>    SLIDE 3-4:     Reflexión Inicial (PM-2.1 — The Spark: Escenario + Actividades)
>    SLIDE 5-6:     Contextualización (PM-2.2 — Gap Analysis: Mind Map + Learning Contract)
>    SLIDE 7-9:     Reading Comprehension (PM-2.3 — Master Anchor: Texto + Actividades HOTS)
>    SLIDE 10-11:   Listening Comprehension (PM-2.4 — Auditory Anchor: Script ref + Actividades)
>    SLIDE 12-13:   Vocabulary & Language Function (PM-2.5 — Toolbelt + Ejercicios en contexto)
>    SLIDE 14:      Pronunciation (PM-2.6 — Cheat Sheet fonético + Drill de práctica)
>    SLIDE 15-16:   Grammar & Structure (PM-2.7 — Syntax Blueprint + Troubleshooting)
>    SLIDE 17-18:   Writing Task (PM-2.8 — Modelo + Guided Draft + Final Task)
>    SLIDE 19:      Speaking Simulation Brief (PM-2.9 — Mission Brief + Cue Card)
>    SLIDE 20:      Self-Assessment Checklist + Cierre motivacional + Preview próxima guía
>    ```
>
> 2. **Paginación lógica:** Marca cada slide como `### SLIDE [N]: [Nombre de la sección]`. La distribución debe evitar que una sola slide quede sobrecargada. **REGLA DE ACCESIBILIDAD A1: Máximo 60 palabras de contenido por slide.** Prioriza organizadores visuales (tablas, diagramas, listas con íconos) sobre párrafos. Cada slide debe tener al menos un 30% de espacio libre o zona para apoyo visual/imagen.
>
> 3. **Sugerencias de diseño (Canva Tips):** Debajo del título de cada slide, incluye una acotación en cursiva: `*(Sugerencia Canva: ...)*`. Las sugerencias deben ser específicas al contexto ESP/formación técnica:
>    * Ej: *"(Sugerencia Canva: Usa un recuadro tipo 'ticket de soporte' para simular el formato real del workplace)"*
>    * Ej: *"(Sugerencia Canva: Inserta imagen de un entorno de trabajo real del programa — taller, laboratorio, oficina)"*
>    * Ej: *"(Sugerencia Canva: Usa recuadros de colores contrastantes para el banco de lenguaje)"*
>    * Ej: *"(Sugerencia Canva: Deja espacio en blanco grande para que el aprendiz escriba/dibuje)"*
>
> 4. **Instrucciones bilingües híbridas:** Todas las instrucciones dirigidas al aprendiz deben ser en inglés simple seguido de la traducción al español en cursiva y entre paréntesis. Coherente con el estándar de las Learner's Worksheets del sistema PM. Ej: *"Read the text below. / (Lee el texto a continuación.)"*
>
> 5. **Limpieza absoluta (Zero Meta-Talk):** Elimina cualquier saludo, introducción, explicación pedagógica o frase de despedida. Entrega ÚNICAMENTE el texto que el aprendiz y el instructor van a leer en el documento final. Cero contenido que no sea para la presentación.
>
> 6. **Jerarquía visual:** Usa estrictamente:
>    * **Negritas** para palabras clave y vocabulario técnico
>    * Viñetas para listas de instrucciones
>    * Bloques de cita (`>`) para simular recuadros, reportes técnicos o tickets
>    * Líneas separadoras (`---`) al final de cada slide
>    * Líneas bajas (`_________`) o casillas vacías (`[ ]`) donde el aprendiz deba escribir o marcar
>
> 7. **FORMATO DE SALIDA:** Documento de texto limpio con las 20 slides separadas y numeradas, listo para copiar y pegar en Canva página por página. Cada slide es una unidad independiente que puede pegarse directamente en una caja de texto de Canva.

---

### 💡 Por qué PM-3.3 completa el ecosistema de ejecución:

1. **Del documento al aula visual:** Los worksheets de la Fase 2 son excelentes para imprimir, pero en el aula presencial SENA el instructor necesita un recurso de pantalla. La presentación de Canva es lo que el aprendiz ve proyectado mientras trabaja con su hoja impresa — se complementan.

2. **Accesibilidad A1 (60 palabras/slide):** Un aprendiz A1 no puede procesar un slide lleno de texto en inglés. La regla de 60 palabras obliga a la IA a sintetizar y priorizar lo visual, que es exactamente lo que SIOP recomienda para input comprensible.

3. **Los Canva Tips calibrados para ESP:** En lugar de sugerencias genéricas ("usa colores bonitos"), cada tip conecta con el entorno ocupacional del aprendiz — tickets de soporte, formularios técnicos, dashboards, layouts de reportes reales.

4. **Automatización futura:** Este prompt genera el texto estructurado para copiar/pegar manualmente en Canva. En una fase posterior de automatización, este mismo output puede alimentar directamente la API de Canva para generar la presentación sin intervención manual.

---

## PM-3.4: GENERADOR DE WORKBOOK AUTÓNOMO (THE PRACTICE LAB)

*Usa este prompt para generar el Workbook — un documento complementario a la Guía de Aprendizaje (Student's Book) que el aprendiz desarrolla de forma autónoma fuera del aula. El Workbook cumple tres funciones: refuerzo de lo visto en clase, extensión hacia un nivel HOTS superior, y preparación (Flipped Learning) para la siguiente sesión presencial. Se entrega en formato PDF imprimible y/o digital para Google Classroom.*

**Copia y pega lo siguiente:**

> **ACTÚA COMO:** Senior Autonomous Learning Designer, ESP Workbook Architect & Master Bilingual Instructor (SENA). Eres experto en diseño de materiales para práctica autónoma, repetición espaciada, Flipped Learning y estrategias de consolidación lingüística para perfiles técnicos A1. Entiendes que el Workbook NO es una copia de la guía — es su complemento para las horas de formación autónoma.
>
> **MISIÓN:** Generar el contenido completo de UN CAPÍTULO del Workbook, correspondiente a UNA SESIÓN de la guía de aprendizaje. Cada capítulo del Workbook tiene tres secciones funcionales diferenciadas: REINFORCE (refuerzo), EXTEND (extensión) y PREPARE (preparación). El Workbook completo tendrá tantos capítulos como sesiones tenga la guía.
>
> **VARIABLES DE ENTRADA:**
> * **Programa:** [INSERTA PROGRAMA, ej: Análisis y Desarrollo de Software - ADSO]
> * **Nombre de la Guía / Macrotemática:** [INSERTA NOMBRE, ej: "The Code Hunter — Debugging & Error Reporting"]
> * **Capítulo del Workbook / Sesión correspondiente:** [INSERTA, ej: Capítulo 3 — corresponde a Sesión 3: "The Hands-On Lab"]
> * **Nivel CEFR:** A1.1-A1.2 (ajustar si aplica)
> * **Contenido trabajado en la sesión correspondiente:** [PEGA AQUÍ EL RESUMEN O LOS OUTPUTS DE LOS PM-2.x QUE SE EJECUTARON EN ESA SESIÓN, ej: PM-2.5 Vocabulary (10 chunks de troubleshooting) + PM-2.6 Pronunciation (word stress en términos técnicos)]
> * **Contenido de la SIGUIENTE sesión:** [PEGA AQUÍ EL RESUMEN DE LOS PM-2.x DE LA PRÓXIMA SESIÓN para diseñar la sección PREPARE, ej: Próxima sesión = PM-2.7 Grammar (Present Simple + Imperativos)]
> * **Formato de entrega:** [ELIGE: PDF imprimible / Digital para Google Classroom / Ambos]
>
> **REGLAS DE DISEÑO (OBLIGATORIAS):**
>
> 1. **Estructura de tres secciones por capítulo:** Cada capítulo del Workbook se divide estrictamente en tres bloques funcionales, claramente separados y etiquetados:
>
>    ```
>    ┌─────────────────────────────────────────────────────────┐
>    │  SECCIÓN A: REINFORCE (Refuerzo)                        │
>    │  "Lo que practicamos hoy, lo domino solo"               │
>    │  ─────────────────────────────────────────               │
>    │  Práctica adicional del MISMO contenido de la sesión    │
>    │  con variaciones. Mismo nivel HOTS, diferentes           │
>    │  ejercicios. El objetivo es consolidación y retención.   │
>    ├─────────────────────────────────────────────────────────┤
>    │  SECCIÓN B: EXTEND (Extensión)                          │
>    │  "Un paso más allá de lo que hicimos en clase"          │
>    │  ─────────────────────────────────────────               │
>    │  Actividades que suben UN NIVEL en la escala HOTS       │
>    │  respecto a lo trabajado en clase. Si en clase se        │
>    │  trabajó ANALIZAR, aquí se trabaja EVALUAR. Si se        │
>    │  trabajó EVALUAR, aquí se trabaja CREAR. El contenido   │
>    │  técnico y lingüístico es el mismo, pero la demanda      │
>    │  cognitiva es mayor.                                     │
>    ├─────────────────────────────────────────────────────────┤
>    │  SECCIÓN C: PREPARE (Preparación — Flipped Learning)    │
>    │  "Lo que necesito traer listo para la próxima clase"    │
>    │  ─────────────────────────────────────────               │
>    │  Actividades de pre-exposición al contenido de la       │
>    │  SIGUIENTE sesión. Activación de vocabulario,            │
>    │  exploración de un texto corto, o una pregunta de        │
>    │  indagación que el aprendiz traerá resuelta al aula.    │
>    └─────────────────────────────────────────────────────────┘
>    ```
>
> 2. **SECCIÓN A — REINFORCE (2-3 actividades):**
>    * **Actividad R1 (Práctica controlada — variación):** Toma el mismo tipo de ejercicio que se hizo en clase (ej: si en clase completaron un ticket de soporte, aquí completan un correo técnico diferente) usando el MISMO vocabulario y gramática. Cambia el contexto, no el contenido lingüístico.
>    * **Actividad R2 (Consolidación visual/auditiva):** Diseña un ejercicio de repaso que use un canal sensorial diferente al de la clase. Si en clase fue lectura, aquí puede ser un ejercicio de escucha con QR code a un audio corto (si es digital) o un ejercicio de escritura de memoria (si es PDF). Si fue auditivo en clase, aquí es visual.
>    * **Actividad R3 (Micro-quiz de autodiagnóstico — opcional):** 5 preguntas rápidas tipo verdadero/falso o selección múltiple sobre el contenido de la sesión, con **respuestas al final del capítulo** para que el aprendiz se autoevalúe.
>
> 3. **SECCIÓN B — EXTEND (1-2 actividades):**
>    * **Actividad E1 (HOTS +1):** Diseña una actividad que use el mismo contenido técnico y lingüístico de la sesión pero suba un nivel en la Taxonomía de Bloom. Incluye instrucciones claras y un modelo o ejemplo resuelto para que el aprendiz A1 no se frustre con la demanda cognitiva superior.
>    * **Actividad E2 (Conexión con el mundo real — opcional):** Propone una micro-tarea de investigación o exploración que conecte el contenido de la sesión con la vida real del aprendiz. (Ej: *"Find a real error message on your phone or computer. Write it in English. What does it mean? / Encuentra un mensaje de error real en tu celular o computador. Escríbelo en inglés. ¿Qué significa?"*). Esta actividad fomenta la autonomía y conecta el aula con el entorno cotidiano.
>
> 4. **SECCIÓN C — PREPARE (1-2 actividades de Flipped Learning):**
>    * **Actividad P1 (Pre-exposición al vocabulario):** Presenta 5-7 palabras o chunks clave de la PRÓXIMA sesión. No las enseña — las presenta con imágenes, asociaciones visuales o contextos mínimos para que el aprendiz llegue al aula con familiaridad auditiva/visual. (Ej: tabla de "New Words Preview" con la palabra, una imagen asociada y una oración modelo muy corta).
>    * **Actividad P2 (Pregunta de indagación — The Warm-Up Homework):** Formula una pregunta abierta o un micro-reto que el aprendiz debe traer resuelto a la próxima clase. Esta pregunta se conecta directamente con el WARM-UP de la siguiente sesión del Playbook (PM-3.2). (Ej: *"Next class we will talk about safety rules. Before you come: Write 2 rules that exist in YOUR workshop. You can write in Spanish if you need to. / La próxima clase hablaremos sobre normas de seguridad. Antes de venir: Escribe 2 reglas que existan en TU taller. Puedes escribir en español si lo necesitas."*)
>
> 5. **Andamiaje y filtro afectivo bajo:**
>    * Todas las instrucciones deben ser **híbridas** (inglés simple + español en cursiva entre paréntesis).
>    * Incluye un **banco de lenguaje** (Language Bank) al inicio de cada sección con las palabras/frases clave que el aprendiz necesitará para completar las actividades.
>    * Los ejercicios deben tener **modelos resueltos** (worked examples) antes de pedir producción propia.
>    * Espacios generosos para escribir (`_________`) y casillas de verificación (`[ ]`) donde aplique.
>
> 6. **Diseño para doble formato (PDF + Digital):**
>    * **Para PDF:** El contenido debe ser autocontenido — todo lo que el aprendiz necesita está en la página. Incluye las respuestas del micro-quiz al final del capítulo (invertidas o en sección separada).
>    * **Para Google Classroom:** Añade al final de cada actividad una nota entre corchetes indicando cómo adaptar la actividad al formato digital: `[DIGITAL: Crear formulario de Google Forms para esta actividad]` o `[DIGITAL: Subir foto de la respuesta escrita]` o `[DIGITAL: Enlace a audio con QR code → insertar link aquí]`.
>
> 7. **FORMATO DE SALIDA:** Presenta el capítulo como un documento limpio, estructurado como un **Learner's Workbook Chapter**, con las tres secciones claramente separadas. Incluye al final: las respuestas del micro-quiz (si aplica) y la referencia de conexión con la siguiente sesión.

---

### 💡 Por qué el Workbook transforma las horas de formación autónoma:

1. **Llena el vacío de la formación autónoma SENA:** Las 36 horas (técnicas) o 62 horas (tecnológicas) de formación autónoma dejan de ser un "estudie por su cuenta" sin dirección. Cada hora autónoma tiene un recurso específico, rastreable y coherente con lo visto en el aula.

2. **Las tres funciones son complementarias, no redundantes:**
   * REINFORCE consolida lo que el cerebro acaba de ver (memoria a corto plazo → largo plazo).
   * EXTEND desafía al aprendiz a subir un nivel cognitivo sin la red de seguridad del instructor — fomenta autonomía real.
   * PREPARE transforma al aprendiz pasivo ("¿Qué vamos a ver hoy, profe?") en un aprendiz preparado que llega al aula con vocabulario pre-activado y una pregunta en mente.

3. **Conecta sesión con sesión a través del aprendiz:** La Sección C (PREPARE) del capítulo N alimenta el WARM-UP de la sesión N+1 del Playbook (PM-3.2). El instructor abre la clase preguntando por la tarea de indagación, y el aprendiz ya llega con material para participar desde el minuto uno.

4. **Doble formato = inclusión real:** No todos los aprendices del SENA tienen acceso a internet estable en casa. El PDF garantiza acceso universal. Google Classroom optimiza la experiencia donde hay conectividad. Ambos formatos coexisten sin que uno invalide al otro.

---

## ECOSISTEMA COMPLETO DE PRODUCTOS POR GUÍA

```
1 GUÍA DE APRENDIZAJE (24h) genera:

PARA EL APRENDIZ:
├── Guía de Aprendizaje (Student's Book) ← PM-2.1 a PM-2.9
├── Workbook (Practice Lab) ← PM-3.4 (1 capítulo por sesión)
└── Canva Presentation (Visual Aid) ← PM-3.3 (20 slides)

PARA EL INSTRUCTOR:
├── Playbook Outline (Session Map) ← PM-3.1
├── Playbook Build-Out (Step-by-Step) ← PM-3.2 (1 por sesión)
└── Instrumentos de Evaluación ← PM-4.1
```

---

## FLUJO OPERATIVO COMPLETO DE LA FASE 3

```
PASO 1: El instructor reúne todos los outputs de la Fase 2
        (Worksheets PM-2.1 a PM-2.9 + PM-4.1 instrumentos)
                    │
                    ▼
PASO 2: Ejecuta PM-3.1 (Outline)
        → Obtiene el MAPA DE SESIONES de la guía completa (24h)
        → Revisa que el Reciclaje Circular esté intacto
        → Ajusta si necesita redistribuir materiales
                    │
          ┌─────────┼─────────────────┐
          ▼         ▼                 ▼
PASO 3A: PM-3.2  PASO 3B: PM-3.3  PASO 3C: PM-3.4
(Build-Out)      (Canva Deck)     (Workbook)
UNA VEZ POR      UNA VEZ POR      UNA VEZ POR
SESIÓN           GUÍA             SESIÓN
          │         │                 │
          ▼         ▼                 ▼
PLAYBOOK       CANVA DECK        WORKBOOK
COMPLETO       (20 slides        COMPLETO
(Instructor)   apoyo visual)     (Aprendiz autónomo)
```

---

## INTEGRACIÓN CON EL MODELO CIRCULAR

```
         ANÁLISIS (PM-1.x)
        ↗                ↘
EVALUACIÓN (PM-4.x)    PLANEACIÓN (PM-2.x)
        ↖                ↙
         EJECUCIÓN (PM-3.x) ← ESTAMOS AQUÍ

PM-3.1 y PM-3.2 son la materialización en el aula
de todo lo diseñado en PM-1.x y PM-2.x.

Los resultados observados durante la ejecución alimentan
el PM-4.1 (Evaluación) y su §5 Feedback Loop,
que a su vez retroalimenta el PM-1.1 del siguiente ciclo.
```

---

*Fase 3 — Ejecución · Instructor's Playbook*
*Sistema de Prompts Maestros — Fábrica Curricular FPI SENA*
*Portafolio Instructor Bilingüismo SENA — Sergio · 2026*
