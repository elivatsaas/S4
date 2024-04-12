import React from "react";

const Property1Default = ({ className, name, value, onChange }) => {
  return (
    <input
      className={`Property1Default ${className}`}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Property1Default;
