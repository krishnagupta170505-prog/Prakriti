'use client';

import React, { useState, useEffect } from 'react';
import { soundManager } from '../lib/audio';
import { StallModeBar } from './StallModeBar';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isStallMode: boolean;
  onToggleStallMode: () => void;
  onResetSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  isStallMode,
  onToggleStallMode,
  onResetSession,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playTap();
    }
  };

  const isLinearScreen = ['quest', 'analyzing', 'breath_quest', 'yoga_challenge', 'myth_fact', 'dosha_match'].includes(
    currentScreen
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col shadow-sm">
      {/* Top App Bar with clean frosted glass background */}
      <header className="w-full px-4 md:px-10 py-3 flex justify-between items-center bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-white/40 transition-all duration-300">
        {/* Leading action: Back or Home */}
        <div className="flex items-center gap-2">
          {isLinearScreen ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigate('arcade_hub');
              }}
              className="text-primary hover:text-primary/80 transition-all active:scale-95 p-2 rounded-full hover:bg-white/40 flex items-center gap-1.5"
              aria-label="Back to Hub"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              <span className="font-label-sm hidden sm:inline uppercase tracking-wider text-xs font-semibold">Exit</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigate('landing');
              }}
              className="text-primary hover:text-primary/80 cursor-pointer active:scale-95 duration-300 p-2 rounded-full hover:bg-white/40 flex items-center gap-1.5"
              aria-label="Home"
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                settings_heart
              </span>
            </button>
          )}
        </div>

        {/* Brand Title */}
        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('landing');
          }}
          className="text-center group active:scale-95 transition-transform"
        >
          <h1 className="font-display-lg text-2xl md:text-3xl tracking-tighter text-primary group-hover:opacity-90 transition-opacity font-bold">
            PRAKRITI
          </h1>
        </button>

        {/* Trailing Actions: QR Standee, Stall Mode, Sound Mute, Avatar */}
        <div className="flex items-center gap-2 md:gap-2.5">
          {/* Quick QR Standee Poster button */}
          <button
            onClick={() => {
              soundManager.playTap();
              onNavigate('scan_stall');
            }}
            className={`p-2 rounded-full transition-all active:scale-95 flex items-center justify-center ${
              currentScreen === 'scan_stall'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-white/40'
            }`}
            title="Open Stall QR Standee"
            aria-label="Stall QR Standee"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/40 transition-all active:scale-95 flex items-center justify-center"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Sound"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Stall Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleStallMode();
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-label-md transition-all active:scale-95 flex items-center gap-1.5 border ${
              isStallMode
                ? 'bg-amber-500/20 text-amber-700 border-amber-500/50 shadow-sm font-bold'
                : 'glass-panel text-on-surface-variant border-white/50 hover:text-primary'
            }`}
            title="Toggle College Mela Kiosk Stall Mode"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span className="hidden sm:inline font-semibold">{isStallMode ? 'STALL MODE ON' : 'STALL MODE'}</span>
          </button>

          {/* Mandala Profile Avatar */}
          <button
            onClick={() => {
              soundManager.playTap();
              onNavigate('passport');
            }}
            className="cursor-pointer active:scale-95 duration-300 hover:opacity-80 transition-opacity rounded-full overflow-hidden w-9 h-9 border border-white/60 shadow-sm flex-shrink-0"
            title="View Your Prakriti Passport"
          >
            <img
              alt="Mandala Logo"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5av-4gZcWPsWwuQyWf2fO9opQV1Hee8bTO_hNTrKKR0MBS0OCK46v_7fYpZyMpxBnFyixbQ2wvvCDrcD7ZXZlvxiZuRPaBGBK1gOP-7-DprcuoWPeblhhxqg3DkZHIWzevSOVVaCdlxL0Xj7XmK9pKCrAIBDUma1SevHxrBGfRY96e3nR9kez98puaWKzjpm1M00DJN0DDuupS44hpOpIPGXvYViDv-vfaHM0nhJTvOa1vFct0bQm3A"
            />
          </button>
        </div>
      </header>

      {/* Sub-banner rendered directly beneath the header */}
      <StallModeBar
        isActive={isStallMode}
        onReset={onResetSession}
        onExitStallMode={onToggleStallMode}
        onOpenScanStall={() => onNavigate('scan_stall')}
      />
    </div>
  );
};
