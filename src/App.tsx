import { Router } from '@reach/router';
import React from 'react';
import { Head, Root, Routes } from 'react-static';
import { GameProvider } from './components/contexts/GameContext';
import './dist.css';

const App = () => {
  return (
    <Root>
      <Head>
        <title>Music Quiz</title>
        <meta name="robots" content="index, follow" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Musik Quiz" />
        <meta name="application-name" content="Musik Quiz" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-TileImage" content="/favicons/mstile-150x150.png" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#4f46e5" />
      </Head>
      <GameProvider>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen text-xl font-bold tracking-wide text-white uppercase bg-indigo-600">
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
