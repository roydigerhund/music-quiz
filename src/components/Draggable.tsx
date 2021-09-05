import React from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
};

const Draggable: React.FunctionComponent<Props> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <button
      ref={setNodeRef}
      style={{ width: 120, height: 120, backgroundColor: "#777", ...style }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Draggable;
