import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  CursorClickOutline,
  ThumbDownOutline,
  ThumbUpOutline,
} from "@graywolfai/react-heroicons";
import Draggable from "components/Draggable";
import Droppable from "components/Droppable";
import randomInteger from "random-int";
import React, { useEffect, useState } from "react";
import { Option, QuizType, QuizVariant, quizzes } from "../data/quizzes";
import Button from "./Button";

type ID = string;

const Quiz = ({ variant }: { variant: QuizVariant }) => {
  const [drops, setDrops] = useState<Record<ID, Option | null>>({});
  const [success, setSuccess] = useState<boolean | null>(null);
  const [quiz, setQuiz] = useState<QuizType | undefined>();

  const getQuiz = async () => {
    try {
      const finishedQuizzesJSON = localStorage.getItem("quiz-success");
      const finishedQuizzes = await JSON.parse(finishedQuizzesJSON || "[]");
      const availableQuizzes = quizzes[variant].filter(
        (quiz) => !finishedQuizzes.includes(quiz.id)
      );
      const quizIndexNumber = randomInteger(0, availableQuizzes.length - 1);
      setQuiz(availableQuizzes[quizIndexNumber]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuiz();
  }, [variant]);

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

  const checkAnswer = async () => {
    const userAnswer = Object.entries(drops)
      .filter(([_, option]) => !!option)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, option]) => option.id);
    console.log(drops, userAnswer, quiz.answer);
    const result =
      userAnswer.length === quiz.answer.length &&
      userAnswer.every((value, index) => value === quiz.answer[index]);
    setSuccess(result);
    if (result) {
      try {
        const finishedQuizzesJSON = localStorage.getItem("quiz-success");
        const finishedQuizzes = await JSON.parse(finishedQuizzesJSON || "[]");
        if (!finishedQuizzes.includes(quiz.id)) {
          localStorage.setItem(
            "quiz-success",
            JSON.stringify([...finishedQuizzes, quiz.id])
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return !quiz ? null : (
    <div className="flex flex-col max-w-4xl mx-auto items-center">
      <DndContext onDragEnd={handleDragEnd}>
        <h1 className="my-24 text-xl text-center font-medium">
          {quiz.question}
        </h1>
        <div className="flex flex-wrap">
          {quiz.options.map(({ id, name }) => (
            <Draggable key={id} id={id} option={{ id, name }}>
              {name}
            </Draggable>
          ))}
        </div>
        <div className="flex flex-wrap my-16">
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
                      dropped={true}
                    >
                      {childOption.name}
                    </Draggable>
                  )}
                </Droppable>
              );
            })}
        </div>
        {success === null && (
          <Button
            onClick={checkAnswer}
            label="Antwort überprüfen"
            icon={CursorClickOutline}
          />
        )}
        {success === true && (
          <div className="rounded-md bg-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ThumbUpOutline
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
                <ThumbDownOutline
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
