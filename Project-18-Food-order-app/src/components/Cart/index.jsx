import PropTypes from "prop-types";
import Button from "../Button";
import style from "./cart.module.scss";

function Cart({ onClose }) {
  return (
    <div className={style.cart}>
      <h2 className={style.title}>Your Cart</h2>
      <ul className={style["cart-items"]}>
        <li className={style["cart-item"]}>
          <p>Seafood Paella - 1 x $19.99</p>
          <p className={style["cart-item-action"]}>
            <button className={style["change-quantity"]}>-</button>
            <span>1</span>
            <button className={style["change-quantity"]}>+</button>
          </p>
        </li>
      </ul>
      <div className={style["total-price"]}>$19.99</div>
      <div className={style["cart-actions"]}>
        <Button type={"button-text"} label={"Close"} onClick={onClose} />
        <Button label={"Go to Checkout"} />
      </div>
    </div>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
