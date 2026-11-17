import { useContext, type AnchorHTMLAttributes } from 'react';
import { Counter } from '../Counter/Counter';
import { IconDuotone, type IconDuotoneName } from '../IconDuotone/IconDuotone';
import { SidebarCollapsedContext } from '../Sidebar/sidebarContext';
import { Tooltip } from '../Tooltip/Tooltip';
import './NavItem.css';

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  /** A side menu icon from Icon duotone. */
  icon: IconDuotoneName;
  href: string;
  /** The current page. Figma: State=Active. */
  active?: boolean;
  /** A Counter after the label, like Candidates 13. Figma: Show counter. */
  count?: number;
  /** Icon only, with the label in a tooltip. Inside a collapsed Sidebar this is set for you. */
  collapsed?: boolean;
}

/**
 * One destination in the Sidebar: icon and label, an optional Counter, Active for
 * the current page. Not for actions (use Button) or tabs inside a page (use Tabs).
 */
export function NavItem({ label, icon, href, active = false, count, collapsed, className, ...rest }: NavItemProps) {
  const inCollapsedSidebar = useContext(SidebarCollapsedContext);
  const isCollapsed = collapsed ?? inCollapsedSidebar;
  const classes = ['air-nav-item', isCollapsed && 'air-nav-item--collapsed', className].filter(Boolean).join(' ');

  const link = (
    <a className={classes} href={href} aria-current={active ? 'page' : undefined} {...rest}>
      {/* Figma sets the Dark colour mode on the active icon slot, so Action resolves to the light petrol. */}
      <span className="air-nav-item__icon" data-theme={active ? 'dark' : undefined}>
        <IconDuotone name={icon} />
      </span>
      <span className={isCollapsed ? 'air-visually-hidden' : 'air-nav-item__label'}>{label}</span>
      {count !== undefined &&
        (isCollapsed ? <span className="air-visually-hidden">, {count}</span> : <Counter count={count} tone="chrome" />)}
    </a>
  );

  if (!isCollapsed) return link;
  return (
    <Tooltip content={label} placement="right" describe={false}>
      {link}
    </Tooltip>
  );
}
