import React, { useState } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const ShiftDropdown = ({ shifts, toggleDropdown, isOpen, onSelectShift }) => {
  const [selectedShifts, setSelectedShifts] = useState([]);

  const handleShiftSelect = (shift) => {
    const isSelected = selectedShifts.includes(shift);
    if (isSelected) {
      setSelectedShifts(selectedShifts.filter((s) => s !== shift));
    } else {
      setSelectedShifts([...selectedShifts, shift]);
    }
    onSelectShift(selectedShifts);

  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Shift</span>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {shifts.map((shift) => (
            <label key={shift.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selectedShifts.includes(shift)}
                onChange={() => handleShiftSelect(shift)}
              />
              <span>{shift.date}</span>
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

export default ShiftDropdown;
