import React, { useContext } from "react";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
// import QuantityContext from "../Quantity-Context";

const MealsItem = (props) => {
  // const ctx = useContext(QuantityContext);

  return (
    <li className={classes.meal}>
      <div id={props.id}>
        <h3> {props.name} </h3>
        <p className={classes.description}> {props.description} </p>
        <p className={classes.price}> ${props.price} </p>
      </div>
      <div>
        <MealsItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealsItem;
