import propTypes from 'prop-types';

const CircularProgressIndicator = ({ size }) => (
  <div className="flex flex-row justify-center">
    <img className="animate-spin" src="/loading.svg" alt="loading" width={size} height={size} />
  </div>
);

CircularProgressIndicator.propTypes = {
  size: propTypes.number.isRequired,
};

export default CircularProgressIndicator;
