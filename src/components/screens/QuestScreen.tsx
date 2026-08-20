'use client';

import React, { useState } from 'react';
import { QUEST_QUESTIONS } from '../../data/questions';
import { QuestionChoice, Question } from '../../types';
import { soundManager } from '../../lib/audio';

interface QuestScreenProps {
  onComplete: (answers: QuestionChoice[]) => void;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ onComplete }) => {
  const [questions] = useState<Question[]>(() => QUEST_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<QuestionChoice[]>([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  // Occasional playful micro-cues as requested in Section 4
  const playfulCues: Record<number, string> = {
    1: "Don't overthink this one.",
    3: 'Okay, this one says a lot.',
    5: 'Your first answer is probably the best one.',
    6: 'Interesting...',
    7: 'Be honest.',
    8: "Okay, we're getting somewhere.",
  };

  const currentCue = playfulCues[currentQ.id];

  const handleSelectChoice = (choiceIdx: number, choice: QuestionChoice, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedChoiceIdx(choiceIdx);
    soundManager.playTap();

    // Trigger particle burst effect at click location
    createParticleBurst(event.currentTarget, event.clientX, event.clientY);

    // Progression delay for responsive feeling
    setTimeout(() => {
      const nextChoices = [...selectedChoices, choice];
      setSelectedChoices(nextChoices);
      setSelectedChoiceIdx(null);

      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(nextChoices);
      }
    }, 380);
  };

  const createParticleBurst = (element: HTMLElement, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none z-30';
      const colors = ['#4648d4', '#7c43ab', '#cb8ffd', '#6063ee'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      element.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 25 + Math.random() * 45;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle
        .animate(
          [
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.9 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
          ],
          {
            duration: 600 + Math.random() * 300,
            easing: 'cubic-bezier(0, .9, .57, 1)',
          }
        )
        .addEventListener('finish', () => particle.remove());
    }
  };

  const formattedNum = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center px-4 md:px-8 py-10 max-w-3xl mx-auto w-full relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none ambient-bg z-0 opacity-60" />

      {/* Quest Header & Circular Mandala Progress */}
      <div className="flex flex-col items-center justify-center mb-4 z-10">
        {currentCue && (
          <span className="bg-primary/10 text-primary text-[11px] font-bold px-3 py-1 rounded-full border border-primary/20 tracking-wider mb-2 animate-fadeIn">
            💬 {currentCue}
          </span>
        )}

        <div className="relative flex items-center justify-center w-18 h-18 mb-1">
          {/* Decorative Progress Arc */}
          <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-surface-container-high"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="100 100"
              strokeWidth="2"
            />
            <path
              className="text-primary transition-all duration-500 ease-out"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={`${progressPercent} 100`}
              strokeLinecap="round"
              strokeWidth="2.8"
            />
          </svg>

          {/* Central Question Counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-body-md text-primary">
            <span className="text-xs font-bold">{formattedNum}</span>
            <div className="w-3.5 h-[1px] bg-outline-variant my-[1px]" />
            <span className="text-[10px] text-on-surface-variant font-medium">{formattedTotal}</span>
          </div>
        </div>
      </div>

      {/* Scenario Card (Glassmorphism Bento Style) */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 md:p-9 mb-5 w-full relative overflow-hidden text-center z-10 shadow-lg border border-white/50 bg-white/60 backdrop-blur-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[40px] z-0 pointer-events-none" />
        <div className="relative z-10">
          <span
            className="material-symbols-outlined text-secondary text-3xl sm:text-4xl mb-3 opacity-80"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {currentQ.icon}
          </span>
          <h3 className="font-headline-md text-xl sm:text-2xl md:text-3xl text-on-surface mb-1 font-bold leading-snug">
            {currentQ.scenario}
          </h3>
        </div>
      </section>

      {/* Answer Choices (Clickable Cards with no A/B/C labels) */}
      <section className="flex flex-col gap-3 w-full max-w-xl mx-auto z-10">
        {currentQ.choices.map((choice, idx) => {
          const isSelected = selectedChoiceIdx === idx;
          return (
            <button
              key={idx}
              onClick={(e) => handleSelectChoice(idx, choice, e)}
              className={`choice-btn group relative w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out flex items-center justify-between overflow-hidden border ${
                isSelected
                  ? 'bg-primary-container/20 border-primary shadow-[0_4px_20px_rgba(70,72,212,0.2)] scale-[1.01]'
                  : 'glass-panel bg-white/50 hover:bg-white/80 border-white/50 hover:border-primary/40 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5 relative z-10 w-full">
                {/* Indicator check icon circle */}
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-outline-variant group-hover:border-primary bg-white/60'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] transition-colors ${
                      isSelected ? 'text-white' : 'text-transparent group-hover:text-primary'
                    }`}
                  >
                    check
                  </span>
                </div>

                {/* Choice Text */}
                <span
                  className={`font-body-md text-sm sm:text-base leading-relaxed ${
                    isSelected ? 'font-bold text-primary' : 'text-on-surface group-hover:text-primary'
                  }`}
                >
                  {choice.text}
                </span>
              </div>

              {/* Shimmer sweep gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            </button>
          );
        })}
      </section>

      {/* Progress navigation hint */}
      <p className="font-label-sm text-xs text-on-surface-variant/70 text-center mt-5 z-10">
        Tap the answer that feels most like you
      </p>
    </div>
  );
};
