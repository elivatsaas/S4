import React, { useState } from "react";
import "../../css/Dropdown.css";
import ImgAsset from "../../public";

const ScheduleDropdown = ({
  schedules,
  isOpen,
  toggleDropdown,
  onSelectSchedule,
  selectedSchedules,
}) => {
  const handleScheduleSelect = (schedule) => {
    onSelectSchedule(schedule);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Schedule</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        {schedules.map((schedule) => (
          <label key={schedule.id} className="schedule-label">
            <input
              type="checkbox"
              checked={selectedSchedules.some(
                (selectedSchedule) => selectedSchedule.id === schedule.id
              )}
              onChange={() => handleScheduleSelect(schedule)}
            />
            <span>{schedule.scheduleName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDropdown;
