import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { PrivateRouteWithLayout, RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Icons as IconsView,
  SignIn as SignInView,
  Tables as TablesView,
  Notifications as NotificationsView,
  Typography as TypographyView,
  Upgrade as UpgradeView,
  Users as UserViews,
} from "./views";

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
    name: "Icones",
    icon: "nc-icon nc-diamond",
    component: IconsView,
    layout: MainLayout,
    path: "/icons",
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
        component={SignInView}
        layout={MinimalLayout}
        path={"/signIn"}
        exact
      />
      <Redirect to="/signIn" />
    </Switch>
  );
};

export { Routes, listRoutes };
