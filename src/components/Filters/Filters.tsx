import { useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Checkbox, type CheckboxProps } from '../Checkbox/Checkbox';
import { Tag } from '../Tag/Tag';
import '../Field/Field.css';
import './Filters.css';

/* Filter chip -------------------------------------------------------------- */

export interface FilterChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'> {
  /** The filter's name, like "Stage:". */
  filterKey?: string;
  /** Its values, like "Screening +1". */
  value: string;
  /** While its values popover is open. Sets aria-expanded. */
  open?: boolean;
  /** Shows the ✕ that removes the filter. */
  onRemove?: () => void;
}

/** One active filter. Click opens its values; ✕ removes it. */
export function FilterChip({ filterKey, value, open = false, onRemove, className, ...rest }: FilterChipProps) {
  const name = [filterKey, value].filter(Boolean).join(' ');
  return (
    <span className={['air-filter-chip', open && 'air-filter-chip--open', className].filter(Boolean).join(' ')}>
      <button type="button" className="air-filter-chip__main" aria-expanded={open} aria-haspopup="dialog" {...rest}>
        {filterKey && <span className="air-filter-chip__key">{filterKey}</span>}
        <span className="air-filter-chip__value">{value}</span>
      </button>
      {onRemove && (
        <button type="button" className="air-filter-chip__remove" aria-label={`Remove filter ${name}`} onClick={onRemove}>
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

/* Filter option ------------------------------------------------------------ */

export interface FilterOptionProps extends CheckboxProps {
  /** Candidates that match this option in the current results. */
  count?: number;
}

/** A checkbox and how many candidates match it. The whole row is the target. */
export function FilterOption({ count, className, ...rest }: FilterOptionProps) {
  return (
    <div className={['air-filter-option', className].filter(Boolean).join(' ')}>
      <Checkbox {...rest} />
      {count !== undefined && <span className="air-filter-option__count">{count}</span>}
    </div>
  );
}

/* Tag input ---------------------------------------------------------------- */

export interface TagInputProps {
  label: ReactNode;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  helper?: ReactNode;
  className?: string;
}

/**
 * A field that holds several values as removable Tags and grows to new lines.
 * Enter or comma adds; Backspace on an empty field removes the last tag.
 */
export function TagInput({ label, values, onChange, placeholder = 'Add a skill', required, helper, className }: TagInputProps) {
  const id = useId();
  const [draft, setDraft] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const add = () => {
    const v = draft.trim().replace(/,$/, '');
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && draft === '' && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div className={['air-field', 'air-tag-input', className].filter(Boolean).join(' ')}>
      <label className="air-field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="air-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="air-field-box air-tag-input__box" onClick={() => input.current?.focus()}>
        <ul className="air-tag-input__tags" aria-label="Added">
          {values.map((v) => (
            <li key={v}>
              <Tag onRemove={() => onChange(values.filter((x) => x !== v))}>{v}</Tag>
            </li>
          ))}
        </ul>
        <input
          ref={input}
          id={id}
          className="air-field-control air-tag-input__control"
          value={draft}
          placeholder={values.length ? undefined : placeholder}
          required={required && values.length === 0}
          aria-describedby={helper ? `${id}-helper` : undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={add}
        />
      </div>
      {helper && (
        <p className="air-field__helper" id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
}
