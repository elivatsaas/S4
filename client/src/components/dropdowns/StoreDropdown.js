import React, { useState } from "react";
import ImgAsset from "../../public";
import "../../css/Dropdown.css";

const StoreDropdown = ({ stores, toggleDropdown, isOpen, onSelectStore }) => {
  const [selectedStores, setSelectedStores] = useState([]);

  const handleStoreSelect = (store) => {
    const isSelected = selectedStores.includes(store);
    if (isSelected) {
      setSelectedStores(selectedStores.filter((s) => s !== store));
    } else {
      setSelectedStores([...selectedStores, store]);
    }
    onSelectStore(selectedStores);
  };

  return (
    <div className="_04Dropdown" onClick={toggleDropdown}>
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
                checked={selectedStores.includes(store)}

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
