import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Option } from "./Quizzes";

type Props = {
  id: string;
  option: Option;
};

const Draggable: React.FunctionComponent<Props> = ({
  id,
  children,
  option,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: option,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      className="shadow-md border border-blue-400 bg-blue-50 rounded-md h-24 flex items-center justify-center flex-1"
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
