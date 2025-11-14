import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Blob } from "@google/genai";
import { marked } from 'marked';
import { generateSpeech, getPronunciationFeedback } from '../services/geminiService';
import { MULTILINGUAL_PHRASES } from '../constants';
import type { Language, PracticePhrase, PhraseCategory } from '../types';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { MicrophoneIcon, StopCircleIcon, StarIcon, SpeakerWaveIcon } from './icons/Icons';

// --- Audio Encoding/Decoding Helpers ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

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

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'demo-api-key-for-development' });

// --- Phrase Practice Card Component ---
const PhrasePracticeCard: React.FC<{
    item: PracticePhrase,
    languageName: string,
    isRecordingThis: boolean,
    onRecordToggle: (phraseId: string) => void,
}> = ({ item, languageName, isRecordingThis, onRecordToggle }) => {
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        setTranscription('');
        setFeedback('');
        setIsFeedbackLoading(false);
    }, [item]);

    const handleGetFeedback = async () => {
        if (!transcription) {
            alert("Please record your pronunciation first!");
            return;
        }
        setIsFeedbackLoading(true);
        setFeedback('');
        try {
            const result = await getPronunciationFeedback(item.phrase, transcription, languageName);
            const htmlResult = await marked.parse(result);
            setFeedback(htmlResult);
        } catch (err) {
            console.error(err);
            setFeedback("<p>Sorry, an error occurred while getting feedback.</p>");
        } finally {
            setIsFeedbackLoading(false);
        }
    };

    const handlePlayAudio = async () => {
        if (isAudioLoading) return;
        setIsAudioLoading(true);
        try {
            const base64Audio = await generateSpeech(item.audio_prompt);
            if (!base64Audio) throw new Error("No audio data received.");
            
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioCtx = audioCtxRef.current;
            const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();
        } catch (error) {
            console.error("Failed to play audio:", error);
            alert("Sorry, could not play audio.");
        } finally {
            setIsAudioLoading(false);
        }
    };
    
    useEffect(() => {
        const handleTranscription = (e: any) => {
            if(e.detail.phraseId === item.id) {
                setTranscription(prev => prev + e.detail.text);
            }
        };
        const handleTranscriptionReset = (e: any) => {
            if(e.detail.phraseId === item.id) {
                setTranscription('');
            }
        };
        
        window.addEventListener('gemini-transcription', handleTranscription);
        window.addEventListener('gemini-transcription-reset', handleTranscriptionReset);

        return () => {
            window.removeEventListener('gemini-transcription', handleTranscription);
            window.removeEventListener('gemini-transcription-reset', handleTranscriptionReset);
        };
    }, [item.id]);

    return (
        <div className="bg-white border rounded-lg p-4 space-y-3">
            <div>
                <p className="text-lg font-semibold text-gray-800">{item.phrase}</p>
                <p className="text-sm text-gray-500">"{item.translation}"</p>
            </div>

            <div className="flex items-center gap-x-2">
                 <button
                    onClick={handlePlayAudio}
                    disabled={isAudioLoading}
                    className="p-2 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200 disabled:bg-slate-200 transition-colors"
                    title="Listen to phrase"
                >
                    {isAudioLoading ? <Spinner size="sm"/> : <SpeakerWaveIcon className="w-5 h-5"/>}
                </button>
                <button
                    onClick={() => onRecordToggle(item.id)}
                    className={`p-2 rounded-full transition-colors ${
                        isRecordingThis
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                    title="Record your pronunciation"
                >
                    {isRecordingThis ? <StopCircleIcon className="w-5 h-5"/> : <MicrophoneIcon className="w-5 h-5"/>}
                </button>
                 <div className="flex-grow bg-slate-100 p-2 rounded-lg text-sm italic text-gray-700 min-h-[40px]">
                    {transcription || "..."}
                </div>
            </div>

            {feedback && (
                 <div className="bg-green-50 p-3 rounded-lg animate-fade-in border border-green-200">
                    <h4 className="text-sm font-semibold text-green-700 mb-1">AI Accent Coach</h4>
                    <div className="prose prose-sm max-w-none prose-p:text-green-800" dangerouslySetInnerHTML={{ __html: feedback }} />
                </div>
            )}
            
            <Button onClick={handleGetFeedback} disabled={isFeedbackLoading || isRecordingThis || !transcription} className="w-full text-xs py-2">
                {isFeedbackLoading ? <><Spinner size="sm"/> Analyzing...</> : <><StarIcon className="w-4 h-4 mr-1"/> Analyze Accent (Pro)</>}
            </Button>
        </div>
    );
};

// --- Category Accordion ---
const CategoryAccordion: React.FC<{ 
    category: PhraseCategory,
    languageName: string,
    recordingPhraseId: string | null,
    onRecordToggle: (phraseId: string) => void,
}> = ({ category, languageName, recordingPhraseId, onRecordToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-200/80">
            <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-bold font-poppins text-gray-700">{category.category}</h3>
                <svg className={`w-6 h-6 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-slate-200/80 space-y-4">
                    {category.phrases.map(phrase => (
                        <PhrasePracticeCard 
                            key={phrase.id}
                            item={phrase}
                            languageName={languageName}
                            isRecordingThis={recordingPhraseId === phrase.id}
                            onRecordToggle={onRecordToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// --- Main View Component ---
export const AccentTrainingView: React.FC<{ language: Language }> = ({ language }) => {
    const phraseCategories = MULTILINGUAL_PHRASES[language.code] || [];
    const [recordingPhraseId, setRecordingPhraseId] = useState<string | null>(null);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    
    const stopRecording = async () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
           await audioContextRef.current.close();
           audioContextRef.current = null;
        }
        if (sessionPromiseRef.current) {
            const session = await sessionPromiseRef.current;
            session.close();
            sessionPromiseRef.current = null;
        }
        setRecordingPhraseId(null);
    };

    const startRecording = async (phraseId: string) => {
        setRecordingPhraseId(phraseId);
        window.dispatchEvent(new CustomEvent('gemini-transcription-reset', { detail: { phraseId } }));

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Your browser does not support audio recording.");
                throw new Error("getUserMedia not supported");
            }
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
            scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromiseRef.current?.then((session) => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessorRef.current);
            scriptProcessorRef.current.connect(audioContextRef.current.destination);

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => console.log('Live session opened.'),
                    onmessage: (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            const text = message.serverContent.inputTranscription.text;
                             window.dispatchEvent(new CustomEvent('gemini-transcription', { detail: { phraseId, text } }));
                        }
                    },
                    onerror: (e: ErrorEvent) => { console.error('Live session error:', e); stopRecording(); },
                    onclose: () => console.log('Live session closed.'),
                },
                config: { inputAudioTranscription: {} },
            });

        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Could not start recording. Please ensure you have given microphone permissions.");
            stopRecording();
        }
    };
    
    const handleRecordToggle = (phraseId: string) => {
        if (recordingPhraseId === phraseId) {
            stopRecording();
        } else {
            stopRecording().then(() => startRecording(phraseId));
        }
    };
    
    useEffect(() => {
        // Cleanup on component unmount
        return () => { stopRecording(); };
    }, []);

    const phraseOfTheDay = useMemo(() => {
        if (phraseCategories.length === 0 || phraseCategories[0].phrases.length === 0) return null;
        // Simple logic for "Phrase of the Day": pick the first one.
        // A real app might use the date to pick one.
        return phraseCategories[0].phrases[0];
    }, [phraseCategories]);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
             <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">
                    AI-Powered Accent Training
                </h1>
                <p className="mt-2 text-lg text-gray-600">Practice common phrases and get instant feedback on your pronunciation.</p>
            </div>

            {phraseOfTheDay && (
                 <div className="bg-gradient-to-r from-sky-400 to-teal-400 p-6 rounded-xl shadow-lg">
                    <h2 className="font-bold font-poppins text-lg text-white">Phrase of the Day ✨</h2>
                    <div className="mt-2">
                        <PhrasePracticeCard
                            item={phraseOfTheDay}
                            languageName={language.name}
                            isRecordingThis={recordingPhraseId === phraseOfTheDay.id}
                            onRecordToggle={handleRecordToggle}
                        />
                    </div>
                </div>
            )}

            {phraseCategories.length > 0 ? (
                <div className="space-y-4">
                    {phraseCategories.map(cat => (
                         <CategoryAccordion
                            key={cat.category}
                            category={cat}
                            languageName={language.name}
                            recordingPhraseId={recordingPhraseId}
                            onRecordToggle={handleRecordToggle}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white/50 rounded-lg shadow-md">
                    <p className="text-gray-500">No practice phrases available for {language.name} yet.</p>
                </div>
            )}
        </div>
    );
};