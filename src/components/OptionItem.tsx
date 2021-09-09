import React from 'react';
import { OptionPosition, QuizOption } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';

type Props = {
  option: QuizOption;
  position: OptionPosition;
  isCloned?: boolean;
};

const OptionItem = ({ option, position, isCloned }: Props) => {
  return (
    <div
      className={classNames(
        'w-full h-full bg-white text-indigo-600 font-bold text-3xl rounded-xl flex items-center justify-center select-none',
        position === OptionPosition.DRAGGING && 'z-10 shadow-xl',
        position === OptionPosition.DRAGGING ? 'cursor-[grabbing]' : 'cursor-[grab]',
        isCloned && 'hidden',
      )}
    >
      {option.name}
    </div>
  );
};

export default OptionItem;
