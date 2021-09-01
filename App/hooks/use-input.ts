import { useState } from "react";

const useInput = (validateValue: Function, passConfirmValue?: string) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = !passConfirmValue
    ? validateValue(enteredValue)
    : validateValue(enteredValue, passConfirmValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (text: string) => {
    setEnteredValue(text);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setValue: setEnteredValue,
  };
};

export default useInput;
