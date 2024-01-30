import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    laoding: false,
    cart: cartItems,
    total: 0,
    amount: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearItem = () => {
    dispatch({
      type: "CLEAR_ITEM",
    });
  };
  const deleteItem = (id) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };
  const increaseValue = (id) => {
    dispatch({
      type: "INCREASE_VALUE",
      payload: id,
    });
  };
  const decreaseValue = (id) => {
    dispatch({
      type: "DECREASE_VALUE",
      payload: id,
    });
  };
  const toggleValue = (id, toggle) => {
    dispatch({
      type: "TOGGLE_VALUE",
      payload: { id, toggle },
    });
  };
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEM", payload: cart });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "TOTAL_VALUE",
    });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearItem,
        deleteItem,
        increaseValue,
        decreaseValue,
        toggleValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
