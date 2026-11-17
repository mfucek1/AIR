// Two kinds of row, read from both sides and checked against each other when the page loads:
// - a variable bound in Figma (from figma-spec.ts) beside the CSS declaration that uses it, read
//   from the component's own stylesheet;
// - from molecules up, a part the step is built from (an instance in Figma) beside the line of
//   code that places it, read from the component's own source, the template, or live.tsx where
//   the part fills a slot.
// If a stylesheet stops using the variable Figma binds, or a part isn't placed where the row says,
// building the rows throws, so the page can't show a pair that doesn't match.
import buttonCss from '../src/components/Button/Button.css?raw';
import badgeCss from '../src/components/Badge/Badge.css?raw';
import tagCss from '../src/components/Tag/Tag.css?raw';
import avatarCss from '../src/components/Avatar/Avatar.css?raw';
import avatarStackCss from '../src/components/AvatarStack/AvatarStack.css?raw';
import avatarStackTsx from '../src/components/AvatarStack/AvatarStack.tsx?raw';
import breadcrumbsCss from '../src/components/Breadcrumbs/Breadcrumbs.css?raw';
import breadcrumbsTsx from '../src/components/Breadcrumbs/Breadcrumbs.tsx?raw';
import candidateCardCss from '../src/components/CandidateCard/CandidateCard.css?raw';
import candidateCardTsx from '../src/components/CandidateCard/CandidateCard.tsx?raw';
import topBarCss from '../src/components/TopBar/TopBar.css?raw';
import topBarTsx from '../src/components/TopBar/TopBar.tsx?raw';
import candidatesPageCss from '../src/templates/CandidatesPage/CandidatesPage.css?raw';
import candidatesPageTsx from '../src/templates/CandidatesPage/CandidatesPage.tsx?raw';
import liveTsx from './live.tsx?raw';
import { specs, variables, type SpecNode } from './figma-spec';

export type ComponentKey = keyof typeof specs;

/** Where in the spec a variable row's value lives */
type From = 'fill' | 'stroke' | 'text' | 'textStyle' | 'width' | 'height' | 'padding' | 'gap' | 'radius' | 'focusRing';

interface VarDef {
  label: string;
  from: From;
  /** A layer inside the component to read instead of its root, by name */
  layer?: string;
  /** The CSS rule and property that carry it in code */
  rule: string;
  prop: string;
  /** Kept on phones and tablets, where each side shows four rows */
  phone?: boolean;
}

interface PartDef {
  /** The part's name in Figma: its component set, or component */
  part: string;
  /** Where the line that places it is: the step's own source, or live.tsx when it fills a slot */
  source: 'own' | 'live';
  /** Text that picks the line, when the part is placed more than once */
  find?: string;
  phone?: boolean;
}

export interface FigmaValue {
  /** Variable code names (--air-…) or, for a text style, its name */
  tokens: string[];
  textStyle?: string;
}

export interface VarRow {
  kind: 'var';
  label: string;
  figma: FigmaValue;
  /** The declaration, as written in the stylesheet */
  css: { prop: string; value: string };
  phone: boolean;
}

export interface PartRow {
  kind: 'part';
  label: string;
  /** As in Figma: the name, the variant's properties and how many are placed */
  part: { name: string; props?: string; count: number };
  /** The line that places it, as written in the source */
  code: string;
  phone: boolean;
}

export type Row = VarRow | PartRow;

const sheets: Record<ComponentKey, string> = {
  Button: buttonCss,
  Badge: badgeCss,
  Tag: tagCss,
  Avatar: avatarCss,
  'Avatar stack': avatarStackCss,
  Breadcrumbs: breadcrumbsCss,
  'Candidate card': candidateCardCss,
  'Top bar': topBarCss,
  'Candidates page': candidatesPageCss,
};

const sources: Partial<Record<ComponentKey, string>> = {
  'Avatar stack': avatarStackTsx,
  Breadcrumbs: breadcrumbsTsx,
  'Candidate card': candidateCardTsx,
  'Top bar': topBarTsx,
  'Candidates page': candidatesPageTsx,
};

const v = (label: string, from: From, rule: string, prop: string, more: Partial<VarDef> = {}): VarDef => ({ label, from, rule, prop, ...more });
const p = (part: string, source: PartDef['source'], more: Partial<PartDef> = {}): PartDef => ({ part, source, ...more });

const defs: Record<ComponentKey, (VarDef | PartDef)[]> = {
  // Atoms: variables only
  Button: [
    v('Fill', 'fill', '.air-button--primary', '--button-bg', { phone: true }),
    v('Label', 'text', '.air-button--primary', '--button-fg', { phone: true }),
    v('Text style', 'textStyle', '.air-button', 'font'),
    v('Height', 'height', '.air-button', 'height', { phone: true }),
    v('Padding', 'padding', '.air-button', 'padding'),
    v('Gap', 'gap', '.air-button', 'gap'),
    v('Radius', 'radius', '.air-button', 'border-radius', { phone: true }),
    v('Focus ring', 'focusRing', '.air-button:focus-visible', 'box-shadow'),
  ],
  Badge: [
    v('Fill', 'fill', '.air-badge--success', '--badge-bg', { phone: true }),
    v('Stroke', 'stroke', '.air-badge--success', '--badge-border', { phone: true }),
    v('Label', 'text', '.air-badge--success', '--badge-fg', { phone: true }),
    v('Text style', 'textStyle', '.air-badge--m', 'font'),
    v('Padding', 'padding', '.air-badge', 'padding'),
    v('Gap', 'gap', '.air-badge', 'gap'),
    v('Radius', 'radius', '.air-badge', 'border-radius', { phone: true }),
  ],
  Tag: [
    v('Fill', 'fill', '.air-tag', 'background', { phone: true }),
    v('Label', 'text', '.air-tag', 'color', { phone: true }),
    v('Text style', 'textStyle', '.air-tag', 'font'),
    v('Padding', 'padding', '.air-tag', 'padding', { phone: true }),
    v('Gap', 'gap', '.air-tag', 'gap'),
    v('Radius', 'radius', '.air-tag', 'border-radius', { phone: true }),
    v('Focus ring', 'focusRing', 'button.air-tag:focus-visible', 'box-shadow'),
  ],
  Avatar: [
    v('Fill', 'fill', '.air-avatar', 'background', { phone: true }),
    v('Initials', 'text', '.air-avatar', 'color', { phone: true }),
    v('Text style', 'textStyle', '.air-avatar--l', 'font'),
    v('Width', 'width', '.air-avatar--l', 'width', { phone: true }),
    v('Height', 'height', '.air-avatar--l', 'height'),
    v('Radius', 'radius', '.air-avatar', 'border-radius', { phone: true }),
  ],
  // Molecules: a few atoms and a little layout
  'Avatar stack': [
    p('Avatar', 'own', { phone: true }),
    v('Overlap', 'gap', '.air-avatar-stack--m', '--stack-overlap', { phone: true }),
    v('Ring', 'padding', '.air-avatar-stack__ring', 'padding', { layer: 'Avatar 1', phone: true }),
    v('Ring fill', 'fill', '.air-avatar-stack__ring', 'background', { layer: 'Avatar 1' }),
    v('Radius', 'radius', '.air-avatar-stack__ring', 'border-radius', { layer: 'Avatar 1', phone: true }),
  ],
  Breadcrumbs: [
    p('Link', 'own', { phone: true }),
    p('Icon/chevron-right', 'own', { phone: true }),
    v('Gap', 'gap', '.air-breadcrumbs__list', 'gap', { phone: true }),
    v('Current', 'text', '.air-breadcrumbs__current', 'color', { phone: true }),
    v('Text style', 'textStyle', '.air-breadcrumbs__current', 'font'),
  ],
  // Organisms: molecules and atoms with a job of their own
  'Candidate card': [
    p('Avatar', 'own', { find: '<Avatar size="m"', phone: true }),
    p('Match grade', 'own', { phone: true }),
    p('Tag', 'own', { phone: true }),
    v('Fill', 'fill', '.air-candidate', 'background'),
    v('Stroke', 'stroke', '.air-candidate', 'border'),
    v('Radius', 'radius', '.air-candidate', 'border-radius', { phone: true }),
    v('Padding', 'padding', '.air-candidate', 'padding'),
  ],
  'Top bar': [
    p('Breadcrumbs', 'live', { find: 'const breadcrumbs = <Breadcrumbs', phone: true }),
    p('Command search', 'live', { find: 'const search = <CommandSearch', phone: true }),
    p('Icon button', 'own', { find: '<IconButton icon={CircleHelp}', phone: true }),
    p('Avatar', 'own', { phone: true }),
    v('Fill', 'fill', '.air-top-bar', 'background'),
    v('Stroke', 'stroke', '.air-top-bar', 'border-bottom'),
    v('Padding', 'padding', '.air-top-bar', 'padding'),
    v('Gap', 'gap', '.air-top-bar', 'gap'),
  ],
  // Template: organisms laid out as a page. Parts only, so the page gets room on the stage.
  'Candidates page': [
    p('Sidebar', 'own', { phone: true }),
    p('Top bar', 'own', { phone: true }),
    p('Page header', 'own', { phone: true }),
    p('Candidate card', 'own', { phone: true }),
  ],
};

const textNode = (spec: SpecNode) => spec.ch?.find((c) => c.k === 'Tex');
const firstToken = (s: string | undefined) => s?.split(' ')[0];
const isToken = (s: string | undefined): s is string => !!s && s !== '0' && s !== 'space-0' && !/^-?[\d.]+$/.test(s);

function findLayer(node: SpecNode, name: string): SpecNode | undefined {
  if (node.n === name) return node;
  for (const c of node.ch ?? []) {
    const hit = findLayer(c, name);
    if (hit) return hit;
  }
  return undefined;
}

function figmaValue(spec: SpecNode, from: From): FigmaValue {
  const al = spec.al ?? '';
  const sizes = Object.fromEntries((spec.szv ?? '').split(' ').filter(Boolean).map((x) => x.split(':')));
  const raw: Record<From, () => (string | undefined)[]> = {
    fill: () => [spec.bg],
    stroke: () => [firstToken(spec.st)],
    text: () => [textNode(spec)?.c],
    textStyle: () => [],
    width: () => [sizes.w],
    height: () => [sizes.h],
    // p<top>/<right>/<bottom>/<left>: the distinct variables, in that order
    padding: () => [...new Set(/ p(\S+)/.exec(al)?.[1].split('/'))],
    gap: () => [/ g(\S+)/.exec(al)?.[1]],
    radius: () => [spec.r === undefined ? undefined : String(spec.r)],
    focusRing: () => [firstToken(spec.ch?.find((c) => c.n === 'Focus ring')?.st)],
  };
  if (from === 'textStyle') return { tokens: [], textStyle: textNode(spec)?.ts };
  return { tokens: raw[from]().filter(isToken) };
}

/** Visible instances of a part, not counting ones inside hidden layers */
function instances(node: SpecNode, part: string, out: SpecNode[] = []): SpecNode[] {
  if (node.hid) return out;
  if (node.is && node.is.split(': ')[0] === part) out.push(node);
  for (const c of node.ch ?? []) instances(c, part, out);
  return out;
}

/** "Match grade" → MatchGrade, "Icon/chevron-right" → ChevronRight */
const jsxName = (part: string) =>
  part
    .replace(/^Icon\//, '')
    .split(/[\s-]+/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('');

/** The declaration of `prop` in the rule whose selector list includes `rule` */
function declaration(css: string, rule: string, prop: string) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, selectors, body] of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!selectors.split(',').some((s) => s.trim() === rule)) continue;
    for (const d of body.split(';')) {
      const i = d.indexOf(':');
      if (i > 0 && d.slice(0, i).trim() === prop) return { prop, value: d.slice(i + 1).trim() };
    }
  }
  throw new Error(`Figma to code: no "${prop}" in "${rule}"`);
}

/** The code variable a row's value should use: the Figma variable, its text style, or the focus ring effect */
const expected = (def: VarDef, f: FigmaValue) =>
  def.from === 'textStyle'
    ? [`font-${(f.textStyle ?? '').toLowerCase().replace(/[/\s]+/g, '-')}`]
    : def.from === 'focusRing'
      ? ['effect-focus-ring']
      : f.tokens;

function varRow(key: ComponentKey, root: SpecNode, def: VarDef): VarRow {
  const node = def.layer ? findLayer(root, def.layer) : root;
  if (!node) throw new Error(`Figma to code: ${key} has no layer "${def.layer}"`);
  const figma = figmaValue(node, def.from);
  if (!figma.tokens.length && !figma.textStyle) throw new Error(`Figma to code: ${key} ${def.label} has no variable in Figma`);
  const css = declaration(sheets[key], def.rule, def.prop);
  for (const token of expected(def, figma)) {
    if (!css.value.includes(`var(--air-${token})`)) throw new Error(`Figma to code: ${key} ${def.label} is ${token} in Figma, "${css.value}" in code`);
  }
  return { kind: 'var', label: def.label, figma, css, phone: !!def.phone };
}

function partRow(key: ComponentKey, root: SpecNode, def: PartDef, first: boolean): PartRow {
  const found = instances(root, def.part);
  if (!found.length) throw new Error(`Figma to code: ${key} isn't built from ${def.part} in Figma`);
  const props = found[0]
    .is!.split(': ')[1]
    ?.split(', ')
    .filter((x) => x !== 'State=Default')
    .join(' · ');
  const source = def.source === 'live' ? liveTsx : sources[key];
  const tag = `<${jsxName(def.part)}`;
  // A JSX tag, so a type like NonNullable<CandidateCardProps> doesn't count
  const placed = new RegExp(`${tag}[\\s/>]`);
  const line = source?.split('\n').find((l) => placed.test(l) && (!def.find || l.includes(def.find)));
  if (!line) throw new Error(`Figma to code: ${key} doesn't place ${tag} in code`);
  return { kind: 'part', label: first ? 'Built from' : '', part: { name: def.part, props: props || undefined, count: found.length }, code: line.trim(), phone: !!def.phone };
}

export function rowsFor(key: ComponentKey): Row[] {
  const root = specs[key].spec as SpecNode;
  let parts = 0;
  return defs[key].map((def) => ('part' in def ? partRow(key, root, def, parts++ === 0) : varRow(key, root, def)));
}

/** "size/control-md · 40"; no value when the name ends in it, like space/16 */
export function variableLabel(code: string) {
  const v = variables[code];
  if (!v) return code;
  return v.type === 'FLOAT' && !v.name.endsWith(`/${v.value}`) ? `${v.name} · ${v.value}` : v.name;
}

export const swatch = (code: string) => (variables[code]?.type === 'COLOR' ? String(variables[code].value) : undefined);
