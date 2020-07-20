const Reducer1 = (state = { initial: "guess its" }, action) => {
  switch (action.type) {
    case "changeVal":
      state = { initial: action.payload };

      break;
  }
  return state;
};

export default Reducer1;
