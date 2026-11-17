// What Figma says about the nine steps, as read from the AIR Figma file on 17 Nov 2026.
//
// specs: scripts/figma-component-spec.js, keeping each set's id, base variant and base tree
// (the per-variant diffs aren't used here). The runs:
//   SETS = ['9045:975', '9051:1365', '9054:1724', '9073:2853', '9072:2732', '9053:1582', '9058:1848', '9122:29428', '9125:6180']
//   BASE = { '9054:1724': 'Value=On, State=Default', '9073:2853': 'Size=M', '9053:1582': 'State=Default, Filled=Yes, Size=M',
//            '9122:29428': 'Type=Page', '9125:6180': 'Type=List' }
// Boolean properties a step turns on (Tag's Removable; Select's leading icon, Required and helper)
// are listed in rows.ts; the layers they show are hidden in these base trees.
// Keys are the script's: bg fill, st stroke, r radius, al layout (gap g, padding p t/r/b/l),
// szv size variables, ts text style, fx effect style, c text colour, is instance of, pr property
// links. Values are variables' code names (--air-…).
//
// variables: the Figma name and Light value of each variable those trees use (AIR · Color,
// AIR · Size), read with the Plugin API from the same file.
//
// drawn/: Button as SVG from a temporary instance labelled Add candidate; Avatar stack as SVG;
// the rest as PNG at 2x from instances scaled 2x in a temporary frame (labels below), removed
// after the captures; the Candidate card (List) at 1x, always shown scaled down. Switch, Segmented
// control and Menu captures include their shadows, which run outside the component's box.
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
  fx?: string;
  op?: number;
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
  Switch: {
    id: '9054:1724',
    base: 'Value=On, State=Default',
    spec: {
      k: 'Com', n: 'Value=On, State=Default', sz: '80x20', al: 'H gspace-8 p0/0/0/0 MC',
      ch: [
        { k: 'Fra', n: 'Track', sz: '36x20', al: 'H g0 pspace-2/space-2/space-2/space-2 MC', lz: 'FF', bg: 'action-primary', r: 'radius-full', ch: [
          { k: 'Ell', n: 'Knob', sz: '16x16', lz: 'FF', bg: 'action-knob', fx: 'Elevation/1' },
          { k: 'Fra', n: 'Focus ring', hid: 1, sz: '44x28', lz: 'FF', abs: '-4,-4', st: 'border-focus 2I', r: 14, pr: 'v:Focus ring', ch: [] },
        ] },
        { k: 'Tex', n: 'Label', sz: '36x20', lz: 'HH', t: 'Label', ts: 'Body/M', c: 'text-primary', pr: 'v:Show label,c:Label' },
      ],
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
  'Segmented control': {
    id: '9072:2732',
    spec: {
      k: 'Com', n: 'Segmented control', sz: '252x32', al: 'H gspace-2 pspace-2/space-2/space-2/space-2 MC', lz: 'HH', bg: 'bg-sunken', r: 'radius-sm',
      ch: [
        { k: 'Ins', n: 'Segment 1', sz: '80x28', al: 'H gspace-4 pspace-0/space-12/space-0/space-12 CC', lz: 'HF', bg: 'bg-surface-raised', r: 'radius-xs', fx: 'Elevation/1', tint: 'Default', is: 'Segment: State=Selected' },
        { k: 'Ins', n: 'Segment 2', sz: '82x28', al: 'H gspace-4 pspace-0/space-12/space-0/space-12 CC', lz: 'HF', r: 'radius-xs', tint: 'Muted', is: 'Segment: State=Default' },
        { k: 'Ins', n: 'Segment 3', sz: '82x28', al: 'H gspace-4 pspace-0/space-12/space-0/space-12 CC', lz: 'HF', r: 'radius-xs', tint: 'Muted', is: 'Segment: State=Default', pr: 'v:Show segment 3' },
        { k: 'Ins', n: 'Segment 4', hid: 1, sz: '82x28', al: 'H gspace-4 pspace-0/space-12/space-0/space-12 CC', lz: 'HF', r: 'radius-xs', tint: 'Muted', is: 'Segment: State=Default', pr: 'v:Show segment 4' },
      ],
    },
  },
  Select: {
    id: '9053:1582',
    base: 'State=Default, Filled=Yes, Size=M',
    spec: {
      k: 'Com', n: 'State=Default, Filled=Yes, Size=M', sz: '320x64', al: 'V gspace-4 p0/0/0/0 MM',
      ch: [
        { k: 'Fra', n: 'Label row', sz: '320x20', al: 'H gspace-2 p0/0/0/0 MC', lz: 'FH', pr: 'v:Show label', ch: [
          { k: 'Tex', n: 'Label', sz: '37x20', lz: 'HF', t: 'Label', ts: 'Body/M Strong', c: 'text-primary', pr: 'c:Label' },
          { k: 'Tex', n: 'Required', hid: 1, sz: '8x20', lz: 'FF', t: '*', ts: 'Body/M Strong', c: 'danger-text', pr: 'v:Required' },
          { k: 'Fra', n: 'AI filled', hid: 1, sz: '14x12', al: 'H g0 p0/0/0/space-2 MC', lz: 'HH', tint: 'AI', pr: 'v:AI filled', ch: [{ k: 'Ins', n: 'Icon/sparkles', sz: '12x12', lz: 'FF', is: 'Icon/sparkles: Size=12' }] },
        ] },
        { k: 'Fra', n: 'Field', sz: '320x40', szv: 'h:size-control-md', al: 'H gspace-8 pspace-0/space-12/space-0/space-12 MC', lz: 'FF', bg: 'bg-surface', st: 'border-field 1I', r: 'radius-sm', tint: 'Muted', ch: [
          { k: 'Ins', n: 'Leading icon', hid: 1, sz: '20x20', lz: 'FF', is: 'Icon/briefcase: Size=16', pr: 'v:Show leading icon,m:Leading icon' },
          { k: 'Tex', n: 'Value', sz: '266x20', lz: 'FH', t: 'Choose an option', ts: 'Body/M', c: 'text-primary', pr: 'c:Value' },
          { k: 'Ins', n: 'Chevron', sz: '20x20', lz: 'FF', is: 'Icon/chevron-down: Size=20' },
        ] },
        { k: 'Tex', n: 'Helper', hid: 1, sz: '320x18', lz: 'FF', t: 'Helper text', ts: 'Body/S', c: 'text-secondary', pr: 'v:Show helper,c:Helper' },
      ],
    },
  },
  Menu: {
    id: '9058:1848',
    spec: {
      k: 'Com', n: 'Menu', sz: '240x179', al: 'V gspace-0 pspace-4/space-4/space-4/space-4 MM', lz: 'FH', bg: 'bg-surface-raised', st: 'border-subtle 1I', r: 'radius-md', fx: 'Elevation/2',
      ch: [
        { k: 'Ins', n: 'Item', sz: '230x32', szv: 'h:size-control-sm', al: 'H gspace-8 pspace-0/space-8/space-0/space-8 MC', lz: 'FF', r: 'radius-xs', tint: 'Muted', is: 'Menu item: Type=Default, State=Default' },
        { k: 'Ins', n: 'Item', sz: '230x32', szv: 'h:size-control-sm', al: 'H gspace-8 pspace-0/space-8/space-0/space-8 MC', lz: 'FF', r: 'radius-xs', tint: 'Muted', is: 'Menu item: Type=Default, State=Default' },
        { k: 'Ins', n: 'Item', sz: '230x32', szv: 'h:size-control-sm', al: 'H gspace-8 pspace-0/space-8/space-0/space-8 MC', lz: 'FF', r: 'radius-xs', tint: 'Muted', is: 'Menu item: Type=Default, State=Default' },
        { k: 'Ins', n: 'Item', sz: '230x32', szv: 'h:size-control-sm', al: 'H gspace-8 pspace-0/space-8/space-0/space-8 MC', lz: 'FF', r: 'radius-xs', tint: 'Muted', is: 'Menu item: Type=Default, State=Default', pr: 'v:Show item 4' },
        { k: 'Fra', n: 'Separator', sz: '230x9', al: 'V g0 pspace-4/space-0/space-4/space-0 MM', lz: 'FH', pr: 'v:Show danger item', ch: [
          { k: 'Ins', n: 'Divider', sz: '230x1', lz: 'FF', bg: 'border-subtle', is: 'Divider: Orientation=Horizontal' },
        ] },
        { k: 'Ins', n: 'Danger item', sz: '230x32', szv: 'h:size-control-sm', al: 'H gspace-8 pspace-0/space-8/space-0/space-8 MC', lz: 'FF', r: 'radius-xs', tint: 'Danger', is: 'Menu item: Type=Danger, State=Default', pr: 'v:Show danger item' },
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
  'Candidate card': {
    id: '9125:6180',
    base: 'Type=List',
    spec: {
      k: 'Com', n: 'Type=List', sz: '1136x646', al: 'V gspace-20 pspace-24/space-24/space-24/space-24 MM', bg: 'bg-surface', st: 'border-subtle 1I', r: 'radius-lg',
      ch: [
        { k: 'Fra', n: 'Header', sz: '1086x70', al: 'H gspace-16 p0/0/0/0 MC', lz: 'FH', ch: [
          { k: 'Ins', n: 'Avatar', sz: '48x48', szv: 'w:size-avatar-lg h:size-avatar-lg', al: 'H g0 p0/0/0/0 CC', lz: 'FF', bg: 'IMAGE', st: 'border-subtle 1I', r: 'radius-full', tint: 'Default', is: 'Avatar: Size=L, Type=Image' },
          { k: 'Fra', n: 'Who', sz: '817x70', al: 'V gspace-2 p0/0/0/0 MM', lz: 'FH', ch: [
            { k: 'Tex', n: 'Name', sz: '102x28', lz: 'HH', t: 'Mate Plate', ts: 'Title/M', c: 'text-primary', pr: 'c:Name' },
            { k: 'Ins', n: 'Role', sz: '133x20', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Action', is: 'Link: Type=Primary, Size=M, State=Default' },
            { k: 'Fra', n: 'Score', sz: '105x18', al: 'H gspace-8 pspace-2/0/0/0 MC', lz: 'HH', ch: [
              { k: 'Ins', n: 'Rating', sz: '105x16', al: 'H gspace-8 p0/0/0/0 MC', lz: 'HH', is: 'Rating: Stars=4', pr: 'v:Show rating' },
              { k: 'Ins', n: 'Match', hid: 1, sz: '102x22', al: 'H gspace-4 pspace-2/space-8/space-2/space-8 MC', lz: 'HH', bg: 'info-bg', st: 'info-border 1I', r: 'radius-full', tint: 'Action', is: 'Match grade: Level=Partial, State=Default', pr: 'v:Show match' },
            ] },
          ] },
          { k: 'Fra', n: 'Actions', sz: '189x40', al: 'H gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Ins', n: 'Decline', sz: '84x40', szv: 'h:size-control-md', al: 'H gspace-8 p0/space-16/0/space-16 CC', lz: 'HF', bg: 'action-secondary', st: 'border-danger 1I', r: 'radius-sm', tint: 'Danger', is: 'Button: Type=Secondary, Tone=Danger, Size=M, State=Default' },
            { k: 'Ins', n: 'Advance', sz: '97x40', szv: 'h:size-control-md', al: 'H gspace-8 p0/space-16/0/space-16 CC', lz: 'HF', bg: 'action-primary', r: 'radius-sm', tint: 'Inverse', is: 'Button: Type=Primary, Tone=Default, Size=M, State=Default' },
          ] },
        ] },
        { k: 'Ins', n: 'Stage path', sz: '661x32', al: 'H gspace-12 p0/0/0/0 MC', lz: 'HH', is: 'Stage path: Status=In progress' },
        { k: 'Tex', n: 'Summary', sz: '1086x60', lz: 'FH', t: 'With six years of experience, Mate is an accompl', ts: 'Body/M', c: 'text-secondary', pr: 'c:Summary' },
        { k: 'Fra', n: 'Details', sz: '580x42', al: 'H gspace-32 p0/0/0/0 MM', lz: 'HH', ch: [
          { k: 'Fra', n: 'Applied on', sz: '77x40', al: 'V gspace-4 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '62x16', lz: 'HH', t: 'Applied on', ts: 'Caption', c: 'text-muted' },
            { k: 'Tex', n: 'Value', sz: '77x20', lz: 'HH', t: '17/05/2023', ts: 'Body/M', c: 'text-primary', pr: 'c:Applied on' },
          ] },
          { k: 'Fra', n: 'Recommendation', sz: '102x42', al: 'V gspace-4 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '102x16', lz: 'HH', t: 'Recommendation', ts: 'Caption', c: 'text-muted' },
            { k: 'Ins', n: 'Recommendation badge', sz: '35x22', al: 'H gspace-4 pspace-2/space-8/space-2/space-8 CC', lz: 'HH', bg: 'tag-bg', st: 'border-subtle 1I', r: 'radius-full', tint: 'Muted', is: 'Badge: Tone=Neutral, Size=S, Inverse=False' },
          ] },
          // Current employer, Expected salary and Notice period: label and value text, like Applied on (left out)
        ] },
        { k: 'Fra', n: 'Skills', sz: '1086x52', al: 'H gspace-32 p0/0/0/0 MM', lz: 'FH', ch: [
          { k: 'Fra', n: 'Technical skills', sz: '349x52', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '101x20', lz: 'HH', t: 'Technical skills', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Tags', sz: '349x24', al: 'H gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
              { k: 'Ins', n: 'Tag', sz: '44x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '62x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '27x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '67x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '66x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '43x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
            ] },
          ] },
          { k: 'Fra', n: 'Management skills', sz: '230x52', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '125x20', lz: 'HH', t: 'Management skills', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Tags', sz: '230x24', al: 'H gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [{ k: 'Ins', n: 'Tag', sz: '230x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' }] },
          ] },
          { k: 'Fra', n: 'Industries', sz: '241x52', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '67x20', lz: 'HH', t: 'Industries', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Tags', sz: '241x24', al: 'H gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
              { k: 'Ins', n: 'Tag', sz: '95x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '53x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
              { k: 'Ins', n: 'Tag', sz: '77x24', al: 'H gspace-4 pspace-0/space-8/space-0/space-8 CC', lz: 'HF', bg: 'tag-bg', st: 'tag-bg 1I', r: 'radius-sm', tint: 'Muted', is: 'Tag: State=Default' },
            ] },
          ] },
        ] },
        { k: 'Fra', n: 'Experience', sz: '541x66', al: 'H gspace-32 p0/0/0/0 MM', lz: 'HH', ch: [
          { k: 'Fra', n: 'Latest experience', sz: '284x66', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '120x20', lz: 'HH', t: 'Latest experience', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Item', sz: '284x38', al: 'H gspace-12 p0/0/0/0 MC', lz: 'HH', ch: [
              { k: 'Ins', n: 'Avatar', sz: '24x24', szv: 'w:size-avatar-sm h:size-avatar-sm', lz: 'FF', bg: 'bg-surface', r: 'radius-sm', tint: 'Default', is: 'Avatar: Size=S, Type=Logo' },
              { k: 'Fra', n: 'Text', sz: '248x38', al: 'V gspace-2 p0/0/0/0 MM', lz: 'HH' },
            ] },
          ] },
          { k: 'Fra', n: 'Right to work', sz: '225x48', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '89x20', lz: 'HH', t: 'Right to work', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Item', sz: '225x20', al: 'H gspace-8 p0/0/0/0 MC', lz: 'HH', tint: 'Muted', ch: [
              { k: 'Ins', n: 'Icon', sz: '16x16', lz: 'FF', is: 'Icon/file-text: Size=16' },
              { k: 'Tex', n: '“No sorry, I need sponsorship”', sz: '201x20', lz: 'HH', t: '“No sorry, I need sponsorship”', ts: 'Body/M', c: 'text-primary' },
            ] },
          ] },
        ] },
        { k: 'Fra', n: 'Also applied for', sz: '318x66', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
          { k: 'Tex', n: 'Label', sz: '105x20', lz: 'HH', t: 'Also applied for', ts: 'Body/M Strong', c: 'text-primary' },
          { k: 'Fra', n: 'Items', sz: '318x38', al: 'H gspace-32 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Fra', n: 'Senior Frontend Engineer', sz: '170x38', al: 'V gspace-2 p0/0/0/0 MM', lz: 'HH', ch: [
              { k: 'Ins', n: 'Link', sz: '170x20', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Action', is: 'Link: Type=Primary, Size=M, State=Default' },
              { k: 'Tex', n: '14/05/2023', sz: '69x16', lz: 'HH', t: '14/05/2023', ts: 'Caption', c: 'text-muted' },
            ] },
            { k: 'Fra', n: 'Product Manager', sz: '116x38', al: 'V gspace-2 p0/0/0/0 MM', lz: 'HH', ch: [
              { k: 'Ins', n: 'Link', sz: '116x20', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Action', is: 'Link: Type=Primary, Size=M, State=Default' },
              { k: 'Tex', n: '04/01/2023', sz: '69x16', lz: 'HH', t: '04/01/2023', ts: 'Caption', c: 'text-muted' },
            ] },
          ] },
        ] },
        { k: 'Fra', n: 'Bottom', sz: '1086x68', al: 'H gspace-32 p0/0/0/0 SM', lz: 'FH', ch: [
          { k: 'Fra', n: 'Documents', sz: '222x48', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '77x20', lz: 'HH', t: 'Documents', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Files', sz: '222x20', al: 'H gspace-24 p0/0/0/0 MM', lz: 'HH', ch: [
              { k: 'Ins', n: 'Cover Letter.doc', sz: '132x20', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Default', is: 'Link: Type=Neutral, Size=M, State=Default' },
              { k: 'Ins', n: 'CV.pdf', sz: '66x20', al: 'H gspace-4 pspace-0/space-0/space-0/space-0 MC', lz: 'HH', tint: 'Default', is: 'Link: Type=Neutral, Size=M, State=Default' },
            ] },
          ] },
          { k: 'Fra', n: 'Get in touch by', sz: '128x68', al: 'V gspace-8 p0/0/0/0 MM', lz: 'HH', ch: [
            { k: 'Tex', n: 'Label', sz: '102x20', lz: 'HH', t: 'Get in touch by', ts: 'Body/M Strong', c: 'text-primary' },
            { k: 'Fra', n: 'Channels', sz: '128x40', al: 'H gspace-4 p0/0/0/0 MM', lz: 'HH', ch: ['LinkedIn profile', 'Email', 'Phone'].map((n) => ({
              k: 'Ins', n, sz: '40x40', szv: 'w:size-control-md h:size-control-md', al: 'H g0 p0/0/0/0 CC', lz: 'FF', r: 'radius-sm', tint: 'Default', is: 'Icon button: Type=Ghost, Size=M, State=Default',
            })) },
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
  'action-knob': { name: 'action/knob', type: 'COLOR', value: '#ffffff' },
  'bg-sunken': { name: 'bg/sunken', type: 'COLOR', value: '#eaeef0' },
  'bg-surface-raised': { name: 'bg/surface-raised', type: 'COLOR', value: '#ffffff' },
  'border-field': { name: 'border/field', type: 'COLOR', value: '#dae1e4' },
  'danger-text': { name: 'danger/text', type: 'COLOR', value: '#a50018' },
  'text-secondary': { name: 'text/secondary', type: 'COLOR', value: '#3e4d54' },
  'radius-xs': { name: 'radius/xs', type: 'FLOAT', value: 2 },
  'radius-md': { name: 'radius/md', type: 'FLOAT', value: 4 },
  'size-control-sm': { name: 'size/control-sm', type: 'FLOAT', value: 32 },
};
