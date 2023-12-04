import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../../services/stores/CartContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";
import { UserProgressContext } from "../../services/stores/UserProgress";

import style from "./checkout.module.scss";
import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../../hooks/useInput";
import {
  isEmail,
  isNotEmpty,
  isAllLetter,
} from "../../services/utils/inputValidate";
import { URL } from "../../services/constants/constants";
import useHttp from "../../hooks/useHttp";
import Error from "../UI/Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout({ onClose }) {
  const { hideCheckout, showSuccessMessageDialog } =
    useContext(UserProgressContext);

  const { cartData, clearCartData } = useContext(CartContext);

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

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp(`${URL}orders`, requestConfig);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasEmailError || hasNameError) return;

    const fd = new FormData(e.target);

    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartData,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button
        type="button"
        variant="text"
        onClick={handleCloseButtonClick}
      >
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  useEffect(() => {
    if (data && !error) {
      hideCheckout();
      showSuccessMessageDialog();
      clearCartData();
    }
  }, [data, error, clearCartData, hideCheckout, showSuccessMessageDialog]);

  return (
    <>
      <div className={style.cart}>
        <h2 className="modal-title">Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <div className={style["user-checkout-form"]}>
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Full Name"
              type="text"
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={hasNameError ? "Invalid name" : null}
              required
            />

            <Input
              id="email"
              label="E-Mail Address"
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={hasEmailError ? "Please enter a valid email." : null}
              required
            />

            <Input label="Street" id="street" type="text" required />

            <div className={style.address}>
              <Input
                label="Postal Code"
                type="text"
                id="postal-code"
                required
              />
              <Input label="City" id="city" type="text" required />
            </div>

            {error ? (
              <Error title="Failed to submit order" message={error} />
            ) : null}

            <div className="modal-actions">{actions}</div>
          </form>
        </div>
      </div>
    </>
  );
}

Checkout.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Checkout;
