export type DoshaType = 'VATA' | 'PITTA' | 'KAPHA';

export type PrakritiArchetype = 
  | 'THE EXPLORER' 
  | 'THE TRANSFORMER' 
  | 'THE ANCHOR'
  | 'VATA-PITTA EXPLORER'
  | 'PITTA-KAPHA CATALYST'
  | 'VATA-KAPHA VISIONARY'
  | 'TRIDOSHIC HARMONIZER';

export interface ScoreWeights {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface QuestionChoice {
  text: string;
  weights: ScoreWeights;
  observation: string; // Dynamic personalized observation for the "Why did we get this result?" section
}

export interface Question {
  id: number;
  category: string;
  scenario: string;
  subtext?: string;
  icon: string;
  choices: QuestionChoice[];
}

export interface PrakritiScores {
  vataRaw: number;
  pittaRaw: number;
  kaphaRaw: number;
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  dominant: DoshaType;
  secondary?: DoshaType;
  isMixed: boolean;
  archetype: PrakritiArchetype;
  selectedObservations?: string[];
}

export interface DoshaProfile {
  id: DoshaType;
  name: string;
  leanTitle: string; // e.g. "YOU LEAN TOWARDS PITTA"
  sanskritName: string;
  archetype: string;
  elements: string[];
  elementSummary: string;
  elementExplain: string;
  tagline: string;
  keywords: string[];
  colorTheme: {
    primary: string;
    secondary: string;
    gradient: string;
    glow: string;
    badgeBg: string;
  };
  traditionalConcepts: string[];
  qualities: string;
  youMayRecognize: string[];
  balanceTip: string;
  balanceChallenges?: string;
  strengths: {
    title: string;
    description: string;
    detailed: string;
  };
  balanceZone: {
    title: string;
    description: string;
    detailed: string;
  };
  collegeEnergy: {
    title: string;
    description: string;
    detailed: string;
    quote: string;
    tags: string[];
  };
  yogaConnection: {
    title: string;
    description: string;
    detailed: string;
    focusPoints: string[];
    recommendedAsanas: string[];
    pranayama: string;
  };
  doList: string[];
  watchOutList: string[];
  mantra: string;
}

export interface ElementInfo {
  id: string;
  name: string;
  sanskritName: string;
  dosha: string;
  icon: string;
  color: string;
  description: string;
  organ: string;
  chakra: string;
  coordinates: { x: number; y: number };
}

export interface YogaPoseChallenge {
  id: number;
  sanskritName: string;
  englishName: string;
  silhouetteDescription: string;
  imageAlt: string;
  imageUrl?: string;
  choices: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  doshaBenefit: string;
}

export interface MythFactItem {
  id: number;
  statement: string;
  isFact: boolean;
  explanation: string;
  takeaway: string;
}

export interface DoshaMatchItem {
  id: number;
  trait: string;
  category: 'Element' | 'Habit' | 'Energy' | 'Season' | 'Food';
  correctDosha: DoshaType;
  explanation: string;
}

export interface UserPassportData {
  name: string;
  prakritiResult: PrakritiScores;
  dominantProfile: DoshaProfile;
  dateGenerated: string;
  mantra: string;
}
