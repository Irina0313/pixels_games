import type { GameMode } from "../types";
import { GAME_TITLE, MODES } from "../config/gameConfig";
import { formatTime } from "../utils/game";

interface Props {
  mode: GameMode;
  moves: number;
  timeSeconds: number;
  onRestart: () => void;
  onChangeMode: () => void;
}

export default function GameHeader({
  mode,
  moves,
  timeSeconds,
  onRestart,
  onChangeMode,
}: Props) {
  return (
    <header className="border-b border-white/10 px-4 py-3 flex items-center gap-6 flex-wrap text-sm font-mono">
      <span className="text-white font-mono tracking-widest uppercase text-xs mr-auto">
        {GAME_TITLE}
        <span className="ml-3 text-white/30">{MODES[mode].label}</span>
      </span>

      <div className="flex items-center gap-6">
        <Stat label="Moves" value={String(moves)} />
        <Stat label="Time" value={formatTime(timeSeconds)} />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRestart}
          className="border border-white/20 hover:border-white px-3 py-1 text-xs text-white/60 hover:text-white transition-all duration-150"
          aria-label="Restart game"
        >
          Restart
        </button>
        <button
          onClick={onChangeMode}
          className="border border-white/20 hover:border-white px-3 py-1 text-xs text-white/60 hover:text-white transition-all duration-150"
          aria-label="Change game mode"
        >
          Change Mode
        </button>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-white/30 text-[10px] uppercase tracking-widest">{label}</div>
      <div className="text-white text-lg leading-none mt-0.5">{value}</div>
    </div>
  );
}
