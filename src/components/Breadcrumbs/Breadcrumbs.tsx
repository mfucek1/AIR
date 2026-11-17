import type { HTMLAttributes } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '../Link/Link';
import './Breadcrumbs.css';

export interface Crumb {
  label: string;
  href: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Up to two links above the current page. Leave empty for top-level pages. */
  items?: Crumb[];
  /** The current page, as plain text. Figma: Current. */
  current: string;
}

/** Path to the current page in the Top bar: up to two links, then the current page. */
export function Breadcrumbs({ items = [], current, className, ...rest }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={['air-breadcrumbs', className].filter(Boolean).join(' ')} {...rest}>
      <ol className="air-breadcrumbs__list">
        {items.slice(0, 2).map((item) => (
          <li key={item.href} className="air-breadcrumbs__item">
            <Link variant="neutral" size="s" href={item.href} className="air-breadcrumbs__link">
              {item.label}
            </Link>
            <ChevronRight className="air-breadcrumbs__separator" size={16} aria-hidden="true" />
          </li>
        ))}
        <li className="air-breadcrumbs__item air-breadcrumbs__current" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
