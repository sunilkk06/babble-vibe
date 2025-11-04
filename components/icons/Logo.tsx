import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="parrot-body-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9ACD32"/>
        <stop offset="100%" stopColor="#6B8E23"/>
      </linearGradient>
      <linearGradient id="parrot-body-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6B8E23"/>
        <stop offset="100%" stopColor="#556B2F"/>
      </linearGradient>
    </defs>

    {/* Parrot */}
    <g transform="translate(20, 20)">
      {/* Tail feathers */}
      <path d="M15 25 Q5 15, 10 5 L20 20 Z" fill="#DC143C" opacity="0.9"/>
      <path d="M20 20 Q10 10, 15 0 L25 15 Z" fill="#DC143C"/>

      {/* Body - darker shade */}
      <ellipse cx="45" cy="50" rx="22" ry="28" fill="url(#parrot-body-dark)"/>

      {/* Body - lighter shade */}
      <ellipse cx="40" cy="48" rx="20" ry="26" fill="url(#parrot-body-light)"/>

      {/* Wing */}
      <path d="M38 55 Q30 65, 35 75 Q40 70, 45 75 Q48 65, 38 55 Z" fill="#556B2F" opacity="0.8"/>

      {/* Head */}
      <circle cx="40" cy="35" r="18" fill="#9ACD32"/>

      {/* Eye background */}
      <circle cx="42" cy="32" r="7" fill="white"/>

      {/* Pupil */}
      <circle cx="44" cy="32" r="4" fill="#2F4F2F"/>

      {/* Beak top */}
      <path d="M25 35 Q18 32, 20 28 Q25 30, 30 32 Z" fill="#FF6347" stroke="#DC143C" strokeWidth="1.5"/>

      {/* Beak bottom */}
      <path d="M25 35 Q18 38, 20 42 Q25 40, 30 38 Z" fill="#FF7F50" stroke="#DC143C" strokeWidth="1.5"/>

      {/* Neck accent */}
      <ellipse cx="38" cy="45" rx="8" ry="10" fill="#ADFF2F" opacity="0.6"/>
    </g>

    {/* ChirPolly Text */}
    <g transform="translate(95, 75)">
      {/* "Chir" in red/coral */}
      <text x="0" y="0" fontFamily="Poppins, sans-serif" fontSize="48" fontWeight="700" fill="#DC143C">Chir</text>

      {/* "P" in red/coral */}
      <text x="88" y="0" fontFamily="Poppins, sans-serif" fontSize="48" fontWeight="700" fill="#DC143C">P</text>

      {/* "olly" in green */}
      <text x="122" y="0" fontFamily="Poppins, sans-serif" fontSize="48" fontWeight="700" fill="#6B8E23">olly</text>
    </g>
  </svg>
);
