import React from 'react';

export const ParrotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="vibo-head" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
      <linearGradient id="vibo-wing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6EE7B7"/>
        <stop offset="100%" stopColor="#A7F3D0"/>
      </linearGradient>
    </defs>

    {/* Shadow */}
    <path d="M150 90 A55 80 0 0 1 40 90 A55 80 0 0 1 150 90 Z" 
        fill="#047857" 
        transform="rotate(15 95 90) translate(5 10)"
    />

    {/* Main Body/Head */}
    <path d="M150 90 A55 80 0 0 1 40 90 A55 80 0 0 1 150 90 Z" 
        fill="url(#vibo-head)" 
        transform="rotate(15 95 90)"
    />

    {/* Wing/Belly Patch */}
    <path d="M90 140 A30 40 0 0 1 130 110 C 130 110 110 150 90 140Z" 
        fill="url(#vibo-wing)" 
        transform="rotate(10 95 90)"
    />

    {/* Beak */}
    <path d="M40 90 C 10 90, 20 50, 50 60 C 70 70, 60 90, 40 90 Z" 
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
    />

    {/* Eye */}
    <circle cx="95" cy="70" r="18" fill="white" />
    <circle cx="100" cy="70" r="10" fill="#1F2937" />
  </svg>
);
