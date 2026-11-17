import type { HTMLAttributes, ReactNode } from 'react';
import { Bell, CircleHelp } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import './TopBar.css';

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  /** Usually Breadcrumbs. */
  breadcrumbs: ReactNode;
  /** Usually Command search. */
  search?: ReactNode;
  /** The signed-in person, shown as their photo. */
  account: { name: string; src?: string };
  /** A red dot on the bell. Figma: Show unread dot. */
  unread?: boolean;
  onHelp?: () => void;
  onNotifications?: () => void;
  onAccount?: () => void;
}

/**
 * The 56 px bar at the top of the content column, right of the Sidebar:
 * breadcrumbs, search with ⌘K, help, notifications and the account photo.
 */
export function TopBar({ breadcrumbs, search, account, unread = false, onHelp, onNotifications, onAccount, className, ...rest }: TopBarProps) {
  return (
    <header className={['air-top-bar', className].filter(Boolean).join(' ')} {...rest}>
      <div className="air-top-bar__path">{breadcrumbs}</div>
      {search}
      <div className="air-top-bar__actions">
        <IconButton icon={CircleHelp} label="Help" tooltip="bottom" onClick={onHelp} />
        <span className="air-top-bar__notifications">
          <IconButton icon={Bell} label={unread ? 'Notifications, new' : 'Notifications'} tooltip="bottom" onClick={onNotifications} />
          {unread && <span className="air-top-bar__dot" aria-hidden="true" />}
        </span>
        <button type="button" className="air-top-bar__account" aria-label={`Account, ${account.name}`} onClick={onAccount}>
          <Avatar size="m" name={account.name} src={account.src} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
