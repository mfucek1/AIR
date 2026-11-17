import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { specs } from './figma-spec';
import { LiveAvatar, LiveAvatarStack, LiveBadge, LiveBreadcrumbs, LiveButton, LiveCandidateCard, LiveCandidatesPage, LiveTag, LiveTopBar } from './live';
import { rowsFor, swatch, variableLabel, type ComponentKey, type PartRow, type Row, type VarRow } from './rows';
import buttonSvg from './drawn/button.svg';
import badgeSvg from './drawn/badge.svg';
import tagSvg from './drawn/tag.svg';
import avatarSvg from './drawn/avatar.svg';
import avatarStackSvg from './drawn/avatar-stack.svg';
import breadcrumbsPng from './drawn/breadcrumbs@2x.png';
import candidateCardPng from './drawn/candidate-card@2x.png';
import topBarPng from './drawn/top-bar@2x.png';
import candidatesPagePng from './drawn/candidates-page.png';

type Level = 'Atoms' | 'Molecules' | 'Organisms' | 'Template';

interface Item {
  key: ComponentKey;
  level: Level;
  /** The drawing exported from Figma, at its size in Figma, and what it shows */
  drawn: { src: string; width: number; height: number; label: string };
  /** A screen is a Figma frame (blue selection); everything else is a component (purple) */
  frame?: boolean;
  /** How the live one is written, shown above it */
  usage: string;
  /** Its docs page in Storybook */
  story: string;
  Live: () => ReactNode;
  /** Wide ones render at their Figma width and are scaled down to fit, like zooming out in Figma */
  liveSize?: { width: number; height?: number };
}

const items: Item[] = [
  { key: 'Button', level: 'Atoms', drawn: { src: buttonSvg, width: 130, height: 40, label: 'Add candidate' }, usage: '<Button variant="primary">', story: 'components-actions-button--docs', Live: LiveButton },
  { key: 'Badge', level: 'Atoms', drawn: { src: badgeSvg, width: 54, height: 26, label: 'Hired' }, usage: '<Badge tone="success" size="m">', story: 'components-data-display-badge--docs', Live: LiveBadge },
  { key: 'Tag', level: 'Atoms', drawn: { src: tagSvg, width: 85, height: 24, label: 'TypeScript' }, usage: '<Tag onClick={toggle}>', story: 'components-data-display-tag--docs', Live: LiveTag },
  { key: 'Avatar', level: 'Atoms', drawn: { src: avatarSvg, width: 48, height: 48, label: 'LH' }, usage: '<Avatar size="l" name="Lena Horvat">', story: 'components-data-display-avatar--docs', Live: LiveAvatar },
  { key: 'Avatar stack', level: 'Molecules', drawn: { src: avatarStackSvg, width: 148, height: 36, label: 'AK, LP, IM, JD and 3 more' }, usage: '<AvatarStack size="m" people={team}>', story: 'components-data-display-avatar-stack--docs', Live: LiveAvatarStack },
  { key: 'Breadcrumbs', level: 'Molecules', drawn: { src: breadcrumbsPng, width: 309, height: 18, label: 'Jobs, Senior Frontend Developer, Mate Plate' }, usage: '<Breadcrumbs items={path}>', story: 'components-navigation-breadcrumbs--docs', Live: LiveBreadcrumbs },
  { key: 'Candidate card', level: 'Organisms', drawn: { src: candidateCardPng, width: 320, height: 176, label: 'Mate Plate, a partial match' }, usage: '<CandidateCard type="board">', story: 'components-air-candidate-card--docs', Live: LiveCandidateCard, liveSize: { width: 320 } },
  { key: 'Top bar', level: 'Organisms', drawn: { src: topBarPng, width: 1200, height: 56, label: 'breadcrumbs, search, help, notifications and the account' }, usage: '<TopBar breadcrumbs={…} search={…}>', story: 'components-navigation-top-bar--docs', Live: LiveTopBar, liveSize: { width: 1200, height: 56 } },
  { key: 'Candidates page', level: 'Template', frame: true, drawn: { src: candidatesPagePng, width: 1440, height: 1024, label: 'the Candidates page' }, usage: '<CandidatesPage>', story: 'templates-candidates-page--docs', Live: LiveCandidatesPage, liveSize: { width: 1440, height: 1024 } },
];

const rows = Object.fromEntries(items.map((i) => [i.key, rowsFor(i.key)])) as Record<ComponentKey, Row[]>;

/** Room above the drawing for its name, on both sides so both scale alike */
const LABEL = 22;
/** The canvas's padding, both sides together */
const PAD = 32;

export interface Zoom {
  zoom: number;
  /** Zoomed to the width, with the bottom cut off by the canvas */
  cropped: boolean;
}

/**
 * Scales its child down to fit the box, like zooming out in Figma: the child keeps its own
 * width (and height, when given) and reports the zoom. When fitting the height would shrink it
 * to less than half of fitting the width (a page on a phone), it fits the width and lets the
 * canvas crop the bottom, like Figma's zoom to fit width.
 */
function Fit({ box, width, height, onZoom, children }: { box: RefObject<HTMLElement | null>; width: number; height?: number; onZoom?: (z: Zoom) => void; children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ zoom: 1, height: height ?? 0 });
  useLayoutEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;
    const measure = () => {
      const h = height ?? i.offsetHeight;
      const byWidth = Math.min(1, (b.clientWidth - PAD) / width);
      const byHeight = (b.clientHeight - PAD - LABEL) / h;
      const cropped = byHeight < byWidth / 2;
      const zoom = cropped ? byWidth : Math.min(byWidth, byHeight);
      setFit({ zoom, height: h });
      onZoom?.({ zoom, cropped });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(b);
    ro.observe(i);
    measure();
    return () => ro.disconnect();
  }, [box, width, height, onZoom]);
  return (
    <div className="ftc__fit" style={{ width: width * fit.zoom, height: fit.height * fit.zoom }}>
      <div ref={inner} className="ftc__fit-inner" style={{ width, height, transform: fit.zoom < 1 ? `scale(${fit.zoom})` : undefined }}>
        {children}
      </div>
    </div>
  );
}

const percent = (z: number) => `${Math.round(z * 100)}%`;

/** "Type=Primary, Size=M" → "Type=Primary · Size=M", or the values alone on narrow screens */
const variantLine = (name: string, short: boolean) =>
  name
    .split(', ')
    .map((p) => (short ? p.split('=')[1] : p))
    .join(' · ');

/** A CSS declaration or a line of JSX, with the variables and component names picked out */
function CodeLine({ row }: { row: Row }) {
  const text = row.kind === 'var' ? `${row.css.prop}: ${row.css.value};` : row.code;
  const parts = text.split(row.kind === 'var' ? /(var\(--air-[\w-]+\))/ : /(?<=<\/?)([A-Z][A-Za-z]*)/);
  return (
    <code className="ftc__code" title={text}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="ftc__code-var">
            {part}
          </span>
        ) : (
          <span key={i} className={row.kind === 'var' && i === parts.length - 1 ? 'ftc__code-end' : 'ftc__code-prop'}>
            {part}
          </span>
        ),
      )}
    </code>
  );
}

function VarChips({ row }: { row: VarRow }) {
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

function PartChip({ row }: { row: PartRow }) {
  return (
    <span className="ftc__chip ftc__chip--part">
      <span className="ftc__diamond" aria-hidden="true" />
      <span className="ftc__part-name">{row.part.name}</span>
      {row.part.props && <span className="ftc__part-props">{row.part.props}</span>}
      {row.part.count > 1 && <span className="ftc__part-props">×{row.part.count}</span>}
    </span>
  );
}

/**
 * Figma to code: AIR's design system from atoms to a page template. Each step as drawn in Figma,
 * with the parts it's built from and the variables bound to it, beside the real React component
 * and the line of code for each. Shown in an iframe on markofucek.com (Live components), served
 * at air.markofucek.com/figma-to-code/.
 */
export function FigmaToCode() {
  const [current, setCurrent] = useState(0);
  const [match, setMatch] = useState<number | null>(null);
  const [zoom, setZoom] = useState<Zoom>({ zoom: 1, cropped: false });
  const [liveZoom, setLiveZoom] = useState<Zoom>({ zoom: 1, cropped: false });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const figmaCanvas = useRef<HTMLDivElement>(null);
  const codeCanvas = useRef<HTMLDivElement>(null);
  const item = items[current];
  const list = rows[item.key];
  const set = specs[item.key];
  const base = 'base' in set ? set.base : undefined;
  const meta = base ? variantLine(base, false) : `Frame ${item.drawn.width} × ${item.drawn.height}`;
  const metaShort = base ? variantLine(base, true) : `Frame ${item.drawn.width} × ${item.drawn.height}`;

  const select = (i: number) => {
    setCurrent(i);
    setMatch(null);
    setZoom({ zoom: 1, cropped: false });
    setLiveZoom({ zoom: 1, cropped: false });
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
      <h1 className="air-visually-hidden">Figma to code: AIR from atoms to a page template, in Figma and in React</h1>

      <div className="ftc__tabs" role="tablist" aria-label="Steps, from atoms to a template">
        {items.map((it, i) => {
          const first = i === 0 || items[i - 1].level !== it.level;
          return (
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
              className={['ftc__tab', first && 'ftc__tab--first'].filter(Boolean).join(' ')}
              data-label={it.key}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {first && (
                <span className="ftc__level" aria-hidden="true">
                  {it.level}
                </span>
              )}
              <span className="air-visually-hidden">{it.level}: </span>
              {it.key}
            </button>
          );
        })}
      </div>

      <div className="ftc__panes" role="tabpanel" id="ftc-panel" aria-labelledby={`ftc-tab-${current}`}>
        <section className="ftc__pane ftc__pane--figma" aria-labelledby="ftc-figma-title">
          <div className="ftc__head">
            <h2 id="ftc-figma-title" className="ftc__title">
              In Figma · {item.key}
            </h2>
            <p className="ftc__meta">
              <span className="ftc__wide">{meta}</span>
              <span className="ftc__narrow">{metaShort}</span>
            </p>
          </div>
          <div ref={figmaCanvas} className={['ftc__canvas', 'ftc__canvas--figma', zoom.cropped && 'is-cropped'].filter(Boolean).join(' ')}>
            {zoom.zoom < 1 && <span className="ftc__zoom">{percent(zoom.zoom)}</span>}
            <div className={['ftc__selected', item.frame && 'ftc__selected--frame'].filter(Boolean).join(' ')}>
              <p className="ftc__component" aria-hidden="true">
                {!item.frame && <span className="ftc__mark" />}
                {item.frame ? set.spec.n : item.key}
              </p>
              <div className="ftc__selection">
                <Fit key={item.key} box={figmaCanvas} width={item.drawn.width} height={item.drawn.height} onZoom={setZoom}>
                  <img src={item.drawn.src} width={item.drawn.width} height={item.drawn.height} alt={`${item.key} as drawn in Figma: ${item.drawn.label}`} />
                </Fit>
                <span className="ftc__handle ftc__handle--tl" />
                <span className="ftc__handle ftc__handle--tr" />
                <span className="ftc__handle ftc__handle--bl" />
                <span className="ftc__handle ftc__handle--br" />
              </div>
            </div>
          </div>
          <dl className="ftc__rows">
            {list.map((row, i) => (
              <div key={i} {...rowProps(i, row)}>
                <dt className="ftc__label">{row.label || <span className="air-visually-hidden">Built from</span>}</dt>
                <dd className="ftc__chips">{row.kind === 'var' ? <VarChips row={row} /> : <PartChip row={row} />}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ftc__pane ftc__pane--code" aria-labelledby="ftc-code-title">
          <div className="ftc__head">
            <h2 id="ftc-code-title" className="ftc__title">
              In code · &lt;{item.usage.slice(1).split(/[\s>]/)[0]}&gt;
            </h2>
            <a className="ftc__usage ftc__wide" href={`/?path=/docs/${item.story}`} target="_blank" rel="noopener">
              {item.usage}
              <span className="air-visually-hidden"> (opens its Storybook page in a new tab)</span>
            </a>
          </div>
          <div ref={codeCanvas} className={['ftc__canvas', 'ftc__canvas--code', liveZoom.cropped && 'is-cropped'].filter(Boolean).join(' ')}>
            {liveZoom.zoom < 1 && <span className="ftc__zoom">{percent(liveZoom.zoom)}</span>}
            <div className="ftc__live">
              {item.liveSize ? (
                <Fit key={item.key} box={codeCanvas} width={item.liveSize.width} height={item.liveSize.height} onZoom={setLiveZoom}>
                  <item.Live />
                </Fit>
              ) : (
                <item.Live key={item.key} />
              )}
            </div>
          </div>
          <ul className="ftc__rows" aria-label={`The code of ${item.key}, one line per row on the left`}>
            {list.map((row, i) => (
              <li key={i} {...rowProps(i, row)}>
                <CodeLine row={row} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
