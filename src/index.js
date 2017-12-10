import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App";
import User from "./components/User";
import Users from "./components/Users";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Users} />
      <Route path="user/:username" component={User} />
      <Route path="users/" component={Users} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));
