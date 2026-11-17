// Two kinds of row, read from both sides and checked against each other when the page loads:
// - a variable bound in Figma (from figma-spec.ts) beside the CSS declaration that uses it, read
//   from the component's own stylesheet;
// - from molecules up, a part the step is built from (an instance in Figma) beside the line of
//   code that places it, read from the component's own source, or live.tsx where the part fills
//   a slot.
// If a stylesheet stops using the variable Figma binds, or a part isn't placed where the row says,
// building the rows throws, so the page can't show a pair that doesn't match.
import buttonCss from '../src/components/Button/Button.css?raw';
import tagCss from '../src/components/Tag/Tag.css?raw';
import switchCss from '../src/components/Switch/Switch.css?raw';
import avatarStackCss from '../src/components/AvatarStack/AvatarStack.css?raw';
import avatarStackTsx from '../src/components/AvatarStack/AvatarStack.tsx?raw';
import segmentedCss from '../src/components/SegmentedControl/SegmentedControl.css?raw';
import segmentedTsx from '../src/components/SegmentedControl/SegmentedControl.tsx?raw';
import selectCss from '../src/components/Select/Select.css?raw';
import selectTsx from '../src/components/Select/Select.tsx?raw';
import fieldCss from '../src/components/Field/Field.css?raw';
import menuCss from '../src/components/Menu/Menu.css?raw';
import topBarCss from '../src/components/TopBar/TopBar.css?raw';
import topBarTsx from '../src/components/TopBar/TopBar.tsx?raw';
import candidateCardCss from '../src/components/CandidateCard/CandidateCard.css?raw';
import candidateCardTsx from '../src/components/CandidateCard/CandidateCard.tsx?raw';
import liveTsx from './live.tsx?raw';
import { specs, variables, type SpecNode } from './figma-spec';

export type ComponentKey = keyof typeof specs;

/** Where in the spec a variable row's value lives */
type From = 'fill' | 'stroke' | 'text' | 'textStyle' | 'effect' | 'width' | 'height' | 'padding' | 'gap' | 'radius' | 'focusRing';

interface VarDef {
  label: string;
  from: From;
  /** A layer inside the component to read instead of its root, by name */
  layer?: string;
  /** The CSS rule and property that carry it in code */
  rule: string;
  prop: string;
  /** Another stylesheet than the step's own, like Field's for the Select's label and helper */
  sheet?: 'field';
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
  /** The JSX tag, when it isn't the part's name (the Select's leading icon is <Leading>) */
  jsx?: string;
  phone?: boolean;
}

export interface FigmaValue {
  /** Variable code names (--air-…) */
  tokens: string[];
  /** Or a text or effect style's name */
  style?: string;
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
  Tag: tagCss,
  Switch: switchCss,
  'Avatar stack': avatarStackCss,
  'Segmented control': segmentedCss,
  Select: selectCss,
  Menu: menuCss,
  'Top bar': topBarCss,
  'Candidate card': candidateCardCss,
};

const otherSheets = { field: fieldCss };

const sources: Partial<Record<ComponentKey, string>> = {
  'Avatar stack': avatarStackTsx,
  'Segmented control': segmentedTsx,
  Select: selectTsx,
  'Top bar': topBarTsx,
  'Candidate card': candidateCardTsx,
};

/** Boolean properties each step turns on in its drawing and live render; the layers they show count as visible */
const turnedOn: Partial<Record<ComponentKey, string[]>> = {
  Tag: ['Removable'],
  Select: ['Show leading icon', 'Required', 'Show helper'],
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
  Tag: [
    v('Fill', 'fill', '.air-tag', 'background', { phone: true }),
    v('Label', 'text', '.air-tag', 'color', { phone: true }),
    v('Text style', 'textStyle', '.air-tag', 'font'),
    v('Padding', 'padding', '.air-tag', 'padding', { phone: true }),
    v('Gap', 'gap', '.air-tag', 'gap'),
    v('Radius', 'radius', '.air-tag', 'border-radius', { phone: true }),
    v('Focus ring', 'focusRing', '.air-tag__remove:focus-visible', 'box-shadow'),
  ],
  Switch: [
    v('Track', 'fill', '.air-switch__input:checked + .air-switch__track', 'background', { layer: 'Track', phone: true }),
    v('Knob', 'fill', '.air-switch__knob', 'background', { layer: 'Knob', phone: true }),
    v('Knob shadow', 'effect', '.air-switch__knob', 'box-shadow', { layer: 'Knob' }),
    v('Padding', 'padding', '.air-switch__track', 'padding', { layer: 'Track' }),
    v('Radius', 'radius', '.air-switch__track', 'border-radius', { layer: 'Track', phone: true }),
    v('Gap', 'gap', '.air-switch', 'gap'),
    v('Label', 'text', '.air-switch', 'color', { phone: true }),
    v('Focus ring', 'focusRing', '.air-switch__input:focus-visible + .air-switch__track', 'box-shadow', { layer: 'Track' }),
  ],
  // Molecules: a few atoms and a little layout
  'Avatar stack': [
    p('Avatar', 'own', { phone: true }),
    v('Overlap', 'gap', '.air-avatar-stack--m', '--stack-overlap', { phone: true }),
    v('Ring', 'padding', '.air-avatar-stack__ring', 'padding', { layer: 'Avatar 1', phone: true }),
    v('Ring fill', 'fill', '.air-avatar-stack__ring', 'background', { layer: 'Avatar 1' }),
    v('Radius', 'radius', '.air-avatar-stack__ring', 'border-radius', { layer: 'Avatar 1', phone: true }),
  ],
  'Segmented control': [
    p('Segment', 'own', { phone: true }),
    v('Fill', 'fill', '.air-segmented', 'background', { phone: true }),
    v('Padding', 'padding', '.air-segmented', 'padding'),
    v('Gap', 'gap', '.air-segmented', 'gap'),
    v('Radius', 'radius', '.air-segmented', 'border-radius', { phone: true }),
    v('Selected', 'fill', ".air-segment[aria-checked='true']", 'background', { layer: 'Segment 1', phone: true }),
    v('Shadow', 'effect', ".air-segment[aria-checked='true']", 'box-shadow', { layer: 'Segment 1' }),
  ],
  Select: [
    p('Icon/briefcase', 'own', { jsx: 'Leading', phone: true }),
    p('Icon/chevron-down', 'own'),
    v('Label', 'textStyle', '.air-field__label', 'font', { layer: 'Label', sheet: 'field' }),
    v('Required', 'text', '.air-field__required', 'color', { layer: 'Required', sheet: 'field', phone: true }),
    v('Border', 'stroke', '.air-field-box', '--box-border', { layer: 'Field', sheet: 'field', phone: true }),
    v('Height', 'height', '.air-field-box', 'min-height', { layer: 'Field', sheet: 'field' }),
    v('Radius', 'radius', '.air-field-box', 'border-radius', { layer: 'Field', sheet: 'field' }),
    v('Helper', 'text', '.air-field__helper', 'color', { layer: 'Helper', sheet: 'field', phone: true }),
  ],
  // Organisms: molecules and atoms with a job of their own, the last and biggest built from eight kinds of part
  Menu: [
    p('Menu item', 'live', { phone: true }),
    p('Divider', 'live', { phone: true }),
    v('Fill', 'fill', '.air-menu', 'background', { phone: true }),
    v('Stroke', 'stroke', '.air-menu', 'border'),
    v('Radius', 'radius', '.air-menu', 'border-radius'),
    v('Padding', 'padding', '.air-menu', 'padding'),
    v('Shadow', 'effect', '.air-menu', 'box-shadow', { phone: true }),
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
  // Parts only: eight kinds, so the card gets room on the stage
  'Candidate card': [
    p('Avatar', 'own', { find: '<Avatar size="l"', phone: true }),
    p('Link', 'own', { find: '{role && <Link' }),
    p('Rating', 'own'),
    p('Button', 'own', { find: 'tone="danger"', phone: true }),
    p('Stage path', 'own', { phone: true }),
    p('Badge', 'own'),
    p('Tag', 'own', { find: '<Tag>{s}</Tag>', phone: true }),
    p('Icon button', 'own', { find: 'LinkedIn' }),
  ],
};

const textNode = (spec: SpecNode) => (spec.k === 'Tex' ? spec : spec.ch?.find((c) => c.k === 'Tex'));
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
    effect: () => [],
    width: () => [sizes.w],
    height: () => [sizes.h],
    // p<top>/<right>/<bottom>/<left>: the distinct variables, in that order
    padding: () => [...new Set(/ p(\S+)/.exec(al)?.[1].split('/'))],
    gap: () => [/ g(\S+)/.exec(al)?.[1]],
    radius: () => [spec.r === undefined ? undefined : String(spec.r)],
    focusRing: () => [firstToken(spec.ch?.find((c) => c.n === 'Focus ring')?.st)],
  };
  if (from === 'textStyle') return { tokens: [], style: textNode(spec)?.ts };
  if (from === 'effect') return { tokens: [], style: spec.fx };
  return { tokens: raw[from]().filter(isToken) };
}

/** Hidden in the base tree, and not shown by a property the step turns on */
const hidden = (node: SpecNode, on: string[]) => !!node.hid && !on.some((prop) => node.pr?.split(',').includes(`v:${prop}`));

/** Visible instances of a part, not counting ones inside hidden layers */
function instances(node: SpecNode, part: string, on: string[], out: SpecNode[] = []): SpecNode[] {
  if (hidden(node, on)) return out;
  if (node.is && node.is.split(': ')[0] === part) out.push(node);
  for (const c of node.ch ?? []) instances(c, part, on, out);
  return out;
}

/** The variant properties every instance shares, leaving out State */
function commonProps(found: SpecNode[]) {
  const lists = found.map((n) => (n.is!.split(': ')[1] ?? '').split(', ').filter((x) => x && !x.startsWith('State=')));
  return lists[0].filter((x) => lists.every((l) => l.includes(x))).join(' · ');
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
const slug = (style = '') => style.toLowerCase().replace(/[/\s]+/g, '-');
const expected = (def: VarDef, f: FigmaValue) =>
  def.from === 'textStyle' ? [`font-${slug(f.style)}`] : def.from === 'effect' ? [`effect-${slug(f.style)}`] : def.from === 'focusRing' ? ['effect-focus-ring'] : f.tokens;

function varRow(key: ComponentKey, root: SpecNode, def: VarDef): VarRow {
  const node = def.layer ? findLayer(root, def.layer) : root;
  if (!node) throw new Error(`Figma to code: ${key} has no layer "${def.layer}"`);
  const figma = figmaValue(node, def.from);
  if (!figma.tokens.length && !figma.style) throw new Error(`Figma to code: ${key} ${def.label} has no variable or style in Figma`);
  const css = declaration(def.sheet ? otherSheets[def.sheet] : sheets[key], def.rule, def.prop);
  for (const token of expected(def, figma)) {
    if (!css.value.includes(`var(--air-${token})`)) throw new Error(`Figma to code: ${key} ${def.label} is ${token} in Figma, "${css.value}" in code`);
  }
  return { kind: 'var', label: def.label, figma, css, phone: !!def.phone };
}

function partRow(key: ComponentKey, root: SpecNode, def: PartDef, first: boolean): PartRow {
  const found = instances(root, def.part, turnedOn[key] ?? []);
  if (!found.length) throw new Error(`Figma to code: ${key} isn't built from ${def.part} in Figma`);
  const source = def.source === 'live' ? liveTsx : sources[key];
  const tag = `<${def.jsx ?? jsxName(def.part)}`;
  // A JSX tag, so a type like NonNullable<CandidateCardProps> doesn't count
  const placed = new RegExp(`${tag}[\\s/>]`);
  const line = source?.split('\n').find((l) => placed.test(l) && (!def.find || l.includes(def.find)));
  if (!line) throw new Error(`Figma to code: ${key} doesn't place ${tag} in code`);
  return { kind: 'part', label: first ? 'Built from' : '', part: { name: def.part, props: commonProps(found) || undefined, count: found.length }, code: line.trim(), phone: !!def.phone };
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
