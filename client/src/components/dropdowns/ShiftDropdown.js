import React, { useState } from "react";
import "../../css/Dropdown.css";
import ImgAsset from "../../public";

const ShiftDropdown = ({
  shifts,
  isOpen,
  toggleDropdown,
  onSelectShift,
  selectedShifts,
}) => {
  const handleShiftSelect = (shift) => {
    onSelectShift(shift);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Shift</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        {shifts.map((shift) => (
          <label key={shift.id} className="shift-label">
            <input
              type="checkbox"
              checked={selectedShifts.some(
                (selectedShift) => selectedShift.id === shift.id
              )}
              onChange={() => handleShiftSelect(shift)}
            />
            <span>{shift.shiftName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShiftDropdown;
