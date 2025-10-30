import React, { useState } from 'react';
import { analyzeGrammar } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { marked } from 'marked';
import { WORKSHOPS } from '../constants';
import type { Workshop } from '../types';
import { StarIcon, LockIcon, CalendarDaysIcon } from './icons/Icons';

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => (
    <div className="relative bg-white/80 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
        {workshop.isPro && (
            <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-900 shadow-md">
                    <StarIcon className="w-4 h-4 mr-1"/> PRO
                </span>
            </div>
        )}
        <div className="flex items-center gap-x-3 mb-3">
            <div className="p-2 bg-cyan-100/80 rounded-lg">
                <CalendarDaysIcon className="w-6 h-6 text-cyan-700"/>
            </div>
            <div>
                <h3 className="font-bold text-slate-800 line-clamp-2">{workshop.title}</h3>
                <p className="text-sm text-slate-500">{workshop.host}</p>
            </div>
        </div>
        <div className="text-sm text-slate-600 flex-grow mb-4 space-y-1">
            <p><span className="font-semibold">Date:</span> {workshop.date}</p>
        </div>
        <div className="mt-auto flex justify-between items-center">
             <p className="font-bold text-lg text-cyan-800">{workshop.price}</p>
             <Button disabled={workshop.isPro}>
                {workshop.isPro ? <> <LockIcon className="w-4 h-4 mr-1"/> Register</> : 'Register'}
            </Button>
        </div>
    </div>
);

export const GrammarClinicView: React.FC = () => {
    const [text, setText] = useState('');
    const [proofreadText, setProofreadText] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze.');
            return;
        }
        setError('');
        setIsLoading(true);
        setAnalysis('');
        try {
            const result = await analyzeGrammar(text);
            const htmlResult = await marked.parse(result);
            setAnalysis(htmlResult);
        } catch (err) {
            setError('An error occurred while analyzing. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">Advanced Grammar & Writing Clinics</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-3xl mx-auto">Go beyond basic corrections with live workshops and expert proofreading services.</p>
            </div>

             <div className="bg-gradient-to-r from-cyan-400 to-emerald-500 p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center gap-x-4">
                    <div className="bg-white/30 p-3 rounded-full">
                        <StarIcon className="w-8 h-8"/>
                    </div>
                    <div>
                        <h3 className="font-bold font-poppins text-lg">Unlock Your Full Potential with Pro</h3>
                        <p className="text-sm mt-1">Access all premium workshops and get unlimited expert reviews by upgrading your account!</p>
                        <button className="mt-3 inline-flex items-center justify-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cyan-700 shadow-sm hover:bg-slate-100 transition-colors">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Workshops Section */}
            <section>
                <h2 className="text-2xl font-bold text-slate-700 font-poppins mb-4">Live Writing Workshops</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WORKSHOPS.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop}/>)}
                </div>
            </section>
            
            {/* Grammar and Proofreading Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Instant Grammar Check */}
                <section className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold font-poppins mb-4 text-slate-800">Instant Grammar Check</h2>
                    <p className="text-slate-600 mb-4 text-sm">Get a detailed grammatical breakdown of any text. Powered by Gemini 2.5 Pro.</p>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here for an instant AI-powered analysis..."
                        className="w-full h-40 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none bg-white/80"
                        disabled={isLoading}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleAnalyze} disabled={isLoading}>
                            {isLoading ? <><Spinner size="sm" /> Analyzing...</> : 'Analyze Text'}
                        </Button>
                    </div>
                </section>

                {/* Expert Proofreading */}
                 <section className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-2xl font-bold font-poppins mb-4 text-slate-800">Expert Proofreading</h2>
                        <span className="mb-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-900 shadow-md">PRO</span>
                    </div>
                    <p className="text-slate-600 mb-4 text-sm">Submit your writing for review by a native-speaking expert. Get feedback within 24 hours.</p>
                    <textarea
                        value={proofreadText}
                        onChange={(e) => setProofreadText(e.target.value)}
                        placeholder="Upgrade to Pro to submit your text for expert review..."
                        className="w-full h-40 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none bg-white/80"
                        disabled
                    />
                    <div className="mt-4 flex justify-end">
                        <Button disabled>
                            <LockIcon className="w-4 h-4 mr-2"/> Submit for Expert Review
                        </Button>
                    </div>
                </section>
            </div>

            {analysis && (
                <section className="mt-6 bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-lg shadow-lg animate-fade-in">
                     <h2 className="text-2xl font-bold font-poppins mb-4 text-slate-800">Analysis Result</h2>
                     <div
                        className="prose prose-cyan max-w-none prose-p:text-slate-600 prose-headings:text-slate-700"
                        dangerouslySetInnerHTML={{ __html: analysis }}
                    />
                </section>
            )}
        </div>
    );
};