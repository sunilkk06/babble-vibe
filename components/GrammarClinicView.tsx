import React, { useState } from 'react';
import { analyzeGrammar } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { marked } from 'marked';

export const GrammarClinicView: React.FC = () => {
    const [text, setText] = useState('');
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
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">Grammar</h1>
                <p className="mt-2 text-lg text-slate-600">Get a detailed grammatical breakdown of any text. Powered by Gemini 2.5 Pro with max thinking budget for deep analysis.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-lg shadow-lg">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here to analyze its grammar..."
                    className="w-full h-40 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none bg-white/80"
                    disabled={isLoading}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleAnalyze} disabled={isLoading}>
                        {isLoading ? <><Spinner size="sm" /> Analyzing...</> : 'Check My Grammar'}
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="mt-6 flex justify-center items-center">
                    <Spinner />
                    <p className="ml-2 text-slate-600">Thinking...</p>
                </div>
            )}

            {analysis && (
                <div className="mt-6 bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-lg shadow-lg animate-fade-in">
                     <h2 className="text-2xl font-bold font-poppins mb-4 text-slate-800">Analysis Result</h2>
                     <div
                        className="prose prose-cyan max-w-none prose-p:text-slate-600 prose-headings:text-slate-700"
                        dangerouslySetInnerHTML={{ __html: analysis }}
                    />
                </div>
            )}
        </div>
    );
};
