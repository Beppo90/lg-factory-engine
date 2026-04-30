---
title: FLUJO OPERATIVO — Fase 1 — De Cero a PM-1.2
version: 1.0
last_updated: 2026-04-26
status: Documento operativo de referencia — alineado a DM v2.10 + PM-1.1 v2.7 + Schemas v4.1
audience: Instructor curricular FPI SENA
---

# FLUJO OPERATIVO — FASE 1: DE CERO A PM-1.2

> **Propósito.** Esta es la guía paso-a-paso que el instructor sigue desde que recibe el diseño curricular SOFÍA Plus de un programa nuevo, hasta que tiene generados y validados todos los `pm-1-2.json` (uno por bloque). Es la columna vertebral de la Fase 1 del pipeline LG Factory v2.6.

---

## Vista de pájaro — Las 6 sub-fases

```
FASE 0   →  FASE 1A  →  FASE 1B  →  FASE 1C   →  FASE 1D  →  FASE 1E  →  FASE 1F
Setup       Form fill   Validate    Run PM-1.1   Validate    Run PM-1.2  Validate
programa    N+1 veces   pre-prompt  1 vez        post        N veces     final
                                    (LLM)        (LLM)
```

| Sub-fase | Quién | Cuántas veces | Tiempo aprox. |
|----------|-------|---------------|---------------|
| Fase 0 — Setup | Instructor solo | 1 por programa | 30 min |
| Fase 1A — Formulario | Instructor en Claude Design | 1 (Sección A) + N (Sección B) | 20 min + 18 min × N |
| Fase 1B — Validar inputs | Instructor en terminal | 1 + N | ~10 seg c/u |
| Fase 1C — Activar PM-1.1 | Instructor + Claude | 1 por programa | 15 min |
| Fase 1D — Validar PM-1.1 | Instructor en terminal | 1 | ~10 seg |
| Fase 1E — Activar PM-1.2 | Instructor + Claude | N (uno por bloque) | 25 min × N |
| Fase 1F — Validación final | Instructor en terminal | 1 | ~30 seg |

**Tiempo total estimado para Tecnológico de 6 guías: ~5h 30min**

---

## FASE 0 — Reunir el diseño curricular SOFÍA Plus

**Quién:** Instructor solo
**Cuándo:** Una sola vez por programa
**Output:** decisiones tomadas + paquete de información lista para diligenciar

### Qué necesitas tener a mano antes de tocar el formulario

- [ ] PDF del diseño curricular oficial del programa
- [ ] Código y nombre del programa (ej. `522309 — Desarrollo de Medios Gráficos Visuales`)
- [ ] **Tipo del programa:** Técnico / Tecnológico / Curso Especial
- [ ] **Duración total en horas** (ej. 360h)
- [ ] **Listado completo de RAPs** con sus códigos (ej. `RAP 01 → 220301011`, `RAP 02 → ...`)
- [ ] Para cada RAP: enunciado completo + conocimientos de proceso + conocimientos de saber + criterios de evaluación
- [ ] Sector económico y ambiente productivo del oficio

### Decisión clave a tomar antes de empezar

**¿Cuál va a ser el `total_guias` del programa?**

El default canónico es **1 RAP = 1 guía** (alineación implícita). Si tu programa tiene 6 RAPs, decide si vas con 6 guías o si quieres otro número (p.ej. agrupar 2 RAPs en una guía → 3 guías totales).

**Validación blanda a 48h:** si `duracion_total_horas / total_guias < 48`, el sistema te avisa con un warning amarillo pero te deja continuar. Útil para micro-guías de refuerzo o módulos cortos.

### Decisión secundaria — variante Curso Especial

Si `tipo = Curso Especial` AND `total_guias = 1` → el pipeline activa una variante donde se **omite el "proyecto formativo articulador"** (no hay arco entre guías porque solo hay una) y la **Misión Final pasa a ser la entrega completa del curso**.

---

## FASE 1A — Diligenciar el formulario LG Factory

**Quién:** Instructor en Claude Design (artifact React del formulario)
**Cuándo:** N + 1 veces (1 vez Sección A + N veces Sección B)
**Output:** `pm-0-context.json` + N `pm-1-1-input.json`

### Paso 1A.1 — Llenar la Sección A (Programa) — UNA vez

Diligenciar:

| Sub-sección | Contenido | Obligatorio |
|---|---|---|
| **A1 Identificación** | programa_id, nombre, código SOFÍA, **tipo**, duracion_total_horas, numero_sesiones_competencia | ✓ |
| **A2 CEFR + Estructura** | rango_cefr, numero_guias, progresion_cefr_decision, **total_guias** *(observar el badge `horas_por_bloque` en vivo)* | ✓ |
| **A3 Universo Narrativo** | empresa ficticia, sector, escenario, 3 personajes, productos típicos, terminología | OPCIONAL — si vacío, PM-1.1 lo autogenera |
| **A4 Grupo Gramatical 17** | Plantilla precargada (DIESEL/MGV/MARÍTIMO/ADSO) o personalizado | OPCIONAL |
| **A5 Principios pedagógicos PM-0 §5** | Checklist de los 13 principios con tooltip | OPCIONAL — si vacío, sistema aplica todos |

**Output:** `pm-0-context.json` (descargar)
**Guardar en:** `runs/[RUN-ID]/pm-0-context.json`

### Paso 1A.2 — Llenar la Sección B (Guía) — N veces

Para cada guía del programa (1 a N), diligenciar:

| Sub-sección | Contenido |
|---|---|
| **B1 Modo de información** | MODO 1 (diseño curricular SOFÍA) o MODO 2 (información externa del instructor) |
| **B2 (si MODO 1)** | diseño_curricular, nombre_proyecto_formativo, fase, contexto_adicional, codigo_competencia, nombre_competencia, codigo_rap, nombre_rap, conocimientos_de_proceso[], conocimientos_de_saber[], criterios_de_evaluacion[] |
| **B3 (si MODO 2)** | proyecto formativo (opcional), temas_tecnicos[], objetivos_aprendizaje_evaluar[], criterios_de_evaluacion[] |
| **C Aprobaciones** | aprobado_por_instructor, fecha_aprobacion, observaciones (opcional) |

**Output por iteración:** `pm-1-1-input.json` (descargar)
**Guardar en:** `runs/[RUN-ID]/g[N]/pm-1-1-input.json` (g1, g2, ..., gN)

> **Tip operativo:** la Sección A se rellena una sola vez y queda fija. La Sección B se llena N veces — el formulario tiene un botón "Limpiar" para volver a llenar Sección B + C sin perder Sección A.

> **Consideración Curso Especial:** si `tipo = Curso Especial`, el formulario oculta automáticamente los campos de proyecto formativo. Si además `total_guias = 1`, aparece un banner verde indicando que se activa la variante de pipeline single-guía.

---

## FASE 1B — Validación pre-prompt

**Quién:** Instructor desde la terminal
**Cuándo:** Después de tener `pm-0-context.json` + todos los `pm-1-1-input.json`
**Propósito:** atrapar errores ANTES de gastar la corrida del LLM

```bash
# Validar Sección A + Sección B para cada guía
bash v4/scripts/validate-pm-1-1.sh [RUN-ID] G1
bash v4/scripts/validate-pm-1-1.sh [RUN-ID] G2
# ... una por guía

# Ejemplo concreto:
bash v4/scripts/validate-pm-1-1.sh MGV-2026-04-26 G1
```

### Cómo interpretar el output

| Color | Significado | Acción |
|---|---|---|
| ✓ verde | Todo válido | Avanzar a Fase 1C |
| ⚠ amarillo | Válido lo que existe, faltan archivos por generar | Estado esperado en este punto (pm-1-1.json final aún no existe) — continuar |
| ✗ rojo | Error específico de campo | Volver al formulario, corregir, re-exportar, re-validar |

> **Regla dura:** No avanzar a Fase 1C hasta que toda la Fase 1B esté en verde/amarillo (sin rojos).

---

## FASE 1C — Activación manual del prompt PM-1.1

**Quién:** Instructor + Claude (claude.ai o API)
**Cuándo:** UNA sola vez por programa
**Output:** `pm-1-1.json` consolidado con N bloques

### Paso 1C.1 — Abrir conversación con Claude

Abrir claude.ai (o usar la API).

### Paso 1C.2 — Pegar el master prompt PM-1.1

Copiar el contenido de la sección **"PROMPT PARA IA"** de:

`master-prompts/PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md`

### Paso 1C.3 — Adjuntar los JSONs

- `pm-0-context.json` (contexto del programa)
- TODOS los `pm-1-1-input.json` (uno por guía)

### Paso 1C.4 — Claude genera el `pm-1-1.json` consolidado

Claude ejecuta las 6 Reglas de PM-1.1 v2.7 y produce el output final con:

- `pm0_anchors_ref`
- `tipo`, `total_guias`, `duracion_total_horas`, `horas_por_bloque`
- `horas_por_bloque_warning` (si aplica)
- Array `bloques[]` con N elementos (12 atributos cada uno)
- `proyecto_formativo_articulador` (omitido si Curso Especial + total_guias=1)

### Paso 1C.5 — Guardar el output

Guardar la respuesta de Claude como:

`runs/[RUN-ID]/pm-1-1.json` *(legacy: program-level)*

o equivalentemente, una copia en cada `runs/[RUN-ID]/g[N]/pm-1-1.json` (decisión organizacional tuya).

---

## FASE 1D — Validación post-prompt

**Quién:** Instructor desde terminal
**Cuándo:** Inmediatamente después de guardar `pm-1-1.json`
**Propósito:** atrapar inconsistencias del LLM antes de propagar el error

```bash
bash v4/scripts/validate-pm-1-1.sh [RUN-ID]
```

Esto valida `pm-0-context.json` y `pm-1-1.json` contra los schemas v4.1. Captura errores típicos: olvidar `horas_por_bloque`, generar número incorrecto de bloques, no marcar la variante Curso Especial, generar `proyecto_formativo_articulador` cuando debería ser null, etc.

**Si hay errores:**
- Re-correr el prompt PM-1.1 indicándole específicamente qué corregir, o
- Editar manualmente el JSON si el error es trivial

> **Regla dura:** No avanzar a Fase 1E hasta que esto esté ✓ verde.

---

## FASE 1E — Activación manual de PM-1.2 (UNA vez por bloque)

**Quién:** Instructor + Claude
**Cuándo:** N veces, una por cada bloque del `pm-1-1.json`
**Output por iteración:** `pm-1-2.json` con 4 bloques canónicos + 3 fichas curadas + decisión humana de stories

> **Aquí entra la decisión humana más crítica del pipeline.** PM-1.2 cura material auténtico del que vivirá toda la guía. Las stories elegidas determinan vocabulario, gramática, personajes, escenarios y funciones comunicativas que se propagan a PM-2.x, PM-3.x y PM-4.x. Si las stories están mal elegidas, todo lo subsiguiente arrastra el error.

### Paso 1E.1 — Para cada bloque, abrir conversación nueva

Para `bloque[1]`, `bloque[2]`, ..., `bloque[N]`.

### Paso 1E.2 — Pegar el master prompt PM-1.2

Copiar el contenido de la sección **"PROMPT PARA IA"** de:

`master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md`

### Paso 1E.3 — Adjuntar los inputs

- `pm-0-context.json` (capa fundacional)
- `pm-1-1.json` (mapa completo del programa)
- Identificar explícitamente qué bloque desarrollar: *"Desarrolla el Bloque #N — [nombre_esp]"*
- Si tienes material auténtico propio para curar (Vía 2 o Vía 3 del modelo híbrido), adjuntar URLs o textos

### Paso 1E.4 — Claude genera el output con 4 bloques canónicos

Claude produce:

| Bloque | Contenido |
|---|---|
| **Bloque 0** Presentación L1 | Texto motivacional en español, 10 renglones, onboarding al universo narrativo |
| **Bloque A** Scope + Integrative Task + Evaluation Matrix | DNA, Content Core (20 vocab), Misión Final, matriz 55pts |
| **Bloque B** GFPI-F-134 columnas 1-5 | Competencia, RAP, Saberes Conceptos, Saberes Proceso, Criterios |
| **Bloque C** 3 fichas curadas + universo | 3 fichas con análisis lingüístico-comunicativo + universo narrativo de la guía |

### Paso 1E.5 — Decisión del instructor sobre las 3 stories curadas

Aquí ENTRA tu intervención humana crítica:

1. **Revisar las 3 fichas de curación** una a una
2. **Verificar URLs reales** (que no sean alucinaciones del LLM)
3. **Validar contra los 8 filtros** de PM-1.2:
   - Autenticidad — publicación real con URL verificable
   - Recencia — máximo 3 años
   - Relevancia ESP — conectada al macrotema y entorno ocupacional
   - Accesibilidad lingüística — contiene estructuras A1-A2 target
   - Riqueza de vocabulario técnico — al menos 15 de los 20 términos
   - Gancho motivacional — interesante para aprendiz colombiano 18-22 años
   - Diversidad de género — las 3 deben ser géneros distintos
   - Potencial visual — diagramas/fotos reutilizables
4. **Elegir 2 stories ganadoras y asignar roles:**
   - Story A → Reading anchor (PM-2.3)
   - Story B → Listening script (PM-2.6)
   - Story C → backup / extensión

### Paso 1E.6 — Marcar `enriched: true` (gate v4.0)

Esto es el **gate formal de autorización a Fase 2**. Hasta que `enriched: true` esté presente en `pm-1-2.json`, el pipeline no debe avanzar a PM-2.x. Esto formaliza tu aprobación humana.

### Paso 1E.7 — Guardar el output

Guardar la respuesta de Claude como:

`runs/[RUN-ID]/g[N]/pm-1-2.json`

---

## FASE 1F — Validación final de Fase 1

**Quién:** Instructor desde terminal
**Cuándo:** Después de generar todos los `pm-1-2.json`

```bash
cd v4 && node ajv-regression.js
```

Esto valida los 3 schemas de Fase 1 (PM-0, PM-1.1, PM-1.2) y corre los cross-file checks (CHECK 17 vocab coverage, etc.).

**Si todo verde:** Fase 1 cerrada. Listo para Fase 2 (PM-2.0 Session Architect).

---

## Resumen de artefactos generados al final de Fase 1

| Artefacto | Ubicación | Cantidad | Generado por | Validado contra |
|---|---|---|---|---|
| `pm-0-context.json` | `runs/[RUN-ID]/` | 1 | Formulario Sección A | `pm-0-context.schema.json` |
| `pm-1-1-input.json` | `runs/[RUN-ID]/g[N]/` | N (uno por guía) | Formulario Sección B | `pm-1-1-input.schema.json` |
| `pm-1-1.json` | `runs/[RUN-ID]/` | 1 | Claude ejecutando PM-1.1 | `pm-1-1.schema.json` v4.1 |
| `pm-1-2.json` | `runs/[RUN-ID]/g[N]/` | N (uno por bloque) | Claude ejecutando PM-1.2 | `pm-1-2.schema.json` v4.1 |

---

## Checkpoints críticos del flujo

Tres puntos donde NO avanzar hasta tener confirmación explícita:

1. **Fin de Fase 0** — instructor confirma `tipo` + `total_guias` + `horas_por_bloque`
   *(la lección DIESEL-2026-04-15 está cerrada estructuralmente desde v2.7, pero la confirmación explícita sigue siendo buena práctica)*

2. **Fin de Fase 1B** — validación verde de todos los `pm-1-1-input.json` antes de gastar la corrida del LLM

3. **Fin de Fase 1E (cada iteración)** — instructor elige las 2 stories y marca `enriched: true` antes de pasar al siguiente bloque

---

## Diagrama operativo completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 0                                        │
│  Diseño curricular SOFÍA Plus → decisiones (tipo, total_guias, horas/guía)  │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 1A                                       │
│  Formulario LG Factory (Claude Design)                                       │
│    ├─► Sección A diligenciada (1 vez)  ──► pm-0-context.json                │
│    └─► Sección B diligenciada (N veces) ──► pm-1-1-input.json (×N)         │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 1B — VALIDACIÓN PRE-PROMPT               │
│  bash v4/scripts/validate-pm-1-1.sh [RUN-ID] G[N]                           │
│  CHECKPOINT: rojos? → corregir y re-validar                                  │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 1C — RUN PM-1.1 (LLM)                    │
│  Claude ejecuta master prompt PM-1.1 v2.7                                    │
│  Inputs: pm-0-context.json + N × pm-1-1-input.json                          │
│  Output: pm-1-1.json (con N bloques + proyecto_formativo_articulador)       │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 1D — VALIDACIÓN POST-PROMPT              │
│  bash v4/scripts/validate-pm-1-1.sh [RUN-ID]                                │
│  CHECKPOINT: rojos? → re-correr PM-1.1 con feedback específico               │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FASE 1E — RUN PM-1.2 (LLM × N veces)                  │
│  Para cada bloque del pm-1-1.json:                                          │
│    1. Pegar master prompt PM-1.2                                            │
│    2. Adjuntar pm-0-context + pm-1-1 + identificar bloque                   │
│    3. Claude genera 4 bloques canónicos + 3 fichas curadas                  │
│    4. INSTRUCTOR elige 2 stories ganadoras (CRÍTICO)                        │
│    5. Marcar enriched: true (gate Fase 2)                                   │
│    6. Guardar pm-1-2.json en runs/[RUN-ID]/g[N]/                            │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                FASE 1F — VALIDACIÓN FINAL                    │
│  cd v4 && node ajv-regression.js                                            │
│  ✓ all green → Fase 1 cerrada, listo para Fase 2 (PM-2.0)                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tiempo total para un Tecnológico de 6 guías

| Sub-fase | Tiempo | Acumulado |
|---|---|---|
| Fase 0 | 30 min | 0:30 |
| Fase 1A | 20 min + 6 × 18 min | 2:38 |
| Fase 1B | ~1 min | 2:39 |
| Fase 1C | 15 min | 2:54 |
| Fase 1D | ~1 min | 2:55 |
| Fase 1E | 6 × 25 min | 5:25 |
| Fase 1F | ~1 min | 5:26 |

**Total Fase 1: ~5h 30min** para 6 guías. La parte más densa es 1E porque involucra revisión humana de las stories curadas, donde se decide la calidad del resto del pipeline.

---

## Documentos relacionados

- `master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md` — sistema completo (DM v2.10, §10 PASO 1 reescrito)
- `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md` — capa fundacional (13 principios + descriptores CEFR)
- `master-prompts/PM-1.1 — Ruta Macrotemática — 5-10 Bloques.md` — prompt v2.7
- `master-prompts/PM-1.2 — Scope & Sequence — Desarrollo por Bloque.md` — prompt
- `form-schema-pm0-pm11.json` — schema canónico del formulario (v2.7)
- `claude-design-prompt.md` — prompt para construir/actualizar el formulario en Claude Design (con DELTA v4.1)
- `v4/schemas/pm-0-context.schema.json` — contrato del output de Sección A
- `v4/schemas/pm-1-1-input.schema.json` — contrato del output de Sección B
- `v4/schemas/pm-1-1.schema.json` v4.1 — contrato del output final del prompt PM-1.1
- `v4/schemas/pm-1-2.schema.json` v4.1 — contrato del output del prompt PM-1.2
- `v4/scripts/validate-pm-1-1.sh` — wrapper de validación de Fase 1
- `v4/scripts/validate-fase1.js` — helper Node que hace la validación real
- `v4/ajv-regression.js` — validador regresivo completo

---

## Historial de versiones de este documento

### v1.0 — 2026-04-26
- Documento inicial publicado, alineado a:
  - DM v2.10 (formulario LG Factory + PM-1.1 v2.7 + PASO 1 reescrito)
  - PM-1.1 v2.7 (desacople tipo/total_guias, soft warning a 48h, variante Curso Especial)
  - Schemas v4.1 (pm-1-1, pm-1-2 actualizados; pm-1-1-input nuevo)
  - Wrapper script validate-pm-1-1.sh + helper validate-fase1.js

---

*FLUJO OPERATIVO — Fase 1 — De Cero a PM-1.2*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Abril 2026*
