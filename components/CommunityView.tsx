
import React, { useState, useMemo } from 'react';
import { COMMUNITY_USERS, LANGUAGES } from '../constants';
import { Button } from './common/Button';
import type { CommunityUser } from '../types';

const getLanguageName = (code: string): string => {
    return LANGUAGES.find(lang => lang.code === code)?.name || code;
};

const Avatar: React.FC<{ name: string }> = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const colors = ['bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 'bg-pink-500'];
    const color = colors[name.charCodeAt(0) % colors.length];

    return (
        <div className={`w-16 h-16 rounded-full ${color} flex-shrink-0 flex items-center justify-center`}>
            <span className="text-3xl font-bold text-white">{initial}</span>
        </div>
    );
};

const UserCard: React.FC<{ user: CommunityUser }> = ({ user }) => {
    return (
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-x-4 mb-4">
                <Avatar name={user.name} />
                <div>
                    <h3 className="text-lg font-bold text-slate-800">{user.name}</h3>
                </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600 mb-4">
                <p><span className="font-semibold text-slate-700">Speaks:</span> {getLanguageName(user.nativeLanguage)}</p>
                <p><span className="font-semibold text-slate-700">Learning:</span> {getLanguageName(user.learningLanguage)}</p>
            </div>
            <p className="text-slate-500 text-sm flex-grow mb-4">"{user.bio}"</p>
            <div className="mt-auto">
                <Button onClick={() => alert('Real-time chat is coming soon!')} className="w-full">
                    Start a Chat
                </Button>
            </div>
        </div>
    );
};


export const CommunityView: React.FC = () => {
    const [speaksFilter, setSpeaksFilter] = useState('all');
    const [learningFilter, setLearningFilter] = useState('all');
    
    const filteredUsers = useMemo(() => {
        return COMMUNITY_USERS.filter(user => {
            const speaksMatch = speaksFilter === 'all' || user.nativeLanguage === speaksFilter;
            const learningMatch = learningFilter === 'all' || user.learningLanguage === learningFilter;
            return speaksMatch && learningMatch;
        });
    }, [speaksFilter, learningFilter]);

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">
                    Community Hub
                </h1>
                <p className="mt-2 text-lg text-slate-600">Find a language partner to practice with.</p>
            </div>

            {/* Filters */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="speaks-filter" className="block text-sm font-medium text-slate-700 mb-1">
                        Speaks
                    </label>
                    <select
                        id="speaks-filter"
                        value={speaksFilter}
                        onChange={(e) => setSpeaksFilter(e.target.value)}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    >
                        <option value="all">Any Language</option>
                        {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                     <label htmlFor="learning-filter" className="block text-sm font-medium text-slate-700 mb-1">
                        Learning
                    </label>
                    <select
                        id="learning-filter"
                        value={learningFilter}
                        onChange={(e) => setLearningFilter(e.target.value)}
                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    >
                        <option value="all">Any Language</option>
                        {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
            </div>

            {/* User Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => <UserCard key={user.id} user={user} />)
                ) : (
                    <div className="col-span-full text-center py-12 bg-white/50 rounded-lg">
                        <p className="text-slate-500">No users match your criteria. Try different filters!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
