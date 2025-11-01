
import React from 'react';
import type { Language, Lesson } from '../types';
import { LANGUAGES_CONFIG } from '../constants';

interface LanguageCardProps {
    language: { code: string; name: string; emoji: string; };
    lessonCount: number;
    onSelect: (language: Language) => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, lessonCount, onSelect }) => {
    return (
        <button
            onClick={() => onSelect({ code: language.code, name: language.name })}
            className="p-4 sm:p-6 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:border-teal-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label={`Select ${language.name}`}
        >
            <span className="text-4xl sm:text-5xl" role="img" aria-label={`${language.name} flag`}>{language.emoji}</span>
            <h3 className="mt-4 text-md sm:text-lg font-bold text-slate-800">{language.name}</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">{lessonCount} lessons</p>
        </button>
    );
};


interface LanguagesViewProps {
    onLanguageSelect: (language: Language) => void;
    lessons: Lesson[];
}

export const LanguagesView: React.FC<LanguagesViewProps> = ({ onLanguageSelect, lessons }) => {
    
    const getLessonCount = (langCode: string) => {
        return lessons.filter(l => l.lang === langCode).length;
    };

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Choose a Language</h1>
                <p className="mt-2 text-lg text-gray-600">Select a language to start your learning journey.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {LANGUAGES_CONFIG.map(lang => (
                        <LanguageCard
                            key={lang.code}
                            language={lang}
                            lessonCount={getLessonCount(lang.code)}
                            onSelect={onLanguageSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
