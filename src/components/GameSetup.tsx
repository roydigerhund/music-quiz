import { PlayOutline, TrashOutline, XSolid } from '@graywolfai/react-heroicons';
import React, { useState } from 'react';
import { Player } from '../types/types-and-enums';
import Button, { ButtonType } from './Button';
import ButtonSmall from './ButtonSmall';
import { useGame } from './contexts/GameContext';

const GameSetup = () => {
  const { game, startGame, deleteGame } = useGame();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  return !game ? null : (
    <div className="px-4 pt-8 sm:px-3">
      <h1 className="mb-8 h1">Mitspieler eintragen</h1>
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
          {players.length < 4 && (
            <div className="flex items-center w-full h-12 px-4 pb-px font-medium text-indigo-300 border-2 border-indigo-200 border-dashed rounded-lg" />
          )}
        </div>
        {players.length < 4 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (newPlayerName) {
                const currentUnix = Math.floor(Date.now() / 1000);
                setPlayers([
                  ...players,
                  { id: newPlayerName + currentUnix, name: newPlayerName, succeededQuizzes: [] },
                ]);
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
      <ButtonSmall leadingIcon={XSolid} onClick={deleteGame} label="Abbrechen" className="mx-auto mt-8" />
    </div>
  );
};

export default GameSetup;
