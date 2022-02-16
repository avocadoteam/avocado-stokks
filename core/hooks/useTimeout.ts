import { useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number, ...deps: unknown[]) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    if (typeof delay === 'number' && savedCallback.current) {
      const id = setTimeout(savedCallback.current, delay);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [delay, savedCallback, ...deps]);
};
