// v2
import { useState } from "react";
import type { AppState, GameMode, GameResult } from "./types";
import { saveRecord } from "./utils/records";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

export default function App() {
  const [appState, setAppState] = useState<AppState>("start");
  const [selectedMode, setSelectedMode] = useState<GameMode>("quick");
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [gameKey, setGameKey] = useState(0);

  function handleStartGame(mode: GameMode) {
    setSelectedMode(mode);
    setGameResult(null);
    setGameKey((k) => k + 1);
    setAppState("game");
  }

  function handleGameEnd(moves: number, timeSeconds: number) {
    const rank = saveRecord(selectedMode, moves, timeSeconds);
    setGameResult({ mode: selectedMode, moves, timeSeconds, rank });
    setAppState("result");
  }

  function handlePlayAgain() {
    setGameResult(null);
    setGameKey((k) => k + 1);
    setAppState("game");
  }

  function handleChangeMode() {
    setAppState("start");
  }

  return (
    <>
      {appState === "start" && <StartScreen onStart={handleStartGame} />}

      {appState === "game" && (
        <GameScreen
          key={gameKey}
          mode={selectedMode}
          onGameEnd={handleGameEnd}
          onChangeMode={handleChangeMode}
        />
      )}

      {appState === "result" && gameResult && (
        <ResultScreen
          result={gameResult}
          onPlayAgain={handlePlayAgain}
          onChangeMode={handleChangeMode}
        />
      )}
    </>
  );
}
