import { useState } from 'react';
import { GestureResponderEvent } from 'react-native';

export const useScrollBarHandler = (initialPositionX: number) => {
  const [isTouched, setTouched] = useState(false);
  const [positionX, setPositionX] = useState(initialPositionX);
  const [lastValue, setLastValue] = useState(0);

  const setInitialStates = () => {
    setTouched(false);
    setPositionX(initialPositionX);
    setLastValue(0);
  };
  const touchStartHandler = (e: GestureResponderEvent) => {
    setTouched(true);
    setPositionX(e.nativeEvent.pageX);
    setLastValue(e.nativeEvent.pageX);
  };
  const touchEndHandler = () => {
    setInitialStates();
  };
  const touchCancelHandler = () => {
    setInitialStates();
  };
  const tryTouchMoveHandler = (e: GestureResponderEvent) => {
    const x = e?.nativeEvent?.pageX;
    const difX = lastValue - x;
    setPositionX(prev => prev - difX);
    setLastValue(prev => prev - difX);
  };
  const touchMoveHandler = (e: GestureResponderEvent) => {
    try {
      tryTouchMoveHandler(e);
    } catch (e) {
      setInitialStates();
    }
  };

  return { isTouched, positionX, touchStartHandler, touchMoveHandler, touchEndHandler, touchCancelHandler };
};
