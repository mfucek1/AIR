import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import './Dialog.css';

export interface DialogAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** One sentence that says what happens next. */
  description?: string;
  /** M (560 px) for modals, S (400 px) for small confirmations. */
  size?: 'm' | 's';
  /** One primary per dialog. Danger for a destructive one. */
  primaryAction?: DialogAction & { tone?: 'default' | 'danger' };
  /** Optional middle action, like Reset. */
  middleAction?: DialogAction;
  /** Cancel closes the dialog. Set false to hide it. */
  cancelLabel?: string | false;
  children?: ReactNode;
}

/**
 * A modal dialog on the native <dialog> element: focus moves in and stays in,
 * Escape and Cancel close it, and the page behind is inert.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'm',
  primaryAction,
  middleAction,
  cancelLabel = 'Cancel',
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`air-dialog air-dialog--${size}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <header className="air-dialog__header">
        <div className="air-dialog__heading">
          <h2 id={titleId} className="air-dialog__title">
            {title}
          </h2>
          {description && (
            <p id={descId} className="air-dialog__description">
              {description}
            </p>
          )}
        </div>
        <IconButton icon={X} label="Close" size="s" tooltip={false} onClick={onClose} />
      </header>
      {children && <div className="air-dialog__body">{children}</div>}
      {(primaryAction || cancelLabel) && (
        <footer className="air-dialog__footer">
          {cancelLabel && (
            <Button variant="secondary" size={size} onClick={onClose}>
              {cancelLabel}
            </Button>
          )}
          <div className="air-dialog__actions">
            {middleAction && (
              <Button variant="ghost" size={size} onClick={middleAction.onClick} disabled={middleAction.disabled}>
                {middleAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size={size} tone={primaryAction.tone} onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </footer>
      )}
    </dialog>
  );
}
