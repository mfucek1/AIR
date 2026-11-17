import { useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { Field } from '../Field/Field';
import { fieldBoxClasses } from '../Field/fieldBox';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  hideLabel?: boolean;
  helper?: ReactNode;
  /** Error text: replaces the helper and turns the border red. */
  error?: ReactNode;
  /** M 40 px for forms, S 32 px for filters in page headers and dense toolbars. */
  size?: 'm' | 's';
  options: SelectOption[];
  /** First, empty choice shown in the muted colour, like "Choose a department". */
  placeholder?: string;
  leadingIcon?: LucideIcon;
  aiFilled?: boolean;
}

/**
 * Choose one option from a list: department, location, seniority. A native
 * select, so the list, keyboard and screen readers work everywhere. Not for 2
 * to 5 options shown at once: use Radio or Segmented control.
 */
export function Select({
  label,
  hideLabel,
  helper,
  error,
  size = 'm',
  options,
  placeholder,
  leadingIcon: Leading,
  aiFilled,
  required,
  disabled,
  id,
  className,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helperId = `${selectId}-helper`;
  const iconSize = size === 'm' ? 20 : 16;
  return (
    <Field
      htmlFor={selectId}
      helperId={helperId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      aiFilled={aiFilled}
      helper={helper}
      error={error}
      size={size}
      disabled={disabled}
      className={className}
    >
      <div className={fieldBoxClasses(size, 'air-select')}>
        {Leading && <Leading className="air-select__icon" size={iconSize} aria-hidden="true" />}
        <select
          id={selectId}
          className="air-field-control air-select__control"
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helper ? helperId : undefined}
          {...rest}
        >
          {placeholder !== undefined && (
            <option value="" disabled={required} data-placeholder="">
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="air-select__chevron" size={iconSize} aria-hidden="true" />
      </div>
    </Field>
  );
}
