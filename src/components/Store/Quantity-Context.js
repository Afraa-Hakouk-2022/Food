import React, { useState, useEffect } from "react";

let items = [];
let errorMessage = "";

const QuantityContext = React.createContext({
  meals: [],
  quantity: 0,
  items: [],
  totalAmount: 0,
  decrease: () => {},
  increase: () => {},
});

export const QuantityContextProvider = (props) => {
  const [newQuantity, setNewQuantity] = useState(0);
  const [updateTotalAmount, setUpdateTotalAmount] = useState(0);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-f2e0f-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Somthing Is Wrong!");
        }
        const data = await response.json();
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
            amount: data[key].amount,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setError(true);
        errorMessage = error.message;
      }
    };
    fetchMeals();
  }, []);

  const TotalAmount = () => {
    setUpdateTotalAmount(() => {
      let x = [];
      items.forEach((item) => {
        x.push(item.price * item.amount);
      });
      let sum = x.reduce((acc, cur) => {
        return +acc + +cur;
      }, 0);
      return sum.toFixed(2);
    });
  };

  const increase = (id, quantity = 1) => {
    setNewQuantity((prevQuantity) => {
      return +prevQuantity + +quantity;
    });
    meals.forEach((meal) => {
      if (meal.id === id) {
        if (!items.includes(meal)) {
          meal.amount = quantity;
          items.push(meal);
        } else if (items.includes(meal)) {
          meal.amount = +meal.amount + +quantity;
        }
      }
    });
    TotalAmount();
  };

  const decrease = (id) => {
    setNewQuantity((prevQuantity) => {
      return +prevQuantity + -1;
    });
    items.forEach((item) => {
      if (item.id === id) {
        item.amount = +item.amount + -1;
        if (item.amount === 0) {
          const index = items.indexOf(item);
          items.splice(index, 1);
        }
      }
    });
    TotalAmount();
  };

  const clear = () => {
    items = [];
    setNewQuantity(0);
    setUpdateTotalAmount(0);
  };

  return (
    <QuantityContext.Provider
      value={{
        meals: meals,
        quantity: newQuantity,
        items: items,
        totalAmount: updateTotalAmount,
        increase: increase,
        decrease: decrease,
        clear: clear,
        error: error ? errorMessage : null,
      }}
    >
      {props.children}
    </QuantityContext.Provider>
  );
};

export default QuantityContext;
