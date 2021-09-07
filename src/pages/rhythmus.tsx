import Quiz from '../components/Quiz';
import GamePage from '../containers/GamePage';
import React from 'react';
import { QuizVariant } from '../data/quizzes';

const RhythmusPage = () => (
  <GamePage showGoBack>
    <Quiz variant={QuizVariant.RHYTHM} />
  </GamePage>
);

export default RhythmusPage;
