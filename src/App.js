import React, { useEffect } from "react";
import io from "socket.io-client";
import { Router } from "react-router";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

import { Routes } from "./routes";
import { url } from "./services/host";
import {
  OPEN_CLOSE,
  CLIENT_ONLINE,
  UPDATE,
  CLIENT_REGISTERED,
  NEW_ORDERS,
} from "./store/Actions/types";

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const socket = io(url, {
        transports: ["websocket"],
        jsonp: false,
      });

      socket.on("Operation", (response) => {
        dispatch({
          type: OPEN_CLOSE,
          payload: response.open_close,
        });
      });
      socket.on("onlineClients", (response) => {
        dispatch({
          type: CLIENT_ONLINE,
          payload: response,
        });
      });
      socket.on("update", (response) => {
        dispatch({
          type: UPDATE,
          payload: response.update,
        });
      });
      socket.on("CreateOrder", (response) => {
        new Audio("/notification.mp3").play();
        dispatch({
          type: NEW_ORDERS,
          payload: response.newOrder.countReq,
        });
      });
      socket.on("ClientsRegistered", (response) => {
        dispatch({
          type: CLIENT_REGISTERED,
          payload: response.countUser,
        });
      });
    })();
  }, [dispatch]);

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};
export default App;
