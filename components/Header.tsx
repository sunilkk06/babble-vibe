
import React from 'react';
import { MenuIcon } from './icons/Icons';
import { ParrotIcon } from './icons/ParrotIcon';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

// A simple progress bar component
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);


interface HeaderProps {
    onToggleSidebar: () => void;
    currentLanguage: Language;
    setCurrentLanguage: (lang: Language) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, currentLanguage, setCurrentLanguage, onLogout }) => {
    // Fake data for gamification
    const userLevel = 5;
    const levelProgress = 60; // 60%

    return (
        <header className="bg-white/60 backdrop-blur-lg sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/30 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-slate-600 md:hidden" onClick={onToggleSidebar}>
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="h-6 w-px bg-slate-900/10 md:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
                 <div className="relative">
                    <select
                        id="language"
                        name="language"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6"
                        value={currentLanguage.code}
                        onChange={(e) => {
                            const newLang = LANGUAGES.find(l => l.code === e.target.value);
                            if (newLang) setCurrentLanguage(newLang);
                        }}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <span className="h-6 w-px bg-slate-900/10" aria-hidden="true" />

                    <div className="flex items-center">
                        <div className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Your profile</span>
                             <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                                <ParrotIcon className="h-6 w-6"/>
                            </div>
                            <div className="hidden lg:flex lg:items-center ml-4 w-40">
                                <div className="w-full">
                                    <span className="text-sm font-semibold leading-6 text-slate-800" aria-hidden="true">
                                        Alex Doe
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-xs font-medium text-amber-600">Level {userLevel}</span>
                                        <ProgressBar progress={levelProgress} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={onLogout} title="Log Out" className="ml-4 text-slate-500 hover:text-slate-700 transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
