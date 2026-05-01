import type { GameMode } from "../types";
import {
  GAME_TITLE,
  GAME_SUBTITLE,
  GAME_RULES,
} from "../config/gameConfig";
import { getRecords } from "../utils/records";
import ModeCard from "./ModeCard";
import RecordsTable from "./RecordsTable";

interface Props {
  onStart: (mode: GameMode) => void;
}

export default function StartScreen({ onStart }: Props) {
  const quickRecords = getRecords("quick");
  const fullRecords = getRecords("full");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto animate-fadeIn">

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-[-0.06em] mb-2">
          {GAME_TITLE}
        </h1>
        <p className="text-white/40 text-sm mb-10">
          {GAME_SUBTITLE}
        </p>

        {/* Rules */}
        <div className="border border-white/10 p-5 mb-8 text-left">
          <div className="text-white/30 text-xs uppercase tracking-widest mb-3">
            Rules
          </div>
          <ol className="space-y-1">
            {GAME_RULES.map((rule, i) => (
              <li key={i} className="text-white/60 text-sm">
                {i + 1}. {rule}
              </li>
            ))}
          </ol>
        </div>

        {/* Mode selection */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          <ModeCard mode="quick" onClick={onStart} />
          <ModeCard mode="full" onClick={onStart} />
        </div>

        {/* Records */}
        <div className="grid grid-cols-2 gap-6">
          <RecordsBlock title="Quick Mode" records={quickRecords} />
          <RecordsBlock title="Full Team" records={fullRecords} />
        </div>
      </div>
    </div>
  );
}

function RecordsBlock({
  title,
  records,
}: {
  title: string;
  records: ReturnType<typeof getRecords>;
}) {
  return (
    <div>
      <div className="text-white/30 text-xs uppercase tracking-widest mb-3">
        {title}
      </div>
      <RecordsTable records={records} />
    </div>
  );
}
