import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./modal.module.scss";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialogRef.current.showModal(),
      close: () => dialogRef.current.close(),
    };
  });

  return createPortal(
    <dialog className={style.modal} ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
