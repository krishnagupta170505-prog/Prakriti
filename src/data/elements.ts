import { ElementInfo } from '../types';

export const PANCHAMAHABHUTA_ELEMENTS: ElementInfo[] = [
  {
    id: 'AGNI',
    name: 'Fire',
    sanskritName: 'Agni',
    dosha: 'Pitta',
    icon: 'local_fire_department',
    color: '#e07a2a',
    description: 'According to Ayurveda, Fire governs heat, energy and transformation. Think digestion, focus, and getting things done.',
    organ: 'Eyes & Metabolism',
    chakra: 'Manipura (Solar Center)',
    coordinates: { x: 250, y: 70 }, // Top center
  },
  {
    id: 'VAYU',
    name: 'Air',
    sanskritName: 'Vayu',
    dosha: 'Vata',
    icon: 'air',
    color: '#7c43ab',
    description: 'According to Ayurveda, Air governs movement, lightness, and speed. Think swift thoughts, breathing, and quick reactions.',
    organ: 'Skin & Nervous System',
    chakra: 'Anahata (Chest Center)',
    coordinates: { x: 421, y: 194 }, // Top right
  },
  {
    id: 'AKASHA',
    name: 'Space',
    sanskritName: 'Akasha',
    dosha: 'Vata',
    icon: 'language',
    color: '#4648d4',
    description: 'According to Ayurveda, Space is the open container where everything exists. Think openness, imagination, and room to think.',
    organ: 'Ears & Voice',
    chakra: 'Vishuddha (Throat Center)',
    coordinates: { x: 356, y: 395 }, // Bottom right
  },
  {
    id: 'PRITHVI',
    name: 'Earth',
    sanskritName: 'Prithvi',
    dosha: 'Kapha',
    icon: 'public',
    color: '#4a7c59',
    description: 'According to Ayurveda, Earth provides solid structure and steady grounding. Think physical stamina, calm bones, and loyalty.',
    organ: 'Nose & Posture',
    chakra: 'Muladhara (Grounding Base)',
    coordinates: { x: 144, y: 395 }, // Bottom left
  },
  {
    id: 'JALA',
    name: 'Water',
    sanskritName: 'Jala',
    dosha: 'Kapha',
    icon: 'water_drop',
    color: '#38bdf8',
    description: 'According to Ayurveda, Water provides fluid cohesion, smoothness, and ease. Think hydration, compassion, and emotional warmth.',
    organ: 'Tongue & Fluid Balance',
    chakra: 'Svadhisthana (Pelvic Center)',
    coordinates: { x: 79, y: 194 }, // Top left
  },
];
