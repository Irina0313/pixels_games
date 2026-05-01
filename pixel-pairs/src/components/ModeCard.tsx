import type { GameMode } from "../types";
import { MODES } from "../config/gameConfig";

interface Props {
  mode: GameMode;
  onClick: (mode: GameMode) => void;
}

export default function ModeCard({ mode, onClick }: Props) {
  const { label, description } = MODES[mode];

  return (
    <button
      onClick={() => onClick(mode)}
      className="group border border-white/20 hover:border-white bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200 p-6 text-left w-full"
      aria-label={`Play ${label}: ${description}`}
    >
      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">
        {label}
      </div>
      <div className="text-2xl font-semibold text-white group-hover:text-white transition-colors whitespace-pre-line tracking-[-0.04em]">
        {description}
      </div>
      <div className="mt-4 text-xs text-white/30 group-hover:text-white/50 transition-colors">
        Play →
      </div>
    </button>
  );
}
