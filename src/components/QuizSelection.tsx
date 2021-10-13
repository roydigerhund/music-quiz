import { CheckCircleSolid, CheckOutline, LogoutOutline, TrashOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import React from 'react';
import { quizzes, quizVariants } from '../data/quizzes';
import { Game, Player, QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';
import ButtonSmall from './ButtonSmall';
import { useGame } from './contexts/GameContext';
import QuizVariantCard from './QuizVariantCard';
import Timer from './Timer';

const QuizSelection = () => {
  const { game, finishGame } = useGame();
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player>();

  return !game ? null : (
    <div className="px-4 mt-8 sm:px-3">
      <h1 className="h1">{!!selectedPlayer ? 'Quiz auswählen' : 'Spieler auswählen'}</h1>
      <div className="max-w-3xl mx-auto my-8">
        <div className="flex flex-row flex-wrap items-center justify-center  -m-2">
          {game.players.map((player) => (
            <div
              key={player.id}
              className={classNames(
                'flex-1 flex items-center justify-between m-2 w-full h-12 px-4 pb-px font-medium text-indigo-700 rounded-lg cursor-pointer select-none',
                selectedPlayer?.id === player.id ? 'bg-white' : 'bg-indigo-200',
              )}
              style={{
                flexBasis: 1,
              }}
              onClick={() => {
                setSelectedPlayer(selectedPlayer?.id === player.id ? undefined : player);
              }}
            >
              <span>{player.name}</span>
              <CheckCircleSolid
                className={classNames(
                  'w-6 h-6 mb-px ml-2 text-green-600',
                  selectedPlayer?.id === player.id ? 'opacity-100' : 'opacity-0',
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto my-8 grid sm:gap-3 gap-4 sm:grid-cols-3">
        <QuizVariantCard variant={QuizVariant.NOTES} player={selectedPlayer} disabled={!selectedPlayer} />
        <QuizVariantCard variant={QuizVariant.RHYTHM} player={selectedPlayer} disabled={!selectedPlayer} />
        <QuizVariantCard variant={QuizVariant.CHORDS} player={selectedPlayer} disabled={!selectedPlayer} />
      </div>

      {!!game && (
        <div className="py-3 text-center space-y-6">
          <div className="text-indigo-100">
            Das Spiel wurde <Timer /> begonnen.
          </div>
          <ButtonSmall leadingIcon={LogoutOutline} onClick={finishGame} label="Spiel Beenden" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default QuizSelection;
