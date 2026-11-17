import { useEffect, useRef, type ButtonHTMLAttributes, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { Check, type LucideIcon } from 'lucide-react';
import './Menu.css';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the menu for screen readers, like "Candidate actions". */
  label: string;
  /** Moves focus to the first item on open. Use it when a button opens the menu. */
  autoFocus?: boolean;
  children: ReactNode;
}

/**
 * Floating list of actions or options opened from a Button, Icon button or
 * Select. Arrow keys, Home and End move between items. Not for navigation
 * between pages: use the sidebar or Link.
 */
export function Menu({ label, children, className, onKeyDown, autoFocus, ...rest }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  // One item is reachable with Tab (the first enabled one); arrows do the rest.
  useEffect(() => {
    const first = ref.current?.querySelector<HTMLButtonElement>('.air-menu-item:not(:disabled)');
    if (!first) return;
    first.tabIndex = 0;
    if (autoFocus) first.focus();
  }, [autoFocus]);
  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const items = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('.air-menu-item:not(:disabled)') ?? []);
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const last = items.length - 1;
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index <= 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    items[next].focus();
  };
  return (
    <div ref={ref} role="menu" aria-label={label} className={['air-menu', className].filter(Boolean).join(' ')} onKeyDown={move} {...rest}>
      {children}
    </div>
  );
}

export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  icon?: LucideIcon;
  /** Keyboard shortcut shown at the end, like ⌘E. */
  shortcut?: string;
  /** For options: true or false makes it a checkable item and shows the check when true. */
  selected?: boolean;
  /** Destructive action, in red. Figma: Type=Danger. */
  danger?: boolean;
  children: ReactNode;
}

/** One row in a Menu: an action or an option, with optional icon, shortcut and check. */
export function MenuItem({ icon: Icon, shortcut, selected, danger, className, children, ...rest }: MenuItemProps) {
  const classes = ['air-menu-item', danger && 'air-menu-item--danger', selected && 'air-menu-item--selected', className]
    .filter(Boolean)
    .join(' ');
  const role = selected === undefined ? 'menuitem' : 'menuitemradio';
  return (
    <button type="button" role={role} aria-checked={selected} tabIndex={-1} className={classes} {...rest}>
      {Icon && <Icon className="air-menu-item__icon" size={16} aria-hidden="true" />}
      <span className="air-menu-item__label">{children}</span>
      {shortcut && <kbd className="air-menu-item__shortcut">{shortcut}</kbd>}
      {selected && <Check className="air-menu-item__check" size={16} aria-hidden="true" />}
    </button>
  );
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

/** A 1 px line between groups in menus, toolbars and lists. */
export function Divider({ orientation = 'horizontal', className, ...rest }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={['air-divider', `air-divider--${orientation}`, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
