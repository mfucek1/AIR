import type { InputHTMLAttributes, ReactNode } from 'react';
import './Switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label?: ReactNode;
}

/**
 * A setting that takes effect at once: notifications, sharing, auto-reject.
 * Not for choices submitted with a form: use Checkbox.
 */
export function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label className={['air-switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" className="air-switch__input" {...rest} />
      <span className="air-switch__track" aria-hidden="true">
        <span className="air-switch__knob" />
      </span>
      {label && <span className="air-switch__label">{label}</span>}
    </label>
  );
}
