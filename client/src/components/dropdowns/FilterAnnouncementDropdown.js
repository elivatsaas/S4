import React, { useState } from "react";

const FilterAnnouncementDropdown = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedIndex = selectedItems.indexOf(option);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, option]);
    } else {
      const updatedItems = [...selectedItems];
      updatedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedItems);
    }
  };

  return (
    <div className="filter-dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {label} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-item ${
                selectedItems.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterAnnouncementDropdown;
