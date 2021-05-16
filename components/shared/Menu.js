import propTypes from 'prop-types';
import uuid from 'react-uuid';
import { useState, useRef, useEffect } from 'react';

const Menu = ({
  title, menuItems, direction, left,
}) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container?.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  return (
    <div ref={container} className="relative w-min">
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setShow(!show)}
      >
        {title}
      </button>
      {show && (
        <div style={direction === 'left' ? { left } : { right: 0 }} className="origin-top-right absolute z-50 w-40 py-2 mt-1 bg-menu-bg rounded shadow-md">
          {menuItems.map((menuItem) => (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => { }}
              onClick={() => {
                setShow(false);
              }}
              key={uuid()}
              className="cursor-pointer text-gray-100 h-8 flex flex-col items-stretch justify-around hover:bg-blue-500 hover:text-blue-50"
            >
              {menuItem}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  title: propTypes.element.isRequired,
  menuItems: propTypes.instanceOf(Array).isRequired,
  direction: propTypes.string,
  left: propTypes.number,
};

Menu.defaultProps = {
  direction: 'left',
  left: 0,
};

export default Menu;
