import React from 'react';
import type { Scenario, Lesson } from '../types';
import { ParrotIcon } from './icons/ParrotIcon';
import { StarIcon, BookOpenIcon, LockIcon, ChestIcon, LeaderboardIcon, QuestIcon, ChatBubbleIcon } from './icons/Icons';
import { SCENARIOS, LESSONS } from '../constants';


type LearningItem = (Lesson | Scenario) & { type: 'lesson' | 'scenario' };

interface DashboardProps {
  onScenarioSelect: (scenario: Scenario) => void;
  onLessonSelect: (lesson: Lesson) => void;
  scenarios: Scenario[];
  lessons: Lesson[];
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
            bgColor = 'bg-emerald-500';
            textColor = 'text-emerald-800';
            shadowColor = 'shadow-emerald-300';
            borderColor = 'border-emerald-600';
            iconColor = 'text-white';
            icon = <StarIcon className="w-8 h-8"/>;
            break;
        case 'active':
            bgColor = 'bg-cyan-500';
            textColor = 'text-cyan-800';
            shadowColor = 'shadow-cyan-300';
            borderColor = 'border-cyan-600';
            iconColor = 'text-white';
            statusRingColor = 'ring-cyan-300';
            icon = item.type === 'lesson' ? <BookOpenIcon className="w-8 h-8"/> : <ChatBubbleIcon className="w-8 h-8" />;
            break;
        case 'locked':
        default:
            bgColor = 'bg-slate-300';
            textColor = 'text-slate-500';
            shadowColor = 'shadow-slate-300';
            borderColor = 'border-slate-400';
            iconColor = 'text-slate-500';
            icon = isSpecial ? <ChestIcon className="w-8 h-8"/> : <LockIcon className="w-8 h-8"/>;
            break;
    }
    
    if (isSpecial && status !== 'locked') {
        bgColor = 'bg-amber-400';
        textColor = 'text-amber-800';
        borderColor = 'border-amber-500'
        shadowColor = 'shadow-amber-200';
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

export const Dashboard: React.FC<DashboardProps> = ({ onScenarioSelect, onLessonSelect, scenarios, lessons }) => {
    
    // Create a more curated and diverse learning path to avoid repetition.
    const allItems = [...LESSONS, ...SCENARIOS];
    const curatedPathIds = [
        'sanskrit_01',   // Lesson
        'cafe-fr',       // French Scenario
        'chest-1',       // Special Reward Chest
        'chat-de',       // German Scenario
        'restaurant-en', // English Scenario
        'interview-de',  // German Career Scenario
        'market-es',     // Spanish Scenario
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
    
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content: Learning Path */}
            <div className="flex-1">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">Your Learning Path</h1>
                    <p className="mt-2 text-lg text-slate-600">Complete each step to advance!</p>
                </div>
                
                <div className="relative flex flex-col items-center space-y-4 py-8">
                    {/* Background path line */}
                    <div className="absolute top-12 bottom-12 left-1/2 w-1 bg-slate-200/90 -translate-x-1/2 z-0 rounded-full"></div>

                    {combinedLearningItems.map((item, index) => {
                        const align = index % 2 === 0 ? 'left' : 'right';
                        const parrotAlignment = align === 'left' ? 'left-1/4' : 'left-3/4';

                        const itemKey = 'lesson_id' in item ? item.lesson_id : item.id;

                        return (
                            <div key={itemKey} className="relative w-full flex px-4 sm:px-8 z-10">
                                {index === activeItemIndex && (
                                    <div className={`absolute -top-10 ${parrotAlignment} z-20 animate-bounce -translate-x-1/2`}>
                                        <ParrotIcon className="w-20 h-20"/>
                                    </div>
                                )}
                                <LearningPathNode 
                                    item={item}
                                    status={index < activeItemIndex ? 'completed' : index === activeItemIndex ? 'active' : 'locked'}
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
                 <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg">
                    <h3 className="font-bold font-poppins text-slate-800 mb-3">Unlock Leaderboards!</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-200 rounded-full">
                            <LeaderboardIcon className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-600">Complete 10 more lessons to start competing.</p>
                    </div>
                 </div>
                 <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg">
                     <div className="flex justify-between items-center mb-3">
                         <h3 className="font-bold font-poppins text-slate-800">Daily Quests</h3>
                         <a href="#" className="text-sm font-semibold text-cyan-600 hover:text-cyan-500">View All</a>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <QuestIcon className="w-8 h-8 text-amber-500"/>
                            <div>
                                <p className="font-semibold text-slate-700">Earn 10 XP</p>
                                <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                                    <div className="bg-amber-400 h-2 rounded-full" style={{width: '70%'}}></div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>
                 <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg text-center">
                    <h3 className="font-bold font-poppins text-slate-800 mb-2">Create a profile</h3>
                     <p className="text-sm text-slate-600 mb-4">Save your progress and connect with friends!</p>
                     <div className="space-y-2">
                        <button className="w-full text-center rounded-lg bg-emerald-500 text-white font-bold py-2 hover:bg-emerald-600 transition-colors">CREATE A PROFILE</button>
                        <button className="w-full text-center rounded-lg bg-cyan-500 text-white font-bold py-2 hover:bg-cyan-600 transition-colors">SIGN IN</button>
                     </div>
                 </div>
            </div>
        </div>
    );
};