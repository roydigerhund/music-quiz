import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { classNames } from '../utils/class-names';

type Props = {
  id: string;
  index: number;
};

const Droppable: React.FunctionComponent<Props> = ({ id, index, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        'box-content p-1 flex justify-center items-center border-2 border-dashed rounded-2xl',
        isOver ? 'border-white' : 'border-indigo-300',
      )}
    >
      <div
        className={classNames(
          'text-2xl rounded-xl flex items-center justify-center h-12 w-12 xxs:h-14 xxs:w-14 xs:h-16 xs:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24',
          isOver ? 'text-white' : 'text-indigo-300',
        )}
      >
        {children || <div>{index + 1}</div>}
      </div>
    </div>
  );
};

export default Droppable;
