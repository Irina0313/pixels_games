import type { Card, GameMode, Person } from "../types";

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createDeck(mode: GameMode, allPeople: Person[]): Card[] {
  const gameId = Date.now();
  const count = mode === "quick" ? 8 : 16;
  const selected = shuffleArray(allPeople).slice(0, count);

  const cards: Card[] = [];
  for (const person of selected) {
    cards.push(
      {
        id: `${person.id}-a-${gameId}`,
        personId: person.id,
        name: person.name,
        image: person.image,
        suit: person.suit,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${person.id}-b-${gameId}`,
        personId: person.id,
        name: person.name,
        image: person.image,
        suit: person.suit,
        isFlipped: false,
        isMatched: false,
      }
    );
  }

  return shuffleArray(cards);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
