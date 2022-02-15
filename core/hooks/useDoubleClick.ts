import { useState } from 'react';
import { useTimeout } from './useTimeout';

export const useDoubleClick = (callback: () => void) => {
  const [clickCount, setClickCount] = useState(0);
  useTimeout(callback, 3000, () => setClickCount(0));

  return () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 2) {
      setClickCount(0);
      callback();
    }
  };
};
