import type { ReactNode } from 'react';
import './state-grid.css';

export interface StateGridRow {
  label: string;
  cells: ReactNode[];
}

/** Story helper: a variants × states table, laid out like the Figma component sets. */
export function StateGrid({
  columns,
  rows,
  caption,
  align = 'middle',
}: {
  columns: string[];
  rows: StateGridRow[];
  caption?: string;
  /** Top for fields, so their labels line up when one shows an error. */
  align?: 'middle' | 'top';
}) {
  return (
    <table className={`air-state-grid air-state-grid--${align}`}>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <td />
          {columns.map((c) => (
            <th scope="col" key={c}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row">{r.label}</th>
            {r.cells.map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
