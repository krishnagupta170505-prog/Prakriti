'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { soundManager } from '../lib/audio';

interface StallModeBarProps {
  isActive: boolean;
  onReset: () => void;
  onExitStallMode: () => void;
  onOpenScanStall?: () => void;
}

export const StallModeBar: React.FC<StallModeBarProps> = ({
  isActive,
  onReset,
  onExitStallMode,
  onOpenScanStall,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (!isActive) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCountdown(null);

    // 60 seconds of idle starts a 10-second countdown
    timerRef.current = setTimeout(() => {
      let secondsLeft = 10;
      setCountdown(secondsLeft);

      countdownIntervalRef.current = setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setCountdown(null);
          onReset();
        } else {
          setCountdown(secondsLeft);
        }
      }, 1000);
    }, 60000);
  }, [isActive, onReset]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setCountdown(null);
      return;
    }

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleActivity = () => resetInactivityTimer();

    activityEvents.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));
    resetInactivityTimer();

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isActive, resetInactivityTimer]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isActive) return null;

  return (
    <>
      {/* Sub-banner rendered cleanly in flow directly below the header */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 md:px-10 py-1.5 flex justify-between items-center text-xs font-semibold shadow-inner border-b border-amber-600/30">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <span className="tracking-wider uppercase text-[11px] sm:text-xs font-bold">
            STALL MODE <span className="hidden sm:inline">• COLLEGE MELA KIOSK</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenScanStall && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenScanStall();
              }}
              className="px-2.5 py-1 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center gap-1 transition-colors text-[11px] sm:text-xs font-bold"
              title="Open Printable / Display Stall QR Standee"
            >
              <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
              <span>QR STANDEE</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              toggleFullscreen();
            }}
            className="px-2.5 py-1 rounded-full bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 flex items-center gap-1 transition-colors text-[11px] sm:text-xs font-medium"
            title="Toggle Fullscreen"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
            <span className="hidden md:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onReset();
            }}
            className="bg-slate-950 hover:bg-slate-800 text-white px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-sm transition-all flex items-center gap-1 active:scale-95"
            title="Reset for next participant"
          >
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            <span>NEXT STUDENT</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onExitStallMode();
            }}
            className="text-slate-950/70 hover:text-slate-950 p-1 rounded-full hover:bg-slate-950/10 transition-colors flex items-center justify-center"
            title="Exit Stall Mode"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      {/* Inactivity Warning Modal */}
      {countdown !== null && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-sm w-full p-6 sm:p-8 rounded-3xl text-center shadow-2xl border-amber-500/40 bg-white/95 text-on-surface animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl animate-bounce">timer</span>
            </div>
            <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface mb-2">Still Playing?</h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Inactivity detected. Resetting to home screen for the next university student in{' '}
              <strong className="text-primary text-xl font-bold">{countdown}s</strong>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  soundManager.playTap();
                  resetInactivityTimer();
                }}
                className="flex-1 bg-primary text-white py-3 rounded-full font-label-md text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95"
              >
                I&apos;M STILL HERE
              </button>
              <button
                onClick={() => {
                  soundManager.playTap();
                  onReset();
                }}
                className="px-4 py-3 rounded-full border border-outline-variant text-on-surface hover:bg-white/60 font-label-md text-xs sm:text-sm font-semibold active:scale-95"
              >
                RESET NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
