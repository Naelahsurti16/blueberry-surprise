import { useState } from "react";
import { Card } from "@/components/ui/card";

const REASONS = [
  "the way you make me smile without even trying",
  "how safe and comfortable I feel with you",
  "your laugh and the random gossip you give me that keeps me entertained all day 😭",
  "the random things you talk about that somehow always make me happy",
  "how patient you are with me",
  "because you always try your best",
  "the way you care even in small ways",
  "because even when you don't listen properly, you still somehow make everything better 😭",
  "how you make my boring days better",
  "because life feels lighter with you in it",
  "the way you make me feel loved",
  "how you stay with me even when I'm difficult",
  "your voice literally calms me down",
  "because you make me laugh at the dumbest things",
  "the way you randomly tell me stories and gossip like I'm your best friend 😭",
  "because talking to you is my favorite part of the day",
  "how supportive you are of me",
  "because you're genuinely such a beautiful person",
  "the way you make ordinary moments special",
  "because you're my comfort person",
  "because being with you feels like home",
  "and lastly… because you're simply you, and that's my favorite thing ever 🤍",
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
