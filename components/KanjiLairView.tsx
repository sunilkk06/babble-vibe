import React, { useState, useMemo } from 'react';
import type { Language, Kanji } from '../types';
import { KANJI_DATA } from '../i18n/kanji';
import { BookOpenIcon } from './icons/Icons';

const getStrokeOrderSvgUrl = (character: string): string => {
    const hex = character.charCodeAt(0).toString(16).padStart(5, '0');
    return `https://kanjivg.tagaini.net/kanjivg/kanji/${hex}.svg`;
}

const KanjiDetailModal: React.FC<{ kanji: Kanji; onClose: () => void }> = ({ kanji, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-white/30 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Character & Stroke Order */}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 bg-white border-4 border-rose-200 rounded-lg flex items-center justify-center">
                            <span className="text-8xl font-bold text-slate-800">{kanji.character}</span>
                        </div>
                        <div className="mt-4 w-full h-40 bg-slate-100 border border-slate-200 rounded-lg p-2">
                             <img src={getStrokeOrderSvgUrl(kanji.character)} alt={`Stroke order for ${kanji.character}`} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold font-poppins text-slate-800">{kanji.meaning}</h2>
                        </div>
                        <div>
                            <h3 className="font-semibold text-teal-700">On'yomi (Chinese Reading)</h3>
                            <p className="text-slate-600 font-mono">{kanji.onyomi.join(', ')}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-rose-700">Kun'yomi (Japanese Reading)</h3>
                            <p className="text-slate-600 font-mono">{kanji.kunyomi.join(', ')}</p>
                        </div>
                         <div className="p-3 bg-sky-50 border-l-4 border-sky-400">
                            <h3 className="font-semibold text-sky-800">Mnemonic</h3>
                            <p className="text-sm text-sky-900 italic">"{kanji.mnemonic}"</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Example Words</h3>
                    <div className="space-y-2">
                        {kanji.examples.map((ex, i) => (
                             <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                                 <div>
                                    <span className="text-lg font-bold text-slate-700">{ex.word}</span>
                                    <span className="ml-3 text-sm text-slate-500">{ex.reading}</span>
                                 </div>
                                 <span className="text-slate-600">{ex.meaning}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KanjiLairView: React.FC<{ language: Language }> = ({ language }) => {
    const [selectedLevel, setSelectedLevel] = useState(5);
    const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);
    const levels = [5, 4, 3, 2, 1];

    const filteredKanji = useMemo(() => {
        return KANJI_DATA.filter(k => k.jlpt === selectedLevel);
    }, [selectedLevel]);
    
    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            {selectedKanji && <KanjiDetailModal kanji={selectedKanji} onClose={() => setSelectedKanji(null)} />}

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Kanji Lair</h1>
                <p className="mt-2 text-lg text-gray-600">Master Japanese characters with mnemonics and structured lessons.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
                {/* Level Selector */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    {levels.map(level => (
                        <button 
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 font-bold rounded-full transition-all duration-300 border-2 ${
                                selectedLevel === level 
                                ? 'bg-rose-500 text-white border-rose-500 shadow-md' 
                                : 'bg-white text-slate-600 border-slate-300 hover:bg-rose-100 hover:border-rose-200'
                            }`}
                        >
                            JLPT N{level}
                        </button>
                    ))}
                    <button disabled className="px-4 py-2 font-bold rounded-full transition-all duration-300 border-2 bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed flex items-center gap-x-2">
                        <BookOpenIcon className="w-5 h-5" /> Review Deck
                    </button>
                </div>
                
                {/* Kanji Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-4">
                    {filteredKanji.map(kanji => (
                        <button
                            key={kanji.character}
                            onClick={() => setSelectedKanji(kanji)}
                            className="aspect-square bg-white border border-slate-200 rounded-lg flex items-center justify-center text-3xl font-bold text-slate-700 transition-transform duration-200 hover:scale-110 hover:bg-rose-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                            {kanji.character}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
