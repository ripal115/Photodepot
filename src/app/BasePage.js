import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout"; 
import DashboardPage from "./pages/DashboardPage"; 
import Photographer from "../_metronic/components/Photographer/Photographer";
import PhotoEditor from "../_metronic/components/PhotoEditer/PhotoEditer";
import PropertyBuilder from "../_metronic/components/PropertyBuilder/PropertyBuilder";
import OtherUsers from "../_metronic/components/OtherUsers/OtherUsers";
import AdminData from "../_metronic/components/AdminData/AdminData";
import HiredPhotoGrapher from "../_metronic/components/HiredPhotoGrapher/HiredPhotoGrapher";
import HiredPhotoEditor from "../_metronic/components/HiredPhotoEditor/HiredPhotoEditor";
import Hire from "../_metronic/components/Hire/Hire";
import ReportAbuse from "../_metronic/components/ReportAbuse/ReportAbuse";
import AdminReview from "../_metronic/components/AdminReview/AdminReview";
import Services from "../_metronic/components/Services/Services";
export default function BasePage() { 

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/photographer" component={Photographer}/>
          <ContentRoute exact path="/photoeditor" component={PhotoEditor}/>
          <ContentRoute exact path="/propertybuilder" component={PropertyBuilder}/>
          <ContentRoute exact path="/otherusers" component={OtherUsers}/>
          <ContentRoute exact path="/hiredphotographer" component={HiredPhotoGrapher}/>
          <ContentRoute exact path="/hiredphotoeditor" component={HiredPhotoEditor}/>
          <ContentRoute exact path="/reportabuse" component={ReportAbuse}/>
          <ContentRoute exact path="/adminreview" component={AdminReview}/>
          <ContentRoute exact path="/services" component={Services}/>
          {/* <ContentRoute exact path="/hiredviewmore" component={HiredViewMore}/> */}
          <ContentRoute exact path="/adminData" component={AdminData}/>
          <ContentRoute exact path="/hire" component={Hire}/>
          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense>
    </>
  );
}
