import React, { useEffect } from "react";
import io from "socket.io-client";
import { Router } from "react-router";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

import { Routes } from "./routes";
import { url } from "./services/host";

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const socket = io(url, {
        transports: ["websocket"],
        jsonp: false,
      });
    })();
  }, []);

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};
export default App;
