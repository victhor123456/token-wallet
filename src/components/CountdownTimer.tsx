import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  endDate: string;
}

function CountdownTimer({ endDate }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-yellow-400">
        <Timer className="w-5 h-5" />
        <span className="font-medium">Presale Ends In</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-slate-700 rounded-lg p-3">
              <span className="text-2xl font-bold">{value}</span>
            </div>
            <span className="text-sm text-slate-400 capitalize">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownTimer;