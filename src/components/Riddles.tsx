import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Lock, Sparkles as SparkIcon } from "lucide-react";

const RIDDLES = [
  {
    q: "I'm tiny, I'm round, I'm sweet and I'm blue, your nickname my love, who am I to you?",
    a: "blueberry",
  },
  {
    q: "Popcorn, big screens, your hand holding mine, what's our favourite date, every single time?",
    a: "movie",
  },
  {
    q: "Number of years you'll be turning soon, dancing with me under the moon?",
    a: "22",
  },
];

export const Riddles = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [solved, setSolved] = useState<Record<number, boolean>>({});

  const check = (i: number) => {
    if ((answers[i] || "").trim().toLowerCase() === RIDDLES[i].a) {
      setSolved((s) => ({ ...s, [i]: true }));
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
      {RIDDLES.map((r, i) => {
        const isOpen = open === i;
        const isSolved = solved[i];
        return (
          <Card
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            className={`cursor-pointer p-5 bg-card/70 backdrop-blur border-blueberry/40 hover:border-accent transition-smooth ${
              isSolved ? "border-accent shadow-glow" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Riddle #{i + 1}
              </span>
              {isSolved ? (
                <SparkIcon className="w-4 h-4 text-accent" />
              ) : (
                <Lock className="w-4 h-4 text-blueberry-light" />
              )}
            </div>
            {isOpen || isSolved ? (
              <>
                <p className="text-sm text-foreground/90 italic mb-3">"{r.q}"</p>
                {isSolved ? (
                  <p className="text-accent font-semibold">✨ {r.a}, you got it!</p>
                ) : (
                  <div onClick={(e) => e.stopPropagation()}>
                    <input
                      value={answers[i] || ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [i]: e.target.value }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && check(i)}
                      placeholder="your guess..."
                      className="w-full bg-background/60 border border-blueberry/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                    />
                    <button
                      onClick={() => check(i)}
                      className="mt-2 w-full bg-gradient-blueberry text-primary-foreground rounded-lg py-2 text-sm font-semibold hover:opacity-90"
                    >
                      Check
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Tap to reveal a hint about us 💙</p>
            )}
          </Card>
        );
      })}
    </div>
  );
};
