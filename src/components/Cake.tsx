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
        className="relative cursor-pointer select-none animate-float-soft"
        onClick={() => listening && blowOut()}
      >
        {/* Candles */}
        <div className="flex gap-3 sm:gap-4 justify-center mb-2 relative z-10">
          {Array.from({ length: NUM_CANDLES }).map((_, i) => (
            <div key={i} className="relative w-3 h-12 sm:w-4 sm:h-16">
              {!blown && <div className="flame" style={{ animationDelay: `${i * 0.1}s` }} />}
              {blown && <div className="flame out" />}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-accent via-blueberry-light to-blueberry" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-foreground/60" />
            </div>
          ))}
        </div>

        {/* Cake tiers */}
        <div className="relative">
          <div className="w-64 sm:w-80 h-12 bg-gradient-cake rounded-t-3xl border-2 border-blueberry-light/40 shadow-soft" />
          <div className="w-72 sm:w-96 -mt-1 h-16 bg-gradient-cake rounded-2xl border-2 border-blueberry-light/40 shadow-soft mx-auto flex items-center justify-around px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-lg">💙</span>
            ))}
          </div>
          <div className="w-80 sm:w-[28rem] -mt-1 h-20 bg-gradient-blueberry rounded-2xl border-2 border-blueberry-light/40 shadow-soft mx-auto flex items-center justify-center">
            <span className="font-[Pacifico] text-2xl text-primary-foreground">Happy 22, Blueberry</span>
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
