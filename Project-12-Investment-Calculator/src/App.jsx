import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Result from "./components/Result";

function App() {
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
      <Header />
      <UserInput userInput={userInput} onChange={handleUserInput} />
      {!isInputValid && <p className="center">Please enter a duration greater than zero</p> }
      {isInputValid && <Result input={userInput} />}
    </>
  );
}

export default App;
