import { MusicNoteOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import React from 'react';
import Button from '../components/Button';
import { useGame } from '../components/contexts/GameContext';
import GamePage from '../containers/GamePage';
import { quizzes } from '../data/quizzes';
import { QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';

const IndexPage = () => {
  const { game, startGame } = useGame();

  return (
    <GamePage>
      {!!game ? (
        <div className="flex flex-col sm:flex-row justify-center items-center flex-1">
          <Link
            className={classNames(
              'flex justify-center items-center m-4 w-64 h-64 bg-indigo-700 border-2 border-indigo-500 hover:bg-indigo-800 rounded-2xl',
              quizzes[QuizVariant.RHYTHM].every((q) => game.succeededQuizzes.includes(q.id)) && 'pointer-events-none opacity-50',
            )}
            to="/rhythmus"
          >
            Rhythmus{' '}
            {`${quizzes[QuizVariant.RHYTHM].filter((q) => game.succeededQuizzes.includes(q.id)).length}/${
              quizzes[QuizVariant.RHYTHM].length
            }`}
          </Link>
          <Link
            className={classNames(
              'flex justify-center items-center m-4 w-64 h-64 bg-indigo-700 border-2 border-indigo-500 hover:bg-indigo-800 rounded-2xl',
              quizzes[QuizVariant.NOTES].every((q) => game.succeededQuizzes.includes(q.id)) && 'pointer-events-none opacity-50',
            )}
            to="/noten"
          >
            Noten{' '}
            {`${quizzes[QuizVariant.NOTES].filter((q) => game.succeededQuizzes.includes(q.id)).length}/${
              quizzes[QuizVariant.NOTES].length
            }`}
          </Link>
          <Link
            className={classNames(
              'flex justify-center items-center m-4 w-64 h-64 bg-indigo-700 border-2 border-indigo-500 hover:bg-indigo-800 rounded-2xl',
              quizzes[QuizVariant.CHORDS].every((q) => game.succeededQuizzes.includes(q.id)) && 'pointer-events-none opacity-50',
            )}
            to="/akkorde"
          >
            Akkorde{' '}
            {`${quizzes[QuizVariant.CHORDS].filter((q) => game.succeededQuizzes.includes(q.id)).length}/${
              quizzes[QuizVariant.CHORDS].length
            }`}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/images/intro-bg.png" className="max-w-[500px] w-full h-auto" />
          <div className="text-center mt-8 mb-10 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">Lustiges Musik&nbsp;Quiz</h1>
            <h2 className="max-w-xs mx-auto mt-4 md:mt-8 text-md sm:text-lg md:text-xl font-light text-indigo-200">
              Mit viel Liebe für euch gemacht von eurem Lehrer Herr Schmid.
            </h2>
          </div>
          <Button onClick={startGame} label="Spiel starten" leadingIcon={MusicNoteOutline} />
        </div>
      )}
    </GamePage>
  );
};

export default IndexPage;
