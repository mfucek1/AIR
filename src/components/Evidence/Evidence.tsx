import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { CircleCheck, Info, Quote, TriangleAlert, CircleX } from 'lucide-react';
import { BadgeIcon } from '../Badge/Badge';
import { Link } from '../Link/Link';
import './Evidence.css';

/* Citation chip ------------------------------------------------------------ */

export interface CitationChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Where the line is, like "CV · p. 1". */
  label: string;
  /** While its line is highlighted in the document. Sets aria-pressed. */
  selected?: boolean;
}

/** Points to the source line behind an AI claim. Click to highlight it in the document. */
export function CitationChip({ label, selected = false, className, ...rest }: CitationChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={['air-citation', selected && 'air-citation--selected', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Quote size={12} aria-hidden="true" />
      <span className="air-visually-hidden">Source: </span>
      {label}
    </button>
  );
}

/* Criteria evidence row ---------------------------------------------------- */

export type CriterionStatus = 'met' | 'partly' | 'not-met' | 'unknown';

const statusInfo = {
  met: { tone: 'success', text: 'Met' },
  partly: { tone: 'warning', text: 'Partly met' },
  'not-met': { tone: 'danger', text: 'Not met' },
  unknown: { tone: 'neutral', text: 'Unknown' },
} as const;

export interface CriteriaEvidenceRowProps extends HTMLAttributes<HTMLDivElement> {
  /** The recruiter-set criterion, like "React, 5+ years". */
  criterion: string;
  /** The AI's reading of it. */
  status: CriterionStatus;
  /** The cited line, or for Unknown what to do about it. */
  evidence: ReactNode;
  /** Where the evidence is; omit for Unknown. */
  citation?: { label: string; onClick?: () => void };
  /** While its citation is highlighted in the document. */
  selected?: boolean;
  /** Lets a person overrule the AI. */
  onChange?: () => void;
}

/**
 * One criterion, the AI's reading of it (Met, Partly met, Not met, Unknown)
 * and the cited line from the CV.
 */
export function CriteriaEvidenceRow({ criterion, status, evidence, citation, selected = false, onChange, className, ...rest }: CriteriaEvidenceRowProps) {
  const info = statusInfo[status];
  return (
    <div className={['air-criterion', `air-criterion--${status}`, selected && 'air-criterion--selected', className].filter(Boolean).join(' ')} {...rest}>
      <BadgeIcon tone={info.tone} size="m" label={info.text} />
      <div className="air-criterion__content">
        <div className="air-criterion__title-row">
          <span className="air-criterion__name">{criterion}</span>
          <span className="air-criterion__status" aria-hidden="true">
            {info.text}
          </span>
          {citation && status !== 'unknown' && <CitationChip label={citation.label} selected={selected} onClick={citation.onClick} />}
          {onChange && (
            <Link variant="neutral" size="s" onClick={onChange}>
              Change<span className="air-visually-hidden"> {criterion}</span>
            </Link>
          )}
        </div>
        <p className="air-criterion__evidence">{evidence}</p>
      </div>
    </div>
  );
}

/* Flag row ----------------------------------------------------------------- */

const flagIcons = { danger: CircleX, warning: TriangleAlert, success: CircleCheck, info: Info };

export interface FlagRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Danger fails a hard rule, Warning needs a look, Success passes, Info is neutral context. */
  tone?: 'danger' | 'warning' | 'success' | 'info';
  title: ReactNode;
  detail?: ReactNode;
  action?: { label: string; onClick: () => void };
}

/** A knockout or must-check fact about a candidate, shown above the evidence. */
export function FlagRow({ tone = 'danger', title, detail, action, className, ...rest }: FlagRowProps) {
  const Icon = flagIcons[tone];
  return (
    <div className={['air-flag', `air-flag--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <Icon className="air-flag__icon" size={20} aria-hidden="true" />
      <p className="air-flag__text">
        <strong className="air-flag__title">{title}</strong> {detail && <span className="air-flag__detail">{detail}</span>}
      </p>
      {action && (
        <Link variant="neutral" size="s" onClick={action.onClick}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
