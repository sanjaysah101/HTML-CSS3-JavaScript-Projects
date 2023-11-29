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
  clearCartData: () => {},
  onAddItem: () => {},
  onRemoveItem: () => {},
});

const CartContextProvider = ({ children }) => {
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

    onAddItem: (mealId) => {
      setCartData((prevState) => {
        const itemExistInCart = prevState.find(
          (item) => item.mealId === mealId
        );

        if (itemExistInCart) {
          // Increment the quantity by 1 if the item already exists in the cart
          return prevState.map((data) =>
            data.mealId === mealId
              ? { ...data, quantity: data.quantity + 1 }
              : data
          );
        }

        // Add a new item to the cart if it doesn't exist
        const item = mealData.find((data) => data.id === mealId);

        if (item) {
          const { name, price } = item;
          const cartItem = {
            id: crypto.randomUUID(),
            mealId,
            name,
            price,
            quantity: 1,
          };

          return [...prevState, cartItem];
        } else {
          console.error(`Meal with id ${mealId} not found.`);
          // Handle the case where the mealId doesn't match any item
          return prevState;
        }
      });
    },

    onRemoveItem: (mealId) => {
      setCartData((prevCartState) => {
        return prevCartState
          .map((data) =>
            // here Math.max will prevent the quantity from becoming negative
            data.mealId === mealId
              ? { ...data, quantity: Math.max(0, data.quantity - 1) }
              : data
          )
          .filter((data) => data.quantity > 0);
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

CartContextProvider.propTypes = {
  children: PropTypes.node,
};

export { CartContext, CartContextProvider };
