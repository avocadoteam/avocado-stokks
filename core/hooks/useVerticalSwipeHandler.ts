import { useState } from 'react';
import { Dimensions, GestureResponderEvent } from 'react-native';

const heightDevice = Dimensions.get('window').height;
export const useVerticalSwipeHandler = (height: Height, setHeight: SetHeight, heightHandler?: HeightHanlder) => {
  const [lastValue, setLastValue] = useState(0);
  const touchStartHandler = (e: GestureResponderEvent) => {
    setLastValue(e.nativeEvent.pageY);
  };
  const touchMoveHandler = (e: GestureResponderEvent) => {
    const maxHeight = height.max ?? heightDevice;
    const minHeight = height.min ?? 300;
    const dif = lastValue - e.nativeEvent.pageY;

    if (height.current + dif < minHeight) {
      heightHandler && heightHandler.min && heightHandler.min();
    } else if (maxHeight > height.current + 30 + dif) {
      setHeight(prev => prev + dif);
    } else {
      heightHandler && heightHandler.max && heightHandler.max();
    }
    setLastValue(prev => prev - dif);
  };

  return [touchStartHandler, touchMoveHandler];
};

type SetHeight = (cb: (prev: number) => number) => void;
type Height = {
  min?: number;
  current: number;
  max?: number;
};
type HeightHanlder = {
  min?: () => void;
  max?: () => void;
};
