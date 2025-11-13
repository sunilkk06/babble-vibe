



import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import type { Scenario, Lesson, Challenge, Persona } from '../types';
import { CHALLENGES, VIEWS, PERSONAS } from '../constants';
import { FireIcon, StarIcon } from './icons/Icons';
import { generateContent as genaiGenerateContent } from '../services/geminiService';

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
        <motion.div 
            className="h-full"
            whileHover={{ y: -3 }}
        >
            <button 
                onClick={onSelect}
                className="w-full h-full text-left p-4 bg-white rounded-xl shadow-md flex items-center gap-x-4 hover:shadow-lg transition-shadow duration-300"
            >
                <div className={`text-2xl ${bg} p-3 rounded-lg`}>{icon}</div>
                <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                </div>
            </button>
        </motion.div>
    );
};

const StatCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-md h-full">
        <h3 className="font-bold text-lg font-poppins text-slate-700 mb-3">{title}</h3>
        <div className="flex items-center gap-4">
            {icon}
            <div className="flex-1">
                {children}
            </div>
        </div>
    </div>
);

const PersonaCard: React.FC<{ persona: Persona; isActive: boolean; onClick: () => void; }> = ({ persona, isActive, onClick }) => {
    const Icon = persona.icon;
    return (
        <motion.button
            onClick={onClick}
            className={`p-4 rounded-xl text-left transition-all duration-300 w-full h-full flex flex-col shadow-lg transform min-h-[180px] ${
                isActive 
                ? 'bg-gradient-to-br from-teal-400 to-sky-500 text-white shadow-teal-500/30' 
                : 'bg-white/70 backdrop-blur-md border border-slate-200/80 text-slate-800 hover:border-teal-300 hover:-translate-y-1'
            }`}
            whileHover={{ y: -4 }}
        >
            <div className={`p-2 rounded-lg mb-3 transition-colors self-start ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
              <Icon className={`w-7 h-7 transition-colors ${isActive ? 'text-white' : 'text-teal-600'}`} />
            </div>
            <h3 className="font-bold font-poppins text-md leading-tight break-words">{persona.label}</h3>
            <p className={`text-sm mt-2 flex-grow ${isActive ? 'text-white/90' : 'text-slate-600'}`}>{persona.description}</p>
        </motion.button>
    );
};


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
    const location = useLocation();
    const navigate = useNavigate();
    const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
    
    useEffect(() => {
        const dailyChallenges = CHALLENGES.filter(c => c.type === 'daily');
        if (dailyChallenges.length > 0) {
            setDailyChallenge(dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)]);
        }
    }, []);
    
    const handleStartChallenge = (challenge: Challenge) => {
        const viewData = challenge.relatedViewId ? Object.values(VIEWS).find(v => v.id === challenge.relatedViewId) : null;
        // If the challenge directs to the dashboard, or has no specific view, navigate to the main challenges page.
        if (viewData?.path && viewData.id !== 'dashboard') {
            navigate(viewData.path);
        } else {
            navigate(VIEWS.CHALLENGES.path);
        }
    };

    const filteredScenarios = scenarios.filter(scenario => 
        activePersona.id === 'all-rounder' || activePersona.categories.includes(scenario.category)
    );

    // Mock data for stats
    const dailyStreak = 4;
    const xpProgress = 150;

    const [genaiPrompt, setGenaiPrompt] = useState('');
    const [genaiResult, setGenaiResult] = useState<string | null>(null);
    const [genaiLoading, setGenaiLoading] = useState(false);

    const handleGenaiRun = async () => {
        if (!genaiPrompt.trim()) return;
        setGenaiLoading(true);
        setGenaiResult(null);
        try {
            const text = await genaiGenerateContent(genaiPrompt.trim());
            setGenaiResult(text);
        } catch (e) {
            setGenaiResult('Sorry, something went wrong generating content.');
        } finally {
            setGenaiLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="text-center md:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-rose-500">
                    Bridging Worlds, One Chirp at a Time.
                </h1>
                <p className="mt-2 text-lg text-gray-600 max-w-2xl md:max-w-none">From the ancient wisdom of Sanskrit to the global language of business, discover a new way to connect.</p>
            </header>

            {/* Simple Gemini content generation demo */}
            <section className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal-400">
                <h2 className="text-xl font-bold text-slate-700 font-poppins mb-2">Quick Generate</h2>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        value={genaiPrompt}
                        onChange={(e) => setGenaiPrompt(e.target.value)}
                        placeholder="Ask Polly (Gemini) anything..."
                        className="flex-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button onClick={handleGenaiRun} disabled={genaiLoading || !genaiPrompt.trim()}
                        className="px-4 py-2 bg-rose-500 text-white rounded-md disabled:bg-slate-300">
                        {genaiLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                {genaiResult && (
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-md whitespace-pre-wrap text-slate-800">
                        {genaiResult}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Your ChirpPath</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PERSONAS.map(persona => (
                        <PersonaCard 
                            key={persona.id}
                            persona={persona}
                            isActive={activePersona.id === persona.id}
                            onClick={() => setActivePersona(persona)}
                        />
                    ))}
                </div>
            </section>
            
            {lessons.length > 0 && (
                 <section>
                    <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Core Lessons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lessons.map(lesson => <ItemCard key={lesson.lesson_id} item={lesson} onSelect={() => onLessonSelect(lesson)} />)}
                    </div>
                </section>
            )}

            {scenarios.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Practice Scenarios</h2>
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <AnimatePresence>
                        {filteredScenarios.map(scenario => (
                            <motion.div 
                                key={scenario.id} 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <ItemCard item={scenario} onSelect={() => onScenarioSelect(scenario)} />
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </motion.div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Discover More</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 opacity-70 cursor-not-allowed">
                        <div className="p-3 bg-indigo-100 rounded-lg text-2xl">📖</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Reading Practice</h3>
                            <p className="text-sm text-slate-600">Interactive stories coming soon!</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 opacity-70 cursor-not-allowed">
                        <div className="p-3 bg-rose-100 rounded-lg text-2xl">🎧</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Listening Skills</h3>
                            <p className="text-sm text-slate-600">Podcasts and audio lessons are on the way.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <button 
                                    onClick={() => dailyChallenge && handleStartChallenge(dailyChallenge)}
                                    className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors flex-shrink-0">
                                    START
                                </button>
                            </div>
                        </StatCard>
                    )}
                </div>
            </section>
        </div>
    );
};