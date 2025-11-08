

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import type { Scenario, Lesson, Challenge } from '../types';
import { CHALLENGES } from '../constants';
import { FireIcon, StarIcon } from './icons/Icons';

// --- Reusable Components ---

const ProgressBar: React.FC<{ progress: number, colorClass?: string }> = ({ progress, colorClass = 'bg-yellow-400' }) => (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
);

const itemColorMap: Record<string, { bg: string; icon: string }> = {
    'en_01': { bg: 'bg-yellow-100', icon: '👋' },
    'restaurant-en': { bg: 'bg-purple-100', icon: '🍽️' },
};

const ItemCard: React.FC<{
    item: Lesson | Scenario;
    onSelect: () => void;
}> = ({ item, onSelect }) => {
    // Fix: Use a type guard to safely access either the `id` from a `Scenario` object or the `lesson_id` from a `Lesson` object.
    const itemId = 'id' in item ? item.id : item.lesson_id;
    const { bg, icon } = itemColorMap[itemId] || { bg: 'bg-slate-100', icon: item.emoji };

    return (
        <motion.button 
            onClick={onSelect}
            className="w-full text-left p-4 bg-white rounded-xl shadow-md flex items-center gap-x-4 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -3 }}
        >
            <div className={`text-2xl ${bg} p-3 rounded-lg`}>{icon}</div>
            <div>
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
            </div>
        </motion.button>
    );
};

const StatCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-bold text-lg font-poppins text-slate-700 mb-3">{title}</h3>
        <div className="flex items-center gap-4">
            {icon}
            <div className="flex-1">
                {children}
            </div>
        </div>
    </div>
);

// --- Main Dashboard Component ---

interface DashboardProps {
  onScenarioSelect: (scenario: Scenario) => void;
  onLessonSelect: (lesson: Lesson) => void;
  scenarios: Scenario[];
  lessons: Lesson[];
  onNavigate: (view: any) => void; // Using any to avoid complex view type from App.tsx
  isInactive: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ onScenarioSelect, onLessonSelect, scenarios, lessons, isInactive }) => {
    const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
    const [parrotAnimationData, setParrotAnimationData] = useState<any>(null);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [parrotState, setParrotState] = useState<'default' | 'happy' | 'sleepy'>('default');

    useEffect(() => {
        const dailyChallenges = CHALLENGES.filter(c => c.type === 'daily');
        if (dailyChallenges.length > 0) {
            setDailyChallenge(dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)]);
        }

        fetch('./animations/parrot-waving.json')
            .then(response => response.json())
            .then(data => setParrotAnimationData(data))
            .catch(error => console.error('Error fetching animation data:', error));
    }, []);
    
    // Handle lesson completion for "happy" animation
    useEffect(() => {
        if (location.state?.lessonCompleted) {
            setParrotState('happy');
            navigate(location.pathname, { replace: true, state: {} }); // Clear state
        }
    }, [location.state, navigate]);

    // Handle inactivity for "sleepy" state
    useEffect(() => {
        if (isInactive) {
            setParrotState('sleepy');
        } else {
            // Only switch from sleepy back to default. Don't interrupt 'happy'.
            if (parrotState === 'sleepy') {
                setParrotState('default');
            }
        }
    }, [isInactive, parrotState]);

     // Control Lottie animation based on parrot's state
    useEffect(() => {
        const lottie = lottieRef.current;
        if (!lottie) return;

        switch (parrotState) {
            case 'happy':
                lottie.setSpeed(2.5);
                lottie.play();
                const happyTimer = setTimeout(() => {
                    setParrotState('default');
                }, 4000);
                return () => clearTimeout(happyTimer);

            case 'sleepy':
                lottie.goToAndStop(27, true); // Frame with half-closed eye
                break;

            case 'default':
            default:
                lottie.setSpeed(1);
                lottie.play();
                break;
        }
    }, [parrotState]);

    // Mock data for stats
    const dailyStreak = 4;
    const xpProgress = 150;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
            
            {/* Main Content Area (Lessons, Scenarios, and Parrot) */}
            <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-8">
                <main className="md:col-span-3 space-y-8">
                    <header>
                        <h1 className="text-4xl font-bold font-poppins text-slate-800">Your Dashboard</h1>
                        <p className="text-lg text-slate-600 mt-1">Pick a lesson or scenario to start!</p>
                    </header>
                    
                    {lessons.length > 0 && (
                         <section>
                            <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Core Lessons</h2>
                            <div className="space-y-4">
                                {lessons.map(lesson => <ItemCard key={lesson.lesson_id} item={lesson} onSelect={() => onLessonSelect(lesson)} />)}
                            </div>
                        </section>
                    )}

                    {scenarios.length > 0 && (
                         <section>
                            <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Practice Scenarios</h2>
                             <div className="space-y-4">
                                {scenarios.map(scenario => <ItemCard key={scenario.id} item={scenario} onSelect={() => onScenarioSelect(scenario)} />)}
                            </div>
                        </section>
                    )}
                </main>

                <div className="md:col-span-2 hidden md:flex justify-center items-center mt-16">
                    {parrotAnimationData && <Lottie lottieRef={lottieRef} animationData={parrotAnimationData} loop={true} style={{ width: '100%', maxWidth: 300 }} />}
                </div>
            </div>

            {/* Right Sidebar for Stats */}
            <aside className="xl:col-span-2 w-full space-y-6">
                <StatCard 
                    title="Daily Streak" 
                    icon={<div className="p-3 bg-yellow-100 rounded-full"><FireIcon className="w-8 h-8 text-yellow-500" /></div>}
                >
                    <div className="flex items-center gap-4">
                        <p className="text-3xl font-bold text-slate-800">{dailyStreak}</p>
                        <ProgressBar progress={dailyStreak / 7 * 100} colorClass="bg-yellow-400" />
                    </div>
                </StatCard>

                <StatCard 
                    title="XP Progress"
                    icon={<div className="p-3 bg-sky-100 rounded-full"><StarIcon className="w-8 h-8 text-sky-500" /></div>}
                >
                     <div className="flex items-center gap-4">
                        <p className="text-3xl font-bold text-slate-800">{xpProgress}<span className="text-lg text-slate-500">XP</span></p>
                        <ProgressBar progress={xpProgress / 200 * 100} colorClass="bg-sky-400" />
                    </div>
                </StatCard>
                
                {dailyChallenge && (
                    <StatCard 
                        title="Challenge"
                        icon={<div className="p-3 bg-purple-100 rounded-full"><StarIcon className="w-8 h-8 text-purple-500" /></div>}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-slate-600">{dailyChallenge.description}</p>
                            <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors flex-shrink-0">
                                START
                            </button>
                        </div>
                    </StatCard>
                )}
            </aside>
        </div>
    );
};