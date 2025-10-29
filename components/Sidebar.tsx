import React, { Fragment } from 'react';
import { ParrotIcon } from './icons/ParrotIcon';
import type { View, Language } from '../types';
import { ALL_VIEWS, VIEWS } from '../constants';
import { TRANSLATIONS } from '../i18n/translations';

interface SidebarProps {
    currentView: View;
    onNavigate: (view: View) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentLanguage: Language;
}

const NavLink: React.FC<{
    view: View & { icon: React.FC<React.SVGProps<SVGSVGElement>> };
    isCurrent: boolean;
    onClick: () => void;
    label: string;
}> = ({ view, isCurrent, onClick, label }) => (
    <li>
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`w-full flex items-center gap-x-4 px-3 py-2.5 rounded-xl font-bold text-base transition-all duration-200 uppercase tracking-wider ${
                isCurrent
                    ? 'bg-cyan-200/50 border-2 border-cyan-300/70 text-cyan-800'
                    : 'text-slate-500 hover:bg-cyan-100/60 hover:text-cyan-700'
            }`}
        >
            <view.icon
                className="h-8 w-8 shrink-0"
                aria-hidden="true"
            />
            {label}
        </a>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, setIsOpen, currentLanguage }) => {
    
    const getTranslatedLabel = (label: string): string => {
        const langCode = currentLanguage.code;
        return TRANSLATIONS[langCode]?.[label] || label;
    };
    
    const navigationContent = (
         <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/70 backdrop-blur-xl px-4 pb-4 border-r border-white/30">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate(VIEWS.DASHBOARD);
                }}
                className="flex h-16 shrink-0 items-center gap-x-3 cursor-pointer"
            >
                <ParrotIcon className="h-10 w-10"/>
                <span className="font-poppins text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">Babble Vibe</span>
            </a>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-2">
                    <li>
                        <ul role="list" className="space-y-2">
                            {ALL_VIEWS.map((view) => (
                                <NavLink
                                    key={view.id}
                                    view={view}
                                    isCurrent={currentView.id === view.id}
                                    onClick={() => onNavigate(view)}
                                    label={getTranslatedLabel(view.label)}
                                />
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
    
    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`relative z-40 md:hidden ${isOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true">
                <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${isOpen ? 'ease-in-out duration-500 opacity-100' : 'ease-in-out duration-500 opacity-0'}`}></div>
                <div className="fixed inset-0 flex">
                    <div className={`relative mr-16 flex w-full max-w-xs flex-1 transform transition ${isOpen ? 'ease-in-out duration-500 sm:duration-700 translate-x-0' : 'ease-in-out duration-500 sm:duration-700 -translate-x-full'}`}>
                         <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                             <button type="button" className="-m-2.5 p-2.5" onClick={() => setIsOpen(false)}>
                                <span className="sr-only">Close sidebar</span>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {navigationContent}
                    </div>
                </div>
            </div>
            
            {/* Desktop Sidebar */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                {navigationContent}
            </div>
        </>
    );
};