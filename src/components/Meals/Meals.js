import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const MealsList = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default MealsList;
