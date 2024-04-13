import React, { useState, useEffect } from "react";
import "../css/AnnouncementPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import { getStores } from "../api/storesApi";
import { getRoles } from "../api/rolesApi";
import { getEmployees, getEmployee } from "../api/employeeApi";
import { getSchedules } from "../api/schedulesApi";
import { getShifts } from "../api/shiftsApi";
import { getAnnouncements } from "../api/announcementsApi";
import StoreDropdown from "../components/dropdowns/StoreDropdown";
import RoleDropdown from "../components/dropdowns/RoleDropdown";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";
import ShiftDropdown from "../components/dropdowns/ShiftDropdown";
import AnnouncementMessage from "../components/AnnouncementMessage";

export default function AnnouncementPage() {
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const [shiftDropdownOpen, setShiftDropdownOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);

        const rolesData = await getRoles();
        setRoles(rolesData);

        const employeesData = await getEmployees();
        setEmployees(employeesData);

        const schedulesData = await getSchedules();
        setSchedules(schedulesData);

        const shiftsData = await getShifts();
        setShifts(shiftsData);

        const announcementsData = await getAnnouncements();
        setAnnouncements(announcementsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleStoreDropdown = () => {
    setStoreDropdownOpen(!storeDropdownOpen);
  };

  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  const toggleEmployeeDropdown = () => {
    setEmployeeDropdownOpen(!employeeDropdownOpen);
  };

  const toggleScheduleDropdown = () => {
    setScheduleDropdownOpen(!scheduleDropdownOpen);
  };

  const toggleShiftDropdown = () => {
    setShiftDropdownOpen(!shiftDropdownOpen);
  };


  return (
    <div className="AnnouncementPage_AnnouncementPage">
      <div className="Rectangle1" />
      <div className="Rectangle2" />
      <div className="Frame9">
        <Link to="/landingpage">
          <span className="Home">Home</span>
        </Link>
        <span className="Announcements">Announcements</span>
        <Link to="/schedulingpage">
          <span className="Schedule">Schedule</span>
        </Link>
        <Link to="/employeepage">
          <span className="Employees">Employees</span>
        </Link>
      </div>
      <div className="Screenshot20240326at35932PM3">
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

      </div>
      <span className="Announcements_1">Announcements</span>
      <div className="Frame1000007427">
        <div className="Frame1000007424">
          <div className="Frame1000007426">
            <span className="Filters">Filters:</span>
            <div className="Frame1000007425">
              {stores && stores.length > 0 && (
                <StoreDropdown
                  stores={stores}
                  isOpen={storeDropdownOpen}
                  toggleDropdown={toggleStoreDropdown}
                />
              )}
              {roles && roles.length > 0 && (
                <RoleDropdown
                  roles={roles}
                  isOpen={roleDropdownOpen}
                  toggleDropdown={toggleRoleDropdown}
                />
              )}
              {employees && employees.length > 0 && (
                <EmployeeDropdown
                  employees={employees}
                  isOpen={employeeDropdownOpen}
                  toggleDropdown={toggleEmployeeDropdown}
                />
              )}
              {schedules && schedules.length > 0 && (
                <ScheduleDropdown
                  schedules={schedules}
                  isOpen={scheduleDropdownOpen}
                  toggleDropdown={toggleScheduleDropdown}
                />
              )}
              {shifts && shifts.length > 0 && (
                <ShiftDropdown
                  shifts={shifts}
                  isOpen={shiftDropdownOpen}
                  toggleDropdown={toggleShiftDropdown}

                />
              )}
            </div>
          </div>
        </div>
        <span className="MessageArea">Message Area</span>
      </div>
      <div className="AnnouncementsContainer">
        {announcements.map((announcement, index) => {
          return (
            <AnnouncementMessage
              key={index}
              text={announcement.body}
              employeeId={announcement.Employee_id}
            />
          );
        })}

      </div>
    </div>
  );
}
