

import React, { useState, useRef } from 'react';
import type { Language } from '../types';
import { MULTILINGUAL_VOCAB } from '../i18n/vocabulary';
import { SpeakerWaveIcon } from './icons/Icons';
import { generateSpeech } from '../services/geminiService';
import { Spinner } from './common/Spinner';

// Helper function to decode base64 audio data into a Uint8Array.
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper function to convert raw PCM audio data into a playable AudioBuffer.
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
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


export const WordBankView: React.FC<{ language: Language }> = ({ language }) => {
    const wordList = MULTILINGUAL_VOCAB[language.code] || [];
    const [loadingWord, setLoadingWord] = useState<string | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const handlePlayAudio = async (word: string, audioPrompt: string) => {
        if (loadingWord) return; // Prevent multiple requests while one is loading
        setLoadingWord(word);

        try {
            const base64Audio = await generateSpeech(audioPrompt);
            if (!base64Audio) {
                throw new Error("No audio data received from API.");
            }

            // Initialize AudioContext on first use
            if (!audioCtxRef.current) {
                // Fix: Added type assertion to handle vendor-prefixed 'webkitAudioContext'.
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
            alert("Sorry, we couldn't play the audio right now. Please try again.");
        } finally {
            setLoadingWord(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg border-t-4 border-sky-400 p-6 mb-8">
                <h1 className="text-3xl font-bold font-poppins text-gray-800">Word Bank: {language.name}</h1>
                <p className="text-lg text-gray-600 mt-1">Explore essential vocabulary.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg border-t-4 border-teal-400 p-6">
                {wordList.length > 0 ? (
                    <div className="space-y-4">
                        {wordList.map((item, index) => (
                            <div key={index} className="p-4 bg-sky-50 rounded-lg border border-sky-200/50 flex items-center">
                                <div className="flex-grow">
                                    <div className="flex items-baseline gap-x-3">
                                        <p className="text-2xl font-bold text-sky-800">{item.word}</p>
                                        <p className="text-lg text-gray-500 font-mono">({item.transliteration})</p>
                                    </div>
                                    <p className="text-gray-700 mt-1"><span className="font-semibold">Meaning:</span> {item.meaning}</p>
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
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No vocabulary available for {language.name} yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
