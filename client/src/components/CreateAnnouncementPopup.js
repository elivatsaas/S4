import React, { useState } from "react";
import StoreDropdown from "../components/dropdowns/StoreDropdown";
import RoleDropdown from "../components/dropdowns/RoleDropdown";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";
import "../css/CreateAnnouncementPopup.css";
import {
  createAnnouncement,
  createAnnouncementSchedule,
  createAnnouncementStore,
  createAnnouncementEmployee,
  createAnnouncementRole,
} from "../api/announcementsApi"; // Import the createAnnouncement function

function isEmpty(array) {
  return Array.isArray(array) && array.length === 0;
}
function CreateAnnouncementPopup({
  onClose,
  onSubmit,
  employees,
  roles,
  schedules,
  stores,
}) {
  const [body, setBody] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    storeIds: [],
    roleIds: [],
    employeeIds: [],
    scheduleIds: [],
    senderIds: [],
  });
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const toggleStoreDropdown = () => setStoreDropdownOpen(!storeDropdownOpen);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const toggleRoleDropdown = () => setRoleDropdownOpen(!roleDropdownOpen);

  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const toggleEmployeeDropdown = () =>
    setEmployeeDropdownOpen(!employeeDropdownOpen);
  const [senderDropdownOpen, setSenderDropdownOpen] = useState(false);
  const toggleSenderDropdown = () => setSenderDropdownOpen(!senderDropdownOpen);
  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const toggleScheduleDropdown = () =>
    setScheduleDropdownOpen(!scheduleDropdownOpen);

  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (onCloseCallback) => {
    try {
      // Extracting employee ID
      let Employee_id = null;
      if (!isEmpty(selectedFilters.senderIds)) {
        Employee_id = selectedFilters.senderIds[0].id;
      }

      // Creating main announcement
      const response = await createAnnouncement(body, Employee_id);
      const announcementId = response.id;

      // Creating individual announcements for employees, stores, roles, and schedules
      if (!isEmpty(selectedFilters.employeeIds)) {
        for (const employeeId of selectedFilters.employeeIds) {
          await createAnnouncementEmployee(announcementId, employeeId.id);
        }
      }
      if (!isEmpty(selectedFilters.storeIds)) {
        for (const storeId of selectedFilters.storeIds) {
          await createAnnouncementStore(announcementId, storeId.id);
        }
      }
      if (!isEmpty(selectedFilters.roleIds)) {
        for (const roleId of selectedFilters.roleIds) {
          await createAnnouncementRole(announcementId, roleId.id);
        }
      }
      if (!isEmpty(selectedFilters.scheduleIds)) {
        for (const scheduleId of selectedFilters.scheduleIds) {
          await createAnnouncementSchedule(announcementId, scheduleId.id);
        }
      }

      // Submitting and closing popup
      onSubmit(selectedFilters, body, Employee_id);
      onCloseCallback();
    } catch (error) {
      console.error("Error creating announcement:", error);
      // Handle error
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="createHeader">
          <h2>Create Announcement</h2>
        </div>
        <div>
          {isEmpty(selectedFilters.senderIds) && (
            <div className="selectSender">
              <div className="senderHeading">
                Who is sending this announcement?
              </div>
              {employees && employees.length > 0 && (
                <EmployeeDropdown
                  employees={employees}
                  isOpen={senderDropdownOpen}
                  toggleDropdown={toggleSenderDropdown}
                  onSelectEmployee={(selectedEmployees) =>
                    handleFilterChange("senderIds", selectedEmployees)
                  }
                  selectedEmployees={selectedFilters.senderIds}
                />
              )}
            </div>
          )}
        </div>
        <div>
          {!isEmpty(selectedFilters.senderIds) && (
            <div>
              <button
                className="createButton"
                onClick={() => handleSubmit(onClose)}
              >
                Send Announcement
              </button>
              <div className="FilterArea">
                <div className="FilterSelection">
                  <span className="Filters">Send by:</span>
                  <div className="DropdownMenu">
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
                </div>
              </div>
              <div className="announcementInput">
                <textarea
                  style={{
                    width: "975px", // Adjust the width as needed
                    height: "600px", // Adjust the height as needed
                  }}
                  value={body}
                  onChange={handleBodyChange}
                  placeholder="Enter your announcement here..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAnnouncementPopup;
