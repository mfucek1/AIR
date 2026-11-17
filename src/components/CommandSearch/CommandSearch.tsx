import { useEffect, type ButtonHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import './CommandSearch.css';

export interface CommandSearchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** What you can find. Figma: Placeholder. */
  placeholder?: string;
  /** Opens the command palette, from a click or ⌘K / Ctrl+K anywhere on the page. */
  onOpen?: () => void;
  /** Listen for ⌘K / Ctrl+K. Turn off if the page already handles it. */
  shortcut?: boolean;
}

/**
 * Opens the command palette for jobs, candidates, actions and AI questions. Lives
 * in the Top bar. It looks like a field but is a button. Not for filtering a list.
 */
export function CommandSearch({
  placeholder = 'Search candidates and jobs',
  onOpen,
  shortcut = true,
  className,
  onClick,
  ...rest
}: CommandSearchProps) {
  useEffect(() => {
    if (!shortcut || !onOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpen();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [shortcut, onOpen]);

  return (
    <button
      type="button"
      className={['air-command-search', className].filter(Boolean).join(' ')}
      aria-haspopup="dialog"
      aria-keyshortcuts={shortcut ? 'Meta+K Control+K' : undefined}
      onClick={(e) => {
        onClick?.(e);
        onOpen?.();
      }}
      {...rest}
    >
      <Search className="air-command-search__icon" size={16} aria-hidden="true" />
      <span className="air-command-search__placeholder">{placeholder}</span>
      {shortcut && (
        <kbd className="air-command-search__keys" aria-hidden="true">
          ⌘K
        </kbd>
      )}
    </button>
  );
}
