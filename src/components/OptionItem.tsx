import React from 'react';
import { OptionPosition, QuizOption } from '../types/types-and-enums';
import { classNames } from '../utils/class-names';

type Props = {
  option: QuizOption;
  position: OptionPosition;
  isCloned?: boolean;
};

const OptionItem = ({ option, position, isCloned }: Props) => {
  console.log(option)
  return (
    <div
      className={classNames(
        'w-full h-full bg-white text-indigo-600 font-bold text-2xl text-center sm:text-3xl rounded-xl flex items-center justify-center select-none overflow-hidden',
        position === OptionPosition.DRAGGING && 'z-10 shadow-xl',
        position === OptionPosition.DRAGGING ? 'cursor-[grabbing]' : 'cursor-[grab]',
        isCloned && 'hidden',
      )}
    >
      {option.iconPath ? <img className="w-full h-auto" src={`/svgs/${option.iconPath}`} alt={option.name} /> : option.name}
    </div>
  );
};

export default OptionItem;
