import type { HTMLAttributes, ReactNode } from 'react';
import { X } from 'lucide-react';
import { toneIcons, type FeedbackTone } from './tones';
import { IconButton } from '../IconButton/IconButton';
import { Link } from '../Link/Link';
import './Toast.css';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: FeedbackTone;
  title: ReactNode;
  description?: ReactNode;
  /** One follow-up, like Undo or View. A toast with an action shouldn't auto-dismiss. */
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
  /** Dark toast for light pages that need more contrast. Uses the Dark theme tokens. */
  inverse?: boolean;
  /** Card stacks title and description; Bar puts them on one line for wide screens. */
  layout?: 'card' | 'bar';
}

/**
 * Short message after an action: moved, saved, failed. Shown bottom-left.
 * Errors use role="alert"; the rest are polite status messages. Not for
 * errors that block the page: show them on the page.
 */
export function Toast({
  tone = 'info',
  title,
  description,
  action,
  onClose,
  inverse = false,
  layout = 'card',
  className,
  ...rest
}: ToastProps) {
  const Icon = toneIcons[tone];
  const classes = ['air-toast', `air-toast--${tone}`, `air-toast--${layout}`, className].filter(Boolean).join(' ');
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={classes}
      data-theme={inverse ? 'dark' : undefined}
      {...rest}
    >
      <Icon className="air-toast__icon" size={20} aria-hidden="true" />
      <div className="air-toast__content">
        <p className="air-toast__title">{title}</p>
        {description && <p className="air-toast__description">{description}</p>}
        {action && (
          <div className="air-toast__actions">
            <Link onClick={action.onClick}>{action.label}</Link>
          </div>
        )}
      </div>
      {onClose && <IconButton className="air-toast__close" icon={X} label="Dismiss" size="s" tooltip={false} onClick={onClose} />}
    </div>
  );
}
