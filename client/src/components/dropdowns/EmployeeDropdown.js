import React, { useState } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const EmployeeDropdown = ({
  employees,
  toggleDropdown,
  isOpen,
  onSelectEmployee,
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleEmployeeSelect = (employee) => {
    const isSelected = selectedEmployees.includes(employee);
    if (isSelected) {
      setSelectedEmployees(selectedEmployees.filter((emp) => emp !== employee));
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
    onSelectEmployee(selectedEmployees);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Employee</span>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {employees.map((employee) => (
            <label key={employee.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee)}
                onChange={() => handleEmployeeSelect(employee)}
              />
              <span>{`${employee.firstName} ${employee.lastName}`}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="chevrondown">
        <img
          className="Vector_9"
          src={ImgAsset.AnnouncementPage_Vector_9}
          alt="Chevron down"
        />

      </div>
    </div>
  );
};

export default EmployeeDropdown;
