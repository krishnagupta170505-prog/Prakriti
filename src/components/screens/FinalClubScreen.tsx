'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../lib/audio';

interface FinalClubScreenProps {
  onRestart: () => void;
  onExploreArcade: () => void;
}

export const FinalClubScreen: React.FC<FinalClubScreenProps> = ({ onRestart, onExploreArcade }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', year: '1st Year', interest: 'Yoga & Stress Relief' });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime();
    setIsJoined(true);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-10 py-16 text-center relative z-10">
      {/* Glow Effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Hero Message */}
      <div className="mb-10 animate-fadeIn max-w-3xl">
        <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold tracking-tight mb-4 leading-tight">
          ANCIENT WISDOM. <br />
          REAL EVERYDAY BALANCE.
        </h1>
        <p className="font-body-lg text-base sm:text-xl text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Welcome to our campus Yoga Club. Simple practices to keep you feeling energized, clear-headed, and calm through university life.
        </p>
      </div>

      {/* 4 Primary Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
        <button
          onClick={() => {
            soundManager.playTap();
            onRestart();
          }}
          className="w-full glass-panel rounded-full py-4 px-6 flex items-center justify-center gap-2 hover:bg-white/70 transition-all border border-white/60 shadow-sm active:scale-95 group font-bold"
        >
          <span className="font-label-md text-xs sm:text-sm text-primary tracking-widest uppercase">
            RETAKE THE QUIZ
          </span>
          <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onExploreArcade();
          }}
          className="w-full glass-panel rounded-full py-4 px-6 flex items-center justify-center gap-2 hover:bg-white/70 transition-all border border-white/60 shadow-sm active:scale-95 group font-bold"
        >
          <span className="font-label-md text-xs sm:text-sm text-secondary tracking-widest uppercase">
            PLAY ARCADE GAMES
          </span>
          <span className="material-symbols-outlined text-secondary group-hover:rotate-180 transition-transform duration-500">
            casino
          </span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setShowJoinModal(true);
          }}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(70,72,212,0.4)] active:scale-95 font-bold"
        >
          <span className="font-label-md text-xs sm:text-sm tracking-widest uppercase">
            JOIN OUR CLUB
          </span>
          <span className="material-symbols-outlined text-lg">group_add</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({
                title: 'Prakriti Yoga Club',
                text: 'Find your Ayurvedic natural rhythm with PRAKRITI!',
                url: window.location.href,
              }).catch(() => {});
            } else {
              window.open('https://instagram.com', '_blank');
            }
          }}
          className="w-full border border-secondary/40 hover:border-secondary text-secondary hover:bg-secondary/5 rounded-full py-4 px-6 flex items-center justify-center gap-2 transition-all active:scale-95 font-bold"
        >
          <span className="font-label-md text-xs sm:text-sm tracking-widest uppercase">
            SHARE WITH FRIENDS
          </span>
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
      </div>

      {/* Join Club Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white shadow-2xl animate-fadeIn text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-sm text-2xl font-bold text-primary">Join Our Yoga Club</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {isJoined ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="font-headline-sm text-xl font-bold text-on-surface mb-2">You&apos;re in!</h4>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6">
                  We&apos;ll ping you about casual morning yoga sessions, breathwork resets, and upcoming campus melas!
                </p>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="bg-primary text-white px-8 py-3 rounded-full font-label-md text-sm hover:bg-primary/90 font-bold"
                >
                  SWEET
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                    Email / Phone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                      Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:outline-none focus:border-primary"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year / Postgrad</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                      What are you interested in?
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:outline-none focus:border-primary"
                    >
                      <option>Yoga & Stretches</option>
                      <option>Quick Breath Resets</option>
                      <option>Stress Relief & Meditation</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-full font-label-md text-sm font-bold shadow-md transition-all mt-4"
                >
                  COUNT ME IN
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-on-surface-variant/60">
        <p>© Prakriti • University Yoga Club</p>
      </footer>
    </div>
  );
};
