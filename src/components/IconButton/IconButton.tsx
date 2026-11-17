import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tooltip, type TooltipProps } from '../Tooltip/Tooltip';
import './IconButton.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Lucide icon. 20 px at M, 16 px at S. */
  icon: LucideIcon;
  /** What it does, in a few words. Becomes the accessible name and the tooltip. */
  label: string;
  /** Figma: Type. */
  variant?: 'ghost' | 'secondary' | 'primary';
  /** M 40 px, S 32 px. */
  size?: 'm' | 's';
  /** Where the tooltip opens, or false for none (only when the label shows elsewhere). */
  tooltip?: TooltipProps['placement'] | false;
}

/**
 * Icon-only action in toolbars, table rows and panel headers, always with a
 * tooltip. Not for actions that need words to be clear: use Button.
 */
export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'm',
  tooltip = 'top',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  const classes = ['air-icon-button', `air-icon-button--${variant}`, `air-icon-button--${size}`, className]
    .filter(Boolean)
    .join(' ');
  const button = (
    <button type={type} className={classes} aria-label={label} {...rest}>
      <Icon size={size === 'm' ? 20 : 16} aria-hidden="true" />
    </button>
  );
  if (tooltip === false) return button;
  return (
    <Tooltip content={label} placement={tooltip} describe={false}>
      {button}
    </Tooltip>
  );
}
