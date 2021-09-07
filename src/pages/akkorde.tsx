import Quiz from "../components/Quiz";
import GamePage from "../containers/GamePage";
import React from "react";
import { QuizVariant } from "../data/quizzes";

const AkkordePage = () => (
  <GamePage showGoBack>
    <Quiz variant={QuizVariant.CHORDS} />
  </GamePage>
);

export default AkkordePage;
