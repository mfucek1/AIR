import type { HTMLAttributes } from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

export interface RatingProps extends HTMLAttributes<HTMLSpanElement> {
  /** Average score, 0 to 5. Stars show whole stars (4.29 shows 4). */
  value: number;
  /** Always on in Figma: the stars alone are decoration. */
  showValue?: boolean;
  /** Decimals shown in the number. */
  decimals?: number;
}

/**
 * Average score as stars plus the number. Not for AI match scores: use Match
 * grade.
 */
export function Rating({ value, showValue = true, decimals = 1, className, ...rest }: RatingProps) {
  const whole = Math.max(0, Math.min(5, Math.floor(value)));
  const text = value.toFixed(decimals);
  return (
    <span role="img" aria-label={`Rated ${text} out of 5`} className={['air-rating', className].filter(Boolean).join(' ')} {...rest}>
      <span className="air-rating__stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={14} strokeWidth={0} className={i < whole ? 'air-rating__star air-rating__star--filled' : 'air-rating__star'} />
        ))}
      </span>
      {showValue && (
        <span className="air-rating__value" aria-hidden="true">
          {text}
        </span>
      )}
    </span>
  );
}
