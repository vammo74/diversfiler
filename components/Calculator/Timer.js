import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '../helpers/useInterval';

const Timer = (props) => {
  const timer = useRef();
  const [timerHeight, setTimerHeight] = useState(0);
  const [timerState, setTimerState] = useState(true);

  console.log('timer');

  useEffect(() => {
    if (props.timerFlag === 'start') {
      setTimerState(true);
      setTimerHeight(0);
    } else if (props.timerFlag === 'reset-on') {
      setTimerState(true);
      setTimerHeight((t) => t - 10);
    } else if (props.timerFlag === 'reset-off') {
      setTimerState(true);
      setTimerHeight((t) => t - 10);
    } else {
      setTimerState(false);
      setTimerHeight(0);
    }
  }, [props.timerFlag]);

  useInterval(() => {
    if (timerState) {
      if (timerHeight <= 100) {
        setTimerHeight(timerHeight + 1);
      } else {
        setTimerHeight(0);
        setTimerState(false);
      }
    }
  }, 500);

  return (
    <View className="timer">
      <View className="timer__bar">
        <View
          className={timerState !== 'stop' ? 'timer__fill' : 'timer__reset'}
          style={{ height: timerHeight.toString() + '%' }}
          ref={timer}
        ></View>
      </View>
    </View>
  );
};

export default Timer;
