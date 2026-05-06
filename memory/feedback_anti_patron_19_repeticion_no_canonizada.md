---
name: Anti-patrón #19 · repetición de instrucciones no-canonizadas
description: Paradigm shifts descubiertos en runtime aplicados a proyecto N pero NO canonizados al master prompt · obligan a reinventar/repetir instrucciones manuales en proyecto N+1
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-04
---
**Anti-patrón #19 detectado y canonizado por Sergio 2026-05-04**

**Síntoma observado:**
En proyecto N+1 (INFRATI · TICs) el orchestrator (Claude) propone manualmente las mismas reglas/ejemplos/formatos/decisiones de distribución que YA fueron aplicadas en proyecto N (RECREACION-IMDER G1+G2). Sergio detecta la repetición y dice explícitamente: "No me gustó haberme repetido después de haber desarrollado [proyecto N] y volverlo a hacer en [proyecto N+1]. Eso me hizo pensar que no tienes documentado en el PM 0.0 la actualización de toda esta iteración."

**Causa raíz:**
Paradigm shifts descubiertos en runtime se aplican a runs específicos (`runs/RECREACION-IMDER-2026-05-04/pm-0-0-matriz-alineada.json` v2 fusión bidireccional) pero NO retornan al master prompt (`master-prompts/PM-0.0 — Matriz Pedagógica Alineadora.md` quedó en v1.2 sin las reglas F1-F6).

Cuando proyecto N+1 arranca · el orchestrator lee el master desactualizado y debe **reinventar las instrucciones manuales en cada nueva conversación**. Esto:
- Multiplica costo (tokens + tiempo)
- Genera drift (cada manual re-invención puede divergir del original)
- Frustra al instructor (Sergio) que percibe falta de aprendizaje del sistema
- Bloquea escalabilidad (si Sergio quiere arrancar 10 proyectos · el costo de re-inventar es 10x)

**Why:** El sistema FPI CD Engine declara "diseño de adentro hacia afuera UbD verdadero" (DM §3) · pero si los paradigm shifts no canonizan al master · el sistema diseña "de adentro hacia afuera SOLO en el run actual · y reconstruye desde cero cada nuevo proyecto".

**How to apply (mitigación canon):**

1. **Inmediatamente** después de aplicar paradigm shift en runtime que cambie reglas/schemas/formatos canon · DETENERSE y bumpear master prompt PM correspondiente ANTES de cerrar sesión:
   - PM-0.0 si shift es de matriz alineadora
   - PM-0/1.1/1.2/2.x/3.x/4.x según el PM afectado

2. **Memory snapshot OBLIGATORIO** del paradigm shift describiendo:
   - Trigger del shift (qué se descubrió en runtime)
   - Qué reglas/schemas/formatos cambiaron
   - Cobertura aplicada (qué runs ya usan el shift)
   - Cómo aplica cross-program

3. **DM bump footnote** documentando el shift en el status global del sistema

4. **NO arrancar proyecto N+1** sin master actualizado · si Sergio pide arrancar nuevo proyecto antes del bump → priorizar bump primero

5. **Validación con LLM Agent** post-bump: dispatch que lee master actualizado + runs originales del shift y verifica que el canon capturó correctamente lo aprendido (anti-drift)

**Aplicabilidad cross-PM:**

Anti-patrón #19 aplica a TODOS los master prompts del sistema. Cualquier descubrimiento runtime que represente cambio de canon (no solo fix puntual) debe:
- Canonizarse al master inmediato
- Memory snapshot
- DM footnote
- Validation LLM

**Casos previos relacionados (similar pero más específicos):**
- Anti-patrón #16 · prompt operacional prescriptivo (canonizado en PM-0.0 v1.1 REGLA 8)
- Anti-patrón #18 · PM-3.6 saltando PM-3.2 (canonizado en PM-3.2 v3.0 + PM-3.6 v3.7)

**Anti-patrón #19 vs #16/#18:** estos son anti-patrones específicos de un PM. #19 es **meta-anti-patrón arquitectónico** que aplica al SISTEMA completo · no a un PM individual.

**Trigger detection:**

Si Sergio dice cualquier variante de:
- "Te volví a explicar lo mismo que en [proyecto previo]"
- "No tienes documentado X en el master"
- "Esto debería estar canon ya"
- "Por qué me repito en cada proyecto"

→ Es señal #19 · STOP y bumpear master(s) afectado(s) inmediatamente.

**Cierre primer caso #19:**
- Detectado: 2026-05-04 al arrancar INFRATI tras RECREACION
- Bump aplicado: PM-0.0 v1.2 → v2.0 (7 secciones NEW · 715 → 982 líneas)
- DM bump: v3.15 → v3.16
- Memory snapshots: 2 (este + paradigm shift)
- Validador LLM: pending post-bump

*Sergio Cortés Perdomo 2026-05-04 · señalamiento explícito + push arquitectónico*
