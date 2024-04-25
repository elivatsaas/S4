import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/SchedulingPage.css";
import "../css/Schedule.css";
import Navigation from "../components/NavBar";
import ImgAsset from "../public";
import DailySchedule from "../components/DailySchedule";
import WeeklySchedule from "../components/WeeklySchedule";
import MonthlySchedule from "../components/MonthlySchedule";
import StoreDropdown from "../components/dropdowns/StoreDropdown";
import RoleDropdown from "../components/dropdowns/RoleDropdown";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";
import { getStore, getStores } from "../api/storesApi";
import { getRoles, getRole } from "../api/rolesApi";
import { getEmployee, getEmployees } from "../api/employeeApi";
import {
  getSchedules,
  generateSchedule,
  confirmSchedule,
} from "../api/schedulesApi";
import { getShiftsBySchedule } from "../api/shiftsApi";

function isEmpty(array) {
  return Array.isArray(array) && array.length === 0;
}

function hasMoreThanOne(array) {
  return Array.isArray(array) && array.length > 1;
}

const SchedulingPage = () => {
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    storeIds: [],
    roleIds: [],
    employeeIds: [],
    scheduleIds: [],
  });
  const [view, setView] = useState("day");
  const [loading, setLoading] = useState(true);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [scheduleSelected, setScheduleSelected] = useState(false); // New state to track schedule selection
  const [scheduleId, setScheduleId] = useState(null);
  const [gSchedule, setGSchedule] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const toggleStoreDropdown = () => setStoreDropdownOpen(!storeDropdownOpen);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const toggleRoleDropdown = () => setRoleDropdownOpen(!roleDropdownOpen);

  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const toggleEmployeeDropdown = () =>
    setEmployeeDropdownOpen(!employeeDropdownOpen);

  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const toggleScheduleDropdown = () => {
    setScheduleDropdownOpen(!scheduleDropdownOpen);
    setScheduleSelected(false); // Reset schedule selection when toggling the dropdown
  };

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShiftsBySchedule(scheduleId);
        // Transform the shifts data to the required format
        const formattedShifts = await Promise.all(
          shiftsData.map(async (shift) => {
            // Extract year, month, and day from the date string
            const year = parseInt(shift.date.substr(0, 4));
            const month = parseInt(shift.date.substr(5, 2)) - 1; // Month is 0-indexed in JavaScript
            const day = parseInt(shift.date.substr(8, 2));

            // Extract hour and minute from the startTime and endTime strings
            const [startHour, startMinute] = shift.startTime
              .split(":")
              .map(Number);
            const [endHour, endMinute] = shift.endTime.split(":").map(Number);

            // Create start and end Date objects
            const start = new Date(year, month, day, startHour, startMinute);
            const end = new Date(year, month, day, endHour, endMinute);
            const store = await getStore(shift.Store_id);
            const role = await getRole(shift.Role_id);

            // Fetch employee data if Employee_id is not null
            let fullName;
            let initials;
            if (shift.Employee_id !== null) {
              const employee = await getEmployee(shift.Employee_id);
              fullName = `${employee.firstName} ${employee.lastName}`;
              initials = `${employee.firstName[0]} ${employee.lastName[0]}`;
            } else {
              fullName = "No Employee";
            }
            return {
              id: shift.id,
              title: fullName,
              start,
              end,
              role: role.roleName,
              roleId: role.id,
              store: store.storeName,
              storeId: store.id,
              employeeId: shift.Employee_id,
              initials,
            };
          })
        );

        // Set the shifts and update earliestDate, earliestStartTime, and latestEndTime
        setShifts(formattedShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    if (scheduleId || gSchedule) {
      fetchShifts();
    }
  }, [scheduleId, gSchedule]);

  useEffect(() => {
    // Fetch data once at the beginning
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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Call the filterShifts function whenever selectedFilters change
    const filtered = filterShifts(selectedFilters);
    setFilteredShifts(filtered);
  }, [selectedFilters]);

  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const filterShifts = (selectedFilters) => {
    const { storeIds, roleIds, employeeIds, scheduleIds } = selectedFilters;

    let filteredShifts = [...shifts];

    if (hasMoreThanOne(storeIds)) {
      const uniqueStoreIds = [...new Set(storeIds.map((store) => store.id))];
      filteredShifts = filteredShifts.filter((shift) =>
        uniqueStoreIds.includes(shift.storeId)
      );
    } else if (!isEmpty(storeIds)) {
      const storeId = storeIds[0].id;
      filteredShifts = filteredShifts.filter(
        (shift) => shift.storeId === storeId
      );
    }

    if (hasMoreThanOne(roleIds)) {
      const uniqueRoleIds = [...new Set(roleIds.map((role) => role.id))];
      filteredShifts = filteredShifts.filter((shift) =>
        uniqueRoleIds.includes(shift.roleId)
      );
    } else if (!isEmpty(roleIds)) {
      const roleId = roleIds[0].id;
      filteredShifts = filteredShifts.filter(
        (shift) => shift.roleId === roleId
      );
    }

    if (hasMoreThanOne(employeeIds)) {
      const uniqueEmployeeIds = [
        ...new Set(employeeIds.map((employee) => employee.id)),
      ];
      filteredShifts = filteredShifts.filter((shift) =>
        uniqueEmployeeIds.includes(shift.employeeId)
      );
    } else if (!isEmpty(employeeIds)) {
      const employeeId = employeeIds[0].id;
      filteredShifts = filteredShifts.filter(
        (shift) => shift.employeeId === employeeId
      );
    }

    return filteredShifts;
  };
  let shiftsToDisplay = filterShifts(selectedFilters);

  function displayAlert(string) {
    return string;
  }

  // Example usage

  if (
    isEmpty(shiftsToDisplay) &&
    (!isEmpty(selectedFilters.storeIds) ||
      !isEmpty(selectedFilters.roleIds) ||
      !isEmpty(selectedFilters.employeeIds))
  ) {
    shiftsToDisplay = shifts;
    setSelectedFilters({
      storeIds: [],
      roleIds: [],
      employeeIds: [],
      scheduleIds: [],
    });
    const alertMessage = displayAlert("No shifts found for selected filters");
    window.alert(alertMessage);
  }
  if (
    isEmpty(selectedFilters.storeIds) &&
    isEmpty(selectedFilters.roleIds) &&
    isEmpty(selectedFilters.employeeIds) &&
    isEmpty(selectedFilters.scheduleIds)
  ) {
    shiftsToDisplay = shifts;
  }
  const handleGenerateSchedule = async () => {
    if (!selectedFilters.scheduleIds[0]) {
      const alertMessage1 = displayAlert("Please select a schedule");
      window.alert(alertMessage1);
    }

    const alertMessage2 = displayAlert("Generating Schedule...");
    window.alert(alertMessage2);
    try {
      const generatedSchedule = await generateSchedule(
        selectedFilters.scheduleIds[0].id
      );
      if (generatedSchedule) {
        const alertMessage3 = displayAlert("Please select a schedule");
        window.alert(alertMessage3);
      } else {
        const alertMessage4 = displayAlert("Error Generating Schedule");
        window.alert(alertMessage4);
      }
    } catch (error) {
      const alertMessage5 = displayAlert("Error Generating Schedule");
      window.alert(alertMessage5);
    }
    let generatedSchedule = filterShifts(selectedFilters);
    setFilteredShifts(generatedSchedule);
    setGSchedule(true);
  };
  const handleConfirmSchedule = async () => {
    try {
      const confirmedSchedule = await confirmSchedule(
        selectedFilters.scheduleIds[0].id
      );
      if (confirmedSchedule) {
        const alertMessage3 = displayAlert("Schedule Emails Sent");
        window.alert(alertMessage3);
      } else {
        const alertMessage4 = displayAlert("Error Confirming Schedule");
        window.alert(alertMessage4);
      }
    } catch (error) {
      const alertMessage5 = displayAlert("Error Confirming Schedule");
      window.alert(alertMessage5);
    }
  };

  let scheduleComponent;
  switch (view) {
    case "day":
      scheduleComponent = <DailySchedule shifts={shiftsToDisplay} />;
      break;
    case "week":
      scheduleComponent = <WeeklySchedule shifts={shiftsToDisplay} />;
      break;
    case "month":
      scheduleComponent = <MonthlySchedule shifts={shiftsToDisplay} />;
      break;
    default:
      scheduleComponent = <WeeklySchedule shifts={shiftsToDisplay} />;
  }
  useEffect(() => {
    if (
      roles.length > 0 &&
      stores.length > 0 &&
      employees.length > 0 &&
      schedules.length > 0
    ) {
      setLoading(false); // Set loading to false once all data is fetched
    }
  }, [roles, stores, employees, schedules]);

  if (loading) {
    return <div>Loading...</div>; // Return loading indicator if data is still being fetched
  }
  return (
    <div className="SchedulingPage_SchedulingPage">
      <div className="TopBar" />
      <div className="BottomBar" />
      <div>
        <Navigation />
        <span className="S4">S4</span>
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

      <div className="FilterArea">
        <div className="FilterSelection">
          <span className="Filters">Filters:</span>
          <div className="DropdownMenu">
            {/* Render only the schedule dropdown */}
            {schedules && schedules.length > 0 && (
              <ScheduleDropdown
                schedules={schedules}
                isOpen={scheduleDropdownOpen}
                toggleDropdown={toggleScheduleDropdown}
                onSelectSchedule={(selectedSchedules) => {
                  handleFilterChange("scheduleIds", selectedSchedules);
                  // Set the scheduleId to the selected schedule id
                  const selectedScheduleId =
                    selectedSchedules.length > 0
                      ? selectedSchedules[0].id
                      : null;
                  setScheduleId(selectedScheduleId);
                }}
                selectedSchedules={selectedFilters.scheduleIds}
              />
            )}
          </div>
        </div>
      </div>

      {!gSchedule && shiftsToDisplay.length > 0 && (
        <>
          <div className="GenerateSchedule">
            <button onClick={handleGenerateSchedule}>Generate Schedule</button>
          </div>
          <div className="FilterArea">
            <div className="FilterSelection">
              <span className="Filters">Filters:</span>
              <div className="DropdownMenu">
                {schedules && schedules.length > 0 && (
                  <ScheduleDropdown
                    schedules={schedules}
                    isOpen={scheduleDropdownOpen}
                    toggleDropdown={toggleScheduleDropdown}
                    onSelectSchedule={(selectedSchedules) => {
                      handleFilterChange("scheduleIds", selectedSchedules);
                      // Set the scheduleId to the selected schedule id
                      const selectedScheduleId =
                        selectedSchedules.length > 0
                          ? selectedSchedules[0].id
                          : null;
                      setScheduleId(selectedScheduleId);
                    }}
                    selectedSchedules={selectedFilters.scheduleIds}
                  />
                )}
                {stores && stores.length > 0 && (
                  <StoreDropdown
                    stores={stores}
                    isOpen={storeDropdownOpen}
                    toggleDropdown={toggleStoreDropdown}
                    onSelectStore={(selectedStores) =>
                      handleFilterChange("storeIds", selectedStores)
                    }
                    selectedStores={selectedFilters.storeIds}
                  />
                )}
                {roles && roles.length > 0 && (
                  <RoleDropdown
                    roles={roles}
                    isOpen={roleDropdownOpen}
                    toggleDropdown={toggleRoleDropdown}
                    onSelectRole={(selectedRoles) =>
                      handleFilterChange("roleIds", selectedRoles)
                    }
                    selectedRoles={selectedFilters.roleIds}
                  />
                )}
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
              </div>
            </div>
          </div>
          <div className="schedule-container">{scheduleComponent}</div>
        </>
      )}
      {gSchedule && shiftsToDisplay.length > 0 && (
        <>
          <div className="GenerateSchedule">
            <button onClick={handleConfirmSchedule}>Confirm Schedule</button>
          </div>
          <div className="FilterArea">
            <div className="FilterSelection">
              <span className="Filters">Filters:</span>
              <div className="DropdownMenu">
                {schedules && schedules.length > 0 && (
                  <ScheduleDropdown
                    schedules={schedules}
                    isOpen={scheduleDropdownOpen}
                    toggleDropdown={toggleScheduleDropdown}
                    onSelectSchedule={(selectedSchedules) => {
                      handleFilterChange("scheduleIds", selectedSchedules);
                      // Set the scheduleId to the selected schedule id
                      const selectedScheduleId =
                        selectedSchedules.length > 0
                          ? selectedSchedules[0].id
                          : null;
                      setScheduleId(selectedScheduleId);
                    }}
                    selectedSchedules={selectedFilters.scheduleIds}
                  />
                )}
                {stores && stores.length > 0 && (
                  <StoreDropdown
                    stores={stores}
                    isOpen={storeDropdownOpen}
                    toggleDropdown={toggleStoreDropdown}
                    onSelectStore={(selectedStores) =>
                      handleFilterChange("storeIds", selectedStores)
                    }
                    selectedStores={selectedFilters.storeIds}
                  />
                )}
                {roles && roles.length > 0 && (
                  <RoleDropdown
                    roles={roles}
                    isOpen={roleDropdownOpen}
                    toggleDropdown={toggleRoleDropdown}
                    onSelectRole={(selectedRoles) =>
                      handleFilterChange("roleIds", selectedRoles)
                    }
                    selectedRoles={selectedFilters.roleIds}
                  />
                )}
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
              </div>
            </div>
          </div>
          <div className="schedule-container">{scheduleComponent}</div>
        </>
      )}
    </div>
  );
};

export default SchedulingPage;
