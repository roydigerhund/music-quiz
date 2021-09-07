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

export type OptionID = keyof typeof NotesEnum | keyof typeof RhythmEnum;
export type OptionName = NotesEnum | RhythmEnum;

export type Option = {
  id: OptionID;
  name: OptionName;
};

export type QuizType = {
  options: Option[];
  question: string;
  answer: OptionID[];
};

export const noteOptions: Option[] = Object.entries(NotesEnum).map(
  ([id, name]) => ({ id, name })
) as Option[];

export const rhythmOptions: Option[] = Object.entries(RhythmEnum).map(
  ([id, name]) => ({ id, name })
) as Option[];

export const quizzes: QuizType[] = [
  {
    options: rhythmOptions,
    question: "Was ist die Matz'sche Tonleiter?",
    answer: ["NOTE_1_1", "NOTE_1_2", "NOTE_1_3", "NOTE_1_4"],
  },
];
