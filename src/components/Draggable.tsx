import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { classNames } from '../utils/class-names';
import { OptionPosition, QuizOption } from '../types/types-and-enums';
import OptionItem from './OptionItem';

type Props = {
  id: string;
  option: QuizOption;
  position: OptionPosition;
};

const Draggable = ({ id, option, position }: Props) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: option,
  });

  return (
    <div className={classNames('rounded-2xl h-24 w-24 bg-indigo-700', position === OptionPosition.POOL && 'm-2')}>
      <div ref={setNodeRef} {...listeners} {...attributes} className="w-full h-full focus:outline-none">
        <OptionItem option={option} position={position} isCloned={isDragging} />
      </div>
    </div>
  );
};

export default Draggable;
