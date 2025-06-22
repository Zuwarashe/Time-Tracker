import React, { useState } from 'react';
import useTimer from '../Hooks/useTimer';
import Lottie from 'lottie-react';
import hourglass from '../Assets/hourglass.json';
import book from '../Assets/book.json';
import { FaStop, FaPause, FaPlay } from 'react-icons/fa';
import { HiSwitchHorizontal } from 'react-icons/hi';

export default function Timer({ onSave }) {
  const { time, running, start, pause, stop } = useTimer();
  const [useAlt, setUseAlt] = useState(false); // Controls which animation is shown

  // Toggle between two Lottie animations
  const toggleAnimation = () => setUseAlt(prev => !prev);

  // Format seconds into MM:SS
  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Handle stop and optionally save session time
  const handleStop = () => {
    if (onSave && time > 0) onSave(time);
    stop();
  };

  return (
    <div className="timer-section">
      {/* Animation visual */}
      <div className="lottie-container">
        <Lottie
          animationData={useAlt ? book : hourglass}
          loop={running}
          style={{ width: '100%', maxWidth: 180 }}
        />
        <button onClick={toggleAnimation} className="swap-button">
          <HiSwitchHorizontal />
        </button>
      </div>

      {/* Time display */}
      <h1 className="timer-display">{formatTime(time)}</h1>

      {/* Control buttons */}
      <div className="button-group">
        {!running ? (
          <button onClick={start} className="start">
            <FaPlay />
          </button>
        ) : (
          <>
            <button onClick={pause} className="pause">
              <FaPause />
            </button>
            <button onClick={handleStop} className="stop">
              <FaStop />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
