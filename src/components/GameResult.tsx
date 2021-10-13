import { MusicNoteOutline, TrashOutline } from '@graywolfai/react-heroicons';
import React from 'react';
import { quizVariants } from '../data/quizzes';
import { QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';
import Button from './Button';
import { useGame } from './contexts/GameContext';

// gold hex color
const gold = '#ffd700';
// silver hex color
const silver = '#a0a0a0';
// bronze hex color
const bronze = '#cd7f32';
// white hex color
const white = '#ffffff';

const positionColors = [gold, silver, bronze, white];

const GameResult = () => {
  const { game, deleteGame } = useGame();

  let position = 0;

  const sortedPlayers = game?.players.sort((a, b) => b.succeededQuizzes.length - a.succeededQuizzes.length);

  return !sortedPlayers ? null : (
    <div>
      <div className="px-4 py-8 sm:px-3">
        <h1 className="mb-8 h1">Ergebnis</h1>
        <div className="w-full max-w-sm mx-auto mb-8">
          <div className="flex flex-col items-center justify-center my-4 space-y-4">
            {sortedPlayers.map((player, index) => {
              if (index > 0 && sortedPlayers[index - 1].succeededQuizzes.length > player.succeededQuizzes.length) {
                position++;
              }

              const succeededNoteQuizzes = player.succeededQuizzes.filter(
                (quiz) => quiz.variant === QuizVariant.NOTES,
              ).length;
              const succeededRhythmQuizzes = player.succeededQuizzes.filter(
                (quiz) => quiz.variant === QuizVariant.RHYTHM,
              ).length;
              const succeededChordQuizzes = player.succeededQuizzes.filter(
                (quiz) => quiz.variant === QuizVariant.CHORDS,
              ).length;

              return (
                <div key={player.id} className="w-full p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={classNames(
                          'flex items-center justify-center flex-shrink-0 mr-2 text-lg font-bold rounded-full w-7 h-7',
                          position < 3 ? 'text-white' : 'text-gray-600 ring-1 ring-inset ring-gray-600',
                        )}
                        style={{ backgroundColor: positionColors[position] }}
                      >
                        {position + 1}
                      </div>
                      <div className="text-xl font-bold text-gray-800 break-all">{player.name}</div>
                    </div>
                    <div className="flex-shrink-0 text-lg font-bold text-gray-800 ml-4">
                      {player.succeededQuizzes.length}{' '}
                      <span className="text-sm text-gray-500">
                        Punkt{player.succeededQuizzes.length !== 1 ? 'e' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-4 gap-1 mt-4">
                    {Object.entries(quizVariants).map(([variantKey, quizVariant]) => {
                      const succeededQuizzes = player.succeededQuizzes.filter(
                        (quiz) => quiz.variant === variantKey,
                      ).length;

                      return (
                        <div
                          key={variantKey}
                          className={classNames(
                            'flex justify-between items-center py-2 pl-2 pr-4 rounded-lg font-medium',
                            succeededQuizzes > 0 ? 'bg-pink-500' : 'bg-gray-400',
                          )}
                        >
                          <img
                            src={`/svgs/${quizVariant.smallIconPath}`}
                            className="block w-6 h-6"
                            alt={quizVariant.title}
                            draggable={false}
                          />
                          {succeededQuizzes}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button className="mx-auto" onClick={deleteGame} leadingIcon={MusicNoteOutline} label="Neues Spiel" />
      </div>
    </div>
  );
};

export default GameResult;
