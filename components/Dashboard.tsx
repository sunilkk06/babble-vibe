import React, { useState, useEffect } from 'react';
import type { Scenario, Lesson, View, Challenge } from '../types';
import { ParrotIcon } from './icons/ParrotIcon';
import { StarIcon, BookOpenIcon, LockIcon, ChestIcon, LeaderboardIcon, ChatBubbleIcon, CheckBadgeIcon } from './icons/Icons';
import { SCENARIOS, LESSONS, VIEWS, CHALLENGES } from '../constants';


type LearningItem = (Lesson | Scenario) & { type: 'lesson' | 'scenario' };

interface DashboardProps {
  onScenarioSelect: (scenario: Scenario) => void;
  onLessonSelect: (lesson: Lesson) => void;
  scenarios: Scenario[];
  lessons: Lesson[];
  onNavigate: (view: View) => void;
}

const LearningPathNode: React.FC<{ 
    item: LearningItem; 
    status: 'completed' | 'active' | 'locked'; 
    onClick: () => void;
    align: 'left' | 'right';
}> = ({ item, status, onClick, align }) => {
    
    const isSpecial = item.title.includes("Chest");

    let icon, bgColor, textColor, shadowColor, borderColor, iconColor, statusRingColor;

    switch(status) {
        case 'completed':
            bgColor = 'bg-green-500';
            textColor = 'text-green-800';
            shadowColor = 'shadow-green-300';
            borderColor = 'border-green-600';
            iconColor = 'text-white';
            icon = <StarIcon className="w-8 h-8"/>;
            break;
        case 'active':
            bgColor = 'bg-rose-500';
            textColor = 'text-rose-800';
            shadowColor = 'shadow-rose-300';
            borderColor = 'border-rose-600';
            iconColor = 'text-white';
            statusRingColor = 'ring-rose-300';
            icon = item.type === 'lesson' ? <BookOpenIcon className="w-8 h-8"/> : <ChatBubbleIcon className="w-8 h-8" />;
            break;
        case 'locked':
        default:
            bgColor = 'bg-slate-200';
            textColor = 'text-gray-500';
            shadowColor = 'shadow-slate-200';
            borderColor = 'border-slate-300';
            iconColor = 'text-slate-400';
            icon = isSpecial ? <ChestIcon className="w-8 h-8"/> : <LockIcon className="w-8 h-8"/>;
            break;
    }
    
    if (isSpecial && status !== 'locked') {
        bgColor = 'bg-yellow-400';
        textColor = 'text-yellow-800';
        borderColor = 'border-yellow-500'
        shadowColor = 'shadow-yellow-200';
        iconColor = 'text-white';
        icon = <ChestIcon className="w-8 h-8"/>;
    }

    const alignmentClass = align === 'left' ? 'mr-auto' : 'ml-auto';

    return (
        <div className={`flex flex-col items-center w-1/2 md:w-2/5 ${alignmentClass}`}>
            <button 
                onClick={onClick}
                disabled={status === 'locked'}
                className={`relative group flex items-center justify-center w-24 h-24 rounded-full ${bgColor} border-4 ${borderColor} shadow-lg ${shadowColor} transition-transform duration-300 ${status !== 'locked' ? 'hover:scale-110' : 'cursor-not-allowed'}`}
            >
                {status === 'active' && <div className={`absolute inset-0 rounded-full ring-4 ${statusRingColor} animate-pulse`}></div>}
                <div className={iconColor}>
                    {icon}
                </div>
            </button>
            <p className={`mt-2 text-center font-bold text-sm ${textColor} px-2`}>{item.title}</p>
        </div>
    );
};

export const Dashboard: React.FC<DashboardProps> = ({ onScenarioSelect, onLessonSelect, scenarios, lessons, onNavigate }) => {
    
    // Determine current language from the lessons passed in, which are pre-filtered by language.
    // Fallback to English if no lessons are available for the selected language.
    const currentLangCode = lessons[0]?.lang || 'en';
    
    // The "Basic Greetings" lesson for the current language should have this ID.
    const firstLessonId = `${currentLangCode}_01`;
    
    // Create a more curated and diverse learning path to avoid repetition.
    // NOTE: This uses the full, unfiltered LESSONS and SCENARIOS from constants
    // to allow for a diverse path featuring multiple languages.
    const allItems = [...LESSONS, ...SCENARIOS];
    const curatedPathIds = [
        firstLessonId,   // DYNAMIC: The first lesson matches the selected language
        'cafe-fr',       // French Scenario
        'chest-1',       // Special Reward Chest
        'chat-de',       // German Scenario
        'restaurant-en', // English Scenario
        'interview-de',  // German Career Scenario
        'market-hi',     // Hindi Cultural Scenario
    ];

    const combinedLearningItems: LearningItem[] = curatedPathIds.map(id => {
        if (id === 'chest-1') {
            return {
                lesson_id: 'chest-1', language: 'en', title: 'Reward Chest', description: 'A special reward!', emoji: '💎', lang: 'en', type: 'lesson' as const, category:'Lesson', content:[], quiz:[], level: 'Beginner'
            };
        }
        // Find item in either lessons or scenarios
        const item = allItems.find(i => ('lesson_id' in i ? i.lesson_id : i.id) === id);
        
        if (item) {
             // Determine if it's a lesson or scenario and add the 'type' property
            const type = 'lesson_id' in item ? 'lesson' : 'scenario';
            return { ...item, type: type as 'lesson' | 'scenario' };
        }
        return null;
    }).filter((item): item is LearningItem => item !== null);


    const activeItemIndex = 3; // Hardcoded for demonstration

    const handleNodeClick = (item: LearningItem) => {
        if (item.type === 'lesson') {
            onLessonSelect(item as Lesson);
        } else {
            onScenarioSelect(item as Scenario);
        }
    };
    
    const [dailyGoal, setDailyGoal] = useState<Challenge | null>(null);

    useEffect(() => {
        const dailyChallenges = CHALLENGES.filter(c => c.type === 'daily');
        if (dailyChallenges.length > 0) {
            const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
            setDailyGoal(randomChallenge);
        }
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content: Learning Path */}
            <div className="flex-1">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Your Learning Path</h1>
                    <p className="mt-2 text-lg text-gray-600">Complete each step to advance!</p>
                </div>
                
                <div className="relative flex flex-col items-center space-y-4 py-8">
                    {/* Background path line */}
                    <div className="absolute top-12 bottom-12 left-1/2 w-1 bg-slate-200 -translate-x-1/2 z-0 rounded-full"></div>

                    {combinedLearningItems.map((item, index) => {
                        const align = index % 2 === 0 ? 'left' : 'right';
                        const parrotAlignment = align === 'left' ? 'left-1/4' : 'left-3/4';

                        const itemKey = 'lesson_id' in item ? item.lesson_id : item.id;
                        
                        // Make all lessons active and clickable
                        const status = index < activeItemIndex ? 'completed' : 'active';


                        return (
                            <div key={itemKey} className="relative w-full flex px-4 sm:px-8 z-10">
                                {index === activeItemIndex && (
                                    <div className={`absolute -top-10 ${parrotAlignment} z-20 animate-bounce -translate-x-1/2`}>
                                        <ParrotIcon className="w-20 h-20"/>
                                    </div>
                                )}
                                <LearningPathNode 
                                    item={item}
                                    status={status}
                                    onClick={() => handleNodeClick(item)}
                                    align={align}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 lg:sticky top-8 self-start space-y-6">
                 <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-rose-400">
                    <h3 className="font-bold font-poppins text-gray-800 mb-3">Unlock Leaderboards!</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 rounded-full">
                            <LeaderboardIcon className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-sm text-gray-600">Complete 10 more lessons to start competing.</p>
                    </div>
                 </div>
                 <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-teal-400">
                     <div className="flex justify-between items-center mb-3">
                         <h3 className="font-bold font-poppins text-gray-800">Daily Goal</h3>
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(VIEWS.CHALLENGES); }} className="text-sm font-semibold text-teal-600 hover:text-teal-500">View All</a>
                     </div>
                     <div className="space-y-4">
                        {dailyGoal ? (
                            <div className="flex items-center gap-4">
                                <CheckBadgeIcon className="w-8 h-8 text-amber-500"/>
                                <div>
                                    <p className="font-semibold text-gray-700">{dailyGoal.title}</p>
                                    <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                                        <div className="bg-amber-400 h-2 rounded-full" style={{width: '70%'}}></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                           <p className="text-sm text-gray-500">No daily goals right now. Check back later!</p>
                        )}
                     </div>
                 </div>
                 <div className="bg-white p-5 rounded-xl shadow-lg text-center border-t-4 border-sky-400">
                    <h3 className="font-bold font-poppins text-gray-800 mb-2">Create a profile</h3>
                     <p className="text-sm text-gray-600 mb-4">Save your progress and connect with friends!</p>
                     <div className="space-y-2">
                        <button className="w-full text-center rounded-lg bg-green-500 text-white font-bold py-2 hover:bg-green-600 transition-colors">CREATE A PROFILE</button>
                        <button className="w-full text-center rounded-lg bg-sky-500 text-white font-bold py-2 hover:bg-sky-600 transition-colors">SIGN IN</button>
                     </div>
                 </div>
            </div>
        </div>
    );
};