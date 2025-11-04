
import React, { useState, useMemo } from 'react';
import { TUTORS, LANGUAGES } from '../constants';
import type { Tutor } from '../types';
import { Button } from './common/Button';
import { StarIcon } from './icons/Icons';

const getLanguageName = (code: string): string => {
    return LANGUAGES.find(lang => lang.code === code)?.name || code;
};

const TutorCard: React.FC<{ tutor: Tutor }> = ({ tutor }) => (
    <div className="bg-white border-t-4 border-rose-400 p-5 rounded-xl shadow-lg flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
        <div className="relative flex items-center gap-x-4 mb-4">
            <img src={tutor.avatarUrl} alt={tutor.name} className="w-20 h-20 rounded-full object-cover" />
            {tutor.isOnline && (
                <div className="absolute bottom-1 left-14 w-5 h-5 bg-green-500 rounded-full border-2 border-white" title="Online"></div>
            )}
            <div>
                <h3 className="text-lg font-bold text-gray-800">{tutor.name}</h3>
                <p className="text-sm font-semibold text-teal-700">{getLanguageName(tutor.nativeLanguage)} Native</p>
            </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p><span className="font-semibold text-gray-700">Specialty:</span> {tutor.specialty}</p>
        </div>
        <p className="text-gray-500 text-sm flex-grow mb-4">"{tutor.bio}"</p>
        <div className="mt-auto space-y-3">
            <div className="flex items-center justify-center gap-x-2 p-2 rounded-lg bg-sky-100/60 border border-sky-200/80">
                <p className="font-bold text-sky-800">{tutor.pricePerSession}</p>
            </div>
            <Button 
                onClick={() => alert(`Booking a session with ${tutor.name}. Payment integration coming soon!`)} 
                className="w-full"
                disabled={!tutor.isOnline}
            >
                {tutor.isOnline ? 'Book Session' : 'Currently Offline'}
            </Button>
        </div>
    </div>
);

export const TutorView: React.FC = () => {
    const [languageFilter, setLanguageFilter] = useState('all');

    const filteredTutors = useMemo(() => {
        if (languageFilter === 'all') {
            return TUTORS;
        }
        return TUTORS.filter(tutor => tutor.nativeLanguage === languageFilter);
    }, [languageFilter]);

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">
                    Live Native Chats & Micro-Tutoring
                </h1>
                <p className="mt-2 text-lg text-gray-600">Connect with native speakers for on-demand conversation practice and feedback.</p>
            </div>
            
            <div className="bg-gradient-to-r from-sky-400 to-teal-400 p-6 rounded-xl shadow-lg text-white mb-8">
                <div className="flex items-center gap-x-4">
                    <div className="bg-white/30 p-3 rounded-full">
                        <StarIcon className="w-8 h-8"/>
                    </div>
                    <div>
                        <h3 className="font-bold font-poppins text-lg">Unlock Premium Tutoring</h3>
                        <p className="text-sm mt-1">Upgrade to ChirPolly Pro to book unlimited sessions with our top-rated tutors!</p>
                        <button className="mt-3 inline-flex items-center justify-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-teal-700 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="language-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Find a tutor for:
                    </label>
                    <select
                        id="language-filter"
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    >
                        <option value="all">Any Language</option>
                        {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Tutor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map(tutor => <TutorCard key={tutor.id} tutor={tutor} />)
                ) : (
                    <div className="col-span-full text-center py-12 bg-white/50 rounded-lg">
                        <p className="text-gray-500">No tutors available for this language yet. Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};