import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ParrotIcon } from './icons/ParrotIcon';
import type { View, Language } from '../types';
import { ALL_VIEWS, VIEWS } from '../constants';
import { TRANSLATIONS } from '../i18n/translations';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentLanguage: Language;
}

const NavLink: React.FC<{
    view: any; // Using `any` due to the dynamic structure of the view object from constants.
    isCurrent: boolean;
    onClick: () => void;
    label: string;
}> = ({ view, isCurrent, onClick, label }) => (
    <li>
        <Link
            to={view.path}
            onClick={onClick}
            className={`w-full flex items-center gap-x-4 px-4 py-3 rounded-xl font-bold text-base transition-all duration-300 uppercase tracking-wider transform hover:scale-105 ${
                isCurrent
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'text-gray-500 hover:bg-rose-100 hover:text-rose-700'
            }`}
        >
            <view.icon
                className="h-8 w-8 shrink-0"
                aria-hidden="true"
            />
            {label}
        </Link>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentLanguage }) => {
    const location = useLocation();
    
    const getTranslatedLabel = (label: string): string => {
        const langCode = currentLanguage.code;
        return TRANSLATIONS[langCode]?.[label] || TRANSLATIONS['en']?.[label] || label;
    };
    
    const navigationContent = (
         <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-50 px-4 pb-4 border-r border-slate-200/80">
            <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex h-32 shrink-0 items-center justify-center cursor-pointer px-0 py-6"
            >
                <ParrotIcon className="h-24 w-auto"/>
            </Link>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-2">
                    <li>
                        <ul role="list" className="space-y-2">
                            {ALL_VIEWS.map((view) => {
                                // Find the full view data with path from the VIEWS constant
                                const viewData = Object.values(VIEWS).find(v => v.id === view.id);
                                // Fix: Use a type guard to ensure `icon` exists on `viewData` before accessing it.
                                // The type of `viewData` is a union, and some views (like Lesson) don't have an icon.
                                if (!viewData || !('path' in viewData) || !('icon' in viewData)) return null;

                                if (view.id === VIEWS.KANJI_LAIR.id && currentLanguage.code !== 'ja') {
                                    return null;
                                }

                                const currentBasePath = location.pathname.split('/')[1];
                                const viewBasePath = (viewData.path as string).split('/')[1];
                                // Determine if the link is active. Handle the root path as a special case.
                                const isCurrent = location.pathname === '/' ? viewData.path === '/' : viewBasePath && currentBasePath === viewBasePath;

                                return (
                                    <NavLink
                                        key={view.id}
                                        view={viewData}
                                        isCurrent={isCurrent}
                                        onClick={() => setIsOpen(false)}
                                        label={getTranslatedLabel(view.label)}
                                    />
                                );
                            })}
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
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
                {navigationContent}
            </div>
        </>
    );
};