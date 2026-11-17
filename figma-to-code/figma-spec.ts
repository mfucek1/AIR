// What Figma says about the nine steps, as read from the AIR Figma file on 17 Nov 2026.
//
// specs: scripts/figma-component-spec.js, keeping each set's id, base variant and base tree
// (the per-variant diffs aren't used here). Two runs:
//   atoms:  SETS = ['9045:975', '9066:2765', '9051:1365', '9051:1490']
//           BASE = { '9066:2765': 'Tone=Success, Size=M, Inverse=False', '9051:1490': 'Size=L, Type=Initials' }
//   above:  SETS = ['9073:2853', '9108:4917', '9125:6180', '9122:29428', '9128:6474']
//           BASE = { '9073:2853': 'Size=M', '9122:29428': 'Type=Page' }
//           (9128:6474 is the Candidates screen, "After · Candidates" on Refresh 2026: a frame, not a set)
// Keys are the script's: bg fill, st stroke, r radius, al layout (gap g, padding p t/r/b/l),
// szv size variables, ts text style, c text colour. Values are variables' code names (--air-…).
//
// variables: the Figma name and Light value of each variable those trees use (AIR · Color,
// AIR · Size), read with the Plugin API from the same file.
//
// drawn/: the atoms as SVG from temporary instances with the labels below (Add candidate, Hired,
// TypeScript, LH), removed after the export; Avatar stack as SVG; Breadcrumbs, Candidate card and
// Top bar at 2x from instances scaled 2x in a temporary frame, also removed; the Candidates screen
// at 1x (it is always shown scaled down).
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
  /** The variant read; none for a screen (a frame) */
  base?: string;
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
  'Avatar stack': {
    id: '9073:2853',
    base: 'Size=M',
    spec: {
      k: 'Com', n: 'Size=M', sz: '148x36', al: 'H goverlap-8 p0/0/0/0 MC',
      ch: [1, 2, 3, 4].map((i): SpecNode => ({
        k: 'Fra', n: 'Avatar ' + i, sz: '36x36', al: 'H g0 pspace-2/space-2/space-2/space-2 MM', lz: 'HH', bg: 'bg-surface', r: 'radius-full', ...(i === 4 ? { pr: 'v:Show avatar 4' } : {}),
        ch: [{ k: 'Ins', n: 'Avatar', sz: '32x32', szv: 'w:size-avatar-md h:size-avatar-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', bg: 'brand-paper-strong', r: 'radius-full', tint: 'Default', is: 'Avatar: Size=M, Type=Initials' }],
      })).concat([
        { k: 'Fra', n: 'More', sz: '36x36', al: 'H g0 pspace-2/space-2/space-2/space-2 MM', lz: 'HH', bg: 'bg-surface', r: 'radius-full', pr: 'v:Show more', ch: [{ k: 'Fra', n: 'Bubble', sz: '32x32', szv: 'w:size-avatar-md h:size-avatar-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', bg: 'tag-bg', r: 'radius-full', ch: [{ k: 'Tex', n: 'Count', sz: '19x20', lz: 'HH', t: '+3', ts: 'Body/M Strong', c: 'tag-text', pr: 'c:More' }] }] } satisfies SpecNode,
      ]),
    },
  },
  Breadcrumbs: {
    id: '9108:4917',
    spec: {
      k: 'Com', n: 'Breadcrumbs', sz: '309x18', al: 'H gspace-4 p0/0/0/0 MC', lz: 'HH', tint: 'Muted',
      ch: [
        { k: 'Ins', n: 'Item 1', sz: '30x18', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Default', is: 'Link: Type=Neutral, Size=S, State=Default', pr: 'v:Show item 1' },
        { k: 'Ins', n: 'Separator', sz: '16x16', lz: 'FF', is: 'Icon/chevron-right: Size=16', pr: 'v:Show item 1' },
        { k: 'Ins', n: 'Item 2', sz: '165x18', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Default', is: 'Link: Type=Neutral, Size=S, State=Default', pr: 'v:Show item 2' },
        { k: 'Ins', n: 'Separator', sz: '16x16', lz: 'FF', is: 'Icon/chevron-right: Size=16', pr: 'v:Show item 2' },
        { k: 'Tex', n: 'Current', sz: '66x18', lz: 'HH', t: 'Mate Plate', ts: 'Body/S', c: 'text-primary', pr: 'c:Current' },
      ],
    },
  },
  'Candidate card': {
    id: '9125:6180',
    base: 'Type=Board',
    spec: {
      k: 'Com', n: 'Type=Board', sz: '320x176', al: 'V gspace-12 pspace-16/space-16/space-16/space-16 MM', bg: 'bg-surface', st: 'border-subtle 1I', r: 'radius-lg',
      ch: [
        { k: 'Fra', n: 'Title row', sz: '286x32', al: 'H gspace-8 p0/0/0/0 MC', lz: 'FH', ch: [
          { k: 'Ins', n: 'Avatar', sz: '32x32', szv: 'w:size-avatar-md h:size-avatar-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', bg: 'IMAGE', st: 'border-subtle 1I', r: 'radius-full', tint: 'Default', is: 'Avatar: Size=M, Type=Image' },
          { k: 'Tex', n: 'Name', sz: '82x24', lz: 'HH', t: 'Mate Plate', ts: 'Title/S', c: 'text-primary', pr: 'c:Name' },
          { k: 'Ins', n: 'Match', sz: '102x22', al: 'H gspace-4 pspace-2/space-8/space-2/space-8 MC', lz: 'HH', bg: 'info-bg', st: 'info-border 1I', r: 'radius-full', tint: 'Action', is: 'Match grade: Level=Partial, State=Default' },
        ] },
        { k: 'Fra', n: 'Technical skills', sz: '286x48', al: 'V gspace-8 p0/0/0/0 MM', lz: 'FH', ch: [
          { k: 'Tex', n: 'Label', sz: '88x16', lz: 'HH', t: 'Technical skills', ts: 'Caption', c: 'text-muted' },
          { k: 'Fra', n: 'Tags', sz: '286x24', al: 'H gspace-8 p0/0/0/0 MM', lz: 'FH', ch: ([['Tag 1', '44x24'], ['Tag 2', '62x24'], ['Tag 3', '27x24'], ['Tag 4', '67x24', 'v:Show tag 4'], ['Tag 5', '64x24', 'v:Show tag 5'], ['More', '33x24', 'v:Show more']] as const).map(([n, sz, pr]) => ({
            k: 'Ins', n, sz, al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default', ...(n === 'Tag 5' ? { hid: 1 } : {}), ...(pr ? { pr } : {}),
          })) },
        ] },
        // Fields' children (Applied on, Expected salary, In stage) left out: no row reads them.
        { k: 'Fra', n: 'Fields', sz: '286x38', al: 'H gspace-24 p0/0/0/0 MM', lz: 'FH' },
      ],
    },
  },
  'Top bar': {
    id: '9122:29428',
    base: 'Type=Page',
    spec: {
      k: 'Com', n: 'Type=Page', sz: '1200x56', al: 'H gspace-8 p0/space-24/0/space-24 MC', bg: 'bg-surface', st: 'border-subtle 0/0/1/0I',
      ch: [
        { k: 'Ins', n: 'Breadcrumbs', sz: '672x18', al: 'H gspace-4 p0/0/0/0 MC', lz: 'FH', tint: 'Muted', is: 'Breadcrumbs' },
        { k: 'Ins', n: 'Command search', sz: '320x32', szv: 'h:size-control-sm', al: 'H gspace-8 p0/space-4/0/space-12 MC', lz: 'FF', bg: 'bg-canvas', st: 'border-subtle 1I', r: 'radius-md', tint: 'Muted', is: 'Command search: State=Default' },
        { k: 'Fra', n: 'Gap', sz: '8x8', lz: 'FF', ch: [] },
        { k: 'Ins', n: 'Help', sz: '40x40', szv: 'w:size-control-md h:size-control-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', r: 'radius-sm', tint: 'Default', is: 'Icon button: Type=Ghost, Size=M, State=Default' },
        { k: 'Fra', n: 'Notifications', sz: '40x40', lz: 'FF', ch: [
          { k: 'Ins', n: 'Notifications button', sz: '40x40', szv: 'w:size-control-md h:size-control-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', r: 'radius-sm', tint: 'Default', is: 'Icon button: Type=Ghost, Size=M, State=Default' },
          { k: 'Ell', n: 'Unread dot', sz: '10x10', lz: 'FF', bg: 'danger-icon', st: 'bg-surface 2O', pr: 'v:Show unread dot' },
        ] },
        { k: 'Ins', n: 'Account', sz: '32x32', szv: 'w:size-avatar-md h:size-avatar-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', bg: 'IMAGE', st: 'border-subtle 1I', r: 'radius-full', tint: 'Default', is: 'Avatar: Size=M, Type=Image' },
      ],
    },
  },
  'Candidates page': {
    id: '9128:6474',
    spec: {
      k: 'Fra', n: 'After · Candidates', sz: '1440x1024', al: 'V g0 p0/0/0/0 MM', lz: 'FF', bg: 'bg-canvas',
      ch: [
        { k: 'Fra', n: 'Body', sz: '1440x1024', al: 'H g0 p0/0/0/0 MM', lz: 'FF', ch: [
          { k: 'Ins', n: 'Sidebar', sz: '240x1024', al: 'V g0 p0/space-12/space-16/space-12 MM', lz: 'FF', bg: 'chrome-bg', tint: 'Chrome', is: 'Sidebar: Collapsed=False' },
          { k: 'Fra', n: 'Content', sz: '1200x1024', al: 'V g0 p0/0/0/0 MM', lz: 'FF', ch: [
            { k: 'Ins', n: 'Top bar', sz: '1200x56', al: 'H gspace-8 p0/space-24/0/space-24 MC', lz: 'FF', bg: 'bg-surface', st: 'border-subtle 0/0/1/0I', is: 'Top bar: Type=Page' },
            { k: 'Ins', n: 'Page header', sz: '1200x81', al: 'H gspace-16 pspace-20/space-24/space-20/space-24 MM', lz: 'FH', bg: 'bg-surface', st: 'border-subtle 0/0/1/0I', is: 'Page header: Type=Page' },
            { k: 'Fra', n: 'List', sz: '1200x1378', al: 'V gspace-24 pspace-24/space-24/space-32/space-24 MM', lz: 'FH', ch: [
              { k: 'Ins', n: 'Card · Mate Plate', sz: '1152x646', al: 'V gspace-20 pspace-24/space-24/space-24/space-24 MM', lz: 'FH', bg: 'bg-surface', st: 'border-subtle 1I', r: 'radius-lg', is: 'Candidate card: Type=List' },
              { k: 'Ins', n: 'Card · Ana Kovač', sz: '1152x652', al: 'V gspace-20 pspace-24/space-24/space-24/space-24 MM', lz: 'FH', bg: 'bg-surface', st: 'border-subtle 1I', r: 'radius-lg', is: 'Candidate card: Type=List' },
            ] },
          ] },
        ] },
      ],
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
  'bg-surface': { name: 'bg/surface', type: 'COLOR', value: '#ffffff' },
  'bg-canvas': { name: 'bg/canvas', type: 'COLOR', value: '#f5f7f8' },
  'border-subtle': { name: 'border/subtle', type: 'COLOR', value: '#dae1e4' },
  'text-primary': { name: 'text/primary', type: 'COLOR', value: '#192930' },
  'space-12': { name: 'space/12', type: 'FLOAT', value: 12 },
  'space-24': { name: 'space/24', type: 'FLOAT', value: 24 },
  'space-32': { name: 'space/32', type: 'FLOAT', value: 32 },
  'radius-lg': { name: 'radius/lg', type: 'FLOAT', value: 4 },
  'overlap-8': { name: 'overlap/8', type: 'FLOAT', value: -8 },
};
