/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect} from "react-router-dom"; 
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import Changepassword from "../pages/changepassowrd"; 
// import Logo from "../../../../_metronic/layout/components/Logos/new.png";
import Logo from "../../../../_metronic/layout/components/Logos/BB.png"
import Signup from "./Signup";
export function AuthPage() { 
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          <div className="login-aside d-flex flex-row-auto   justify-content-center bgi-size- bgi-no-repeat p-10 p-lg-10">
            <div className="d-flex align-items-center justify-content-center">
            <img alt="" src={Logo} width="300px"  ></img>  
            </div>
          </div>

          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute path="/auth/signup" component={Signup} />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/changepassword"
                  component={Changepassword}
                />

                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
