import type { RecordItem } from "../types";
import { formatTime } from "../utils/game";

interface Props {
  records: RecordItem[];
}

export default function RecordsTable({ records }: Props) {
  if (records.length === 0) {
    return (
      <p className="text-white/40 text-sm font-mono py-2">No records yet.</p>
    );
  }

  return (
    <table className="w-full text-sm font-mono border-collapse">
      <thead>
        <tr className="text-white/40 text-left">
          <th className="pb-2 pr-4 font-normal">#</th>
          <th className="pb-2 pr-4 font-normal">Moves</th>
          <th className="pb-2 pr-4 font-normal">Time</th>
          <th className="pb-2 font-normal">Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, i) => (
          <tr
            key={i}
            className={i === 0 ? "text-white" : "text-white/60"}
          >
            <td className="py-1 pr-4">{i + 1}</td>
            <td className="py-1 pr-4">{r.moves}</td>
            <td className="py-1 pr-4">{formatTime(r.timeSeconds)}</td>
            <td className="py-1">{r.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
