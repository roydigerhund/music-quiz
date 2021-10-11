import { ArrowLeftOutline } from '@graywolfai/react-heroicons';
import React from 'react';
import Button from '../components/Button';
import GamePage from '../containers/GamePage';

const NotFoundPage = () => (
  <GamePage>
    <div className="flex flex-col items-center justify-center h-screen py-8">
      <div className="px-4 mb-12 text-center space-y-2 md:space-y-4">
        <h1 className="text-lg font-bold text-indigo-300 sm:text-xl md:text-2xl">Fehler 404</h1>
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Seite nicht gefunden</h1>
      </div>
      <Button to="/" label="Zur Startseite" leadingIcon={ArrowLeftOutline} />
    </div>
  </GamePage>
);

export default NotFoundPage;
