'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../lib/audio';

interface BreathQuestScreenProps {
  onBack: () => void;
}

export const BreathQuestScreen: React.FC<BreathQuestScreenProps> = ({ onBack }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const totalTime = 30;
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerNextPhase = useCallback(() => {
    // 4s Inhale -> 4s Hold -> 4s Exhale
    setPhase('inhale');
    soundManager.playBreathTone('inhale');

    phaseTimeoutRef.current = setTimeout(() => {
      setPhase('hold');
      soundManager.playBreathTone('hold');

      phaseTimeoutRef.current = setTimeout(() => {
        setPhase('exhale');
        soundManager.playBreathTone('exhale');

        phaseTimeoutRef.current = setTimeout(() => {
          triggerNextPhase();
        }, 4000);
      }, 4000);
    }, 4000);
  }, []);

  const handleStart = () => {
    soundManager.playTap();
    setIsRunning(true);
    triggerNextPhase();

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          clearTimeout(phaseTimeoutRef.current!);
          setIsRunning(false);
          setPhase('complete');
          soundManager.playChime();
          try {
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    soundManager.playTap();
    setIsRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  const handleReset = () => {
    soundManager.playTap();
    handlePause();
    setTimeLeft(totalTime);
    setPhase('ready');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, []);

  // Timer ring progress
  const circumference = 2 * Math.PI * 45;
  const strokeOffset = circumference - (timeLeft / totalTime) * circumference;

  const phaseInstruction = {
    ready: { main: 'Okay, enough reading.', sub: 'Let’s actually try something. 30 seconds. That’s it.' },
    inhale: { main: 'Breathe in...', sub: 'Deep, slow breath in (4s)' },
    hold: { main: 'Hold gently...', sub: 'Stay calm and relaxed (4s)' },
    exhale: { main: 'Breathe out...', sub: 'Let all tension go (4s)' },
    complete: { main: 'Nice.', sub: 'See? You just gave your brain a tiny reset.' },
  }[phase];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 py-14 max-w-xl mx-auto w-full relative z-10 text-center">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={() => {
            soundManager.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-label-md text-primary glass-panel px-4 py-2 rounded-full border border-white/50 hover:bg-white/60 active:scale-95 font-bold"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>ARCADE HUB</span>
        </button>

        <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-widest">
          BREATH QUEST
        </span>
      </div>

      {/* Instruction Headers */}
      <div className="h-20 flex flex-col justify-center mb-6">
        <h2 className="font-display-lg text-3xl sm:text-4xl text-on-surface font-bold mb-1 transition-all duration-500">
          {phaseInstruction.main}
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant transition-all duration-500 font-medium">
          {phaseInstruction.sub}
        </p>
      </div>

      {/* Central Breathing Circle Animation */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8">
        {/* Breathing Circle Container with Scale Transforms */}
        <div
          className={`w-44 h-44 rounded-full border-2 border-primary/40 flex items-center justify-center shadow-2xl relative transition-transform duration-[4000ms] ease-in-out ${
            phase === 'inhale' || phase === 'hold'
              ? 'scale-[1.45] bg-primary/20 border-primary shadow-[0_0_50px_rgba(70,72,212,0.35)]'
              : phase === 'exhale'
              ? 'scale-100 bg-secondary/15 border-secondary/40'
              : 'scale-100 bg-white/60'
          }`}
        >
          {/* Concentric expanding ring */}
          <div
            className={`absolute inset-[-15px] rounded-full border border-secondary/30 transition-all duration-[4000ms] ${
              phase === 'inhale' || phase === 'hold' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
            }`}
          />

          <span className="font-label-md text-sm sm:text-base font-bold text-primary tracking-widest uppercase">
            {phase === 'ready' ? 'START' : phase === 'complete' ? 'NICE' : phase.toUpperCase()}
          </span>
        </div>

        {/* Ambient Geometric Decorative Ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 animate-[spin_60s_linear_infinite]"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="95" fill="none" stroke="#4648d4" strokeWidth="0.8" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Timer & Controls Card */}
      <div className="glass-panel rounded-3xl p-6 w-full max-w-sm flex flex-col items-center bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg">
        {/* Circular Countdown Ring */}
        <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="45" fill="transparent" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
            <circle
              cx="48"
              cy="48"
              r="45"
              fill="transparent"
              stroke="#4648d4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span className="absolute font-headline-md text-2xl font-bold text-primary">{timeLeft}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-5 w-full">
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-white/60 transition-all border border-transparent hover:border-white/50 active:scale-95"
            title="Reset Breathing Session"
          >
            <span className="material-symbols-outlined text-2xl">restart_alt</span>
          </button>

          <button
            onClick={isRunning ? handlePause : handleStart}
            className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_25px_rgba(70,72,212,0.45)] hover:shadow-[0_0_35px_rgba(70,72,212,0.6)] transition-all active:scale-95 font-bold"
            title={isRunning ? 'Pause' : 'Start'}
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <div className="w-12 h-12 flex items-center justify-center" />
        </div>
      </div>
    </div>
  );
};
