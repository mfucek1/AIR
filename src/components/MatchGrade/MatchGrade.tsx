import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CircleCheck, CircleX, Info, Sparkles } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { Link } from '../Link/Link';
import { Divider } from '../Menu/Menu';
import './MatchGrade.css';

export type MatchLevel = 'strong' | 'partial' | 'limited' | 'not-graded';

const levelText: Record<MatchLevel, string> = {
  strong: 'Strong match',
  partial: 'Partial match',
  limited: 'Limited match',
  'not-graded': 'Not graded',
};

export interface MatchGradeProps {
  /** Strong: every must-have. Partial: at least half. Limited: fewer than half. Not graded: no must-haves, or the CV can't be read. */
  level: MatchLevel;
  /** Count of everything met, shown inside the level, like "8/8". */
  count?: string;
  /** Usually a Must-haves popover. Hover or focus opens it, a click pins it, Escape closes it. */
  popover?: ReactNode;
  className?: string;
}

/**
 * How well a candidate meets the job's must-haves, in one word. The sparkles
 * say an AI made the grade. Not a %, and never red or amber.
 */
export function MatchGrade({ level, count, popover, className }: MatchGradeProps) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const open = !!popover && (hovered || pinned);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinned(false);
        setHovered(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setPinned(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const Icon = level === 'not-graded' ? Info : Sparkles;
  const label = count ? `${levelText[level]} · ${count}` : levelText[level];
  const classes = ['air-match-grade', `air-match-grade--${level}`, className].filter(Boolean).join(' ');
  const chipContent = (
    <>
      <span>{label}</span>
      <Icon size={12} aria-hidden="true" />
      {level !== 'not-graded' && <span className="air-visually-hidden">(graded by AI)</span>}
    </>
  );

  if (!popover) return <span className={classes}>{chipContent}</span>;

  return (
    <span
      ref={wrap}
      className="air-match-grade-anchor"
      onMouseEnter={() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setHovered(true), 150);
      }}
      onMouseLeave={() => {
        window.clearTimeout(timer.current);
        setHovered(false);
      }}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      <button type="button" className={classes} aria-expanded={open} aria-controls={id} onClick={() => setPinned(!pinned)}>
        {chipContent}
      </button>
      <div id={id} role="dialog" aria-label="Must-haves" className="air-match-grade__popover" hidden={!open}>
        {popover}
      </div>
    </span>
  );
}

export interface MustHave {
  label: string;
  status: 'met' | 'not-met' | 'unknown';
}

export interface NiceToHave {
  label: string;
  met: boolean;
}

export interface MustHavesPopoverProps {
  level: Exclude<MatchLevel, 'not-graded'>;
  mustHaves: MustHave[];
  niceToHaves?: NiceToHave[];
  /** The one link to change the job's must-haves. */
  onEdit?: () => void;
  className?: string;
}

const chipTone = { met: 'success', 'not-met': 'danger', unknown: 'neutral' } as const;
const chipStatus = { met: 'met', 'not-met': 'not met', unknown: 'not in the CV' } as const;

/** What a Match grade is built from: one chip per must-have, then the nice-to-haves. */
export function MustHavesPopover({ level, mustHaves, niceToHaves = [], onEdit, className }: MustHavesPopoverProps) {
  const met = mustHaves.filter((m) => m.status === 'met').length;
  const niceMet = niceToHaves.filter((n) => n.met).length;
  return (
    <div className={['air-must-haves', `air-must-haves--${level}`, className].filter(Boolean).join(' ')}>
      <div className="air-must-haves__head">
        <p className="air-must-haves__title">
          Must-haves <span className="air-must-haves__count">{`${met} of ${mustHaves.length} met`}</span>
        </p>
        {onEdit && (
          <Link size="s" onClick={onEdit}>
            Edit
          </Link>
        )}
      </div>
      <ul className="air-must-haves__chips">
        {mustHaves.map((m) => (
          <li key={m.label}>
            <Badge tone={chipTone[m.status]} showIcon>
              {m.label}
              <span className="air-visually-hidden">, {chipStatus[m.status]}</span>
            </Badge>
          </li>
        ))}
      </ul>
      {niceToHaves.length > 0 && (
        <>
          <Divider />
          <div className="air-must-haves__nice">
            <p className="air-must-haves__nice-title">{`Nice-to-haves · ${niceMet} of ${niceToHaves.length} met`}</p>
            <ul className="air-must-haves__nice-items">
              {niceToHaves.map((n) => (
                <NiceToHaveItem key={n.label} label={n.label} met={n.met} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

/** One nice-to-have. A missed one is grey, never red: it never changes the grade. */
export function NiceToHaveItem({ label, met }: NiceToHave) {
  const Icon = met ? CircleCheck : CircleX;
  return (
    <li className={`air-nice-to-have air-nice-to-have--${met ? 'met' : 'missed'}`}>
      <Icon size={12} aria-hidden="true" />
      {label}
      <span className="air-visually-hidden">{met ? ', met' : ', not met'}</span>
    </li>
  );
}
