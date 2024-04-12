import React, { useState } from "react";
import "../../css/Dropdown.css";
import ImgAsset from "../../public";

const RoleDropdown = ({
  roles,
  isOpen,
  toggleDropdown,
  onSelectRole,
  selectedRoles,
}) => {
  const handleRoleSelect = (role) => {
    onSelectRole(role);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Role</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        {roles.map((role) => (
          <label key={role.id} className="role-label">
            <input
              type="checkbox"
              checked={selectedRoles.some(
                (selectedRole) => selectedRole.id === role.id
              )}
              onChange={() => handleRoleSelect(role)}
            />
            <span>{role.roleName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleDropdown;
