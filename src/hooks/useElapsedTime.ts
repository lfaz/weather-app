import { useEffect, useState } from 'react';

export function useElapsedTime(timestamp: string): string {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());

    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timestamp]);

  const elapsedSeconds = Math.max(0, Math.floor((now - new Date(timestamp).getTime()) / 1000));

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s ago`;
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m ago`;
  }

  return `${Math.floor(elapsedMinutes / 60)}h ago`;
}
