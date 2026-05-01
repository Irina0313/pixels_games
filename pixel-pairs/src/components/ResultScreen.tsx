import type { GameMode, GameResult } from "../types";
import { MODES, MAX_RECORDS } from "../config/gameConfig";
import { getRecords } from "../utils/records";
import { formatTime } from "../utils/game";
import RecordsTable from "./RecordsTable";

interface Props {
  result: GameResult;
  onPlayAgain: () => void;
  onChangeMode: () => void;
}

function getRankText(rank: number): string {
  if (rank === 1) return "New record! #1";
  if (rank <= MAX_RECORDS) return `You placed #${rank}`;
  return `Not in top ${MAX_RECORDS} — try again`;
}

export default function ResultScreen({
  result,
  onPlayAgain,
  onChangeMode,
}: Props) {
  const records = getRecords(result.mode);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg mx-auto animate-fadeIn">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-2">
          All pairs found!
        </h1>

        {/* Mode label */}
        <p className="text-white/30 text-xs uppercase tracking-widest mb-8">
          {MODES[result.mode as GameMode].label}
        </p>

        {/* Stats */}
        <div className="border border-white/10 p-6 mb-4 grid grid-cols-2 gap-4">
          <Stat label="Moves" value={String(result.moves)} />
          <Stat label="Time" value={formatTime(result.timeSeconds)} />
        </div>

        {/* Rank */}
        <div className="border border-white/20 p-4 mb-8 text-center">
          <span className="font-semibold text-white text-lg tracking-[-0.04em]">
            {getRankText(result.rank)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={onPlayAgain}
            className="flex-1 border border-white py-3 text-sm text-white hover:bg-white hover:text-black transition-all duration-150"
          >
            Play Again
          </button>
          <button
            onClick={onChangeMode}
            className="flex-1 border border-white/30 py-3 text-sm text-white/60 hover:border-white hover:text-white transition-all duration-150"
          >
            Change Mode
          </button>
        </div>

        {/* Records for current mode */}
        <div>
          <div className="text-white/30 text-xs uppercase tracking-widest mb-3">
            Top Records — {MODES[result.mode as GameMode].label}
          </div>
          <RecordsTable records={records} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-white/30 text-xs uppercase tracking-widest mb-1">
        {label}
      </div>
      <div className="text-white text-3xl font-semibold tracking-[-0.04em]">{value}</div>
    </div>
  );
}
