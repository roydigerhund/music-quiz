import { Link } from '@reach/router';
import React from 'react';
import { quizVariants, quizzes } from '../data/quizzes';
import { Player, QuizVariant } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';
import { useGame } from './contexts/GameContext';

const QuizVariantCard = ({
  variant,
  player,
  disabled,
}: {
  variant: QuizVariant;
  player?: Player;
  disabled?: boolean;
}) => {
  const { game } = useGame();

  const succeededQuizIds = game?.succeededQuizzes.map((q) => q.id) || [];

  return (
    <Link
      className={classNames(
        'flex flex-col space-y-4 justify-center items-center shadow-lg text-white tracking-wide font-semibold h-24 xxs:h-32 sm:h-48 px-8 rounded-3xl border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu',
        quizzes[variant].every((q) => succeededQuizIds.includes(q.id))
          ? 'pointer-events-none bg-gray-500 border-gray-700'
          : 'bg-pink-500 hover:bg-pink-600 border-pink-700',
        disabled && 'pointer-events-none opacity-80',
      )}
      to={quizVariants[variant].path}
      state={{ player }}
    >
      <img
        src={`/svgs/${quizVariants[variant].iconPath}`}
        className="w-12 h-12"
        alt={quizVariants[variant].title}
        draggable={false}
      />
      <span>{`${quizzes[variant].filter((q) => succeededQuizIds.includes(q.id)).length}/${
        quizzes[variant].length
      }`}</span>
    </Link>
  );
};

export default QuizVariantCard;
