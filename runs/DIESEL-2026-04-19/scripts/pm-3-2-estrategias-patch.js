"use strict";
// PM-3.2 — Estrategias Patch
// Lee pm-3-1.json (que ya tiene las estrategias por sesión),
// parchea pm-3-2-s1..s8.json con estrategia_didactica + tecnica por bloque,
// actualiza pm-3-2-build-out-gen.js para renderizar los nuevos campos,
// y regenera pm-3-2-build-out-completo.docx.

const fs = require("fs");
const BASE = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19";
const VAULT = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19";

// ─── 1. LEER ESTRATEGIAS DESDE pm-3-1.json ────────────────────────────────────
const pm31 = JSON.parse(fs.readFileSync(`${BASE}/pm-3-1.json`, "utf8"));

// Construir mapa session -> estrategia
const estMap = {};
pm31.sessions_detail.forEach(s => {
  if (s.logistics_box && s.logistics_box.estrategia) {
    estMap[s.session] = {
      momento_sena:          s.logistics_box.momento_sena,
      estrategia_didactica:  s.logistics_box.estrategia,
      justificacion:         s.logistics_box.justificacion,
      tecnicas:              s.logistics_box.tecnicas || [],
    };
  }
});

console.log("Estrategias cargadas para sesiones:", Object.keys(estMap).join(", "));

// ─── 2. PARCHEAR CADA pm-3-2-sX.json ─────────────────────────────────────────
for (let i = 1; i <= 8; i++) {
  const path = `${BASE}/pm-3-2-s${i}.json`;
  const vaultPath = `${VAULT}/pm-3-2-s${i}.json`;

  // Only vault if file exists there (some might not)
  const d = JSON.parse(fs.readFileSync(path, "utf8"));
  const est = estMap[i];
  if (!est) { console.log(`  S${i}: sin estrategia — skip`); continue; }

  // Patch session-level fields
  d.momento_sena         = est.momento_sena;
  d.estrategia_didactica = est.estrategia_didactica;
  d.justificacion_didactica = est.justificacion;

  // Build bloque → tecnica lookup (by letra: A, B, C, D, E)
  const tecByLetra = {};
  est.tecnicas.forEach(t => { tecByLetra[t.bloque] = t.tecnica; });

  if (i <= 3) {
    // OLD FORMAT — bloques in while.bloques[].letra
    const bloques = (d.while && d.while.bloques) ? d.while.bloques : [];
    bloques.forEach(bloque => {
      const letra = bloque.letra;
      if (letra && tecByLetra[letra]) {
        bloque.tecnica_didactica = tecByLetra[letra];
      }
    });
  } else {
    // NEW FORMAT — bloques in session_plan.while_a, while_b, etc.
    const sp = d.session_plan || {};
    ["a","b","c","d","e"].forEach(l => {
      const key = `while_${l}`;
      const letra = l.toUpperCase();
      if (sp[key] && tecByLetra[letra]) {
        sp[key].tecnica_didactica = tecByLetra[letra];
      }
    });
  }

  const jsonOut = JSON.stringify(d, null, 2);
  fs.writeFileSync(path, jsonOut);
  // Only write to vault if vault file exists
  if (fs.existsSync(vaultPath)) {
    fs.writeFileSync(vaultPath, jsonOut);
  }
  console.log(`  ✓ S${i} patched — estrategia: "${est.estrategia_didactica.slice(0,40)}..."`);
}

console.log("\nJSONs patched. Regenerando docx...\n");

// ─── 3. PATCH pm-3-2-build-out-gen.js ─────────────────────────────────────────
// Insertamos renderizado de los nuevos campos en renderSessionHeaderOld,
// renderSessionHeaderNew, renderBloqueOld y renderBloqueNew.

const genPath = "/sessions/blissful-amazing-lamport/pm-3-2-build-out-gen.js";
let src = fs.readFileSync(genPath, "utf8");

// ─ A. renderSessionHeaderOld: add 3 new rows to pairs array ─
const OLD_HEADER_ANCHOR = `    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
  ];
  if (sh.nota_instructor)`;
const OLD_HEADER_REPLACE = `    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
    ["Momento SENA", d.momento_sena || "—"],
    ["Estrategia Didáctica", d.estrategia_didactica || "—"],
    ["Justificación", d.justificacion_didactica || ""],
  ];
  if (sh.nota_instructor)`;
src = src.replace(OLD_HEADER_ANCHOR, OLD_HEADER_REPLACE);

// ─ B. renderSessionHeaderNew: add 3 new rows to pairs array ─
const NEW_HEADER_ANCHOR = `    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
  ];
  return makeTwoColTable(pairs);`;
const NEW_HEADER_REPLACE = `    ["Generated", d.generated_at || ""],
    ["Status", d.status || ""],
    ["Momento SENA", d.momento_sena || "—"],
    ["Estrategia Didáctica", d.estrategia_didactica || "—"],
    ["Justificación", d.justificacion_didactica || ""],
  ];
  return makeTwoColTable(pairs);`;
src = src.replace(NEW_HEADER_ANCHOR, NEW_HEADER_REPLACE);

// ─ C. renderBloqueOld: render tecnica_didactica after block title ─
const BLOQUE_OLD_ANCHOR = `  paras.push(h2(\`[\${bloque.letra || ""}] \${name} (\${dur} min)\`));

  if (bloque.objetivo)`;
const BLOQUE_OLD_REPLACE = `  paras.push(h2(\`[\${bloque.letra || ""}] \${name} (\${dur} min)\`));

  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.objetivo)`;
src = src.replace(BLOQUE_OLD_ANCHOR, BLOQUE_OLD_REPLACE);

// ─ D. renderBloqueNew: render tecnica_didactica after block title ─
const BLOQUE_NEW_ANCHOR = `  if (bloque.bloom) paras.push(labeledPara("Bloom", bloque.bloom));
  if (bloque.purpose) paras.push(...renderSection("Purpose", bloque.purpose));`;
const BLOQUE_NEW_REPLACE = `  if (bloque.tecnica_didactica) {
    paras.push(new Paragraph({
      children: [
        new TextRun({ text: "Técnica Didáctica: ", font: "Calibri", size: 20, bold: true, color: "1C2B3C" }),
        new TextRun({ text: s(bloque.tecnica_didactica), font: "Calibri", size: 20, italics: true, color: "F59316" }),
      ],
      spacing: { before: 40, after: 80 },
      border: { left: { style: BorderStyle.THICK, color: "F59316", size: 10 } },
      indent: { left: 200 },
    }));
  }

  if (bloque.bloom) paras.push(labeledPara("Bloom", bloque.bloom));
  if (bloque.purpose) paras.push(...renderSection("Purpose", bloque.purpose));`;
src = src.replace(BLOQUE_NEW_ANCHOR, BLOQUE_NEW_REPLACE);

// ─ E. Update OUT path to include factory path (double save) ─
const OUT_ANCHOR = `const OUT  = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-2-build-out-completo.docx";`;
const OUT_REPLACE = `const OUT  = "/sessions/blissful-amazing-lamport/mnt/FPI+Research/fpi-sena-factory-vault/runs/DIESEL-2026-04-19/pm-3-2-build-out-completo.docx";
const OUT2 = "/sessions/blissful-amazing-lamport/mnt/fpi-sena-factory/runs/DIESEL-2026-04-19/pm-3-2-build-out-completo.docx";`;
src = src.replace(OUT_ANCHOR, OUT_REPLACE);

// Also patch the Packer.toBuffer call to save to both paths
const PACKER_ANCHOR = `Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUT, buffer);
  console.log(\`✓ Written \${buffer.length} bytes → \${OUT}\`);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});`;
// Try different possible ending patterns
let packerPatched = false;
[
  // Pattern 1
  `Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUT, buffer);
  console.log(\`✓ Written \${buffer.length} bytes → \${OUT}\`);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});`,
].forEach(pattern => {
  if (src.includes(pattern) && !packerPatched) {
    src = src.replace(pattern, `Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUT, buffer);
  if (typeof OUT2 !== 'undefined') fs.writeFileSync(OUT2, buffer);
  console.log(\`✓ Written \${buffer.length} bytes → \${OUT}\`);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});`);
    packerPatched = true;
  }
});

fs.writeFileSync(genPath, src);
console.log("✓ pm-3-2-build-out-gen.js patched\n");

// ─── 4. EJECUTAR EL GENERADOR ─────────────────────────────────────────────────
const { execSync } = require("child_process");
try {
  const out = execSync(`node ${genPath}`, { encoding: "utf8", cwd: "/sessions/blissful-amazing-lamport" });
  console.log(out);
} catch (e) {
  console.error("ERROR al ejecutar generator:");
  console.error(e.stdout || "");
  console.error(e.stderr || "");
  process.exit(1);
}
