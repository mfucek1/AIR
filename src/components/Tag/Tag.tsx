import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import './Tag.css';

export interface TagProps {
  children: ReactNode;
  /** Selected state, for tags used as filters. Sets aria-pressed. */
  selected?: boolean;
  /** Makes the tag a toggle button. */
  onClick?: () => void;
  /** Shows a remove button. Its accessible name is "Remove" plus the label. */
  onRemove?: () => void;
  /** Plain-text label for the remove button, when children aren't a string. */
  removeLabel?: string;
  className?: string;
}

/** A skill, keyword or filter value. Click to select; remove when it's an input value. */
export function Tag({ children, selected = false, onClick, onRemove, removeLabel, className }: TagProps) {
  const classes = ['air-tag', selected && 'air-tag--selected', className].filter(Boolean).join(' ');
  const label = removeLabel ?? (typeof children === 'string' ? children : 'tag');

  if (onRemove) {
    return (
      <span className={classes}>
        {children}
        <button type="button" className="air-tag__remove" aria-label={`Remove ${label}`} onClick={onRemove}>
          <X size={14} aria-hidden="true" />
        </button>
      </span>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={classes} aria-pressed={selected} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className={classes}>{children}</span>;
}
