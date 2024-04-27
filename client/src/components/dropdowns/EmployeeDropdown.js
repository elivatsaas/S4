import React, { useState, useEffect } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const EmployeeDropdown = ({
  employees,
  toggleDropdown,
  isOpen,
  onSelectEmployee,
  selectedEmployees,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedEmployees || []);
  }, [selectedEmployees]);

  const handleEmployeeSelect = (employee) => {
    const isSelected = selected.includes(employee);
    let updatedSelected = [];
    if (isSelected) {
      updatedSelected = selected.filter((e) => e !== employee);
    } else {
      updatedSelected = [...selected, employee];
    }
    setSelected(updatedSelected);
    onSelectEmployee(updatedSelected);
  };

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent click propagation to parent
    toggleDropdown(); // Toggle dropdown state
  };

  return (
    <div className="_04Dropdown" onClick={handleClick}>
      <span className="Label">Employees</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {employees.map((employee) => (
            <label key={employee.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selected.includes(employee)}
                onChange={() => handleEmployeeSelect(employee)}
              />
              <span>{`${employee.firstName} ${employee.lastName}`}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDropdown;
