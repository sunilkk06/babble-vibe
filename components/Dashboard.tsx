import React, { useState, useEffect, useMemo } from 'react';
import type { Scenario, Lesson, View, Challenge } from '../types';
import { LeaderboardIcon, CheckBadgeIcon } from './icons/Icons';
import { VIEWS, CHALLENGES } from '../constants';


// Reusable card for scenarios and lessons to create a consistent look
const ItemCard: React.FC<{
    item: Lesson | Scenario;
    onSelect: () => void;
}> = ({ item, onSelect }) => (
    <button 
        onClick={onSelect}
        className="w-full text-left p-4 bg-white rounded-xl shadow-md border border-slate-200/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4"
    >
        <div className="text-3xl bg-slate-100 p-3 rounded-lg">{item.emoji}</div>
        <div>
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>
    </button>
);


interface DashboardProps {
  onScenarioSelect: (scenario: Scenario) => void;
  onLessonSelect: (lesson: Lesson) => void;
  scenarios: Scenario[];
  lessons: Lesson[];
  onNavigate: (view: View) => void;
}


export const Dashboard: React.FC<DashboardProps> = ({ onScenarioSelect, onLessonSelect, scenarios, lessons, onNavigate }) => {

    const scenariosByCategory = useMemo(() => {
        return scenarios.reduce((acc, scenario) => {
            const { category } = scenario;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(scenario);
            return acc;
        }, {} as Record<string, Scenario[]>);
    }, [scenarios]);
    
    // Define the order of categories, putting Keigo Mastery first for visibility
    const categoryOrder: Scenario['category'][] = ['Keigo Mastery', 'Conversation', 'Cultural Immersion', 'Career Focus'];

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
            {/* Main Content: Categorized lessons and scenarios */}
            <div className="flex-1 space-y-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Your Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">Pick a lesson or scenario to start!</p>
                </div>
                
                {lessons.length > 0 && (
                     <section>
                        <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Core Lessons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessons.map(lesson => (
                                <ItemCard 
                                    key={lesson.lesson_id} 
                                    item={lesson} 
                                    onSelect={() => onLessonSelect(lesson)} 
                                />
                            ))}
                        </div>
                    </section>
                )}

                {scenarios.length > 0 && (
                     <section>
                        <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-4">Practice Scenarios</h2>
                        <div className="space-y-6">
                            {categoryOrder.map(category => {
                                if (!scenariosByCategory[category]) return null;
                                return (
                                    <div key={category}>
                                        <h3 className="font-semibold text-rose-600 bg-rose-100 px-3 py-1 rounded-full inline-block mb-3">{category}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {scenariosByCategory[category].map(scenario => (
                                                <ItemCard 
                                                    key={scenario.id} 
                                                    item={scenario} 
                                                    onSelect={() => onScenarioSelect(scenario)} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
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