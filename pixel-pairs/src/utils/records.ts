import type { GameMode, RecordItem } from "../types";
import { STORAGE_KEYS, MAX_RECORDS } from "../config/gameConfig";

export function getRecords(mode: GameMode): RecordItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[mode]);
    if (!raw) return [];
    return JSON.parse(raw) as RecordItem[];
  } catch {
    return [];
  }
}

function sortRecords(records: RecordItem[]): RecordItem[] {
  return [...records].sort((a, b) =>
    a.moves !== b.moves ? a.moves - b.moves : a.timeSeconds - b.timeSeconds
  );
}

export function saveRecord(
  mode: GameMode,
  moves: number,
  timeSeconds: number
): number {
  const existing = getRecords(mode);
  const newRecord: RecordItem = {
    mode,
    moves,
    timeSeconds,
    date: new Date().toISOString().slice(0, 10),
  };

  const all = sortRecords([...existing, newRecord]);

  // Rank is 1-based, calculated before trimming
  const rank = all.indexOf(newRecord) + 1;

  localStorage.setItem(
    STORAGE_KEYS[mode],
    JSON.stringify(all.slice(0, MAX_RECORDS))
  );

  return rank;
}
