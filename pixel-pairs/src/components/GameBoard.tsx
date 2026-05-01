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
    <div className="board-bg flex-1 p-4 md:p-6 flex items-center justify-center">
      {/* Board bg image — swap with board-bg.svg later */}
      <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-2 md:gap-6">
        {cards.map((card) => (
          <div key={card.id} className="w-[calc((100%-5*8px)/6)] md:w-[calc((100%-5*12px)/6)]">
            <MemoryCard
              card={card}
              isShaking={shakingIds.includes(card.id)}
              onClick={() => onCardClick(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
