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
  // [QuizVariant.CHORDS]: chordOptions,
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
  // [QuizVariant.CHORDS]: {
  //   title: 'Akkorde',
  //   iconPath: 'guitar.svg',
  //   smallIconPath: 'guitar-small.svg',
  //   path: '/akkorde',
  // },
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
      id: 'n-1-1',
      question: 'Baue eine C-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-2',
      question: 'Baue eine D-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['D', 'E', 'FIS', 'G', 'A', 'H', 'CIS', 'D'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-3',
      question: 'Baue eine E-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['E', 'FIS', 'GIS', 'A', 'H', 'CIS', 'DIS', 'E'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-4',
      question: 'Baue eine F-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-5',
      question: 'Baue eine G-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['G', 'A', 'H', 'C', 'D', 'E', 'FIS', 'G'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-6',
      question: 'Baue eine A-Dur Tonleiter',
      options: ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'],
      answer: ['A', 'H', 'CIS', 'D', 'E', 'FIS', 'GIS', 'A'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-7',
      question: 'Baue eine c-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['C', 'D', 'ES', 'F', 'G', 'AS', 'B', 'C'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-8',
      question: 'Baue eine d-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-9',
      question: 'Baue eine e-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['E', 'FIS', 'G', 'A', 'H', 'C', 'D', 'E'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-10',
      question: 'Baue eine f-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['F', 'G', 'AS', 'B', 'C', 'DES', 'ES', 'F'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-11',
      question: 'Baue eine g-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['G', 'A', 'B', 'C', 'D', 'ES', 'F', 'G'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-12',
      question: 'Baue eine a-Moll Tonleiter',
      options: ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'],
      answer: ['A', 'H', 'C', 'D', 'E', 'F', 'G', 'A'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-2-1',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['A', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/A-Dur.png',
    },

    {
      id: 'n-2-2',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['A', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/a-Moll.png',
    },

    {
      id: 'n-2-3',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['C', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/C-Dur.png',
    },

    {
      id: 'n-2-4',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['C', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/c-Moll.png',
    },

    {
      id: 'n-2-5',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['D', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/D-Dur.png',
    },

    {
      id: 'n-2-6',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['D', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/d-Moll.png',
    },

    {
      id: 'n-2-7',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['E', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/E-Dur.png',
    },

    {
      id: 'n-2-8',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['E', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/e-Moll.png',
    },

    {
      id: 'n-2-9',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['F', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/F-Dur.png',
    },

    {
      id: 'n-2-10',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['F', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/f-Moll.png',
    },

    {
      id: 'n-2-11',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['G', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/G-Dur.png',
    },

    {
      id: 'n-2-12',
      question: 'Benenne die vorgegebene Tonleiter',
      options: ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'],
      answer: ['G', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/g-Moll.png',
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
  // [QuizVariant.CHORDS]: [
  //   {
  //     id: 'c-1',
  //     question: 'Alle Dur Akkorde',
  //     answer: ['C_DUR', 'F_DUR', 'A_DUR'],
  //     variant: QuizVariant.CHORDS,
  //   },
  // ],
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
