import React from "react";
import "../css/SchedulingPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import ShiftScheduler from "../components/Schedule";
const scheduleId = 1;
export default function SchedulingPage() {
  return (
    <div className="SchedulingPage_SchedulingPage">
      <div className="TopBar" />
      <div className="BottomBar" />
      <div className="NavBar">
        <Link to="/landingpage">
          <span className="Home">Home</span>
        </Link>
        <Link to="/announcementpage">
          <span className="Announcements">Announcements</span>
        </Link>
        <span className="Schedule">Schedule</span>
        <Link to="/employeepage">
          <span className="Employees">Employees</span>
        </Link>
      </div>
      <div className="SchedulingNavBar">
        <Link to="/addshiftpage">
          <div className="AddShift">
            <span className="AddShift_1">Add Shift</span>
          </div>
        </Link>
        <Link to="/changeavailabilitypage">
          <div className="ChangeAvailability">
            <span className="ChangeAvailability_1">Change Availability</span>
          </div>
        </Link>
        <div className="ShiftTrade">
          <Link to="/shifttradepage">
            <span className="ShiftTrade_1">Shift Trade</span>
          </Link>
        </div>
      </div>
      <div className="Logo">
        <img className="Vector" src={ImgAsset.SchedulingPage_Vector} />
        <img className="Vector_1" src={ImgAsset.SchedulingPage_Vector_1} />
        <img className="Vector_2" src={ImgAsset.SchedulingPage_Vector_2} />
        <img className="Vector_3" src={ImgAsset.SchedulingPage_Vector_3} />
        <img className="Vector_4" src={ImgAsset.SchedulingPage_Vector_4} />
        <img className="Vector_5" src={ImgAsset.SchedulingPage_Vector_5} />
        <img className="Vector_6" src={ImgAsset.SchedulingPage_Vector_6} />
        <img className="Vector_7" src={ImgAsset.SchedulingPage_Vector_7} />
        <img className="Vector_8" src={ImgAsset.SchedulingPage_Vector_8} />
        <span className="S4">S4</span>
      </div>
      <div className="SchedulerContainer">
        <ShiftScheduler scheduleId={scheduleId} />
      </div>
    </div>
  );
}
