import React from "react";
import { SnackbarProvider } from "notistack";

import HomePage from "./pages/Home/HomePage";
import UsersPage from "./pages/Users/UsersPage";
import UserFormPage from "./pages/Form/UserFormPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import "./styles.scss";

const notistackRef = React.createRef();

const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

export const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={(key) => <button onClick={onClickDismiss(key)}>'Dismiss'</button>}
    >
      <div className="App">
        <Router>
          <div className="navBar">
            <NavLink exact activeClassName="selected" to="/">
              Home
            </NavLink>
            <NavLink exact activeClassName="selected" to="/users">
              Users
            </NavLink>
            <NavLink exact activeClassName="selected" to="/userForm">
              Form
            </NavLink>
          </div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/userForm" component={UserFormPage} />
          </Switch>
        </Router>
      </div>
    </SnackbarProvider>
  );
};

export default App;
