import { PlayOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import Button from '../components/Button';
import GamePage from '../containers/GamePage';
import React, { useEffect } from 'react';
import { useGame } from '../components/contexts/GameContext';

const IndexPage = () => {
  const { game, startGame } = useGame();

  return (
    <GamePage>
      {!!game ? (
        <div className="flex flex-col sm:flex-row justify-center items-center flex-1">
          <Link
            className="flex justify-center items-center m-4 w-64 h-64 bg-indigo-700 border-2 border-indigo-500 hover:bg-indigo-800 rounded-2xl"
            to="/rhythmus"
          >
            Rhythmus
          </Link>
          <Link
            className="flex justify-center items-center m-4 w-64 h-64 bg-indigo-700 border-2 border-indigo-500 hover:bg-indigo-800 rounded-2xl"
            to="/noten"
          >
            Noten
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/images/intro-bg.png" className="max-w-[500px] w-full h-auto" />
          <div className="text-center mt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">Lustiges Musik&nbsp;Quiz</h1>
            <h2 className="max-w-xs mx-auto mt-4 md:mt-8 text-md sm:text-lg md:text-xl font-light text-indigo-200">
              Mit viel Liebe für euch gemacht von eurem Lehrer Herr Schmied.
            </h2>
          </div>
          <Button onClick={startGame} label="Spiel starten" leadingIcon={PlayOutline} />
        </div>
      )}
    </GamePage>
  );
};

export default IndexPage;
