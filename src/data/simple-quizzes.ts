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

const notesDur: OptionID[] = ['C', 'D', 'E', 'F', 'FIS', 'G', 'A', 'B', 'H'];
const notesScale: OptionID[] = ['C', 'D', 'E', 'F', 'G', 'A', 'DUR'];
const intervalNotes: OptionID[] = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
const intervalNames: OptionID[] = ['PRIME', 'SEKUNDE', 'TERZ', 'QUARTE', 'QUINTE', 'SEXTE', 'SEPTIME', 'OKTAVE'];

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

const simpleNoteQuizzes: QuizType[] = [
  {
    id: 'n-1-1',
    question: 'Baue eine C-Dur Tonleiter',
    options: notesDur,
    answer: ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C'],
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
    id: 'n-2-3',
    question: 'Benenne die vorgegebene Tonleiter',
    options: notesScale,
    answer: ['C', 'DUR'],
    variant: QuizVariant.NOTES,
    imagePath: '/images/notes/C-Dur.png',
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
    id: 'n-2-11',
    question: 'Benenne die vorgegebene Tonleiter',
    options: notesScale,
    answer: ['G', 'DUR'],
    variant: QuizVariant.NOTES,
    imagePath: '/images/notes/G-Dur.png',
  },
];

const simpleIntervalQuizzes: QuizType[] = [
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
    answer: ['TERZ'],
    largeTiles: true,
    variant: QuizVariant.INTERVALS,
    imagePath: '/images/intervals/Terz.png',
  },
  {
    id: 'i-1-8',
    question: 'Benenne das vorgegebene Intervall',
    options: intervalNames,
    answer: ['SEXTE'],
    largeTiles: true,
    variant: QuizVariant.INTERVALS,
    imagePath: '/images/intervals/Sexte.png',
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
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-4',
    question: 'Baue eine Terz mit Grundton C',
    options: intervalNotes,
    answer: ['C', 'E'],
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-4',
    question: 'Baue eine Terz mit Grundton E',
    options: intervalNotes,
    answer: ['E', 'G'],
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-5',
    question: 'Baue eine Quarte mit Grundton H',
    options: intervalNotes,
    answer: ['H', 'E'],
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
    question: 'Baue eine Sexte mit Grundton G',
    options: intervalNotes,
    answer: ['G', 'E'],
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-8',
    question: 'Baue eine Sexte mit Grundton C',
    options: intervalNotes,
    answer: ['C', 'A'],
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-9',
    question: 'Baue eine Septime mit Grundton A',
    options: intervalNotes,
    answer: ['A', 'G'],
    variant: QuizVariant.INTERVALS,
  },
  {
    id: 'i-2-10',
    question: 'Baue eine Oktave mit Grundton G',
    options: intervalNotes,
    answer: ['G', 'G'],
    variant: QuizVariant.INTERVALS,
  },
];

export const quizzes: Record<QuizVariant, QuizType[]> = {
  [QuizVariant.NOTES]: [
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-1` })),
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-2` })),
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-3` })),
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-4` })),
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-5` })),
    ...simpleNoteQuizzes.map((q) => ({ ...q, id: `${q.id}-6` })),
  ],
  [QuizVariant.RHYTHM]: [],
  [QuizVariant.INTERVALS]: [
    ...simpleIntervalQuizzes.map((q) => ({ ...q, id: `${q.id}-1` })),
    ...simpleIntervalQuizzes.map((q) => ({ ...q, id: `${q.id}-2` })),
  ],
};
