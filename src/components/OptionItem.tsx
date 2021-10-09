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
        'w-full h-full bg-white text-indigo-600 font-bold text-center text-xl xs:text-2xl lg:text-3xl leading-none xs:leading-none sm:leading-none rounded-xl flex items-center justify-center select-none overflow-hidden',
        position === OptionPosition.DRAGGING && 'z-10 shadow-xl',
        position === OptionPosition.DRAGGING ? 'cursor-[grabbing]' : 'cursor-[grab]',
        isCloned && 'hidden',
        !option.iconPath && 'p-2'
      )}
    >
      {option.iconPath ? <img className="w-full h-auto" src={`/svgs/${option.iconPath}`} alt={option.name} /> : option.name}
    </div>
  );
};

export default OptionItem;
