# GFPI-F-135 V02 — DATA CONTRACT
## Especificación de Salida por Prompt
## Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo

---

## QUÉ ES ESTE DOCUMENTO

Define el **formato de salida GFPI** que cada PM genera como segundo output (además de su worksheet). Este "data contract" permite que PM-3.6 (Integrador) ensamble el documento GFPI-F-135 V02 final sin tener que descifrar outputs de cada PM.

**Regla:** Cada PM genera DOS productos:
1. Su **worksheet** (para el aprendiz o instructor)
2. Su **sección GFPI** (formateada según este contract)

---

## ESTRUCTURA DEL GFPI-F-135 V02

| Sección | Contenido | Fuente |
|---------|-----------|--------|
| 1. Identificación | Programa, código, competencia, RAP, duración, nivel | PM-1.2 |
| 2. Presentación | Enfoque, conceptualización, entendimientos perdurables | PM-1.2 |
| 3.1 Reflexión Inicial | Actividades de reflexión (Spark) | PM-2.1 |
| 3.2 Contextualización | Actividades de diagnóstico (Gap Analysis) | PM-2.2 |
| 3.3 Apropiación | Actividades de input y práctica (Reading → Grammar) | PM-2.3 a PM-2.10 |
| 3.4 Transferencia | Actividades de producción (Speaking + Final Mission) | PM-2.8 + PM-3.5 |
| 4. Evidencias | Triada SENA: Conocimiento + Desempeño + Producto | PM-4.1 + PM-4.2 |
| 5. Glosario | 20 términos clave con definición | PM-1.2 / PM-2.5 |
| 6. Referentes | Fuentes auténticas curadas | PM-1.2 |
| 7. Control del Documento | Autor, cargo, dependencia, fecha | Datos institucionales |
| 8. Control de Cambios | Log de modificaciones | Vacío (primera versión) |

---

## DATA CONTRACT POR PM

### PM-1.2 → Secciones 1, 2, 5, 6

**Output GFPI esperado:**

```markdown
<!-- GFPI SECTION: 1-IDENTIFICACION -->
| Campo | Valor |
|-------|-------|
| Denominación del Programa | [nombre] |
| Código del Programa | [código] |
| Competencia | [literal de Sofía Plus] |
| Resultado de Aprendizaje | [literal de Sofía Plus] |
| Duración de la Guía | 24h presenciales + 6h autónoma |
| Nivel CEFR | A1.1-A1.2 |
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 2-PRESENTACION -->
[Párrafo de enfoque y conceptualización de la guía]
[3 entendimientos perdurables]
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 5-GLOSARIO -->
| # | Término | Definición |
|---|---------|-----------|
| 1 | [término] | [definición simple] |
... (20 términos)
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 6-REFERENTES -->
| Fuente | Tipo | URL |
|--------|------|-----|
| [Story A] | [género] | [URL] |
| [Story B] | [género] | [URL] |
<!-- END GFPI SECTION -->
```

---

### PM-2.1 → Sección 3.1

**Output GFPI esperado:**

```markdown
<!-- GFPI SECTION: 3.1-REFLEXION -->
Arquetipo seleccionado: [A/B/C/D/E o combinación]

Actividad 1 — [nombre]:
[Descripción de la actividad en formato GFPI]

Actividad 2 — [nombre]:
[Descripción de la actividad en formato GFPI]

Actividad 3 — [nombre]:
[Descripción de la actividad en formato GFPI]
<!-- END GFPI SECTION -->
```

---

### PM-2.2 → Sección 3.2

**Output GFPI esperado:**

```markdown
<!-- GFPI SECTION: 3.2-CONTEXTUALIZACION -->
Arquetipo seleccionado: [A/B/C/D/E o combinación]

Actividad 1 — [nombre]:
[Descripción]

Actividad 2 — [nombre]:
[Descripción]

Actividad 3 — [nombre]:
[Descripción]
<!-- END GFPI SECTION -->
```

---

### PM-2.3 a PM-2.10 → Sección 3.3 (APROPIACIÓN)

Todos los PMs del Conjunto A, B y C alimentan la sección 3.3. Cada uno genera su bloque:

```markdown
<!-- GFPI SECTION: 3.3-APROPIACION-READING -->
PM-2.3 | Arquetipo: [A/B/C/D/E/F]
Actividad: [nombre de la actividad principal]
Descripción: [1-2 líneas en formato GFPI]
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.3-APROPIACION-WRITING -->
PM-2.4 | Arquetipo: [A/B/C/D/E]
...
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.3-APROPIACION-VOCABULARY -->
PM-2.5 | Arquetipo: [A/B/C/D/E]
...
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.3-APROPIACION-LISTENING -->
PM-2.6 | Arquetipo: [A/B/C/D/E/F]
...
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.3-APROPIACION-PRONUNCIATION -->
PM-2.7 | Arquetipo: [A/B/C/D/E]
...
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.3-APROPIACION-GRAMMAR -->
PM-2.10 | Arquetipo: [A/B/C/D/E]
...
<!-- END GFPI SECTION -->
```

---

### PM-2.8 + PM-3.5 → Sección 3.4

```markdown
<!-- GFPI SECTION: 3.4-TRANSFERENCIA-SPEAKING -->
PM-2.8 | Arquetipo: [A/B/C/D/E]
Actividad de práctica oral: [nombre]
Descripción: [1-2 líneas]
<!-- END GFPI SECTION -->

<!-- GFPI SECTION: 3.4-TRANSFERENCIA-MISSION -->
PM-3.5 | Arquetipo: [A/B/C/D/E]
Tarea integradora: [nombre de la misión]
Desempeño: [qué evalúa la presentación oral]
Producto: [qué artefacto se entrega]
<!-- END GFPI SECTION -->
```

---

### PM-4.1 + PM-4.2 → Sección 4

```markdown
<!-- GFPI SECTION: 4-EVIDENCIAS -->
| Tipo | Evidencia | Técnica | Instrumento | Criterio |
|------|-----------|---------|-------------|----------|
| Conocimiento | [qué demuestra] | Cuestionario | PM-4.2 (50 pts) | [criterio] |
| Desempeño | [qué demuestra] | Observación | PM-4.1 Checklist (10 pts) | [criterio] |
| Producto | [qué demuestra] | Valoración | PM-4.1 Rúbrica (20 pts) | [criterio] |
<!-- END GFPI SECTION -->
```

---

## CÓMO FUNCIONA LA COMUNICACIÓN PM ↔ PM

```
Cada PM genera:
┌─────────────────────────────────┐
│  1. WORKSHEET (output normal)   │ ← Para el aprendiz/instructor
│  2. GFPI SECTION (data contract)│ ← Para PM-3.6 (Integrador)
│     Formato: <!-- GFPI SECTION: │
│     X-XXXX --> ... <!-- END --> │
└─────────────────────────────────┘
                │
                ▼
PM-3.6 recibe todas las secciones
                │
                ▼
┌─────────────────────────────────┐
│  VERIFICACIÓN DE COHERENCIA:    │
│  • Vocabulario consistente      │
│  • Universo narrativo coherente │
│  • Evidencias alineadas         │
│  • Arquetipos documentados      │
│  • Glosario = vocabulario usado │
└─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│  ENSAMBLAJE:                    │
│  Ordenar secciones según        │
│  estructura GFPI-F-135 V02      │
│  Formatear tablas y títulos     │
│  Agregar secciones 7 y 8        │
└─────────────────────────────────┘
                │
                ▼
        GFPI-F-135 V02 FINAL
```

---

## REGLA DE ORO

> **Los markers `<!-- GFPI SECTION: X-XXXX -->` y `<!-- END GFPI SECTION -->` son OBLIGATORIOS en el output de cada PM.** Sin estos markers, PM-3.6 no puede identificar ni ensamblar las secciones.

---

*GFPI-F-135 V02 — Data Contract*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
