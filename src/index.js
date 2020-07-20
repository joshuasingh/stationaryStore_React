import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import combineReducer1 from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

const myLogger = (store) => (next) => (action) => {
  console.log("logged action:", action);
  next(action);
};

// const store = createStore(combineReducer1, {});

const persistConfig = {
  key: "root",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducer1);

// const store = createStore(persistedReducer, {});

const store = createStore(combineReducer1, {});
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}>*/}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
