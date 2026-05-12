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
            <p>my babbu ❤️</p>
            <p>
              happy birthday lovee, I wish you have the happiest day ever and that you keep
              growing, smiling, and becoming the amazing person you are. I might not say this
              every day, but you're honestly the best thing that accidentally became the most
              beautiful part of my life.
            </p>
            <p>
              you make my boring days feel lighter and happier just by existing. even the
              smallest moments with you feel special to me. you always try your best in
              everything you do, and I hope you know how proud I am of you for that.
            </p>
            <p>
              i know I can be rude, annoying, or dramatic sometimes, but I love you a lot… like
              a lot a lot 😭 (a lil more than ayesha fr, don't tell her).
            </p>
            <p>
              thank you for being patient with me, for listening to me, for making me laugh when
              I'm upset, and for being my comfort person without even trying.
            </p>
            <p>
              today is YOUR day babbu, so eat a lot, smile a lot, be loud, be silly, annoy
              everyone, and enjoy every second because you deserve all the happiness in the
              world.
            </p>
            <p>
              and no matter what happens, I'll always love you the most when you're simply
              being yourself 🤍
            </p>
            <p className="font-[Pacifico] text-2xl text-accent text-right">
              happy birthday once again my loveee 🫶
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
