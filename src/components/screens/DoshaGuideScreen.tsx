'use client';

import React, { useState } from 'react';
import { soundManager } from '../../lib/audio';

export const DoshaGuideScreen: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    VATA: true,
    PITTA: false,
    KAPHA: false,
  });

  const toggleCard = (dosha: string) => {
    soundManager.playTap();
    setExpandedCards((prev) => ({
      ...prev,
      [dosha]: !prev[dosha],
    }));
  };

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-4xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="font-headline-md text-3xl sm:text-4xl text-primary font-bold mb-2">
          The Three Energies
        </h2>
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          According to Ayurveda, everyone has a unique mix of three basic energies: Vata, Pitta, and Kapha. Here’s how they work in everyday life.
        </p>
      </div>

      {/* Dosha Cards Container */}
      <div className="flex flex-col gap-5">
        {/* VATA Card */}
        <div
          onClick={() => toggleCard('VATA')}
          className="glass-panel rounded-3xl p-6 sm:p-7 bg-white/60 backdrop-blur-xl border border-white/50 shadow-md cursor-pointer hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm border border-white/50">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  air
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-2xl font-bold text-primary">VATA</h3>
                <p className="font-label-md text-xs text-secondary font-semibold">The Explorer • Space + Air</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline transition-transform duration-300">
              {expandedCards.VATA ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>

          {expandedCards.VATA && (
            <div className="pt-4 border-t border-white/40 mt-4 space-y-4 text-xs sm:text-sm animate-fadeIn">
              <div>
                <h4 className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold mb-1.5">
                  Elements
                </h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full font-label-md text-primary font-semibold">
                    Space (Akasha)
                  </span>
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full font-label-md text-primary font-semibold">
                    Air (Vayu)
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold mb-1.5">
                  Your Vibe
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Your mind likes to keep moving. You love creative ideas, spontaneous plans, and trying new things.
                </p>
              </div>

              <div className="bg-surface-container/60 p-4 rounded-2xl border border-white/30">
                <h4 className="font-label-sm text-xs text-secondary uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">balance</span>
                  Your Little Reminder
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Slow down sometimes. You don&apos;t need something new every minute. A little routine and quiet rest can feel really good.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* PITTA Card */}
        <div
          onClick={() => toggleCard('PITTA')}
          className="glass-panel rounded-3xl p-6 sm:p-7 bg-white/60 backdrop-blur-xl border border-white/50 shadow-md cursor-pointer hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shadow-sm border border-white/50">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-2xl font-bold text-secondary">PITTA</h3>
                <p className="font-label-md text-xs text-secondary font-semibold">The Transformer • Fire</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline transition-transform duration-300">
              {expandedCards.PITTA ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>

          {expandedCards.PITTA && (
            <div className="pt-4 border-t border-white/40 mt-4 space-y-4 text-xs sm:text-sm animate-fadeIn">
              <div>
                <h4 className="font-label-sm text-xs text-secondary uppercase tracking-widest font-bold mb-1.5">
                  Elements
                </h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-secondary-fixed rounded-full font-label-md text-secondary font-semibold">
                    Fire (Agni)
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-label-sm text-xs text-secondary uppercase tracking-widest font-bold mb-1.5">
                  Your Vibe
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  You like getting things done. When something matters to you, you can really lock in and focus.
                </p>
              </div>

              <div className="bg-surface-container/60 p-4 rounded-2xl border border-white/30">
                <h4 className="font-label-sm text-xs text-amber-700 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">balance</span>
                  Your Little Reminder
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  You don’t have to win everything. Take breaks before you run out of energy. Sometimes slowing down is also progress.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* KAPHA Card */}
        <div
          onClick={() => toggleCard('KAPHA')}
          className="glass-panel rounded-3xl p-6 sm:p-7 bg-white/60 backdrop-blur-xl border border-white/50 shadow-md cursor-pointer hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-600/15 flex items-center justify-center text-teal-700 shadow-sm border border-white/50">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  water_drop
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-2xl font-bold text-teal-800">KAPHA</h3>
                <p className="font-label-md text-xs text-teal-700 font-semibold">The Anchor • Water + Earth</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline transition-transform duration-300">
              {expandedCards.KAPHA ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>

          {expandedCards.KAPHA && (
            <div className="pt-4 border-t border-white/40 mt-4 space-y-4 text-xs sm:text-sm animate-fadeIn">
              <div>
                <h4 className="font-label-sm text-xs text-teal-700 uppercase tracking-widest font-bold mb-1.5">
                  Elements
                </h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-tertiary-fixed rounded-full font-label-md text-teal-800 font-semibold">
                    Water (Jala)
                  </span>
                  <span className="px-3 py-1 bg-tertiary-fixed rounded-full font-label-md text-teal-800 font-semibold">
                    Earth (Prithvi)
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-label-sm text-xs text-teal-700 uppercase tracking-widest font-bold mb-1.5">
                  Your Vibe
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  You are naturally calm, patient, and loyal. You value your comfort and the people you care about.
                </p>
              </div>

              <div className="bg-surface-container/60 p-4 rounded-2xl border border-white/30">
                <h4 className="font-label-sm text-xs text-secondary uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">balance</span>
                  Your Little Reminder
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Comfort feels good, but don’t stay in your room forever! Movement, fresh air, and new challenges help you feel alive.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('quest');
          }}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-label-md text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span>TAKE THE 8-QUESTION QUIZ</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
