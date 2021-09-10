import { ChordsEnum, NotesEnum, QuizOption, QuizType, QuizVariant, RhythmEnum } from '../types/types-and-enums';

export const rhythmIconPaths: Record<RhythmEnum, string> = {
  [RhythmEnum.NOTE_1_1]: 'rhythm/ganze-note.svg',
  [RhythmEnum.NOTE_1_2]: 'rhythm/halbe-note.svg',
  [RhythmEnum.NOTE_1_4]: 'rhythm/viertel-note.svg',
  [RhythmEnum.NOTE_1_8]: 'rhythm/achtel-note.svg',
  [RhythmEnum.NOTE_1_16]: 'rhythm/sechzehntel-note.svg',
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

export const quizOptions: Record<QuizVariant, QuizOption[]> = {
  [QuizVariant.NOTES]: noteOptions,
  [QuizVariant.RHYTHM]: rhythmOptions,
  [QuizVariant.CHORDS]: chordOptions,
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
      question: 'Erster Rhythums',
      answer: ['NOTE_1_1', 'NOTE_1_2', 'NOTE_1_8', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: 'r-2',
      question: 'Zweiter Rhythmus',
      answer: ['NOTE_1_1', 'NOTE_1_2', 'NOTE_1_4', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: 'r-3',
      question: 'Dritter Rhythmus',
      answer: ['PAUSE_1_1', 'NOTE_1_2', 'NOTE_1_8', 'NOTE_1_4'],
      variant: QuizVariant.RHYTHM,
    },
  ],
  [QuizVariant.CHORDS]: [],
};
