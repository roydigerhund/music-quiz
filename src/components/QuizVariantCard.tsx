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
        'flex xs:flex-col space-x-8 xs:space-x-0 xs:space-y-4 justify-center items-center shadow-lg text-white tracking-wide font-semibold h-24 xs:h-40 px-8 rounded-3xl active:translate-y-[2px] transition-all transform-gpu select-none',
        quizzes[variant].every((q) => succeededQuizIds.includes(q.id))
          ? 'pointer-events-none bg-gray-500 shadow-button-disabled'
          : 'bg-pink-500 active:bg-pink-600 shadow-button active:shadow-button-hover',
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
