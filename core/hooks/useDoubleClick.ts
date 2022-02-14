import { useState } from 'react';

export const useDoubleClick = (callback: () => void) => {
  const [clickCount, setClickCount] = useState(0);

  return () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 2) {
      setClickCount(0);
      callback();
    } else {
      setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };
};
