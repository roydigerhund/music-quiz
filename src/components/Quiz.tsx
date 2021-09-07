import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  CheckCircleOutline,
  XCircleOutline,
} from "@graywolfai/react-heroicons";
import Draggable from "components/Draggable";
import Droppable from "components/Droppable";
import React, { useState } from "react";
import { quizzes, Option } from "../data/quizzes";

type ID = string;

const Quiz: React.FunctionComponent = () => {
  const [drops, setDrops] = useState<Record<ID, Option | null>>({});
  const [success, setSuccess] = useState<boolean | null>(null);

  const quiz = quizzes[0];

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over && active.id.startsWith("drop-")) {
      // dragged from drop to nothing => remove from drop
      const dropId = active.id.substr(0, active.id.indexOf("__"));
      setDrops((old) => ({ ...old, [dropId]: null }));
    } else if (over && !active.id.startsWith("drop-")) {
      // dragged from options stack to drop => remove previous stacks on drop, save stack to drop
      setDrops((old) => ({ ...old, [over.id]: active.data.current as Option }));
    } else if (over && active.id.startsWith("drop-")) {
      // dragged from drop to another drop => remove previous stacks on drop and stack from old drop, save stack to drop
      const oldDropId = active.id.substr(0, active.id.indexOf("__"));
      // old and new drop are not the same
      if (oldDropId !== over.id) {
        setDrops((old) => ({
          ...old,
          [over.id]: active.data.current as Option,
          [oldDropId]: null,
        }));
      }
    } else {
      // do nothing
    }
  };

  const checkAnswer = () => {
    const userAnswer = Object.entries(drops)
      .filter(([_, option]) => !!option)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, option]) => option.id);
    console.log(drops, userAnswer, quiz.answer);
    const result =
      userAnswer.length === quiz.answer.length &&
      userAnswer.every((value, index) => value === quiz.answer[index]);
    setSuccess(result);
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto items-center">
      <DndContext onDragEnd={handleDragEnd}>
        <h1 className="my-24 text-xl text-center font-medium">
          {quiz.question}
        </h1>
        <div className="w-full grid grid-cols-7 gap-2">
          {quiz.options.map(({ id, name }) => (
            <Draggable key={id} id={id} option={{ id, name }}>
              {name}
            </Draggable>
          ))}
        </div>
        <div className="w-full my-16 grid grid-cols-4 gap-2">
          {Array(quiz.answer.length)
            .fill("")
            .map((_, index) => {
              const dropId = `drop-${index}`;
              const childOption = drops[dropId];

              return (
                <Droppable key={dropId} id={dropId}>
                  {childOption && (
                    <Draggable
                      id={`${dropId}__${childOption.id}`}
                      option={childOption}
                    >
                      {childOption.name}
                    </Draggable>
                  )}
                </Droppable>
              );
            })}
        </div>
        {success === null && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={checkAnswer}
          >
            Antwort überprüfen
          </button>
        )}
        {success === true && (
          <div className="rounded-md bg-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleOutline
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm uppercase tracking-wider font-semibold text-white">
                  Richtig
                </p>
              </div>
            </div>
          </div>
        )}
        {success === false && (
          <div className="rounded-md bg-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleOutline
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm uppercase tracking-wider font-semibold text-white">
                  Falsch
                </p>
              </div>
            </div>
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default Quiz;
