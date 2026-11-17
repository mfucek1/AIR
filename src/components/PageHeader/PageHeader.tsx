import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronLeft, type LucideIcon } from 'lucide-react';
import { Badge, type BadgeTone } from '../Badge/Badge';
import { Counter } from '../Counter/Counter';
import { Link } from '../Link/Link';
import './PageHeader.css';

export interface PageHeaderMeta {
  icon: LucideIcon;
  label: string;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  /** One line under the title. Figma: Show description. */
  description?: ReactNode;
  /** A link above the title, like Back to Jobs. Figma: Show back link. */
  backLink?: { label: string; href: string };
  /** A Counter after the title. Figma: Show counter. */
  count?: number;
  /** A Badge after the title, like Active. Figma: Show status. */
  status?: { label: string; tone?: BadgeTone };
  /** Icon and text pairs under the description: department, type, location. Figma: Show meta. */
  meta?: PageHeaderMeta[];
  /** Up to three Select S and a More filters button, on the title line. Figma: Show filters. */
  filters?: ReactNode;
  /** A Ghost S button with the current sort as its label, after the filters. Figma: Show sort. */
  sort?: ReactNode;
  /** Buttons on the right: one Primary, the rest Secondary. Figma: Show actions. */
  actions?: ReactNode;
}

/**
 * The top of a page, under the Top bar: title with a counter or status, a
 * description, meta, optional filters on the title line, and actions.
 */
export function PageHeader({ title, description, backLink, count, status, meta, filters, sort, actions, className, ...rest }: PageHeaderProps) {
  return (
    <div className={['air-page-header', className].filter(Boolean).join(' ')} {...rest}>
      <div className="air-page-header__text">
        {backLink && (
          <Link variant="neutral" href={backLink.href} leadingIcon={ChevronLeft} className="air-page-header__back">
            {backLink.label}
          </Link>
        )}
        <div className="air-page-header__title-row">
          <h1 className="air-page-header__title">{title}</h1>
          {count !== undefined && <Counter count={count} />}
          {status && (
            <Badge tone={status.tone ?? 'success'} size="m">
              {status.label}
            </Badge>
          )}
        </div>
        {description && <p className="air-page-header__description">{description}</p>}
        {meta && meta.length > 0 && (
          <ul className="air-page-header__meta">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="air-page-header__meta-item">
                <Icon className="air-page-header__meta-icon" size={16} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {(filters || sort) && (
        <div className="air-page-header__filters">
          {filters}
          {sort}
        </div>
      )}
      {actions && <div className="air-page-header__actions">{actions}</div>}
    </div>
  );
}
