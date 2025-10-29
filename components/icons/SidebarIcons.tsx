import React from 'react';

// Duolingo-style colorful icon for the Dashboard
export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M29 34.993H11a1 1 0 01-1-1V19.822a1 1 0 01.3-.707l9-9.034a1 1 0 011.4 0l9 9.034a1 1 0 01.3.707V33.993a1 1 0 01-1 1z" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M10 20l-4 4V10h6l4 4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M30 20l4 4V10h-6l-4 4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M17 25h6v10h-6z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Grammar Clinic
export const GrammarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M9 34V6a2 2 0 012-2h12l8 8v22a2 2 0 01-2 2H11a2 2 0 01-2-2z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M22 4v10h10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M15 20h10M15 26h10" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Visual Vocabulary
export const VocabularyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <rect stroke="#0891B2" strokeWidth="2" x="5" y="7" width="30" height="26" rx="2"></rect>
      <circle fill="#F59E0B" cx="13" cy="15" r="3"></circle>
      <path d="M20.5 24l-6-6L5 27.5V31a2 2 0 002 2h26a2 2 0 002-2v-3l-7.5-7.5-5 5z" fill="#34D399" fillRule="nonzero"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Word Bank
export const WordBankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M9 32V8a3 3 0 013-3h16a3 3 0 013 3v24l-11-6-11 6z" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M9 5h22" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"></path>
      <path d="M16 15h8M16 21h8" stroke="#10B981" strokeWidth="2" strokeLinecap="round"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Community
export const CommunityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 28v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="#06B6D4"></path>
      <circle cx="13" cy="18" r="4" stroke="#06B6D4"></circle>
      <path d="M35 28v-2a4 4 0 00-4-4h-2" stroke="#10B981"></path>
      <path d="M27 18a4 4 0 010 8" stroke="#10B981"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Achievements
export const AchievementsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="none" fillRule="evenodd">
            <circle stroke="#F59E0B" strokeWidth="2" cx="20" cy="21" r="9"></circle>
            <path d="M17 22l2 2 4-4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 13l-2-4h16l-2 4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 9L20 2l8 7" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
);

// Duolingo-style colorful icon for Immersive Media
export const MediaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <rect stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="6" y="8" width="28" height="24" rx="2"></rect>
      <path stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20l5 4-5 4z"></path>
      <path d="M13 32V8M27 32V8" stroke="#64748B" strokeWidth="2" strokeLinecap="round"></path>
    </g>
  </svg>
);

// Duolingo-style colorful icon for Challenges
export const ChallengesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M20 28.5c5.25 0 9.5-4.25 9.5-9.5V7H10.5v12c0 5.25 4.25 9.5 9.5 9.5z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M20 28.5v5M14 33.5h12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M10.5 11h19" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"></path>
    </g>
  </svg>
);