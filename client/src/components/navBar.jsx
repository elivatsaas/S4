import { NavLink } from "react-router-dom";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/schedules">Schedules</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
