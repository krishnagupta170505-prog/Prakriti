'use client';

import React, { useState } from 'react';
import { DoshaType, PrakritiScores } from '../../types';
import { DOSHA_PROFILES } from '../../data/doshas';
import { soundManager } from '../../lib/audio';

interface ProfileScreenProps {
  scores: PrakritiScores | null;
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ scores, onNavigate }) => {
  const [selectedDosha, setSelectedDosha] = useState<DoshaType>(scores?.dominant || 'PITTA');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const profile = DOSHA_PROFILES[selectedDosha];

  const toggleExpand = (cardKey: string) => {
    soundManager.playTap();
    setExpandedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-5xl mx-auto relative z-10">
      {/* Dosha Selector Tabs */}
      <div className="flex justify-center mb-8">
        <div className="glass-panel p-1.5 rounded-full flex gap-2 border border-white/50 bg-white/50 shadow-sm">
          {(['VATA', 'PITTA', 'KAPHA'] as DoshaType[]).map((dosha) => (
            <button
              key={dosha}
              onClick={() => {
                soundManager.playTap();
                setSelectedDosha(dosha);
              }}
              className={`px-5 py-2 rounded-full font-label-md text-xs sm:text-sm transition-all duration-300 ${
                selectedDosha === dosha
                  ? 'bg-primary text-white shadow-md font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-white/40'
              }`}
            >
              {dosha} {scores?.dominant === dosha && '★'}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Profile Section */}
      <section className="flex flex-col items-center text-center mb-10">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-panel flex items-center justify-center mb-4 relative shadow-lg bg-white/60">
          <div className="absolute inset-2 rounded-full border border-primary/30 animate-pulse" />
          <span
            className="material-symbols-outlined text-4xl sm:text-5xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {selectedDosha === 'PITTA' ? 'local_fire_department' : selectedDosha === 'VATA' ? 'air' : 'water_drop'}
          </span>
        </div>

        <p className="font-label-md text-xs sm:text-sm text-secondary tracking-widest uppercase font-bold mb-1">
          {profile.leanTitle}
        </p>
        <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface mb-2 font-bold">
          {profile.archetype}
        </h2>
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed mb-3">
          &ldquo;{profile.qualities}&rdquo;
        </p>
        <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-label-md font-bold">
          {profile.elementSummary.toUpperCase()}
        </div>
      </section>

      {/* Bento Grid / Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Card 1: So... What is Prakriti? */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">
                  {selectedDosha === 'PITTA' ? 'local_fire_department' : selectedDosha === 'VATA' ? 'air' : 'water_drop'}
                </span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">So... what is Prakriti?</h3>
            </div>
            <p className="font-body-md text-sm text-on-surface leading-relaxed mb-2">
              Prakriti basically means your natural makeup — the way your body and mind tend to work. Think of it like your default setting.
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3">
              Everyone has all three — Vata, Pitta and Kapha — but the mix is unique for each person. That&apos;s one reason two people can experience the exact same situation completely differently!
            </p>
          </div>

          <div className="border-t border-white/40 pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">Pretty cool, right?</span>
            <button
              onClick={() => onNavigate('elements_map')}
              className="text-xs font-label-md font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View 5 Elements</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </article>

        {/* Card 2: You might be this person if... */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">You might be this person if...</h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-on-surface-variant mb-3">
              {profile.youMayRecognize.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary-container/30 p-3.5 rounded-xl border border-secondary/20 mt-2">
            <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1">
              YOUR LITTLE REMINDER
            </span>
            <p className="font-body-md text-xs sm:text-sm text-on-surface font-medium italic">
              &ldquo;{profile.balanceTip}&rdquo;
            </p>
          </div>
        </article>

        {/* Card 3: Your Superpowers */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">Your Superpowers</h3>
            </div>
            <h4 className="font-headline-md text-lg text-primary mb-2 font-semibold">{profile.strengths.description}</h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
              {profile.strengths.detailed}
            </p>
          </div>

          <p className="border-t border-white/40 pt-3 text-[11px] text-on-surface-variant/75 italic">
            Of course, nobody is just one thing. This is simply the pattern your answers leaned towards.
          </p>
        </article>

        {/* Card 4: How to Keep Yourself Balanced */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-700">
                <span className="material-symbols-outlined text-xl">balance</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">How to Keep Yourself Balanced</h3>
            </div>
            <h4 className="font-headline-md text-lg text-teal-700 mb-2 font-semibold">{profile.balanceZone.description}</h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
              {profile.balanceZone.detailed}
            </p>
          </div>

          <div className="border-t border-white/40 pt-3">
            <button
              onClick={() => toggleExpand('balance')}
              className="flex items-center justify-between w-full font-label-md text-xs text-secondary hover:text-primary transition-colors font-semibold"
            >
              <span>{expandedCards.balance ? 'Show Less' : 'Tell Me More'}</span>
              <span className="material-symbols-outlined text-sm">
                {expandedCards.balance ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandedCards.balance && (
              <p className="mt-2 text-xs text-on-surface-variant leading-relaxed animate-fadeIn">
                {profile.balanceZone.detailed}
              </p>
            )}
          </div>
        </article>

        {/* Card 5: Okay, But What Does Yoga Have To Do With This? */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">self_improvement</span>
              </div>
              <div>
                <span className="font-label-sm text-[10px] text-secondary uppercase tracking-widest font-bold block">
                  PRACTICAL WELLNESS
                </span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                  Okay, but what does Yoga have to do with this?
                </h3>
              </div>
            </div>
            <p className="font-body-md text-sm text-on-surface leading-relaxed mb-2">
              Yoga isn&apos;t only about touching your toes. At its core, it&apos;s also about learning how to understand yourself and find some everyday balance.
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              {profile.yogaConnection.description}
            </p>
          </div>

          <div className="border-t border-white/40 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {profile.yogaConnection.recommendedAsanas.map((as, i) => (
                <span key={i} className="px-3 py-1 bg-white/80 border border-white rounded-full text-xs font-medium">
                  {as}
                </span>
              ))}
            </div>

            <button
              onClick={() => onNavigate('breath_quest')}
              className="bg-primary text-white px-5 py-2 rounded-full font-label-md text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>LET&apos;S TRY IT</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </article>

        {/* Card 6: GOOD IDEAS & WATCH OUT FOR */}
        <article className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm md:col-span-2">
          <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-4">Everyday Habits &amp; Awareness</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20">
              <h4 className="font-label-md text-xs uppercase tracking-widest text-emerald-800 font-bold mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                GOOD IDEAS
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                {profile.doList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/20">
              <h4 className="font-label-md text-xs uppercase tracking-widest text-amber-800 font-bold mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">warning</span>
                WATCH OUT FOR
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                {profile.watchOutList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>

      {/* Action Strip */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('passport');
          }}
          className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-full font-label-md text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all font-bold"
        >
          <span className="material-symbols-outlined text-lg">badge</span>
          <span>SHOW MY PASSPORT</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('elements_map');
          }}
          className="glass-panel text-on-surface hover:text-primary px-6 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-semibold"
        >
          <span className="material-symbols-outlined text-lg">public</span>
          <span>5 ELEMENTS MAP</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onNavigate('arcade_hub');
          }}
          className="glass-panel text-on-surface hover:text-secondary px-6 py-3.5 rounded-full font-label-md text-sm border border-white/60 active:scale-95 transition-all flex items-center gap-1.5 font-semibold"
        >
          <span className="material-symbols-outlined text-lg">casino</span>
          <span>PRAKRITI ARCADE</span>
        </button>
      </div>

      {/* Educational Disclaimer */}
      <p className="font-label-sm text-xs text-on-surface-variant/70 text-center max-w-xl mx-auto leading-relaxed">
        This interactive experience provides an educational, game-based indication of Prakriti based on user responses.
        It is not a medical diagnosis and does not replace consultation with a qualified healthcare or Ayurveda professional.
      </p>
    </div>
  );
};
