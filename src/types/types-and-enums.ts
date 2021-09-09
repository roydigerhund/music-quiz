import React from 'react';
import { ChordsEnum, NotesEnum, QuizVariant, RhythmEnum } from '../data/quizzes';

export type SVGIcon = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
>;

export type ID = string;

export type OptionID = keyof typeof NotesEnum | keyof typeof RhythmEnum | keyof typeof ChordsEnum;
export type OptionName = NotesEnum | RhythmEnum | ChordsEnum;

export type QuizOption = {
  id: OptionID;
  name: OptionName;
};

export type QuizType = {
  id: ID;
  options: QuizOption[];
  question: string;
  answer: OptionID[];
  variant: QuizVariant;
};

export enum OptionPosition {
  POOL = 'POOL',
  ANSWER = 'ANSWER',
  DRAGGING = 'DRAGGING',
}