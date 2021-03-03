import React, { useEffect } from "react";
import io from "socket.io-client";
import { Router } from "react-router";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

import { Routes } from "./routes";
import { url } from "./services/host";
import { OPEN_CLOSE } from "./store/Actions/types";
import { statusOpenClose, myOrders } from "./store/Actions";

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
      // dispatch(statusOpenClose()); // Status do Estabelecimetno Aberto/Fechado
      //  dispatch(myOrders()); // Notificar novos pedidos
    })();
  }, [dispatch]);

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};
export default App;
