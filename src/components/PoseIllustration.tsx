'use client';

import React from 'react';

interface PoseIllustrationProps {
  poseId: number;
  sanskritName: string;
  className?: string;
}

export const PoseIllustration: React.FC<PoseIllustrationProps> = ({ poseId, sanskritName, className = '' }) => {
  // Vibrant color themes matching the reference pictogram figures
  const poseColors: Record<number, { fill: string; stroke: string; bg: string }> = {
    1: { fill: '#4648d4', stroke: '#4648d4', bg: 'rgba(70, 72, 212, 0.08)' }, // Royal Blue (Vrksasana)
    2: { fill: '#f59e0b', stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' }, // Warm Orange (Trikonasana)
    3: { fill: '#059669', stroke: '#059669', bg: 'rgba(5, 150, 105, 0.08)' }, // Emerald Green (Warrior II)
    4: { fill: '#dc2626', stroke: '#dc2626', bg: 'rgba(220, 38, 38, 0.08)' }, // Crimson Red (Downward Dog)
    5: { fill: '#7c43ab', stroke: '#7c43ab', bg: 'rgba(124, 67, 171, 0.08)' }, // Rich Purple (Cobra)
    6: { fill: '#0284c7', stroke: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' }, // Ocean Blue (Child Pose)
    7: { fill: '#d946ef', stroke: '#d946ef', bg: 'rgba(217, 70, 239, 0.08)' }, // Magenta (Chair Pose)
    8: { fill: '#0d9488', stroke: '#0d9488', bg: 'rgba(13, 148, 136, 0.08)' }, // Teal (Forward Bend)
    9: { fill: '#ea580c', stroke: '#ea580c', bg: 'rgba(234, 88, 12, 0.08)' }, // Amber-Orange (Bridge Pose)
    10: { fill: '#6366f1', stroke: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' }, // Indigo (Savasana)
  };

  const theme = poseColors[poseId] || poseColors[1];

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Soft Ambient Radial Background */}
      <div
        className="absolute inset-0 rounded-2xl transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: theme.bg }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
        style={{ backgroundColor: theme.fill }}
      />

      {/* Pictogram Figure SVG Canvas */}
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full max-w-[280px] max-h-[280px] relative z-10 transition-transform duration-500 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradient for Glossy Ground Reflection */}
          <linearGradient id={`reflectGrad-${poseId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.fill} stopOpacity="0.25" />
            <stop offset="40%" stopColor={theme.fill} stopOpacity="0.08" />
            <stop offset="100%" stopColor={theme.fill} stopOpacity="0" />
          </linearGradient>

          {/* Clean Drop Shadow for the solid figure */}
          <filter id={`figureShadow-${poseId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={theme.fill} floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Delicate Floor Horizon Line */}
        <line x1="20" y1="240" x2="300" y2="240" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />

        {/* ========================================================= */}
        {/* POSE 1: VRKSASANA (TREE POSE) */}
        {/* ========================================================= */}
        {poseId === 1 && (
          <>
            {/* Upper Main Figure */}
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Solid Head */}
              <circle cx="160" cy="50" r="18" fill={theme.fill} />
              {/* Torso & Standing Leg */}
              <path d="M 160 76 L 160 240" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Bent Leg (Foot on Inner Thigh) */}
              <path d="M 160 160 L 205 185 L 165 190" stroke={theme.stroke} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Reaching Overhead with Joined Hands */}
              <path d="M 160 95 Q 120 55 155 18 Q 160 14 165 18 Q 200 55 160 95" fill={theme.fill} />
            </g>

            {/* Faded Ground Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <circle cx="160" cy="50" r="18" fill={`url(#reflectGrad-${poseId})`} />
              <path d="M 160 76 L 160 240" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
              <path d="M 160 160 L 205 185 L 165 190" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 2: TRIKONASANA (TRIANGLE POSE) */}
        {/* ========================================================= */}
        {poseId === 2 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head */}
              <circle cx="178" cy="115" r="18" fill={theme.fill} />
              {/* Wide Stance Legs */}
              <path d="M 90 240 L 150 165 L 225 240" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              {/* Tilted Torso */}
              <path d="M 150 165 L 180 135" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Continuous 180-degree Vertical Arm Span */}
              <path d="M 105 240 L 180 135 L 210 35" stroke={theme.stroke} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 90 240 L 150 165 L 225 240" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
              <path d="M 105 240 L 180 135 L 210 35" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="16" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 3: VIRABHADRASANA II (WARRIOR II POSE) */}
        {/* ========================================================= */}
        {poseId === 3 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head */}
              <circle cx="155" cy="72" r="18" fill={theme.fill} />
              {/* Back Straight Leg */}
              <path d="M 65 240 L 150 165" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Front Bent 90-degree Leg */}
              <path d="M 150 165 L 225 165 L 225 240" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              {/* Vertical Torso */}
              <path d="M 150 165 L 150 102" stroke={theme.stroke} strokeWidth="21" strokeLinecap="round" />
              {/* Horizontal Outstretched Arms */}
              <path d="M 45 110 L 265 110" stroke={theme.stroke} strokeWidth="17" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 65 240 L 150 165 L 225 165 L 225 240" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 4: ADHO MUKHA SVANASANA (DOWNWARD DOG) */}
        {/* ========================================================= */}
        {poseId === 4 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head hanging between arms */}
              <circle cx="198" cy="180" r="18" fill={theme.fill} />
              {/* Back Legs (Pillar) */}
              <path d="M 75 240 L 150 95" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Torso & Straight Arms to Ground */}
              <path d="M 150 95 L 245 240" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 75 240 L 150 95 L 245 240" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 5: BHUJANGASANA (COBRA POSE) */}
        {/* ========================================================= */}
        {poseId === 5 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head */}
              <circle cx="230" cy="100" r="18" fill={theme.fill} />
              {/* Prone Legs Along Mat */}
              <path d="M 45 235 L 140 235" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Gracefully Arching Upward Torso */}
              <path d="M 140 235 Q 195 215 210 125" stroke={theme.stroke} strokeWidth="21" strokeLinecap="round" />
              {/* Supporting Arms */}
              <path d="M 195 160 L 180 238" stroke={theme.stroke} strokeWidth="17" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 45 235 L 140 235 Q 195 215 210 125" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 6: BALASANA (CHILD'S POSE) */}
        {/* ========================================================= */}
        {poseId === 6 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Resting Head */}
              <circle cx="225" cy="220" r="17" fill={theme.fill} />
              {/* Folded Knees and Hips */}
              <path d="M 80 235 L 135 235 L 95 195 L 155 195" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              {/* Rounded Spine */}
              <path d="M 95 195 Q 145 155 205 215" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Outstretched Arms */}
              <path d="M 180 190 L 265 235" stroke={theme.stroke} strokeWidth="16" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 80 235 L 135 235 L 95 195 L 155 195 Q 145 155 205 215" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 7: UTKATASANA (CHAIR POSE) */}
        {/* ========================================================= */}
        {poseId === 7 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head */}
              <circle cx="175" cy="58" r="18" fill={theme.fill} />
              {/* Deep Bent Knee Squat Base */}
              <path d="M 125 240 L 125 185 L 85 140 L 140 120" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              {/* Angled Torso */}
              <path d="M 140 120 L 180 82" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* High Raised Arms Along Ears */}
              <path d="M 160 95 L 235 25" stroke={theme.stroke} strokeWidth="16" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 125 240 L 125 185 L 85 140" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 8: PASCHIMOTTANASANA (SEATED FORWARD BEND) */}
        {/* ========================================================= */}
        {poseId === 8 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head */}
              <circle cx="205" cy="195" r="17" fill={theme.fill} />
              {/* Outstretched Legs */}
              <path d="M 60 235 L 235 235" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Forward Folded Torso */}
              <path d="M 65 235 Q 115 170 195 205" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Arms Reaching to Feet */}
              <path d="M 145 190 L 245 235" stroke={theme.stroke} strokeWidth="16" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 60 235 L 235 235" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 9: SETU BANDHASANA (BRIDGE POSE) */}
        {/* ========================================================= */}
        {poseId === 9 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head Resting on Mat */}
              <circle cx="50" cy="225" r="18" fill={theme.fill} />
              {/* Arched Body Span (Feet Flat, Pelvis High) */}
              <path d="M 235 235 L 235 180 L 150 115 L 75 235" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              {/* Resting Ground Arms */}
              <path d="M 75 235 L 185 235" stroke={theme.stroke} strokeWidth="16" strokeLinecap="round" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 235 235 L 235 180 L 150 115 L 75 235" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* POSE 10: SAVASANA (CORPSE / DEEP REST POSE) */}
        {/* ========================================================= */}
        {poseId === 10 && (
          <>
            <g filter={`url(#figureShadow-${poseId})`}>
              {/* Standalone Head Resting */}
              <circle cx="245" cy="225" r="18" fill={theme.fill} />
              {/* Full Flat Body */}
              <path d="M 45 232 L 230 232" stroke={theme.stroke} strokeWidth="20" strokeLinecap="round" />
              {/* Relaxed Outward Arms */}
              <path d="M 180 232 L 215 210" stroke={theme.stroke} strokeWidth="15" strokeLinecap="round" />
              {/* Gentle Calming Prana Rings */}
              <circle cx="150" cy="220" r="35" stroke={theme.stroke} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
            </g>

            {/* Reflection */}
            <g opacity="0.4" transform="translate(0, 480) scale(1, -1)">
              <path d="M 45 232 L 230 232" stroke={`url(#reflectGrad-${poseId})`} strokeWidth="20" strokeLinecap="round" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
