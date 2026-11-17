import { useId, useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Field } from '../Field/Field';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hideLabel?: boolean;
  helper?: ReactNode;
  /** Error text: replaces the helper and turns the border red. */
  error?: ReactNode;
  /** Shows the character count against maxLength, like 120/500. */
  showCounter?: boolean;
}

/** Multi-line text: notes, feedback, job descriptions, messages. Not for one line: use Input. */
export function Textarea({
  label,
  hideLabel,
  helper,
  error,
  showCounter = true,
  required,
  disabled,
  id,
  className,
  rows = 4,
  value,
  defaultValue,
  maxLength,
  onChange,
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const helperId = `${textareaId}-helper`;
  const [typed, setTyped] = useState(String(defaultValue ?? '').length);
  const length = value !== undefined ? String(value).length : typed;
  const counter = showCounter && maxLength ? `${length}/${maxLength}` : undefined;
  return (
    <Field
      htmlFor={textareaId}
      helperId={helperId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      helper={helper}
      error={error}
      counter={counter}
      disabled={disabled}
      className={className}
    >
      <div className="air-field-box air-field-box--m air-textarea">
        <textarea
          id={textareaId}
          className="air-field-control"
          rows={rows}
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helper ? helperId : undefined}
          {...rest}
          onChange={(e) => {
            setTyped(e.target.value.length);
            onChange?.(e);
          }}
        />
      </div>
    </Field>
  );
}
