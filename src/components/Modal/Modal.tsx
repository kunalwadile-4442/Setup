import React, { type MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';

interface ModalProps {
  show: boolean;
  onSubmit?: () => void;
  onHide: () => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  buttonRender?: React.ReactNode;
  closeButton?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<HeaderProps>;
  Body: React.FC<SectionProps>;
  Footer: React.FC<SectionProps>;
} = ({
  show,
  onHide,
  className,
  contentClassName,
  children,
  title,
  buttonRender,
  closeButton = true,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  isLoading = false
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay  ${className}`}>
      <div className={`modal-content bg-white ${contentClassName}`}>
        {title && (
          <Modal.Header
            closeButton={closeButton}
            onClose={onHide}
            buttonRender={buttonRender}
            headerClassName=""
          >
            {title}
          </Modal.Header>
        )}

        {children}

        {(submitLabel || cancelLabel) && (
          <Modal.Footer>
            {cancelLabel && (
              <button
                type="button"
                className="py-2.5 px-5 text-sm border rounded-lg bg-slate-200 hover:bg-slate-300"
                onClick={onHide}
              >
                {cancelLabel}
              </button>
            )}
            {submitLabel && (
              <Button
                label={submitLabel}
                className="bg-primary rounded-md text-white px-4 py-2"
                onClick={onSubmit}
                isLoading={isLoading}
                disabled={isLoading}
              />
            )}
          </Modal.Footer>
        )}
      </div>
    </div>,
    document.body
  );
};

// Props for header and sections
interface HeaderProps {
  closeButton?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  buttonRender?: React.ReactNode;
  headerClassName?: string;
  // sampleFile?: boolean;
}

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}
Modal.Header = ({ closeButton, onClose, children, buttonRender, headerClassName = '' }: HeaderProps) => (
  <div className={`modal-header ${headerClassName}`}>
    <div className="flex justify-between items-center w-full">
      <div>{children}</div>
      <div className="flex items-center gap-2">
        {buttonRender}
        
        {closeButton && (
         <button
              onClick={onClose}
              className="text-gray-400 hover:text-primary hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
        )}
      </div>
    </div>
  </div>
);

Modal.Body = ({ children, className = '' }: SectionProps) => (
  <div className={`modal-body ${className}`}>{children}</div>
);

Modal.Footer = ({ children }: SectionProps) => (
  <div className="modal-footer px-2 flex justify-end gap-2">{children}</div>
);

export default Modal;
