import { useCountdown } from "@/hooks/useCountdown";

const Box = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-24 sm:w-28 sm:h-32 rounded-2xl bg-card/80 backdrop-blur border border-blueberry/40 shadow-glow flex items-center justify-center overflow-hidden">
      <span className="text-4xl sm:text-6xl font-bold text-gradient-blueberry tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 top-1/2 h-px bg-blueberry/30" />
    </div>
    <span className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
      {label}
    </span>
  </div>
);

export const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      <Box value={days} label="Days" />
      <Box value={hours} label="Hours" />
      <Box value={minutes} label="Mins" />
      <Box value={seconds} label="Secs" />
    </div>
  );
};
