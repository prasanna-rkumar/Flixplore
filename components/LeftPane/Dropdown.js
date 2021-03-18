import PropTypes from 'prop-types';
import React from 'react';

const dropdownOptions = ['Drama', 'Romance', 'Action'];

const Dropdown = ({ label }) => (
  <div className="text-white group inline-block text-opacity-70 hover:text-opacity-100">
    <button
      type="submit"
      className="font-normal py-2 px-2 rounded inline-flex items-center"
    >
      <span className="mr-1">{label}</span>
      <svg
        className="fill-current h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </button>
    <DropdownOptions options={dropdownOptions} />
  </div>
);

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Dropdown;

const DropdownOptions = ({ options }) => (
  <ul className="rounded absolute z-50 hidden bg-gray-200 text-gray-800 pt-1 group-hover:block">
    {options.map((option) => (
      <li className="cursor-pointer" key={option}>
        <span
          className="hover:bg-gray-400 hover:text-gray-50 py-2 px-4 block whitespace-no-wrap"
          href="#"
        >
          {option}
        </span>
      </li>
    ))}
  </ul>
);

DropdownOptions.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
};
