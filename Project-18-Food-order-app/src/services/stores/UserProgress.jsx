import { createContext, useState } from "react";
import PropTypes from "prop-types";

const UserProgressContext = createContext({
  userProgress: "CART" || "CHECKOUT" || "ORDER_SUCCESS",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showSuccessMessageDialog: () => {},
  hideSuccessMessageDialog: () => {},
});

const UserProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");

  const userProgressData = {
    userProgress,
    showCart: () => setUserProgress("CART"),
    hideCart: () => setUserProgress(""),
    showCheckout: () => setUserProgress("CHECKOUT"),
    hideCheckout: () => setUserProgress(""),
    showSuccessMessageDialog: () => setUserProgress("ORDER_SUCCESS"),
    hideSuccessMessageDialog: () => setUserProgress(""),
  };

  return (
    <UserProgressContext.Provider value={userProgressData}>
      {children}
    </UserProgressContext.Provider>
  );
};

UserProgressProvider.propTypes = {
  children: PropTypes.node,
};

export { UserProgressContext, UserProgressProvider };
