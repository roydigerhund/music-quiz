import { MusicNoteOutline, PlayOutline, TrashOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import React, { useState } from 'react';
import Button from '../components/Button';
import { useGame } from '../components/contexts/GameContext';
import Timer from '../components/Timer';
import GamePage from '../containers/GamePage';
import { quizVariants, quizzes } from '../data/quizzes';
import { Game, Player, QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';

const QuizVariantCard = ({ variant, game }: { variant: QuizVariant; game: Game }) => {
  return (
    <Link
      className={classNames(
        'flex flex-col space-y-4 justify-center items-center shadow-lg text-white tracking-wide font-semibold h-24 xxs:h-32 sm:h-48 px-8 rounded-3xl border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu',
        quizzes[variant].every((q) => game.succeededQuizzes.includes(q.id))
          ? 'pointer-events-none bg-gray-500 border-gray-700'
          : 'bg-pink-500 hover:bg-pink-600 border-pink-700',
      )}
      to={quizVariants[variant].path}
    >
      <img src={`/svgs/${quizVariants[variant].iconPath}`} className="h-12 w-12" alt={quizVariants[variant].title} />
      <span>{`${quizzes[variant].filter((q) => game.succeededQuizzes.includes(q.id)).length}/${
        quizzes[variant].length
      }`}</span>
    </Link>
  );
};

const IndexPage = () => {
  const { game, setupGame, startGame, exitGame } = useGame();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  return (
    <GamePage>
      {game?.startedAt ? (
        <div className="mt-8 sm:px-3 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
            Lustiges Musik&nbsp;Quiz
          </h1>
          <div className="grid sm:gap-3 gap-4 sm:grid-cols-3 mx-auto max-w-3xl my-8">
            {game.players.map((player) => (
              <div key={player.id} className="flex">
                {player.name}
              </div>
            ))}
          </div>
          <div className="grid sm:gap-3 gap-4 sm:grid-cols-3 mx-auto max-w-3xl my-8">
            <QuizVariantCard variant={QuizVariant.NOTES} game={game} />
            <QuizVariantCard variant={QuizVariant.RHYTHM} game={game} />
            <QuizVariantCard variant={QuizVariant.CHORDS} game={game} />
          </div>

          {!!game && (
            <div className="py-3 space-y-6 text-center">
              <div className="text-indigo-100">
                Das Spiel wurde <Timer /> begonnen.
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
        </div>
      ) : game?.createdAt ? (
        <div className="flex flex-col justify-center items-center">
          <div className="mt-8 sm:px-3 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
              Lustiges Musik&nbsp;Quiz
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center mt-5">Mitspieler</p>
            <div className="flex flex-col space-y-4 my-4 justify-center items-center">
              {players.map((player) => (
                <div key={player.id} className="flex items-center bg-indigo-700 text-white py-2 px-4 rounded-full">
                  <span>{player.name}</span>
                  <div
                    onClick={() => {
                      setPlayers(players.filter((p) => p.id !== player.id));
                    }}
                  >
                    <TrashOutline className="w-5 h-5 -mr-1 ml-2 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
            {players.length < 4 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  if (newPlayerName) {
                    const currentUnix = Math.floor(Date.now() / 1000);
                    setPlayers([...players, { id: newPlayerName + currentUnix, name: newPlayerName }]);
                    setNewPlayerName('');
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-gray-500"
                />
                <Button htmlType="submit" label="Spieler hinzufügen" />
              </form>
            )}
          </div>
          <Button
            onClick={() => startGame(players)}
            disabled={players.length === 0}
            leadingIcon={PlayOutline}
            label="Spiel Starten"
          />
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
          <Button onClick={setupGame} label="Neues Spiel" leadingIcon={MusicNoteOutline} />
        </div>
      )}
    </GamePage>
  );
};

export default IndexPage;
