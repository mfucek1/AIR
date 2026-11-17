import type { HTMLAttributes } from 'react';
import './Counter.css';

export interface CounterProps extends HTMLAttributes<HTMLSpanElement> {
  count: number | string;
  /** Neutral on surfaces, Brand for unread, Chrome inside the dark sidebar. */
  tone?: 'neutral' | 'brand' | 'chrome';
}

/** Number next to a label, like Applied 24 or 3 unread. Not for statuses: use Badge. */
export function Counter({ count, tone = 'neutral', className, ...rest }: CounterProps) {
  const classes = ['air-counter', `air-counter--${tone}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {count}
    </span>
  );
}
