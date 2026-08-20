'use client';

import React from 'react';
import { soundManager } from '../../lib/audio';
import { WebGLShader } from '../WebGLShader';

interface LandingHeroProps {
  onStartQuest: () => void;
  onWhatIsPrakriti: () => void;
  onExploreArcade: () => void;
  onOpenScanStall?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartQuest,
  onWhatIsPrakriti,
  onExploreArcade,
  onOpenScanStall,
}) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 pt-16 pb-16 overflow-hidden">
      {/* Interactive WebGL Background Shader from Stitch */}
      <WebGLShader type="elemental" opacity={0.65} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Floating Ethereal Elements Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="relative w-full max-w-[850px] h-full">
          <span className="floating-label absolute top-[16%] left-[8%] font-label-md text-sm md:text-base text-primary/80 tracking-widest uppercase font-bold">
            AKASHA • SPACE
          </span>
          <span className="floating-label absolute top-[26%] right-[10%] font-label-md text-sm md:text-base text-secondary/80 tracking-widest uppercase font-bold">
            VAYU • AIR
          </span>
          <span className="floating-label absolute bottom-[30%] left-[12%] font-label-md text-sm md:text-base text-amber-600/90 tracking-widest uppercase font-bold">
            AGNI • FIRE
          </span>
          <span className="floating-label absolute bottom-[20%] right-[18%] font-label-md text-sm md:text-base text-sky-600/90 tracking-widest uppercase font-bold">
            JALA • WATER
          </span>
          <span className="floating-label absolute top-[46%] left-[4%] font-label-md text-sm md:text-base text-emerald-700/80 tracking-widest uppercase font-bold">
            PRITHVI • EARTH
          </span>
        </div>
      </div>

      {/* Hero Content Glassmorphic Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 md:p-12 text-center max-w-2xl mx-auto mt-2 relative z-20 flex flex-col items-center gap-4 shadow-2xl backdrop-blur-2xl border border-white/60 bg-white/60">
        {/* Decorative mandala icon */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 border border-primary/20 shadow-inner">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
        </div>

        <h2 className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight font-bold">
          PRAKRITI
        </h2>

        <p className="font-headline-sm text-lg sm:text-xl md:text-2xl text-primary font-semibold tracking-wide">
          Ever wondered why you&apos;re just... YOU?
        </p>

        <div className="space-y-2 max-w-lg mx-auto">
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Why do some people overthink everything? Why do some people get hungry every two hours? Why do some love trying new things while others would rather stay comfortable?
          </p>
          <p className="font-body-md text-xs sm:text-sm text-secondary font-medium italic">
            Yoga and Ayurveda have been thinking about these things for a very long time.
          </p>
        </div>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center mt-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onStartQuest();
            }}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-label-md text-sm sm:text-base px-8 py-4 rounded-full btn-glow active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(70,72,212,0.4)] font-bold"
          >
            <span>LET&apos;S FIND YOURS</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onWhatIsPrakriti();
            }}
            className="w-full sm:w-auto bg-white/50 hover:bg-white/80 border border-secondary/40 text-secondary font-label-md text-sm sm:text-base px-6 py-4 rounded-full glass-panel active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 font-semibold"
          >
            <span>SO... WHAT IS PRAKRITI?</span>
          </button>
        </div>

        {/* Secondary helper text */}
        <p className="text-xs font-label-sm text-on-surface-variant font-medium">
          Just 8 questions. No boring test.
        </p>

        {/* Bottom links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-1">
          <button
            onClick={() => {
              soundManager.playTap();
              onExploreArcade();
            }}
            className="text-xs font-label-sm text-on-surface-variant/80 hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest font-semibold"
          >
            <span className="material-symbols-outlined text-sm">casino</span>
            <span>EXPLORE ARCADE GAMES</span>
          </button>

          {onOpenScanStall && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenScanStall();
              }}
              className="text-xs font-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest font-semibold"
            >
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
              <span>STALL QR STANDEE</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtle Underglow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px] z-0 pointer-events-none" />
    </div>
  );
};
