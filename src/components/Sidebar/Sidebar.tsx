import { Children, type HTMLAttributes, type ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import { SidebarCollapsedContext } from './sidebarContext';
import './Sidebar.css';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Nav items, top to bottom. */
  children: ReactNode;
  /** Icons only, 64 px wide. Hides the trial card and footer. */
  collapsed?: boolean;
  /** Names the navigation for screen readers. */
  label?: string;
  /** Where the logo links to, usually the dashboard. */
  logoHref?: string;
  /** A Trial card above the footer while the account is on a free trial. */
  trialCard?: ReactNode;
  /** One line at the bottom: Privacy, Terms and the copyright. */
  footer?: ReactNode;
}

/**
 * The app's main navigation, full height: a 56 px logo header that lines up with
 * the Top bar, the Nav items, an optional Trial card and a one-line footer.
 */
export function Sidebar({ children, collapsed = false, label = 'Main', logoHref, trialCard, footer, className, ...rest }: SidebarProps) {
  const classes = ['air-sidebar', collapsed && 'air-sidebar--collapsed', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="air-sidebar__header">
        {logoHref ? (
          <a className="air-sidebar__home" href={logoHref}>
            <Logo />
          </a>
        ) : (
          <Logo />
        )}
      </div>
      <nav aria-label={label}>
        <SidebarCollapsedContext.Provider value={collapsed}>
          <ul className="air-sidebar__nav">
            {Children.map(children, (child) => (child ? <li>{child}</li> : null))}
          </ul>
        </SidebarCollapsedContext.Provider>
      </nav>
      <div className="air-sidebar__spacer" />
      {!collapsed && trialCard}
      {!collapsed && footer && (
        <div className="air-sidebar__footer" data-theme="dark">
          {footer}
        </div>
      )}
    </div>
  );
}
