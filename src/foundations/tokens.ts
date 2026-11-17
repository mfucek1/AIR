import css from '../tokens/tokens.css?raw';

export interface Token {
  name: string;
  value: string;
  group: string;
}

/** Reads the generated tokens.css so these pages always match Figma's export. */
function parse(): Token[] {
  const root = css.split('[data-theme')[0];
  const tokens: Token[] = [];
  let group = '';
  for (const line of root.split('\n')) {
    const comment = line.match(/\/\*\s*(.+?)\s*\*\//);
    if (comment) {
      group = comment[1];
      continue;
    }
    const decl = line.match(/^\s*(--air-[a-z0-9-]+):\s*(.+);/);
    if (decl) tokens.push({ name: decl[1], value: decl[2], group });
  }
  return tokens;
}

export const tokens = parse();

export const byGroup = (group: string) => tokens.filter((t) => t.group === group);
export const byPrefix = (group: string, prefix: string) => byGroup(group).filter((t) => t.name.startsWith(prefix));
