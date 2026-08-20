'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { YOGA_POSES } from '../../data/yogaPoses';
import { YogaPoseChallenge } from '../../types';
import { soundManager } from '../../lib/audio';
import { PoseIllustration } from '../PoseIllustration';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const YogaChallengeScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [poses, setPoses] = useState<YogaPoseChallenge[]>(() => shuffleArray(YOGA_POSES));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPose = poses[currentIndex] || poses[0];
  const total = poses.length;
  const progress = ((currentIndex + 1) / total) * 100;

  const handleSelectChoice = (idx: number) => {
    if (selectedAnswer !== null) return; // Prevent double-clicking

    setSelectedAnswer(idx);
    const isCorrect = idx === currentPose.correctIndex;

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
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);

    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      if (score >= 7) {
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    }
  };

  const handleRestart = () => {
    soundManager.playTap();
    setPoses(shuffleArray(YOGA_POSES));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="glass-panel p-8 rounded-3xl w-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              self_improvement
            </span>
          </div>
          <h2 className="font-display-lg text-3xl font-bold text-primary mb-2">Nice job!</h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-6">
            You got <strong className="text-primary text-lg font-bold">{score}</strong> out of {total} yoga poses.
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
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-4xl mx-auto flex flex-col justify-center relative z-10">
      {/* Top Header & Progress */}
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

        <div className="flex items-center gap-2">
          <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-widest">
            YOGA CHALLENGE
          </span>
          <span className="font-label-sm text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
            {score}/{currentIndex + (selectedAnswer !== null ? 1 : 0)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-end mb-1">
          <span className="font-label-sm text-xs text-on-surface-variant font-medium uppercase tracking-wider">
            Pose {currentIndex + 1} of {total}
          </span>
          <span className="font-label-md text-xs text-primary font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(70,72,212,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Two-Column Challenge Content Area */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
        {/* Left Column: Dedicated Pose Image / Silhouette Card */}
        <div className="w-full flex justify-center">
          <div className="glass-panel rounded-3xl p-3 sm:p-4 w-full aspect-square max-w-[340px] md:max-w-none relative overflow-hidden group shadow-xl bg-white/70 backdrop-blur-2xl border border-white/70 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 z-0 rounded-2xl pointer-events-none" />

            <PoseIllustration
              poseId={currentPose.id}
              sanskritName={currentPose.sanskritName}
              className="w-full h-full"
            />

            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 text-[10px] font-label-md font-bold text-primary shadow-sm">
              POSE #{currentPose.id}
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Interaction Area */}
        <div className="w-full flex flex-col gap-4">
          <div>
            <h1 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface mb-1.5">
              Can you identify this pose?
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed italic mb-3">
              &ldquo;{currentPose.silhouetteDescription}&rdquo;
            </p>

            {/* Hint Toggle */}
            <button
              onClick={() => {
                soundManager.playTap();
                setShowHint(!showHint);
              }}
              className="text-primary hover:underline text-xs font-label-md inline-flex items-center gap-1.5 font-semibold"
            >
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>

            {showHint && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-xs text-amber-800 font-medium mt-2 animate-fadeIn">
                💡 {currentPose.hint}
              </div>
            )}
          </div>

          {/* 4 Choice Buttons */}
          <div className="flex flex-col gap-2.5">
            {currentPose.choices.map((choice, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentPose.correctIndex;
              let btnStyle = 'glass-panel bg-white/60 hover:bg-white/90 border-white/50 text-on-surface hover:border-primary/40';

              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                } else {
                  btnStyle = 'opacity-40 glass-panel border-transparent text-on-surface-variant';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectChoice(idx)}
                  className={`w-full rounded-2xl p-3.5 sm:p-4 flex items-center justify-between text-left transition-all duration-300 font-body-md text-sm sm:text-base active:scale-98 border ${btnStyle}`}
                >
                  <span className="font-semibold">{choice}</span>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${
                      selectedAnswer !== null && isCorrect
                        ? 'border-white bg-white text-emerald-700'
                        : selectedAnswer !== null && isSelected
                        ? 'border-white bg-white text-rose-700'
                        : 'border-outline-variant group-hover:border-primary'
                    }`}
                  >
                    {selectedAnswer !== null && (isCorrect || isSelected) ? (
                      <span className="material-symbols-outlined text-xs">{isCorrect ? 'check' : 'close'}</span>
                    ) : (
                      <span className="material-symbols-outlined text-[10px] text-transparent group-hover:text-primary">check</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Educational Explanation Popup when Answered */}
      {showExplanation && (
        <div className="glass-panel p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-xl animate-fadeIn space-y-3">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-2xl ${
                selectedAnswer === currentPose.correctIndex ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {selectedAnswer === currentPose.correctIndex ? 'verified' : 'info'}
            </span>
            <div>
              <h4 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                {currentPose.sanskritName} ({currentPose.englishName})
              </h4>
              <span className="text-[11px] text-primary font-label-md font-semibold block">
                🌿 Good For: {currentPose.doshaBenefit}
              </span>
            </div>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {currentPose.explanation}
          </p>
          <button
            onClick={handleNext}
            className="w-full bg-primary text-white py-3.5 rounded-full font-label-md text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 font-bold"
          >
            {currentIndex + 1 < total ? 'NEXT POSE' : 'SEE FINAL SCORE'}
          </button>
        </div>
      )}
    </div>
  );
};
