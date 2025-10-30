import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Blob } from "@google/genai";
import { marked } from 'marked';
import { getPronunciationFeedback } from '../services/geminiService';
import { MULTILINGUAL_VOCAB } from '../i18n/vocabulary';
import type { Language, VocabularyWord } from '../types';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { MicrophoneIcon, StopCircleIcon, StarIcon } from './icons/Icons';

// --- Audio Encoding ---
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

// --- Component ---

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const WordPracticeCard: React.FC<{ 
    item: VocabularyWord,
    languageName: string,
    isRecordingThis: boolean,
    onRecordToggle: (word: string) => void,
}> = ({ item, languageName, isRecordingThis, onRecordToggle }) => {
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

    useEffect(() => {
        // Reset state if the word changes
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
            const result = await getPronunciationFeedback(item.word, transcription, languageName);
            const htmlResult = await marked.parse(result);
            setFeedback(htmlResult);
        } catch (err) {
            console.error(err);
            setFeedback("<p>Sorry, an error occurred while getting feedback.</p>");
        } finally {
            setIsFeedbackLoading(false);
        }
    };
    
    // This is a global event listener, needs to be specific to the component instance
    useEffect(() => {
        const handleTranscription = (e: any) => {
            if(e.detail.word === item.word) {
                setTranscription(prev => prev + e.detail.text);
            }
        };
        const handleTranscriptionReset = (e: any) => {
            if(e.detail.word === item.word) {
                setTranscription('');
            }
        };
        
        window.addEventListener('gemini-transcription', handleTranscription);
        window.addEventListener('gemini-transcription-reset', handleTranscriptionReset);

        return () => {
            window.removeEventListener('gemini-transcription', handleTranscription);
            window.removeEventListener('gemini-transcription-reset', handleTranscriptionReset);
        };
    }, [item.word]);


    return (
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-5 rounded-xl shadow-lg flex flex-col h-full">
            <div className="flex items-center gap-x-4">
                <button
                    onClick={() => onRecordToggle(item.word)}
                    className={`p-4 rounded-full transition-colors ${
                        isRecordingThis
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-cyan-100/80 text-cyan-700 hover:bg-cyan-200/80'
                    }`}
                >
                    {isRecordingThis ? <StopCircleIcon className="w-8 h-8"/> : <MicrophoneIcon className="w-8 h-8"/>}
                </button>
                <div>
                     <p className="text-2xl font-bold text-cyan-800">{item.word}</p>
                     <p className="text-lg text-slate-500 font-mono">({item.transliteration})</p>
                </div>
            </div>

            <div className="mt-4 flex-grow space-y-4">
                <div className="bg-slate-100/70 p-3 rounded-lg min-h-[60px]">
                    <h4 className="text-sm font-semibold text-slate-600 mb-1">Your Pronunciation (Live Transcription)</h4>
                    <p className="text-slate-800 font-medium italic">{transcription || "..."}</p>
                </div>

                {feedback && (
                     <div className="bg-emerald-50/80 p-3 rounded-lg min-h-[60px] animate-fade-in">
                        <h4 className="text-sm font-semibold text-emerald-700 mb-1">AI Accent Coach</h4>
                        <div className="prose prose-sm max-w-none prose-p:text-emerald-800" dangerouslySetInnerHTML={{ __html: feedback }} />
                    </div>
                )}
            </div>

            <div className="mt-4">
                <Button onClick={handleGetFeedback} disabled={isFeedbackLoading || isRecordingThis} className="w-full">
                    {isFeedbackLoading ? <><Spinner size="sm"/> Analyzing...</> : <><StarIcon className="w-4 h-4 mr-2"/> Analyze Accent (Pro)</>}
                </Button>
            </div>
        </div>
    );
};


export const AccentTrainingView: React.FC<{ language: Language }> = ({ language }) => {
    const wordList = MULTILINGUAL_VOCAB[language.code] || [];
    const [recordingWord, setRecordingWord] = useState<string | null>(null);

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
        setRecordingWord(null);
    };

    const startRecording = async (word: string) => {
        setRecordingWord(word);
        window.dispatchEvent(new CustomEvent('gemini-transcription-reset', { detail: { word } }));

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
                if (sessionPromiseRef.current) {
                     sessionPromiseRef.current.then((session) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                }
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
                             window.dispatchEvent(new CustomEvent('gemini-transcription', { detail: { word, text } }));
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live session error:', e);
                        stopRecording();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Live session closed.');
                    },
                },
                config: {
                    inputAudioTranscription: {},
                },
            });

        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Could not start recording. Please ensure you have given microphone permissions.");
            stopRecording();
        }
    };
    
    const handleRecordToggle = (word: string) => {
        if (recordingWord === word) {
            stopRecording();
        } else {
            if (recordingWord) {
                // Stop the current recording before starting a new one
                stopRecording().then(() => startRecording(word));
            } else {
                startRecording(word);
            }
        }
    };
    
    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            stopRecording();
        };
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
             <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">
                    AI-Powered Accent Training
                </h1>
                <p className="mt-2 text-lg text-slate-600">Practice your pronunciation and get instant feedback from Gemini.</p>
            </div>

            {wordList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wordList.map(item => (
                        <WordPracticeCard 
                            key={item.word} 
                            item={item}
                            languageName={language.name}
                            isRecordingThis={recordingWord === item.word}
                            onRecordToggle={handleRecordToggle}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white/50 rounded-lg">
                    <p className="text-slate-500">No vocabulary available for {language.name} yet.</p>
                </div>
            )}
        </div>
    );
};