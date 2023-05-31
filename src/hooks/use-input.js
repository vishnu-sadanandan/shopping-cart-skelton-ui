import { useState } from "react";

const useInput = (
  inputId,
  inputValue,
  inputName,
  inputlabel,
  inputType,
  conditions
) => {
  const [enteredInput, setEnteredInput] = useState(inputValue);
  const [isEnteredInputTouched, setIsEnteredInputTouched] = useState(false);
  let isConditionsSuccess = false;
  let newConditions = [];

  if (conditions && conditions.length > 0) {
    newConditions = conditions.map((condition) => {
      if (condition === "isEmpty") {
        isConditionsSuccess = enteredInput.trim() !== "";
      } else if (condition === "isNumberValid") {
        isConditionsSuccess =
          !isNaN(enteredInput) && !isNaN(parseFloat(enteredInput));
      } else if (condition === "isEmailValid") {
        isConditionsSuccess = enteredInput.includes("@");
      } else {
        isConditionsSuccess = enteredInput.trim() !== "";
      }
      let newCondition = { [`${condition}`]: isConditionsSuccess };
      return newCondition;
    });
  }

  const isEnteredInputValid = isConditionsSuccess;
  const isInputInValid = isEnteredInputTouched && !isEnteredInputValid;

  const onInputChangeHandler = (event) => {
    setIsEnteredInputTouched(true);
    setEnteredInput(event.target.value);
  };
  const onInputBlurHandler = (event) => {
    setIsEnteredInputTouched(true);
    setEnteredInput(event.target.value);
  };

  const resetInput = () => {
    setIsEnteredInputTouched(true);
    setEnteredInput("");
    setIsEnteredInputTouched(false);
  };

  const InputUI = (
    <>
      <label htmlFor="name">{inputlabel}</label>
      <input
        onBlur={onInputBlurHandler}
        onChange={onInputChangeHandler}
        type={inputType}
        id={inputId ? inputId:inputName}
        value={enteredInput}
      />
      {isInputInValid && <p>{inputName} is empty</p>}
    </>
  );
  return [enteredInput, isInputInValid, resetInput, InputUI, isEnteredInputValid];
};

export default useInput;
