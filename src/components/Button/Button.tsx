import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. Figma: Type. */
  variant?: 'primary' | 'secondary' | 'subtle' | 'ghost';
  /** Danger for destructive actions. Figma: Tone. */
  tone?: 'default' | 'danger';
  /** M is 40 px for forms and pages, S is 32 px for tables and toolbars. */
  size?: 'm' | 's';
  /** Lucide icon before the label. */
  leadingIcon?: LucideIcon;
  /** Lucide icon after the label, usually a chevron for menus. */
  trailingIcon?: LucideIcon;
  children: ReactNode;
}

/**
 * The main action control. One Primary per view; Secondary for the rest;
 * Subtle and Ghost for low-emphasis actions in dense places.
 */
export function Button({
  variant = 'primary',
  tone = 'default',
  size = 'm',
  leadingIcon: Leading,
  trailingIcon: Trailing,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === 'm' ? 20 : 16;
  const classes = ['air-button', `air-button--${variant}`, `air-button--${size}`, tone === 'danger' && 'air-button--danger', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {Leading && <Leading className="air-button__icon" size={iconSize} aria-hidden="true" />}
      <span className="air-button__label">{children}</span>
      {Trailing && <Trailing className="air-button__icon" size={iconSize} aria-hidden="true" />}
    </button>
  );
}
