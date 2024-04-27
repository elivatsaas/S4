import React, { useState, useEffect } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const StoreDropdown = ({
  stores,
  toggleDropdown,
  isOpen,
  onSelectStore,
  selectedStores,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedStores || []);
  }, [selectedStores]);

  const handleStoreSelect = (store) => {
    const isSelected = selected.includes(store);
    let updatedSelected = [];

    if (isSelected) {
      updatedSelected = selected.filter((s) => s !== store);
    } else {
      updatedSelected = [...selected, store];
    }
    setSelected(updatedSelected);
    onSelectStore(updatedSelected);
  };

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent click propagation to parent
    toggleDropdown(); // Toggle dropdown state
  };

  return (
    <div className="_04Dropdown" onClick={handleClick}>
      <span className="Label">Store</span>
      <div className="chevrondown">
        <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
      </div>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <div className="dropdown-list">
          {stores.map((store) => (
            <label key={store.id} className="dropdown-label">
              <input
                type="checkbox"
                checked={selected.includes(store)}
                onChange={() => handleStoreSelect(store)}
              />
              <span>{store.storeName}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreDropdown;
