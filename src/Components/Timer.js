import React, { useRef, useEffect } from 'react';
import useTimer from '../Hooks/useTimer';
import Lottie from 'lottie-react';
import hourglass from '../Assets/hourglass.json';

export default function Timer() {
  const { time, running, start, pause, stop } = useTimer();
  const lottieRef = useRef();

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Control animation playback manually
  useEffect(() => {
    if (lottieRef.current) {
      if (running) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [running]);

  return (
    <div className="timer-section">
      <div className="lottie-container">
        <Lottie
          lottieRef={lottieRef}
          animationData={hourglass}
          loop
          autoplay={false}
          style={{ width: '100%', maxWidth: 180 }}
        />
      </div>

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
