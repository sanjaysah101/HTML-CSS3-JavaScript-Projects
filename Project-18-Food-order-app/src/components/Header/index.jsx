import { useContext, useEffect, useRef, useState } from "react";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Cart from "../Cart";
import Checkout from "../Checkout";

import style from "./header.module.scss";
import logo from "/logo.jpg";
import { CartContext } from "../../services/stores/CartContext";
import { UserProgressContext } from "../../services/stores/UserProgress";
import SuccessMessage from "../SuccessMessage";

function Header() {
  const modalRef = useRef();
  const { cartData } = useContext(CartContext);
  const { userProgress, showCart } = useContext(UserProgressContext);
  const [cartTotalItem, setCartTotalItem] = useState(0);

  const handleCartClick = () => {
    showCart();
    modalRef.current.open();
  };

  const onCloseModal = () => {
    modalRef.current.close();
  };

  let modalBody = <Cart onClose={onCloseModal} />;

  if (userProgress === "CHECKOUT") {
    modalBody = <Checkout onClose={onCloseModal} />;
  } else if (userProgress === "ORDER_SUCCESS") {
    modalBody = <SuccessMessage onClose={onCloseModal} />;
  }

  useEffect(() => {
    setCartTotalItem(
      cartData.reduce((totalItem, item) => totalItem + item.quantity, 0)
    );
  }, [cartData]);

  return (
    <>
      <Modal ref={modalRef} onClose={onCloseModal}>
        {modalBody}
      </Modal>
      <div className={style.navigation}>
        <div className={style.brand}>
          <img src={logo} alt="Food order logo" />
          <span>ReactFood</span>
        </div>
        <div className={style["user-action"]}>
          <Button
            textOnly
            onClick={handleCartClick}
          >{`Cart (${cartTotalItem})`}</Button>
        </div>
      </div>
    </>
  );
}

export default Header;
