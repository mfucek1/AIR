import type { HTMLAttributes } from 'react';
import { Avatar } from '../Avatar/Avatar';
import './AvatarStack.css';

export interface AvatarStackPerson {
  name: string;
  src?: string;
}

export interface AvatarStackProps extends HTMLAttributes<HTMLDivElement> {
  people: AvatarStackPerson[];
  /** Names the group, like "Interviewers". */
  label: string;
  /** S with 24 px avatars, M with 32 px. */
  size?: 's' | 'm';
  /** Avatars shown before the +N count. Up to four. */
  max?: number;
}

/**
 * Group of people on one object: interviewers, hiring team, viewers. Up to
 * four avatars and a +N count. Not for one person: use Avatar.
 */
export function AvatarStack({ people, label, size = 's', max = 4, className, ...rest }: AvatarStackProps) {
  const shown = people.slice(0, Math.min(max, 4));
  const more = people.length - shown.length;
  return (
    <div role="group" aria-label={label} className={['air-avatar-stack', `air-avatar-stack--${size}`, className].filter(Boolean).join(' ')} {...rest}>
      {shown.map((p) => (
        <span key={p.name} className="air-avatar-stack__ring">
          <Avatar size={size} name={p.name} src={p.src} />
        </span>
      ))}
      {more > 0 && (
        <span className="air-avatar-stack__ring">
          <span className="air-avatar-stack__more" role="img" aria-label={`${more} more`}>
            +{more}
          </span>
        </span>
      )}
    </div>
  );
}
