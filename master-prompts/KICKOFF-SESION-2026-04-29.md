---
title: KICKOFF — Sesión 2026-04-29 (continuación Fase 2 FPI SENA)
proposito: Documento auto-suficiente para retomar el trabajo mañana sin perder contexto
sesion_anterior: 2026-04-28 (sesión arquitectónica Fase 2 + canonización Opción A)
quien_continua: Claude (skill fpi-sena-fase1 activa) + Sergio (instructor responsable)
duracion_sesion_anterior: ~6 horas
---

# KICKOFF — Sesión 2026-04-29

## Para Claude (que arranca mañana sin contexto)

Lee este documento completo antes de hacer cualquier cosa. Tiene todo lo que necesitas para retomar exactamente donde quedamos.

---

## 0. ESTADO ACTUAL DEL SISTEMA (al cierre 2026-04-28)

### Lo que está vivo y funcionando

**Fase 1 (PM-0 → PM-1.1 → PM-1.2):**
- Skill `fpi-sena-fase1` operativa con REGLA 19 PRE-FLIGHT obligatorio
- 8+ runs reales completados:
  - DIESEL-2026-04-15, 04-18, 04-19 (Mantenimiento de Motores Diesel · Técnico · 6 guías cada uno)
  - MGV-2026-04-20 (Medios Gráficos Visuales · Tecnológico · 6 guías · más maduro · llega hasta PM-3.6)
  - MGV-2026-04-27 (mismo programa · v2.7.1 con corrección rango_cefr A2.0→A2.2)
  - IMARPOR-CC-2026-04-27 (Curso Complementario marítimo · single-guía absorpción 4 RAPs · 100h)
  - INGBAS4-2026 (Inglés Básico 4 · single-guía absorpción 3 RAPs · 48h · A2.0→A2.2)
  - INGBAS1-AGRO-2026 (Inglés Básico 1 sectorial agro · single-guía absorpción 2 RAPs · 48h · A1.1→A1.2)

**Master prompts canon vigentes:**
- DM v2.12 (DOCUMENTO MAESTRO — actualizado 2026-04-28 con jerarquía canónica)
- PM-0 v1.1
- PM-1.1 v2.7.1 (con `regla_bloques` 4 patrones + asimetría tipo-programa)
- PM-1.2 v2.6 (4 bloques canónicos)
- **PM-2.1 v3.0** (recién actualizado 2026-04-28 — 2 modos canonizados: DEFAULT Narrative Scenario + EXTENSIBLE 4 arquetipos secuencia encadenada)
- **PM-2.2 v3.0** (recién actualizado 2026-04-28 — 2 modos canonizados: DEFAULT The Mirror + EXTENSIBLE 4 arquetipos secuencia encadenada)
- PM-2.3 a PM-2.10 v2.0 (sin cambios)
- PM-2.11 v2.6.3 (16 checks · Check 13 = CHECK 9 anti-copia-fantasma desde changelog v2.4)
- PM-3.x, PM-4.1, PM-4.2 vigentes

**Plan arquitectónico Fase 2:**
- `master-prompts/PLAN-FASE-2-ARQUITECTURA.md` v1.3 (RESUELTO)
- §11.5 ESTADO: RESUELTO 2026-04-28 ✓ — Opción A canonizada
- Hito 2 (construcción de skill `fpi-sena-fase2`) DESBLOQUEADO

---

## 1. LAS 3 DECISIONES TOMADAS EL 2026-04-28

### Decisión 1 — Jerarquía canónica de autoridad documentada (DM v2.12)

```
NIVEL 1 — DIRECTIVA DEL INSTRUCTOR (autoridad máxima)
   Ejemplo capturado: "Quiero todos los arquetipos para todos los PM"
   Ubicación canónica: runs/MGV-2026-04-20/pm-2-11.json:574

NIVEL 2 — IMPLEMENTACIÓN OPERACIONAL CANONIZADA
   - DIESEL: estilo "diesel_secuencia_encadenada" (archetype_used [N] + archetype_mode)
   - MGV: estilo "mgv_compendio_metodologico" (integration_all_archetypes_policy)

NIVEL 3 — MASTER PROMPTS CANON (deben actualizarse cuando contradigan 1-2)
```

**Patrón meta:** cuando un master prompt y la realidad operacional de runs maduros se contradicen, NO es discrepancia — es jerarquía canónica no reconocida. La directiva del instructor capturada en runs reales sobrescribe master prompts antiguos.

### Decisión 2 — Opción A canonizada (interpretación DIESEL adoptada como canon)

PM-2.1 y PM-2.2 ahora soportan 2 modos canonizados:

**PM-2.1:**
- Modo DEFAULT: "Narrative Scenario" (1 arquetipo · estructura EXPLORE/ENGAGE/DISCOVER)
- Modo EXTENSIBLE: 4 arquetipos secuencia encadenada
  - A — Visual/Infografía
  - B — Story/Narrativa
  - C — News/Noticia técnica
  - D — Debate/Encuesta

**PM-2.2:**
- Modo DEFAULT: "The Mirror" (1 arquetipo · estructura WHAT-I-KNOW/BLIND-SPOTS/LEARNING-CONTRACT)
- Modo EXTENSIBLE: 4 arquetipos secuencia encadenada
  - A — Self-assessment/KWL
  - B — Diagnosis visual
  - C — Gap card
  - D — Peer interview

Instructor declara modo en `runs/[RUN-ID]/arquetipos-elegidos.json`.

### Decisión 3 — Re-calibración de timing de Fase 2

Sergio rectificó la recomendación de "esperar 2-3 semanas con Nellis":

> *"No es relevante seguir esperando validación Fase 1 en producción real. Sinceramente, eso ya no importa. Llevo semanas aplicando los runs de DIESEL y MGV y si todo sale bien, vamos a hacer algo histórico."*

**Conclusión:** Fase 2 arranca YA. Sergio ES la validación operacional. Los 8+ runs reales son la evidencia empírica suficiente. Hito 1 (capturar lecciones) está hecho de facto vía DIESEL × 3 + MGV × 2.

---

## 2. LO QUE ESTÁ PENDIENTE PARA MAÑANA

### A — REGLA 20 (15 min · prioritario · resuelve sesgo cognitivo de Claude)

**Insight derivado de los errores de hoy:** Claude tiende a afirmar "esto no existe / es invención" cuando algo no está en su memoria de trabajo, en lugar de buscar primero. Esto causó 6 falsas invenciones en mi auditoría hoy.

**REGLA 20 — VERIFICACIÓN ANTES DE NEGAR:**

> Antes de afirmar que un concepto/campo/término "es invención", "no existe" o "falta", ejecutar grep en:
> 1. Los 11 master prompts canon (`master-prompts/PM-*.md`)
> 2. Runs DIESEL completos (`runs/DIESEL-*/`)
> 3. Runs MGV completos (`runs/MGV-*/`)
> 4. Scripts .js de generadores (`runs/*/scripts/`)
> 5. Planes arquitectónicos previos (`master-prompts/PLAN-*.md`)
>
> Solo si los 5 vectores arrojan 0 hits, puedo afirmar que es invención.

**Acción mañana:** agregar REGLA 20 a:
- `.claude/skills/fpi-sena-fase1/SKILL.md` (sección PRE-FLIGHT obligatorio)
- `.claude/skills/fpi-sena-fase1/references/pre-flight.md` (PASOS A-G ampliados con PASO H verificación-antes-de-negar)
- `.claude/skills/fpi-sena-fase1/references/troubleshooting.md` (anti-patrón "Falsa invención" con caso 2026-04-28)

### B — Arrancar Semana 1 de Fase 2 (construcción skill `fpi-sena-fase2`)

**Plan revisado · 5 semanas (no 6-8 como antes · Hito 1 ya hecho de facto):**

| Semana | Entrega |
|---|---|
| **1** | Skill `fpi-sena-fase2` · pre-flight global + REGLA 19 + REGLA 20 + lectura de los 11 master prompts en contexto orquestador |
| **2** | 4 subagentes mecánicos: PM-2.0 architect · PM-2.11 row assembler (verificar 16 checks PASS) · PM-4.1 instruments derivador · PM-4.2 cuestionario S6. CHECK 9 byte-hash automatizado |
| **3** | 2 subagentes "creativos con gate" piloto: PM-2.3 reading anchor + PM-2.5 vocabulario (probar contra MGV-G1 como ground truth) |
| **4** | 6 subagentes "creativos con gate" restantes: PM-2.1, PM-2.2, PM-2.4, PM-2.6, PM-2.8, PM-2.9, PM-2.10 |
| **5** | Test E2E contra IMARPOR-CC (single-guía · más simple) · ajustar gates · empaquetar como `.skill` |

---

## 3. LAS 3 PRIMERAS INSTRUCCIONES PARA ARRANCAR MAÑANA

### Instrucción 1 — Pre-flight obligatorio (5 min)

Re-leer estos archivos en orden, sin saltarse:

1. **Este documento** (KICKOFF-SESION-2026-04-29.md) completo
2. `master-prompts/PLAN-FASE-2-ARQUITECTURA.md` v1.3 (especialmente §3, §4.5, §5, §6, §11.5 RESUELTO)
3. `master-prompts/DOCUMENTO MAESTRO ... .md` v2.12 §11 entrada nueva (jerarquía canónica)
4. `master-prompts/PM-2.1 — The Spark — Reflexión Inicial.md` v3.0 (2 modos canonizados)
5. `master-prompts/PM-2.2 — Gap Analysis — Contextualización.md` v3.0 (2 modos canonizados)

**NO arrancar ninguna acción concreta hasta haber leído los 5.** Esto es REGLA 19 aplicada al kickoff.

### Instrucción 2 — Aplicar REGLA 20 (15 min)

Editar 3 archivos de la skill `fpi-sena-fase1` para agregar la regla nueva:

**Archivo 1:** `.claude/skills/fpi-sena-fase1/SKILL.md`
- Agregar sección "REGLA 20 — VERIFICACIÓN ANTES DE NEGAR" después de la sección de REGLA 19
- Texto literal de la regla: ver §2.A de este documento

**Archivo 2:** `.claude/skills/fpi-sena-fase1/references/pre-flight.md`
- Agregar PASO H: "Verificación antes de negar" como último paso del pre-flight
- Listar los 5 vectores de búsqueda obligatorios

**Archivo 3:** `.claude/skills/fpi-sena-fase1/references/troubleshooting.md`
- Agregar nuevo anti-patrón: "Falsa invención"
- Caso histórico: 2026-04-28 — Claude llamó "invención" a 6 conceptos que sí existían en runs DIESEL/MGV (archetype_mode, bloom_ceiling, integration_all_archetypes_policy, etc.) por no haber buscado exhaustivamente. Sergio detectó y forzó búsqueda real.
- Mitigación: aplicar REGLA 20 antes de cualquier auditoría que niegue existencia de algo

Verificar al final con grep que las 3 referencias a REGLA 20 están en los 3 archivos.

### Instrucción 3 — Arrancar Semana 1 Fase 2 (~2-3 horas estimado)

Construir el esqueleto de la skill `fpi-sena-fase2`:

**Estructura objetivo:**
```
.claude/skills/fpi-sena-fase2/
├── SKILL.md                          ← entrada principal · pre-flight global REGLA 19 + 20
├── references/
│   ├── pre-flight.md                 ← lectura de los 11 master prompts en contexto orquestador
│   ├── jerarquia-canonica.md         ← directiva > operacional > master prompt (de DM v2.12)
│   ├── catalogo-arquetipos.md        ← 39 arquetipos canonizados (extraídos de runs)
│   ├── 2-estilos-canonicos.md        ← mgv_compendio_metodologico vs diesel_secuencia_encadenada
│   ├── gates-humanos.md              ← gate upfront catálogo + gate final Instructor Selection
│   ├── checks-pm-2-11.md             ← cómo verificar PASS de los 16 checks de PM-2.11 v2.6.3
│   └── troubleshooting.md            ← anti-patrones aplicables a Fase 2
└── evals/
    └── evals.json                    ← test cases con ground truth contra MGV-G1 + DIESEL-G1
```

**Pasos concretos en orden:**

1. Crear directorio `.claude/skills/fpi-sena-fase2/` con subdirectorios `references/` y `evals/`
2. Escribir `SKILL.md` con:
   - Pre-flight obligatorio (REGLA 19 + REGLA 20)
   - Identidad: orquestador para Fase 2
   - Lista de los 11 master prompts a leer en pre-flight
   - Lista de runs operacionales a inspeccionar (DIESEL × 3, MGV × 2 maduros, IMARPOR-CC, INGBAS4, INGBAS1-AGRO)
   - Jerarquía canónica resumida
   - Decisión Opción A (referencia DM v2.12)
3. Escribir los 6 archivos en `references/` con contenido derivado de PLAN-FASE-2-ARQUITECTURA.md v1.3
4. NO crear los subagentes todavía — eso es Semana 2

**Output esperado al final:** skill `fpi-sena-fase2` con esqueleto + referencias completas, lista para que Semana 2 implemente subagentes mecánicos sobre ella.

---

## 4. REFERENCIAS RÁPIDAS (paths absolutos)

### Plan arquitectónico
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PLAN-FASE-2-ARQUITECTURA.md` (v1.3 · 705+ líneas · documento autoritativo)

### Master prompts canon
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md` (v2.12 · §11 historial)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PM-2.0 — RAP Session Architect.md` (v2.6)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PM-2.1 — The Spark — Reflexión Inicial.md` (v3.0)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PM-2.2 — Gap Analysis — Contextualización.md` (v3.0)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PM-2.3 a PM-2.10 ... .md` (v2.0)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` (v2.6.3 · 16 checks · Check 13 = CHECK 9)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/Activity Card — Schema.md` (v2.7)
- `/Users/Beppo/Projects/fpi-sena-factory/master-prompts/GFPI-F-134 — Data Contract.md`

### Skill actual (Fase 1)
- `/Users/Beppo/Projects/fpi-sena-factory/.claude/skills/fpi-sena-fase1/SKILL.md`
- `/Users/Beppo/Projects/fpi-sena-factory/.claude/skills/fpi-sena-fase1/references/pre-flight.md`
- `/Users/Beppo/Projects/fpi-sena-factory/.claude/skills/fpi-sena-fase1/references/troubleshooting.md`

### Skill nueva (Fase 2 · A CREAR)
- `/Users/Beppo/Projects/fpi-sena-factory/.claude/skills/fpi-sena-fase2/` (NO existe todavía · crear mañana en Instrucción 3)

### Runs operacionales canónicos (refs operacionales)
- `/Users/Beppo/Projects/fpi-sena-factory/runs/MGV-2026-04-20/` (ref operacional `mgv_compendio_metodologico` · más maduro · llega hasta PM-3.6)
- `/Users/Beppo/Projects/fpi-sena-factory/runs/DIESEL-2026-04-19/` (ref operacional `diesel_secuencia_encadenada` · más reciente de los 3 DIESEL)
- `/Users/Beppo/Projects/fpi-sena-factory/runs/IMARPOR-CC-2026-04-27/` (single-guía absorpción · target test E2E Semana 5)
- `/Users/Beppo/Projects/fpi-sena-factory/runs/INGBAS4-2026/` y `/Users/Beppo/Projects/fpi-sena-factory/runs/INGBAS1-AGRO-2026/` (Nellis · esperando enriched=true)

---

## 5. ANTI-PATRONES A RECORDAR (para no repetir errores 2026-04-28)

| Anti-patrón | Caso histórico | Mitigación |
|---|---|---|
| **Falsa invención** | Llamé "invención" a archetype_mode, bloom_ceiling, integration_all_archetypes_policy · existían en DIESEL/MGV | REGLA 20 — verificación antes de negar (5 vectores grep) |
| **Discrepancia inventada** | §11 v1.1 del plan formuló "discrepancia DIESEL vs canon" cuando era jerarquía canónica no reconocida | Buscar directiva del instructor en pm-2-11.json del run más maduro antes de declarar discrepancia |
| **Sub-investigación** | Auditoría v1.1 sub-investigó · solo leí PM-2.1/PM-2.2 master prompts · no busqué en DIESEL completo | Cuando Sergio diga "REVISA X" o "BUSCA EN Y", usar el subagente Explore exhaustivamente · no solo lectura superficial |
| **Versión obsoleta en memoria** | Trabajé con PM-2.11 mental v2.0 (4 checks) cuando vigente es v2.6.3 (16 checks) | Verificar `version:` en frontmatter de cada master prompt antes de afirmar qué hace |
| **Dependencia invertida** | Afirmé PM-2.5 → PM-2.3 cuando real es PM-2.3 → PM-2.5 (PM-2.5 master prompt línea 41 lo declara) | Inspeccionar campo `inputs` o `depends_on` en cada master prompt antes de afirmar dependencias |
| **Conservadurismo de timing inadecuado** | Recomendé "esperar 2-3 semanas Nellis" cuando Sergio ya tiene semanas de runs reales DIESEL/MGV | Calibrar urgencia según historial real del proyecto · no según supuestos genéricos |

---

## 6. ESTADO EMOCIONAL Y CONTEXTUAL DEL PROYECTO

Sergio dijo el 2026-04-28: *"si todo sale bien, vamos a hacer algo histórico"*. No es exageración — el sistema FPI SENA + bilingüismo + ESP sectorial + matriz GFPI-F-134 + automatización canónica con disciplina externa NO existe en otro lado del mundo a esta escala.

Si Fase 2 funciona, Fase 3 (Playbook + Workbook + Final Mission) es el siguiente paso del mismo orquestador. El sistema completo procesaría un programa SENA nuevo en horas, no semanas.

**Mantener foco · disciplina · humildad cuando Sergio redirija (lo va a hacer · siempre con razón).**

---

## 7. PROTOCOLO DE ARRANQUE DE LA SESIÓN (mañana)

```
1. Claude lee este documento completo (sin tools · solo lectura comprensiva)
2. Claude confirma a Sergio: "Listo, leí el kickoff. ¿Arranco Instrucción 1 (pre-flight)?"
3. Sergio confirma o redirige
4. Claude ejecuta Instrucción 1 → 2 → 3 en orden
5. Si surge una bifurcación, Claude PRESENTA el plan ANTES de ejecutar (REGLA 19)
```

**NO arrancar a generar código antes del pre-flight. NO afirmar que algo "es invención" sin REGLA 20.**

---

*Documento generado por Claude (skill fpi-sena-fase1) · sesión 2026-04-28 · 6 horas de trabajo arquitectónico · 4 archivos canónicos actualizados · 1 decisión RESUELTA · 1 plan revisado · 1 regla nueva (REGLA 20) propuesta para implementación mañana.*
