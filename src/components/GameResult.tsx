import { MusicNoteOutline, TrashOutline } from '@graywolfai/react-heroicons';
import React from 'react';
import Button from './Button';
import { useGame } from './contexts/GameContext';

const GameResult = () => {
  const { game, deleteGame } = useGame();
  console.log(game);
  return !game ? null : (
    <div>
      <div className="px-4 py-8 sm:px-3">
        <h1 className="h1 mb-8">Ergebnis</h1>
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="flex flex-col items-center justify-center my-4 space-y-4">
            {game.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between w-full h-12 px-4 pb-px font-medium text-indigo-700 bg-white rounded-lg"
              >
                <span>{player.name}</span>
                <TrashOutline className="w-5 h-5 mb-px ml-2 text-red-600 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
        <Button className="mx-auto" onClick={deleteGame} leadingIcon={MusicNoteOutline} label="Neues Spiel" />
      </div>
    </div>
  );
};

export default GameResult;
