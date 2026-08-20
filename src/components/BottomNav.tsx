'use client';

import React from 'react';
import { soundManager } from '../lib/audio';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Suppress bottom nav on full immersive linear tasks (like quiz or breathing circle)
  const isImmersiveScreen = ['quest', 'analyzing', 'breath_quest'].includes(currentScreen);
  if (isImmersiveScreen) return null;

  const isQuestActive = ['landing', 'welcome', 'quest', 'reveal'].includes(currentScreen);
  const isWisdomActive = ['elements_map', 'dosha_guide', 'college_life'].includes(currentScreen);
  const isArcadeActive = ['arcade_hub', 'yoga_challenge', 'myth_fact', 'dosha_match'].includes(currentScreen);
  const isProfileActive = ['profile', 'passport', 'join_club'].includes(currentScreen);

  const navItems = [
    {
      id: 'quest',
      label: 'Quest',
      icon: 'explore',
      target: 'landing',
      active: isQuestActive,
    },
    {
      id: 'wisdom',
      label: 'Wisdom',
      icon: 'auto_stories',
      target: 'elements_map',
      active: isWisdomActive,
    },
    {
      id: 'arcade',
      label: 'Arcade',
      icon: 'flare',
      target: 'arcade_hub',
      active: isArcadeActive,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person',
      target: 'profile',
      active: isProfileActive,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2.5 pb-5 backdrop-blur-2xl border-t border-white/30 dark:border-white/10 shadow-[0_-10px_40px_-15px_rgba(70,72,212,0.3)] bg-white/70 dark:bg-on-background/70 rounded-t-2xl">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            soundManager.playTap();
            onNavigate(item.target);
          }}
          className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 w-16 py-1 ${
            item.active
              ? 'text-primary dark:text-primary-fixed-dim bg-primary-container/20 rounded-full px-3'
              : 'text-on-surface-variant dark:text-outline-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined mb-0.5 text-[24px]"
            style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
          >
            {item.icon}
          </span>
          <span className={`font-label-sm text-[11px] ${item.active ? 'font-bold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
