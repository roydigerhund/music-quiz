import { Link } from '@reach/router';
import { DateTime } from 'luxon';
import React from 'react';
import { useGame } from '../components/contexts/GameContext';
import Timer from '../components/Timer';

const GamePage: React.FunctionComponent<{ showGoBack?: boolean }> = ({ children, showGoBack }) => {
  const { game, exitGame } = useGame();

  return (
    <div className="bg-indigo-600 min-h-screen text-white">
      {!!game && (
        <div className="flex items-center justify-between py-3 px-4 bg-indigo-800">
          {showGoBack && <Link to="/">BACK</Link>}
          <div className="text-indigo-100">
            <Timer />
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
