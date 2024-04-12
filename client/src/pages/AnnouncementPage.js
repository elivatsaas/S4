import React, { useState, useEffect } from "react";
import "../css/AnnouncementPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import { getStores } from "../api/storesApi";
import { getRoles } from "../api/rolesApi";
import { getSchedules } from "../api/schedulesApi";
import { getShifts } from "../api/shiftsApi";
import { getEmployees } from "../api/employeeApi";
import FilterAnnouncementDropdown from "../components/dropdowns/FilterAnnouncementDropdown";

export default function AnnouncementPage() {
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);
        const rolesData = await getRoles();
        setRoles(rolesData);
        const schedulesData = await getSchedules();
        setSchedules(schedulesData);
        const shiftsData = await getShifts();
        setShifts(shiftsData);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = () => {
    // Logic to apply filters
  };

  // Transform stores data
  const transformedStores = stores.map((store) => ({
    value: store.id,
    label: store.storeName,
  }));

  // Transform roles data
  const transformedRoles = roles.map((role) => ({
    value: role.id,
    label: role.roleName, // Assuming there's a roleName property in your role object
  }));

  // Transform schedules data
  const transformedSchedules = schedules.map((schedule) => ({
    value: schedule.id,
    label: schedule.scheduleName, // Assuming there's a scheduleName property in your schedule object
  }));

  // Transform shifts data
  const transformedShifts = shifts.map((shift) => ({
    value: shift.id,
    label: shift.shiftName, // Assuming there's a shiftName property in your shift object
  }));

  // Transform employees data
  const transformedEmployees = employees.map((employee) => ({
    value: employee.id,
    label: employee.employeeName, // Assuming there's an employeeName property in your employee object
  }));

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
        {/* Include image tags for Vector, Vector_1, etc. */}
      </div>
      <span className="Announcements_1">Announcements</span>
      <div className="Frame1000007427">
        <div className="Frame1000007424">
          <div className="Frame1000007426">
            <span className="Filters">Filters:</span>
            <div className="Frame1000007425">
              {transformedStores.length > 0 && (
                <FilterAnnouncementDropdown
                  options={transformedStores}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  label="Store"
                />
              )}
              {transformedRoles.length > 0 && (
                <FilterAnnouncementDropdown
                  options={transformedRoles}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  label="Role"
                />
              )}
              {transformedSchedules.length > 0 && (
                <FilterAnnouncementDropdown
                  options={transformedSchedules}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  label="Schedule"
                />
              )}
              {transformedShifts.length > 0 && (
                <FilterAnnouncementDropdown
                  options={transformedShifts}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  label="Shift"
                />
              )}
              {transformedEmployees.length > 0 && (
                <FilterAnnouncementDropdown
                  options={transformedEmployees}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  label="Employee"
                />
              )}
            </div>
          </div>
        </div>
        <span className="MessageArea">Message Area</span>
        <button onClick={applyFilters}>Apply</button>
      </div>
    </div>
  );
}
