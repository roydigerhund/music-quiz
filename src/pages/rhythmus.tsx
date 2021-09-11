import Quiz from '../components/Quiz';
import GamePage from '../containers/GamePage';
import React from 'react';
import { QuizVariant } from '../types/types-and-enums';

const RhythmusPage = () => (
  <GamePage>
    <Quiz variant={QuizVariant.RHYTHM} />
  </GamePage>
);

export default RhythmusPage;
