import React from 'react';

export type SVGIcon = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
>;

export type ID = string;

export type SucceededQuiz = {
  id: ID;
  variant: QuizVariant;
};

export type Player = {
  id: ID;
  name: string;
  succeededQuizzes: SucceededQuiz[];
};

export type Game = {
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
  succeededQuizzes: SucceededQuiz[];
  players: Player[];
};

export type OptionID =
  | keyof typeof NotesEnum
  | keyof typeof RhythmEnum
  | keyof typeof ChordsEnum
  | keyof typeof IntervalsEnum;
export type OptionName = NotesEnum | RhythmEnum | ChordsEnum | IntervalsEnum;

export type QuizOption = {
  id: OptionID;
  name: OptionName;
  iconPath?: string;
};

export type QuizType = {
  id: ID;
  question: string;
  answer: OptionID[];
  optionalAnswers?: OptionID[][];
  options: OptionID[];
  variant: QuizVariant;
  imagePath?: string;
  soundFilePath?: string;
  largeTiles?: boolean;
};

export enum OptionPosition {
  POOL = 'POOL',
  ANSWER = 'ANSWER',
  DRAGGING = 'DRAGGING',
}

export enum NotesEnum {
  C = 'C',
  CIS = 'Cis',
  DES = 'Des',
  D = 'D',
  DIS = 'Dis',
  ES = 'Es',
  E = 'E',
  F = 'F',
  FIS = 'Fis',
  G = 'G',
  GIS = 'Gis',
  AS = 'As',
  A = 'A',
  B = 'B',
  H = 'H',
  DUR = 'Dur',
  MOLL = 'Moll',
}

export enum RhythmEnum {
  NOTE_1_1 = 'Note 1/1',
  NOTE_1_2 = 'Note 1/2',
  NOTE_1_4 = 'Note 1/4',
  NOTE_1_8 = 'Note 1/8',
  NOTE_1_16 = 'Note 1/16',
  TRIOLE_1_4 = 'Triole 1/4',
  TRIOLE_1_8 = 'Triole 1/8',
  // PAUSE_1_1 = 'Pause 1/1',
  // PAUSE_1_2 = 'Pause 1/2',
  // PAUSE_1_4 = 'Pause 1/4',
  // PAUSE_1_8 = 'Pause 1/8',
  // PAUSE_1_16 = 'Pause 1/16',
}

export enum ChordsEnum {
  C_DUR = 'C Dur',
  F_DUR = 'F Dur',
  A_DUR = 'A Dur',
  C_MOLL = 'C Moll',
  F_MOLL = 'F Moll',
  A_MOLL = 'A Moll',
}

export enum IntervalsEnum {
  PRIME = 'Prime',
  SEKUNDE = 'Sekunde',
  KLEINE_TERZ = 'kleine Terz',
  GROSSE_TERZ = 'große Terz',
  TERZ = 'Terz',
  QUARTE = 'Quarte',
  QUINTE = 'Quinte',
  KLEINE_SEXTE = 'kleine Sexte',
  GROSSE_SEXTE = 'große Sexte',
  SEXTE = 'Sexte',
  SEPTIME = 'Septime',
  OKTAVE = 'Oktave',
}

export enum QuizVariant {
  NOTES = 'Notes',
  RHYTHM = 'Rhythm',
  INTERVALS = 'Intervals',
}
