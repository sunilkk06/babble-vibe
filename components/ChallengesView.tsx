
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHALLENGES, VIEWS } from '../constants';
import type { Challenge } from '../types';
import { Button } from './common/Button';
import { StarIcon } from './icons/Icons';

const ChallengeCard: React.FC<{
    challenge: Challenge;
    status: 'started' | undefined;
    onStart: (challenge: Challenge) => void;
}> = ({ challenge, status, onStart }) => {
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
                <Button
                    onClick={() => onStart(challenge)}
                    className="w-full"
                    disabled={status === 'started'}
                >
                    {status === 'started' ? 'In Progress...' : 'Start Challenge'}
                </Button>
            </div>
        </div>
    );
};


export const ChallengesView: React.FC = () => {
    const [challengeStatuses, setChallengeStatuses] = useState<Record<string, 'started'>>({});
    const navigate = useNavigate();
    const storageKey = 'chirPollyChallengeStatuses';

    useEffect(() => {
        try {
            const savedStatuses = localStorage.getItem(storageKey);
            if (savedStatuses) {
                setChallengeStatuses(JSON.parse(savedStatuses));
            }
        } catch (error) {
            console.error("Failed to load challenge statuses:", error);
        }
    }, []);

    const handleStartChallenge = (challenge: Challenge) => {
        const newStatuses = { ...challengeStatuses, [challenge.id]: 'started' as const };
        setChallengeStatuses(newStatuses);
        try {
            localStorage.setItem(storageKey, JSON.stringify(newStatuses));
        } catch (error) {
            console.error("Failed to save challenge statuses:", error);
        }

        const viewData = challenge.relatedViewId ? Object.values(VIEWS).find(v => v.id === challenge.relatedViewId) : null;
        if (viewData?.path) {
            navigate(viewData.path);
        } else {
            alert('Challenge started! Complete the task as described in the app.');
        }
    };

    const handleResetProgress = () => {
        setChallengeStatuses({});
        localStorage.removeItem(storageKey);
    };

    const dailyChallenges = CHALLENGES.filter(c => c.type === 'daily');
    const weeklyChallenges = CHALLENGES.filter(c => c.type === 'weekly');
    const eventChallenges = CHALLENGES.filter(c => c.type === 'event');

    return (
        <div className="animate-fade-in space-y-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">
                        Challenges
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">Complete challenges to test your skills and earn rewards!</p>
                </div>
                <button
                    onClick={handleResetProgress}
                    className="flex-shrink-0 text-sm font-semibold text-slate-600 bg-slate-200/80 hover:bg-slate-300/80 px-4 py-2 rounded-lg transition-colors"
                >
                    Reset Progress
                </button>
            </div>

            {eventChallenges.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Special Event</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} status={challengeStatuses[challenge.id]} onStart={handleStartChallenge} />)}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Weekly Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weeklyChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} status={challengeStatuses[challenge.id]} onStart={handleStartChallenge} />)}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Daily Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dailyChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} status={challengeStatuses[challenge.id]} onStart={handleStartChallenge} />)}
                </div>
            </section>

        </div>
    );
};