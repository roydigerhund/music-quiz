import { navigate } from '@reach/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ID } from '../../types/types';
import { isNotSSR } from '../../utils/ssr';

type Game = {
  startedAt: number;
  succeededQuizzes: ID[];
};

type Context = { game?: Game; startGame: () => void; exitGame: () => void; addSucceededQuiz: (quizId: ID) => void };

const GameContext = createContext<Context>({
  game: undefined,
  startGame: () => {},
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
        if (game?.startedAt && Array.isArray(game.succeededQuizzes)) {
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

  const startGame = () => {
    const currentUnix = Math.floor(Date.now() / 1000);
    const newGame: Game = { startedAt: currentUnix, succeededQuizzes: [] };
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
    <GameContext.Provider value={{ game, startGame, exitGame, addSucceededQuiz }}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);

  if (!ctx) {
    throw Error('The `useGame` hook must be called from a descendent of the `GameProvider`.');
  }

  return ctx;
};
