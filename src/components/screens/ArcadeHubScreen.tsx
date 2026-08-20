'use client';

import React from 'react';
import { soundManager } from '../../lib/audio';

interface ArcadeHubScreenProps {
  onSelectGame: (gameId: string) => void;
}

export const ArcadeHubScreen: React.FC<ArcadeHubScreenProps> = ({ onSelectGame }) => {
  const games = [
    {
      id: 'quest',
      num: '01',
      title: 'PRAKRITI QUEST',
      subtitle: 'The 8-Question Discovery Quiz',
      desc: 'Decode whether your natural rhythm leans towards Vata, Pitta, or Kapha through everyday scenarios.',
      icon: 'explore',
      colorClass: 'text-primary',
      borderGlow: 'hover:border-primary/50',
      actionText: 'START QUEST',
    },
    {
      id: 'breath_quest',
      num: '02',
      title: 'BREATH QUEST',
      subtitle: 'Can you slow your breathing down?',
      desc: '30 seconds. That’s it. Sync with the circle and give your brain a quick reset.',
      icon: 'air',
      colorClass: 'text-secondary',
      borderGlow: 'hover:border-secondary/50',
      actionText: 'TRY IT (30s)',
    },
    {
      id: 'yoga_challenge',
      num: '03',
      title: 'YOGA CHALLENGE',
      subtitle: 'Okay, let’s see what you’ve got',
      desc: 'Look at the pose figure and test your knowledge of classic yoga postures.',
      icon: 'self_improvement',
      colorClass: 'text-indigo-600',
      borderGlow: 'hover:border-indigo-500/50',
      actionText: 'PLAY CHALLENGE',
    },
    {
      id: 'myth_fact',
      num: '04',
      title: 'AYURVEDA MYTH OR FACT',
      subtitle: 'Think you know Ayurveda? Prove it',
      desc: 'Swipe through popular assumptions and discover what ancient wisdom actually says.',
      icon: 'psychology',
      colorClass: 'text-purple-600',
      borderGlow: 'hover:border-purple-500/50',
      actionText: 'TEST YOURSELF',
    },
    {
      id: 'dosha_match',
      num: '05',
      title: 'DOSHA MATCH',
      subtitle: 'Can you match personality to Prakriti?',
      desc: 'Speed-match everyday habits, foods, and traits to Vata, Pitta, and Kapha.',
      icon: 'category',
      colorClass: 'text-teal-700',
      borderGlow: 'hover:border-teal-500/50',
      actionText: 'START MATCHING',
    },
  ];

  return (
    <div className="min-h-screen px-4 md:px-10 pt-20 pb-28 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-fixed-dim/30 border border-white/50 mb-3 backdrop-blur-sm shadow-sm">
          <span className="material-symbols-outlined text-primary text-sm">casino</span>
          <span className="font-label-md text-primary tracking-widest uppercase text-xs font-bold">
            GAME ZONE
          </span>
        </div>
        <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-primary font-bold mb-2 tracking-tight">
          PRAKRITI ARCADE
        </h2>
        <p className="font-body-md text-base sm:text-lg text-on-surface-variant max-w-md mx-auto leading-relaxed font-medium">
          You&apos;ve learned enough. Now play.
        </p>
      </div>

      {/* Mini-Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              soundManager.playTap();
              onSelectGame(game.id);
            }}
            className={`glass-panel rounded-3xl p-6 sm:p-7 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm cursor-pointer hover:bg-white/80 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group ${game.borderGlow}`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface-variant tracking-wider">
                  {game.num}
                </span>
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/60 group-hover:scale-110 transition-transform">
                  <span
                    className={`material-symbols-outlined text-2xl ${game.colorClass}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {game.icon}
                  </span>
                </div>
              </div>

              <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                {game.title}
              </h3>
              <p className="font-label-sm text-xs text-secondary font-semibold uppercase tracking-wider mb-2">
                {game.subtitle}
              </p>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                {game.desc}
              </p>
            </div>

            <div className="flex items-center text-xs font-label-md font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
              <span>{game.actionText}</span>
              <span className="material-symbols-outlined text-sm ml-1.5">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
