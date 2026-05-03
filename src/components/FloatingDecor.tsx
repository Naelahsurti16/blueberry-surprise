import { useEffect, useState } from "react";

export const Balloons = () => {
  const balloons = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {balloons.map((_, i) => {
        const left = (i * 13 + 7) % 95;
        const delay = (i * 1.7) % 12;
        const hue = 195 + ((i * 17) % 40);
        return (
          <div
            key={i}
            className="balloon"
            style={{
              left: `${left}%`,
              animationDelay: `-${delay}s`,
              background: `radial-gradient(circle at 30% 30%, hsl(${hue} 100% 75%), hsl(${hue} 90% 45%))`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  useEffect(() => {
    if (active) setPieces(Array.from({ length: 80 }, (_, i) => i));
  }, [active]);
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const dur = 3 + Math.random() * 3;
        const delay = Math.random() * 2;
        const hues = [200, 210, 220, 195, 230, 180];
        const hue = hues[i % hues.length];
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              background: `hsl(${hue} 100% ${60 + (i % 3) * 10}%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Sparkles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-accent"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i * 0.3) % 4}s`,
            fontSize: `${10 + (i % 4) * 4}px`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};
