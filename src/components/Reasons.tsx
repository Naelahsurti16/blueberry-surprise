import { useState } from "react";
import { Card } from "@/components/ui/card";

const REASONS = [
  "Your laugh is my favorite sound in the universe.",
  "You're short but you carry my whole world 💙",
  "The way you say my name softens every bad day.",
  "You make ordinary moments feel like a movie scene.",
  "Your hugs feel like home — warm, safe, forever.",
  "You believe in me even when I don't believe in myself.",
  "You're stubborn, silly, and impossibly mine. ✨",
];

export const Reasons = () => {
  const [revealed, setRevealed] = useState<number[]>([]);
  return (
    <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto">
      {REASONS.map((r, i) => {
        const isOpen = revealed.includes(i);
        return (
          <Card
            key={i}
            onClick={() => setRevealed((s) => (s.includes(i) ? s : [...s, i]))}
            className="cursor-pointer p-5 bg-card/70 backdrop-blur border-blueberry/40 hover:border-accent hover:shadow-glow transition-smooth"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💙</span>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Reason {String(i + 1).padStart(2, "0")}
                </p>
                {isOpen ? (
                  <p className="text-foreground/95 animate-fade-in-up">{r}</p>
                ) : (
                  <p className="text-muted-foreground italic">tap to reveal...</p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
