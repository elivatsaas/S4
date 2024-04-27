import React, { useState, useEffect } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const ScheduleDropdown = ({
  schedules,
  toggleDropdown,
  isOpen,
  onSelectSchedule,
  selectedSchedules,
}) => {
  const [selected, setSelected] = useState(selectedSchedules || []);

  useEffect(() => {
    setSelected(selectedSchedules || []);
  }, [selectedSchedules]);

  const handleScheduleSelect = (schedule) => {
    const isSelected = selected.includes(schedule);
    let updatedSelected = [];

    if (isSelected) {
      updatedSelected = selected.filter((sch) => sch !== schedule);
    } else {
      updatedSelected = [...selected, schedule];
    }
    setSelected(updatedSelected);
    onSelectSchedule(updatedSelected);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
      <span className="Label">Schedule</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {schedules.map((schedule) => (
            <label key={schedule.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selected.includes(schedule)}
                onChange={() => handleScheduleSelect(schedule)}
              />
              <span>
                {schedule.scheduleName || `Schedule ID: ${schedule.id}`}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDropdown;
