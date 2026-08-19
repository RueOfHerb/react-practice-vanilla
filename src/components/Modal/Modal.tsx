import type { JSX } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  element: JSX.Element;
  onClose: () => void;
}

const Modal = ({ element, onClose }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          X
        </button>
        {element}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
