import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import './Link.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma: Type. */
  variant?: 'primary' | 'neutral' | 'danger';
  /** M with Body/M Strong, S with Body/S. */
  size?: 'm' | 's';
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  /** Without href it renders a button, for in-page actions like "Add criterion". */
  href?: string;
  disabled?: boolean;
  children: ReactNode;
}

/**
 * Padding-free text action: View all, Add criterion, Open CV. Not for the main
 * step: use Button. Inside running text, style the words as a plain link.
 */
export function Link({
  variant = 'primary',
  size = 'm',
  leadingIcon: Leading,
  trailingIcon: Trailing,
  href,
  disabled = false,
  className,
  children,
  onClick,
  ...rest
}: LinkProps) {
  const classes = ['air-link', `air-link--${variant}`, `air-link--${size}`, className].filter(Boolean).join(' ');
  const iconSize = size === 'm' ? 16 : 14;
  const content = (
    <>
      {Leading && <Leading className="air-link__icon" size={iconSize} aria-hidden="true" />}
      <span className="air-link__label">{children}</span>
      {Trailing && <Trailing className="air-link__icon" size={iconSize} aria-hidden="true" />}
    </>
  );

  if (href === undefined) {
    return (
      <button
        type="button"
        className={classes}
        disabled={disabled}
        onClick={onClick as unknown as (e: MouseEvent<HTMLButtonElement>) => void}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      {...rest}
    >
      {content}
    </a>
  );
}
