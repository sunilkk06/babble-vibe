import React from 'react';
import type { Language } from '../types';
import { MULTILINGUAL_VOCAB } from '../i18n/vocabulary';
import { SpeakerWaveIcon } from './icons/Icons';

export const WordBankView: React.FC<{ language: Language }> = ({ language }) => {
    const wordList = MULTILINGUAL_VOCAB[language.code] || [];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 p-6 mb-8">
                <h1 className="text-3xl font-bold font-poppins text-slate-800">Word Bank: {language.name}</h1>
                <p className="text-lg text-slate-600 mt-1">Explore essential vocabulary.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 p-6">
                {wordList.length > 0 ? (
                    <div className="space-y-4">
                        {wordList.map((item, index) => (
                            <div key={index} className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-200/50 flex items-center">
                                <div className="flex-grow">
                                    <div className="flex items-baseline gap-x-3">
                                        <p className="text-2xl font-bold text-cyan-800">{item.word}</p>
                                        <p className="text-lg text-slate-500 font-mono">({item.transliteration})</p>
                                    </div>
                                    <p className="text-slate-700 mt-1"><span className="font-semibold">Meaning:</span> {item.meaning}</p>
                                </div>
                                <button title="Play audio (coming soon)" disabled className="p-2 rounded-full bg-cyan-100/80 text-cyan-700 ml-4 cursor-not-allowed">
                                    <SpeakerWaveIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No vocabulary available for {language.name} yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
