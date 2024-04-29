import ImgAsset from "../public";
import "../css/NavBar.css";
import { NavLink } from "react-router-dom";
import React from "react";

export default function NavBar() {
  return (
    <nav>
      <div className="NavBar_NavBar">
        <div className="NavBar">
          <NavLink to="/landingpage">
            <span className="Home">Home</span>
          </NavLink>
          <NavLink to="/announcementpage">
            <span className="Announcements">Announcements</span>
          </NavLink>
          <NavLink to="/schedulingpage">
            <span className="Schedule">Schedule</span>
          </NavLink>
          <NavLink to="/employeepage">
            <span className="Employees">Employees</span>
          </NavLink>
        </div>
        <div className="Logo">
          <img className="Vector" src={ImgAsset.SignUpPage_Vector} />
          <img className="Vector_1" src={ImgAsset.SignUpPage_Vector_1} />
          <img className="Vector_2" src={ImgAsset.SignUpPage_Vector_2} />
          <img className="Vector_3" src={ImgAsset.SignUpPage_Vector_3} />
          <img className="Vector_4" src={ImgAsset.SignUpPage_Vector_4} />
          <img className="Vector_5" src={ImgAsset.SignUpPage_Vector_5} />
          <img className="Vector_6" src={ImgAsset.SignUpPage_Vector_6} />
          <img className="Vector_7" src={ImgAsset.SignUpPage_Vector_7} />
          <img className="Vector_8" src={ImgAsset.SignUpPage_Vector_8} />
          <span className="S4">S4</span>
        </div>{" "}
      </div>
    </nav>
  );
}
