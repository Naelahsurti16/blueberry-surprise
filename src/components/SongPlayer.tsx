import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Music, Pause, Play } from "lucide-react";

const SONGS = [
  { name: "Paper Rings — Taylor Swift", url: "https://www.youtube.com/embed/I9fkh3KsZLk?autoplay=1" },
  { name: "Snowman — Sia", url: "https://www.youtube.com/embed/gE-bGUyzZBA?autoplay=1" },
];

export const SongPlayer = () => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <Card className="p-6 bg-card/70 backdrop-blur border-blueberry/40 shadow-soft max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-accent" />
        <h3 className="font-[Pacifico] text-2xl text-gradient-blueberry">Our songs 🎶</h3>
      </div>
      <div className="space-y-3">
        {SONGS.map((s, i) => (
          <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/40 border border-blueberry/30">
            <span className="text-sm sm:text-base">{s.name}</span>
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="flex items-center gap-2 bg-gradient-blueberry px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground hover:scale-105 transition-smooth"
            >
              {active === i ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {active === i ? "Stop" : "Play"}
            </button>
          </div>
        ))}
      </div>
      {active !== null && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-blueberry/40">
          <iframe
            src={SONGS[active].url}
            title={SONGS[active].name}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </Card>
  );
};
