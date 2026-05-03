---
title: KICKOFF Sesión 2026-05-03 · Revisión pedagógica preview PM-3.6 IMARPOR-V2 + decisiones canonización
fecha: 2026-05-03
sesion_anterior: 2026-05-02 PM (cierre formal con preview v4 listo)
estado: PENDING revisión Sergio
---

# 🚀 KICKOFF Sesión 2026-05-03

## Estado al cierre 2026-05-02 PM

### ✅ LISTO

**Cascade IMARPOR-V2 v3.x materializada cross-Phase 1+2+3 inicio:**

| Phase | Estado | Output principal |
|---|---|---|
| Phase 1 | ✅ cerrada | matriz v1.3 + pm-1-1 v2.8 + pm-1-2 v4.2 + pm-2-0 v3.0 |
| Phase 2 | ✅ cerrada | 30 Activity Cards (Waves 1-4) + pm-2-11 v3.3 + xlsx GFPI-F-134 V04 6 filas tripartitas |
| Phase 3 inicio | 🟡 preview | PM-3.6 master bumpeado v2.7 → v3.4 (5 versiones · 32 reglas · 34 checks) + pm-3-6-PREVIEW.docx 5 layers aplicados |

### 📂 Outputs disponibles para revisión

- **`pm-3-6-PREVIEW.docx`** (20 KB · 10 páginas) → revisar visualmente
- **`pm-3-6-PREVIEW.pdf`** (156 KB · render visual) → más cómodo para revisión visual
- `pm-2-11.json` v3.3 (159 KB · criterios_por_actividad heredados)
- `pm-2-11-GFPI-F-134-V04.xlsx` (28 KB · 6 filas tripartitas · C6 con 3 capas criterios)
- `glosario-imarpor-v2.json` (122 entradas · 4 fields canon)
- 33 backups `.pre-wave-e-fix*` para rollback

## 🎯 Sesión hoy 2026-05-03

### Tarea principal · revisión pedagógica detallada del preview

**Sergio dijo (2026-05-02 PM cierre):** "Debo hacerle una revisión pedagógica detallada al preview. La haré mañana."

**Preview a revisar:** `runs/IMARPOR-CC-2026-04-30-V2/pm-3-6-PREVIEW.pdf` (10 páginas · 5 secciones canon SENA)

**Aspectos a validar:**

1. **Sec 1 Identificación** · ¿8 campos correctos? ¿logo placeholder OK o quieres logo SENA real ahora?
2. **Sec 2 Presentación** · ¿bilingüe ESP+EN paralelos suena bien? ¿Adaptación al sector banana cold chain natural?
3. **Sec 3 Formulación Actividades:**
   - ¿3.1 Reflexión inicial bien enmarcada para el aprendiz?
   - ¿3.2 Contextualización clara y operativa?
   - ¿3.3 Apropiación con headers RAP simples + numeración POR RAP funciona?
   - ¿3.4 Transferencia capstone bien presentada?
   - **Para CADA actividad:**
     - ¿Descripción aprendiz-friendly clara y ejecutable? (target 80-150 palabras)
     - ¿Recursos preparados completos y realistas?
     - ¿Estrategias didácticas + Técnica didáctica relevantes?
     - ¿Evidencias correctamente formateadas (3 líneas)?
     - ¿Duración razonable?
4. **Sec 4 Tabla Planteamiento Evidencias** · ¿6 columnas canon · header verde SENA · separadores RAP funcionan?
5. **Sec 5 Glosario bilingüe** · ¿4 fields por entrada útiles? ¿Contextualizados al sector?
6. **Footer** · "GFPI-F-135 V04" + paginación OK?

### Decisiones pendientes post-revisión

**Si Sergio APRUEBA preview v4 →** cascade canonization:

- **AC v3.1 → v3.2** · campos NEW obligatorios cross-program:
  - `descripcion_aprendiz` (80-150 palabras · canon SENA)
  - `recursos_aprendiz[]` (bullets tangibles preparados por instructor)
- **PM-3.6 v3.4 → v3.5** · REGLAS NEW 60-65:
  - 60: descripcion_aprendiz canon (no descripcion legacy)
  - 61: recursos_aprendiz canon (después de Descripción)
  - 62: omisión Material de apoyo del docx aprendiz (recursos absorbe)
  - 63: cleanup personajes en material_apoyo + evidencias.nombre obligatorio
  - 64-65: misc canon refinements
- **DM v3.13 → v3.14** · status footnote
- **Memory snapshots** · paradigm fix "instructor-facing leak en aprendiz-facing"

**Si Sergio pide AJUSTES →** iterar el LLM Agent de descripcion_aprendiz/recursos_aprendiz/glosario antes de canonizar.

### Próximo después de canonizar

**Wave E completo (no truncado):**
- Generar pm-3-6.docx final con TODAS las 19 actividades de Apropiación (vs 3 sample)
- Tabla Sec 4 con TODAS las 19 filas (vs 4 sample)
- Glosario Sec 5 con TODAS las 122 entradas (vs 8 sample)
- Estimado: ~25-35 páginas final

## 🗂️ Comandos útiles para arrancar la sesión

```bash
# Ver estado git
cd /Users/Beppo/Projects/fpi-sena-factory && git log --oneline -20

# Abrir preview para revisar
open runs/IMARPOR-CC-2026-04-30-V2/pm-3-6-PREVIEW.pdf

# Ver master prompt PM-3.6 actual
cat master-prompts/PM-3.6\ —\ GFPI-F-135\ Integrator.md | head -30

# Ver memory snapshots clave
cat ~/Library/Application\ Support/Claude/local-agent-mode-sessions/.../memory/MEMORY.md
```

## 🔍 Contexto rápido para Claude

- Sergio detectó 2 anti-patrones críticos el 2026-05-02 PM:
  1. **descripcion técnica leak en docx aprendiz** (era 535 palabras instructor-facing) → arreglado con `descripcion_aprendiz` (80-150 palabras canon SENA)
  2. **Recursos mencionados pero no listados** → arreglado con `recursos_aprendiz[]` (bullets tangibles)
- Plan A+C aplicado: cleanup personajes (18/30 cards) + omitir Material de apoyo del docx
- El preview v4 actual = versión limpia para revisión pedagógica

## 📋 Tasks status al cierre

- 178 tasks ejecutadas (cierre · in_progress)
- Preview v4 commiteado · pending revisión Sergio
- KICKOFF guardado en master-prompts/

---

*KICKOFF generado 2026-05-02 23:30 PM · cierre disciplinado · listo para arranque mañana 2026-05-03*
*Sergio Cortés · FPI SENA Factory · IMARPOR-V2 cascade Phase 3 inicio*
