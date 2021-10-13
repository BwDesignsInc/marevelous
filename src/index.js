import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./App/store";
import App from "./App";
import 'normalize.css';
import "./app.scss";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
