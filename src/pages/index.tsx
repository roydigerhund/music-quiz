import { MusicNoteOutline, PlayOutline, TrashOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import React, { useState } from 'react';
import Button, { ButtonType } from '../components/Button';
import { useGame } from '../components/contexts/GameContext';
import QuizSelection from '../components/QuizSelection';
import Timer from '../components/Timer';
import GamePage from '../containers/GamePage';
import { quizVariants, quizzes } from '../data/quizzes';
import { Game, Player, QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';

const IndexPage = () => {
  const { game, setupGame, startGame, exitGame } = useGame();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  return (
    <GamePage>
      {game?.startedAt ? (
        <QuizSelection />
      ) : game?.createdAt ? (
        <div>
          <div className="px-4 py-8 sm:px-3">
            <h1 className="h1 mb-8">Mitspieler eintragen</h1>
            <div className="w-full max-w-xs mx-auto mb-8">
              <div className="flex flex-col items-center justify-center my-4 space-y-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between w-full h-12 px-4 pb-px font-medium text-indigo-700 bg-white rounded-lg"
                  >
                    <span>{player.name}</span>
                    <div
                      onClick={() => {
                        setPlayers(players.filter((p) => p.id !== player.id));
                      }}
                    >
                      <TrashOutline className="w-5 h-5 mb-px ml-2 text-red-600 cursor-pointer" />
                    </div>
                  </div>
                ))}
                {Array(4 - players.length)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center w-full h-12 px-4 pb-px font-medium text-indigo-300 border-2 border-indigo-200 border-dashed rounded-lg"
                    >
                      {players.length + i + 1}. Spieler
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
                    onChange={(event) => setNewPlayerName(event.target.value.substring(0, 16))}
                    className="w-full px-4 py-3 mb-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <Button
                    htmlType="submit"
                    type={ButtonType.SECONDARY}
                    label="Spieler hinzufügen"
                    className="w-full rounded-lg"
                  />
                </form>
              )}
            </div>
          <Button
            className="mx-auto"
            onClick={() => startGame(players)}
            disabled={players.length === 0}
            leadingIcon={PlayOutline}
            label="Spiel Starten"
          />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/intro-bg.png" className="max-w-[500px] w-full h-auto" />
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
