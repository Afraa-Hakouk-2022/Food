import React, { useState, useEffect, useContext } from "react";
import CartIcon from "./CartIcon";
import QuantityContext from "../Store/Quantity-Context";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const ctx = useContext(QuantityContext);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (ctx.quantity.length === 0) {
      return;
    }
    setBump(true);

    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.quantity]);

  return (
    <button
      className={`${classes.button} ${bump ? classes.bump : ""}`}
      onClick={props.showYourOrder}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}>{ctx.quantity}</span>
    </button>
  );
};

export default Cart;
