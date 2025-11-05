
import React, { useState, useRef } from 'react';
import type { Language, LearningModule, LessonUnit, VocabularyWord } from '../types';
import { LEARNING_PATH } from '../i18n/learningPath';
import { SpeakerWaveIcon, LockIcon } from './icons/Icons';
import { generateSpeech } from '../services/geminiService';
import { Spinner } from './common/Spinner';

// --- Audio Decoding Helpers (Required for Text-to-Speech) ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // Fix: Corrected typo from Int116Array to Int16Array.
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


// --- Unit Detail Modal Component ---
const UnitDetailModal: React.FC<{ unit: LessonUnit; onClose: () => void }> = ({ unit, onClose }) => {
    const [loadingWord, setLoadingWord] = useState<string | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const handlePlayAudio = async (word: string, audioPrompt: string) => {
        if (loadingWord) return;
        setLoadingWord(word);

        try {
            const base64Audio = await generateSpeech(audioPrompt);
            if (!base64Audio) throw new Error("No audio data received.");

            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioCtx = audioCtxRef.current;
            
            const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                audioCtx,
                24000,
                1,
            );

            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();

        } catch (error) {
            console.error("Failed to play audio:", error);
            alert("Sorry, we couldn't play the audio right now.");
        } finally {
            setLoadingWord(null);
        }
    };
    
    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-white/30 relative max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold font-poppins text-slate-800">{unit.emoji} {unit.title}</h2>
                </div>
                <div className="overflow-y-auto space-y-3 pr-2">
                     {unit.words.map((item, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg border border-sky-200/50 flex items-center">
                            <div className="flex-grow">
                                <div className="flex items-baseline gap-x-3">
                                    <p className="text-2xl font-bold text-sky-800">{item.word}</p>
                                    <p className="text-lg text-gray-500 font-mono">({item.transliteration})</p>
                                </div>
                                <p className="text-gray-700 mt-1 capitalize"><span className="font-semibold">Meaning:</span> {item.meaning}</p>
                            </div>
                            <button
                                title="Play audio"
                                disabled={!!loadingWord}
                                onClick={() => handlePlayAudio(item.word, item.audio_prompt)}
                                className="p-2 rounded-full bg-sky-100 text-sky-700 ml-4 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors"
                            >
                                {loadingWord === item.word ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <SpeakerWaveIcon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main View Component ---
export const WordBankView: React.FC<{ language: Language }> = ({ language }) => {
    const modules = LEARNING_PATH[language.code] || [];
    const [selectedUnit, setSelectedUnit] = useState<LessonUnit | null>(null);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {selectedUnit && <UnitDetailModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />}
            
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-poppins text-gray-800">Learning Path: {language.name}</h1>
                <p className="text-lg text-gray-600 mt-1">Follow your path from beginner to fluency.</p>
            </div>
            
            {modules.length > 0 ? (
                <div className="space-y-6">
                    {modules.map((module) => (
                        <div key={module.level} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
                            <div className="border-b border-slate-200/80 pb-3 mb-4">
                                <span className="px-3 py-1 text-sm font-bold text-rose-700 bg-rose-100 rounded-full">{module.level}</span>
                                <h2 className="text-2xl font-bold font-poppins text-gray-800 mt-2">{module.theme}</h2>
                                <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {module.units.map(unit => (
                                    <button 
                                        key={unit.unitId}
                                        onClick={() => setSelectedUnit(unit)}
                                        disabled={unit.isLocked}
                                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left transition-all duration-200 hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-2xl">{unit.isLocked ? '🔒' : unit.emoji}</span>
                                            <p className="font-semibold text-gray-700">{unit.title}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white/50 rounded-lg shadow-md">
                    <p className="text-gray-500">No learning path available for {language.name} yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
};