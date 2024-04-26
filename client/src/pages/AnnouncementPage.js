import React, { useState, useEffect } from "react";
import "../css/AnnouncementPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import Navigation from "../components/NavBar";

import { getStores } from "../api/storesApi";
import { getRoles } from "../api/rolesApi";
import { getEmployees } from "../api/employeeApi";
import { getSchedules } from "../api/schedulesApi";
import {
  getAnnouncements,
  getAnnouncementsByStores,
  getAnnouncementsByRoles,
  getAnnouncementsByEmployees,
  getAnnouncementsBySchedules,
} from "../api/announcementsApi";
import StoreDropdown from "../components/dropdowns/StoreDropdown";
import RoleDropdown from "../components/dropdowns/RoleDropdown";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";
import AnnouncementMessage from "../components/AnnouncementMessage";
import CreateAnnouncementPopup from "../components/CreateAnnouncementPopup";

function isEmpty(array) {
  return Array.isArray(array) && array.length === 0;
}

function hasMoreThanOne(array) {
  return Array.isArray(array) && array.length > 1;
}

export default function AnnouncementPage() {
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [scheduleAnnouncements, setScheduleAnnouncements] = useState([]);
  const [storeAnnouncements, setStoreAnnouncements] = useState([]);
  const [roleAnnouncements, setRoleAnnouncements] = useState([]);
  const [employeeAnnouncements, setEmployeeAnnouncements] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    storeIds: [],
    roleIds: [],
    employeeIds: [],
    scheduleIds: [],
  });
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const toggleStoreDropdown = () => setStoreDropdownOpen(!storeDropdownOpen);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const toggleRoleDropdown = () => setRoleDropdownOpen(!roleDropdownOpen);

  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const toggleEmployeeDropdown = () =>
    setEmployeeDropdownOpen(!employeeDropdownOpen);

  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const toggleScheduleDropdown = () =>
    setScheduleDropdownOpen(!scheduleDropdownOpen);

  // State variable for managing popup visibility
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

        const defaultAnnouncements = await getAnnouncements();
        setAnnouncements(defaultAnnouncements);
        const scheduleAnnouncements = await getAnnouncementsBySchedules();
        setScheduleAnnouncements(scheduleAnnouncements);
        const storeAnnouncements = await getAnnouncementsByStores();
        setStoreAnnouncements(storeAnnouncements);
        const roleAnnouncements = await getAnnouncementsByRoles();
        setRoleAnnouncements(roleAnnouncements);
        const employeeAnnouncements = await getAnnouncementsByEmployees();
        setEmployeeAnnouncements(employeeAnnouncements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Function to filter announcements based on selected filters
  const filterAnnouncements = (selectedFilters) => {
    // Destructure selected filters
    const { storeIds, roleIds, employeeIds, scheduleIds } = selectedFilters;

    // Filter announcements based on selected filters
    let filteredAnnouncements = [];

    if (hasMoreThanOne(storeIds)) {
      // Step 1: Extract unique store IDs
      const uniqueStoreIds = [...new Set(storeIds)];

      // Step 2: For each unique store ID
      uniqueStoreIds.forEach((storeId) => {
        // Step 2a: Filter storeAnnouncements
        const announcementsForStore = storeAnnouncements.filter(
          (storeAnnouncement) => storeAnnouncement.Store_id === storeId
        );

        // Step 2b: Filter announcements
        const filteredAnnouncementsForStore = announcements.filter(
          (announcement) =>
            announcementsForStore.some(
              (storeAnnouncement) =>
                storeAnnouncement.Announcement_id === announcement.id
            )
        );

        // Step 3: Append filtered announcements
        filteredAnnouncements.push(...filteredAnnouncementsForStore);
      });
    } else if (!isEmpty(storeIds)) {
      const storeId = storeIds[0].id;
      const announcementsForStore = storeAnnouncements.filter(
        (storeAnnouncement) => storeAnnouncement.Store_id === storeId
      );

      const filteredAnnouncementsForStore = announcements.filter(
        (announcement) =>
          announcementsForStore.some(
            (storeAnnouncement) =>
              storeAnnouncement.Announcement_id === announcement.id
          )
      );

      // Append filtered announcements without overwriting
      filteredAnnouncements.push(...filteredAnnouncementsForStore);
    }
    // Repeat the same pattern for roles
    if (hasMoreThanOne(roleIds)) {
      // Step 1: Extract unique role IDs
      const uniqueRoleIds = [...new Set(roleIds)];

      // Step 2: For each unique role ID
      uniqueRoleIds.forEach((roleId) => {
        // Step 2a: Filter roleAnnouncements
        const announcementsForRole = roleAnnouncements.filter(
          (roleAnnouncement) => roleAnnouncement.Role_id === roleId
        );

        // Step 2b: Filter announcements
        const filteredAnnouncementsForRole = announcements.filter(
          (announcement) =>
            announcementsForRole.some(
              (roleAnnouncement) =>
                roleAnnouncement.Announcement_id === announcement.id
            )
        );

        // Step 3: Append filtered announcements
        filteredAnnouncements.push(...filteredAnnouncementsForRole);
      });
    } else if (!isEmpty(roleIds)) {
      const roleId = roleIds[0].id;

      const announcementsForRole = roleAnnouncements.filter(
        (roleAnnouncement) => roleAnnouncement.Role_id === roleId
      );

      const filteredAnnouncementsForRole = announcements.filter(
        (announcement) =>
          announcementsForRole.some(
            (roleAnnouncement) =>
              roleAnnouncement.Announcement_id === announcement.id
          )
      );

      // Append filtered announcements without overwriting
      filteredAnnouncements.push(...filteredAnnouncementsForRole);
    }

    // Repeat the same pattern for employees
    if (hasMoreThanOne(employeeIds)) {
      // Step 1: Extract unique employee IDs
      const uniqueEmployeeIds = [...new Set(employeeIds)];

      // Step 2: For each unique employee ID
      uniqueEmployeeIds.forEach((employeeId) => {
        // Step 2a: Filter employeeAnnouncements
        const announcementsForEmployee = employeeAnnouncements.filter(
          (employeeAnnouncement) =>
            employeeAnnouncement.Employee_id === employeeId
        );
        // Step 2b: Filter announcements
        const filteredAnnouncementsForEmployee = announcements.filter(
          (announcement) =>
            announcementsForEmployee.some(
              (employeeAnnouncement) =>
                employeeAnnouncement.Announcement_id === announcement.id
            )
        );

        // Step 3: Append filtered announcements
        filteredAnnouncements.push(...filteredAnnouncementsForEmployee);
      });
    } else if (!isEmpty(employeeIds)) {
      const employeeId = employeeIds[0].id;
      const announcementsForEmployee = employeeAnnouncements.filter(
        (employeeAnnouncement) =>
          employeeAnnouncement.Employee_id === employeeId
      );
      const filteredAnnouncementsForEmployee = announcements.filter(
        (announcement) =>
          announcementsForEmployee.some(
            (employeeAnnouncement) =>
              employeeAnnouncement.Announcement_id === announcement.id
          )
      );

      // Append filtered announcements without overwriting
      filteredAnnouncements.push(...filteredAnnouncementsForEmployee);
    }

    // Repeat the same pattern for schedules
    if (hasMoreThanOne(scheduleIds)) {
      // Step 1: Extract unique schedule IDs
      const uniqueScheduleIds = [...new Set(scheduleIds)];

      // Step 2: For each unique schedule ID
      uniqueScheduleIds.forEach((scheduleId) => {
        // Step 2a: Filter scheduleAnnouncements
        const announcementsForSchedule = scheduleAnnouncements.filter(
          (scheduleAnnouncement) =>
            scheduleAnnouncement.Schedule_id === scheduleId
        );

        // Step 2b: Filter announcements
        const filteredAnnouncementsForSchedule = announcements.filter(
          (announcement) =>
            announcementsForSchedule.some(
              (scheduleAnnouncement) =>
                scheduleAnnouncement.Announcement_id === announcement.id
            )
        );

        // Step 3: Append filtered announcements
        filteredAnnouncements.push(...filteredAnnouncementsForSchedule);
      });
    } else if (!isEmpty(scheduleIds)) {
      const scheduleId = scheduleIds[0].id;
      const announcementsForSchedule = scheduleAnnouncements.filter(
        (scheduleAnnouncement) =>
          scheduleAnnouncement.Schedule_id === scheduleId
      );

      const filteredAnnouncementsForSchedule = announcements.filter(
        (announcement) =>
          announcementsForSchedule.some(
            (scheduleAnnouncement) =>
              scheduleAnnouncement.Announcement_id === announcement.id
          )
      );

      // Append filtered announcements without overwriting
      filteredAnnouncements.push(...filteredAnnouncementsForSchedule);
    }
    return filteredAnnouncements;
  };

  // Function to handle filter changes
  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const handleSubmitAnnouncement = () => {
    let filteredAnnouncements = filterAnnouncements(selectedFilters);
    return filteredAnnouncements;
  };
  // Rendering logic
  if (loading) {
    return <div>Loading...</div>;
  }
  let filteredAnnouncements = [];
  if (!popupVisible) {
    filteredAnnouncements = filterAnnouncements(selectedFilters);
  }

  if (isEmpty(filteredAnnouncements)) {
    filteredAnnouncements = [
      {
        id: 999999999,
        body: "No announcements for filters",
        Employee_id: null,
      },
    ];
  }
  if (
    isEmpty(selectedFilters.storeIds) &&
    isEmpty(selectedFilters.roleIds) &&
    isEmpty(selectedFilters.employeeIds) &&
    isEmpty(selectedFilters.scheduleIds)
  ) {
    filteredAnnouncements = announcements;
  }

  return (
    <div className="AnnouncementPage_AnnouncementPage">
      <div className="Rectangle1" />
      <div
        className="Rectangle2"
        style={{ bottom: `${filterAnnouncements.length * -1500}px` }}
      />{" "}
      <div>
        <Navigation />
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
            </div>

            <button className="CustomButton" onClick={togglePopup}>
              Create Announcement
            </button>

            {popupVisible && (
              <div className="createannouncementpopup">
                <CreateAnnouncementPopup
                  onClose={() => togglePopup()}
                  onSubmit={handleSubmitAnnouncement}
                  stores={stores}
                  roles={roles}
                  employees={employees}
                  schedules={schedules}
                />
              </div>
            )}
          </div>{" "}
        </div>
        <span className="MessageArea">Message Area</span>
      </div>
      <div className="AnnouncementsContainer">
        {!popupVisible &&
          filteredAnnouncements
            .slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => b.id - a.id) // Sort in descending order based on index
            .map((announcement, index) => (
              <AnnouncementMessage
                key={index}
                text={announcement.body}
                employeeId={announcement.Employee_id}
              />
            ))}
      </div>
    </div>
  );
}
