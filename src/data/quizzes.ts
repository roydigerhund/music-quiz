import {
  ChordsEnum,
  IntervalsEnum,
  NotesEnum,
  OptionID,
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
  // [RhythmEnum.PAUSE_1_1]: 'rhythm/ganze-pause.svg',
  // [RhythmEnum.PAUSE_1_2]: 'rhythm/halbe-pause.svg',
  // [RhythmEnum.PAUSE_1_4]: 'rhythm/viertel-pause.svg',
  // [RhythmEnum.PAUSE_1_8]: 'rhythm/achtel-pause.svg',
  // [RhythmEnum.PAUSE_1_16]: 'rhythm/sechzehntel-pause.svg',
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

export const quizOptions: QuizOption[] = [...noteOptions, ...rhythmOptions, ...intervalOptions];

const notesDur: OptionID[] = ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'B', 'H'];
const notesMoll: OptionID[] = ['C', 'DES', 'D', 'ES', 'E', 'F', 'FIS', 'G', 'AS', 'A', 'B', 'H'];
const notesScale: OptionID[] = ['C', 'D', 'E', 'F', 'G', 'A', 'DUR', 'MOLL'];
const intervalNotes: OptionID[] = [
  'C',
  'CIS',
  'DES',
  'D',
  'DIS',
  'ES',
  'E',
  'F',
  'FIS',
  'G',
  'GIS',
  'AS',
  'A',
  'B',
  'H',
];
const intervalNames: OptionID[] = [
  'PRIME',
  'SEKUNDE',
  'KLEINE_TERZ',
  'GROSSE_TERZ',
  'QUARTE',
  'QUINTE',
  'KLEINE_SEXTE',
  'GROSSE_SEXTE',
  'SEPTIME',
  'OKTAVE',
];
const rhythmNotes: OptionID[] = [
  'NOTE_1_1',
  'NOTE_1_2',
  'NOTE_1_4',
  'NOTE_1_8',
  'NOTE_1_16',
  'TRIOLE_1_4',
  'TRIOLE_1_8',
];

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
      options: notesDur,
      answer: ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-2',
      question: 'Baue eine D-Dur Tonleiter',
      options: notesDur,
      answer: ['D', 'E', 'FIS', 'G', 'A', 'H', 'CIS', 'D'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-3',
      question: 'Baue eine E-Dur Tonleiter',
      options: notesDur,
      answer: ['E', 'FIS', 'GIS', 'A', 'H', 'CIS', 'DIS', 'E'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-4',
      question: 'Baue eine F-Dur Tonleiter',
      options: notesDur,
      answer: ['F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-5',
      question: 'Baue eine G-Dur Tonleiter',
      options: notesDur,
      answer: ['G', 'A', 'H', 'C', 'D', 'E', 'FIS', 'G'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-6',
      question: 'Baue eine A-Dur Tonleiter',
      options: notesDur,
      answer: ['A', 'H', 'CIS', 'D', 'E', 'FIS', 'GIS', 'A'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-7',
      question: 'Baue eine c-Moll Tonleiter',
      options: notesMoll,
      answer: ['C', 'D', 'ES', 'F', 'G', 'AS', 'B', 'C'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-8',
      question: 'Baue eine d-Moll Tonleiter',
      options: notesMoll,
      answer: ['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-9',
      question: 'Baue eine e-Moll Tonleiter',
      options: notesMoll,
      answer: ['E', 'FIS', 'G', 'A', 'H', 'C', 'D', 'E'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-10',
      question: 'Baue eine f-Moll Tonleiter',
      options: notesMoll,
      answer: ['F', 'G', 'AS', 'B', 'C', 'DES', 'ES', 'F'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-11',
      question: 'Baue eine g-Moll Tonleiter',
      options: notesMoll,
      answer: ['G', 'A', 'B', 'C', 'D', 'ES', 'F', 'G'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-1-12',
      question: 'Baue eine a-Moll Tonleiter',
      options: notesMoll,
      answer: ['A', 'H', 'C', 'D', 'E', 'F', 'G', 'A'],
      variant: QuizVariant.NOTES,
    },
    {
      id: 'n-2-1',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['A', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/A-Dur.png',
    },
    {
      id: 'n-2-2',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['A', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/a-Moll.png',
    },
    {
      id: 'n-2-3',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['C', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/C-Dur.png',
    },
    {
      id: 'n-2-4',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['C', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/c-Moll.png',
    },
    {
      id: 'n-2-5',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['D', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/D-Dur.png',
    },
    {
      id: 'n-2-6',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['D', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/d-Moll.png',
    },
    {
      id: 'n-2-7',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['E', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/E-Dur.png',
    },
    {
      id: 'n-2-8',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['E', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/e-Moll.png',
    },
    {
      id: 'n-2-9',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['F', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/F-Dur.png',
    },
    {
      id: 'n-2-10',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['F', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/f-Moll.png',
    },
    {
      id: 'n-2-11',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['G', 'DUR'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/G-Dur.png',
    },
    {
      id: 'n-2-12',
      question: 'Benenne die vorgegebene Tonleiter',
      options: notesScale,
      answer: ['G', 'MOLL'],
      variant: QuizVariant.NOTES,
      imagePath: '/images/notes/g-Moll.png',
    },
  ],
  [QuizVariant.RHYTHM]: [
    {
      id: 'r-1-1',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/1.m4a',
    },
    {
      id: 'r-1-2',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_8', 'NOTE_1_4', 'NOTE_1_8', 'NOTE_1_2'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/2.m4a',
    },
    {
      id: 'r-1-3',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['TRIOLE_1_8', 'NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/3.m4a',
    },
    {
      id: 'r-1-4',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/4.m4a',
    },
    {
      id: 'r-1-5',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_8', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_8'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/5.m4a',
    },
    {
      id: 'r-1-6',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_2', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/6.m4a',
    },
    {
      id: 'r-1-7',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/7.m4a',
    },
    {
      id: 'r-1-8',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_4', 'NOTE_1_4', 'NOTE_1_4', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/8.m4a',
    },
    {
      id: 'r-1-9',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/9.m4a',
    },
    {
      id: 'r-1-10',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8', 'NOTE_1_4', 'NOTE_1_8', 'NOTE_1_8'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/10.m4a',
    },
    {
      id: 'r-1-11',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['TRIOLE_1_4', 'NOTE_1_4', 'NOTE_1_4', 'NOTE_1_2'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/11.m4a',
    },
    {
      id: 'r-1-12',
      question: 'Notiere den gehörten Rhythmus',
      options: rhythmNotes,
      answer: ['NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_16', 'NOTE_1_4', 'TRIOLE_1_4', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
      soundFilePath: '/sounds/rhythm/12.m4a',
    },
  ],
  [QuizVariant.INTERVALS]: [
    {
      id: 'i-1-1',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['SEPTIME'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Septime.png',
    },
    {
      id: 'i-1-2',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['SEKUNDE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Sekunde.png',
    },
    {
      id: 'i-1-3',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['QUINTE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Quinte.png',
    },
    {
      id: 'i-1-4',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['QUARTE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Quarte.png',
    },
    {
      id: 'i-1-5',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['PRIME'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Prime.png',
    },
    {
      id: 'i-1-6',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['OKTAVE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/Oktave.png',
    },
    {
      id: 'i-1-7',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['KLEINE_TERZ'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/kl-Terz.png',
    },
    {
      id: 'i-1-8',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['KLEINE_SEXTE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/kl-Sexte.png',
    },
    {
      id: 'i-1-9',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['GROSSE_TERZ'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/gr-Terz.png',
    },
    {
      id: 'i-1-10',
      question: 'Benenne das vorgegebene Intervall',
      options: intervalNames,
      answer: ['GROSSE_SEXTE'],
      largeTiles: true,
      variant: QuizVariant.INTERVALS,
      imagePath: '/images/intervals/gr-Sexte.png',
    },
    {
      id: 'i-2-1',
      question: 'Baue eine Prime mit Grundton F',
      options: intervalNotes,
      answer: ['F', 'F'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-2',
      question: 'Baue eine Sekunde mit Grundton D',
      options: intervalNotes,
      answer: ['D', 'E'],
      optionalAnswers: [
        ['D', 'E'],
        ['D', 'ES'],
      ],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-3',
      question: 'Baue eine kleine Terz mit Grundton C',
      options: intervalNotes,
      answer: ['C', 'ES'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-4',
      question: 'Baue eine große Terz mit Grundton E',
      options: intervalNotes,
      answer: ['E', 'GIS'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-5',
      question: 'Baue eine Quarte mit Grundton B',
      options: intervalNotes,
      answer: ['B', 'ES'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-6',
      question: 'Baue eine Quinte mit Grundton D',
      options: intervalNotes,
      answer: ['D', 'A'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-7',
      question: 'Baue eine kleine Sexte mit Grundton G',
      options: intervalNotes,
      answer: ['G', 'ES'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-8',
      question: 'Baue eine große Sexte mit Grundton C',
      options: intervalNotes,
      answer: ['C', 'A'],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-9',
      question: 'Baue eine Septime mit Grundton A',
      options: intervalNotes,
      answer: ['A', 'G'],
      optionalAnswers: [
        ['A', 'G'],
        ['A', 'GIS'],
      ],
      variant: QuizVariant.INTERVALS,
    },
    {
      id: 'i-2-10',
      question: 'Baue eine Oktave mit Grundton B',
      options: intervalNotes,
      answer: ['B', 'B'],
      variant: QuizVariant.INTERVALS,
    },
  ],
};
