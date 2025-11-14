import React, { useId } from 'react';

// Vibrant parrot facing right with multicolored text on the right
export const ParrotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId();
  const wingGradId = `wingGrad-${uid}`;
  const tailGradId = `tailGrad-${uid}`;
  
  return (
    <svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        {/* Wing gradient - orange to green */}
        <linearGradient id={wingGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA500"/>
          <stop offset="50%" stopColor="#22C55E"/>
          <stop offset="100%" stopColor="#10B981"/>
        </linearGradient>
        
        {/* Tail gradient - rainbow colors */}
        <linearGradient id={tailGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E91E63"/>
          <stop offset="25%" stopColor="#FFA500"/>
          <stop offset="50%" stopColor="#FBBF24"/>
          <stop offset="75%" stopColor="#14B8A6"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>

      {/* Parrot Body - Magenta/Pink */}
      <ellipse cx="45" cy="50" rx="22" ry="28" fill="#E91E63"/>
      
      {/* Parrot Head */}
      <circle cx="60" cy="30" r="18" fill="#E91E63"/>
      
      {/* Parrot Crest - spiky top */}
      <path d="M 55 10 Q 52 0 58 5 Q 60 -2 65 8 Q 68 2 70 12" fill="#E91E63"/>
      
      {/* Eye white */}
      <circle cx="68" cy="28" r="8" fill="white"/>
      
      {/* Eye pupil */}
      <circle cx="70" cy="28" r="5" fill="black"/>
      
      {/* Eye shine */}
      <circle cx="72" cy="26" r="2" fill="white"/>
      
      {/* Beak - yellow/orange */}
      <path d="M 75 30 L 95 32 L 75 36 Z" fill="#FFA500"/>
      <path d="M 95 32 L 100 30 L 95 34 Z" fill="#FFB84D"/>
      
      {/* Wing - orange to green gradient */}
      <ellipse cx="50" cy="55" rx="28" ry="22" fill={`url(#${wingGradId})`} opacity="0.9" transform="rotate(-20 50 55)"/>
      
      {/* Tail feathers - rainbow */}
      <path d="M 35 70 Q 20 85 10 100 L 15 95 Q 25 82 35 70" fill={`url(#${tailGradId})`} opacity="0.95" strokeWidth="0"/>
      <path d="M 30 75 Q 15 92 5 108 L 12 100 Q 22 85 30 75" fill={`url(#${tailGradId})`} opacity="0.8" strokeWidth="0"/>
      <path d="M 25 78 Q 8 98 0 115 L 8 105 Q 18 88 25 78" fill={`url(#${tailGradId})`} opacity="0.7" strokeWidth="0"/>
      
      {/* Text - multicolored letters, closer to parrot, clean sans-serif */}
      <text x="105" y="62" fontFamily="Arial, Helvetica, sans-serif" fontSize="44" fontWeight="700" letterSpacing="-1">
        <tspan fill="#3B82F6">c</tspan>
        <tspan fill="#10B981">h</tspan>
        <tspan fill="#FBBF24">i</tspan>
        <tspan fill="#8B5CF6">r</tspan>
        <tspan fill="#EF4444">P</tspan>
        <tspan fill="#EC4899">o</tspan>
        <tspan fill="#14B8A6">l</tspan>
        <tspan fill="#F59E0B">l</tspan>
        <tspan fill="#06B6D4">y</tspan>
      </text>
    </svg>
  );
};
