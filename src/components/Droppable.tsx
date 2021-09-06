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
    <div ref={setNodeRef} className="h-24 flex justify-center items-center border border-dashed border-gray-400" style={style}>
      {children}
    </div>
  );
};

export default Droppable;
