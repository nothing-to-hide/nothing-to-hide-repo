import { JSX, useEffect } from "react";
import "./modal.css";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: JSX.Element;
  actions?: JSX.Element;
  children?: JSX.Element;
  autoClose?: number;
  isBlocking?: boolean;
};

/**
 * A reusable modal dialog component that overlays the current view.
 *
 * @param {boolean} props.open - Whether the modal is currently open.
 * @param {() => void} [props.onClose] - Function called when the modal is requested to close (e.g. click outside or timeout).
 * @param {string} [props.title] - Optional title displayed at the top of the modal.
 * @param {JSX.Element} [props.content] - Optional content to display within the modal body. Ignored if `children` is provided.
 * @param {JSX.Element} [props.actions] - Optional footer element for action buttons (e.g., "OK", "Cancel").
 * @param {JSX.Element} [props.children] - Optional children to display as content instead of `content` prop.
 * @param {number} [props.autoClose] - Optional duration (in milliseconds) after which the modal auto-closes.
 * @param {boolean} [props.isBlocking] - If true, clicking outside the modal will not close it.
 */
export const Modal = ({
  open,
  onClose,
  title,
  content,
  actions,
  isBlocking,
  children,
  autoClose,
}: ModalProps) => {
  if (!open) return null;

  useEffect(() => {
    if (autoClose && autoClose > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="modal-overlay" onClick={isBlocking ? undefined : onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {title && <h1 className="modal-title">{title}</h1>}
        <div className="modal-content">{content || children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
};
