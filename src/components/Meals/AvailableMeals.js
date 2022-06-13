import React, { useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem";
import QuantityContext from "../Store/Quantity-Context";

const AvailableMeals = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const ctx = useContext(QuantityContext);
  useEffect(() => {
    if (ctx.meals.length !== 0) {
      setIsLoading(false);
    }
  }, [ctx.meals]);

  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {ctx.error === null ? (
            isLoading ? (
              <section>
                <p className={classes.loading}> Loading... </p>
              </section>
            ) : (
              ctx.meals.map((meal) => (
                <MealsItem
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              ))
            )
          ) : (
            <p className={classes.loading}>{ctx.error}</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
