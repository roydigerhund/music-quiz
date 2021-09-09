import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CursorClickOutline, ThumbDownOutline, ThumbUpOutline } from '@graywolfai/react-heroicons';
import { Link } from '@reach/router';
import randomInteger from 'random-int';
import React, { useEffect, useState } from 'react';
import { QuizVariant, quizzes } from '../data/quizzes';
import { OptionID, OptionPosition, QuizOption, QuizType } from '../types/types-and-enums';
import Button from './Button';
import { useGame } from './contexts/GameContext';
import Draggable from './Draggable';
import Droppable from './Droppable';
import OptionItem from './OptionItem';

type ID = string;

const Quiz = ({ variant }: { variant: QuizVariant }) => {
  const [drops, setDrops] = useState<Record<ID, QuizOption | null>>({});
  const [success, setSuccess] = useState<boolean | null>(null);
  const [quiz, setQuiz] = useState<QuizType | undefined>();
  const [activeOption, setActiveOption] = useState<QuizOption | null>(null);
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}));

  const { game, addSucceededQuiz } = useGame();

  const getQuiz = () => {
    const availableQuizzes = quizzes[variant].filter((quiz) => !game?.succeededQuizzes.includes(quiz.id));
    const quizIndexNumber = randomInteger(0, availableQuizzes.length - 1);
    setQuiz(availableQuizzes[quizIndexNumber]);
  };

  useEffect(() => {
    getQuiz();
  }, [variant]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveOption(event.active.data.current as QuizOption);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over && active.id.startsWith('drop-')) {
      // dragged from drop to nothing => remove from drop
      const dropId = active.id.substr(0, active.id.indexOf('__'));
      setDrops((old) => ({ ...old, [dropId]: null }));
    } else if (over && !active.id.startsWith('drop-')) {
      // dragged from options stack to drop => remove previous stacks on drop, save stack to drop
      setDrops((old) => ({ ...old, [over.id]: active.data.current as QuizOption }));
    } else if (over && active.id.startsWith('drop-')) {
      // dragged from drop to another drop => remove previous stacks on drop and stack from old drop, save stack to drop
      const oldDropId = active.id.substr(0, active.id.indexOf('__'));
      // old and new drop are not the same
      if (oldDropId !== over.id) {
        setDrops((old) => ({
          ...old,
          [over.id]: active.data.current as QuizOption,
          [oldDropId]: null,
        }));
      }
    } else {
      // do nothing
    }
    setActiveOption(null);
  };

  const checkAnswer = () => {
    if (!quiz) return;
    const userAnswer = Object.entries(drops)
      .filter(([_, option]) => !!option)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, option]) => option?.id);
    console.log(drops, userAnswer, quiz.answer);
    const result =
      userAnswer.length === quiz.answer.length && userAnswer.every((value, index) => value === quiz.answer[index]);
    setSuccess(result);
    if (result) {
      addSucceededQuiz(quiz.id);
    }
  };

  return !quiz ? null : (
    <div className="flex flex-col max-w-4xl mx-auto items-center">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <h1 className="my-8 sm:my-12 md:my-16 text-xl text-center font-medium">{quiz.question}</h1>
        {success === null && (
          <div className="flex flex-wrap justify-center">
            {quiz.options.map(({ id, name }) => (
              <Draggable key={id} id={id} option={{ id, name }} position={OptionPosition.POOL} />
            ))}
          </div>
        )}
        <div className="flex flex-wrap justify-center my-8 sm:my-12 md:my-16">
          {Array(quiz.answer.length)
            .fill('')
            .map((_, index) => {
              const dropId = `drop-${index}`;
              const childOption = drops[dropId];

              return (
                <Droppable key={dropId} id={dropId}>
                  {childOption && (
                    <Draggable
                      id={`${dropId}__${childOption.id}`}
                      option={childOption}
                      position={OptionPosition.ANSWER}
                    />
                  )}
                </Droppable>
              );
            })}
        </div>
        <DragOverlay dropAnimation={null} zIndex={100}>
          {activeOption ? <OptionItem option={activeOption} position={OptionPosition.DRAGGING} /> : null}
        </DragOverlay>
        {success === null && (
          <Button
            onClick={checkAnswer}
            label="Antwort überprüfen"
            leadingIcon={CursorClickOutline}
            disabled={Object.entries(drops).filter(([_, option]) => !!option).length !== quiz.answer.length}
          />
        )}
        {success === true && (
          <div className="rounded-md bg-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ThumbUpOutline className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm uppercase tracking-wider font-semibold text-white">Richtig</p>
              </div>
            </div>
          </div>
        )}
        {success === false && (
          <div className="rounded-md bg-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ThumbDownOutline className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm uppercase tracking-wider font-semibold text-white">Falsch</p>
              </div>
            </div>
          </div>
        )}
        {success !== null && <Link to="/">Zurück zur Übersicht</Link>}
      </DndContext>
    </div>
  );
};

export default Quiz;
