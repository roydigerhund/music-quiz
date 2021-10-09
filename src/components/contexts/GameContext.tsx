import { navigate } from '@reach/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Game, ID, Player } from '../../types/types-and-enums';
import { isNotSSR } from '../../utils/ssr';

type Context = {
  game?: Game;
  setupGame: () => void;
  startGame: (players: Player[]) => void;
  exitGame: () => void;
  addSucceededQuiz: (quizId: ID) => void;
};

const GameContext = createContext<Context>({
  game: undefined,
  setupGame: () => {},
  startGame: ([]) => {},
  exitGame: () => {},
  addSucceededQuiz: () => {},
});

export const GameProvider: React.FC = ({ children }) => {
  const [game, setGame] = useState<Game>();

  const getGame = async () => {
    if (isNotSSR) {
      try {
        const gameJSON = localStorage.getItem('game');
        const game = gameJSON ? ((await JSON.parse(gameJSON)) as Game) : undefined;
        // basic validation
        if (
          game &&
          'createdAt' in game &&
          'startedAt' in game &&
          Array.isArray(game.players) &&
          Array.isArray(game.succeededQuizzes)
        ) {
          setGame(game);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  const setupGame = () => {
    const currentUnix = Math.floor(Date.now() / 1000);
    const newGame: Game = { createdAt: currentUnix, startedAt: null, succeededQuizzes: [], players: [] };
    localStorage.setItem('game', JSON.stringify(newGame));
    setGame(newGame);
  };

  const startGame = (players: Player[]) => {
    if (!game || game.startedAt) return;
    const currentUnix = Math.floor(Date.now() / 1000);
    const newGame: Game = { ...game, startedAt: currentUnix, players };
    localStorage.setItem('game', JSON.stringify(newGame));
    setGame(newGame);
  };

  const addSucceededQuiz = (quizId: ID) => {
    if (!game || game.succeededQuizzes.includes(quizId)) return;
    const newGame: Game = { ...game, succeededQuizzes: [...game?.succeededQuizzes, quizId] };
    localStorage.setItem('game', JSON.stringify(newGame));
    setGame(newGame);
  };

  const exitGame = () => {
    if (isNotSSR) {
      localStorage.removeItem('game');
      setGame(undefined);
      navigate('/');
    }
  };

  return (
    <GameContext.Provider value={{ game, setupGame, startGame, exitGame, addSucceededQuiz }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);

  if (!ctx) {
    throw Error('The `useGame` hook must be called from a descendent of the `GameProvider`.');
  }

  return ctx;
};
