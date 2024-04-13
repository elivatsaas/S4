import React, { useState } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const RoleDropdown = ({ roles, toggleDropdown, isOpen, onSelectRole }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleRoleSelect = (role) => {
    const isSelected = selectedRoles.includes(role);
    if (isSelected) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
    onSelectRole(selectedRoles);

  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Role</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {roles.map((role) => (
            <label key={role.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleRoleSelect(role)}
              />
              <span>{role.roleName}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleDropdown;
