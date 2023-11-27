import PropTypes from "prop-types";
import Button from "../Button";
import style from "./cart.module.scss";
import { useContext } from "react";
import { AppContext } from "../../services/stores/appContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";

function Cart({ onClose }) {
  const { cartData, onChangeCartItemQuantityButtonClick } =
    useContext(AppContext);

  if (!cartData.length) {
    return (
      <div>
        No item selected.{" "}
        <div className={style["cart-actions"]}>
          <Button label={"Close"} onClick={onClose} />
        </div>
      </div>
    );
  }

  const totalPrice = cartData.reduce(
    (acc, cur) => acc + +cur.price * cur.quantity,
    0
  );

  return (
    <div className={style.cart}>
      <h2 className={style.title}>Your Cart</h2>
      <ul className={style["cart-items"]}>
        {cartData.map((data) => {
          const { id, name, price, quantity } = data;
          return (
            <li key={id} className={style["cart-item"]}>
              <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
              </p>
              <p className={style["cart-item-action"]}>
                <button
                  className={style["change-quantity"]}
                  onClick={() =>
                    onChangeCartItemQuantityButtonClick(id, 1, "DECREASE")
                  }
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className={style["change-quantity"]}
                  onClick={() =>
                    onChangeCartItemQuantityButtonClick(id, 1, "INCREASE")
                  }
                >
                  +
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <div className={style["total-price"]}>
        {currencyFormatter.format(totalPrice)}
      </div>
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
