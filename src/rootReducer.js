import { combineReducers } from "redux";
import Reducer1 from "./ReduxReducers/Reducer1";
import SearchResult from "./ReduxReducers/SearchResult";
import GridPlacement from "./ReduxReducers/GridPlacement";
import UserInfo from "./ReduxReducers/UserInfo";
import UserCart from "./ReduxReducers/UserCart";

export default combineReducers({
  Reducer1,
  SearchResult,
  GridPlacement,
  UserInfo,
  UserCart,
});
