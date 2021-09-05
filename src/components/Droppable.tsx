import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
};

const Droppable: React.FunctionComponent<Props> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ width: 120, height: 120, border: "1px dashed gray", ...style }}
    >
      {children}
    </div>
  );
};

export default Droppable;
