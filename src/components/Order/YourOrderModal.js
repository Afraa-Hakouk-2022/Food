import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import ItemInOrder from "./ItemInOrder";
import classes from "./YourOrderModal.module.css";
import QuantityContext from "../Store/Quantity-Context";
import CheckoutForm from "./CheckoutForm";

const Modal = (props) => {
  return <div className={classes.modal}> </div>;
};

const YourOrder = (props) => {
  const ctx = useContext(QuantityContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHAndler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-f2e0f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          hisOrder: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clear();
  };

  const content = (
    <>
      <ul className={classes["cart-items"]}>
        {ctx.items.map((item) => (
          <ItemInOrder
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span> Total Amount </span>
        <span> {ctx.totalAmount} </span>
      </div>
      {isCheckout && (
        <CheckoutForm
          onCancel={props.closeHandler}
          onConfirm={submitOrderHAndler}
        />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.closeHandler}
          >
            Close
          </button>
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </>
  );

  const isSubmittingContent = <p> Sending order data... </p>;

  const didSubmittingContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.closeHandler}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Card>
      <div className={classes.order}>
        {!isSubmitting && !didSubmit && content}
        {isSubmitting && isSubmittingContent}
        {!isSubmitting && didSubmit && didSubmittingContent}
      </div>
    </Card>
  );
};

const YourOrderModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal className={props.className} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <YourOrder closeHandler={props.closeHandler} />,
        document.getElementById("order")
      )}
    </>
  );
};

export default YourOrderModal;
