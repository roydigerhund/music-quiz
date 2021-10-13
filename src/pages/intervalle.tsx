import Quiz from "../components/Quiz";
import GamePage from "../containers/GamePage";
import React from "react";
import { QuizVariant } from "../types/types-and-enums";

const AkkordePage = () => (
  <GamePage>
    <Quiz variant={QuizVariant.INTERVALS} />
  </GamePage>
);

export default AkkordePage;
