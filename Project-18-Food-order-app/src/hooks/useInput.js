import { useState } from "react";

function useInput(defaultValue, validationFn) {
  const [enteredValues, setEnteredValues] = useState(defaultValue);

  const [didEdit, setDidEdit] = useState(false);

  const isValueValid = validationFn(enteredValues);

  const handleInputChange = (event) => {
    setEnteredValues(event.target.value);

    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValues,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !isValueValid,
  };
}

export default useInput;
