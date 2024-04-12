import React, { useState } from "react";
import "../../css/Dropdown.css";
import ImgAsset from "../../public";

const EmployeeDropdown = ({
  employees,
  isOpen,
  toggleDropdown,
  onSelectEmployee,
  selectedEmployees,
}) => {
  const handleEmployeeSelect = (employee) => {
    onSelectEmployee(employee);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Employee</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        {employees.map((employee) => (
          <label key={employee.id} className="employee-label">
            <input
              type="checkbox"
              checked={selectedEmployees.some(
                (selectedEmployee) => selectedEmployee.id === employee.id
              )}
              onChange={() => handleEmployeeSelect(employee)}
            />
            <span>{employee.employeeName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDropdown;
