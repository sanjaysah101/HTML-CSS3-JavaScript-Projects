import React, { useState } from "react";

import UserInput from "./UserInput";
import Result from "./Result";

function Main() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isInputValid = userInput.duration >= 1;

  const handleUserInput = (selectKey, newValue) => {
    setUserInput((preUserInput) => {
      return {
        ...preUserInput,
        [selectKey]: +newValue,
      };
    });
  };

  return (
    <>
      <UserInput userInput={userInput} onChange={handleUserInput} />
      {isInputValid ? (
        <Result input={userInput} />
      ) : (
        <p className="center">Please enter a duration greater than zero</p>
      )}
    </>
  );
}

export default Main;
