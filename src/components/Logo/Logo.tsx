import type { HTMLAttributes } from 'react';
import './Logo.css';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Tone. On chrome for the Sidebar, On surface for light pages and emails. */
  tone?: 'on-chrome' | 'on-surface';
}

/** The AIR wordmark with the two bars. Not for favicons. */
export function Logo({ tone = 'on-chrome', className, ...rest }: LogoProps) {
  const classes = ['air-logo', `air-logo--${tone}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} role="img" aria-label="AIR" {...rest}>
      <span className="air-logo__wordmark" aria-hidden="true">
        AIR
      </span>
      <span className="air-logo__mark" aria-hidden="true">
        <span className="air-logo__bar" />
        <span className="air-logo__bar air-logo__bar--short" />
      </span>
    </span>
  );
}
