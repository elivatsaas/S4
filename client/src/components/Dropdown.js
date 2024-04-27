import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import ImgAsset from "../public";
import "../css/Dropdown.css";

function Dropdown({ title, items, multiSelect = false }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="_04Dropdown">
      <div
        tabIndex={0}
        className="Frame1000007427 Frame1000007424 Frame1000007426 Frame1000007425 _04Dropdown"
        role="button"
        onClick={() => toggle(!open)}
      >
        <div className="Label">{title}</div>
        <div className="chevrondown">
          <img className="Vector_9" src={ImgAsset.AnnouncementPage_Vector_9} />
        </div>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li className="dropdown-label" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                {isItemInSelection(item) && <span>Selected</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
