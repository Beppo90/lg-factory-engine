# Gates Humanos en Fase 2 — Protocolo Operacional

Fase 2 tiene **2 gates humanos obligatorios** donde el orquestador se detiene esperando decisión del instructor. Sin estas decisiones, el flujo NO continúa · Fase 3 NO se autoriza.

---

## Gate Humano 1 — Selección de Arquetipos (upfront)

### Cuándo se activa

**Después de:** PM-2.0 generó `pm-2-0.json` (Session Blueprint) + `pm-2-0-arquetipos-catalogo.{md,json}` (catálogo presentado al instructor).

**Antes de:** lanzar cualquier subagente PM-2.1 a PM-2.10 (creativos).

### Qué se le presenta al instructor

El catálogo de arquetipos disponibles por PM creativo (extraído de master prompts):

| PM | Cantidad de arquetipos disponibles | Tipos |
|---|---|---|
| PM-2.1 | 1 (DEFAULT) o 4 (EXTENSIBLE · v3.0 canonizada) | A Visual · B Story · C News · D Debate (modo extensible) |
| PM-2.2 | 1 (DEFAULT) o 4 (EXTENSIBLE · v3.0 canonizada) | A KWL · B Diagnosis visual · C Gap card · D Peer interview (modo extensible) |
| PM-2.3 | 6 (A-F) | TBLT, comprehension strategies, jigsaw, etc. (ver `references/catalogo-arquetipos.md`) |
| PM-2.4 | 5 (A-E) | Genre analysis, modeled writing, peer review, etc. |
| PM-2.5 | 5 (A-E) | Phonics, vocabulary development, reading fluency, writing scaffolding, etc. |
| PM-2.6 | 6 (A-F) | Micro-skills, phase-based, TBLT listening, etc. |
| PM-2.8 | 5 (A-E) | Input+Model, Rehearsal, Live Performance, etc. |
| PM-2.9 | 5 (A-E) | Function map, drills, integrated simulation, etc. |
| PM-2.10 | 5 (A-E) | Inductive discovery, error log, grammar stations, etc. |

### Qué espera del instructor

Para CADA PM creativo, el instructor declara en `runs/[RUN-ID]/arquetipos-elegidos.json`:

1. **Estilo:** `diesel_secuencia_encadenada` o `mgv_compendio_metodologico` (ver `references/2-estilos-canonicos.md`)
2. **Arquetipos seleccionados:** lista de IDs (puede ser 1, varios o TODOS)
3. **Rationale:** justificación pedagógica breve (1-2 líneas)
4. **Si estilo DIESEL:** declarar `archetype_mode` (descripción del modo de secuencia encadenada · ej. "secuencia encadenada — 4 momentos en S1")
5. **Si estilo MGV:** declarar `bloom_ceiling` (techo cognitivo · ej. "L3 Apply máximo — A1.1")

### Schema esperado de `arquetipos-elegidos.json`

```json
{
  "run_id": "...",
  "fecha_seleccion": "YYYY-MM-DD",
  "instructor": "Sergio Cortés Perdomo",
  "directiva_canonica_aplicada": "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor (MGV pm-2-11.json:574)",
  "elecciones": [
    {
      "pm": "PM-2.1",
      "estilo": "...",
      "...": "...",
      "rationale": "..."
    },
    // 1 entrada por cada PM creativo (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10)
  ]
}
```

### Validación del orquestador

Antes de continuar, el orquestador verifica:

- [ ] Existe el archivo `runs/[RUN-ID]/arquetipos-elegidos.json`
- [ ] Tiene 9 elecciones (una por PM creativo)
- [ ] Cada elección tiene `estilo` válido (uno de los 2 canónicos)
- [ ] Cada elección tiene `rationale` no-vacío
- [ ] Si estilo DIESEL: `archetype_mode` presente
- [ ] Si estilo MGV: `integration_all_archetypes_policy.bloom_ceiling*` presente
- [ ] Los IDs de arquetipos seleccionados existen en el catálogo del PM correspondiente

Si falta cualquiera: NO lanzar subagentes · pedir al instructor que complete.

### Razón arquitectónica del gate

Per master prompt PM-2.0 §227-229:

> La selección de arquetipos es una **decisión pedagógica crítica** que requiere contexto humano (perfil del aprendiz, sector, momento del programa, fortalezas del instructor). Delegarla al modelo LLM post-generación produce falsos matches y fuerza iteraciones costosas. Seleccionar upfront elimina el retrabajo.

> *Lección aprendida MGV-2026-04-20: instructor eligió los arquetipos antes de generar pm-2-1.json..pm-2-10.json. Resultado: 0 iteraciones, 0 retrabajos, catálogo completado en una pasada.*

---

## Gate Humano 2 — Instructor Selection Lote (final)

### Cuándo se activa

**Después de:** los 7 subagentes creativos (PM-2.1 + PM-2.2 + PM-2.3 + PM-2.4 + PM-2.6 + PM-2.8 + PM-2.9 + PM-2.10) generaron sus Activity Cards con `enriched: false`.

**Después de:** PM-2.11 ensambló GFPI-F-134 + ejecutó los 16 checks reportando PASS 16/16.

**Antes de:** autorizar Fase 3 (Playbook PM-3.1 + PM-3.2).

### Qué se le presenta al instructor

Reporte consolidado:

```
runs/[RUN-ID]/
  pm-2-validation-report.json     ← reporte 16 checks PASS/FAIL del PM-2.11
  g1/
    pm-2-1.json   (enriched: false)  ← gate
    pm-2-2.json   (enriched: false)  ← gate
    pm-2-3.json   (enriched: false)  ← gate
    pm-2-4.json   (enriched: false)  ← gate
    pm-2-5.json   (enriched: false)  ← gate
    pm-2-6.json   (enriched: false)  ← gate
    pm-2-8.json   (enriched: false)  ← gate
    pm-2-9.json   (enriched: false)  ← gate
    pm-2-10.json  (enriched: false)  ← gate
    pm-2-11.json  (validated · 16/16 PASS)
  g2/ ... (idem para guías adicionales)
```

### Qué espera del instructor

Revisar las 9 Activity Cards de cada guía y aprobar el lote completo. La aprobación se materializa cambiando `enriched: false` → `enriched: true` en cada Activity Card creativa.

**Criterios típicos de revisión** (no exhaustivo):

- ¿La narrativa de las Activity Cards usa el universo correcto de la guía? (no copia-fantasma de otra guía)
- ¿Los textos auténticos de PM-2.3 y PM-2.6 corresponden a las stories asignadas en PM-1.2?
- ¿El vocabulario de PM-2.5 es el del Toolbelt de PM-1.2 (20 términos)?
- ¿La gramática de PM-2.10 + PM-2.4 sigue el silabus 17 del pm-0-context?
- ¿La curva L1% por sesión respeta lo declarado en pm-0-context.l1_policy_per_guide?
- ¿Las funciones comunicativas de PM-2.9 corresponden al CEFR target?

### Validación del orquestador

Antes de autorizar Fase 3:

- [ ] Las 9 Activity Cards creativas tienen `enriched: true` para CADA guía del run
- [ ] PM-2.11 reportó PASS 16/16 (incluyendo Check 13 = CHECK 9 anti-copia-fantasma)
- [ ] No hay archivos pm-2-X.json byte-idénticos entre guías (verificación SHA hash)
- [ ] Reporte consolidado generado y aprobado

Si algún Activity Card sigue en `enriched: false`: NO autorizar Fase 3 · pedir al instructor que complete revisión.

### Razón arquitectónica del gate

La generación de Activity Cards involucra creatividad pedagógica (textos auténticos, diálogos, tareas integradoras) que requiere juicio humano para validar:

- Coherencia narrativa con el universo de la guía
- Calidad lingüística adecuada al CEFR target
- Alineación con los criterios SOFÍA de evaluación
- Ausencia de inventos o "copia-fantasma" entre guías

Sin este gate, los errores de Fase 2 contaminan TODO lo subsiguiente (Playbook PM-3.1/3.2 + Workbook PM-3.4 + Final Mission PM-3.5).

---

## Anti-patrones de gates humanos

### Anti-patrón 1 — Saltarse el gate por urgencia

**NO hacer:** "el instructor está apurado · genero las 9 Activity Cards y le presento todo junto sin esperar selección de arquetipos previa".

**Por qué:** sin selección upfront del instructor, el LLM hace falsos matches de arquetipos · luego hay que regenerar todo. Costo MGV-2026-04-20 sin upfront: ~1 día de retrabajo por guía. Costo MGV con upfront: 0 iteraciones.

### Anti-patrón 2 — Aprobar lote sin revisión real

**NO hacer:** instructor dice "aprobado" sin haber abierto las Activity Cards. Orquestador marca `enriched: true` en lote sin verificación.

**Por qué:** sin revisión, errores de copia-fantasma y desajustes de universo se propagan a Fase 3. Costo de detección tardía: regenerar guía completa.

### Anti-patrón 3 — Marcar enriched: true cuando algún check de PM-2.11 falló

**NO hacer:** Check 13 (anti-copia-fantasma) reporta FAIL · orquestador igual procede.

**Por qué:** Check 13 FAIL = bug copia-fantasma activo · alguna pm-2-X.json es byte-idéntica a la de otra guía (excepto run_id). Si se procede, el bug DIESEL G3-G5 se repite. Esperar regeneración del subagente afectado · NO autorizar Fase 3 hasta PASS 16/16.
