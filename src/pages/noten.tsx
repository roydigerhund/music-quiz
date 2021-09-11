import Quiz from "../components/Quiz";
import GamePage from "../containers/GamePage";
import React from "react";
import { QuizVariant } from "../types/types-and-enums";

const NotenPage = () => (
  <GamePage>
    <Quiz variant={QuizVariant.NOTES} />
  </GamePage>
);

export default NotenPage;
