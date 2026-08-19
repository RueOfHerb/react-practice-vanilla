import { useRef, type JSX } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  element: JSX.Element;
  onClose: () => void;
}

const Modal = ({ element, onClose }: ModalProps) => {

  //TBD - use cases understood for each, skipping useRef this phase for time.
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // const previouslyFocusedRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content" ref={modalRef}>
        <button ref={closeButtonRef} className="modal-close" onClick={onClose} aria-label="Close">
          X
        </button>
        {element}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
