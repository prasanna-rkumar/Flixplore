import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Button = forwardRef(({ children, onClick }, ref) => <button ref={ref} onClick={onClick} type="button" className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>);

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => { },
};

export default Button;
