import React from "react";

const Dropdown = ({ options, selectedOption, handleSelect }) => {
  return (
    <div className="dropdown">
      <button
        className=" my-3 btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Priority <i className="fa-solid fa-filter"></i>
      </button>
      <ul className=" my-2 dropdown-menu">
        {options.map((option) => (
          <li key={option}>
            <button
              className=" white-border dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {/* option.charAt(0): Gets the first character of the string option.
                 .toUpperCase(): Converts that first character to uppercase.
                  option.slice(1): Extracts the rest of the string (excluding the
                  first character). +: Concatenates the uppercase first letter with
                  the rest of the string. Priority: Just a static string added after
                  the formatted option. */}
              {option.charAt(0).toUpperCase() + option.slice(1)} Priority
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
