import React, { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PrivateRouteWithLayout, RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Icons as IconsView,
  Login as LoginView,
  Product as ProductView,
  Tables as TablesView,
  Notifications as NotificationsView,
  Typography as TypographyView,
  Upgrade as UpgradeView,
  Users as UserViews,
} from "./views";

import { clearMessage } from "./store/Actions";

const listRoutes = [
  {
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: DashboardView,
    layout: MainLayout,
    path: "/dashboard",
    security: true,
  },
  {
    name: "Pedidos",
    icon: "nc-icon nc-tile-56",
    component: TablesView,
    layout: MainLayout,
    path: "/tables",
    security: true,
  },
  {
    name: "Produtos",
    icon: "nc-icon nc-bag-16",
    component: ProductView,
    layout: MainLayout,
    path: "/product",
    security: true,
  },
  {
    name: "Icones",
    icon: "nc-icon nc-diamond",
    component: IconsView,
    layout: MainLayout,
    path: "/icons",
    security: true,
  },
  {
    name: "Notification",
    icon: "nc-icon nc-bell-55",
    component: NotificationsView,
    layout: MainLayout,
    path: "/notification",
    security: true,
  },
  {
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: TypographyView,
    layout: MainLayout,
    path: "/typography",
    security: true,
  },
  {
    name: "Upgrade",
    icon: "nc-icon nc-spaceship",
    component: UpgradeView,
    layout: MainLayout,
    path: "/upgrade",
    security: true,
  },
  {
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: UserViews,
    layout: MainLayout,
    path: "/users",
    security: true,
  },
];

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => dispatch(clearMessage()));
  }, [dispatch, history]);

  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      {listRoutes.map((route, idx) =>
        route.security ? (
          <PrivateRouteWithLayout
            key={idx}
            component={route.component}
            layout={route.layout}
            path={route.path}
            exact
          />
        ) : (
          <RouteWithLayout
            key={idx}
            component={route.component}
            layout={route.layout}
            path={route.path}
            exact
          />
        )
      )}
      <RouteWithLayout
        component={LoginView}
        layout={MinimalLayout}
        path={"/login"}
        exact
      />
      <Redirect to="/login" />
    </Switch>
  );
};

export { Routes, listRoutes };
