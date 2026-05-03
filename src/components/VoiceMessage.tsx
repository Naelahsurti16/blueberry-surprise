import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Mic, Square, Play, Pause, Trash2 } from "lucide-react";

export const VoiceMessage = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      mediaRef.current = rec;
      setRecording(true);
    } catch {
      alert("Mic permission needed to record 💙");
    }
  };

  const stop = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
  };

  const reset = () => {
    setAudioUrl(null);
    setPlaying(false);
  };

  return (
    <Card className="p-6 sm:p-8 bg-card/70 backdrop-blur border-blueberry/40 shadow-soft max-w-xl mx-auto">
      <h3 className="font-[Pacifico] text-2xl text-gradient-blueberry mb-2">A voice note for you 🎙️</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Press record and leave a sweet message — only for my Blueberry's ears.
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        {!recording && !audioUrl && (
          <button
            onClick={start}
            className="flex items-center gap-2 bg-gradient-blueberry px-5 py-3 rounded-full font-semibold text-primary-foreground shadow-glow hover:scale-105 transition-smooth"
          >
            <Mic className="w-4 h-4" /> Record
          </button>
        )}
        {recording && (
          <button
            onClick={stop}
            className="flex items-center gap-2 bg-destructive px-5 py-3 rounded-full font-semibold text-destructive-foreground animate-pulse"
          >
            <Square className="w-4 h-4" /> Stop
          </button>
        )}
        {audioUrl && (
          <>
            <button
              onClick={toggle}
              className="flex items-center gap-2 bg-gradient-blueberry px-5 py-3 rounded-full font-semibold text-primary-foreground shadow-glow"
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-muted px-4 py-3 rounded-full text-sm text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-4 h-4" /> Re-record
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="hidden"
            />
          </>
        )}
      </div>
      {recording && (
        <p className="text-accent text-sm mt-4 animate-pulse">● Recording your sweet voice...</p>
      )}
    </Card>
  );
};
