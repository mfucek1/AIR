import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  /** Figma: Checked=Mixed. For a parent whose children are partly checked. */
  indeterminate?: boolean;
}

/**
 * Choose any number of options in forms, filters and tables. Not for settings
 * that apply at once: use Switch.
 */
export function Checkbox({ label, indeterminate = false, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={['air-checkbox', className].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" className="air-checkbox__input" {...rest} />
      <span className="air-checkbox__box" aria-hidden="true">
        <Check className="air-checkbox__check" size={12} strokeWidth={3} />
        <Minus className="air-checkbox__minus" size={12} strokeWidth={3} />
      </span>
      {label && <span className="air-checkbox__label">{label}</span>}
    </label>
  );
}
