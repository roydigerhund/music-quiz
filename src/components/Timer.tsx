import { DateTime, Duration } from 'luxon';
import React, { useEffect } from 'react';
import { useGame } from '../components/contexts/GameContext';

const Timer = () => {
  const [startedAt, setStartedAt] = React.useState<string>();
  const { game } = useGame();

  const setTime = () => {
    const currentUnix = Math.floor(Date.now() / 1000);
    const duration = game && currentUnix - game.startedAt;
    const format = duration && duration >= 60 * 60 ? 'hh:mm:ss' : 'mm:ss';
    const datetime = duration && Duration.fromObject({seconds: duration}).toFormat(format);
    if (typeof datetime === 'string') {
      setStartedAt(datetime);
    }
  };

  useEffect(() => {
    setTime();
    
    const timer = setInterval(() => {
      setTime()
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [game]);

  return <span>{startedAt}</span>;
};

export default Timer;
