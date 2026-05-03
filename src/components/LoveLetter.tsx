import { useState } from "react";
import { Card } from "@/components/ui/card";

export const LoveLetter = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-2xl mx-auto">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="block mx-auto group"
        >
          <div className="relative w-72 h-44 mx-auto bg-gradient-blueberry rounded-2xl shadow-glow flex items-center justify-center group-hover:scale-105 transition-smooth">
            <div className="absolute inset-0 rounded-2xl border-2 border-accent/40" />
            <div className="text-center">
              <div className="text-5xl mb-2">💌</div>
              <p className="font-[Pacifico] text-xl text-primary-foreground">Open your love letter</p>
            </div>
          </div>
        </button>
      ) : (
        <Card className="p-8 sm:p-10 bg-card/80 backdrop-blur border-blueberry/40 shadow-glow animate-fade-in-up">
          <h3 className="font-[Pacifico] text-3xl text-gradient-blueberry mb-4 text-center">
            To my Blueberry 💙
          </h3>
          <div className="space-y-4 text-foreground/95 leading-relaxed">
            <p>My Chotu,</p>
            <p>
              22 looks ridiculously good on you. I built this whole little world just so I could
              say the things that get stuck in my throat — that you're the best thing that
              accidentally became the most on-purpose thing in my life.
            </p>
            <p>
              You're short, sure, but you stand the tallest in every room of my heart. You make
              boring Tuesdays feel like Saturdays. You make scary things feel doable. You make me
              feel like the softest, safest version of myself.
            </p>
            <p>
              Today is yours. Eat too much cake. Be loud. Be silly. Be 22. And know that no
              matter how many candles we add to this cake, I'm picking you again and again.
            </p>
            <p className="font-[Pacifico] text-2xl text-accent text-right">
              Forever yours 💙
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
