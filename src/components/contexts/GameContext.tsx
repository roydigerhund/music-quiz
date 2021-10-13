import { navigate } from '@reach/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Game, ID, Player, QuizType } from '../../types/types-and-enums';
import { isNotSSR } from '../../utils/ssr';

type Context = {
  game?: Game;
  setupGame: () => void;
  startGame: (players: Player[]) => void;
  finishGame: () => void;
  deleteGame: () => void;
  addSucceededQuiz: (quiz: QuizType, player: Player) => void;
};

const GameContext = createContext<Context>({
  game: undefined,
  setupGame: () => {},
  startGame: ([]) => {},
  finishGame: () => {},
  deleteGame: () => {},
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
          'finishedAt' in game &&
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
    const newGame: Game = {
      createdAt: currentUnix,
      startedAt: null,
      finishedAt: null,
      succeededQuizzes: [],
      players: [],
    };
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

  const addSucceededQuiz = (quiz: QuizType, player: Player) => {
    if (!game || game.succeededQuizzes.some((q) => q.id === quiz.id)) return;
    const newGame: Game = {
      ...game,
      succeededQuizzes: [...game.succeededQuizzes, { id: quiz.id, variant: quiz.variant }],
      players: game.players.map((p) =>
        p.id === player.id
          ? { ...p, succeededQuizzes: [...p.succeededQuizzes, { id: quiz.id, variant: quiz.variant }] }
          : p,
      ),
    };
    localStorage.setItem('game', JSON.stringify(newGame));
    setGame(newGame);
  };

  const finishGame = () => {
    if (!game || game.finishedAt) return;
    const currentUnix = Math.floor(Date.now() / 1000);
    const newGame: Game = { ...game, finishedAt: currentUnix };
    localStorage.setItem('game', JSON.stringify(newGame));
    setGame(newGame);
  };

  const deleteGame = () => {
    if (isNotSSR) {
      localStorage.removeItem('game');
      setGame(undefined);
      navigate('/');
    }
  };

  return (
    <GameContext.Provider value={{ game, setupGame, startGame, finishGame, deleteGame, addSucceededQuiz }}>
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
