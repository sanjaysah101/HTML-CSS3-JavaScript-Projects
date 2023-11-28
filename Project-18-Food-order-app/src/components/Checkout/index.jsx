import PropTypes from "prop-types";
import { CartContext } from "../../services/stores/CartContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";
import { UserProgressContext } from "../../services/stores/UserProgress";

import style from "./checkout.module.scss";
import { useContext } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../../hooks/useInput";
import {
  isEmail,
  isNotEmpty,
  isAllLetter,
} from "../../services/utils/inputValidate";

function Checkout({ onClose }) {
  const { hideCheckout } = useContext(UserProgressContext);
  const { cartData } = useContext(CartContext);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: hasNameError,
  } = useInput("", (value) => isAllLetter(value));

  const cartTotal = cartData.reduce(
    (totalPrice, item) => totalPrice + +item.price * item.quantity,
    0
  );

  const handleCloseButtonClick = () => {
    hideCheckout();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasEmailError || hasNameError) return;

    throw new Error("sending form data to server is not implemented");
  };

  return (
    <div className={style.cart}>
      <h2 className="modal-title">Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
      <div className={style["user-checkout-form"]}>
        <form>
          <Input
            id="fullName"
            label="Full Name"
            type="text"
            name="fullName"
            value={nameValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={hasNameError ? "Invalid name" : null}
          />

          <Input
            id="email"
            label="E-Mail Address"
            type="email"
            name="email"
            value={emailValue}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={hasEmailError ? "Please enter a valid email." : null}
          />
          <Input label="Street" id="street" type="text" name="street" />
          <div className={style.address}>
            <Input
              label="Postal Code"
              type="text"
              id="postalCode"
              name="postalCode"
            />
            <Input label="City" id="city" name="city" type="text" />
          </div>
        </form>
      </div>
      <div className="modal-actions">
        <Button textOnly onClick={handleCloseButtonClick}>
          Close
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit Order
        </Button>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  onClose: PropTypes.func,
};

export default Checkout;
