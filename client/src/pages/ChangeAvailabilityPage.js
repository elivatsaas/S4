import React, { useState, useEffect } from "react";
import "../css/ChangeAvailabilityPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import { getEmployees } from "../api/employeeApi";
import { getSchedules } from "../api/schedulesApi";
// import { updateAvailability } from "../../../server/src/handlers/availabilityHandlers";
import { addAvailability } from "../api/availabilityApi";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";

function isEmpty(array) {
  return Array.isArray(array) && array.length === 0;
}

export default function ChangeAvailabilityPage() {
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    employeeIds: [],
    scheduleIds: [],
  });

  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const toggleEmployeeDropdown = () =>
    setEmployeeDropdownOpen(!employeeDropdownOpen);

  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const toggleScheduleDropdown = () =>
    setScheduleDropdownOpen(!scheduleDropdownOpen);
  const [employeeAvailability, setEmployeeAvailability] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);

        const schedulesData = await getSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const handleSubmit = async () => {
    console.log(selectedFilters.employeeIds, selectedFilters.scheduleIds);
    var Employee_id = 0;
    var Schedule_id = 0;
    if (
      selectedFilters.employeeIds.length !== 0 &&
      selectedFilters.employeeIds.length < 2 &&
      selectedFilters.scheduleIds.length !== 0 &&
      selectedFilters.scheduleIds.length < 2
    ) {
      Employee_id = selectedFilters.employeeIds[0].id;
      Schedule_id = selectedFilters.scheduleIds[0].id;
      if (dayOfWeek.length === 0) {
        alert("Day has been left blank!");
      } else if (startTime.length === 0) {
        alert("Start time has been left blank!");
      } else if (endTime.length === 0) {
        alert("End time has been left blank!");
      } else {
        console.log(Employee_id);
        const added = await addAvailability({
          startTime,
          endTime,
          Employee_id,
          Schedule_id,
          dayOfWeek,
        });
        if (added.status === "success") {
          alert("Submitted!");
          window.location.href = "/changeavailabilitypage";
        } else {
          alert("Failed to change availability!");
        }
      }
    } else {
      if (
        selectedFilters.employeeIds.length === 0 ||
        selectedFilters.employeeIds.length > 1
      ) {
        alert("Employee not selected/Multiple Selected!");
      } else {
        alert("Schedule not selected/Multiple Selected!");
      }
    }
  };

  return (
    <div className="ChangeAvailabilityPage_ChangeAvailabilityPage">
      <div className="TopBar" />
      <div className="BottomBar" />
      <div className="NavBar">
        <Link to="/landingpage">
          <span className="Home">Home</span>
        </Link>
        <Link to="/announcementpage">
          <span className="Announcements">Announcements</span>
        </Link>
        <Link to="/schedulingpage">
          <span className="Schedule">Schedule</span>
        </Link>
        <Link to="/employeepage">
          <span className="Employees">Employees</span>
        </Link>
      </div>
      <span className="ChangeAvailability">Change Availability</span>
      <div className="Logo">
        <img className="Vector" src={ImgAsset.ChangeAvailabilityPage_Vector} />
        <img
          className="Vector_1"
          src={ImgAsset.ChangeAvailabilityPage_Vector_1}
        />
        <img
          className="Vector_2"
          src={ImgAsset.ChangeAvailabilityPage_Vector_2}
        />
        <img
          className="Vector_3"
          src={ImgAsset.ChangeAvailabilityPage_Vector_3}
        />
        <img
          className="Vector_4"
          src={ImgAsset.ChangeAvailabilityPage_Vector_4}
        />
        <img
          className="Vector_5"
          src={ImgAsset.ChangeAvailabilityPage_Vector_5}
        />
        <img
          className="Vector_6"
          src={ImgAsset.ChangeAvailabilityPage_Vector_6}
        />
        <img
          className="Vector_7"
          src={ImgAsset.ChangeAvailabilityPage_Vector_7}
        />
        <img
          className="Vector_8"
          src={ImgAsset.ChangeAvailabilityPage_Vector_8}
        />
        <span className="S4">S4</span>
      </div>
      <Link to="/schedulingpage">
        <div className="BackButton">
          <span className="Back">Back</span>
        </div>
      </Link>
      <div className="ChangeDisplay">
        <div className="InputDisplay">
          <div className="InputIndicators">
            <span className="Employee">Employee:</span>
            <span className="Schedule">Schedule:</span>
            <span className="Day">Day (Sun=0; Sat=6):</span>
            <span className="StartTime">Start Time:</span>
            <span className="EndTime">End Time:</span>
          </div>
          <div className="InputArea">
            {employees && employees.length > 0 && (
              <EmployeeDropdown
                employees={employees}
                isOpen={employeeDropdownOpen}
                toggleDropdown={toggleEmployeeDropdown}
                onSelectEmployee={(selectedEmployees) =>
                  handleFilterChange("employeeIds", selectedEmployees)
                }
                selectedEmployees={selectedFilters.employeeIds}
              />
            )}

            {schedules && schedules.length > 0 && (
              <ScheduleDropdown
                schedules={schedules}
                isOpen={scheduleDropdownOpen}
                toggleDropdown={toggleScheduleDropdown}
                onSelectSchedule={(selectedSchedules) =>
                  handleFilterChange("scheduleIds", selectedSchedules)
                }
                selectedSchedules={selectedFilters.scheduleIds}
              />
            )}

            <input
              type="number"
              name="dayOfWeek"
              id="dayOfWeek"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
            />
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="ChangeButton">
          <input
            type="button"
            name="change"
            id="change"
            value="Change"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
