import type { HTMLAttributes, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { toneIcons, type FeedbackTone } from '../Toast/tones';
import './Banner.css';

interface BannerAction {
  label: string;
  onClick: () => void;
}

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: FeedbackTone | 'neutral';
  /** Subtle: light tint and border. Medium: deeper tint, no border. Strong: solid fill. */
  emphasis?: 'subtle' | 'medium' | 'strong';
  /** Default stacks title, description and actions; Compact is one row with the title only. */
  layout?: 'default' | 'compact';
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  onDismiss?: () => void;
}

/**
 * A message that stays on the page until it's resolved or dismissed: a trial
 * ending, a sync error, an AI summary to review. For short messages after an
 * action, use Toast.
 */
export function Banner({
  tone = 'neutral',
  emphasis = 'subtle',
  layout = 'default',
  title,
  description,
  primaryAction,
  secondaryAction,
  onDismiss,
  className,
  ...rest
}: BannerProps) {
  const Icon = toneIcons[tone === 'neutral' ? 'info' : tone];
  const classes = ['air-banner', `air-banner--${tone}`, `air-banner--${emphasis}`, `air-banner--${layout}`, className]
    .filter(Boolean)
    .join(' ');
  const actions = (primaryAction || secondaryAction) && (
    <div className="air-banner__actions">
      {primaryAction && (
        <Button variant="secondary" size="s" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
      )}
      {secondaryAction && (
        <Button variant="ghost" size="s" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
      )}
    </div>
  );
  return (
    <div className={classes} {...rest}>
      <Icon className="air-banner__icon" size={20} aria-hidden="true" />
      <div className="air-banner__content">
        <p className="air-banner__title">{title}</p>
        {layout === 'default' && description && <p className="air-banner__description">{description}</p>}
        {layout === 'default' && actions}
      </div>
      {layout === 'compact' && actions}
      {onDismiss && <IconButton className="air-banner__dismiss" icon={X} label="Dismiss" size="s" tooltip={false} onClick={onDismiss} />}
    </div>
  );
}
