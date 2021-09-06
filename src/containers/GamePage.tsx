import React, { useEffect } from "react";
import { DateTime } from "luxon";

const GamePage: React.FunctionComponent = ({ children }) => {
  const [gameStartedAt, setGameStartedAt] = React.useState<number>(0);

  useEffect(() => {
    const startedAt = localStorage.getItem("gameStartedAt");
    if (startedAt) {
      setGameStartedAt(parseInt(startedAt, 10));
    }
  }, []);

  const exitGame = () => {
    localStorage.removeItem("gameStartedAt");
    window.location.href = "/";
  };

  return (
    <div className="bg-indigo-600 min-h-screen text-white">
      {!!gameStartedAt && (
        <div className="flex items-center justify-between py-3 px-4">
          <div className="text-indigo-100">
            Dein Spiel begann {DateTime.fromSeconds(gameStartedAt).toRelative()}
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
