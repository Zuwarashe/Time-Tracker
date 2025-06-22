import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  // Initialize timer from localStorage or default to 0
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem('time-tracker-time');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null); // Stores interval ID for control

  // Sync time to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('time-tracker-time', time);
  }, [time]);

  // Start timer if not already running
  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  // Pause timer
  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  // Stop and reset timer
  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    localStorage.removeItem('time-tracker-time');
  };

  return { time, running, start, pause, stop };
}
