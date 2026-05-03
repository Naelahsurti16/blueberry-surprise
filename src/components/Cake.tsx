import { useEffect, useRef, useState } from "react";

interface Props {
  onBlown: () => void;
}

const NUM_CANDLES = 5;

export const Cake = ({ onBlown }: Props) => {
  const [listening, setListening] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [blown, setBlown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const cleanup = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    ctxRef.current?.close();
    streamRef.current = null;
    rafRef.current = null;
    ctxRef.current = null;
  };

  useEffect(() => () => cleanup(), []);

  const blowOut = () => {
    if (blown) return;
    setBlown(true);
    cleanup();
    setTimeout(onBlown, 1200);
  };

  const startListening = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      setListening(true);
      setCountdown(3);
      let started = Date.now();
      let timer = 3;

      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);

        if (rms > 0.18) {
          blowOut();
          return;
        }

        const elapsed = (Date.now() - started) / 1000;
        const remaining = Math.max(0, Math.ceil(3 - elapsed));
        if (remaining !== timer) {
          timer = remaining;
          setCountdown(remaining);
        }
        if (elapsed >= 3) {
          blowOut();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      setError("Mic blocked — tap the cake to blow the candles instead!");
      setListening(true);
      let timer = 3;
      setCountdown(3);
      const id = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer <= 0) {
          clearInterval(id);
          blowOut();
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative cursor-pointer select-none animate-float-soft pt-16"
        onClick={() => listening && blowOut()}
      >
        {/* Glow halo behind cake */}
        <div className="absolute inset-0 -z-10 glow-orb opacity-60 blur-2xl" />

        {/* Candles row — sit ON the top tier */}
        <div className="flex gap-4 sm:gap-5 justify-center mb-[-6px] relative z-20">
          {Array.from({ length: NUM_CANDLES }).map((_, i) => (
            <div key={i} className="relative w-2.5 h-14 sm:w-3 sm:h-16">
              {!blown && <div className="flame" style={{ animationDelay: `${i * 0.12}s` }} />}
              {blown && <div className="flame out" />}
              {/* candle body — striped */}
              <div
                className="absolute inset-0 rounded-[3px] shadow-md"
                style={{
                  background:
                    "repeating-linear-gradient(180deg, hsl(var(--accent)) 0 6px, hsl(var(--blueberry-light)) 6px 12px)",
                }}
              />
              {/* wick */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-foreground/70" />
              {/* wax drip */}
              <div className="absolute top-2 left-0 w-1 h-3 rounded-full bg-accent/70" />
            </div>
          ))}
        </div>

        {/* Cake tiers — stacked widest at bottom */}
        <div className="relative flex flex-col items-center">
          {/* Top tier */}
          <div className="relative w-44 sm:w-52 z-10">
            <div className="h-14 bg-gradient-cake rounded-t-[40%] rounded-b-md border-2 border-blueberry-light/50 shadow-soft relative overflow-hidden">
              {/* frosting drip */}
              <svg viewBox="0 0 200 30" preserveAspectRatio="none" className="absolute -bottom-[1px] left-0 w-full h-5">
                <path d="M0 0 Q10 25 20 5 Q30 28 40 6 Q50 26 60 4 Q70 27 80 6 Q90 25 100 4 Q110 28 120 6 Q130 25 140 5 Q150 28 160 6 Q170 25 180 4 Q190 27 200 5 L200 30 L0 30 Z" fill="hsl(var(--blueberry-light))" />
              </svg>
            </div>
          </div>

          {/* Middle tier */}
          <div className="relative w-64 sm:w-72 -mt-2 z-[5]">
            <div className="h-16 bg-gradient-cake rounded-md border-2 border-blueberry-light/50 shadow-soft relative overflow-hidden">
              <div className="absolute inset-x-0 top-2 flex justify-around px-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-base">💙</span>
                ))}
              </div>
              <svg viewBox="0 0 200 30" preserveAspectRatio="none" className="absolute -bottom-[1px] left-0 w-full h-6">
                <path d="M0 0 Q10 28 20 4 Q30 26 40 5 Q50 28 60 6 Q70 25 80 4 Q90 28 100 5 Q110 26 120 6 Q130 28 140 4 Q150 25 160 5 Q170 28 180 6 Q190 25 200 4 L200 30 L0 30 Z" fill="hsl(var(--blueberry))" />
              </svg>
            </div>
          </div>

          {/* Bottom tier */}
          <div className="relative w-80 sm:w-96 -mt-2">
            <div className="h-20 bg-gradient-blueberry rounded-md border-2 border-blueberry-light/50 shadow-soft flex items-center justify-center">
              <span className="font-[Pacifico] text-xl sm:text-2xl text-primary-foreground drop-shadow">
                Happy 22, Blueberry
              </span>
            </div>
            {/* plate */}
            <div className="mx-auto -mt-1 w-[22rem] sm:w-[26rem] h-3 rounded-full bg-foreground/10 blur-[1px]" />
            <div className="mx-auto -mt-2 w-[20rem] sm:w-[24rem] h-2 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>

      {!listening && !blown && (
        <button
          onClick={startListening}
          className="bg-gradient-blueberry px-6 py-3 rounded-full font-semibold text-primary-foreground shadow-glow animate-pulse-glow hover:scale-105 transition-smooth"
        >
          🎂 Blow the candles (mic on)
        </button>
      )}

      {listening && !blown && countdown !== null && (
        <div className="text-center">
          <p className="text-accent text-lg mb-1">Take a deep breath... and blow!</p>
          <p className="text-5xl font-bold text-gradient-blueberry tabular-nums">{countdown}</p>
          {error && <p className="text-xs text-muted-foreground mt-2">{error}</p>}
        </div>
      )}

      {blown && (
        <p className="text-2xl text-accent animate-fade-in-up">✨ Make a wish, my love ✨</p>
      )}
    </div>
  );
};
