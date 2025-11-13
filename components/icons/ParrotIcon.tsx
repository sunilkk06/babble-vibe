import React, { useId } from 'react';

// Vibrant, playful parrot next to the wordmark with bright gradients and accent colors.
// Aimed for a lively, Duolingo-like vibrancy while remaining an original design.
export const ParrotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId();
  const wingId = `wingGrad-${uid}`;
  const bodyId = `bodyGrad-${uid}`;
  const tailId = `tailGrad-${uid}`;
  const crestId = `crestGrad-${uid}`;
  return (
  <svg viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id={wingId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C6F6A6"/>
        <stop offset="45%" stopColor="#8BEB5E"/>
        <stop offset="100%" stopColor="#22C55E"/>
      </linearGradient>
      <linearGradient id={bodyId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7CFC8A"/>
        <stop offset="100%" stopColor="#16A34A"/>
      </linearGradient>
      <linearGradient id={tailId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34D399"/>
        <stop offset="100%" stopColor="#0EA5A4"/>
      </linearGradient>
      <linearGradient id={crestId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF5A5F"/>
        <stop offset="100%" stopColor="#EF4444"/>
      </linearGradient>
    </defs>

    {/* Parrot mark - larger and closer to text for small sizes */}
    <g transform="translate(4,6)">
      {/* Tail */}
      <path d="M20,62 C18,58 18,54 20,51 C30,55 38,58 44,60 C41,64 33,66 20,62 Z" fill={`url(#${tailId})`}/>
      {/* Wing */}
      <path d="M30,30 C46,20 66,18 82,20 C70,26 54,34 40,44 C36,46 32,49 28,52 C26,47 26,38 30,30 Z" fill={`url(#${wingId})`}/>
      {/* Body */}
      <path d="M28,28 C24,35 24,46 28,54 C34,66 48,70 58,66 C64,63 67,58 66,52 C65,44 60,38 52,34 C44,31 35,30 28,28 Z" fill={`url(#${bodyId})`}/>
      {/* Head */}
      <circle cx="56" cy="24" r="12.5" fill="#6EE7B7"/>
      <circle cx="54" cy="26" r="3" fill="#B6F4CE"/>
      <circle cx="60.5" cy="22.5" r="2.2" fill="#0F172A"/>
      {/* Beak */}
      <path d="M64,21 L75,24 L64,27 C61.8,25.4 61.8,22.6 64,21 Z" fill="#FF7A1A"/>
      {/* Crest */}
      <path d="M48,19 C50.5,15 54,13.2 58,13.2 C60.4,13.2 62.4,13.7 64.2,14.6 C61.2,15.1 59,16.5 57.4,18.4 C56,20 55,22 54.6,24.1 C52.6,23.2 50.7,21.8 49.2,20.2 Z" fill={`url(#${crestId})`}/>
    </g>

    {/* Wordmark right next to parrot */}
    <g transform="translate(100,58)">
      <text x="0" y="0" fontFamily="Poppins, ui-sans-serif, system-ui" fontSize="34" fontWeight="900" letterSpacing="0.25">
        <tspan fill="#22C55E">Chir</tspan>
        <tspan fill="#EF4444">Polly</tspan>
      </text>
    </g>
  </svg>
  );
};
