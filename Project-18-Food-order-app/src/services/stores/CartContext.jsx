import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { URL } from "../constants/constants";

const CartContext = createContext({
  mealData: [],
  cartData: [],
  onAddToCartButtonClick: () => {},
  onChangeCartItemQuantityButtonClick: () => {},
});

const AppProvider = ({ children }) => {
  const [mealData, setMealData] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${URL}meals`);
        const data = await response.json();
        setMealData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const appData = {
    mealData,
    cartData,

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
