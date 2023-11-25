import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { URL } from "../constants/constants";

const AppContext = createContext({
  mealData: [],
});

const AppProvider = ({ children }) => {
  const [mealData, setMealData] = useState([]);

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
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, AppProvider };
