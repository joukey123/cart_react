const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEM") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "CLEAR_ITEM") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "DELETE_ITEM") {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === "INCREASE_VALUE") {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === "DECREASE_VALUE") {
    const newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === "TOTAL_VALUE") {
    let { total, amount } = state.cart.reduce(
      (totalValue, item) => {
        const { amount, price } = item;
        const itemTotal = amount * price;

        totalValue.total += itemTotal;
        totalValue.amount += amount;

        return totalValue;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      amount,
      total,
    };
  }
  if (action.type === "TOGGLE_VALUE") {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (action.payload.toggle === "inc") {
          return { ...item, amount: item.amount + 1 };
        }
        if (action.payload.toggle === "dec") {
          return { ...item, amount: item.amount - 1 };
        }
      }
      return item;
    });
    return {
      ...state,
      cart: newCart,
    };
  }
  throw new Error("no matching action type");
};

export default reducer;
