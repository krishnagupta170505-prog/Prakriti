'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { soundManager } from '../../lib/audio';

interface ScanStallScreenProps {
  onBack: () => void;
  onStartQuest: () => void;
}

export const ScanStallScreen: React.FC<ScanStallScreenProps> = ({ onBack, onStartQuest }) => {
  const [liveUrl, setLiveUrl] = useState<string>('https://prakriti.vercel.app');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        setLiveUrl(currentOrigin);
        setCustomUrl(currentOrigin);
      } else {
        setCustomUrl('https://prakriti.vercel.app');
      }
    }
  }, []);

  const handleDownloadPoster = async () => {
    soundManager.playTap();
    if (!posterRef.current) return;

    try {
      setToastMessage('Rendering high-res stall poster...');
      const dataUrl = await toPng(posterRef.current, {
        quality: 0.98,
        pixelRatio: 3,
        backgroundColor: '#f8fafc',
      });
      const link = document.createElement('a');
      link.download = `PRAKRITI-Stall-Poster.png`;
      link.href = dataUrl;
      link.click();
      setToastMessage('Poster downloaded! Ready for printing or display 📸');
      setTimeout(() => setToastMessage(null), 3500);
    } catch {
      setToastMessage('Download failed. Try taking a screenshot.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handlePrint = () => {
    soundManager.playTap();
    window.print();
  };

  const handleCopyLink = async () => {
    soundManager.playTap();
    try {
      await navigator.clipboard.writeText(liveUrl);
      setToastMessage('Website link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 3000);
    } catch {}
  };

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-4xl mx-auto flex flex-col items-center relative z-10">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-label-md shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Header Navigation */}
      <div className="w-full flex justify-between items-center mb-6 max-w-lg">
        <button
          onClick={() => {
            soundManager.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-label-md text-primary glass-panel px-4 py-2 rounded-full border border-white/50 hover:bg-white/60 font-bold active:scale-95"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>BACK</span>
        </button>

        <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-widest">
          COLLEGE STALL QR STANDEE
        </span>
      </div>

      {/* Printable / Displayable Stall Standee Poster */}
      <div
        ref={posterRef}
        className="w-full max-w-md rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white via-surface-container-lowest to-surface-container-low border-2 border-primary/25 shadow-2xl flex flex-col items-center text-center relative overflow-hidden text-on-surface mb-6"
      >
        {/* Subtle decorative sacred ring watermark */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none flex items-center justify-center">
          <svg className="w-[120%] h-[120%]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="100,15 185,150 15,150" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="100,185 185,50 15,50" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo / Badge */}
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm mb-4 relative z-10">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
        </div>

        {/* Brand Heading */}
        <h1 className="font-display-lg text-4xl sm:text-5xl text-primary font-bold tracking-tight mb-2 relative z-10">
          PRAKRITI
        </h1>

        {/* Subheading */}
        <p className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold tracking-wide mb-6 relative z-10">
          WHAT DOES YOUR NATURE SAY ABOUT YOU?
        </p>

        {/* High-Contrast Crisp QR Code Card */}
        <div className="p-5 bg-white rounded-3xl shadow-xl border-2 border-slate-200/80 mb-5 relative z-10 flex flex-col items-center">
          <div className="p-2 bg-white rounded-2xl">
            <QRCodeSVG
              value={liveUrl}
              size={220}
              level="H"
              includeMargin={false}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
          </div>
        </div>

        {/* Action Prompt */}
        <div className="space-y-1.5 mb-4 relative z-10">
          <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary tracking-wide">
            SCAN TO DISCOVER YOUR PRAKRITI
          </h2>
          <p className="font-label-md text-xs sm:text-sm text-secondary font-bold tracking-wider uppercase">
            8 questions • 2 minutes • One interesting result
          </p>
        </div>

        {/* Friendly Invitation */}
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic relative z-10">
          &ldquo;Scan it. Answer honestly. See what you get.&rdquo;
        </p>

        {/* Stall Footer Badge */}
        <div className="mt-6 pt-4 border-t border-primary/15 w-full flex items-center justify-between text-[11px] text-on-surface-variant font-medium relative z-10">
          <span className="flex items-center gap-1 text-primary font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            University Yoga Club Mela
          </span>
          <span className="font-mono text-secondary font-semibold">Free Student Experience</span>
        </div>
      </div>

      {/* URL Verification / Customizer Box */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-white/60 shadow-sm mb-6 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-label-sm text-on-surface-variant font-semibold">QR Destination URL:</span>
          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-primary hover:underline font-bold"
          >
            {isEditingUrl ? 'Done' : 'Change URL'}
          </button>
        </div>

        {isEditingUrl ? (
          <div className="flex gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://your-prakriti.vercel.app"
              className="flex-1 px-3 py-1.5 rounded-xl border border-outline-variant bg-white text-xs font-mono focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => {
                if (customUrl.trim()) {
                  setLiveUrl(customUrl.trim());
                  setIsEditingUrl(false);
                }
              }}
              className="bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              Set
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-surface-container-highest/40 px-3 py-2 rounded-xl text-xs font-mono text-primary font-semibold">
            <span className="truncate mr-2">{liveUrl}</span>
            <button
              onClick={handleCopyLink}
              className="text-on-surface-variant hover:text-primary p-1"
              title="Copy URL"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
            </button>
          </div>
        )}
      </div>

      {/* Stall Action Buttons Strip */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 w-full max-w-lg">
        <button
          onClick={handleDownloadPoster}
          className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-full font-label-md text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          <span>SAVE STALL POSTER (PNG)</span>
        </button>

        <button
          onClick={handlePrint}
          className="glass-panel text-on-surface hover:text-primary px-6 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">print</span>
          <span>PRINT POSTER</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onStartQuest();
          }}
          className="glass-panel text-on-surface hover:text-secondary px-6 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-semibold"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          <span>OPEN QUIZ ON THIS DEVICE</span>
        </button>
      </div>
    </div>
  );
};
