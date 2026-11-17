import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import './Field.css';

export interface FieldProps {
  /** id of the control the label points to. */
  htmlFor: string;
  /** id for the helper or error text, referenced by aria-describedby. */
  helperId: string;
  label?: ReactNode;
  /** Keeps the label for screen readers only, for fields whose purpose shows otherwise (a search box). */
  hideLabel?: boolean;
  required?: boolean;
  /** Marks a value the AI filled in. Shows the sparkles and says so to screen readers. */
  aiFilled?: boolean;
  helper?: ReactNode;
  /** Error text. Replaces the helper and turns the field red. */
  error?: ReactNode;
  /** Shown at the end of the footer row, like 120/500. */
  counter?: ReactNode;
  size?: 'm' | 's';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The label row and helper row shared by Input, Textarea and Select, as in
 * their Figma component sets. Exported for custom fields.
 */
export function Field({
  htmlFor,
  helperId,
  label,
  hideLabel,
  required,
  aiFilled,
  helper,
  error,
  counter,
  size = 'm',
  disabled,
  className,
  children,
}: FieldProps) {
  const classes = ['air-field', `air-field--${size}`, error && 'air-field--error', disabled && 'air-field--disabled', className]
    .filter(Boolean)
    .join(' ');
  const message = error ?? helper;
  return (
    <div className={classes}>
      {label && (
        <label className={['air-field__label', hideLabel && 'air-visually-hidden'].filter(Boolean).join(' ')} htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="air-field__required" aria-hidden="true">
              *
            </span>
          )}
          {aiFilled && (
            <>
              <Sparkles className="air-field__ai" size={12} aria-hidden="true" />
              <span className="air-visually-hidden">(filled by AI)</span>
            </>
          )}
        </label>
      )}
      {children}
      {(message || counter) && (
        <div className="air-field__footer">
          {message && (
            <p className="air-field__helper" id={helperId}>
              {message}
            </p>
          )}
          {counter && <span className="air-field__counter">{counter}</span>}
        </div>
      )}
    </div>
  );
}
