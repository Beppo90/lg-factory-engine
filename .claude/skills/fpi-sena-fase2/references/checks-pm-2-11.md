# Los 16 Checks de PM-2.11 v2.6.3 — Validación de Fase 2

PM-2.11 v2.6.3 (last_verified 2026-04-20) ejecuta **16 checks** que validan la coherencia de la fila GFPI-F-134 ensamblada. El orquestador NO re-implementa estos checks · solo VERIFICA que PM-2.11 reportó PASS 16/16.

**Ubicación canónica:** `master-prompts/PM-2.11 — GFPI-F-134 Row Assembler.md` líneas 623-984.

---

## Tabla de los 16 checks

| # | Nombre | Línea master prompt | Foco |
|---|---|---|---|
| **1** | Horas Directas = 48 | 623 | Suma total de horas directas del run = 48 |
| **2** | Horas Autónomas = 12 | 629 | Suma total de horas autónomas del run = 12 |
| **3** | Total de Evidencias = 6 | 635 | 6 evidencias formales (Reading + Writing + Listening + Speaking + Language Functions + Cuestionario S6) |
| **4** | Numeración de Evidencias | 641 | Las 6 evidencias están numeradas E1-E5 + E6 correctamente |
| **5** | Cuestionario S6 = 25 Puntos | 647 | E6 vale 25 puntos (5 skills × 5 pts) |
| **6** | Cuestionario S6 = 25 Ítems | 653 | E6 tiene 25 ítems (5 por skill) |
| **7** | Tipificación de Actividades | 659 | Cada actividad tiene `type` válido (cognitiva · procedimental · actitudinal) |
| **8** | V+O+C en Actividades | 666 | Cada `statement` sigue patrón "Verbo infinitivo + Objeto + Condición" |
| **9** | Longitud de Actividades | 673 | Cada `statement` tiene longitud apropiada (no demasiado corto ni largo) |
| **10** | Sin Evidencias en Transferencia | 680 | S7-S8 (Transferencia + Misión Final) NO tienen evidencias formales |
| **11** | Estrategias Válidas | 687 | `didactic_strategy` de cada actividad pertenece al catálogo canónico |
| **12** | Ambientes Válidos | 696 | `environment.type` y `materials` pertenecen a catálogos válidos |
| **13** | **Uniqueness of Pedagogical Content Universe** | 703 | **= CHECK 9 del DOCUMENTO MAESTRO §10 · anti-copia-fantasma · SHA byte-comparison entre runs y entre guías del mismo run** |
| **14** | Propagación de Estrategias Didácticas a pm-3-2-sX.json | 758 | (v2.5) cada Activity Card propaga su estrategia al Playbook |
| **15** | Coherencia de `activity_footer` con Upstream | 815 | (v2.6.1) footer de cada actividad coincide con datos upstream |
| **16** | Activity Card Schema v2.6.3 en `pm-3-6.json` | 874 | (v2.6.3) Activity Cards conformes al schema actualizado |

---

## Check 13 detallado (= CHECK 9 anti-copia-fantasma del DM)

Este es el check más crítico para Fase 2. Su FAIL = bug DIESEL G3-G5 activo.

### Qué valida

Para cada Activity Card creativa (PM-2.1 a PM-2.10), Check 13 verifica que **NO sea byte-idéntica** a la Activity Card del mismo PM en otra guía del mismo run, ni a la de runs anteriores.

### Cómo funciona (algoritmo)

1. Calcula SHA-256 de cada `pm-2-X.json` excluyendo el campo `run_id`
2. Compara contra hashes de:
   - Otras guías del mismo run (g2.pm-2-X.json vs g1.pm-2-X.json)
   - Mismas guías de runs anteriores (NEW.g1.pm-2-X.json vs MGV-2026-04-20.g1.pm-2-X.json)
3. Si encuentra coincidencia byte-idéntica: FAIL · log: "PM-2.X g{N} es copia-fantasma de PM-2.X g{M}"

### Por qué es crítico

El bug DIESEL G3-G5 (documentado en DM v2.3) fue exactamente esto: pm-2-3, pm-2-5, pm-2-6 byte-idénticos entre G3, G4 y G5 del mismo run. Resultado: 3 guías con contenido pedagógico cruzado · vocabulario incorrecto · personajes equivocados. Fue detectado post-generación · costó días de regeneración.

Check 13 lo previene **automáticamente**. Si FAIL: NO autorizar Fase 3 · regenerar el subagente PM-2.X afectado desde el universo correcto.

---

## Cómo el orquestador verifica los 16 checks

```python
# Pseudocódigo
import json

with open('runs/[RUN-ID]/pm-2-validation-report.json') as f:
    report = json.load(f)

checks_status = report['checks']
all_pass = all(c['status'] == 'PASS' for c in checks_status)

if all_pass:
    # 16/16 PASS · puede proceder a gate humano 2 (Instructor Selection lote)
    print("PM-2.11 reporta PASS 16/16 · puede proceder")
else:
    failed = [c for c in checks_status if c['status'] == 'FAIL']
    for c in failed:
        print(f"FAIL Check {c['number']}: {c['name']} — {c['detail']}")
    # NO autorizar Fase 3 · pedir regeneración
```

---

## Schema esperado de `pm-2-validation-report.json`

```json
{
  "pm_assembler_version": "v2.6.3",
  "run_id": "...",
  "validation_date": "YYYY-MM-DD",
  "checks": [
    {
      "number": 1,
      "name": "Horas Directas = 48",
      "status": "PASS",
      "detail": "48.0 directa = 48 esperada"
    },
    // ... 15 checks más
    {
      "number": 13,
      "name": "Uniqueness of Pedagogical Content Universe",
      "status": "PASS",
      "detail": "0 coincidencias byte-idénticas detectadas en N comparaciones cross-guía + cross-run"
    },
    // ...
  ],
  "veredicto": "PASS 16/16",
  "ready_for_phase_3": true
}
```

---

## Acción del orquestador según veredicto

| Veredicto | Acción |
|---|---|
| **PASS 16/16** | Marcar Fase 2 como `validated` · presentar reporte al instructor · esperar gate humano 2 (Instructor Selection lote · `enriched: true` en cada Activity Card creativa) |
| **PASS N/16** (algún FAIL) | NO autorizar Fase 3 · identificar qué subagente debe regenerar · explicar el FAIL al instructor con detalle |
| **Check 13 FAIL** | Crítico — bug copia-fantasma activo · regenerar inmediatamente el subagente PM-2.X afectado desde el universo correcto · re-ejecutar PM-2.11 |
| **Check 1 o 2 FAIL** (horas) | El subagente PM-2.X afectado está reportando duración incorrecta · revisar y regenerar |
| **Check 8 FAIL** (V+O+C) | Algún `statement` no sigue patrón "Verbo infinitivo + Objeto + Condición" · regenerar el subagente que produjo ese statement |
| **Check 11 FAIL** (estrategias) | Una actividad usa estrategia fuera del catálogo · validar contra `master-prompts/Activity Card — Schema.md` |

---

## Anti-patrón: re-implementar checks en el orquestador

**NO hacer:** "el orquestador implementa SHA byte-comparison directamente" o "el orquestador valida horas directas sumando manualmente".

**Por qué:** PM-2.11 v2.6.3 ya canoniza estos 16 checks. Re-implementar es duplicación que se desincroniza cuando PM-2.11 se actualiza a v2.6.4.

**Lo correcto:** orquestador VERIFICA que `pm-2-validation-report.json` existe + lee `veredicto` + lee `checks[]` + actúa según los resultados. La lógica de validación vive en PM-2.11.

---

## Referencia rápida para Sergio

Cuando reportes a Sergio el cierre de Fase 2 de un run, abre con:

```
## PM-2.11 v2.6.3 — Validación Fase 2

Run: [RUN-ID]
Veredicto: PASS 16/16 (o PASS N/16 si algún FAIL)
Check 13 (anti-copia-fantasma): PASS / FAIL detalle
Ready for Phase 3: true / false

Detalle por check:
1. Horas Directas = 48 → PASS (48.0)
2. Horas Autónomas = 12 → PASS (12.0)
3. Total de Evidencias = 6 → PASS
... (los 16)
```
