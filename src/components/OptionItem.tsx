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
        'w-full h-full bg-white text-indigo-600 font-bold text-center leading-tight rounded-xl flex items-center justify-center select-none overflow-hidden',
        !option.iconPath && (option.name.length > 3 ? 'text-sm xs:text-base lg:text-2xl' : 'text-xl xs:text-2xl lg:text-3xl'),
        position === OptionPosition.DRAGGING && 'z-10 shadow-xl',
        position === OptionPosition.DRAGGING ? 'cursor-[grabbing]' : 'cursor-[grab]',
        isCloned && 'hidden',
        !option.iconPath && 'p-2',
      )}
    >
      {option.iconPath ? (
        <img className="w-full h-auto" draggable={false} src={`/svgs/${option.iconPath}`} alt={option.name} />
      ) : (
        option.name
      )}
    </div>
  );
};

export default OptionItem;
