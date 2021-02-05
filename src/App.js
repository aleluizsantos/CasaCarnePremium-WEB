import React from "react";
//  import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import { Routes } from "./routes";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};
export default App;
