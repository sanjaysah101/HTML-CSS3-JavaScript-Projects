import { useState } from "react";

function useInput(initialValue, validationFn) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [hasEdited, setHasEdited] = useState(false);

  const isInputValid = validationFn(inputValue);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setHasEdited(true);
  };

  return {
    value: inputValue,
    handleInputChange,
    handleInputBlur,
    hasError: hasEdited && !isInputValid,
  };
}

export default useInput;
