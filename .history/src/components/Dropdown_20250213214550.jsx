import React from "react";
const Dropdown = ({ options, selectedOption, handleSelect }) => {
  return (
    <select
      className="form-select"
      value={selectedOption}
      onChange={(e) => handleSelect(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
