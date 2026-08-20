'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PrakritiScores, QuestionChoice } from '../types';
import { calculatePrakritiScores } from '../lib/scoring';
import { storage } from '../lib/storage';
import { soundManager } from '../lib/audio';

import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { ParticleCanvas } from '../components/ParticleCanvas';

import { LandingHero } from '../components/screens/LandingHero';
import { WelcomeIntro } from '../components/screens/WelcomeIntro';
import { QuestScreen } from '../components/screens/QuestScreen';
import { AnalyzingScreen } from '../components/screens/AnalyzingScreen';
import { RevealScreen } from '../components/screens/RevealScreen';
import { ProfileScreen } from '../components/screens/ProfileScreen';
import { ElementsMapScreen } from '../components/screens/ElementsMapScreen';
import { CollegeLifeScreen } from '../components/screens/CollegeLifeScreen';
import { DoshaGuideScreen } from '../components/screens/DoshaGuideScreen';
import { ArcadeHubScreen } from '../components/screens/ArcadeHubScreen';
import { BreathQuestScreen } from '../components/screens/BreathQuestScreen';
import { YogaChallengeScreen } from '../components/screens/YogaChallengeScreen';
import { MythOrFactScreen } from '../components/screens/MythOrFactScreen';
import { DoshaMatchScreen } from '../components/screens/DoshaMatchScreen';
import { PassportScreen } from '../components/screens/PassportScreen';
import { ScanStallScreen } from '../components/screens/ScanStallScreen';
import { FinalClubScreen } from '../components/screens/FinalClubScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [scores, setScores] = useState<PrakritiScores | null>(null);
  const [isStallMode, setIsStallMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedScores = storage.getScores();
    if (savedScores) {
      setScores(savedScores);
    }
    setIsStallMode(storage.isStallMode());
  }, []);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteQuest = (answers: QuestionChoice[]) => {
    const calculated = calculatePrakritiScores(answers);
    setScores(calculated);
    storage.saveScores(calculated);
    setCurrentScreen('analyzing');
  };

  const handleToggleStallMode = () => {
    const nextVal = !isStallMode;
    setIsStallMode(nextVal);
    storage.setStallMode(nextVal);
  };

  const handleResetSession = () => {
    soundManager.playTap();
    storage.clearSession();
    setScores(null);
    setCurrentScreen('landing');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-primary">
        <span className="material-symbols-outlined text-4xl animate-spin">spa</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      {/* Ambient background particles */}
      <ParticleCanvas count={25} />

      {/* Top Application Bar with Integrated Stall Mode */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isStallMode={isStallMode}
        onToggleStallMode={handleToggleStallMode}
        onResetSession={handleResetSession}
      />

      {/* Main Screen Content with Page Transition Animation */}
      <main className={`flex-1 w-full transition-[padding] duration-300 ${isStallMode ? 'pt-24 sm:pt-28' : 'pt-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            {currentScreen === 'landing' && (
              <LandingHero
                onStartQuest={() => handleNavigate('quest')}
                onWhatIsPrakriti={() => handleNavigate('welcome')}
                onExploreArcade={() => handleNavigate('arcade_hub')}
                onOpenScanStall={() => handleNavigate('scan_stall')}
              />
            )}

            {currentScreen === 'welcome' && (
              <WelcomeIntro
                onStartQuest={() => handleNavigate('quest')}
                onSelectDosha={(dosha) => {
                  handleNavigate('dosha_guide');
                }}
              />
            )}

            {currentScreen === 'quest' && <QuestScreen onComplete={handleCompleteQuest} />}

            {currentScreen === 'analyzing' && (
              <AnalyzingScreen onComplete={() => setCurrentScreen('reveal')} />
            )}

            {currentScreen === 'reveal' && scores && (
              <RevealScreen
                scores={scores}
                onExploreProfile={() => handleNavigate('profile')}
                onViewPassport={() => handleNavigate('passport')}
              />
            )}

            {currentScreen === 'profile' && (
              <ProfileScreen scores={scores} onNavigate={handleNavigate} />
            )}

            {currentScreen === 'elements_map' && (
              <ElementsMapScreen onBackToProfile={() => handleNavigate('profile')} />
            )}

            {currentScreen === 'college_life' && (
              <CollegeLifeScreen onNavigate={handleNavigate} />
            )}

            {currentScreen === 'dosha_guide' && (
              <DoshaGuideScreen onNavigate={handleNavigate} />
            )}

            {currentScreen === 'arcade_hub' && (
              <ArcadeHubScreen onSelectGame={(gameId) => handleNavigate(gameId)} />
            )}

            {currentScreen === 'breath_quest' && (
              <BreathQuestScreen onBack={() => handleNavigate('arcade_hub')} />
            )}

            {currentScreen === 'yoga_challenge' && (
              <YogaChallengeScreen onBack={() => handleNavigate('arcade_hub')} />
            )}

            {currentScreen === 'myth_fact' && (
              <MythOrFactScreen onBack={() => handleNavigate('arcade_hub')} />
            )}

            {currentScreen === 'dosha_match' && (
              <DoshaMatchScreen onBack={() => handleNavigate('arcade_hub')} />
            )}

            {currentScreen === 'passport' && (
              <PassportScreen
                scores={scores}
                onRetakeQuest={() => handleNavigate('quest')}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'scan_stall' && (
              <ScanStallScreen
                onBack={() => handleNavigate('landing')}
                onStartQuest={() => handleNavigate('quest')}
              />
            )}

            {currentScreen === 'join_club' && (
              <FinalClubScreen
                onRestart={() => handleNavigate('quest')}
                onExploreArcade={() => handleNavigate('arcade_hub')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
