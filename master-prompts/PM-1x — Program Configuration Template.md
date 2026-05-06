---
status: deprecated
deprecated_date: 2026-05-07
superseded_by: "docs/HOW-TO-NEW-PROGRAM.md + apps/input-form/ (english-engine-lab) + pm-0-context.json + pm-1-1.json"
version: 1.0 → deprecated
---

> [!warning] ⚠️ DEPRECATED 2026-05-07 · NO USAR PARA PROGRAMAS NUEVOS
>
> Este template ha sido **DEPRECATED**. La instanciación de programas nuevos ahora se hace via:
>
> 1. **Form web** (`apps/input-form/` en english-engine-lab) → genera `pm-0-0-input.json` + `pm-1-1-input.json` validados contra schema canon (`form-schema-pm0-pm11.json`)
> 2. **`docs/HOW-TO-NEW-PROGRAM.md`** describe el paso-a-paso completo del pipeline (Phase 0 → Phase 4) con ejemplo runtime INFRATI multi-comp
>
> Este archivo se preserva como **canon histórico legacy**. **No usar para instanciar programas nuevos.**
>
> **Razón deprecation:** pre-paradigm shift PM-0.0 v2.0 (multi-comp + fusión bidireccional ESP · 2026-05-04) · post-Mejoras #3+#4 PM-0 v3.4.1 (REGLA 14 mid-program awareness · 2026-05-05). Single source of truth migró de markdown template a JSON canon (`pm-0-context.json` v3.4 + `pm-1-1.json` v2.9 + `pm-1-2.json` v4.3.1).
>
> **References cross-master** ("PM-1.x correspondiente" en PM-0, PM-3.2, PM-4.1) son semánticamente compatibles con esta deprecation · refieren a "info propia de cada programa" cuyo storage migró de markdown a JSON canon. Update opcional de esas references es deuda pequeña, no bloqueante.

---

# PM-1.x — Program Configuration Template (LEGACY · pre-paradigm-shift v2.0)
**Tipo:** Plantilla de instanciación del sistema FPI SENA (DEPRECATED · ver header)
**Instrucción legacy:** Completar una copia de este documento por cada programa técnico o tecnológico nuevo. Renombrar como `PM-1.[código-programa] — [Nombre del programa].md`
**Referencia obligatoria:** PM-0 — CEFR Framework & FPI SENA Pedagogical Foundation
**Versión plantilla:** 1.0 — 2026-04-19

> [!warning] AVISO PARA EL LLM — Ejemplos de referencia
> Los ejemplos incluidos en esta plantilla (texto entre corchetes `[Ej.: ...]`) usan el programa **Técnico en Mantenimiento de Motores Diesel** (DIESEL G1 — *The Workshop Specialist*) como caso de referencia principal. Son **únicamente ilustrativos** — no representan el contenido canónico de ningún otro programa.
>
> Al completar esta plantilla para un nuevo programa, **sustituir TODO contenido `[Ej.: ...]` por el contenido técnico real del programa que se está configurando**. No copiar ni adaptar los ejemplos de Diesel a otro sector sin análisis curricular propio.

---

## BLOQUE 1 — Identificación del programa

| Campo | Valor |
|-------|-------|
| **Nombre del programa** | [Ej.: Técnico en Mantenimiento de Equipos Industriales] |
| **Código SENA** | [Ej.: 621204] |
| **Nivel de formación** | [Técnico / Tecnológico] |
| **Duración total** | [Ej.: 2 años / 4 semestres] |
| **Horas totales de formación** | [Ej.: 2.640 horas] |
| **Área de desempeño** | [Ej.: Mecánica, Electrónica, Salud, Logística, etc.] |
| **Entorno laboral principal** | [Ej.: taller de mantenimiento industrial, planta de producción, centro de salud] |
| **Versión FPI** | [Ej.: FPI-SENA v2.0] |
| **Diseñador del programa** | [Nombre] |
| **Fecha de creación** | [YYYY-MM-DD] |

---

## BLOQUE 2 — Alcance CEFR del programa

Indicar qué subniveles cubre este programa (marcar los aplicables):

| Subnivel | ¿Incluido? | Guía correspondiente |
|----------|:----------:|---------------------|
| A1.1 — Breakthrough inicial | ☐ | G___ |
| A1.2 — Breakthrough consolidado | ☐ | G___ |
| A1.3 — Breakthrough avanzado | ☐ | G___ |
| A2.0 — Waystage inicial | ☐ | G___ |
| A2.1 — Waystage consolidado | ☐ | G___ |

**Subnivel de entrada estimado de los aprendices:** ___________  
**Subnivel de salida objetivo del programa:** ___________

---

## BLOQUE 3 — Personajes del programa

*El sistema FPI requiere al menos tres personajes recurrentes que representen los roles del entorno laboral del programa. Estos personajes aparecerán en todos los textos, diálogos, escenarios y simulaciones del programa. Deben ser creíbles para el contexto cultural y laboral específico.*

### Personaje 1 — Supervisor / Jefe inmediato

| Campo | Valor |
|-------|-------|
| **Nombre** | [Ej.: Ingeniero Ramírez] |
| **Rol laboral** | [Ej.: Jefe de mantenimiento de planta] |
| **Función en los escenarios FPI** | Da instrucciones, evalúa resultados, asigna tareas, da briefings técnicos |
| **Tono de comunicación** | [Ej.: directo, técnico, exigente pero justo] |
| **Frase característica en inglés** | [Ej.: "Check the report before you start. Safety first."] |

### Personaje 2 — Técnico senior / Mentor

| Campo | Valor |
|-------|-------|
| **Nombre** | [Ej.: Técnico Morales] |
| **Rol laboral** | [Ej.: Técnico de mantenimiento con 10 años de experiencia] |
| **Función en los escenarios FPI** | Modela procedimientos, explica, corrige, colabora con el aprendiz |
| **Tono de comunicación** | [Ej.: paciente, didáctico, usa humor técnico] |
| **Frase característica en inglés** | [Ej.: "Let me show you. Watch carefully, then you try."] |

### Personaje 3 — Aprendiz / Par del estudiante

| Campo | Valor |
|-------|-------|
| **Nombre** | [Ej.: Ana] |
| **Rol laboral** | [Ej.: Aprendiz de primer semestre] |
| **Función en los escenarios FPI** | Representa al aprendiz en los diálogos; comete errores creíbles; aprende junto al estudiante |
| **Tono de comunicación** | [Ej.: inseguro pero motivado, hace preguntas que el estudiante también tiene] |
| **Frase característica en inglés** | [Ej.: "I'm not sure… can you explain again?"] |

### Personaje adicional (opcional)

| Campo | Valor |
|-------|-------|
| **Nombre** | |
| **Rol laboral** | |
| **Función en los escenarios FPI** | |

---

## BLOQUE 4 — Mapa de guías del programa

*Completar la tabla con el contenido técnico específico de ESTE programa. No copiar de otro programa. El contenido debe provenir del análisis curricular del RAP y las actividades de aprendizaje del programa SENA.*

| Guía | Subnivel CEFR | Título de la guía | Dominio técnico principal | RAP asociado |
|------|:-------------:|-------------------|--------------------------|:------------:|
| G1 | A1.1 | [Ej.: The Workshop Specialist] | [Ej.: Herramientas básicas, PPE, vocabulario de seguridad] | RAP ___ |
| G2 | A1.2 | [Título] | [Dominio técnico] | RAP ___ |
| G3 | A1.3 | [Título] | [Dominio técnico] | RAP ___ |
| G4 | A2.0 | [Título] | [Dominio técnico] | RAP ___ |
| G5 | A2.1 | [Título] | [Dominio técnico] | RAP ___ |

---

## BLOQUE 5 — Contextos auténticos del programa

*Los escenarios del sistema FPI deben estar situados en el entorno laboral real del programa. Describir los 3–5 contextos físicos o situacionales más frecuentes donde el aprendiz usará inglés.*

| # | Contexto | Descripción |
|---|----------|-------------|
| 1 | [Ej.: Taller de mantenimiento] | [Dónde, qué actividades, qué tipo de inglés se usa ahí] |
| 2 | [Ej.: Área de almacén de repuestos] | |
| 3 | [Ej.: Sala de briefing / reunión técnica] | |
| 4 | | |
| 5 | | |

---

## BLOQUE 6 — Realia técnica del programa

*Listar los materiales visuales y físicos auténticos del entorno laboral que se usarán como realia en el aula. Estos deben alimentar el principio Show, don't tell (PM-0 § 5.2).*

| Tipo de realia | Descripción | Guía(s) donde se usa |
|----------------|-------------|---------------------|
| [Ej.: Fotos de herramientas] | [Ej.: Set fotográfico de 20 herramientas del taller] | G1 |
| [Ej.: Formatos técnicos reales] | [Ej.: Formato de orden de trabajo del sector] | G2, G3 |
| [Ej.: Diagramas del fabricante] | [Ej.: Diagramas de componentes en inglés] | G3, G4, G5 |
| | | |
| | | |

---

## BLOQUE 7 — Funciones comunicativas por guía (F1–F5)

*Las Language Functions son las funciones comunicativas concretas que el aprendiz desarrolla en cada guía. Definir las 5 funciones por guía. Usar el formato: verbo + objeto + contexto técnico.*

### G1 — Funciones comunicativas (A1.1)

| Función | Descripción |
|---------|-------------|
| F1 | [Ej.: Identificar y nombrar herramientas básicas del taller] |
| F2 | [Ej.: Describir el uso de una herramienta (I use this to...)] |
| F3 | [Ej.: Entender y seguir instrucciones de seguridad simples] |
| F4 | [Ej.: Preguntar y responder sobre el estado de una tarea] |
| F5 | [Ej.: Presentarse y dar información personal básica] |

### G2 — Funciones comunicativas (A1.2)

| Función | Descripción |
|---------|-------------|
| F1 | |
| F2 | |
| F3 | |
| F4 | |
| F5 | |

### G3 — Funciones comunicativas (A1.3)

| Función | Descripción |
|---------|-------------|
| F1 | |
| F2 | |
| F3 | |
| F4 | |
| F5 | |

### G4 — Funciones comunicativas (A2.0)

| Función | Descripción |
|---------|-------------|
| F1 | |
| F2 | |
| F3 | |
| F4 | |
| F5 | |

### G5 — Funciones comunicativas (A2.1)

| Función | Descripción |
|---------|-------------|
| F1 | |
| F2 | |
| F3 | |
| F4 | |
| F5 | |

---

## BLOQUE 8 — Banco de vocabulario semilla por guía

*Listar los 20–30 términos técnicos de más alta frecuencia y rentabilidad comunicativa para cada guía. Estos alimentarán el Word Wall y el PM-2.5. Incluir pronunciación aproximada en los casos de stress no obvio.*

### G1 — Vocabulario semilla (A1.1)

| # | Término | Pronunciación | Categoría |
|---|---------|:-------------:|-----------|
| 1 | | | [herramienta / seguridad / proceso / medida] |
| 2 | | | |
| 3 | | | |
| … | | | |

*(Replicar tabla para G2, G3, G4, G5)*

---

## BLOQUE 9 — Sílabo gramatical estandarizado por guía

*Sílabo gramatical de referencia del sistema FPI SENA, distribuido en cinco guías (A1.1 → A2.1). Derivado del marco gramatical de Life Second Edition (National Geographic Learning) y adaptado al contexto técnico-vocacional de SENA. Este sílabo aplica a cualquier programa técnico o tecnológico.*

**Convenciones:**
- **Intro** = se introduce por primera vez en esta guía
- **Consolida** = se practica y fija en esta guía
- **Aplica** = se usa en contexto auténtico sin foco explícito de forma
- **—** = no se cubre en esta guía

---

### Grupo 1 — Verbo be

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Formas afirmativas contratadas: I'm, you're, he's, she's, it's, we're, they're | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Formas negativas: isn't, aren't, 'm not | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Preguntas con be e inversión: Is he...? Are you...? | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Respuestas cortas: Yes, I am. / No, it isn't. | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Be con la edad: He's twelve. / She's twenty. | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Formas pasadas: was / were (afirmativo, negativo, pregunta) | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 2 — Pronombres y adjetivos determinativos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Pronombres sujeto: I, you, he, she, it, we, they | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Adjetivos posesivos: my, your, his, her, its, our, their | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Pronombres demostrativos: this, that, these, those | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Pronombres objeto: me, you, him, her, it, us, them | — | **Intro** | Consolida | Aplica | Aplica |
| Posesivo 's y s': Alan's tool / the workers' area | **Intro** | Consolida | Aplica | Aplica | Aplica |

---

### Grupo 3 — Sustantivos y artículos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Plural regular: -s, -es, -ies | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Plural irregular: feet, teeth, people, equipment | — | **Intro** | Consolida | Aplica | Aplica |
| Artículos indefinidos: a / an | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Artículo definido: the / sin artículo | — | **Intro** | Consolida | Aplica | Aplica |
| Sustantivos incontables (information, equipment, water) | — | — | **Intro** | Consolida | Aplica |
| Some / any con contables e incontables | — | **Intro** | Consolida | Aplica | Aplica |
| Uso de mayúsculas en nombres propios | **Intro** | Consolida | Aplica | Aplica | Aplica |

---

### Grupo 4 — Adjetivos

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Posición del adjetivo: antes del sustantivo (a big engine) | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Adjetivos invariables: big engines, NOT bigs engines | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Comparativos: bigger / more complex | — | — | **Intro** | Consolida | Aplica |
| Superlativos: the biggest / the most critical | — | — | — | **Intro** | Consolida |

---

### Grupo 5 — Imperativo

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Imperativo afirmativo: base form — Check / Open / Use | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Imperativo negativo: Don't + base form | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 6 — Can y verbos modales

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Can / can't: habilidad (I can use a torque wrench) | — | **Intro** | Consolida | Aplica | Aplica |
| Can: permiso, solicitud e invitación (Can I...? Can you...?) | — | **Intro** | Consolida | Aplica | Aplica |
| Must / mustn't: obligación y prohibición técnica | — | — | **Intro** | Consolida | Aplica |
| Should / shouldn't: recomendación técnica | — | — | **Intro** | Consolida | Aplica |
| I'd like / We'd like: solicitud formal cortés | — | — | **Intro** | Consolida | Aplica |
| Could / might: posibilidad y alternativa de diagnóstico | — | — | — | **Intro** | Consolida |
| Would: condicional y solicitudes (Would you...?) | — | — | — | **Intro** | Consolida |

---

### Grupo 7 — Have / Has y There is / There are

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Have / has: posesión | — | **Intro** | Consolida | Aplica | Aplica |
| There is / there are: afirmativo | — | **Intro** | Consolida | Aplica | Aplica |
| There is / there are: negativo y pregunta + some/any | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 8 — Presente simple

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: I/you/we/they + base form (I check, you use) | — | **Intro** | Consolida | Aplica | Aplica |
| 3ra persona singular: he/she/it + -s/-es (He checks, It starts) | — | **Intro** | Consolida | Aplica | Aplica |
| Negativo: don't / doesn't + base form | — | **Intro** | Consolida | Aplica | Aplica |
| Preguntas: Do/Does...? + respuestas cortas (Yes, I do.) | — | **Intro** | Consolida | Aplica | Aplica |
| Preguntas Wh- con presente simple (What do you use?) | — | **Intro** | Consolida | Aplica | Aplica |
| Adverbios de frecuencia: always, usually, often, sometimes, never | — | **Intro** | Consolida | Aplica | Aplica |
| Preposiciones de tiempo: at, in, on | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 9 — Pasado simple

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Verbos regulares: -ed / -d (checked, drained, replaced) | — | — | **Intro** | Consolida | Aplica |
| Verbos irregulares de alta frecuencia (got, found, had, went...) | — | — | **Intro** | Consolida | Aplica |
| Negativo: didn't + base form | — | — | **Intro** | Consolida | Aplica |
| Preguntas: Did...? + base form + respuestas cortas | — | — | **Intro** | Consolida | Aplica |
| Preguntas Wh-: What did you...? Where did it...? | — | — | **Intro** | Consolida | Aplica |
| Uso de When con el pasado (When I checked..., it was...) | — | — | **Intro** | Consolida | Aplica |
| Números ordinales y fechas | — | — | **Intro** | Consolida | Aplica |

---

### Grupo 10 — Presente continuo

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: is/are + -ing (The engine is running) | — | — | **Intro** | Consolida | Aplica |
| Negativo y preguntas (Is it working? It isn't starting.) | — | — | **Intro** | Consolida | Aplica |
| Para planes y arreglos futuros + expresión de tiempo | — | — | — | **Intro** | Consolida |
| Reglas de spelling -ing: sitting, coming, lying | — | — | **Intro** | Consolida | Aplica |
| Contraste: presente simple vs. presente continuo | — | — | — | **Intro** | Consolida |

---

### Grupo 11 — Presente perfecto

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Afirmativo: have/has + participio pasado (The engine has lost pressure) | — | — | — | **Intro** | Consolida |
| Negativo y preguntas (Has it been serviced? No, it hasn't.) | — | — | — | **Intro** | Consolida |
| Marcadores: already, yet, just, ever, never | — | — | — | — | **Intro** |
| Contraste: presente perfecto vs. pasado simple | — | — | — | — | **Intro** |

---

### Grupo 12 — Condicionales

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Condicional tipo 1: If + presente simple, will + base form | — | — | — | **Intro** | Consolida |
| Condicional tipo 2: If + pasado simple, would + base form | — | — | — | — | **Intro** |

---

### Grupo 13 — Voz pasiva

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Voz pasiva presente: is/are + participio (The filter is replaced every 5,000 km) | — | — | — | **Intro** | Consolida |
| Voz pasiva pasado: was/were + participio (The valve was replaced) | — | — | — | — | **Intro** |

---

### Grupo 14 — Preposiciones

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| In: lugar (in the workshop, in a tank, in English) | **Intro** | Consolida | Aplica | Aplica | Aplica |
| At: lugar específico y hora (at the workbench, at 8 o'clock) | — | **Intro** | Consolida | Aplica | Aplica |
| Next to / near: relación espacial de componentes | — | **Intro** | Consolida | Aplica | Aplica |
| On: superficies y transporte (on the surface, on a bus) | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 15 — Conectores y puntuación

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| Conectores básicos: and, but, or, because | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Contracciones: reglas y uso del apóstrofe | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Puntuación básica: . , ? ! | **Intro** | Consolida | Aplica | Aplica | Aplica |
| Sugerencias: Let's..., How about...? | — | — | **Intro** | Consolida | Aplica |
| Conectores de secuencia: first, then, next, after that, finally | — | — | **Intro** | Consolida | Aplica |
| Because para dar razones técnicas | — | **Intro** | Consolida | Aplica | Aplica |

---

### Grupo 16 — Palabras interrogativas (Wh-)

| Estructura gramatical | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|-----------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| What, Where, Who, Why, When | — | **Intro** | Consolida | Aplica | Aplica |
| How + adjetivo/adverbio (How much? How often? How long?) | — | — | **Intro** | Consolida | Aplica |
| Which (alternativas técnicas) / Whose (responsabilidad) | — | — | — | **Intro** | Consolida |

---

### Grupo 17 — Temas específicos del sector *(completar por programa)*

*Espacio para estructuras gramaticales de alta rentabilidad en el dominio técnico de ESTE programa que no estén contempladas en los grupos anteriores. El instructor o diseñador del programa los define aquí.*

| Estructura gramatical específica del sector | G1 A1.1 | G2 A1.2 | G3 A1.3 | G4 A2.0 | G5 A2.1 |
|---------------------------------------------|:-------:|:-------:|:-------:|:-------:|:-------:|
| [Tema adicional 1 — ej.: reported speech básico para transcripción de diagnósticos] | | | | | |
| [Tema adicional 2] | | | | | |
| [Tema adicional 3] | | | | | |
| [Tema adicional 4] | | | | | |
| [Tema adicional 5] | | | | | |

---

## BLOQUE 10 — Misión Final por guía (PM-3.5)

*Describir brevemente la Misión Final de cada guía — la tarea de transferencia auténtica que integra todas las competencias acumuladas. Debe ser contextualizada en el entorno laboral real del programa.*

| Guía | Título de la Misión Final | Descripción en una oración |
|------|--------------------------|---------------------------|
| G1 | [Ej.: The Workshop Morning Briefing] | [El aprendiz presenta el estado del taller y las herramientas disponibles a su supervisor usando el vocabulario de la guía] |
| G2 | | |
| G3 | | |
| G4 | | |
| G5 | | |

---

## BLOQUE 11 — Política de L1 del programa

*Basado en PM-0 § 5.12 — especificar las decisiones de L1 particulares para este programa.*

**Nivel de entrada real de los aprendices:** ___________  
**Exposición previa al inglés técnico:** [ninguna / mínima / básica / intermedia]

| Guía | Política de L1 recomendada |
|------|---------------------------|
| G1 | [Ej.: L1 permitido para instrucciones y explicaciones gramaticales. L2 en todas las tareas de producción.] |
| G2 | |
| G3 | |
| G4 | |
| G5 | |

---

## BLOQUE 12 — Notas de diseño y advertencias

*Espacio para registrar decisiones de diseño importantes, restricciones culturales, sensibilidades del entorno laboral, o particularidades del programa que los PM-2.x y PM-3.x deben respetar.*

| # | Nota | Aplica a |
|---|------|---------|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Lista de verificación de completitud

Antes de aprobar este PM-1.x para uso en producción, verificar:

- [ ] Todos los campos del Bloque 1 están completos
- [ ] El alcance CEFR del Bloque 2 es consistente con los recursos del programa
- [ ] Los tres personajes del Bloque 3 son creíbles y distintos entre sí
- [ ] El mapa de guías del Bloque 4 tiene contenido técnico original (no copiado de otro programa)
- [ ] Los contextos del Bloque 5 son verificables en el entorno laboral real
- [ ] El vocabulario semilla del Bloque 8 tiene al menos 15 términos por guía
- [ ] Las Misiones Finales del Bloque 10 son realizables a nivel A1.x
- [ ] Este PM-1.x ha sido revisado con el Instrumento de Trazabilidad (PM-0 § 7)

---

*Este documento es un insumo obligatorio para el diseño de PM-2.x, PM-3.x y PM-4.x del programa. Ningún PM de nivel inferior debe producirse sin que este documento esté completo y aprobado.*
