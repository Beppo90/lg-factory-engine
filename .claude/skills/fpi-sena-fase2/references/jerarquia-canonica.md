# Jerarquía Canónica de Autoridad — Sistema FPI SENA

Este documento es la regla maestra del sistema cuando hay conflicto entre fuentes. Documentado formalmente en DM v2.12 §11 (decisión arquitectónica Sergio 2026-04-28).

---

## Los 3 niveles

```
NIVEL 1 — DIRECTIVA DEL INSTRUCTOR (autoridad MÁXIMA)
   ↓ sobrescribe cualquier conflicto con niveles 2 y 3
NIVEL 2 — IMPLEMENTACIÓN OPERACIONAL CANONIZADA (refleja la directiva)
   ↓ sobrescribe master prompts cuando contradicen niveles 1
NIVEL 3 — MASTER PROMPTS CANON (deben actualizarse cuando contradigan 1 o 2)
```

### Nivel 1 — Directiva del instructor

**Qué es:** lo que Sergio (instructor responsable) declara explícitamente como decisión arquitectónica. Capturado literalmente en runs maduros — no en mi memoria, no en interpretaciones.

**Ejemplos canónicos documentados:**

| Directiva | Ubicación canónica |
|---|---|
| "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor" | `runs/MGV-2026-04-20/pm-2-11.json:574` + `pm-2-9.json:825` |
| "LOS ARQUETIPOS DE ACTIVIDADES DE CADA UNA DE LAS PM2.X LOS QUIERO ELEGIR YO" | `runs/MGV-2026-04-20/pm-2-11.json:574` |
| "PM-2.11 debe respetar que las Activity Cards contienen los N arquetipos integrados como compendio metodológico, sin forzar la elección de uno solo" | `runs/MGV-2026-04-20/pm-2-9.json:825` |

**Cómo identificar una directiva:** primera persona del instructor + capturada literalmente en runs operacionales (no en master prompts antiguos · no en mi memoria).

### Nivel 2 — Implementación operacional canonizada

**Qué es:** runs maduros que llevan semanas en producción real reflejando la directiva del instructor. Son evidencia empírica de cómo se aplica la directiva en práctica.

**Refs operacionales canónicas vigentes (al 2026-04-28):**

| Run | Estilo aplicado | Madurez |
|---|---|---|
| `runs/MGV-2026-04-20/` | `mgv_compendio_metodologico` | Más maduro · llega hasta PM-3.6 |
| `runs/DIESEL-2026-04-15/` | `diesel_secuencia_encadenada` | Iteración inicial |
| `runs/DIESEL-2026-04-18/` | `diesel_secuencia_encadenada` | Iteración intermedia |
| `runs/DIESEL-2026-04-19/` | `diesel_secuencia_encadenada` | Iteración más reciente DIESEL |

**Nota crítica:** los 2 estilos (`mgv_compendio_metodologico` + `diesel_secuencia_encadenada`) son AMBOS canónicos. No hay un "correcto" y un "incorrecto" — son interpretaciones legítimas de la misma directiva. Ver `references/2-estilos-canonicos.md`.

### Nivel 3 — Master prompts canon

**Qué son:** los `master-prompts/PM-*.md`. Documentos teóricos del sistema. Autoritativos cuando coinciden con niveles 1-2.

**Cuándo se desactualizan:** cuando una directiva del instructor (nivel 1) llega DESPUÉS de que el master prompt fue escrito. Ejemplo histórico:

| Master prompt | Versión obsoleta | Versión canonizada | Razón del update |
|---|---|---|---|
| PM-2.1 | v2.0 ("DETONANTE ÚNICO") | **v3.0** (2 modos canonizados) | Directiva del instructor "Quiero todos los arquetipos para todos los PM" sobrescribió "ÚNICO" original |
| PM-2.2 | v2.0 ("DIAGNÓSTICO ÚNICO") | **v3.0** (2 modos canonizados) | Misma directiva |

**Cuándo gana el master prompt:** cuando coincide con niveles 1-2 · entonces es la fuente operacional autoritativa · usarlo directamente.

**Cuándo NO gana:** cuando contradice niveles 1-2 · entonces es candidato a actualización (no ignorar · no fixar el run).

---

## Patrón meta — Antes de declarar "discrepancia entre fuentes"

Cuando detectes que master prompt y realidad operacional se contradicen, **NO** declares discrepancia inmediatamente. Es jerarquía canónica no reconocida si:

1. Existe una directiva del instructor capturada en runs maduros (especialmente en `pm-2-11.json`)
2. La directiva sobrescribe lo que dice el master prompt
3. Los runs operacionales aplican la directiva (no el master prompt antiguo)

**Cómo verificar antes de declarar discrepancia:**

```bash
# Buscar directivas literales del instructor en runs maduros
grep -rn "Quiero todos\|LOS QUIERO\|directiva\|directive" runs/MGV-*/pm-2-11.json runs/MGV-*/pm-2-9.json
```

Si encuentras directiva relacionada con el tema en disputa: la "discrepancia" es realmente "master prompt desactualizado". Acción correcta: actualizar master prompt (NO ignorar la directiva · NO fixar los runs).

---

## Caso histórico — Lección 2026-04-28

**Lo que pasó:** auditoría inicial de PLAN-FASE-2-ARQUITECTURA.md v1.1 declaró "discrepancia DIESEL vs MGV vs canon" sobre PM-2.1/PM-2.2. Formulación incorrecta porque no reconoció jerarquía canónica.

**Realidad descubierta tras búsqueda exhaustiva:**

| Fuente | Lo que decía sobre PM-2.1 | Lo que realmente significa |
|---|---|---|
| Master prompt PM-2.1 v2.0 | "DETONANTE ÚNICO: THE NARRATIVE SCENARIO" | Antes de la directiva del instructor |
| MGV-2026-04-20 pm-2-1.json | `applicable_to_this_pm: false` | Interpretación conservadora · respeta master prompt antiguo |
| DIESEL-2026-04-15/18/19 pm-2-1.json | 4 arquetipos secuencia encadenada | Aplica la directiva del instructor literalmente |
| MGV pm-2-11.json:574 | "Quiero todos los arquetipos para todos los PM" | **Directiva canónica que sobrescribe master prompt** |

**Resolución (Opción A canonizada):** PM-2.1 + PM-2.2 actualizados a v3.0 reflejando la directiva. AMBOS modos válidos · default = single-archetype (preserva backward-compat) · extensible = 4 arquetipos (refleja directiva).

**Costo:** 1 ciclo de mea culpa + bumpear plan v1.1 → v1.2 → v1.3 + actualizar 2 master prompts a v3.0 + DM v2.11 → v2.12.

---

## Lección sistémica para Fase 2

Cuando audites o veas conflicto entre master prompt y run real:

1. **NO** declarar discrepancia inmediato
2. **SÍ** ejecutar grep en runs maduros buscando directiva del instructor (capturada en pm-2-11 / pm-2-9 / pm-3-1 / pm-3-2)
3. Si encontrás directiva: el master prompt es candidato a actualización. Documentar en §11 del DM. NO fixar el run.
4. Si NO encontrás directiva: entonces SÍ es deviation legítima · documentar como bug/inconsistencia · proponer fix.

**Patrón meta:** "discrepancia DIESEL vs MGV vs canon" casi siempre = "master prompt desactualizado respecto a directiva". Verificar esto antes de cualquier otra hipótesis.
