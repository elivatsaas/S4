// App.js
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Schedule from "./pages/schedules";
import Employee from "./pages/employees";
import NavBar from "./components/navBar";
import NoMatch from "./components/noMatch";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<Schedule />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
