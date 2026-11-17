import type { HTMLAttributes } from 'react';
import './Progress.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0 to 100. */
  value: number;
  /** What's progressing, like "Analysing 12 CVs". Also the accessible name. */
  label: string;
  hideLabel?: boolean;
  /** Text on the right, like "3 of 12". Defaults to the percentage. */
  valueText?: string;
  /** Brand for most work, AI for the AI's own work, Success when done, Danger when it failed. */
  tone?: 'brand' | 'ai' | 'success' | 'danger';
}

/**
 * How far a known amount of work has got: AI analysis, uploads, onboarding
 * tasks. Not for loading content: use Skeleton.
 */
export function Progress({ value, label, hideLabel, valueText, tone = 'brand', className, ...rest }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const text = valueText ?? `${Math.round(clamped)}%`;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-valuetext={valueText}
      className={['air-progress', `air-progress--${tone}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {!hideLabel && (
        <div className="air-progress__header" aria-hidden="true">
          <span className="air-progress__label">{label}</span>
          <span className="air-progress__value">{text}</span>
        </div>
      )}
      <div className="air-progress__track">
        <div className="air-progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
