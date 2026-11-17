import { useState, type HTMLAttributes } from 'react';
import { User } from 'lucide-react';
import './Avatar.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** S 24, M 32, L 48. */
  size?: 's' | 'm' | 'l';
  /** Person's or company's name. Used for initials and the accessible name. */
  name?: string;
  /** Photo URL (Type=Image). Falls back to initials if it fails to load. */
  src?: string;
  /** Company logo URL (Type=Logo): square corners instead of a circle. */
  logo?: string;
}

const iconSize = { s: 16, m: 20, l: 24 } as const;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.slice(0, 2) ?? '';
  return letters.toUpperCase();
}

/**
 * A person or company. Type follows the props: logo → Logo, src → Image,
 * name → Initials, nothing → Icon.
 */
export function Avatar({ size = 'm', name, src, logo, className, ...rest }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const type = logo ? 'logo' : src && !failed ? 'image' : name ? 'initials' : 'icon';
  const classes = ['air-avatar', `air-avatar--${size}`, `air-avatar--${type}`, className].filter(Boolean).join(' ');
  const a11y = name ? { role: 'img', 'aria-label': name } : { 'aria-hidden': true };

  return (
    <span className={classes} {...a11y} {...rest}>
      {type === 'logo' && <img src={logo} alt="" />}
      {type === 'image' && <img src={src} alt="" onError={() => setFailed(true)} />}
      {type === 'initials' && <span aria-hidden="true">{initialsOf(name!)}</span>}
      {type === 'icon' && <User size={iconSize[size]} aria-hidden="true" />}
    </span>
  );
}
