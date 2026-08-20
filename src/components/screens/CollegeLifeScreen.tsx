'use client';

import React, { useState } from 'react';
import { COLLEGE_LIFE_CARDS } from '../../data/collegeLife';
import { soundManager } from '../../lib/audio';

export const CollegeLifeScreen: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShareCard = async (text: string) => {
    soundManager.playTap();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'My Prakriti in College',
          text,
          url: window.location.href,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setToastMessage('Copied to clipboard! Share with your friends.');
        setTimeout(() => setToastMessage(null), 3000);
      } catch {}
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-5xl mx-auto relative z-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-label-md shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-fixed-dim/30 border border-white/50 mb-3 backdrop-blur-sm shadow-sm">
          <span className="material-symbols-outlined text-primary text-sm">school</span>
          <span className="font-label-md text-primary tracking-widest uppercase text-xs font-bold">
            CAMPUS RHYTHM
          </span>
        </div>
        <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-primary font-bold mb-2">
          Prakriti in College Life
        </h2>
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          How our natural rhythms show up during assignment week, late-night study sessions, and campus life.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
        {/* VATA Card (Col span 7) */}
        <div className="glass-card md:col-span-7 p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

          <div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-surface-container-low text-primary px-3 py-1 rounded-full font-label-md text-xs font-bold">
                <span className="material-symbols-outlined text-sm">air</span> VATA
              </span>
              <button
                onClick={() => handleShareCard(COLLEGE_LIFE_CARDS[0].shareText)}
                className="material-symbols-outlined text-outline-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-white/40"
                title="Share this Vata card"
              >
                ios_share
              </button>
            </div>

            <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2 relative z-10">
              {COLLEGE_LIFE_CARDS[0].title}
            </h3>
            <p className="font-body-lg text-base sm:text-lg text-primary font-medium italic relative z-10 mb-3">
              {COLLEGE_LIFE_CARDS[0].memeQuote}
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
              {COLLEGE_LIFE_CARDS[0].explanation}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10 border-t border-white/40 pt-3">
            {COLLEGE_LIFE_CARDS[0].tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/80 border border-white/50 rounded-full font-label-sm text-xs text-on-surface font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* PITTA Card (Col span 5) */}
        <div className="glass-card md:col-span-5 p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -ml-6 -mb-6 pointer-events-none" />

          <div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-surface-container-low text-secondary px-3 py-1 rounded-full font-label-md text-xs font-bold">
                <span className="material-symbols-outlined text-sm">local_fire_department</span> PITTA
              </span>
              <button
                onClick={() => handleShareCard(COLLEGE_LIFE_CARDS[1].shareText)}
                className="material-symbols-outlined text-outline-variant hover:text-secondary transition-colors p-1.5 rounded-full hover:bg-white/40"
                title="Share this Pitta card"
              >
                ios_share
              </button>
            </div>

            <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2 relative z-10">
              {COLLEGE_LIFE_CARDS[1].title}
            </h3>
            <p className="font-body-lg text-base sm:text-lg text-secondary font-medium italic relative z-10 mb-3">
              {COLLEGE_LIFE_CARDS[1].memeQuote}
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
              {COLLEGE_LIFE_CARDS[1].explanation}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10 border-t border-white/40 pt-3">
            {COLLEGE_LIFE_CARDS[1].tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/80 border border-white/50 rounded-full font-label-sm text-xs text-on-surface font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* KAPHA Card (Col span 12) */}
        <div className="glass-card md:col-span-12 p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full relative z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center gap-1.5 bg-surface-container-low text-teal-800 px-3 py-1 rounded-full font-label-md text-xs font-bold">
                <span className="material-symbols-outlined text-sm">water_drop</span> KAPHA
              </span>
              <button
                onClick={() => handleShareCard(COLLEGE_LIFE_CARDS[2].shareText)}
                className="material-symbols-outlined text-outline-variant hover:text-teal-700 transition-colors p-1.5 rounded-full hover:bg-white/40"
                title="Share this Kapha card"
              >
                ios_share
              </button>
            </div>

            <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2">
              {COLLEGE_LIFE_CARDS[2].title}
            </h3>
            <p className="font-body-lg text-base sm:text-lg text-teal-700 font-medium italic mb-3">
              {COLLEGE_LIFE_CARDS[2].memeQuote}
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mb-4">
              {COLLEGE_LIFE_CARDS[2].explanation}
            </p>

            <div className="flex flex-wrap gap-2">
              {COLLEGE_LIFE_CARDS[2].tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/80 border border-white/50 rounded-full font-label-sm text-xs text-on-surface font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('passport');
          }}
          className="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-full font-label-md text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">badge</span>
          <span>SHOW MY PASSPORT</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('arcade_hub');
          }}
          className="glass-panel text-on-surface hover:text-primary px-6 py-3 rounded-full font-label-md text-xs sm:text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-bold"
        >
          <span className="material-symbols-outlined text-lg">casino</span>
          <span>PRAKRITI ARCADE</span>
        </button>
      </div>
    </div>
  );
};
