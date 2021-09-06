import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Option } from "./Quizzes";
import { classNames } from "../utils/class-names";

type Props = {
  id: string;
  option: Option;
};

const Draggable: React.FunctionComponent<Props> = ({
  id,
  children,
  option,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: option,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div className="rounded-2xl flex-1 bg-indigo-700">
      <div
        ref={setNodeRef}
        className={classNames(
          "relative bg-white text-indigo-600 font-bold text-3xl rounded-2xl h-24 flex items-center justify-center flex-1 focus:outline-none",
          isDragging && "z-10 shadow-xl"
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
