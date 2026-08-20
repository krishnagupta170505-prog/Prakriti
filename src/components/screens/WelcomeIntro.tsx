'use client';

import React from 'react';
import { soundManager } from '../../lib/audio';

interface WelcomeIntroProps {
  onStartQuest: () => void;
  onSelectDosha?: (dosha: 'VATA' | 'PITTA' | 'KAPHA') => void;
}

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onStartQuest, onSelectDosha }) => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 py-14 relative">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-secondary-fixed/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-surface-container-high/60 blur-[120px]" />
      </div>

      <main className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Glassmorphic Welcome Card */}
        <div className="glass-panel rounded-3xl w-full p-6 sm:p-10 md:p-12 flex flex-col items-center text-center shadow-xl relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50">
          {/* Subtle geometric mandala accent */}
          <svg
            className="absolute -top-10 -right-10 w-40 h-40 text-primary/5 rotate-45 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45L50 0Z" />
          </svg>

          {/* Header */}
          <h1 className="font-headline-md text-3xl sm:text-4xl md:text-5xl text-primary tracking-tight mb-3 font-bold">
            Okay, let&apos;s figure you out.
          </h1>

          {/* Conversational Context */}
          <div className="space-y-2 max-w-2xl mb-8 text-on-surface-variant text-base sm:text-lg leading-relaxed">
            <p>
              Answer honestly. Don&apos;t choose what sounds better — choose what actually sounds like you.
            </p>
            <p className="text-sm sm:text-base font-medium text-secondary">
              There&apos;s no good or bad result here. Just go with your first instinct.
            </p>
          </div>

          {/* Interactive Elements Grid (3 Dosha Archetypes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-8">
            {/* VATA Card */}
            <div
              onClick={() => {
                soundManager.playTap();
                if (onSelectDosha) onSelectDosha('VATA');
              }}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/80 hover:scale-[1.02] transition-all duration-300 border border-white/50 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-3 transition-colors group-hover:bg-primary-fixed">
                <span
                  className="material-symbols-outlined text-[32px] text-primary transition-colors"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  air
                </span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-0.5">VATA</h3>
              <p className="font-label-sm text-xs text-primary tracking-widest uppercase font-bold">THE EXPLORER</p>
              <p className="font-label-sm text-[11px] text-secondary font-semibold uppercase">Space + Air</p>
              <p className="font-body-md text-xs text-on-surface-variant mt-2.5 text-center leading-relaxed">
                Mind always on the move, lots of ideas, spontaneous and curious.
              </p>
            </div>

            {/* PITTA Card */}
            <div
              onClick={() => {
                soundManager.playTap();
                if (onSelectDosha) onSelectDosha('PITTA');
              }}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/80 hover:scale-[1.02] transition-all duration-300 border border-white/50 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-3 transition-colors group-hover:bg-secondary-fixed">
                <span
                  className="material-symbols-outlined text-[32px] text-secondary transition-colors"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-0.5">PITTA</h3>
              <p className="font-label-sm text-xs text-secondary tracking-widest uppercase font-bold">THE TRANSFORMER</p>
              <p className="font-label-sm text-[11px] text-amber-700 font-semibold uppercase">Fire</p>
              <p className="font-body-md text-xs text-on-surface-variant mt-2.5 text-center leading-relaxed">
                Likes getting things done, focused, determined, and locks in.
              </p>
            </div>

            {/* KAPHA Card */}
            <div
              onClick={() => {
                soundManager.playTap();
                if (onSelectDosha) onSelectDosha('KAPHA');
              }}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/80 hover:scale-[1.02] transition-all duration-300 border border-white/50 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-3 transition-colors group-hover:bg-teal-100">
                <span
                  className="material-symbols-outlined text-[32px] text-teal-700 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-0.5">KAPHA</h3>
              <p className="font-label-sm text-xs text-teal-800 tracking-widest uppercase font-bold">THE ANCHOR</p>
              <p className="font-label-sm text-[11px] text-teal-700 font-semibold uppercase">Water + Earth</p>
              <p className="font-body-md text-xs text-on-surface-variant mt-2.5 text-center leading-relaxed">
                Calm, patient, loyal, and loves being comfortable and steady.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              soundManager.playTap();
              onStartQuest();
            }}
            className="bg-primary text-white font-label-md text-base px-10 py-4 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(70,72,212,0.3)] hover:shadow-[0_0_30px_rgba(70,72,212,0.5)] active:scale-95 group font-bold"
          >
            <span>I&apos;M READY</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          {/* Small honest note */}
          <p className="mt-4 font-label-sm text-xs text-on-surface-variant/70">
            Your result is for fun and learning, not a medical diagnosis.
          </p>
        </div>
      </main>
    </div>
  );
};
