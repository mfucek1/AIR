import type { InputHTMLAttributes, ReactNode } from 'react';
import './Radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

/** One option of a Radio group. */
export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label className={['air-radio', className].filter(Boolean).join(' ')}>
      <input type="radio" className="air-radio__input" {...rest} />
      <span className="air-radio__circle" aria-hidden="true" />
      {label && <span className="air-radio__label">{label}</span>}
    </label>
  );
}

export interface RadioGroupProps {
  /** The question the options answer. Rendered as the fieldset's legend. */
  label: ReactNode;
  name: string;
  options: { value: string; label: ReactNode; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Vertical for forms, horizontal for 2 or 3 short options. */
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  className?: string;
}

/**
 * Choose exactly one of 2 to 5 visible options: employment type, seniority.
 * Not for long lists: use Select. Not for switching views: use Segmented control.
 */
export function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  disabled,
  className,
}: RadioGroupProps) {
  return (
    <fieldset
      className={['air-radio-group', `air-radio-group--${orientation}`, className].filter(Boolean).join(' ')}
      disabled={disabled}
    >
      <legend className="air-radio-group__legend">{label}</legend>
      <div className="air-radio-group__options">
        {options.map((o) => (
          <Radio
            key={o.value}
            name={name}
            value={o.value}
            label={o.label}
            disabled={o.disabled}
            checked={value === undefined ? undefined : value === o.value}
            defaultChecked={defaultValue === undefined ? undefined : defaultValue === o.value}
            onChange={() => onChange?.(o.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
