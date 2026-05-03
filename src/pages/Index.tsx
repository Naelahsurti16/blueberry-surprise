import { useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Riddles } from "@/components/Riddles";
import { Cake } from "@/components/Cake";
import { LoveLetter } from "@/components/LoveLetter";
import { VoiceMessage } from "@/components/VoiceMessage";
import { Reasons } from "@/components/Reasons";
import { SongPlayer } from "@/components/SongPlayer";
import { Balloons, Confetti, Sparkles } from "@/components/FloatingDecor";
import { Lock, Heart } from "lucide-react";

const Index = () => {
  const { isUnlocked, days } = useCountdown();
  const [candlesBlown, setCandlesBlown] = useState(false);
  // Dev preview: allow ?preview=1 to skip the lock
  const forceUnlock = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("preview") === "1";
  const unlocked = isUnlocked || forceUnlock;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Balloons />
      <Confetti active={candlesBlown} />

      {!unlocked ? (
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <Sparkles />
          <div className="text-center max-w-2xl mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blueberry/20 border border-blueberry/40 text-xs uppercase tracking-widest text-blueberry-light mb-6">
              <Lock className="w-3 h-3" /> Locked until May 13
            </div>
            <h1 className="mx-auto mb-5 flex w-full max-w-[56rem] flex-wrap items-center justify-center gap-x-5 gap-y-1 overflow-visible px-6 pb-6 pt-2 text-center font-[Pacifico] text-4xl leading-[1.65] sm:text-6xl md:text-7xl">
              <span className="inline-block overflow-visible px-2 pb-5 pt-2 text-gradient-blueberry">
                Hey Blueberry
              </span>
              <Heart className="h-14 w-14 shrink-0 fill-current text-blueberry-light sm:h-20 sm:w-20 md:h-24 md:w-24" strokeWidth={0} />
            </h1>
            <p className="text-lg text-muted-foreground">
              Something sweet is waiting for you. Just <span className="text-accent font-semibold">{days + 1} sleeps</span> to go,
              my baby try to be patient (I know you can't 😏).
            </p>
          </div>

          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CountdownTimer />
          </div>

          <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="mx-auto mb-6 max-w-2xl px-4 pb-4 pt-1 text-center font-[Pacifico] text-2xl leading-[1.6] text-gradient-blueberry sm:text-3xl">
              While you wait... solve these 💙
            </h2>
            <Riddles />
          </div>

          <p className="mt-12 text-sm text-muted-foreground text-center max-w-md">
            ✨ Hint: Come back on <span className="text-accent">May 13th</span> for your real surprise.
            No peeking, Babbu.
          </p>
        </section>
      ) : (
        <section className="relative z-10 px-4 py-16 space-y-20">
          {/* Hero + Cake */}
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-xs uppercase tracking-widest text-accent mb-6">
              <Heart className="w-3 h-3" /> It's finally May 13
            </div>
            <h1 className="font-[Pacifico] text-5xl sm:text-7xl text-gradient-blueberry mb-4">
              Happy Birthday, Blueberry!
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              22 today 🎉 Make a wish — but first, blow these candles out.
            </p>
            <Cake onBlown={() => setCandlesBlown(true)} />
          </div>

          {candlesBlown && (
            <>
              <div className="animate-fade-in-up">
                <LoveLetter />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="mb-6 px-4 pb-3 text-center font-[Pacifico] text-3xl leading-[1.5] text-gradient-blueberry">
                  22 reasons (well, 7) why I love you
                </h2>
                <Reasons />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <VoiceMessage />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <SongPlayer />
              </div>

              <p className="text-center text-muted-foreground pt-10 pb-4">
                Made with 💙 for my baby, forever.
              </p>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default Index;
