import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();
    const { onFocus: isFocus } = props;

    const somefunction = () => {
        console.log("Call from parent")
        return {}
    }

    useEffect(() => {
        if (isFocus) {
            inputRef.current.focus()
        }
    }, [isFocus])

    useImperativeHandle(ref, () => {
        return {
            triggerSomefunction: somefunction
        }
    })
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
});

export default Input;
