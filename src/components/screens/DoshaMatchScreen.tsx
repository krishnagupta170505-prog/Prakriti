'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DOSHA_MATCH_ITEMS } from '../../data/doshaMatch';
import { DoshaType, DoshaMatchItem } from '../../types';
import { soundManager } from '../../lib/audio';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const DoshaMatchScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState<DoshaMatchItem[]>(() => shuffleArray(DOSHA_MATCH_ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = items[currentIndex] || items[0];
  const total = items.length;

  const handleMatch = (selectedDosha: DoshaType) => {
    if (feedback !== null) return;

    const isCorrect = selectedDosha === currentItem.correctDosha;

    if (isCorrect) {
      soundManager.playChime();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playTap();
    }

    setFeedback({
      isCorrect,
      explanation: currentItem.explanation,
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < total) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsCompleted(true);
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    }, 1200);
  };

  const handleRestart = () => {
    soundManager.playTap();
    setItems(shuffleArray(DOSHA_MATCH_ITEMS));
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="glass-panel p-8 rounded-3xl w-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              category
            </span>
          </div>
          <h2 className="font-display-lg text-3xl font-bold text-primary mb-2">Nice job!</h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-6">
            You matched <strong className="text-primary text-lg font-bold">{score}</strong> out of {total} items
            correctly!
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
      {/* Header */}
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

      <div className="text-center mb-3">
        <h3 className="font-headline-sm text-base sm:text-lg font-bold text-secondary">
          Can you match the personality to the Prakriti?
        </h3>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden mb-6 backdrop-blur-sm border border-white/20">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Trait Card to Match */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg text-center mb-6 relative overflow-hidden">
        <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">
          {currentItem.category} Characteristic
        </span>
        <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-2 leading-snug">
          &ldquo;{currentItem.trait}&rdquo;
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant font-medium">Which Prakriti does this sound most like?</p>

        {/* Floating Instant Feedback Banner */}
        {feedback && (
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fadeIn ${
              feedback.isCorrect ? 'bg-emerald-950/85 text-white' : 'bg-rose-950/85 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-4xl mb-1">
              {feedback.isCorrect ? 'check_circle' : 'cancel'}
            </span>
            <span className="font-headline-sm text-lg font-bold">
              {feedback.isCorrect ? 'YOU GOT IT!' : `It was ${currentItem.correctDosha}`}
            </span>
            <p className="font-body-md text-xs text-white/90 mt-1 max-w-xs">{feedback.explanation}</p>
          </div>
        )}
      </div>

      {/* 3 Large Matching Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleMatch('VATA')}
          className="p-5 rounded-2xl glass-panel bg-white/60 hover:bg-white/90 border border-white/60 hover:border-primary text-center transition-all active:scale-95 shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">air</span>
          </div>
          <span className="font-headline-sm text-lg font-bold text-primary block">VATA</span>
          <span className="font-label-sm text-[10px] text-on-surface-variant block uppercase font-semibold">Space + Air</span>
        </button>

        <button
          onClick={() => handleMatch('PITTA')}
          className="p-5 rounded-2xl glass-panel bg-white/60 hover:bg-white/90 border border-white/60 hover:border-secondary text-center transition-all active:scale-95 shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-secondary/10 mx-auto flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">local_fire_department</span>
          </div>
          <span className="font-headline-sm text-lg font-bold text-secondary block">PITTA</span>
          <span className="font-label-sm text-[10px] text-on-surface-variant block uppercase font-semibold">Fire</span>
        </button>

        <button
          onClick={() => handleMatch('KAPHA')}
          className="p-5 rounded-2xl glass-panel bg-white/60 hover:bg-white/90 border border-white/60 hover:border-teal-700 text-center transition-all active:scale-95 shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-teal-600/10 mx-auto flex items-center justify-center text-teal-700 mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
          </div>
          <span className="font-headline-sm text-lg font-bold text-teal-800 block">KAPHA</span>
          <span className="font-label-sm text-[10px] text-on-surface-variant block uppercase font-semibold">Water + Earth</span>
        </button>
      </div>
    </div>
  );
};
