import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import ChangeAvailabilityPage from "../pages/ChangeAvailabilityPage";
import AddShiftPage from "../pages/AddShiftPage";
import ShiftTradePage from "../pages/ShiftTradePage";
import SignUpPage from "../pages/SignUp";
import SchedulingPage from "../pages/SchedulingPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import SignIn from "../pages/SignIn";
import EmployeePage from "../pages/EmployeePage";
import LandingPage from "../pages/LandingPage";
import DemoTesting from "../components/DemoTesting";
import Property1Default from "../components/Property1Default";
import Day from "../components/day";
import Typedefault from "../components/Typedefault";
import Darkdesktopswitchessliderscheckoff from "../components/darkdesktopswitchessliderscheckoff";
import Property1Default_1 from "../components/Property1Default_1";
import Property1Variant2 from "../components/Property1Variant2";
import Property1Input from "../components/Property1Input";
import CheckedFalse from "../components/CheckedFalse";
import CheckedTrue from "../components/CheckedTrue";
const RouterDOM = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/changeavailabilitypage">
          <ChangeAvailabilityPage />
        </Route>
        <Route exact path="/addshiftpage">
          <AddShiftPage />
        </Route>
        <Route exact path="/shifttradepage">
          <ShiftTradePage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/schedulingpage">
          <SchedulingPage />
        </Route>
        <Route exact path="/announcementpage">
          <AnnouncementPage />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/employeepage">
          <EmployeePage />
        </Route>
        <Route exact path="/landingpage">
          <LandingPage />
        </Route>
        <Route exact path="/demotesting">
          <DemoTesting />
        </Route>
        <Route exact path="/property1default">
          <Property1Default />
        </Route>
        <Route exact path="/day">
          <Day />
        </Route>
        <Route exact path="/typedefault">
          <Typedefault />
        </Route>
        <Route exact path="/darkdesktopswitchessliderscheckoff">
          <Darkdesktopswitchessliderscheckoff />
        </Route>
        <Route exact path="/property1default_1">
          <Property1Default_1 />
        </Route>
        <Route exact path="/property1variant2">
          <Property1Variant2 />
        </Route>
        <Route exact path="/property1input">
          <Property1Input />
        </Route>
        <Route exact path="/checkedfalse">
          <CheckedFalse />
        </Route>
        <Route exact path="/checkedtrue">
          <CheckedTrue />
        </Route>
      </Switch>
    </Router>
  );
};
export default RouterDOM;
