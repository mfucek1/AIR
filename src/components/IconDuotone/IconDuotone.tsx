import type { SVGAttributes } from 'react';
import { icons, type IconDuotoneName } from './icons';

export type { IconDuotoneName } from './icons';

export interface IconDuotoneProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  /** Figma: Icon. */
  name: IconDuotoneName;
  /** 20 px, like the side menu. */
  size?: number;
}

/**
 * Two-tone icon for the side menu only: the outline plus a 40% fill of the same
 * colour, so it follows the Nav item states. Everywhere else, use outline icons.
 */
export function IconDuotone({ name, size = 20, ...rest }: IconDuotoneProps) {
  const icon = icons[name];
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...rest}>
      {icon.tone.map((d, i) => (
        <path key={`tone-${i}`} d={d} fill="currentColor" opacity={0.4} />
      ))}
      {icon.line.map((d, i) => (
        <path key={`line-${i}`} d={d} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
