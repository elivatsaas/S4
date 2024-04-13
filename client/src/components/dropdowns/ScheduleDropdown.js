import React, { useState } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const ScheduleDropdown = ({
  schedules,
  toggleDropdown,
  isOpen,
  onSelectSchedule,
}) => {
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const handleScheduleSelect = (schedule) => {
    const isSelected = selectedSchedules.includes(schedule);
    if (isSelected) {
      setSelectedSchedules(selectedSchedules.filter((sch) => sch !== schedule));
    } else {
      setSelectedSchedules([...selectedSchedules, schedule]);
    }
    onSelectSchedule(selectedSchedules);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Schedule</span>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {schedules.map((schedule) => (
            <label key={schedule.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selectedSchedules.includes(schedule)}
                onChange={() => handleScheduleSelect(schedule)}
              />
              <span>
                {schedule.scheduleName || `Schedule ID: ${schedule.id}`}
              </span>
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

export default ScheduleDropdown;
