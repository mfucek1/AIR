import type { HTMLAttributes } from 'react';
import { Button } from '../Button/Button';
import './DecisionBar.css';

export interface DecisionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** The next stage, like "Tech task". */
  nextStage: string;
  hint?: string;
  onAdvance: () => void;
  /** Opens the reason dialog. */
  onReject: () => void;
  advanceLabel?: string;
  rejectLabel?: string;
}

/**
 * Sticky bar at the bottom of a candidate view: names the next stage and
 * holds the two decisions. Not for bulk actions or form footers.
 */
export function DecisionBar({
  nextStage,
  hint = 'You decide. The AI drafts and cites; it never moves a candidate.',
  onAdvance,
  onReject,
  advanceLabel,
  rejectLabel = 'Reject',
  className,
  ...rest
}: DecisionBarProps) {
  return (
    <div role="region" aria-label="Decision" className={['air-decision-bar', className].filter(Boolean).join(' ')} {...rest}>
      <div className="air-decision-bar__text">
        <p className="air-decision-bar__next">Next step: {nextStage}</p>
        {hint && <p className="air-decision-bar__hint">{hint}</p>}
      </div>
      <Button variant="secondary" tone="danger" onClick={onReject}>
        {rejectLabel}
      </Button>
      <Button onClick={onAdvance}>{advanceLabel ?? `Move to ${nextStage}`}</Button>
    </div>
  );
}
