import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { classNames } from '../utils/class-names';
import { OptionPosition, QuizOption } from '../types/types-and-enums';
import OptionItem from './OptionItem';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

type Props = {
  option: QuizOption;
  onClick: (option: QuizOption) => void;
  selected?: boolean;
  disabled?: boolean;
  largeTiles?: boolean;
};

const Clickable = ({ option, onClick, selected, disabled, largeTiles }: Props) => {
  return (
    <div
      className={classNames(
        'rounded-xl h-12 xxs:h-14 xs:h-16 md:h-20 lg:h-24',
        largeTiles ? 'w-16  xxs:w-20 xs:w-24 md:w-32 lg:w-40' : 'w-12  xxs:w-14 xs:w-16 md:w-20 lg:w-24',
        selected === true && 'ring-4 ring-indigo-300',
        selected === false && 'opacity-70',
      )}
      onClick={() => !disabled && onClick(option)}
    >
      <div className={classNames('w-full h-full focus:outline-none')}>
        <OptionItem option={option} />
      </div>
    </div>
  );
};

export default Clickable;
