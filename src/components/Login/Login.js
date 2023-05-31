import React, { useContext, useEffect, useReducer, useRef, useState } from "react";

import Card from "../../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../../UI/Input/LoginInput/Input"

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "USER_INPUT_VALID") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  if (action.type === "GET_INPUT") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type === "USER_INPUT_VALID") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  if (action.type === "GET_INPUT") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const useAuthContext = useContext(AuthContext);
  const inputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const { isValid: isEmailValid, value: email } = emailState;
  const { isValid: isPasswordValid, value: password } = passwordState;

  useEffect(() => {
    const keyStorkeDelayTimer = setTimeout(() => {
      console.log("Check Validity");
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);
    return () => {
      console.log("CLEAN UP");
      clearTimeout(keyStorkeDelayTimer);
    };
  }, [isEmailValid, isPasswordValid]); // Only run the side effect when any of these state changes from user interaction through inputs

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({ type: "USER_INPUT", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatch({ type: "USER_INPUT", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    emailDispatch({ type: "USER_INPUT_VALID" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({ type: "USER_INPUT_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      useAuthContext.onLogin(email, password);
    } else if (!isEmailValid) {
      inputRef.current.triggerSomefunction() // example to control over child component method from parent
    } else {

    }
  };

  return (
    <Card className={classes.login} isLoggedIn={!useAuthContext.isLoggedIn}>
      <form onSubmit={submitHandler}>
        <Input
          id={"email"}
          type={"email"}
          label={"Email"}
          value={email}
          isValid={isEmailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          onFocus={true} // pass focus state to set the focus in input
          ref={inputRef} // alternatively control the child input method using inputRef.current.triggerSomeFunction()
        />
        <Input
          id={"password"}
          type={"password"}
          label={"Password"}
          value={password}
          isValid={isPasswordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} /* disabled={!formIsValid}*/ >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
