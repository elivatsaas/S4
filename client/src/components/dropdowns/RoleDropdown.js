import React, { useState, useEffect } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const RoleDropdown = ({
  roles,
  toggleDropdown,
  isOpen,
  onSelectRole,
  selectedRoles,
}) => {
  const [selected, setSelected] = useState(selectedRoles || []);

  useEffect(() => {
    setSelected(selectedRoles || []);
  }, [selectedRoles]);

  const handleRoleSelect = (role) => {
    const isSelected = selected.includes(role);
    let updatedSelected = [];

    if (isSelected) {
      updatedSelected = selected.filter((r) => r !== role);
    } else {
      updatedSelected = [...selected, role];
    }
    setSelected(updatedSelected);
    onSelectRole(updatedSelected);
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
                checked={selected.includes(role)}
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
