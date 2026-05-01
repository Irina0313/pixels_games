import { useState } from "react";
import type { Card } from "../types";

// ── Pixel heart ─────────────────────────────────────────────────────────────
// 11×11 grid, 12px tiles, 14px step → 152×152px viewBox
const HEART_MASK = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function PixelHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 152 152" className={className} aria-hidden="true">
      {HEART_MASK.flatMap((row, r) =>
        row.map((cell, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 14}
            y={r * 14}
            width={12}
            height={12}
            fill={cell ? "#fc3202" : "rgba(255,255,255,0.08)"}
          />
        ))
      )}
    </svg>
  );
}

// ── Card back diamond pattern ────────────────────────────────────────────────
// 7×7 diamond mask, 12px tiles, 14px step → 98×98px repeating tile
const DIAMOND_MASK = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const _backRects = DIAMOND_MASK.flatMap((row, r) =>
  row.flatMap((cell, c) =>
    cell
      ? [`<rect x="${c * 14}" y="${r * 14}" width="12" height="12" fill="white"/>`]
      : []
  )
).join("");

const _backSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='98' height='98'>${_backRects}</svg>`;
const BACK_URI = `url("data:image/svg+xml,${encodeURIComponent(_backSvg)}")`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function getPersonNum(personId: string): string {
  return String(parseInt(personId.replace("person-", ""), 10));
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CardFaceBack() {
  return (
    <div
      className="card-face card-face-back w-full h-full border-2 border-white bg-[#0f0f0f]"
      style={{
        backgroundImage: BACK_URI,
        // tile is 98/506 ≈ 19.4% of card width, 98/702 ≈ 14% of card height
        backgroundSize: "19.37% 13.96%",
        backgroundPosition: "0.4% 0.28%",
      }}
    />
  );
}

function CardFaceFront({ card }: { card: Card }) {
  const [imgFailed, setImgFailed] = useState(false);
  const rank = getPersonNum(card.personId);

  return (
    <div className="card-face card-face-front w-full h-full border-2 border-white bg-[#0f0f0f] overflow-hidden relative">
      {/* Pixel heart — top-left, 30% of card width */}
      <PixelHeart className="absolute left-[3.2%] top-[2.3%] w-[30%] h-auto" />

      {/* Rank number — left column, below heart */}
      <span
        className="absolute left-[5%] font-pixel text-[#fc3202] leading-none select-none"
        style={{ top: "28%", fontSize: "clamp(0.8rem, 3vw, 2.8rem)" }}
      >
        {rank}
      </span>

      {/* Portrait photo — right ~60% of card */}
      <div
        className="absolute overflow-hidden"
        style={{ left: "36.4%", top: "26.2%", width: "60.5%", height: "71.5%" }}
      >
        {!imgFailed ? (
          <img
            src={card.image}
            alt=""
            className="w-full h-full object-cover object-top"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#222] flex items-center justify-center">
            <span className="text-white/20 font-mono text-xs">{rank}</span>
          </div>
        )}
      </div>

      {/* Name label — bottom-left */}
      <div
        className="absolute left-[3.2%] font-pixel text-white leading-tight select-none"
        style={{ bottom: "3.8%", fontSize: "clamp(7px, 0.6vw, 11px)" }}
      >
        <div>Player</div>
        <div>{rank.padStart(2, "0")}</div>
      </div>
    </div>
  );
}

// ── MemoryCard ───────────────────────────────────────────────────────────────

interface Props {
  card: Card;
  isShaking: boolean;
  onClick: () => void;
}

export default function MemoryCard({ card, isShaking, onClick }: Props) {
  const isFlippedOrMatched = card.isFlipped || card.isMatched;

  return (
    <button
      className={[
        "card-container w-full aspect-card block p-0 border-0 bg-transparent",
        isShaking ? "animate-shake" : "",
        card.isMatched ? "card-matched opacity-60" : "opacity-100",
        !isFlippedOrMatched ? "hover:scale-[1.02] transition-transform duration-150" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={isFlippedOrMatched}
      aria-label={
        card.isMatched
          ? "Matched pair"
          : card.isFlipped
          ? "Open card"
          : "Hidden card, click to reveal"
      }
      aria-pressed={card.isFlipped}
    >
      <div className={`card-inner ${isFlippedOrMatched ? "card-flipped" : ""}`}>
        <CardFaceBack />
        <CardFaceFront card={card} />
      </div>
    </button>
  );
}
