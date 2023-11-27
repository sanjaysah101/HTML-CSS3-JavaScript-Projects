import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import style from "./Modal.module.scss";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className={style.modal} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
