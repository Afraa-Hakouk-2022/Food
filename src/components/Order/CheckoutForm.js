import React, { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const CheckoutForm = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const codeRef = useRef();
  const cityRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCode = codeRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const codeIsValid = isFiveChar(enteredCode);
    const cityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      code: codeIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && codeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      code: enteredCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          formValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p> Please Enter A Valid Name! </p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p> Please Enter A Valid Street! </p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.code ? "" : classes.invalid
        }`}
      >
        <label htmlFor="code">Postal Code</label>
        <input type="text" id="code" ref={codeRef} />
        {!formValidity.code && (
          <p> Please Enter A Valid Code! (5 character code) </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p> Please Enter A Valid City! </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
