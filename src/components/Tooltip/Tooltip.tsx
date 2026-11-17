import { cloneElement, useEffect, useId, useRef, useState, type ReactElement } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /** One short line. */
  content: string;
  /** Figma: Placement. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** The control it describes. Must accept focus and aria-describedby. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  /**
   * Adds aria-describedby to the child. Turn off when the tooltip repeats the
   * child's accessible name (Icon button does this), so it isn't read twice.
   */
  describe?: boolean;
  /** Forces it open, for docs and tests. */
  open?: boolean;
  /** Hover delay in ms. Keyboard focus shows it at once. */
  delay?: number;
}

/**
 * One short line that names an icon-only control or shows a truncated value.
 * Opens on hover and keyboard focus, closes on Escape.
 */
export function Tooltip({ content, placement = 'top', children, describe = true, open, delay = 300 }: TooltipProps) {
  const id = useId();
  const [shown, setShown] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const visible = open ?? shown;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShown(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [shown]);

  const show = (now: boolean) => {
    window.clearTimeout(timer.current);
    if (now) setShown(true);
    else timer.current = window.setTimeout(() => setShown(true), delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setShown(false);
  };

  return (
    <span
      className="air-tooltip-anchor"
      onMouseEnter={() => show(false)}
      onMouseLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      {describe ? cloneElement(children, { 'aria-describedby': id }) : children}
      <span
        id={id}
        role="tooltip"
        aria-hidden={describe ? undefined : true}
        className={`air-tooltip air-tooltip--${placement}`}
        data-open={visible || undefined}
      >
        {content}
      </span>
    </span>
  );
}
