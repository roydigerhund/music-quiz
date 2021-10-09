import { ArrowLeftOutline } from '@graywolfai/react-heroicons';
import React from 'react';
import Button from '../components/Button';
import GamePage from '../containers/GamePage';

const NotFoundPage = () => (
  <GamePage>
    <div className="flex flex-col justify-center items-center h-screen py-8">
      <div className="text-center mb-12 px-4 space-y-2 md:space-y-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-300">Fehler 404</h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Seite nicht gefunden</h1>
      </div>
      <Button to="/" label="Zur Startseite" leadingIcon={ArrowLeftOutline} />
    </div>
  </GamePage>
);

export default NotFoundPage;
