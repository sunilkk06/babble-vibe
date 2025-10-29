import React, { useState, useEffect } from 'react';
import type { Lesson } from '../types';
import { Button } from './common/Button';
import { SpeakerWaveIcon } from './icons/Icons';
// Fix: Corrected import name to match the exported member from constants.
import { POST_LESSON_Messages } from '../constants';

export const LessonView: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [viboMessage, setViboMessage] = useState('');


    useEffect(() => {
        if (quizFinished) {
            // Fix: Corrected constant name to match the import.
            const randomMessage = POST_LESSON_Messages[Math.floor(Math.random() * POST_LESSON_Messages.length)];
            setViboMessage(randomMessage.message);
        }
    }, [quizFinished]);

    const currentQuestion = lesson.quiz[currentQuestionIndex];

    const handleOptionSelect = (option: string) => {
        if (showFeedback) return;
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (!selectedOption) return;
        if (selectedOption === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedOption(null);
        if (currentQuestionIndex < lesson.quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };
    
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowFeedback(false);
        setQuizFinished(false);
    }

    const getButtonClass = (option: string) => {
        if (!showFeedback) {
            return selectedOption === option
                ? 'bg-cyan-200 border-cyan-400'
                : 'bg-white/80 hover:bg-cyan-100/60';
        }
        if (option === currentQuestion.answer) {
            return 'bg-emerald-200 border-emerald-400 text-emerald-900';
        }
        if (option === selectedOption) {
            return 'bg-rose-200 border-rose-400 text-rose-900';
        }
        return 'bg-slate-100 border-slate-300 text-slate-500';
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 p-6 mb-8">
                 <h1 className="text-3xl font-bold font-poppins text-slate-800">{lesson.emoji} {lesson.title}</h1>
                 <p className="text-lg text-slate-600 mt-1">{lesson.level} Level</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 p-6 mb-8">
                <h2 className="text-2xl font-bold font-poppins text-slate-700 mb-4">Vocabulary</h2>
                <div className="space-y-4">
                    {lesson.content.map((item, index) => (
                        <div key={index} className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-200/50 flex items-center">
                            <div className="flex-grow">
                                <div className="flex items-baseline gap-x-3">
                                    <p className="text-2xl font-bold text-cyan-800">{item.word}</p>
                                    <p className="text-lg text-slate-500 font-mono">({item.transliteration})</p>
                                </div>
                                <p className="text-slate-700 mt-1"><span className="font-semibold">Meaning:</span> {item.meaning}</p>
                                <p className="text-slate-500 text-sm mt-1">e.g., "{item.example}"</p>
                            </div>
                            <button title="Play audio (coming soon)" disabled className="p-2 rounded-full bg-cyan-100/80 text-cyan-700 ml-4 cursor-not-allowed">
                                <SpeakerWaveIcon className="w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 p-6">
                <h2 className="text-2xl font-bold font-poppins text-slate-700 mb-4">Mini-Quiz!</h2>
                {quizFinished ? (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-slate-800">Quiz Complete!</h3>
                        <p className="text-lg text-slate-600 mt-2">Your Score: <span className="font-bold text-cyan-600">{score}</span> / {lesson.quiz.length}</p>
                        
                        <div className="mt-6 p-4 bg-emerald-100/70 border border-emerald-300/80 rounded-lg animate-fade-in">
                            <p className="text-emerald-800 font-semibold">🦜 Vibo says: "{viboMessage}"</p>
                        </div>

                        <div className="mt-6">
                            <Button onClick={restartQuiz}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg text-slate-700 mb-4">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={showFeedback}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 text-slate-800 ${getButtonClass(option)}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            {showFeedback ? (
                                <Button onClick={handleNextQuestion}>
                                    {currentQuestionIndex < lesson.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                </Button>
                            ) : (
                                <Button onClick={checkAnswer} disabled={!selectedOption}>
                                    Check Answer
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};