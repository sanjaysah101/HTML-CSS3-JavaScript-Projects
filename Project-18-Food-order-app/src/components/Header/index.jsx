import { useContext, useRef } from "react";

import Button from "../Button";
import Modal from "../Modal";
import Cart from "../Cart";

import style from "./header.module.scss";
import logo from "/logo.jpg";
import { AppContext } from "../../services/stores/appContext";

function Header() {
  const modalRef = useRef();
  const { cartData } = useContext(AppContext);

  const handleCartClick = () => {
    modalRef.current.open();
  };

  const onCloseModal = () => {
    modalRef.current.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        <Cart onClose={onCloseModal} />
      </Modal>
      <div className={style.navigation}>
        <div className={style.brand}>
          <img src={logo} alt="Food order logo" />
          <span>ReactFood</span>
        </div>
        <div className={style["user-action"]}>
          <Button
            type={"button-text"}
            label={`Cart (${cartData.length})`}
            onClick={handleCartClick}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
