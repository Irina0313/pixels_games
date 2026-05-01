import { useState } from "react";
import type { Card } from "../types";

interface Props {
  card: Card;
  isShaking: boolean;
  onClick: () => void;
}

const PLACEHOLDER_COLORS = [
  "#1a1a2e", "#16213e", "#0f3460", "#1b1b2f",
  "#1e1e2e", "#212121", "#1a2634", "#2d1b33",
  "#1c2b1c", "#2b1c1c", "#1c1c2b", "#2b2b1c",
  "#1a2020", "#201a20", "#1a2028", "#281a20",
  "#202820", "#202020",
];

function getPlaceholderColor(personId: string): string {
  const n = parseInt(personId.replace("person-", ""), 10) - 1;
  return PLACEHOLDER_COLORS[n % PLACEHOLDER_COLORS.length];
}

function getLabel(personId: string): string {
  const n = personId.replace("person-", "");
  return `P${n}`;
}

interface CardFaceBackProps {
  personId: string;
}

function CardFaceBack({ personId: _ }: CardFaceBackProps) {
  return (
    <div className="card-face card-face-back w-full h-full border-2 border-white bg-[#111111] flex items-center justify-center overflow-hidden">
      {/* Placeholder back — swap with card-back.svg later */}
      <img
        src="/assets/card-back.svg"
        alt=""
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          (e.currentTarget.nextElementSibling as HTMLElement | null)!.style.display = "flex";
        }}
      />
      <div
        className="hidden w-full h-full items-center justify-center"
        style={{ display: "none" }}
      >
        <div className="text-white/20 text-4xl select-none">✦</div>
      </div>
    </div>
  );
}

interface CardFaceFrontProps {
  card: Card;
}

function CardFaceFront({ card }: CardFaceFrontProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const placeholderColor = getPlaceholderColor(card.personId);
  const label = getLabel(card.personId);

  return (
    <div className="card-face card-face-front w-full h-full border-2 border-white bg-[#0f0f0f] overflow-hidden">
      {/* Placeholder front frame — swap with card-front.svg later */}
      <div className="relative w-full h-full">
        {!imgFailed ? (
          <img
            src={card.image}
            alt={card.personId}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: placeholderColor }}
          >
            <span className="text-white/70 font-mono text-2xl select-none">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
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
      <div
        className={`card-inner ${isFlippedOrMatched ? "card-flipped" : ""}`}
      >
        <CardFaceBack personId={card.personId} />
        <CardFaceFront card={card} />
      </div>
    </button>
  );
}
