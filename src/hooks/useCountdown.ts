import { useEffect, useState } from "react";

const TARGET = new Date(new Date().getFullYear(), 4, 13, 0, 0, 0); // May 13 this year
if (TARGET.getTime() < Date.now() - 1000 * 60 * 60 * 24) {
  TARGET.setFullYear(TARGET.getFullYear() + 1);
}

export const useCountdown = () => {
  const calc = () => {
    const diff = TARGET.getTime() - Date.now();
    const isUnlocked = diff <= 0;
    const total = Math.max(diff, 0);
    return {
      isUnlocked,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / (1000 * 60)) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};
