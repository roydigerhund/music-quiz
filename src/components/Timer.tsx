import { DateTime, Duration } from 'luxon';
import React, { useEffect } from 'react';
import { useGame } from '../components/contexts/GameContext';

const Timer = () => {
  const [startedAt, setStartedAt] = React.useState<string>();
  const { game } = useGame();

  const setTime = () => {
    const datetime = game?.startedAt && DateTime.fromSeconds(game.startedAt).toRelative();
    if (typeof datetime === 'string') {
      setStartedAt(datetime);
    }
  };

  useEffect(() => {
    setTime();

    const timer = setInterval(() => {
      setTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [game]);

  return <span>{startedAt}</span>;
};

export default Timer;
