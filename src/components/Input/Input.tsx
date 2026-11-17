import { useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { X, type LucideIcon } from 'lucide-react';
import { Field } from '../Field/Field';
import { fieldBoxClasses } from '../Field/fieldBox';
import { Tooltip } from '../Tooltip/Tooltip';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hideLabel?: boolean;
  helper?: ReactNode;
  /** Error text: replaces the helper and turns the border red. */
  error?: ReactNode;
  /** M 40 px for forms, S 32 px for filters in page headers and dense toolbars. */
  size?: 'm' | 's';
  leadingIcon?: LucideIcon;
  aiFilled?: boolean;
  /** Shows a Clear action while there's a value. */
  onClear?: () => void;
  /** One Input action at the end, like Filters or Show password. */
  trailingAction?: ReactNode;
}

/**
 * Single-line text entry: names, emails, job titles, search. Not for long
 * text: use Textarea. Not for picking from a list: use Select.
 */
export function Input({
  label,
  hideLabel,
  helper,
  error,
  size = 'm',
  leadingIcon: Leading,
  aiFilled,
  onClear,
  trailingAction,
  required,
  disabled,
  id,
  className,
  value,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = `${inputId}-helper`;
  const hasValue = value !== undefined && value !== '';
  return (
    <Field
      htmlFor={inputId}
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
      <div className={fieldBoxClasses(size, 'air-input')}>
        {Leading && <Leading className="air-input__icon" size={size === 'm' ? 20 : 16} aria-hidden="true" />}
        <input
          id={inputId}
          className="air-field-control"
          required={required}
          disabled={disabled}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helper ? helperId : undefined}
          {...rest}
        />
        {onClear && hasValue && !disabled && <InputAction icon={X} label="Clear" onClick={onClear} />}
        {trailingAction}
      </div>
    </Field>
  );
}

export interface InputActionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon;
  /** Names the action for screen readers and in its tooltip. */
  label: string;
  /** On, like filters applied. Sets aria-pressed. */
  active?: boolean;
  /** Shown next to the icon while active, like the number of filters. */
  count?: number;
}

/** One small action inside a field, at its end: Filters, Clear, Show password. */
export function InputAction({ icon: Icon, label, active, count, className, ...rest }: InputActionProps) {
  const classes = ['air-input-action', active && 'air-input-action--active', className].filter(Boolean).join(' ');
  return (
    <Tooltip content={label} describe={false}>
      <button type="button" className={classes} aria-label={label} aria-pressed={active} {...rest}>
        <Icon size={16} aria-hidden="true" />
        {active && count !== undefined && <span className="air-input-action__count">{count}</span>}
      </button>
    </Tooltip>
  );
}
