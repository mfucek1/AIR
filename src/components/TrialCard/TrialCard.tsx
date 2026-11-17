import type { HTMLAttributes, ReactNode } from 'react';
import { Clock, Lock } from 'lucide-react';
import { Button } from '../Button/Button';
import hourglass from '../../assets/trial/hourglass.jpg';
import candidates from '../../assets/trial/candidates.jpg';
import './TrialCard.css';

export interface TrialCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Days left in the trial. 3 or fewer is Ending, 0 is Ended. */
  daysLeft: number;
  /** Length of the trial, one bar segment per day. */
  totalDays?: number;
  /** Figma: Visual. Hi-fi icon is the Sidebar default, Lo-fi icon the quietest, Illustration the loudest. */
  visual?: 'lo-fi' | 'hi-fi' | 'illustration';
  /** One line on what Pro keeps, with the account's own numbers. */
  description: ReactNode;
  actionLabel?: string;
  onUpgrade?: () => void;
}

type TrialState = 'active' | 'ending' | 'ended';

const trialState = (daysLeft: number): TrialState => (daysLeft <= 0 ? 'ended' : daysLeft <= 3 ? 'ending' : 'active');

/**
 * Featured card at the bottom of the Sidebar for the free trial: days left, what
 * Pro keeps, one call to action. The days turn amber at 3 or fewer; Ended drops the bar.
 */
export function TrialCard({
  daysLeft,
  totalDays = 14,
  visual = 'hi-fi',
  description,
  actionLabel = 'Upgrade to Pro',
  onUpgrade,
  className,
  ...rest
}: TrialCardProps) {
  const state = trialState(daysLeft);
  const left = Math.max(0, Math.min(daysLeft, totalDays));
  const title = state === 'ended' ? 'Your trial has ended' : `${left} ${left === 1 ? 'day' : 'days'} left in your trial`;
  const classes = ['air-trial-card', `air-trial-card--${state}`, className].filter(Boolean).join(' ');
  const LoFiIcon = state === 'ended' ? Lock : Clock;

  return (
    <div className={classes} {...rest}>
      {visual === 'lo-fi' && (
        <span className="air-trial-card__visual air-trial-card__visual--lo-fi">
          {/* Figma: the icon is in the Dark colour mode, tinted Action, Warning or Chrome. */}
          <LoFiIcon className="air-trial-card__icon" size={20} data-theme="dark" aria-hidden="true" />
        </span>
      )}
      {visual === 'hi-fi' && <img className="air-trial-card__visual air-trial-card__visual--hi-fi" src={hourglass} alt="" width={48} height={48} />}
      {visual === 'illustration' && (
        <img className="air-trial-card__visual air-trial-card__visual--illustration" src={candidates} alt="" width={184} height={80} />
      )}
      <div className="air-trial-card__copy">
        <p className="air-trial-card__title">{title}</p>
        <p className="air-trial-card__text">{description}</p>
      </div>
      {state !== 'ended' && (
        <div className="air-trial-card__days" data-theme="dark" aria-hidden="true">
          {Array.from({ length: totalDays }, (_, i) => (
            <span key={i} className={i < totalDays - left ? 'air-trial-card__day air-trial-card__day--used' : 'air-trial-card__day'} />
          ))}
        </div>
      )}
      <div data-theme="dark">
        <Button size="s" className="air-trial-card__action" onClick={onUpgrade}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
