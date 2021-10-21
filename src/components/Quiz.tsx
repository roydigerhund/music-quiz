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
import {
  ChevronLeftSolid,
  ChevronRightSolid,
  CursorClickOutline,
  PauseSolid,
  PlaySolid,
} from '@graywolfai/react-heroicons';
import { useLocation, useNavigate } from '@reach/router';
import randomInteger from 'random-int';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { quizOptions, quizzes } from '../data/quizzes';
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
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
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

  useEffect(() => {
    if (quiz?.soundFilePath) {
      const audioElement = new Audio(quiz.soundFilePath);
      setAudio(audioElement);
    }
  }, [quiz]);

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

  const toggleAudio = () => {
    if (!audio) return;
    if (audioPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setAudioPlaying(false);
    } else {
      audio.play();
      setAudioPlaying(true);
      audio.onended = () => {
        setAudioPlaying(false);
        console.log('ended');
      };
    }
  };

  const checkAnswer = () => {
    if (!quiz || !player) return;
    const userAnswer = Object.entries(drops)
      .filter(([_, option]) => !!option)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, option]) => option?.id);
    const result =
      userAnswer.length === quiz.answer.length &&
      (quiz.answer.every((value, index) => value === userAnswer[index]) ||
        !!quiz.optionalAnswers?.some((optionalAnswer) =>
          optionalAnswer.every((value, index) => value === userAnswer[index]),
        ));
    setSuccess(result);
    if (result) {
      addSucceededQuiz(quiz, player);
    }
  };

  return !quiz ? null : (
    <div className="flex flex-col items-center px-3 mx-auto sm:px-4">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <h1 className="mt-8 h3 sm:mt-12 md:mt-16">
          {quiz.soundFilePath && (
            <span
              className="relative block w-6 h-6 mx-auto mb-4 bg-white border-indigo-600 rounded-full cursor-pointer border-6"
              onClick={toggleAudio}
            >
              {audioPlaying ? (
                <PauseSolid className="absolute -inset-1.5 w-10 h-10 text-pink-500" />
              ) : (
                <PlaySolid className="absolute -inset-1.5 w-10 h-10 text-pink-500" />
              )}
            </span>
          )}
          {quiz.question}
          {quiz.imagePath && (
            <div className="p-2 mx-auto mt-4 bg-white rounded-md">
              <img className="block w-full h-auto max-w-md" src={quiz.imagePath} alt={quiz.question} />
            </div>
          )}
        </h1>
        {success === null && (
          <div
            className={`mt-8 sm:mt-12 md:mt-16 grid gap-3 sm:gap-4 select-none ${
              gridCols[quiz.options?.length || quizOptions[quiz.variant].length]
            }`}
          >
            {quizOptions[quiz.variant]
              .filter((option) => (!quiz.options ? true : quiz.options.includes(option.id)))
              .map((option) => (
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
        <div className="relative z-10">
          <Confetti active={!!success} config={confettiConfig} />
        </div>
        {success === true && (
          <div className="relative z-0 p-4 bg-white rounded-md animate__tada">
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
                  Leider falsch, nächstes mal klappt es!
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
