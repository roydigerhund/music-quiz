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
        "box-content p-1 m-2 flex justify-center items-center border-2 border-dashed rounded-2xl",
        isOver ? "border-white" : "border-indigo-300"
      )}
    >
      <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">{children}</div>
    </div>
  );
};

export default Droppable;
