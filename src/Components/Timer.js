import React, { useState } from 'react';
import useTimer from '../Hooks/useTimer';
import Lottie from 'lottie-react';
import hourglass from '../Assets/hourglass.json';
import book from '../Assets/book.json';

export default function Timer({ onSave }) {
  const { time, running, start, pause, stop } = useTimer();
  const [useAlt, setUseAlt] = useState(false);

  const toggleAnimation = () => setUseAlt(prev => !prev);

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleStop = () => {
    if (onSave && time > 0) onSave(time);
    stop();
  };

  return (
    <div className="timer-section">
      <div className="lottie-container">
        <Lottie
          animationData={useAlt ? book : hourglass}
          loop={running}
          style={{ width: '100%', maxWidth: 180 }}
        />
        <button onClick={toggleAnimation} className="swap-button">
          🔁 Swap Style
        </button>
      </div>

      <h1 className="timer-display">{formatTime(time)}</h1>

      <div className="button-group">
        {!running ? (
          <button onClick={start} className="start">Start</button>
        ) : (
          <>
            <button onClick={pause} className="pause">Pause</button>
            <button onClick={handleStop} className="stop">Stop</button>
          </>
        )}
      </div>
    </div>
  );
}
