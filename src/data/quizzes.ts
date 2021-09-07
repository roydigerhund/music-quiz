export enum NotesEnum {
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  A = "A",
  H = "H",
}

export enum RhythmEnum {
  NOTE_1_1 = "Note 1/1",
  NOTE_1_2 = "Note 1/2",
  NOTE_1_3 = "Note 1/3",
  NOTE_1_4 = "Note 1/4",
  PAUSE_1_1 = "Pause 1/1",
  PAUSE_1_2 = "Pause 1/2",
  PAUSE_1_3 = "Pause 1/3",
  PAUSE_1_4 = "Pause 1/4",
}

export enum ChordsEnum {
  NOTE_1_1 = "Note 1/1",
  NOTE_1_2 = "Note 1/2",
  NOTE_1_3 = "Note 1/3",
  NOTE_1_4 = "Note 1/4",
  PAUSE_1_1 = "Pause 1/1",
  PAUSE_1_2 = "Pause 1/2",
  PAUSE_1_3 = "Pause 1/3",
  PAUSE_1_4 = "Pause 1/4",
}

export enum QuizVariant {
  NOTES = "Notes",
  RHYTHM = "Rhythm",
  CHORDS = "Chords",
}

export type ID = string;

export type OptionID =
  | keyof typeof NotesEnum
  | keyof typeof RhythmEnum
  | keyof typeof ChordsEnum;
export type OptionName = NotesEnum | RhythmEnum | ChordsEnum;

export type Option = {
  id: OptionID;
  name: OptionName;
};

export type QuizType = {
  id: ID;
  options: Option[];
  question: string;
  answer: OptionID[];
  variant: QuizVariant;
};

export const noteOptions: Option[] = Object.entries(NotesEnum).map(
  ([id, name]) => ({ id, name })
) as Option[];

export const rhythmOptions: Option[] = Object.entries(RhythmEnum).map(
  ([id, name]) => ({ id, name })
) as Option[];

export const chordOptions: Option[] = Object.entries(ChordsEnum).map(
  ([id, name]) => ({ id, name })
) as Option[];

export const quizzes: Record<QuizVariant, QuizType[]> = {
  [QuizVariant.NOTES]: [
    {
      id: "n-1",
      options: noteOptions,
      question: "Was ist die Matz'sche Tonleiter?",
      answer: ["A", "D", "G", "H", "C", "G"],
      variant: QuizVariant.NOTES,
    },
    {
      id: "n-2",
      options: noteOptions,
      question: "Was ist die Lukas'sche Tonleiter?",
      answer: ["A", "E", "F", "G", "C"],
      variant: QuizVariant.NOTES,
    },
  ],
  [QuizVariant.RHYTHM]: [
    {
      id: "r-1",
      options: rhythmOptions,
      question: "Erster Rhythums",
      answer: ["NOTE_1_1", "NOTE_1_2", "NOTE_1_3", "NOTE_1_4"],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: "r-2",
      options: rhythmOptions,
      question: "Zweiter Rhythmus",
      answer: ["NOTE_1_1", "PAUSE_1_2", "PAUSE_1_3", "NOTE_1_4"],
      variant: QuizVariant.RHYTHM,
    },
    {
      id: "r-3",
      options: rhythmOptions,
      question: "Dritter Rhythmus",
      answer: ["PAUSE_1_1", "NOTE_1_2", "NOTE_1_3", "PAUSE_1_4"],
      variant: QuizVariant.RHYTHM,
    },
  ],
  [QuizVariant.CHORDS]: [],
};
