import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setDimensions({ width, height });
    }

    handleResize();
    window.addEventListener('load', () => handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}
