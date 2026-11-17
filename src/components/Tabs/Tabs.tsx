import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Counter } from '../Counter/Counter';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: string;
  icon?: LucideIcon;
  /** A Counter after the label, like Interviews 3. */
  count?: number;
  /** The panel shown when this tab is selected. */
  panel?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Names the tab list for screen readers, like "Candidate sections". */
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Switch between sections of one object: Overview, Evidence, Interviews.
 * Arrow keys move between tabs. Not for switching a layout or range in place:
 * use Segmented control.
 */
export function Tabs({ items, label, value, defaultValue, onChange, className }: TabsProps) {
  const base = useId();
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = items.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    select(items[next].value);
  };

  return (
    <div className={['air-tabs', className].filter(Boolean).join(' ')}>
      <div role="tablist" aria-label={label} className="air-tabs__list">
        {items.map((item, i) => {
          const selected = item.value === current;
          const Icon = item.icon;
          return (
            <button
              key={item.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={item.panel !== undefined ? `${base}-panel-${i}` : undefined}
              tabIndex={selected ? 0 : -1}
              className="air-tab"
              onClick={() => select(item.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {Icon && <Icon className="air-tab__icon" size={16} aria-hidden="true" />}
              <span className="air-tab__label">{item.label}</span>
              {item.count !== undefined && <Counter count={item.count} />}
            </button>
          );
        })}
      </div>
      {items.map((item, i) =>
        item.panel !== undefined ? (
          <div
            key={item.value}
            role="tabpanel"
            id={`${base}-panel-${i}`}
            aria-labelledby={`${base}-tab-${i}`}
            hidden={item.value !== current}
            tabIndex={0}
            className="air-tabs__panel"
          >
            {item.panel}
          </div>
        ) : null,
      )}
    </div>
  );
}
