
import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon } from './icons/Icons';
import { ParrotIcon } from './icons/ParrotIcon';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

// A simple progress bar component
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);


interface HeaderProps {
    onToggleSidebar: () => void;
    currentLanguage: Language;
    setCurrentLanguage: (lang: Language) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, currentLanguage, setCurrentLanguage, onLogout }) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    // Fake data for gamification
    const userLevel = 5;
    const levelProgress = 60; // 60%
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/30 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-600 md:hidden" onClick={onToggleSidebar}>
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="h-6 w-px bg-gray-900/10 md:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
                 <div className="relative">
                    <select
                        id="language"
                        name="language"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6"
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
                    <span className="h-6 w-px bg-gray-900/10" aria-hidden="true" />

                    {/* Profile dropdown */}
                    <div className="relative" ref={profileMenuRef}>
                        <button
                            onClick={() => setProfileOpen(!isProfileOpen)}
                            className="-m-1.5 flex items-center p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                            id="user-menu-button"
                            aria-expanded={isProfileOpen}
                            aria-haspopup="true"
                        >
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                                <span className="text-sm font-semibold text-white">AD</span>
                            </div>
                            <div className="hidden lg:flex lg:items-center ml-4">
                                <div className="w-full text-left">
                                    <span className="text-sm font-semibold leading-6 text-gray-800" aria-hidden="true">
                                        Alex Doe
                                    </span>
                                    <div className="flex items-center gap-x-2 w-40">
                                        <span className="text-xs font-medium text-yellow-600">Level {userLevel}</span>
                                        <ProgressBar progress={levelProgress} />
                                    </div>
                                </div>
                            </div>
                            <svg className={`ml-2 h-5 w-5 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {/* Dropdown panel */}
                        {isProfileOpen && (
                            <div
                                className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition ease-out duration-100"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabIndex={-1}
                            >
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>
                                    Your Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>
                                    Settings
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>
                                    Log out
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};