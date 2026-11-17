import { useId, type ReactNode } from 'react';
import { Check, CircleX, FileText, LogOut, SkipForward, type LucideIcon } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import './StagePath.css';

export type StepState = 'done' | 'current' | 'upcoming' | 'skipped' | 'rejected' | 'withdrawn' | 'hired' | 'not-reached';

const stateIcons: Partial<Record<StepState, LucideIcon>> = {
  done: Check,
  hired: Check,
  skipped: SkipForward,
  rejected: CircleX,
  withdrawn: LogOut,
};

const stateNames: Record<StepState, string> = {
  done: 'done',
  current: 'current stage',
  upcoming: 'upcoming',
  skipped: 'skipped',
  rejected: 'rejected here',
  withdrawn: 'withdrew here',
  hired: 'hired',
  'not-reached': 'not reached',
};

export interface PathStepProps {
  label: string;
  state: StepState;
  /** Start: flat left edge, for the first stage. Chevron for the rest. */
  shape?: 'start' | 'chevron';
  /** Time in stage, shown after the label, like "4 days". Usually on the current step. */
  time?: string;
  /** Marks a stage that has a file (as in the shipped tracker). */
  document?: boolean;
}

/** One stage in the Stage path. Not interactive: moving a candidate is a button. */
export function PathStep({ label, state, shape = 'chevron', time, document }: PathStepProps) {
  const clip = useId();
  const Icon = stateIcons[state];
  return (
    <li className={`air-path-step air-path-step--${state} air-path-step--${shape}`} aria-current={state === 'current' ? 'step' : undefined}>
      {shape === 'chevron' && (
        <svg className="air-path-step__notch" width="11" height="32" viewBox="0 0 11 32" aria-hidden="true">
          <clipPath id={`${clip}n`}>
            <path d="M0 0H11V32H0L10 16Z" />
          </clipPath>
          <path className="air-path-step__fill" d="M0 0H11V32H0L10 16Z" />
          <path className="air-path-step__line" clipPath={`url(#${clip}n)`} d="M11 0H0L10 16L0 32H11" />
        </svg>
      )}
      <span className="air-path-step__body">
        {Icon && <Icon className="air-path-step__icon" size={14} aria-hidden="true" />}
        <span className="air-path-step__label">{label}</span>
        <span className="air-visually-hidden">, {stateNames[state]}</span>
        {document && <FileText className="air-path-step__icon" size={14} aria-label="Has a file" role="img" />}
        {time && <span className="air-path-step__time">· {time}</span>}
      </span>
      <svg className="air-path-step__tip" width="11" height="32" viewBox="-1 0 11 32" aria-hidden="true">
        <clipPath id={`${clip}t`}>
          <path d="M-1 0H0L10 16L0 32H-1Z" />
        </clipPath>
        <path className="air-path-step__fill" d="M-1 0H0L10 16L0 32H-1Z" />
        <path className="air-path-step__line" clipPath={`url(#${clip}t)`} d="M-1 0H0L10 16L0 32H-1" />
      </svg>
    </li>
  );
}

export interface StagePathStep {
  label: string;
  state: StepState;
  time?: string;
  document?: boolean;
}

export interface StagePathProps {
  /** The job's stages, one to one with its board columns. */
  steps: StagePathStep[];
  /** In progress shows the action; the closed states show an outcome badge. */
  status?: 'in-progress' | 'hired' | 'rejected' | 'withdrawn';
  /** Date on the outcome badge, like "12 May". */
  outcomeDate?: string;
  /** One action at the end while in progress, like a "Move to stage" button. */
  action?: ReactNode;
  /** Names the list for screen readers. */
  label?: string;
  className?: string;
}

const outcomes = {
  hired: { tone: 'success', text: 'Hired' },
  rejected: { tone: 'danger', text: 'Rejected' },
  withdrawn: { tone: 'neutral', text: 'Withdrew' },
} as const;

/**
 * The candidate's hiring stages for one job, as a chevron path. Closed states
 * stay at the stage where the candidate left; later stages show Not reached.
 */
export function StagePath({ steps, status = 'in-progress', outcomeDate, action, label = 'Hiring stages', className }: StagePathProps) {
  const outcome = status !== 'in-progress' ? outcomes[status] : undefined;
  return (
    <div className={['air-stage-path', className].filter(Boolean).join(' ')}>
      <ol className="air-stage-path__steps" aria-label={label}>
        {steps.map((s, i) => (
          <PathStep key={s.label} {...s} shape={i === 0 ? 'start' : 'chevron'} />
        ))}
      </ol>
      {outcome ? (
        <Badge tone={outcome.tone} showIcon>
          {outcomeDate ? `${outcome.text} · ${outcomeDate}` : outcome.text}
        </Badge>
      ) : (
        action
      )}
    </div>
  );
}
