import { useState, createContext } from "react";
import PropTypes from "prop-types";
import { URL } from "../constants/constants";
import useHttp from "../../hooks/useHttp";

const requestConfig = {
  method: "GET",
};

const CartContext = createContext({
  mealData: [],
  cartData: [],
  isLoading: false,
  error: "",
  onAddToCartButtonClick: () => {},
  onChangeCartItemQuantityButtonClick: () => {},
  clearCartData: () => {},
});

const AppProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const {
    data: mealData,
    isLoading,
    error,
  } = useHttp(`${URL}meals`, requestConfig, []);

  const appData = {
    mealData,
    cartData,
    isLoading,
    error,

    onAddToCartButtonClick: (mealId) => {
      // Check if item already exists in cart
      const itemExistInCart = cartData.some((data) => data.mealId === mealId);

      if (itemExistInCart) {
        return;
      }

      const item = mealData.find((data) => data.id === mealId);

      if (!item) {
        return; // Handle the case where the mealId doesn't match any item
      }

      const { name, price } = item;

      const cartItem = {
        id: crypto.randomUUID(),
        mealId,
        name,
        price,
        quantity: 1,
      };

      setCartData((prevState) => [...prevState, cartItem]);
    },

    onChangeCartItemQuantityButtonClick: (id, quantity, action) => {
      setCartData((prevState) => {
        return prevState.map((meal) => {
          if (meal.id !== id) return meal;

          const newQuantity = quantityUpdater[action]
            ? quantityUpdater[action](meal, quantity)
            : meal.quantity;

          return { ...meal, quantity: newQuantity };
        });
      });
    },

    clearCartData: () => {
      setCartData(() => []);
    },
  };

  return (
    <CartContext.Provider value={appData}>{children}</CartContext.Provider>
  );
};

const quantityUpdater = {
  INCREASE: (meal, quantity) => meal.quantity + quantity,
  DECREASE: (meal, quantity) => {
    const newQuantity = meal.quantity - quantity;
    return newQuantity <= 0 ? meal.quantity : newQuantity;
  },
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { CartContext, AppProvider };
