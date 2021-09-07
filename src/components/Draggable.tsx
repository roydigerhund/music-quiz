import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { classNames } from '../utils/class-names';
import { QuizOption } from '../types/types';

type Props = {
  id: string;
  option: QuizOption;
  dropped?: boolean;
};

const Draggable: React.FunctionComponent<Props> = ({ id, children, option, dropped }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: option,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div className={classNames('rounded-2xl h-24 w-24 bg-indigo-700', !dropped && 'm-2')}>
      <div
        ref={setNodeRef}
        className={classNames(
          'relative w-full h-full bg-white text-indigo-600 font-bold text-3xl rounded-xl flex items-center justify-center flex-1 focus:outline-none',
          isDragging && 'z-10 shadow-xl',
        )}
        style={style}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    </div>
  );
};

export default Draggable;
