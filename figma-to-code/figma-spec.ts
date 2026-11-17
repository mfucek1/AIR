// What Figma says about the four components, as read from the AIR Figma file on 17 Nov 2026.
//
// specs: scripts/figma-component-spec.js with
//   SETS = ['9045:975', '9066:2765', '9051:1365', '9051:1490']
//   BASE = { '9066:2765': 'Tone=Success, Size=M, Inverse=False', '9051:1490': 'Size=L, Type=Initials' }
// keeping each set's id, base variant and base tree (the per-variant diffs aren't used here).
// Keys are the script's: bg fill, st stroke, r radius, al layout (gap g, padding p t/r/b/l),
// szv size variables, ts text style, c text colour. Values are variables' code names (--air-…).
//
// variables: the Figma name and Light value of each variable those trees use (AIR · Color,
// AIR · Size), read with the Plugin API from the same file.
//
// drawn/*.svg: each base variant exported as SVG from a temporary instance with the labels
// below (Add candidate, Hired, TypeScript, LH), removed again after the export.
// To refresh: run the script with the SETS and BASE above and paste the base trees here.

export interface SpecNode {
  k: string;
  n: string;
  sz: string;
  hid?: number;
  szv?: string;
  al?: string;
  lz?: string;
  abs?: string;
  bg?: string;
  st?: string;
  r?: string | number;
  tint?: string;
  t?: string;
  ts?: string;
  c?: string;
  is?: string;
  pr?: string;
  ch?: SpecNode[];
}

export interface SpecSet {
  id: string;
  base: string;
  spec: SpecNode;
}

export const specs = {
  Button: {
    id: '9045:975',
    base: 'Type=Primary, Tone=Default, Size=M, State=Default',
    spec: {
      k: 'Com',
      n: 'Type=Primary, Tone=Default, Size=M, ',
      sz: '77x40',
      szv: 'h:size-control-md',
      al: 'H gspace-8 p0/space-16/0/space-16 CC',
      bg: 'action-primary',
      r: 'radius-sm',
      tint: 'Inverse',
      ch: [
        { k: 'Ins', n: 'Leading icon', hid: 1, sz: '20x20', lz: 'FF', is: 'Icon/plus: Size=16', pr: 'v:Show leading icon,m:Leading icon' },
        { k: 'Tex', n: 'Label', sz: '45x20', lz: 'HH', t: 'Button', ts: 'Body/M Strong', c: 'text-on-action', pr: 'c:Label' },
        { k: 'Ins', n: 'Trailing icon', hid: 1, sz: '20x20', lz: 'FF', is: 'Icon/chevron-down: Size=16', pr: 'v:Show trailing icon,m:Trailing icon' },
        { k: 'Fra', n: 'Focus ring', hid: 1, sz: '85x48', lz: 'FF', abs: '-4,-4', st: 'border-focus 2I', r: 'radius-focus', pr: 'v:Focus ring', ch: [] },
      ],
    },
  },
  Badge: {
    id: '9066:2765',
    base: 'Tone=Success, Size=M, Inverse=False',
    spec: {
      k: 'Com',
      n: 'Tone=Success, Size=M, Inverse=False',
      sz: '55x26',
      al: 'H gspace-4 pspace-2/space-8/space-2/space-8 CC',
      bg: 'success-bg',
      st: 'success-border 1I',
      r: 'radius-full',
      tint: 'Success',
      ch: [
        { k: 'Ins', n: 'Icon', hid: 1, sz: '16x16', lz: 'FF', is: 'Icon/circle-check: Size=16', pr: 'v:Show icon' },
        { k: 'Tex', n: 'Label', sz: '37x20', lz: 'HH', t: 'Label', ts: 'Body/M Strong', c: 'success-text', pr: 'c:Label' },
      ],
    },
  },
  Tag: {
    id: '9051:1365',
    base: 'State=Default',
    spec: {
      k: 'Com',
      n: 'State=Default',
      sz: '41x24',
      al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC',
      bg: 'tag-bg',
      st: 'tag-bg 1I',
      r: 'radius-sm',
      tint: 'Muted',
      ch: [
        { k: 'Tex', n: 'Label', sz: '23x18', lz: 'HH', t: 'Tag', ts: 'Body/S', c: 'tag-text', pr: 'c:Label' },
        { k: 'Ins', n: 'Remove', hid: 1, sz: '14x14', lz: 'FF', is: 'Icon/x: Size=14', pr: 'v:Removable' },
        { k: 'Fra', n: 'Focus ring', hid: 1, sz: '49x32', lz: 'FF', abs: '-4,-4', st: 'border-focus 2I', r: 'radius-focus', pr: 'v:Focus ring', ch: [] },
      ],
    },
  },
  Avatar: {
    id: '9051:1490',
    base: 'Size=L, Type=Initials',
    spec: {
      k: 'Com',
      n: 'Size=L, Type=Initials',
      sz: '48x48',
      szv: 'w:size-avatar-lg h:size-avatar-lg',
      al: 'H g0 p0/0/0/0 CC',
      bg: 'brand-paper-strong',
      r: 'radius-full',
      tint: 'Default',
      ch: [{ k: 'Tex', n: 'Initials', sz: '30x28', lz: 'HH', t: 'MF', ts: 'Title/M', c: 'brand-ink', pr: 'c:Initials' }],
    },
  },
} satisfies Record<string, SpecSet>;

export interface FigmaVariable {
  name: string;
  type: 'COLOR' | 'FLOAT';
  value: string | number;
}

export const variables: Record<string, FigmaVariable> = {
  'action-primary': { name: 'action/primary', type: 'COLOR', value: '#005f7d' },
  'text-on-action': { name: 'text/on-action', type: 'COLOR', value: '#ffffff' },
  'border-focus': { name: 'border/focus', type: 'COLOR', value: '#0093bf' },
  'success-bg': { name: 'success/bg', type: 'COLOR', value: '#eefbf1' },
  'success-border': { name: 'success/border', type: 'COLOR', value: '#bceac7' },
  'success-text': { name: 'success/text', type: 'COLOR', value: '#006933' },
  'tag-bg': { name: 'tag/bg', type: 'COLOR', value: '#eaeef0' },
  'tag-text': { name: 'tag/text', type: 'COLOR', value: '#3e4d54' },
  'brand-paper-strong': { name: 'brand/paper-strong', type: 'COLOR', value: '#f2e8da' },
  'brand-ink': { name: 'brand/ink', type: 'COLOR', value: '#002432' },
  'space-2': { name: 'space/2', type: 'FLOAT', value: 2 },
  'space-4': { name: 'space/4', type: 'FLOAT', value: 4 },
  'space-8': { name: 'space/8', type: 'FLOAT', value: 8 },
  'space-16': { name: 'space/16', type: 'FLOAT', value: 16 },
  'radius-sm': { name: 'radius/sm', type: 'FLOAT', value: 4 },
  'radius-full': { name: 'radius/full', type: 'FLOAT', value: 999 },
  'size-control-md': { name: 'size/control-md', type: 'FLOAT', value: 40 },
  'size-avatar-lg': { name: 'size/avatar-lg', type: 'FLOAT', value: 48 },
};
