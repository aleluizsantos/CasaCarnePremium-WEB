import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        isAuthenticated ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
};

export default PrivateRouteWithLayout;
