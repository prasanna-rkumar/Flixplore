import propTypes from 'prop-types';

const LoadingOverlay = ({ isLoading }) => (
  <div className={`${isLoading ? 'block' : 'hidden'} fixed h-screen w-screen bg-gray-500 bg-opacity-50 top-0 left-0 z-50 flex`}>
    <div
      style={{
        borderTopColor: '#db3b83',
      }}
      className="animate-spin w-16 h-16 rounded-full border-gray-500 border-8 m-auto"
    />
  </div>
);
export default LoadingOverlay;

LoadingOverlay.propTypes = {
  isLoading: propTypes.bool.isRequired,
};
