'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { PrakritiScores } from '../../types';
import { DOSHA_PROFILES, DUAL_ARCHETYPES } from '../../data/doshas';
import { soundManager } from '../../lib/audio';
import { WebGLShader } from '../WebGLShader';

interface RevealScreenProps {
  scores: PrakritiScores;
  onExploreProfile: () => void;
  onViewPassport: () => void;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({ scores, onExploreProfile, onViewPassport }) => {
  const profile = DOSHA_PROFILES[scores.dominant];
  const [userFeedback, setUserFeedback] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#4648d4', '#7c43ab', '#cb8ffd', '#f59e0b'],
      });
    } catch {}
  }, []);

  const dualInfo = scores.isMixed && scores.secondary
    ? DUAL_ARCHETYPES[`${scores.dominant}-${scores.secondary}`] || DUAL_ARCHETYPES[`${scores.secondary}-${scores.dominant}`]
    : null;

  // Selected observations from the user's actual choices
  const observations = scores.selectedObservations && scores.selectedObservations.length > 0
    ? Array.from(new Set(scores.selectedObservations)).slice(0, 5)
    : [
        `You naturally resonate with ${profile.elementSummary} qualities.`,
        `Your responses show a strong alignment with ${profile.archetype.toLowerCase()} energy.`,
        `You feel most balanced when honoring your natural daily rhythm.`,
      ];

  const handleFeedback = (response: 'yes' | 'no') => {
    soundManager.playTap();
    setUserFeedback(response);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 py-10 overflow-hidden">
      {/* Background Shader */}
      <WebGLShader
        type={scores.dominant === 'PITTA' ? 'fire' : 'elemental'}
        opacity={0.65}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Glass Card Container */}
      <main className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center space-y-5">
        <div className="ambient-underglow backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center w-full shadow-2xl relative overflow-hidden">
          {/* Subtle Mandala Watermark */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[280px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4 w-full">
            {/* Header Overline */}
            <div className="space-y-1">
              <p className="font-label-md text-xs sm:text-sm text-secondary tracking-widest uppercase font-bold">
                MEET YOUR PRAKRITI
              </p>
              <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-primary font-bold tracking-tight">
                {profile.leanTitle}
              </h2>
              <h3 className="font-headline-sm text-base sm:text-lg text-on-surface-variant font-semibold">
                {dualInfo ? dualInfo.archetype : profile.archetype} • {profile.elementSummary.toUpperCase()}
              </h3>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary/50 to-transparent my-1" />

            {/* Natural Persona Description */}
            <p className="font-body-md text-sm sm:text-base text-on-surface leading-relaxed max-w-lg font-medium italic">
              &ldquo;{profile.qualities}&rdquo;
            </p>

            {/* Keyword Chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {profile.keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-secondary-container/30 border border-secondary/20 text-on-secondary-container font-label-sm text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md font-bold"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Percentage Breakdown Bar */}
            <div className="w-full bg-white/60 p-4 rounded-2xl border border-white/70 space-y-2 mt-1 shadow-sm">
              <div className="flex justify-between text-xs font-label-md text-on-surface font-semibold">
                <span className="text-primary font-bold">VATA {scores.vataPercentage}%</span>
                <span className="text-secondary font-bold">PITTA {scores.pittaPercentage}%</span>
                <span className="text-teal-700 font-bold">KAPHA {scores.kaphaPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: `${scores.vataPercentage}%` }} className="bg-primary h-full transition-all duration-1000" />
                <div style={{ width: `${scores.pittaPercentage}%` }} className="bg-secondary h-full transition-all duration-1000" />
                <div style={{ width: `${scores.kaphaPercentage}%` }} className="bg-teal-600 h-full transition-all duration-1000" />
              </div>
            </div>

            {/* Dynamic "WHY DID WE GET THIS RESULT?" Section */}
            <div className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/60 text-left mt-2 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                <h4 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                  WHY DID WE GET THIS RESULT?
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                {observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold text-sm leading-none">•</span>
                    <span>&ldquo;{obs}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* "DOES THIS SOUND LIKE YOU?" Confirmation Widget */}
            <div className="w-full bg-surface-container/70 rounded-2xl p-5 border border-white/50 text-center mt-2 shadow-sm">
              <h4 className="font-headline-sm text-xs sm:text-sm font-bold text-on-surface mb-3 tracking-wide">
                DOES THIS SOUND LIKE YOU?
              </h4>

              {userFeedback === null ? (
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleFeedback('yes')}
                    className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-label-md font-bold hover:bg-primary/90 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>YES, THAT&apos;S ME</span>
                  </button>

                  <button
                    onClick={() => handleFeedback('no')}
                    className="px-5 py-2.5 rounded-full glass-panel text-on-surface hover:bg-white/80 text-xs font-label-md font-bold border border-white/60 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_down</span>
                    <span>NOT REALLY</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white/90 p-3 rounded-xl border border-white/60 text-xs font-body-md text-primary font-semibold animate-fadeIn">
                  {userFeedback === 'yes'
                    ? '✨ Looks like we got you. Let’s explore your natural rhythm.'
                    : '🌿 Fair enough. Prakriti is more complex than a quick game, but your answers offer an interesting indicative glimpse!'}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-2 w-full flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  soundManager.playTap();
                  onExploreProfile();
                }}
                className="w-full sm:w-auto bg-primary text-white font-label-md text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(70,72,212,0.35)] hover:shadow-[0_12px_24px_rgba(70,72,212,0.45)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group font-bold"
              >
                <span>SHOW ME MORE</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => {
                  soundManager.playTap();
                  onViewPassport();
                }}
                className="w-full sm:w-auto glass-panel text-on-surface hover:text-primary font-label-md text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/60 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span>SHOW MY PASSPORT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Required Educational Disclaimer */}
        <p className="font-label-sm text-[11px] sm:text-xs text-on-surface-variant/75 text-center max-w-md leading-relaxed">
          This interactive experience provides an educational, game-based indication of Prakriti based on user responses.
          It is not a medical diagnosis and does not replace consultation with a qualified healthcare or Ayurveda professional.
        </p>
      </main>
    </div>
  );
};
