import {
  ChordsEnum,
  IntervalsEnum,
  NotesEnum,
  QuizOption,
  QuizType,
  QuizVariant,
  RhythmEnum,
} from '../types/types-and-enums';

export const rhythmIconPaths: Record<RhythmEnum, string> = {
  [RhythmEnum.NOTE_1_1]: 'rhythm/ganze-note.svg',
  [RhythmEnum.NOTE_1_2]: 'rhythm/halbe-note.svg',
  [RhythmEnum.NOTE_1_4]: 'rhythm/viertel-note.svg',
  [RhythmEnum.NOTE_1_8]: 'rhythm/achtel-note.svg',
  [RhythmEnum.NOTE_1_16]: 'rhythm/sechzehntel-note.svg',
  [RhythmEnum.TRIOLE_1_4]: 'rhythm/viertel-triole.svg',
  [RhythmEnum.TRIOLE_1_8]: 'rhythm/achtel-triole.svg',
  [RhythmEnum.PAUSE_1_1]: 'rhythm/ganze-pause.svg',
  [RhythmEnum.PAUSE_1_2]: 'rhythm/halbe-pause.svg',
  [RhythmEnum.PAUSE_1_4]: 'rhythm/viertel-pause.svg',
  [RhythmEnum.PAUSE_1_8]: 'rhythm/achtel-pause.svg',
  [RhythmEnum.PAUSE_1_16]: 'rhythm/sechzehntel-pause.svg',
};

export const noteOptions: QuizOption[] = Object.entries(NotesEnum).map(([id, name]) => ({ id, name })) as QuizOption[];

export const rhythmOptions: QuizOption[] = Object.entries(RhythmEnum).map(([id, name]) => ({
  id,
  name,
  iconPath: rhythmIconPaths[name],
})) as QuizOption[];

export const chordOptions: QuizOption[] = Object.entries(ChordsEnum).map(([id, name]) => ({
  id,
  name,
})) as QuizOption[];

export const intervalOptions: QuizOption[] = Object.entries(IntervalsEnum).map(([id, name]) => ({
  id,
  name,
})) as QuizOption[];

export const quizOptions: Record<QuizVariant, QuizOption[]> = {
  [QuizVariant.NOTES]: noteOptions,
  [QuizVariant.RHYTHM]: rhythmOptions,
  [QuizVariant.CHORDS]: chordOptions,
  [QuizVariant.INTERVALS]: intervalOptions,
};

export const quizVariants: Record<
  QuizVariant,
  { title: string; iconPath: string; smallIconPath: string; path: string }
> = {
  [QuizVariant.NOTES]: {
    title: 'Noten',
    iconPath: 'saxophone.svg',
    smallIconPath: 'saxophone-small.svg',
    path: '/noten',
  },
  [QuizVariant.RHYTHM]: {
    title: 'Rhythmus',
    iconPath: 'drums.svg',
    smallIconPath: 'drums-small.svg',
    path: '/rhythmus',
  },
  [QuizVariant.CHORDS]: {
    title: 'Akkorde',
    iconPath: 'guitar.svg',
    smallIconPath: 'guitar-small.svg',
    path: '/akkorde',
  },
  [QuizVariant.INTERVALS]: {
    title: 'Intervalle',
    iconPath: 'piano.svg',
    smallIconPath: 'piano-small.svg',
    path: '/intervalle',
  },
};

export const quizzes: Record<QuizVariant, QuizType[]> = {
  [QuizVariant.NOTES]: [
    {
      id: 'n-1',
      question: 'C-Dur?',
      answer: ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-2',
      question: 'D-Dur?',
      answer: ['D', 'E', 'FIS', 'G', 'A', 'H', 'CIS', 'D'],
      variant: QuizVariant.NOTES,
    },
  ],
  [QuizVariant.RHYTHM]: [
    {
      id: 'r-1',
      question: 'Erste Note und erste Pause abwechselnd',
      answer: ['NOTE_1_1', 'PAUSE_1_1', 'NOTE_1_1', 'PAUSE_1_1'],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: 'r-2',
      question: 'Zweite Note und zweite Pause abwechselnd',
      answer: ['NOTE_1_2', 'PAUSE_1_2', 'NOTE_1_2', 'PAUSE_1_2'],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: 'r-3',
      question: 'Dritte Note und dritte Pause abwechselnd',
      answer: ['NOTE_1_4', 'PAUSE_1_4', 'NOTE_1_4', 'PAUSE_1_4'],
      variant: QuizVariant.RHYTHM,
    },
  ],
  [QuizVariant.CHORDS]: [
    {
      id: 'c-1',
      question: 'Alle Dur Akkorde',
      answer: ['C_DUR', 'F_DUR', 'A_DUR'],
      variant: QuizVariant.CHORDS,
    },
  ],
  [QuizVariant.INTERVALS]: [
    {
      id: 'i-1',
      question: 'Welches Intervall?',
      answer: ['QUINT'],
      variant: QuizVariant.INTERVALS,
      soundFilePath: '/sounds/intervals/quinte.mp3',
    },
  ],
};
