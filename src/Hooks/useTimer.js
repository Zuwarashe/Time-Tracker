import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const stop = () => {
    setRunning(false);
    setTime(0);
  };

  return { time, running, start, pause, stop };
}
