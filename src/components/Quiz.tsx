import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { ChevronLeftSolid, ChevronRightSolid, CursorClickOutline } from '@graywolfai/react-heroicons';
import { useLocation, useNavigate } from '@reach/router';
import randomInteger from 'random-int';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { quizOptions, quizzes } from '../data/quizzes';
import useWindowDimensions from '../hooks/window-dimenions';
import { OptionPosition, Player, QuizOption, QuizType, QuizVariant } from '../types/types-and-enums';
import Button from './Button';
import ButtonSmall from './ButtonSmall';
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

const confettiConfig = {
  angle: 90,
  spread: 90,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 5000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const Quiz = ({ variant }: { variant: QuizVariant }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [drops, setDrops] = useState<Record<ID, QuizOption | null>>({});
  const [success, setSuccess] = useState<boolean | null>(null);
  const [quiz, setQuiz] = useState<QuizType | undefined>();
  const [activeOption, setActiveOption] = useState<QuizOption | null>(null);
  const [player, setPlayer] = useState<Player>();
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}));

  const { game, addSucceededQuiz } = useGame();

  const getQuiz = () => {
    const succeededQuizIds = game?.succeededQuizzes.map((q) => q.id) || [];
    const availableQuizzes = quizzes[variant].filter((quiz) => !succeededQuizIds.includes(quiz.id));
    if (!availableQuizzes.length) {
      navigate('/');
      return;
    }
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
      addSucceededQuiz(quiz, player);
    }
  };

  return !quiz ? null : (
    <div className="flex flex-col items-center px-3 mx-auto sm:px-4">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <h1 className="mt-8 text-xl font-medium text-center sm:mt-12 md:mt-16">{quiz.question}</h1>
        {success === null && (
          <div
            className={`mt-8 sm:mt-12 md:mt-16 grid gap-3 sm:gap-4 select-none ${
              gridCols[quizOptions[quiz.variant].length]
            }`}
          >
            {quizOptions[quiz.variant].map((option) => (
              <Draggable key={option.id} id={option.id} option={option} position={OptionPosition.POOL} />
            ))}
          </div>
        )}
        <div className={`grid gap-3 sm:gap-4 select-none ${gridCols[quiz.answer.length]} my-8 sm:my-12 md:my-16`}>
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
                      disabled={success !== null}
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
        <Confetti active={!!success} config={confettiConfig} />
        {success === true && (
          <div className="p-4 bg-white rounded-md animate__tada">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0 text-lg">🎉</div>
              <div className="ml-3">
                <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase">
                  Super, deine Antwort war richtig!
                </p>
              </div>
            </div>
          </div>
        )}
        {success === false && (
          <div className="p-4 bg-white rounded-md animate__shakeX">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0 text-lg">😔</div>
              <div className="ml-3">
                <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase">
                  Leider war deine Antwort falsch!
                </p>
              </div>
            </div>
          </div>
        )}
        {success === null ? (
          <ButtonSmall to="/" leadingIcon={ChevronLeftSolid} label="Zurück zur Übersicht" className="mt-8" />
        ) : (
          <Button to="/" leadingIcon={ChevronRightSolid} label="Weiter" className="mt-8" />
        )}
      </DndContext>
    </div>
  );
};

export default Quiz;
