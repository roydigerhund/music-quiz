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
import { Link, useLocation, useNavigate } from '@reach/router';
import randomInteger from 'random-int';
import React, { useEffect, useState } from 'react';
import { quizOptions, quizzes } from '../data/quizzes';
import { OptionPosition, Player, QuizOption, QuizType, QuizVariant } from '../types/types-and-enums';
import Button from './Button';
import { useGame } from './contexts/GameContext';
import Draggable from './Draggable';
import Droppable from './Droppable';
import OptionItem from './OptionItem';

type ID = string;

const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-6',
  7: 'grid-cols-4 sm:grid-cols-7',
  8: 'grid-cols-4',
  9: 'grid-cols-5',
  10: 'grid-cols-5',
  11: 'grid-cols-4 sm:grid-cols-6',
  12: 'grid-cols-4 sm:grid-cols-6',
  13: 'grid-cols-5 sm:grid-cols-7',
  14: 'grid-cols-5 sm:grid-cols-7',
  15: 'grid-cols-5',
};

const Quiz = ({ variant }: { variant: QuizVariant }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drops, setDrops] = useState<Record<ID, QuizOption | null>>({});
  const [success, setSuccess] = useState<boolean | null>(null);
  const [quiz, setQuiz] = useState<QuizType | undefined>();
  const [activeOption, setActiveOption] = useState<QuizOption | null>(null);
  const [player, setPlayer] = useState<Player>();
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}));

  const { game, addSucceededQuiz } = useGame();

  const getQuiz = () => {
    const availableQuizzes = quizzes[variant].filter((quiz) => !game?.succeededQuizzes.includes(quiz.id));
    const quizIndexNumber = randomInteger(0, availableQuizzes.length - 1);
    setQuiz(availableQuizzes[quizIndexNumber]);
  };

  useEffect(() => {
    const state = location.state as { player?: Player };
    if (typeof state === 'object' && state && 'player' in state && state.player) {
      setPlayer(state.player);
    } else {
      navigate('/');
    }
  }, [location]);

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
    if (!quiz || !player) return;
    const userAnswer = Object.entries(drops)
      .filter(([_, option]) => !!option)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, option]) => option?.id);
    const result =
      userAnswer.length === quiz.answer.length && userAnswer.every((value, index) => value === quiz.answer[index]);
    setSuccess(result);
    if (result) {
      addSucceededQuiz(quiz.id, player);
    }
  };

  return !quiz ? null : (
    <div className="flex flex-col items-center px-3 mx-auto mb-12 sm:px-4">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <h1 className="my-8 text-xl font-medium text-center sm:my-12 md:my-16">{quiz.question}</h1>
        {success === null && (
          <div className={`grid gap-3 sm:gap-4 ${gridCols[quizOptions[quiz.variant].length]}`}>
            {quizOptions[quiz.variant].map((option) => (
              <Draggable key={option.id} id={option.id} option={option} position={OptionPosition.POOL} />
            ))}
          </div>
        )}
        <div className={`grid gap-3 sm:gap-4 ${gridCols[quiz.answer.length]} my-8 sm:my-12 md:my-16`}>
          {Array(quiz.answer.length)
            .fill('')
            .map((_, index) => {
              const dropId = `drop-${index}`;
              const childOption = drops[dropId];

              return (
                <Droppable key={dropId} id={dropId} index={index}>
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
          <div className="p-4 bg-green-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <ThumbUpOutline className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold tracking-wider text-white uppercase">Richtig</p>
              </div>
            </div>
          </div>
        )}
        {success === false && (
          <div className="p-4 bg-red-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <ThumbDownOutline className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold tracking-wider text-white uppercase">Falsch</p>
              </div>
            </div>
          </div>
        )}
        <Link
          className="mt-12 flex items-center shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-full border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu bg-pink-500 hover:bg-pink-600 border-pink-700"
          to="/"
        >
          Zurück zur Übersicht
        </Link>
      </DndContext>
    </div>
  );
};

export default Quiz;
