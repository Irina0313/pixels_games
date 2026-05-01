import type { Card, GameMode } from "../types";
import MemoryCard from "./MemoryCard";

interface Props {
  mode: GameMode;
  cards: Card[];
  shakingIds: string[];
  onCardClick: (cardId: string) => void;
}

export default function GameBoard({ mode: _, cards, shakingIds, onCardClick }: Props) {
  return (
    <div className="board-bg flex-1 p-4 md:p-6">
      {/* Board bg image — swap with board-bg.svg later */}
      <div
        className="max-w-5xl mx-auto grid gap-2 md:gap-3"
        style={{
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        }}
      >
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            isShaking={shakingIds.includes(card.id)}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
