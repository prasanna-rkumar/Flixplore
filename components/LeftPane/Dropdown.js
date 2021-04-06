import PropTypes from 'prop-types';
import React from 'react';

const Dropdown = ({
  label, options, extractTitle, extractValue, onSelect, value,
}) => (
  <div className="relative text-white group inline-block text-opacity-70 hover:text-opacity-100">
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

    <ul style={{ background: '#354353' }} className="custom-scroll w-40 rounded absolute z-50 -left-1/2 hidden text-gray-300 overflow-y-scroll max-h-80 group-hover:block">
      {options.map((option) => (
        <div tabIndex={0} role="button" onKeyDown={() => { }} onClick={() => onSelect(option)} className="cursor-pointer" key={extractValue(option)}>
          <span
            className={`hover:bg-gray-400 hover:text-gray-50 py-2 px-4 block whitespace-no-wrap ${extractValue(value) === extractValue(option) ? 'bg-pink-500' : ''}`}
            href="#"
          >
            {extractTitle(option)}
          </span>
        </div>
      ))}
    </ul>

  </div>
);

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array),
  extractTitle: PropTypes.func,
  extractValue: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Object),
};

Dropdown.defaultProps = {
  options: [],
  extractTitle: (option) => option.name,
  extractValue: (option) => option.id,
  value: {},
};

export default Dropdown;
