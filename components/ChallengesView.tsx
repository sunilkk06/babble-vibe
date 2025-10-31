
import React from 'react';
import { CHALLENGES } from '../constants';
import type { Challenge } from '../types';
import { Button } from './common/Button';
import { StarIcon } from './icons/Icons';

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const typeStyles = {
        daily: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' },
        weekly: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
        event: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    };
    const style = typeStyles[challenge.type];

    return (
        <div className={`bg-white border ${style.border} p-5 rounded-xl shadow-lg flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300`}>
            <div className="flex items-start gap-x-4 mb-3">
                <div className="text-4xl">{challenge.icon}</div>
                <div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                        {challenge.type}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-1">{challenge.title}</h3>
                </div>
            </div>
            <p className="text-gray-600 text-sm flex-grow mb-4">{challenge.description}</p>
            <div className="mt-auto space-y-3">
                <div className="flex items-center justify-center gap-x-2 p-2 rounded-lg bg-yellow-100/60 border border-yellow-200/80">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <p className="font-bold text-yellow-700">{challenge.reward}</p>
                </div>
                <Button onClick={() => alert('Challenge accepted! (Feature coming soon)')} className="w-full">
                    Start Challenge
                </Button>
            </div>
        </div>
    );
};


export const ChallengesView: React.FC = () => {
    const dailyChallenges = CHALLENGES.filter(c => c.type === 'daily');
    const weeklyChallenges = CHALLENGES.filter(c => c.type === 'weekly');
    const eventChallenges = CHALLENGES.filter(c => c.type === 'event');

    return (
        <div className="animate-fade-in space-y-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">
                    Challenges
                </h1>
                <p className="mt-2 text-lg text-gray-600">Complete challenges to test your skills and earn rewards!</p>
            </div>

            {eventChallenges.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Special Event</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Weekly Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weeklyChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Daily Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dailyChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
                </div>
            </section>

        </div>
    );
};
