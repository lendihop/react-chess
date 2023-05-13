import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  const startTimer = () => {
    if(timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div className="timer">
      <button onClick={handleRestart}>Restart game</button>
      <h2>White - {whiteTime}</h2>
      <h2>Black - {blackTime}</h2>
    </div>
  );
};

export default Timer;
