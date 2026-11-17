// AIR token export — runs inside Figma (Plugin API), not in Node.
// Run it on the AIR file through the Figma MCP `use_figma` tool (or any plugin
// runner). It returns the full contents of src/tokens/tokens.css.
//
// What it exports:
// - every variable that has a WEB code syntax (var(--air-…)), Light values in
//   :root and Dark values in [data-theme="dark"]; aliases stay as var(...) links
// - text styles as font shorthands and letter-spacing
// - effect styles (elevation, focus ring) as box-shadow values

const toHex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  const a = c.a === undefined || c.a >= 1 ? '' : h(c.a);
  return '#' + h(c.r) + h(c.g) + h(c.b) + a;
};
const cssName = (v) => {
  const s = v.codeSyntax && v.codeSyntax.WEB;
  const m = s && s.match(/var\((--[a-z0-9-]+)\)/);
  return m ? m[1] : null;
};

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const byId = {};
for (const c of collections) {
  for (const id of c.variableIds) byId[id] = await figma.variables.getVariableByIdAsync(id);
}
const value = (v, modeId) => {
  const raw = v.valuesByMode[modeId];
  if (raw && raw.type === 'VARIABLE_ALIAS') {
    const target = byId[raw.id];
    const n = target && cssName(target);
    return n ? `var(${n})` : null;
  }
  if (v.resolvedType === 'COLOR') return toHex(raw);
  if (v.resolvedType === 'FLOAT') return raw === 0 ? '0' : `${raw}px`;
  return null;
};

const light = [];
const dark = [];
for (const c of collections) {
  if (!c.name.startsWith('AIR ·') || c.name === 'AIR · Icon tint') continue;
  const lightMode = c.modes.find((m) => m.name === 'Light') || c.modes[0];
  const darkMode = c.modes.find((m) => m.name === 'Dark');
  light.push(`  /* ${c.name} */`);
  for (const id of c.variableIds) {
    const v = byId[id];
    const n = cssName(v);
    if (!n) continue;
    const lv = value(v, lightMode.modeId);
    if (lv !== null) light.push(`  ${n}: ${lv};`);
    if (darkMode) {
      const dv = value(v, darkMode.modeId);
      if (dv !== null && dv !== lv) dark.push(`  ${n}: ${dv};`);
    }
  }
}

const text = [];
for (const s of await figma.getLocalTextStylesAsync()) {
  const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const weight = { Regular: 400, Medium: 500, 'Semi Bold': 600, Bold: 700 }[s.fontName.style] || 400;
  const lh = s.lineHeight.unit === 'PIXELS' ? `${s.lineHeight.value}px` : 'normal';
  const ls = s.letterSpacing.unit === 'PERCENT' ? `${s.letterSpacing.value / 100}em` : `${s.letterSpacing.value}px`;
  text.push(`  --air-font-${slug}: ${weight} ${s.fontSize}px/${lh} var(--air-font-family);`);
  text.push(`  --air-tracking-${slug}: ${ls};`);
}

const effects = [];
for (const s of await figma.getLocalEffectStylesAsync()) {
  const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const parts = s.effects.filter((e) => e.type === 'DROP_SHADOW' && e.visible).map((e) => {
    const b = e.boundVariables && e.boundVariables.color && byId[e.boundVariables.color.id];
    const col = b && cssName(b) ? `var(${cssName(b)})` : toHex(e.color);
    return `${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread || 0}px ${col}`;
  });
  // Figma's effects array paints the last item on top; CSS paints the first
  // shadow on top. Reverse, so the focus ring keeps its 2 px gap.
  if (parts.length) effects.push(`  --air-effect-${slug}: ${parts.reverse().join(', ')};`);
}

return [
  '/* Generated from Figma by tokens/figma-export.js. Do not edit by hand. */',
  ':root {',
  "  --air-font-family: 'Inter Variable', Inter, system-ui, sans-serif;",
  ...light,
  '  /* Text styles */',
  ...text,
  '  /* Effect styles */',
  ...effects,
  '}',
  '',
  '[data-theme="dark"] {',
  ...dark,
  '}',
  '',
].join('\n');
