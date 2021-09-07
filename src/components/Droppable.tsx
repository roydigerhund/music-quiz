import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { classNames } from "../utils/class-names";

type Props = {
  id: string;
};

const Droppable: React.FunctionComponent<Props> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        "box-content h-24 p-1 flex justify-center items-center border-2 border-dashed rounded-2xl",
        isOver ? "border-white" : "border-indigo-300"
      )}
    >
      {children}
    </div>
  );
};

export default Droppable;
