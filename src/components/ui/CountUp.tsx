'use client';

import React from 'react';
import CountUp from 'react-countup';

interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
  delay?: number;
  className?: string;
}

export const CountUpComponent: React.FC<CountUpProps> = ({
  end,
  duration = 3,
  start = 0,
  delay = 0,
  className,
}) => {
  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      delay={delay}
      className={className}
    />
  );
};
