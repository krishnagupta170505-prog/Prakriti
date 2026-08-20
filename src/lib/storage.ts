import { PrakritiScores, UserPassportData } from '../types';

const STORAGE_KEYS = {
  SCORES: 'prakriti_user_scores',
  PASSPORT: 'prakriti_user_passport',
  STALL_MODE: 'prakriti_stall_mode_enabled',
  USER_NAME: 'prakriti_user_name',
};

export const storage = {
  saveScores(scores: PrakritiScores): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
    } catch {
      // Storage unavailable or quota exceeded
    }
  },

  getScores(): PrakritiScores | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCORES);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  savePassport(passport: UserPassportData): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PASSPORT, JSON.stringify(passport));
    } catch {}
  },

  getPassport(): UserPassportData | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PASSPORT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUserName(name: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    } catch {}
  },

  getUserName(): string {
    if (typeof window === 'undefined') return 'Seeker';
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Seeker';
  },

  setStallMode(enabled: boolean): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.STALL_MODE, String(enabled));
    } catch {}
  },

  isStallMode(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.STALL_MODE) === 'true';
  },

  clearSession(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEYS.SCORES);
      localStorage.removeItem(STORAGE_KEYS.PASSPORT);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    } catch {}
  },
};
