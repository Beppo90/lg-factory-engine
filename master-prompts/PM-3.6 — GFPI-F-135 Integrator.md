# PM-3.6: GFPI-F-135 INTEGRATOR
## Fase 3 · Ejecución | Sistema de Prompts Maestros — LG Factory
## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.6 |
| **Nombre** | GFPI-F-135 Integrator |
| **Fase** | 3. Ejecución |
| **Ubicación** | Último paso después de PM-3.5 (Final Mission) |
| **Output** | Documento GFPI-F-135 V02 completo y listo para SIGA |
| **Rol en el sistema** | Ensambla las secciones GFPI generadas por cada PM + verifica coherencia cruzada |

---

## QUÉ HACE ESTE PROMPT

PM-3.6 NO genera contenido nuevo. **Ensambla y verifica.** Toma las secciones GFPI que cada PM ya generó (según el Data Contract) y las ordena en el formato oficial GFPI-F-135 V02.

**Antes de PM-3.6:** Cada PM genera DOS outputs (worksheet + sección GFPI)
**Con PM-3.6:** Se ensambla el documento final + se verifica coherencia

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Secciones GFPI de todos los PMs (marcadas con `<!-- GFPI SECTION -->`) | PM-1.2 a PM-3.5 |
| Data Contract GFPI-F-135 | Referencia (GFPI-F-135 — Data Contract.md) |
| Datos institucionales | Instructor |

---

## REGLAS DE DISEÑO

### REGLA 1 — NO GENERAR CONTENIDO NUEVO
PM-3.6 ensambla lo que ya existe. NO crea actividades, NO inventa vocabulario, NO diseña evaluaciones. Si una sección falta o está vacía, lo reporta como ERROR — no lo inventa.

### REGLA 2 — VERIFICACIÓN DE COHERENCIA CRUZADA
Antes de ensamblar, PM-3.6 verifica:

| Check | Qué verifica | Si falla |
|-------|-------------|----------|
| **Vocabulario** | El glosario (sección 5) contiene los 20 términos usados en las actividades | Reporta términos faltantes o extra |
| **Universo narrativo** | Personajes, empresa y contexto son consistentes de 3.1 a 3.4 | Reporta inconsistencias |
| **Evidencias** | Las 3 evidencias (sección 4) corresponden a actividades reales en sección 3 | Reporta evidencias sin actividad |
| **Arquetipos** | Cada sección 3.x documenta qué arquetipo se eligió | Reporta arquetipos faltantes |
| **Grammar targets** | Las estructuras trabajadas en 3.3 aparecen en las evidencias de 4 | Reporta desalineaciones |
| **Nivel CEFR** | Todas las actividades son consistentes con el nivel declarado en sección 1 | Reporta actividades fuera de nivel |

### REGLA 3 — ENSAMBLAJE SECUENCIAL
Las secciones se ordenan según la estructura oficial del GFPI-F-135 V02:
1 → 2 → 3.1 → 3.2 → 3.3 → 3.4 → 4 → 5 → 6 → 7 → 8

### REGLA 4 — FORMATO INSTITUCIONAL
El documento final tiene:
- Encabezado con nombre del programa, código, guía
- Tablas formateadas correctamente
- Secciones numeradas según GFPI-F-135 V02
- Sección 7 (Control del Documento) con datos del instructor
- Sección 8 (Control de Cambios) vacía (primera versión)

### REGLA 5 — REPORTE DE ERRORES
Si la verificación de coherencia encuentra problemas, genera un REPORTE ANTES del documento:
- Lista de errores encontrados
- Severidad (crítico / advertencia / info)
- Qué PM necesita corregirse
- El documento se genera de todas formas, pero con advertencias

---

## FORMATO DE SALIDA

**Documento 1: COHERENCE REPORT** (si hay errores)

```
REPORTE DE COHERENCIA — GFPI-F-135
[Programa] | [Guía #]

| # | Error | Severidad | PM afectado | Descripción |
|---|-------|-----------|-------------|-------------|
| 1 |       |           |             |             |

ESTADO: [✅ LIMPIO / ⚠️ ADVERTENCIAS / ❌ ERRORES CRÍTICOS]
```

**Documento 2: GFPI-F-135 V02** (documento final)

```
PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
FORMATO GUÍA DE APRENDIZAJE
GFPI-F-135 V02

English Learning Guide #[n]: [Nombre de la Guía]

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
[Se ensamblada desde PM-1.2]

2. PRESENTACIÓN
[Se ensamblada desde PM-1.2]

3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE
  3.1. Actividades de Reflexión Inicial
  [Se ensamblada desde PM-2.1]
  3.2. Actividades de Contextualización
  [Se ensamblada desde PM-2.2]
  3.3. Actividades de Apropiación
  [Se ensamblada desde PM-2.3 a PM-2.10]
  3.4. Actividades de Transferencia
  [Se ensamblada desde PM-2.8 + PM-3.5]

4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE
[Se ensamblada desde PM-4.1 + PM-4.2]

5. GLOSARIO DE TÉRMINOS (KEY VOCABULARY)
[Se ensamblada desde PM-1.2 / PM-2.5]

6. REFERENTES BIBLIOGRÁFICOS
[Se ensamblada desde PM-1.2 (stories curadas)]

7. CONTROL DEL DOCUMENTO
| Nombre | Cargo | Dependencia | Fecha |
|--------|-------|-------------|-------|
| [instructor] | INSTRUCTOR | [SENA centro] | [fecha] |

8. CONTROL DE CAMBIOS
| Nombre | Cargo | Dependencia | Fecha | Razón |
|--------|-------|-------------|-------|-------|
| (vacío — primera versión) | | | | |
```

---

## PROMPT PARA IA

```
ACTÚA COMO: Document Integration Specialist & Quality Assurance Editor. No generas contenido nuevo — ensamblas y verificas. Tu trabajo es tomar secciones ya producidas y ensamblarlas en un documento institucional coherente.

Tu tarea: Generar el documento GFPI-F-135 V02 completo a partir de las secciones GFPI proporcionadas por cada PM.

### DATOS DE ENTRADA:
- Programa: [nombre y código]
- Guía #: [número]
- Nombre de la guía: [nombre]
- Instructor: [nombre, cargo, centro SENA]
- Fecha: [fecha de generación]
- Secciones GFPI: [PEGAR AQUÍ todas las secciones marcadas con <!-- GFPI SECTION -->]

### INSTRUCCIONES:

**PASO 1 — VERIFICACIÓN DE COHERENCIA:**
Antes de ensamblar, verifica:
1. Vocabulario: ¿El glosario (sección 5) contiene los 20 términos usados en las actividades?
2. Universo narrativo: ¿Personajes y contexto son consistentes?
3. Evidencias: ¿Las 3 evidencias corresponden a actividades reales?
4. Arquetipos: ¿Cada sección 3.x documenta su arquetipo?
5. Grammar targets: ¿Las estructuras aparecen en las evidencias?
6. Nivel CEFR: ¿Todo es consistente con el nivel declarado?

Genera el COHERENCE REPORT con los hallazgos.

**PASO 2 — ENSAMBLAJE:**
Si no hay errores críticos, ensambla el documento GFPI-F-135 V02:
- Secciones en orden: 1 → 2 → 3.1 → 3.2 → 3.3 → 3.4 → 4 → 5 → 6 → 7 → 8
- Formato institucional: encabezado, tablas, numeración
- Sección 7: datos del instructor
- Sección 8: vacía (primera versión)

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- NO generar contenido nuevo — solo ensamblar lo que existe
- Si falta una sección, reportar como ERROR
- Mantener formato markdown limpio
- Respetar markers `<!-- GFPI SECTION -->` para identificar secciones
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Recibe input de** | PM-1.2 | Secciones 1, 2, 5, 6 |
| **Recibe input de** | PM-2.1 a PM-2.10 | Secciones 3.1, 3.2, 3.3 |
| **Recibe input de** | PM-2.8 + PM-3.5 | Sección 3.4 |
| **Recibe input de** | PM-4.1 + PM-4.2 | Sección 4 |
| **Referencia** | GFPI-F-135 Data Contract | Formato de secciones |
| **Alimenta** | SIGA / Documento institucional | Documento final listo para entrega |
| **Se ubica en** | Flujo operativo SENA | Último paso de Fase 3 |

---

*PM-3.6: GFPI-F-135 Integrator*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
