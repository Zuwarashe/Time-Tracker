import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem('time-tracker-time');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('time-tracker-time', time);
  }, [time]);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    localStorage.removeItem('time-tracker-time');
  };

  return { time, running, start, pause, stop };
}
