import { useState } from "react";
import type { Card, Suit } from "../types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getPersonNum(personId: string): string {
  return String(parseInt(personId.replace("person-", ""), 10));
}

function suitSrc(suit: Suit): string {
  return `/assets/team/${suit}.svg`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CardFaceBack() {
  return (
    <div className="card-face card-face-back w-full h-full">
      <img src="/assets/team/Variant=back.svg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
    </div>
  );
}

function CardFaceFront({ card }: { card: Card }) {
  const [imgFailed, setImgFailed] = useState(false);
  const rank = getPersonNum(card.personId);

  return (
    <div className="card-face card-face-front w-full h-full bg-[#0f0f0f] overflow-hidden relative">
      {/* Suit icon — top-left */}
      <img
        src={suitSrc(card.suit)}
        alt={card.suit}
        className="absolute left-[3.2%] top-[2.3%] w-[28%] h-auto"
        aria-hidden="true"
      />

      {/* Rank number — left column, below suit */}
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
        {card.name === "?" ? (
          <>
            <div>Player</div>
            <div>{rank.padStart(2, "0")}</div>
          </>
        ) : (
          <div>{card.name}</div>
        )}
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
