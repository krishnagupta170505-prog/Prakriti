'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { PrakritiScores } from '../../types';
import { DOSHA_PROFILES, DUAL_ARCHETYPES } from '../../data/doshas';
import { storage } from '../../lib/storage';
import { soundManager } from '../../lib/audio';

interface PassportScreenProps {
  scores: PrakritiScores | null;
  onRetakeQuest: () => void;
  onNavigate: (screen: string) => void;
}

export const PassportScreen: React.FC<PassportScreenProps> = ({ scores, onRetakeQuest, onNavigate }) => {
  const [userName, setUserName] = useState<string>(storage.getUserName());
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const passportCardRef = useRef<HTMLDivElement | null>(null);

  // Safe fallback scores
  const safeScores: PrakritiScores = scores || {
    vataRaw: 10,
    pittaRaw: 16,
    kaphaRaw: 6,
    vataPercentage: 31,
    pittaPercentage: 50,
    kaphaPercentage: 19,
    dominant: 'PITTA',
    isMixed: false,
    archetype: 'THE TRANSFORMER',
  };

  const profile = DOSHA_PROFILES[safeScores.dominant];
  const dualInfo = safeScores.isMixed && safeScores.secondary
    ? DUAL_ARCHETYPES[`${safeScores.dominant}-${safeScores.secondary}`] || DUAL_ARCHETYPES[`${safeScores.secondary}-${safeScores.dominant}`]
    : null;

  const handleSaveName = (newName: string) => {
    setUserName(newName);
    storage.saveUserName(newName);
    setIsEditingName(false);
  };

  const handleDownloadPassport = async () => {
    soundManager.playTap();
    if (!passportCardRef.current) return;

    try {
      setToastMessage('Saving your passport image...');
      const dataUrl = await toPng(passportCardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Prakriti-Passport-${userName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      setToastMessage('Passport saved! 📸');
      setTimeout(() => setToastMessage(null), 3500);
    } catch {
      setToastMessage('Download unavailable in current browser. Try screenshotting.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleShare = async () => {
    soundManager.playTap();
    const shareText = `🌿 My Prakriti Passport: ${profile.leanTitle} (${profile.archetype}) • Vata: ${safeScores.vataPercentage}%, Pitta: ${safeScores.pittaPercentage}%, Kapha: ${safeScores.kaphaPercentage}%. Find yours at Prakriti!`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s Prakriti Passport`,
          text: shareText,
          url: window.location.href,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setToastMessage('Link & result copied to clipboard!');
        setTimeout(() => setToastMessage(null), 3000);
      } catch {}
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://prakriti-wellness.app';

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-3xl mx-auto relative z-10 flex flex-col items-center">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-label-md shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <span className="font-label-md text-xs text-secondary font-bold uppercase tracking-widest block mb-1">
          OKAY, HERE&apos;S WHAT WE FOUND
        </span>
        <h2 className="font-display-lg text-3xl sm:text-4xl text-primary font-bold">YOUR PRAKRITI PASSPORT</h2>
      </div>

      {/* The Printable / Saveable Passport Card */}
      <div
        ref={passportCardRef}
        className="w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-surface-container-low to-surface-container-high border-2 border-primary/20 shadow-2xl relative overflow-hidden text-on-surface mb-4"
      >
        {/* Subtle Sacred Geometry Watermark Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="100,20 180,140 20,140" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="100,180 180,60 20,60" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Passport Card Header */}
        <div className="flex justify-between items-start border-b border-primary/20 pb-4 mb-5 relative z-10">
          <div>
            <span className="font-label-sm text-[10px] tracking-widest text-primary uppercase font-bold block">
              PRAKRITI WELLNESS PASSPORT
            </span>
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  defaultValue={userName}
                  autoFocus
                  onBlur={(e) => handleSaveName(e.target.value || 'Seeker')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName((e.target as HTMLInputElement).value || 'Seeker');
                  }}
                  className="px-2 py-1 rounded-lg border border-primary text-sm font-bold bg-white text-on-surface focus:outline-none"
                />
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1.5 font-headline-sm text-2xl font-bold text-on-surface hover:text-primary transition-colors text-left"
                title="Click to edit name"
              >
                <span>{userName}</span>
                <span className="material-symbols-outlined text-sm text-outline-variant">edit</span>
              </button>
            )}
            <span className="font-label-sm text-xs text-on-surface-variant">Yoga Club Explorer</span>
          </div>

          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
        </div>

        {/* Constitution Badge & Archetype */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 relative z-10">
          <div className="bg-white/80 p-4 rounded-2xl border border-white/60 shadow-sm">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold block mb-1">
              YOUR TYPE
            </span>
            <div className="font-display-lg text-2xl sm:text-3xl font-bold text-primary mb-1">
              {profile.leanTitle}
            </div>
            <div className="font-label-md text-xs font-semibold text-on-surface-variant">
              {dualInfo ? dualInfo.archetype : profile.archetype}
            </div>
            <div className="text-[11px] text-primary/90 font-bold mt-1 uppercase">
              {profile.elementSummary}
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="bg-white/80 p-4 rounded-2xl border border-white/60 shadow-sm flex flex-col justify-between">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold block mb-1">
              YOUR MIX
            </span>
            <div className="space-y-1.5 my-auto">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-primary font-bold">VATA</span>
                <span>{safeScores.vataPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div style={{ width: `${safeScores.vataPercentage}%` }} className="bg-primary h-full rounded-full" />
              </div>

              <div className="flex justify-between text-xs font-semibold pt-1">
                <span className="text-secondary font-bold">PITTA</span>
                <span>{safeScores.pittaPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div style={{ width: `${safeScores.pittaPercentage}%` }} className="bg-secondary h-full rounded-full" />
              </div>

              <div className="flex justify-between text-xs font-semibold pt-1">
                <span className="text-teal-700 font-bold">KAPHA</span>
                <span>{safeScores.kaphaPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div style={{ width: `${safeScores.kaphaPercentage}%` }} className="bg-teal-600 h-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Human Persona Fields */}
        <div className="space-y-2.5 bg-white/70 p-4 rounded-2xl border border-white/60 mb-5 relative z-10 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <span className="font-label-md font-bold text-primary flex-shrink-0">✨ Your Vibe:</span>
            <span className="text-on-surface italic">&ldquo;{profile.qualities}&rdquo;</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-label-md font-bold text-amber-600 flex-shrink-0">⚡ Superpower:</span>
            <span className="text-on-surface font-medium">{profile.strengths.description}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-label-md font-bold text-teal-700 flex-shrink-0">⚖️ Little Reminder:</span>
            <span className="text-on-surface font-medium">&ldquo;{profile.balanceTip}&rdquo;</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-label-md font-bold text-secondary flex-shrink-0">🧘 Yoga Focus:</span>
            <span className="text-on-surface">{profile.yogaConnection.title}</span>
          </div>
          <div className="flex items-start gap-2 pt-1 border-t border-white/50">
            <span className="font-label-md font-bold text-primary flex-shrink-0">🪷 Personal Mantra:</span>
            <span className="text-on-surface italic font-medium">&ldquo;{profile.mantra}&rdquo;</span>
          </div>
        </div>

        {/* QR Code & Verification Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-primary/20 pt-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-outline-variant flex-shrink-0">
              <QRCodeSVG value={currentUrl} size={64} level="M" />
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wider block">
                SCAN TO FIND YOUR PRAKRITI
              </span>
              <span className="text-xs text-on-surface-variant font-medium">Yoga Club Mela</span>
              <span className="text-[10px] text-on-surface-variant/70 block mt-0.5">8-Question Indicative Profile</span>
            </div>
          </div>

          <div className="text-right text-[10px] text-on-surface-variant/80 font-mono">
            ID: PRAK-{Math.abs(safeScores.vataPercentage * 17 + safeScores.pittaPercentage * 11)}
          </div>
        </div>
      </div>

      {/* Helper screenshot line */}
      <p className="text-xs font-label-sm text-on-surface-variant mb-5 font-medium">
        📸 Take a screenshot. You might want to show your friends.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 w-full">
        <button
          onClick={handleDownloadPassport}
          className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-full font-label-md text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          <span>SAVE PASSPORT (PNG)</span>
        </button>

        <button
          onClick={handleShare}
          className="glass-panel text-on-surface hover:text-primary px-6 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">share</span>
          <span>SHOW YOUR FRIENDS</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onRetakeQuest();
          }}
          className="glass-panel text-on-surface hover:text-secondary px-5 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-semibold"
        >
          <span className="material-symbols-outlined text-lg">replay</span>
          <span>RETAKE QUIZ</span>
        </button>
      </div>

      {/* Educational Disclaimer */}
      <p className="font-label-sm text-[11px] text-on-surface-variant/70 text-center max-w-md leading-relaxed">
        This interactive experience provides an educational, game-based indication of Prakriti based on user responses.
        It is not a medical diagnosis and does not replace consultation with a qualified healthcare or Ayurveda professional.
      </p>
    </div>
  );
};
