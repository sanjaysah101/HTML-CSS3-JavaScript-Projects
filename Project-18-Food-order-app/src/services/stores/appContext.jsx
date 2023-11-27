import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { URL } from "../constants/constants";

const AppContext = createContext({
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
      // Check if item already exist in cart
      const itemExistInCart = cartData.find((data) => data.mealId === mealId);

      if (itemExistInCart) return;

      const item = mealData.find((data) => data.id === mealId);
      const { name, price } = item;

      const cartItem = {
        id: crypto.randomUUID(),
        mealId,
        name,
        price,
        quantity: 1,
      };

      setCartData((prevState) => {
        return [...prevState, cartItem];
      });
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

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
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

export { AppContext, AppProvider };
