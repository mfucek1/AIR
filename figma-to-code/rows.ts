// One row per variable bound to the component in Figma: the value comes from the spec script's
// output (figma-spec.ts), the CSS line from the component's own stylesheet, read as text. If a
// stylesheet stops using the variable Figma binds, building the rows throws, so the page can't
// show a pair that doesn't match.
import buttonCss from '../src/components/Button/Button.css?raw';
import badgeCss from '../src/components/Badge/Badge.css?raw';
import tagCss from '../src/components/Tag/Tag.css?raw';
import avatarCss from '../src/components/Avatar/Avatar.css?raw';
import { specs, variables, type SpecNode } from './figma-spec';

export type ComponentKey = keyof typeof specs;

/** Where in the spec a row's value lives */
type From = 'fill' | 'stroke' | 'text' | 'textStyle' | 'width' | 'height' | 'padding' | 'gap' | 'radius' | 'focusRing';

interface RowDef {
  label: string;
  from: From;
  /** The CSS rule and property that carry it in code */
  rule: string;
  prop: string;
  /** Kept on phones, where each side shows four rows */
  phone?: boolean;
}

export interface FigmaValue {
  /** Variable code names (--air-…) or, for a text style, its name */
  tokens: string[];
  textStyle?: string;
}

export interface Row {
  label: string;
  figma: FigmaValue;
  /** The declaration, as written in the stylesheet */
  css: { prop: string; value: string };
  phone: boolean;
}

const sheets: Record<ComponentKey, string> = { Button: buttonCss, Badge: badgeCss, Tag: tagCss, Avatar: avatarCss };

const defs: Record<ComponentKey, RowDef[]> = {
  Button: [
    { label: 'Fill', from: 'fill', rule: '.air-button--primary', prop: '--button-bg', phone: true },
    { label: 'Label', from: 'text', rule: '.air-button--primary', prop: '--button-fg', phone: true },
    { label: 'Text style', from: 'textStyle', rule: '.air-button', prop: 'font' },
    { label: 'Height', from: 'height', rule: '.air-button', prop: 'height', phone: true },
    { label: 'Padding', from: 'padding', rule: '.air-button', prop: 'padding' },
    { label: 'Gap', from: 'gap', rule: '.air-button', prop: 'gap' },
    { label: 'Radius', from: 'radius', rule: '.air-button', prop: 'border-radius', phone: true },
    { label: 'Focus ring', from: 'focusRing', rule: '.air-button:focus-visible', prop: 'box-shadow' },
  ],
  Badge: [
    { label: 'Fill', from: 'fill', rule: '.air-badge--success', prop: '--badge-bg', phone: true },
    { label: 'Stroke', from: 'stroke', rule: '.air-badge--success', prop: '--badge-border', phone: true },
    { label: 'Label', from: 'text', rule: '.air-badge--success', prop: '--badge-fg', phone: true },
    { label: 'Text style', from: 'textStyle', rule: '.air-badge--m', prop: 'font' },
    { label: 'Padding', from: 'padding', rule: '.air-badge', prop: 'padding' },
    { label: 'Gap', from: 'gap', rule: '.air-badge', prop: 'gap' },
    { label: 'Radius', from: 'radius', rule: '.air-badge', prop: 'border-radius', phone: true },
  ],
  Tag: [
    { label: 'Fill', from: 'fill', rule: '.air-tag', prop: 'background', phone: true },
    { label: 'Label', from: 'text', rule: '.air-tag', prop: 'color', phone: true },
    { label: 'Text style', from: 'textStyle', rule: '.air-tag', prop: 'font' },
    { label: 'Padding', from: 'padding', rule: '.air-tag', prop: 'padding', phone: true },
    { label: 'Gap', from: 'gap', rule: '.air-tag', prop: 'gap' },
    { label: 'Radius', from: 'radius', rule: '.air-tag', prop: 'border-radius', phone: true },
    { label: 'Focus ring', from: 'focusRing', rule: 'button.air-tag:focus-visible', prop: 'box-shadow' },
  ],
  Avatar: [
    { label: 'Fill', from: 'fill', rule: '.air-avatar', prop: 'background', phone: true },
    { label: 'Initials', from: 'text', rule: '.air-avatar', prop: 'color', phone: true },
    { label: 'Text style', from: 'textStyle', rule: '.air-avatar--l', prop: 'font' },
    { label: 'Width', from: 'width', rule: '.air-avatar--l', prop: 'width', phone: true },
    { label: 'Height', from: 'height', rule: '.air-avatar--l', prop: 'height' },
    { label: 'Radius', from: 'radius', rule: '.air-avatar', prop: 'border-radius', phone: true },
  ],
};

const textNode = (spec: SpecNode) => spec.ch?.find((c) => c.k === 'Tex');
const firstToken = (s: string | undefined) => s?.split(' ')[0];
const isToken = (s: string | undefined): s is string => !!s && s !== '0' && s !== 'space-0' && !/^[\d.]+$/.test(s);

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
    // p<top>/<right>/<bottom>/<left>: the distinct variables, vertical first
    padding: () => [...new Set(/ p(\S+)/.exec(al)?.[1].split('/'))],
    gap: () => [/ g(\S+)/.exec(al)?.[1]],
    radius: () => [spec.r === undefined ? undefined : String(spec.r)],
    focusRing: () => [firstToken(spec.ch?.find((c) => c.n === 'Focus ring')?.st)],
  };
  if (from === 'textStyle') return { tokens: [], textStyle: textNode(spec)?.ts };
  return { tokens: raw[from]().filter(isToken) };
}

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
const expected = (row: RowDef, f: FigmaValue) =>
  row.from === 'textStyle'
    ? [`font-${(f.textStyle ?? '').toLowerCase().replace(/[/\s]+/g, '-')}`]
    : row.from === 'focusRing'
      ? ['effect-focus-ring']
      : f.tokens;

export function rowsFor(key: ComponentKey): Row[] {
  const spec = specs[key].spec;
  return defs[key].map((def) => {
    const figma = figmaValue(spec, def.from);
    const css = declaration(sheets[key], def.rule, def.prop);
    for (const token of expected(def, figma)) {
      if (!css.value.includes(`var(--air-${token})`)) throw new Error(`Figma to code: ${key} ${def.label} is ${token} in Figma, "${css.value}" in code`);
    }
    if (!figma.tokens.length && !figma.textStyle) throw new Error(`Figma to code: ${key} ${def.label} has no variable in Figma`);
    return { label: def.label, figma, css, phone: !!def.phone };
  });
}

/** "size/control-md · 40"; no value when the name ends in it, like space/16 */
export function variableLabel(code: string) {
  const v = variables[code];
  if (!v) return code;
  return v.type === 'FLOAT' && !v.name.endsWith(`/${v.value}`) ? `${v.name} · ${v.value}` : v.name;
}

export const swatch = (code: string) => (variables[code]?.type === 'COLOR' ? String(variables[code].value) : undefined);
