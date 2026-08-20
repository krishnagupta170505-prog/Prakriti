import { DoshaType, PrakritiScores, QuestionChoice } from '../types';

export const calculatePrakritiScores = (
  selectedChoices: QuestionChoice[]
): PrakritiScores => {
  let vataRaw = 0;
  let pittaRaw = 0;
  let kaphaRaw = 0;
  const observations: string[] = [];

  for (const choice of selectedChoices) {
    vataRaw += choice.weights.vata;
    pittaRaw += choice.weights.pitta;
    kaphaRaw += choice.weights.kapha;
    if (choice.observation) {
      observations.push(choice.observation);
    }
  }

  const total = Math.max(vataRaw + pittaRaw + kaphaRaw, 1);

  let vataPercentage = Math.round((vataRaw / total) * 100);
  let pittaPercentage = Math.round((pittaRaw / total) * 100);
  let kaphaPercentage = Math.round((kaphaRaw / total) * 100);

  // Guarantee percentages sum to 100% exactly
  const sum = vataPercentage + pittaPercentage + kaphaPercentage;
  const diff = 100 - sum;

  if (diff !== 0) {
    if (vataPercentage >= pittaPercentage && vataPercentage >= kaphaPercentage) {
      vataPercentage += diff;
    } else if (pittaPercentage >= vataPercentage && pittaPercentage >= kaphaPercentage) {
      pittaPercentage += diff;
    } else {
      kaphaPercentage += diff;
    }
  }

  // Determine dominant dosha
  let dominant: DoshaType = 'PITTA';
  if (vataPercentage >= pittaPercentage && vataPercentage >= kaphaPercentage) {
    dominant = 'VATA';
  } else if (pittaPercentage >= vataPercentage && pittaPercentage >= kaphaPercentage) {
    dominant = 'PITTA';
  } else {
    dominant = 'KAPHA';
  }

  // Determine secondary dosha & check if it's a dual blend (within 10% difference)
  const scores: { dosha: DoshaType; pct: number }[] = [
    { dosha: 'VATA' as DoshaType, pct: vataPercentage },
    { dosha: 'PITTA' as DoshaType, pct: pittaPercentage },
    { dosha: 'KAPHA' as DoshaType, pct: kaphaPercentage },
  ].sort((a, b) => b.pct - a.pct);

  const top1 = scores[0];
  const top2 = scores[1];

  const isMixed = top1.pct - top2.pct <= 10;
  const secondary = top2.pct > 0 ? top2.dosha : undefined;

  // Archetype labeling
  let archetype = dominant === 'VATA' ? 'THE EXPLORER' : dominant === 'PITTA' ? 'THE TRANSFORMER' : 'THE ANCHOR';
  if (isMixed && secondary) {
    if ((dominant === 'VATA' && secondary === 'PITTA') || (dominant === 'PITTA' && secondary === 'VATA')) {
      archetype = 'VATA-PITTA EXPLORER';
    } else if ((dominant === 'PITTA' && secondary === 'KAPHA') || (dominant === 'KAPHA' && secondary === 'PITTA')) {
      archetype = 'PITTA-KAPHA CATALYST';
    } else if ((dominant === 'VATA' && secondary === 'KAPHA') || (dominant === 'KAPHA' && secondary === 'VATA')) {
      archetype = 'VATA-KAPHA VISIONARY';
    }
  }

  return {
    vataRaw,
    pittaRaw,
    kaphaRaw,
    vataPercentage,
    pittaPercentage,
    kaphaPercentage,
    dominant,
    secondary,
    isMixed,
    archetype: archetype as any,
    selectedObservations: observations,
  };
};
