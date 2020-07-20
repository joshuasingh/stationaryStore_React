const GridPlacement = (
  state = {
    gridMap: null,
    maxWindow: null,
    GridWindow: 1,
  },
  action
) => {
  switch (action.type) {
    case "updateGridMap":
      var val = action.payload;
      state = val;
      break;
    case "prevWindow":
      if (state.GridWindow > 1)
        state = { ...state, GridWindow: state.GridWindow - 1 };
      break;
    case "nextWindow":
      if (state.GridWindow < state.maxWindow)
        state = { ...state, GridWindow: state.GridWindow + 1 };
      break;
  }
  return state;
};

export default GridPlacement;
