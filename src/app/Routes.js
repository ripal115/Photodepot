import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import {  AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Auth from "../helpers/Auth";
import PhotoEditorSignup from "../_metronic/components/PhotoEditorSignup/PhotoEditorSignup";
import OtherUsersSignup from "../_metronic/components/OtherUsersSignup/OtherUsersSignup";

export function Routes() {
    return (
        <Switch>
            <Route path="/photoeditor-signup" component={PhotoEditorSignup} />
            <Route path="/otherusers-signup" component={OtherUsersSignup} />
            {!Auth.isUserAuthenticat() ? (
                /*Render auth page when user at `/auth` and not authorized.*/
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                /*Otherwise redirect to root page (`/`)*/
                <Redirect from="/auth/login" to="/" />
                // <Redirect from="/auth/login" to="/" />
            )}
            <Route path="/error" component={ErrorsPage} />
            {/* <Route path="/logout" component={Logout} /> */}

            {!Auth.isUserAuthenticat() ? (
                /*Redirect to `/auth` when user is not authorized*/
                <Redirect to="/auth/login" />
            ) : (
                <Layout>
                    <BasePage />
                </Layout>
            )}
        </Switch>
    );
}
