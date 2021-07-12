import { counterActions } from 'core/modules/counter/reducer';
import { getCounterValue } from 'core/modules/counter/selector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CurrentUserInfo: React.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector(getCounterValue);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch(counterActions.increment())}>add</button>
    </div>
  );
};
