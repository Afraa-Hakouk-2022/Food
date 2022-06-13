import React from "react";
import Cart from "./Cart";
import classes from "./Header.module.css";
import imageMeals from "./meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1> React Meals </h1>
        <Cart
          // newQuantity={props.newQuantity}
          showYourOrder={props.showYourOrder}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={imageMeals} alt="A table of food" />
      </div>
    </>
  );
};

export default Header;
