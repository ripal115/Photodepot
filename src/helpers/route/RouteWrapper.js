import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteWrapper = ({
  component: Component,
  layout: Layout,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const userInfo = localStorage.getItem("userinfo");
        if (userInfo) {
          return (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default RouteWrapper;
