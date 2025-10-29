import React, { useState, useEffect } from 'react';
import { ACHIEVEMENT_BADGES, DAILY_CHALLENGES } from '../constants';
import type { DailyChallenge, AchievementBadge } from '../types';

const BadgeCard: React.FC<{ badge: AchievementBadge }> = ({ badge }) => (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg text-center flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-300">
        <div className="text-5xl mb-3">{badge.icon}</div>
        <h3 className="text-md font-bold text-slate-800">{badge.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{badge.description}</p>
    </div>
);

const DailyChallengeCard: React.FC = () => {
    const [challenge, setChallenge] = useState<DailyChallenge | null>(null);

    useEffect(() => {
        // Pick a random challenge when the component mounts
        setChallenge(DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)]);
    }, []);

    if (!challenge) return null;

    return (
        <div className="bg-gradient-to-r from-cyan-400 to-emerald-500 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-x-4">
                <div className="bg-white/30 p-3 rounded-full text-3xl">
                    {challenge.icon}
                </div>
                <div>
                    <h3 className="font-bold font-poppins text-lg">Today's Chirp Challenge</h3>
                    <p className="font-semibold">{challenge.title}</p>
                    <p className="text-sm mt-1">{challenge.description}</p>
                </div>
            </div>
        </div>
    );
};

export const AchievementsView: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">
                    Achievements & Challenges
                </h1>
                <p className="mt-2 text-lg text-slate-600">Stay motivated on your language journey!</p>
            </div>

            <div className="mb-10">
                <DailyChallengeCard />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Your Badge Collection</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ACHIEVEMENT_BADGES.map(badge => (
                        <BadgeCard key={badge.badge_id} badge={badge} />
                    ))}
                </div>
            </div>
        </div>
    );
};
