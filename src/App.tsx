import { Router } from '@reach/router';
import React from 'react';
import { Root, Routes } from 'react-static';
import { GameProvider } from './components/contexts/GameContext';
import './dist.css';

const App = () => {
  return (
    <Root>
      <GameProvider>
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center bg-indigo-600 min-h-screen text-xl font-bold text-white uppercase tracking-wide">
              Loading…
            </div>
          }
        >
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
        </GameProvider>
    </Root>
  );
};

export default App;
