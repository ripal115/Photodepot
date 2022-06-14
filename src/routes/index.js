import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../component/auth/login";
import SignUp from "../component/auth/signup";
import ChildFooter from "../component/childfooter";
import Footer from "../component/footer";
import Header from "../component/header";
import RouteWrapper from "../helpers/route/RouteWrapper";
import LandingPage from "./landingpage";
import PhotoeditorsProfile from "./photoeditorsProfile";
import EditordFilter from './editordFilter';
import PersonalInfo from "./photoeditors/personalInfo";
import PhotoeditorsHeader from "../component/photoeditorsHeader/index";
import EditProfile from "./photoeditors/editProfile";
import HireMe from "./hireMe";
import JobDocuments from "./jobDocuments";

const DefaultLayout = ({ children, match }) => (
  <>
    {children}
    <ChildFooter />
  </>
);

const ChildLayout = ({ children, match }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const PhotoeditorsLayout = ({ children, match }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const ChildLayoutWithoutFooter = ({ children, match }) => (
  <>
    <PhotoeditorsHeader />
    {children}
  </>
);

const ChildLayoutWithoutHeader = ({ children, match }) => (
  <>
    <Header />
    {children}
  </>
);

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/login" component={Login} layout={DefaultLayout} />
          <Route exact={true}  path="/sign-up" component={SignUp} layout={DefaultLayout} />
          <Route exact={true}  path="/" component={LandingPage} layout={ChildLayout} />
          <RouteWrapper exact={true}  path="/photoeditors-profile/:id"  component={PhotoeditorsProfile} layout={ChildLayout} />
          <RouteWrapper exact={true} path="/editord-filter" component={EditordFilter} layout={ChildLayout} />
          <RouteWrapper exact={true} path="/photoeditors/personal-info" component={PersonalInfo} layout={ChildLayoutWithoutFooter} />
          <RouteWrapper exact={true} path="/photoeditors/profile" component={EditProfile} layout={PhotoeditorsLayout} />
          <RouteWrapper exact={true} path="/hire-me" component={HireMe} layout={ChildLayoutWithoutHeader} />
          <RouteWrapper exact={true} path="/job-documents" component={JobDocuments} layout={ChildLayoutWithoutHeader} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}


