export interface CollegeCard {
  id: string;
  dosha: 'VATA' | 'PITTA' | 'KAPHA';
  title: string;
  subtitle: string;
  memeQuote: string;
  explanation: string;
  tags: string[];
  icon: string;
  gradient: string;
  colorClass: string;
  shareText: string;
}

export const COLLEGE_LIFE_CARDS: CollegeCard[] = [
  {
    id: 'vata-college',
    dosha: 'VATA',
    title: 'The Idea Machine',
    subtitle: 'Space + Air Energy',
    memeQuote: '"Opens 17 tabs. Makes 3 different study schedules. Finishes the project at 2 AM in a burst of sudden inspiration."',
    explanation:
      'Vata students are full of creative ideas and think fast on their feet. When you give your brain a little routine and rest, your creativity is unstoppable.',
    tags: ['17 Tabs Open', 'Creative Ideas', 'Spontaneous', 'Quick Thinker'],
    icon: 'air',
    gradient: 'from-primary/10 via-surface-container to-transparent',
    colorClass: 'text-primary',
    shareText: 'My Prakriti in College is VATA: Opens 17 tabs and comes up with late-night brilliance! Find yours at Prakriti.',
  },
  {
    id: 'pitta-college',
    dosha: 'PITTA',
    title: 'The Goal Getter',
    subtitle: 'Fire Energy',
    memeQuote: '"Exam tomorrow? Already completed the revision two days ago. Notes are color-coded and organized."',
    explanation:
      'Pitta students like knowing what they are doing and hate wasting time. Just remember to take real breaks so you don’t burn out before the finish line.',
    tags: ['Laser Focus', 'Color-Coded Notes', 'Group Leader', 'Organized'],
    icon: 'local_fire_department',
    gradient: 'from-secondary/10 via-surface-container to-transparent',
    colorClass: 'text-secondary',
    shareText: 'My Prakriti in College is PITTA: Goal-driven and ready to get things done. Find yours at Prakriti.',
  },
  {
    id: 'kapha-college',
    dosha: 'KAPHA',
    title: 'The Calm Anchor',
    subtitle: 'Water + Earth Energy',
    memeQuote: '"I’ll start at 7:00 PM." ... 7:05 PM: "Okay, 8:00 PM." ... But once you actually sit down, you study for 4 hours without getting stressed.',
    explanation:
      'Kapha students stay calm even when everyone else is panicking during exams. The hardest part is just getting started!',
    tags: ['Calm Under Pressure', 'Comfort First', 'Steady Stamina', 'Loyal Friend'],
    icon: 'water_drop',
    gradient: 'from-teal-600/10 via-surface-container to-transparent',
    colorClass: 'text-teal-700',
    shareText: 'My Prakriti in College is KAPHA: Unshakable calm and marathon revision stamina. Find yours at Prakriti.',
  },
];
