import React, { useState, useContext } from "react";
import QuantityContext from "../Store/Quantity-Context";
import classes from "./MealsItemForm.module.css";

const MealsItemForm = (props) => {
  const ctx = useContext(QuantityContext);
  const [quantity, setQuantity] = useState();

  const inputHandler = (event) => {
    setQuantity(event.target.value);
  };

  const increase = (event) => {
    ctx.increase(props.id, quantity);
    event.preventDefault();
  };

  return (
    <form onSubmit={increase}>
      <div className={classes.input}>
        <label htmlFor={"idUnique"}> Amount </label>
        <input
          id={"idUnique"}
          type="number"
          defaultValue={0}
          min={1}
          max={5}
          step={1}
          onChange={inputHandler}
        />
      </div>
      <button className={classes.button} type="submit">
        + Add
      </button>
    </form>
  );
};

export default MealsItemForm;
