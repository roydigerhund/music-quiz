import Quiz from "../components/Quiz";
import GamePage from "../containers/GamePage";
import React from "react";
import { QuizVariant } from "../data/quizzes";

const NotenPage = () => (
  <GamePage>
    <Quiz variant={QuizVariant.NOTES} />
  </GamePage>
);

export default NotenPage;
