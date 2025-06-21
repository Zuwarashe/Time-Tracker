import React from 'react';
import useTimer from '../Hooks/useTimer';

export default function Timer() {
  const { time, running, start, pause, stop } = useTimer();

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer-section">
      <div className="lottie-placeholder"></div>
      <h1 className="timer-display">{formatTime(time)}</h1>
      <div className="button-group">
        {!running ? (
          <button onClick={start} className="start">Start</button>
        ) : (
          <>
            <button onClick={pause} className="pause">Pause</button>
            <button onClick={stop} className="stop">Stop</button>
          </>
        )}
      </div>
    </div>
  );
}
