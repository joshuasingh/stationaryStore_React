const UserCart = (state = { allData: [] }, action) => {
  switch (action.type) {
    case "initializeCart":
      state = { allData: action.payload };
      break;
  }
  return state;
};

export default UserCart;
