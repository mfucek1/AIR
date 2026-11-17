// Figma component spec extractor. Paste into a use_figma call on the AIR file.
// Set SETS to component set ids or section ids (every set inside a section is read), or to a
// screen's frame id (read as one tree, like a template; its instances are listed, not opened).
// Returns per set: props, description, the base variant's tree (layout, tokens, text styles,
// icon tint) and, for variants one property away from the base, only what changes.
// Keys: k type, n name, sz size, al layout (dir, gap, padding t/r/b/l, align), lz sizing
// (Fixed/Hug/Fill), bg fill, st stroke, r radius, fx effect style, tint Icon tint mode,
// t text, ts text style, c text colour, is instance of, pr property links, szv size variables
// (w width, h height, mh min height).
// BASE (optional) picks the variant read as the base, by set id, instead of the set's first one.

const SETS = ['9048:1210'];
const BASE = {}; // e.g. { '9051:1490': 'Size=L, Type=Initials' }
const COMPONENTS_PAGE = '9043:730';

// Each root is read on its own page (screens live on other pages than the components).
async function onPageOf(node) {
  let p = node;
  while (p.type !== 'PAGE') p = p.parent;
  if (figma.currentPage !== p) await figma.setCurrentPageAsync(p);
}
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(COMPONENTS_PAGE));
const TINT = 'VariableCollectionId:9044:734';
const tintNames = { '9044:0': 'Default', '9044:1': 'Muted', '9044:2': 'Action', '9044:3': 'Inverse', '9049:0': 'AI', '9049:1': 'Danger', '9049:2': 'Success', '9049:3': 'Warning', '9049:4': 'Chrome', '9050:0': 'Disabled' };
const vcache = {};
async function vn(a) {
  if (!a) return null;
  if (vcache[a.id] !== undefined) return vcache[a.id];
  const v = await figma.variables.getVariableByIdAsync(a.id);
  const s = v ? ((v.codeSyntax && v.codeSyntax.WEB) || v.name).replace(/^var\(--air-/, '').replace(/\)$/, '') : '?';
  return (vcache[a.id] = s);
}
const scache = {};
async function sn(id) {
  if (!id || typeof id !== 'string') return null;
  if (scache[id] !== undefined) return scache[id];
  const s = await figma.getStyleByIdAsync(id);
  return (scache[id] = s ? s.name : '?');
}
const hex = (c) => '#' + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
async function paints(arr) {
  if (!Array.isArray(arr)) return null;
  const out = [];
  for (const p of arr) {
    if (p.visible === false) continue;
    if (p.type === 'SOLID') {
      const b = p.boundVariables && p.boundVariables.color;
      out.push((b ? await vn(b) : hex(p.color)) + (p.opacity != null && p.opacity < 1 ? '@' + Math.round(p.opacity * 100) : ''));
    } else out.push(p.type);
  }
  return out.length ? out.join('+') : null;
}
async function num(n, k) {
  const b = n.boundVariables && n.boundVariables[k];
  if (b) return vn(Array.isArray(b) ? b[0] : b);
  return typeof n[k] === 'number' ? Math.round(n[k] * 10) / 10 : null;
}
async function spec(n, depth) {
  const o = { k: n.type[0] + n.type.slice(1, 3).toLowerCase(), n: n.name.slice(0, 36) };
  if (!n.visible) o.hid = 1;
  o.sz = Math.round(n.width) + 'x' + Math.round(n.height);
  const bv = n.boundVariables || {};
  const szv = [['w', 'width'], ['h', 'height'], ['mh', 'minHeight']].filter(([, k]) => bv[k]);
  if (szv.length) o.szv = (await Promise.all(szv.map(async ([a, k]) => a + ':' + (await vn(bv[k]))))).join(' ');
  if ('layoutMode' in n && n.layoutMode && n.layoutMode !== 'NONE')
    o.al = n.layoutMode[0] + ' g' + (await num(n, 'itemSpacing')) + ' p' + [await num(n, 'paddingTop'), await num(n, 'paddingRight'), await num(n, 'paddingBottom'), await num(n, 'paddingLeft')].join('/') + ' ' + (n.primaryAxisAlignItems || '')[0] + (n.counterAxisAlignItems || '')[0];
  if ('layoutSizingHorizontal' in n && n.parent && n.parent.type !== 'COMPONENT_SET') o.lz = (n.layoutSizingHorizontal || '')[0] + (n.layoutSizingVertical || '')[0];
  if (n.layoutPositioning === 'ABSOLUTE') o.abs = Math.round(n.x) + ',' + Math.round(n.y);
  if (n.type !== 'TEXT') { const f = await paints(n.fills); if (f) o.bg = f; }
  const s = await paints(n.strokes);
  if (s) o.st = s + ' ' + (typeof n.strokeWeight === 'number' ? n.strokeWeight : [n.strokeTopWeight, n.strokeRightWeight, n.strokeBottomWeight, n.strokeLeftWeight].join('/')) + (n.strokeAlign ? n.strokeAlign[0] : '') + (n.dashPattern && n.dashPattern.length ? ' dash' : '');
  if ('cornerRadius' in n) { const r = await num(n, 'topLeftRadius'); if (r) o.r = r; }
  if (n.effectStyleId) o.fx = await sn(n.effectStyleId);
  if (n.opacity != null && n.opacity < 1) o.op = Math.round(n.opacity * 100);
  if (n.explicitVariableModes && n.explicitVariableModes[TINT]) o.tint = tintNames[n.explicitVariableModes[TINT]];
  if (n.type === 'TEXT') { o.t = n.characters.slice(0, 48); o.ts = (await sn(n.textStyleId)) || n.fontSize + ' ' + (n.fontName && n.fontName.style); o.c = await paints(n.fills); }
  if (n.type === 'INSTANCE') { const m = await n.getMainComponentAsync(); o.is = m ? ((m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name + ': ' : '') + m.name).slice(0, 60) : '?'; }
  if (n.componentPropertyReferences) { const r = n.componentPropertyReferences; const ks = Object.keys(r); if (ks.length) o.pr = ks.map((k) => k[0] + ':' + r[k].split('#')[0]).join(','); }
  if (depth < 4 && 'children' in n && n.type !== 'INSTANCE' && !/^Illustration\//.test(n.name)) { o.ch = []; for (const c of n.children) o.ch.push(await spec(c, depth + 1)); }
  return o;
}
function flat(o, path, out) { const p = path + '/' + o.n; const c = { ...o }; delete c.ch; out[p] = JSON.stringify(c); if (o.ch) o.ch.forEach((x) => flat(x, p, out)); return out; }
const props = (name) => Object.fromEntries(name.split(', ').map((s) => s.split('=')));
const result = {};
for (const sid of SETS) {
  const root = await figma.getNodeByIdAsync(sid);
  await onPageOf(root);
  const isScreen = root.type === 'FRAME' && !root.findOne((n) => n.type === 'COMPONENT_SET');
  const sets = ['COMPONENT_SET', 'COMPONENT'].includes(root.type) || isScreen ? [root] : root.findAll((n) => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'));
  for (const set of sets) {
    const r = { id: set.id };
    if (set.description) r.desc = set.description;
    if (set.type !== 'COMPONENT_SET') { r.spec = await spec(set, 0); result[set.name] = r; continue; }
    r.props = Object.fromEntries(Object.entries(set.componentPropertyDefinitions).map(([k, v]) => [k.split('#')[0], v.type === 'VARIANT' ? v.variantOptions.join('/') : v.type + (v.type === 'BOOLEAN' || v.type === 'TEXT' ? '=' + String(v.defaultValue).slice(0, 40) : '')]));
    const variants = set.children.filter((c) => c.type === 'COMPONENT');
    const base = variants.find((v) => v.name === BASE[set.id]) || variants[0];
    r.base = base.name;
    r.spec = await spec(base, 0);
    const baseProps = props(base.name);
    const bf = {};
    for (const [k, v] of Object.entries(flat(r.spec, '', {}))) bf[k.replace(/^\/[^/]+/, '')] = v;
    r.diff = {};
    for (const v of variants.filter((x) => x !== base)) {
      const p = props(v.name);
      if (Object.keys(p).filter((k) => p[k] !== baseProps[k]).length > 1) continue;
      const d = {};
      for (const [k, val] of Object.entries(flat(await spec(v, 0), '', {}))) {
        const kk = k.replace(/^\/[^/]+/, '');
        if (bf[kk] === undefined) { d[kk || '.'] = 'NEW ' + val.slice(0, 160); continue; }
        if (bf[kk] === val) continue;
        const a = JSON.parse(bf[kk]), b = JSON.parse(val), dd = {};
        for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) if (key !== 'n' && JSON.stringify(a[key]) !== JSON.stringify(b[key])) dd[key] = b[key] === undefined ? '∅' : b[key];
        if (Object.keys(dd).length) d[kk || '.'] = dd;
      }
      r.diff[v.name] = Object.keys(d).length ? d : 'same';
    }
    result[set.name] = r;
  }
}
return result;
