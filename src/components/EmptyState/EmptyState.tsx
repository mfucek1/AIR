import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { illustrations, type IllustrationName } from './illustrations';
import './EmptyState.css';

export interface EmptyStateProps {
  /** 200 × 128 art from the Figma file. */
  illustration?: IllustrationName;
  title: string;
  /** One or two lines on why it's empty and what to do. */
  description?: ReactNode;
  /** One Secondary S action. */
  action?: { label: string; onClick: () => void };
  className?: string;
}

/** Centred in an empty list, panel or preview. Same art in the list and the preview. */
export function EmptyState({ illustration = 'noCandidates', title, description, action, className }: EmptyStateProps) {
  return (
    <div className={['air-empty-state', className].filter(Boolean).join(' ')}>
      <svg className="air-empty-state__art" width="200" height="128" viewBox="0 0 200 128" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: illustrations[illustration] }} />
      <div className="air-empty-state__text">
        <h3 className="air-empty-state__title">{title}</h3>
        {description && <p className="air-empty-state__description">{description}</p>}
      </div>
      {action && (
        <Button variant="secondary" size="s" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
