import propTypes from 'prop-types';
import Image from 'next/image';

const CircularProgressIndicator = ({ size }) => (
  <Image className="animate-spin" src="/loading.svg" height={size} width={size} />
);

CircularProgressIndicator.propTypes = {
  size: propTypes.number.isRequired,
};

export default CircularProgressIndicator;
