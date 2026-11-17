import { useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type Ref } from 'react';
import type { LucideIcon } from 'lucide-react';
import './SegmentedControl.css';

export interface SegmentItem {
  value: string;
  label: string;
  icon?: LucideIcon;
  /** Shows the icon only; the label stays as the accessible name. */
  iconOnly?: boolean;
}

export interface SegmentedControlProps {
  /** 2 to 4 segments. */
  segments: SegmentItem[];
  /** Names the control for screen readers, like "View". */
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Switch between 2 to 4 views or ranges of the same content: list or board,
 * 7 or 30 days. A radio group, so arrow keys move the selection. Not for
 * separate sections: use Tabs. Not inside forms: use Radio.
 */
export function SegmentedControl({ segments, label, value, defaultValue, onChange, className }: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue ?? segments[0]?.value);
  const current = value ?? inner;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = segments.length - 1;
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;
    e.preventDefault();
    const next = forward ? (index === last ? 0 : index + 1) : index === 0 ? last : index - 1;
    refs.current[next]?.focus();
    select(segments[next].value);
  };

  return (
    <div role="radiogroup" aria-label={label} className={['air-segmented', className].filter(Boolean).join(' ')}>
      {segments.map((s, i) => {
        const checked = s.value === current;
        return (
          <Segment key={s.value} label={s.label} icon={s.icon} iconOnly={s.iconOnly} checked={checked} onClick={() => select(s.value)} onKeyDown={(e) => onKeyDown(e, i)} ref={(el) => void (refs.current[i] = el)} />
        );
      })}
    </div>
  );
}

export interface SegmentProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, Omit<SegmentItem, 'value'> {
  /** The selected segment. Figma: State=Selected. */
  checked: boolean;
  ref?: Ref<HTMLButtonElement>;
}

/** One option in a Segmented control: a radio, with an icon, a label or both. Figma: Segment. */
export function Segment({ label, icon: Icon, iconOnly, checked, ref, ...rest }: SegmentProps) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={iconOnly ? label : undefined}
      tabIndex={checked ? 0 : -1}
      className="air-segment"
      {...rest}
    >
      {Icon && <Icon className="air-segment__icon" size={16} aria-hidden="true" />}
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
