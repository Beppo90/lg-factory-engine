# Troubleshooting Fase 3 (anti-patrones heredados Fase 2 + nuevos)

> **STUB Hito 1 Task 1** · contenido completo se enriquece durante Hitos 2-4 conforme detecto bugs reales.

## Anti-patrones heredados de Fase 2 (vigentes en Fase 3)

Los 11 anti-patrones documentados en `.claude/skills/fpi-sena-fase2/references/troubleshooting.md` aplican a Fase 3 sin modificación. Resumen:

- **Anti-patrón 1** — "Falsa invención" (REGLA 20 ausente · negar canon real)
- **Anti-patrón 11** — "Decisión inflada en plan arquitectónico" (REGLA 21 ausente · promover recomendación a TOMADA sin sustento)
- 9 más relacionados con jerarquía canónica · Gates · checks PM-2.11 · ver troubleshooting.md fase2

## Anti-patrones específicos Fase 3 (esperados · documentar conforme emerjan)

### Esperado 1 — "Subprocess node failure silenciosa"
Cuando `subprocess.run(['node', 'pm-3-X-gen.js'])` falla, sin captura de stderr el error se pierde. Mitigación: `subprocess.run(check=True, capture_output=True)` + log de stderr en validation post-render.

### Esperado 2 — "REGLA 20-shape en pm-3-X JSONs nuevos"
Los pm-3-1 + pm-3-2-sX + pm-3-5 + pm-3-6 son JSONs sin validation runtime. Asumir paths sin grep es trampa garantizada (lección Hito 4 Fase 2 · 4 fallas REGLA 19-shape documentadas).

### Esperado 3 — "Bidirectional enrichment activity_footer drift"
Canon MGV propaga activity_footer Fase 2 ↔ PM-3.2. Si esa propagación se rompe, los Activity Cards Fase 2 quedan desincronizados con Build-Outs Fase 3. Mitigación: `phase3_validators.py` Check 3.7.

### Esperado 4 — "Hito 5 refactor pass diferido indefinidamente"
I.2 caveat: si Hito 5 se omite, la API renderer queda inconsistente entre 6 funciones. Mitigación: agendado explícito PLAN v1.1 §7 Hito 5 (no aspiración).

---

*troubleshooting.md fpi-sena-fase3 · STUB v0.1 · Hito 1 Task 1 · 2026-04-29*
