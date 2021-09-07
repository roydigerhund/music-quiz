import { DateTime } from 'luxon';
import React from 'react';
import { useGame } from '../components/contexts/GameContext';
import Timer from '../components/Timer';

const GamePage: React.FunctionComponent = ({ children }) => {
  const { game, exitGame } = useGame();

  return (
    <div className="bg-indigo-600 min-h-screen text-white">
      {!!game && (
        <div className="flex items-center justify-between py-3 px-4">
          <div className="text-indigo-100">
            Dein Spiel begann <Timer />
          </div>
          <button
            role="button"
            onClick={exitGame}
            className="bg-indigo-800 text-indigo-100 hover:bg-indigo-900 hover:text-white py-2 px-4 rounded-lg text-sm tracking-wide"
          >
            Spiel Beenden
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default GamePage;
