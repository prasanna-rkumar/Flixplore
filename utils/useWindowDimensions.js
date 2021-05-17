import { useState, useEffect } from 'react';
import throttle from './throttle';

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setDimensions({ width, height });
    }

    handleResize();
    window.addEventListener('load', () => handleResize);
    window.addEventListener('resize', throttle(handleResize, 250));
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}
