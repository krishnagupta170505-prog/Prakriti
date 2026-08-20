'use client';

import React, { useEffect, useState } from 'react';
import { soundManager } from '../../lib/audio';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    'Connecting the dots...',
    'Looking for your pattern...',
    'Almost there...',
    'Meet your Prakriti.',
  ];

  useEffect(() => {
    soundManager.playBreathTone('inhale');

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 750);

    const timer = setTimeout(() => {
      soundManager.playSingingBowl();
      onComplete();
    }, 3200);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative overflow-hidden text-center">
      {/* Central Rotating Mandala and Sacred Geometry */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-6">
        {/* Pulsing Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-amber-500/20 blur-2xl animate-pulse" />

        {/* Outer Rotating Sacred Ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite] opacity-60 text-primary"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <polygon
            points="100,15 185,150 15,150"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <polygon
            points="100,185 185,50 15,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Inner Counter-Rotating Ring */}
        <svg
          className="absolute inset-4 w-56 h-56 animate-[spin_10s_linear_infinite_reverse] opacity-80 text-secondary"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Center Glowing Core */}
        <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center bg-white/70 border border-white shadow-xl relative z-10">
          <span
            className="material-symbols-outlined text-3xl text-primary animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            spa
          </span>
        </div>
      </div>

      {/* Human Narrative Sequence */}
      <p className="font-label-md text-xs sm:text-sm text-secondary tracking-[0.2em] uppercase font-bold mb-2 animate-fadeIn">
        OKAY... WE&apos;VE GOT YOUR ANSWERS.
      </p>

      <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight font-bold mb-3 animate-fadeIn">
        Now let&apos;s see what they say about you.
      </h2>

      {/* Dynamic Animated Status Step */}
      <div className="h-8 flex items-center justify-center">
        <span className="font-body-md text-sm sm:text-base text-on-surface-variant font-medium transition-all duration-300">
          {steps[step]}
        </span>
      </div>

      {/* Floating Animated Dosha Badges */}
      <div className="flex gap-2.5 sm:gap-3 mt-6">
        <span
          className="font-label-sm text-xs px-3.5 py-1.5 rounded-full bg-white/60 border border-primary/30 text-primary font-bold shadow-sm backdrop-blur-md animate-bounce"
          style={{ animationDelay: '0ms' }}
        >
          💨 VATA
        </span>
        <span
          className="font-label-sm text-xs px-3.5 py-1.5 rounded-full bg-white/60 border border-secondary/30 text-secondary font-bold shadow-sm backdrop-blur-md animate-bounce"
          style={{ animationDelay: '150ms' }}
        >
          🔥 PITTA
        </span>
        <span
          className="font-label-sm text-xs px-3.5 py-1.5 rounded-full bg-white/60 border border-teal-600/30 text-teal-700 font-bold shadow-sm backdrop-blur-md animate-bounce"
          style={{ animationDelay: '300ms' }}
        >
          💧 KAPHA
        </span>
      </div>
    </div>
  );
};
