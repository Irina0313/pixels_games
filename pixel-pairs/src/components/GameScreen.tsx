import { useEffect, useRef, useState } from "react";
import type { Card, GameMode } from "../types";
import { people } from "../data/people";
import { createDeck } from "../utils/game";
import { MISMATCH_DELAY_MS } from "../config/gameConfig";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";

interface Props {
  mode: GameMode;
  onGameEnd: (moves: number, timeSeconds: number) => void;
  onChangeMode: () => void;
}

export default function GameScreen({ mode, onGameEnd, onChangeMode }: Props) {
  const [cards, setCards] = useState<Card[]>(() => createDeck(mode, people));
  const [moves, setMoves] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isCheckingPair, setIsCheckingPair] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [shakingIds, setShakingIds] = useState<string[]>([]);

  const timeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      timeRef.current += 1;
      setTimeSeconds(timeRef.current);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  function handleCardClick(cardId: string) {
    if (isCheckingPair) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    if (!timerActive) setTimerActive(true);

    const flipped = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(flipped);

    const openCards = flipped.filter((c) => c.isFlipped && !c.isMatched);

    if (openCards.length !== 2) return;

    const newMoves = moves + 1;
    setMoves(newMoves);
    setIsCheckingPair(true);

    const [a, b] = openCards;

    if (a.personId === b.personId) {
      const matched = flipped.map((c) =>
        c.id === a.id || c.id === b.id ? { ...c, isMatched: true } : c
      );
      setCards(matched);
      setIsCheckingPair(false);

      if (matched.every((c) => c.isMatched)) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerActive(false);
        onGameEnd(newMoves, timeRef.current);
      }
    } else {
      setShakingIds([a.id, b.id]);
      setTimeout(() => {
        setShakingIds([]);
        setCards((prev) =>
          prev.map((c) =>
            c.id === a.id || c.id === b.id ? { ...c, isFlipped: false } : c
          )
        );
        setIsCheckingPair(false);
      }, MISMATCH_DELAY_MS);
    }
  }

  function handleRestart() {
    if (timerRef.current) clearInterval(timerRef.current);
    timeRef.current = 0;
    setCards(createDeck(mode, people));
    setMoves(0);
    setTimeSeconds(0);
    setIsCheckingPair(false);
    setTimerActive(false);
    setShakingIds([]);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader
        mode={mode}
        moves={moves}
        timeSeconds={timeSeconds}
        onRestart={handleRestart}
        onChangeMode={onChangeMode}
      />
      <GameBoard
        mode={mode}
        cards={cards}
        shakingIds={shakingIds}
        onCardClick={handleCardClick}
      />
    </div>
  );
}
