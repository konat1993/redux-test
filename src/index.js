import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers } from "redux";

import usersReducer from "./store/users/usersDuck";
import messageReducer from "./store/messages/messagesDuck";

import App from "./App";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["users", "messages"]
};

const usersPersistConfig = {
  key: "users",
  storage,
  blacklist: ["hasError", "isReset"]
};

export const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  messages: messageReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  rootElement
);
