import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Avatar } from '../src/components/Avatar/Avatar';
import { Badge } from '../src/components/Badge/Badge';
import { Button } from '../src/components/Button/Button';
import { Tag } from '../src/components/Tag/Tag';
import { specs } from './figma-spec';
import { rowsFor, swatch, variableLabel, type ComponentKey, type Row } from './rows';
import buttonSvg from './drawn/button.svg';
import badgeSvg from './drawn/badge.svg';
import tagSvg from './drawn/tag.svg';
import avatarSvg from './drawn/avatar.svg';

interface Item {
  key: ComponentKey;
  /** The variant exported from Figma, and the label it was exported with */
  drawn: { src: string; width: number; height: number; label: string };
  /** How the live one is written, shown above it */
  usage: string;
  /** Its docs page in Storybook */
  story: string;
  Live: () => ReactNode;
}

function LiveTag() {
  const [selected, setSelected] = useState(false);
  return (
    <Tag selected={selected} onClick={() => setSelected(!selected)}>
      TypeScript
    </Tag>
  );
}

const items: Item[] = [
  {
    key: 'Button',
    drawn: { src: buttonSvg, width: 130, height: 40, label: 'Add candidate' },
    usage: '<Button variant="primary">',
    story: 'components-actions-button--docs',
    Live: () => <Button variant="primary">Add candidate</Button>,
  },
  {
    key: 'Badge',
    drawn: { src: badgeSvg, width: 54, height: 26, label: 'Hired' },
    usage: '<Badge tone="success" size="m">',
    story: 'components-data-display-badge--docs',
    Live: () => (
      <Badge tone="success" size="m">
        Hired
      </Badge>
    ),
  },
  {
    key: 'Tag',
    drawn: { src: tagSvg, width: 85, height: 24, label: 'TypeScript' },
    usage: '<Tag onClick={toggle}>',
    story: 'components-data-display-tag--docs',
    Live: LiveTag,
  },
  {
    key: 'Avatar',
    drawn: { src: avatarSvg, width: 48, height: 48, label: 'LH' },
    usage: '<Avatar size="l" name="Lena Horvat">',
    story: 'components-data-display-avatar--docs',
    Live: () => <Avatar size="l" name="Lena Horvat" />,
  },
];

const rows = Object.fromEntries(items.map((i) => [i.key, rowsFor(i.key)])) as Record<ComponentKey, Row[]>;

/** "Type=Primary, Size=M" → "Type=Primary · Size=M", or the values alone on phones */
const variantLine = (name: string, short: boolean) =>
  name
    .split(', ')
    .map((p) => (short ? p.split('=')[1] : p))
    .join(' · ');

function CodeValue({ prop, value }: Row['css']) {
  return (
    <code className="ftc__code">
      <span className="ftc__code-prop">{prop}: </span>
      {value.split(/(var\(--air-[\w-]+\))/).map((part, i) =>
        part.startsWith('var(') ? (
          <span key={i} className="ftc__code-var">
            {part}
          </span>
        ) : (
          <span key={i} className="ftc__code-prop">
            {part}
          </span>
        ),
      )}
      <span className="ftc__code-end">;</span>
    </code>
  );
}

function FigmaChips({ row }: { row: Row }) {
  if (row.figma.textStyle) return <span className="ftc__chip">{row.figma.textStyle}</span>;
  return row.figma.tokens.map((t) => {
    const colour = swatch(t);
    return (
      <span key={t} className="ftc__chip">
        {colour && <span className="ftc__swatch" style={{ background: colour }} aria-hidden="true" />}
        {variableLabel(t)}
      </span>
    );
  });
}

/**
 * Figma to code: one AIR component as drawn in Figma, with the variables bound to it, beside
 * the real React component and the CSS line that uses each variable. Shown in an iframe on
 * markofucek.com (Live components), served at air.markofucek.com/figma-to-code/.
 */
export function FigmaToCode() {
  const [current, setCurrent] = useState(0);
  const [match, setMatch] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[current];
  const list = rows[item.key];
  const variant = specs[item.key].base;

  const select = (i: number) => {
    setCurrent(i);
    setMatch(null);
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    tabs.current[next]?.focus();
    select(next);
  };

  const rowProps = (i: number, row: Row) => ({
    className: ['ftc__row', row.phone && 'ftc__row--phone', match === i && 'is-match'].filter(Boolean).join(' '),
    onMouseEnter: () => setMatch(i),
    onMouseLeave: () => setMatch(null),
  });

  return (
    <main className="ftc">
      <h1 className="air-visually-hidden">Figma to code: AIR components in Figma and in React, variable by variable</h1>

      <div className="ftc__tabs" role="tablist" aria-label="Components">
        {items.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`ftc-tab-${i}`}
            aria-selected={i === current}
            aria-controls="ftc-panel"
            tabIndex={i === current ? 0 : -1}
            className="ftc__tab"
            data-label={it.key}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {it.key}
          </button>
        ))}
      </div>

      <div className="ftc__panes" role="tabpanel" id="ftc-panel" aria-labelledby={`ftc-tab-${current}`}>
        <section className="ftc__pane ftc__pane--figma" aria-labelledby="ftc-figma-title">
          <div className="ftc__head">
            <h2 id="ftc-figma-title" className="ftc__title">
              In Figma · {item.key}
            </h2>
            <p className="ftc__meta">
              <span className="ftc__wide">{variantLine(variant, false)}</span>
              <span className="ftc__narrow">{variantLine(variant, true)}</span>
            </p>
          </div>
          <div className="ftc__canvas ftc__canvas--figma">
            <div className="ftc__selected">
              <p className="ftc__component" aria-hidden="true">
                <span className="ftc__mark" />
                {item.key}
              </p>
              <div className="ftc__selection">
                <img
                  src={item.drawn.src}
                  width={item.drawn.width}
                  height={item.drawn.height}
                  alt={`${item.key} as drawn in Figma: ${item.drawn.label}`}
                />
                <span className="ftc__handle ftc__handle--tl" />
                <span className="ftc__handle ftc__handle--tr" />
                <span className="ftc__handle ftc__handle--bl" />
                <span className="ftc__handle ftc__handle--br" />
              </div>
            </div>
          </div>
          <dl className="ftc__rows">
            {list.map((row, i) => (
              <div key={row.label} {...rowProps(i, row)}>
                <dt className="ftc__label">{row.label}</dt>
                <dd className="ftc__chips">
                  <FigmaChips row={row} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ftc__pane ftc__pane--code" aria-labelledby="ftc-code-title">
          <div className="ftc__head">
            <h2 id="ftc-code-title" className="ftc__title">
              In code · &lt;{item.key}&gt;
            </h2>
            <a className="ftc__usage ftc__wide" href={`/?path=/docs/${item.story}`} target="_blank" rel="noopener">
              {item.usage}
              <span className="air-visually-hidden"> (opens its Storybook page in a new tab)</span>
            </a>
          </div>
          <div className="ftc__canvas ftc__canvas--code">
            <item.Live key={item.key} />
          </div>
          <ul className="ftc__rows" aria-label={`The CSS of ${item.key}, one line per Figma variable`}>
            {list.map((row, i) => (
              <li key={row.label} {...rowProps(i, row)}>
                <CodeValue {...row.css} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
