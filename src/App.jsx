// App.js
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Schedule from "./pages/schedules";
import ScheduleAPI from "./pages/schedules/api";
import Employee from "./pages/employees";
import EmployeeAPI from "./pages/employees/api";
import Shift from "./pages/shifts";
import ShiftAPI from "./pages/shifts/api";
import Availability from "./pages/availabilities";
import AvailabilityAPI from "./pages/availabilities/api";
import DSH from "./pages/dsh";
import DshAPI from "./pages/dsh/api";
import Role from "./pages/roles";
import RoleAPI from "./pages/roles/api";
import Store from "./pages/stores";
import StoreAPI from "./pages/stores/api";

import Generated from "./pages/schedules/[id]/generated";
import NavBar from "./components/navBar";
import NoMatch from "./components/noMatch";

const App = () => {
  console.log("in app");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<Schedule />} />
        <Route path="/schedules/api" element={<ScheduleAPI />} />
        <Route path="/schedules/1/generated" element={<Generated />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/employees/api" element={<EmployeeAPI />} />
        <Route path="/shifts" element={<Shift />} />
        <Route path="/shifts/api" element={<ShiftAPI />} />
        <Route path="/availabilities" element={<Availability />} />
        <Route path="/availabilities/api" element={<AvailabilityAPI />} />
        <Route path="/dsh" element={<DSH />} />
        <Route path="/dsh/api" element={<DshAPI />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/roles/api" element={<RoleAPI />} />
        <Route path="/stores" element={<Store />} />
        <Route path="/stores/api" element={<StoreAPI />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
