import { useId, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from '../Link/Link';
import './Section.css';

/* Section header ----------------------------------------------------------- */

export interface SectionHeaderProps {
  title: ReactNode;
  /** A count or short state after the title, like "4 of 6 met". */
  meta?: ReactNode;
  /** One Link action at the end. */
  action?: { label: string; onClick?: () => void; href?: string };
  /** Heading level. */
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

/** Titles a block inside a page or panel. Not for the page title. */
export function SectionHeader({ title, meta, action, as: Heading = 'h3', className }: SectionHeaderProps) {
  return (
    <div className={['air-section-header', className].filter(Boolean).join(' ')}>
      <Heading className="air-section-header__title">{title}</Heading>
      <span className="air-section-header__meta">{meta}</span>
      {action && (
        <Link variant="neutral" size="s" href={action.href} onClick={action.onClick}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* Section toggle ----------------------------------------------------------- */

export interface SectionToggleProps {
  title: string;
  /** One line on what's inside, shown while collapsed. */
  summary?: string;
  /** Adds "Filled by AI" when AIR filled the group. */
  aiFilled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  children?: ReactNode;
  className?: string;
}

/** Collapsible group header. Click, Enter or Space opens and closes it. */
export function SectionToggle({ title, summary, aiFilled, expanded, defaultExpanded = false, onToggle, children, className }: SectionToggleProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultExpanded);
  const open = expanded ?? inner;
  const Chevron = open ? ChevronDown : ChevronRight;
  return (
    <div className={['air-section-toggle', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="air-section-toggle__button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (expanded === undefined) setInner(!open);
          onToggle?.(!open);
        }}
      >
        <Chevron className="air-section-toggle__chevron" size={16} aria-hidden="true" />
        <span className="air-section-toggle__title">{title}</span>
        {summary && !open && <span className="air-section-toggle__summary">{summary}</span>}
        {aiFilled && (
          <span className="air-section-toggle__ai">
            <Sparkles size={14} aria-hidden="true" />
            Filled by AI
          </span>
        )}
      </button>
      <div id={id} className="air-section-toggle__panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
