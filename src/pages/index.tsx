import { Link } from "@reach/router";
import React, { useEffect } from "react";

const IndexPage = () => {
  const [gameIsRunning, setGameIsRunning] = React.useState(false);

  useEffect(() => {
    const gameStartedAt = localStorage.getItem("gameStartedAt");
    if (gameStartedAt) {
      setGameIsRunning(true);
    }
  }, []);

  const startGame = () => {
    setGameIsRunning(true);
    const currentUnix = Math.floor(Date.now() / 1000);
    localStorage.setItem("gameStartedAt", currentUnix.toString());
  };

  return (
    <div>
      {gameIsRunning ? (
        <div className="flex flex-col justify-center items-center">
          <Link to="/rhythmus">Rhythmus</Link>
          <Link to="/noten">Noten</Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src="/images/intro-bg.png"
            className="max-w-[500px] w-full h-auto"
          />
          <div className="text-center mt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Lustiges Musik&nbsp;Quiz
            </h1>
            <h2 className="max-w-xs mx-auto mt-4 md:mt-8 text-md sm:text-lg md:text-xl font-light text-indigo-200">
              Mit viel Liebe für euch gemacht von eurem Lehrer Herr Schmied.
            </h2>
          </div>
          <button
            role="button"
            onClick={startGame}
            className="mt-12 from-pink-500 to-pink-600 bg-gradient-to-b hover:from-pink-600 hover:to-pink-600 hover:translate-y-0.5 shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-lg"
          >
            Spiel Starten
          </button>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
