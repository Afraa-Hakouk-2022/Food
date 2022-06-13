import React, { useContext } from "react";
import classes from "./ItemInOrder.module.css";
import QuantityContext from "../Store/Quantity-Context";

const ItemInOrder = (props) => {
  const ctx = useContext(QuantityContext);

  const decrease = () => {
    ctx.decrease(props.id);
  };

  const increase = () => {
    ctx.increase(props.id);
  };

  return (
    <li className={classes.item}>
      <div className={classes.name}>
        <h3> {props.name} </h3>
        <p>
          ${props.price}
          <span className={classes.box}>x {props.amount}</span>
        </p>
      </div>
      <div className={classes.button}>
        <button className={classes.left} onClick={decrease}>
          -
        </button>
        <button className={classes.right} onClick={increase}>
          +
        </button>
      </div>
    </li>
  );
};

export default ItemInOrder;
