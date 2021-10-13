import { MusicNoteOutline } from '@graywolfai/react-heroicons';
import React from 'react';
import Button from '../components/Button';
import { useGame } from '../components/contexts/GameContext';
import GameResult from '../components/GameResult';
import GameSetup from '../components/GameSetup';
import QuizSelection from '../components/QuizSelection';
import GamePage from '../containers/GamePage';

const IndexPage = () => {
  const { game, setupGame } = useGame();

  return (
    <GamePage>
      {game?.finishedAt ? (
        <GameResult />
      ) : game?.startedAt ? (
        <QuizSelection />
      ) : game?.createdAt ? (
        <GameSetup />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/intro-bg.png" className="max-w-[500px] w-full h-auto" draggable={false} />
          <div className="px-4 mt-8 mb-10 text-center">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">Lustiges Musik&nbsp;Quiz</h1>
            <p className="mt-4 p md:mt-8">Mit viel Liebe für euch gemacht von eurem Lehrer Herr Schmid.</p>
          </div>
          <Button onClick={setupGame} label="Neues Spiel" leadingIcon={MusicNoteOutline} className="mb-8" />
        </div>
      )}
    </GamePage>
  );
};

export default IndexPage;
