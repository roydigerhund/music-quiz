import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { classNames } from '../utils/class-names';
import { OptionPosition, QuizOption } from '../types/types-and-enums';
import OptionItem from './OptionItem';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

type Props = {
  id: string;
  option: QuizOption;
  position: OptionPosition;
  disabled?: boolean;
};

const Draggable = ({ id, option, position, disabled }: Props) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: option,
    disabled,
  });

  return (
    <div
      className={classNames(
        'rounded-xl h-12 w-12 xxs:h-14 xxs:w-14 xs:h-16 xs:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-indigo-700',
      )}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={classNames('w-full h-full focus:outline-none')}
        style={{ touchAction: 'none' }}
      >
        <OptionItem option={option} position={position} isCloned={isDragging} />
      </div>
    </div>
  );
};

export default Draggable;
