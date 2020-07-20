const SearchResult = (
  state = {
    resultDB: [
      {
        Url: "https://picsum.photos/200",
        ProductN: "Pencil",
        Price: "Rs 00",
      },
    ],
    gridMap: null,
  },
  action
) => {
  switch (action.type) {
    case "populateData":
      state = { resultDB: action.payload };

      break;
    case "updateGridMap":
      state = { resultDB: state.resultDB, gridMap: action.payload };
      break;
  }
  return state;
};

export default SearchResult;
