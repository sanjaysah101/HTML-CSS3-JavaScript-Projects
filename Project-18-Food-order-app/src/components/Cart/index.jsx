import PropTypes from "prop-types";
import Button from "../UI/Button";
import style from "./cart.module.scss";
import { useContext } from "react";
import { CartContext } from "../../services/stores/CartContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";
import { UserProgressContext } from "../../services/stores/UserProgress";

function Cart({ onClose }) {
  const { showCheckout, hideCart } = useContext(UserProgressContext);

  const { cartData, onAddItem, onRemoveItem } = useContext(CartContext);

  const handleGoToCartButtonClick = () => {
    hideCart();
    showCheckout();
  };

  const handleCloseCartButton = () => {
    hideCart();
    onClose();
  };

  if (!cartData.length) {
    return (
      <div>
        No item selected.
        <div className={"modal-actions"}>
          <Button type="button" onClick={onClose} variant="text">
            Close
          </Button>
        </div>
      </div>
    );
  }

  const cartTotal = cartData.reduce(
    (totalPrice, item) => totalPrice + +item.price * item.quantity,
    0
  );

  return (
    <div className={style.cart}>
      <h2 className="modal-title">Your Cart</h2>
      <ul className={style["cart-items"]}>
        {cartData
          ? cartData.map((data) => {
              const { mealId, name, price, quantity } = data;
              return (
                <CartItem
                  key={data.id}
                  data={{ mealId, name, price: +price, quantity: +quantity }}
                  onRemoveItem={onRemoveItem}
                  onAddItem={onAddItem}
                />
              );
            })
          : null}
      </ul>
      <div className={style["total-price"]}>
        {currencyFormatter.format(cartTotal)}
      </div>
      <div className="modal-actions">
        <Button type="button" variant="text" onClick={handleCloseCartButton}>
          Close
        </Button>
        <Button type="button" onClick={handleGoToCartButtonClick}>
          Go to Checkout
        </Button>
      </div>
    </div>
  );
}

function CartItem({ data, onRemoveItem, onAddItem }) {
  const { mealId, name, price, quantity } = data;

  return (
    <li className={style["cart-item"]}>
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className={style["cart-item-action"]}>
        <button
          type="button"
          className={style["change-quantity"]}
          onClick={() => onRemoveItem(mealId)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          className={style["change-quantity"]}
          onClick={() => onAddItem(mealId)}
        >
          +
        </button>
      </p>
    </li>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func,
};

CartItem.propTypes = {
  data: PropTypes.shape({
    mealId: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default Cart;
