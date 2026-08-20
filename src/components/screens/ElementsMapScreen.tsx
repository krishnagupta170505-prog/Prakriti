'use client';

import React, { useState } from 'react';
import { PANCHAMAHABHUTA_ELEMENTS } from '../../data/elements';
import { soundManager } from '../../lib/audio';

export const ElementsMapScreen: React.FC<{ onBackToProfile: () => void }> = ({ onBackToProfile }) => {
  const [activeElementId, setActiveElementId] = useState<string>('AGNI');

  const activeElement = PANCHAMAHABHUTA_ELEMENTS.find((el) => el.id === activeElementId) || PANCHAMAHABHUTA_ELEMENTS[0];

  const handleSelectElement = (id: string) => {
    soundManager.playTap();
    setActiveElementId(id);
  };

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-4xl mx-auto flex flex-col items-center relative z-10">
      {/* Header Section */}
      <div className="text-center mb-6 w-full max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-fixed-dim/30 border border-white/50 mb-3 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-md text-primary tracking-widest uppercase text-xs font-bold">
            PANCHAMAHABHUTA
          </span>
        </div>
        <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl text-on-surface mb-2 font-bold">
          Where do Vata, Pitta &amp; Kapha come from?
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
          According to Ayurveda, everything around us is made up of five basic elements. Don&apos;t worry, there&apos;s no exam.
        </p>
      </div>

      {/* Dosha Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => handleSelectElement('VAYU')}
          className={`px-4 py-1.5 rounded-full text-xs font-label-md border transition-all ${
            activeElementId === 'VAYU' || activeElementId === 'AKASHA'
              ? 'bg-primary text-white border-primary shadow-sm font-bold'
              : 'glass-panel text-on-surface-variant border-white/50 hover:bg-white/60'
          }`}
        >
          VATA (Space + Air)
        </button>

        <button
          onClick={() => handleSelectElement('AGNI')}
          className={`px-4 py-1.5 rounded-full text-xs font-label-md border transition-all ${
            activeElementId === 'AGNI'
              ? 'bg-secondary text-white border-secondary shadow-sm font-bold'
              : 'glass-panel text-on-surface-variant border-white/50 hover:bg-white/60'
          }`}
        >
          PITTA (Fire)
        </button>

        <button
          onClick={() => handleSelectElement('PRITHVI')}
          className={`px-4 py-1.5 rounded-full text-xs font-label-md border transition-all ${
            activeElementId === 'PRITHVI' || activeElementId === 'JALA'
              ? 'bg-teal-700 text-white border-teal-700 shadow-sm font-bold'
              : 'glass-panel text-on-surface-variant border-white/50 hover:bg-white/60'
          }`}
        >
          KAPHA (Water + Earth)
        </button>
      </div>

      {/* Interactive Sacred Geometry Oracle Map */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-square flex items-center justify-center mb-6">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        {/* SVG Connections & Sacred Geometry */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 500 500">
          <circle
            cx="250"
            cy="250"
            r="180"
            fill="none"
            stroke="rgba(70, 72, 212, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="animate-[spin_60s_linear_infinite]"
          />
          <circle cx="250" cy="250" r="95" fill="none" stroke="rgba(124, 67, 171, 0.2)" strokeWidth="0.8" />

          {/* Pentagram Lines */}
          <polygon
            points="250,70 421,194 356,395 144,395 79,194"
            fill="none"
            stroke="rgba(118, 117, 134, 0.25)"
            strokeWidth="1.2"
          />
          <polygon
            points="250,70 356,395 79,194 421,194 144,395"
            fill="none"
            stroke="rgba(70, 72, 212, 0.15)"
            strokeWidth="0.8"
          />

          {/* Active Highlight Lines */}
          {activeElementId === 'AGNI' && (
            <line x1="250" y1="250" x2="250" y2="70" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          )}
          {(activeElementId === 'VAYU' || activeElementId === 'AKASHA') && (
            <path
              d="M 421 194 Q 388 294 356 395"
              fill="none"
              stroke="#4648d4"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}
          {(activeElementId === 'JALA' || activeElementId === 'PRITHVI') && (
            <path
              d="M 79 194 Q 111 294 144 395"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* 5 Element Interactive Nodes */}
        <div className="relative w-full h-full z-10">
          {/* 1. AGNI (Top Center) */}
          <div className="absolute top-[14%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <button
              onClick={() => handleSelectElement('AGNI')}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md ${
                activeElementId === 'AGNI'
                  ? 'bg-amber-500 text-white scale-110 ring-4 ring-amber-500/30'
                  : 'bg-white/80 text-amber-600 hover:bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </button>
            <div className="text-center mt-1 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
              <span className="font-label-md text-xs font-bold text-on-surface block">Agni</span>
              <span className="font-label-sm text-[10px] text-amber-700 block">Fire • Pitta</span>
            </div>
          </div>

          {/* 2. VAYU (Top Right) */}
          <div className="absolute top-[39%] right-[6%] -translate-y-1/2 flex flex-col items-center">
            <button
              onClick={() => handleSelectElement('VAYU')}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md ${
                activeElementId === 'VAYU'
                  ? 'bg-primary text-white scale-110 ring-4 ring-primary/30'
                  : 'bg-white/80 text-primary hover:bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                air
              </span>
            </button>
            <div className="text-center mt-1 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
              <span className="font-label-md text-xs font-bold text-on-surface block">Vayu</span>
              <span className="font-label-sm text-[10px] text-primary block">Air • Vata</span>
            </div>
          </div>

          {/* 3. AKASHA (Bottom Right) */}
          <div className="absolute bottom-[21%] right-[21%] translate-x-1/2 translate-y-1/2 flex flex-col items-center">
            <button
              onClick={() => handleSelectElement('AKASHA')}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md ${
                activeElementId === 'AKASHA'
                  ? 'bg-secondary text-white scale-110 ring-4 ring-secondary/30'
                  : 'bg-white/80 text-secondary hover:bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">language</span>
            </button>
            <div className="text-center mt-1 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
              <span className="font-label-md text-xs font-bold text-on-surface block">Akasha</span>
              <span className="font-label-sm text-[10px] text-secondary block">Space • Vata</span>
            </div>
          </div>

          {/* 4. PRITHVI (Bottom Left) */}
          <div className="absolute bottom-[21%] left-[21%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
            <button
              onClick={() => handleSelectElement('PRITHVI')}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md ${
                activeElementId === 'PRITHVI'
                  ? 'bg-emerald-700 text-white scale-110 ring-4 ring-emerald-700/30'
                  : 'bg-white/80 text-emerald-800 hover:bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">public</span>
            </button>
            <div className="text-center mt-1 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
              <span className="font-label-md text-xs font-bold text-on-surface block">Prithvi</span>
              <span className="font-label-sm text-[10px] text-emerald-800 block">Earth • Kapha</span>
            </div>
          </div>

          {/* 5. JALA (Top Left) */}
          <div className="absolute top-[39%] left-[6%] -translate-y-1/2 flex flex-col items-center">
            <button
              onClick={() => handleSelectElement('JALA')}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md ${
                activeElementId === 'JALA'
                  ? 'bg-sky-600 text-white scale-110 ring-4 ring-sky-600/30'
                  : 'bg-white/80 text-sky-600 hover:bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </button>
            <div className="text-center mt-1 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
              <span className="font-label-md text-xs font-bold text-on-surface block">Jala</span>
              <span className="font-label-sm text-[10px] text-sky-700 block">Water • Kapha</span>
            </div>
          </div>

          {/* Center Core: Prana */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card bg-white/90 flex items-center justify-center border border-white shadow-md">
            <span className="material-symbols-outlined text-primary text-xl animate-spin" style={{ animationDuration: '20s' }}>
              spa
            </span>
          </div>
        </div>
      </div>

      {/* Element Detail Card */}
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-headline-sm text-2xl font-bold text-primary mb-0.5">{activeElement.name}</h3>
            <p className="font-label-md text-xs text-secondary font-semibold">{activeElement.sanskritName} • Traditional Sanskrit</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {activeElement.icon}
            </span>
          </div>
        </div>

        <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
          {activeElement.description}
        </p>

        <div className="space-y-2 border-t border-white/40 pt-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-on-surface-variant">Connected With:</span>
            <span className="font-label-md text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
              {activeElement.dosha}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-label-md text-on-surface-variant">Associated Sense:</span>
            <span className="font-body-md text-on-surface font-medium">{activeElement.organ}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-label-md text-on-surface-variant">Energy Focus:</span>
            <span className="font-body-md text-on-surface font-medium">{activeElement.chakra}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => {
          soundManager.playTap();
          onBackToProfile();
        }}
        className="mt-6 glass-panel text-on-surface hover:text-primary px-6 py-2.5 rounded-full font-label-md text-xs sm:text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-bold"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        <span>BACK TO PROFILE</span>
      </button>
    </div>
  );
};
