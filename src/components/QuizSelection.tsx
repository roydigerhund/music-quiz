import { CheckCircleSolid, LogoutOutline } from '@graywolfai/react-heroicons';
import React, { useState } from 'react';
import { Player, QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';
import ButtonSmall from './ButtonSmall';
import { useGame } from './contexts/GameContext';
import QuizVariantCard from './QuizVariantCard';
import Timer from './Timer';

const QuizSelection = () => {
  const { game, finishGame } = useGame();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [clickedDisabled, setClickedDisabled] = useState(false);

  const handleDisabledClick = () => {
    setClickedDisabled(true);
    setTimeout(() => {
      setClickedDisabled(false);
    }, 1000);
  };

  return !game ? null : (
    <div className="px-4 mt-8 sm:px-3">
      <h1 className="h1">{!!selectedPlayer ? 'Quiz auswählen' : 'Spieler auswählen'}</h1>
      <div className="max-w-3xl mx-auto my-8">
        <div
          className={classNames(
            'flex flex-row flex-wrap items-center justify-center -m-2',
            clickedDisabled && 'animate__shakeX',
          )}
        >
          {game.players.map((player) => (
            <div
              key={player.id}
              className={classNames(
                'flex-1 flex items-center m-2 pb-px font-medium text-indigo-700 rounded-lg cursor-pointer select-none',
                'ease-in-out duration-150',
                !!selectedPlayer ? 'h-12 justify-between px-4' : 'h-24 justify-center px-8',
                selectedPlayer?.id === player.id ? 'bg-white' : 'bg-indigo-200',
              )}
              style={{
                flexBasis: 1,
                transitionProperty: 'height',
              }}
              onClick={() => {
                setSelectedPlayer(selectedPlayer?.id === player.id ? undefined : player);
              }}
            >
              <span>{player.name}</span>
              {!!selectedPlayer && (
                <CheckCircleSolid
                  className={classNames(
                    'w-6 h-6 mb-px ml-2 text-green-600',
                    selectedPlayer?.id === player.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto my-8 grid xs:gap-3 gap-4 xs:grid-cols-3">
        <QuizVariantCard
          variant={QuizVariant.NOTES}
          player={selectedPlayer}
          disabled={!selectedPlayer}
          onDisabledClick={handleDisabledClick}
        />
        <QuizVariantCard
          variant={QuizVariant.RHYTHM}
          player={selectedPlayer}
          disabled={!selectedPlayer}
          onDisabledClick={handleDisabledClick}
        />
        <QuizVariantCard
          variant={QuizVariant.INTERVALS}
          player={selectedPlayer}
          disabled={!selectedPlayer}
          onDisabledClick={handleDisabledClick}
        />
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
