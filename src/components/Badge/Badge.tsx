import type { HTMLAttributes, ReactNode } from 'react';
import { CircleCheck, CircleDot, CircleX, Info, Sparkles, TriangleAlert, type LucideIcon } from 'lucide-react';
import './Badge.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai';

const toneIcons: Record<BadgeTone, LucideIcon> = {
  neutral: CircleDot,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
  ai: Sparkles,
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Meaning of the status. AI is only for things the AI made or suggested. */
  tone?: BadgeTone;
  /** S for tables and cards, M next to titles. */
  size?: 's' | 'm';
  /** Solid fill for strong emphasis, e.g. on dark or busy surfaces. */
  inverse?: boolean;
  /** Show the tone's icon before the label. */
  showIcon?: boolean;
  children: ReactNode;
}

/** A short, read-only status label: stage, match, AI-filled, and so on. */
export function Badge({ tone = 'neutral', size = 's', inverse = false, showIcon = false, className, children, ...rest }: BadgeProps) {
  const Icon = toneIcons[tone];
  const classes = ['air-badge', `air-badge--${tone}`, `air-badge--${size}`, inverse && 'air-badge--inverse', className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {showIcon && <Icon className="air-badge__icon" size={size === 'm' ? 16 : 12} aria-hidden="true" />}
      {children}
    </span>
  );
}

export interface BadgeIconProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: 's' | 'm';
  inverse?: boolean;
  /** Accessible name, since there is no visible text. */
  label: string;
}

/** Icon-only badge, for tight spots like table cells. Always give it a label. */
export function BadgeIcon({ tone = 'neutral', size = 's', inverse = false, label, className, ...rest }: BadgeIconProps) {
  const Icon = toneIcons[tone];
  const classes = ['air-badge', 'air-badge--icon-only', `air-badge--${tone}`, `air-badge--${size}`, inverse && 'air-badge--inverse', className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes} role="img" aria-label={label} title={label} {...rest}>
      <Icon className="air-badge__icon" size={size === 'm' ? 16 : 12} aria-hidden="true" />
    </span>
  );
}
