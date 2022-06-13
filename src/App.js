import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import YourOrder from "./components/Order/YourOrderModal";

function App(props) {
  const [modal, setModal] = useState(false);

  const showYourOrder = () => {
    setModal(true);
  };

  const closeHandler = () => {
    setModal(false);
  };

  return (
    <>
      <Header showYourOrder={showYourOrder} />
      <Meals />
      {modal && <YourOrder closeHandler={closeHandler} />}
    </>
  );
}

export default App;
