'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MYTH_OR_FACT_DATA } from '../../data/mythsFacts';
import { soundManager } from '../../lib/audio';

// Fisher-Yates shuffle algorithm for true randomized ordering
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MythOrFactScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState(() => shuffleArray(MYTH_OR_FACT_DATA));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = items[currentIndex] || items[0];
  const total = items.length;

  const handleAnswer = (choice: boolean) => {
    setUserAnswer(choice);
    const isCorrect = choice === currentItem.isFact;

    if (isCorrect) {
      soundManager.playChime();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playTap();
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    soundManager.playTap();
    setShowExplanation(false);
    setUserAnswer(null);

    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleRestart = () => {
    soundManager.playTap();
    setItems(shuffleArray(MYTH_OR_FACT_DATA));
    setCurrentIndex(0);
    setScore(0);
    setShowExplanation(false);
    setUserAnswer(null);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="glass-panel p-8 rounded-3xl w-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <h2 className="font-display-lg text-3xl font-bold text-primary mb-2">Nice job!</h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-6">
            You got <strong className="text-primary text-lg font-bold">{score}</strong> out of {total} on
            Ayurveda Myth or Fact.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="bg-primary text-white py-3.5 rounded-full font-label-md text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined text-lg">replay</span>
              <span>PLAY AGAIN</span>
            </button>
            <button
              onClick={() => {
                soundManager.playTap();
                onBack();
              }}
              className="glass-panel text-on-surface py-3 rounded-full font-label-md text-sm border border-white/60 hover:bg-white/50 active:scale-95 font-semibold"
            >
              BACK TO ARCADE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-xl mx-auto flex flex-col justify-center relative z-10">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={() => {
            soundManager.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-label-md text-primary glass-panel px-3.5 py-1.5 rounded-full border border-white/50 hover:bg-white/60 font-bold"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>ARCADE</span>
        </button>

        <span className="font-label-sm text-xs text-on-surface-variant font-semibold uppercase">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="text-center mb-4">
        <h3 className="font-headline-sm text-base sm:text-lg font-bold text-secondary">
          Okay, but is that actually true?
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden mb-6 backdrop-blur-sm border border-white/20">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(70,72,212,0.4)]"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Main Quiz Card */}
      <div className="glass-panel rounded-3xl w-full p-6 sm:p-10 flex flex-col items-center text-center relative shadow-xl bg-white/60 backdrop-blur-xl border border-white/60 mb-6">
        <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center shadow-md text-primary mb-4 bg-white/80 border border-white">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
        </div>

        <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-8 leading-snug">
          &ldquo;{currentItem.statement}&rdquo;
        </h2>

        {/* Action Buttons */}
        <div className="flex w-full gap-4">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-4 rounded-2xl glass-panel text-on-surface font-label-md text-sm sm:text-base hover:bg-white/90 transition-all border-2 border-transparent hover:border-rose-400 shadow-sm flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span className="material-symbols-outlined text-rose-600 font-bold text-lg">close</span>
            <span className="font-bold tracking-wider">MYTH</span>
          </button>

          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-4 rounded-2xl bg-primary text-white font-label-md text-sm sm:text-base hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span className="material-symbols-outlined text-white font-bold text-lg">check</span>
            <span className="font-bold tracking-wider">FACT</span>
          </button>
        </div>
      </div>

      {/* Explanation Modal Overlay */}
      {showExplanation && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center bg-white/95 backdrop-blur-2xl border border-white shadow-2xl animate-fadeIn">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                userAnswer === currentItem.isFact ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {userAnswer === currentItem.isFact ? 'verified' : 'lightbulb'}
              </span>
            </div>

            <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-1">
              It&apos;s a {currentItem.isFact ? 'FACT' : 'MYTH'}!
            </h3>
            <p className="font-label-sm text-xs text-primary font-semibold uppercase tracking-wider mb-3">
              {userAnswer === currentItem.isFact ? '✓ You got it!' : 'Good to know!'}
            </p>

            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
              {currentItem.explanation}
            </p>

            <div className="w-full bg-surface-container-high/40 p-3 rounded-xl text-xs text-on-surface font-medium mb-6">
              💡 {currentItem.takeaway}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-full bg-primary text-white font-label-md text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 font-bold"
            >
              {currentIndex + 1 < total ? 'NEXT' : 'SEE FINAL SCORE'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
