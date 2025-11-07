import React from 'react';

// Updated logo for ChirPolly, featuring a unique color for each letter to create a vibrant, playful look,
// as requested by the user.
export const ParrotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 65" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text
      x="50%"
      y="60%"
      fontFamily="Poppins, sans-serif"
      fontSize="40"
      fontWeight="700"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      <tspan fill="#0F766E">C</tspan>
      <tspan fill="#06B6D4">h</tspan>
      <tspan fill="#10B981">i</tspan>
      <tspan fill="#F59E0B">r</tspan>
      <tspan fill="#E11D48">P</tspan>
      <tspan fill="#8B5CF6">o</tspan>
      <tspan fill="#3B82F6">l</tspan>
      <tspan fill="#EC4899">l</tspan>
      <tspan fill="#0F766E">y</tspan>
    </text>
    {/* The parrot icon, its colors adjusted to complement the new letter colors. */}
    <g transform="translate(130, 12)">
      {/* Parrot Body - Color matches 'i' */}
      <path d="M5,0 C -5,5 -5,12 5,15 C 10,12 10,5 5,0 Z" fill="#10B981" />
      {/* Red Beak - Color matches 'P' */}
      <path d="M4,-2 L9,1 L4,4 Z" fill="#E11D48" />
      {/* Eye */}
      <circle cx="4" cy="5" r="1.2" fill="#111827" />
    </g>
  </svg>
);
