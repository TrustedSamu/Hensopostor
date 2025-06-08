import React, { useState } from 'react';
import { words } from '../data/words';
import HostedBy from './HostedBy';
import './Game.css';

interface GameState {
  currentPlayer: number;
  totalPlayers: number;
  impostors: number[];
  currentWord: string;
  currentHint: string;
  isFreakMode: boolean;
  gameStarted: boolean;
}

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 1,
    totalPlayers: 0,
    impostors: [],
    currentWord: '',
    currentHint: '',
    isFreakMode: false,
    gameStarted: false
  });

  const startGame = (playerCount: number, freakMode: boolean) => {
    if (playerCount < 3) {
      alert('Mindestens 3 Spieler erforderlich!');
      return;
    }

    // Wähle zufälliges Wort und Kategorie
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = words[randomCategory].words;
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    const hint = words[randomCategory].hint;

    // Bestimme Anzahl der Imposter
    const impostorCount = freakMode ? Math.floor(Math.random() * 2) + 1 : 1;
    const impostors: number[] = [];
    for (let i = 0; i < impostorCount; i++) {
      let impostor: number;
      do {
        impostor = Math.floor(Math.random() * playerCount) + 1;
      } while (impostors.includes(impostor));
      impostors.push(impostor);
    }

    setGameState({
      currentPlayer: 1,
      totalPlayers: playerCount,
      impostors,
      currentWord: randomWord,
      currentHint: hint,
      isFreakMode: freakMode,
      gameStarted: true
    });
  };

  const nextPlayer = () => {
    if (gameState.currentPlayer < gameState.totalPlayers) {
      setGameState(prev => ({
        ...prev,
        currentPlayer: prev.currentPlayer + 1
      }));
    } else {
      // Spiel zurücksetzen
      setGameState(prev => ({
        ...prev,
        gameStarted: false
      }));
    }
  };

  if (!gameState.gameStarted) {
    return (
      <div className="game-container">
        <div className="logo-container">
          <img src="/42cf0d5c-291e-4e0e-940a-c572ccf80471.png" alt="HensoPostor Logo" className="game-logo" />
        </div>
        <div className="setup-container">
          <div className="input-group">
            <label htmlFor="playerCount">Anzahl der Spieler:</label>
            <input
              type="number"
              id="playerCount"
              min="3"
              max="10"
              defaultValue="3"
            />
          </div>
          <div className="input-group checkbox-group">
            <input
              type="checkbox"
              id="freakMode"
            />
            <label htmlFor="freakMode">Freak Mode</label>
          </div>
          <button
            onClick={() => {
              const playerCount = parseInt((document.getElementById('playerCount') as HTMLInputElement).value);
              const freakMode = (document.getElementById('freakMode') as HTMLInputElement).checked;
              startGame(playerCount, freakMode);
            }}
          >
            Spiel starten
          </button>
        </div>
        <HostedBy />
      </div>
    );
  }

  const isImpostor = gameState.impostors.includes(gameState.currentPlayer);

  return (
    <div className="game-container">
      <div className="logo-container">
        <img src="/42cf0d5c-291e-4e0e-940a-c572ccf80471.png" alt="HensoPostor Logo" className="game-logo" />
      </div>
      <div className="game-info">
        <h2>Spieler {gameState.currentPlayer} von {gameState.totalPlayers}</h2>
        <div className="role-display">
          <h3>Deine Rolle:</h3>
          <p className={isImpostor ? 'impostor' : 'player'}>
            {isImpostor ? 'Impostor' : 'Spieler'}
          </p>
        </div>
        {!isImpostor && (
          <div className="word-display">
            <h3>Dein Wort:</h3>
            <p>{gameState.currentWord}</p>
          </div>
        )}
        {isImpostor && gameState.isFreakMode && (
          <div className="hint-display">
            <h3>Hinweis:</h3>
            <p>{gameState.currentHint}</p>
          </div>
        )}
      </div>
      <button onClick={nextPlayer}>
        {gameState.currentPlayer < gameState.totalPlayers ? 'Nächster Spieler' : 'Spiel beenden'}
      </button>
      <HostedBy />
    </div>
  );
};

export default Game; 