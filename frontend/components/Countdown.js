import React, { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const calculateTimeLeft = () => {
    const difference = +new Date('2020-05-16') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className="countdown-time">
        <div className="countdown-time-digit">{timeLeft[interval]}</div>
        <div className="countdown-time-interval">{interval}</div>
      </div>
    );
  });

  return (
    <>
      <div className="countdown">
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <source src="/video/countdown.mp4" type="video/mp4" />
        </video>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    </>
  );
}
