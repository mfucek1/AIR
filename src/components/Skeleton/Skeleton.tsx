import type { CSSProperties, HTMLAttributes } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text 12 px line, Title 16 px line, Circle for avatars, Block for cards and images. */
  type?: 'text' | 'title' | 'circle' | 'block';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

/**
 * Placeholder shape while content loads. Hidden from screen readers: set
 * aria-busy on the region that's loading instead. Not for work with a known
 * end: use Progress.
 */
export function Skeleton({ type = 'text', width, height, className, style, ...rest }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={['air-skeleton', `air-skeleton--${type}`, className].filter(Boolean).join(' ')}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
