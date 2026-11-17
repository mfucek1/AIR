import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';
import { Skeleton } from '../Skeleton/Skeleton';
import './AIBlock.css';

export interface AIBlockProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string;
  /** What it's built from, like "From 6 cited criteria". */
  meta?: string;
  /** Shows skeleton lines while the AI writes. */
  loading?: boolean;
  /** Thumbs up or down. Called with the choice, or null when it's taken back. */
  onFeedback?: (value: 'helpful' | 'not-right' | null) => void;
  /** The reminder under the text. Set to null to hide it. */
  footer?: ReactNode;
  children?: ReactNode;
}

/**
 * Text the AI wrote, marked as AI with violet and the sparkles. Says what it
 * is built from, takes thumbs up or down, and reminds people to check. Not
 * for human notes or system messages.
 */
export function AIBlock({
  title = 'AI summary',
  meta,
  loading = false,
  onFeedback,
  footer = 'AI can be wrong. Check the citations before you decide.',
  children,
  className,
  ...rest
}: AIBlockProps) {
  const [vote, setVote] = useState<'helpful' | 'not-right' | null>(null);
  const choose = (v: 'helpful' | 'not-right') => {
    const next = vote === v ? null : v;
    setVote(next);
    onFeedback?.(next);
  };
  return (
    <section aria-label={title} aria-busy={loading || undefined} className={['air-ai-block', className].filter(Boolean).join(' ')} {...rest}>
      <header className="air-ai-block__header">
        <Sparkles className="air-ai-block__icon" size={16} aria-hidden="true" />
        <h3 className="air-ai-block__title">{title}</h3>
        <span className="air-ai-block__meta">{loading ? 'Reading the CV…' : meta}</span>
        {onFeedback && !loading && (
          <span className="air-ai-block__feedback">
            <IconButton icon={ThumbsUp} label="Helpful" size="s" aria-pressed={vote === 'helpful'} onClick={() => choose('helpful')} />
            <IconButton icon={ThumbsDown} label="Not right" size="s" aria-pressed={vote === 'not-right'} onClick={() => choose('not-right')} />
          </span>
        )}
      </header>
      {loading ? (
        <div className="air-ai-block__loading">
          <Skeleton type="text" width="60%" />
          <Skeleton type="text" width="90%" />
          <Skeleton type="text" width="40%" />
        </div>
      ) : (
        <div className="air-ai-block__body">{children}</div>
      )}
      {footer && !loading && <p className="air-ai-block__footer">{footer}</p>}
    </section>
  );
}
