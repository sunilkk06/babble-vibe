import React, { useState, useEffect } from 'react';
import type { Lesson } from '../types';
import { Button } from './common/Button';
import { SpeakerWaveIcon } from './icons/Icons';
import { marked } from 'marked';
// Fix: Corrected import name to match the exported member from constants.
import { POST_LESSON_Messages } from '../constants';

export const LessonView: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [pollyMessage, setPollyMessage] = useState('');
    const [cultureCapsuleHtml, setCultureCapsuleHtml] = useState('');


    useEffect(() => {
        if (quizFinished) {
            // Fix: Corrected constant name to match the import.
            const randomMessage = POST_LESSON_Messages[Math.floor(Math.random() * POST_LESSON_Messages.length)];
            setPollyMessage(randomMessage.message);
        }
    }, [quizFinished]);

    useEffect(() => {
        if (lesson.cultureCapsule?.content) {
            const parseContent = async () => {
                const html = await marked.parse(lesson.cultureCapsule.content);
                setCultureCapsuleHtml(html);
            }
            parseContent();
        }
    }, [lesson.cultureCapsule]);

    const hasQuiz = lesson.quiz && lesson.quiz.length > 0;
    const currentQuestion = hasQuiz ? lesson.quiz[currentQuestionIndex] : null;

    const handleOptionSelect = (option: string) => {
        if (showFeedback) return;
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (!selectedOption || !currentQuestion) return;
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
                ? 'bg-rose-200 border-rose-400'
                : 'bg-white hover:bg-rose-100';
        }
    
        // When feedback is shown:
        const isCorrect = currentQuestion && option === currentQuestion.answer;
        const isSelected = option === selectedOption;
    
        if (isCorrect) {
            // The correct answer is always green
            return 'bg-green-200 border-green-400 text-green-900';
        }
        
        if (isSelected && !isCorrect) {
            // The selected incorrect answer is red
            return 'bg-red-200 border-red-400 text-red-900';
        }
        
        // All other incorrect options are grayed out
        return 'bg-slate-100 border-slate-300 text-gray-500';
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg border-t-4 border-rose-400 p-6 mb-8">
                 <h1 className="text-3xl font-bold font-poppins text-gray-800">{lesson.emoji} {lesson.title}</h1>
                 <p className="text-lg text-gray-600 mt-1">{lesson.level} Level</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg border-t-4 border-teal-400 p-6 mb-8">
                <h2 className="text-2xl font-bold font-poppins text-gray-700 mb-4">Vocabulary</h2>
                <div className="space-y-4">
                    {lesson.content.map((item, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg border border-sky-200/50 flex items-center">
                            <div className="flex-grow">
                                <div className="flex items-baseline gap-x-3">
                                    <p className="text-2xl font-bold text-sky-800">{item.word}</p>
                                    <p className="text-lg text-gray-500 font-mono">({item.transliteration})</p>
                                </div>
                                <p className="text-gray-700 mt-1"><span className="font-semibold">Meaning:</span> {item.meaning}</p>
                                <p className="text-gray-500 text-sm mt-1">e.g., "{item.example}"</p>
                            </div>
                            <button title="Play audio (coming soon)" disabled className="p-2 rounded-full bg-sky-100 text-sky-700 ml-4 cursor-not-allowed">
                                <SpeakerWaveIcon className="w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {lesson.cultureCapsule && (
                <div className="bg-white rounded-lg shadow-lg border-t-4 border-emerald-400 p-6 mb-8">
                    <h2 className="text-2xl font-bold font-poppins text-gray-700 mb-4">{lesson.cultureCapsule.icon} {lesson.cultureCapsule.title}</h2>
                    <div className="prose prose-teal max-w-none prose-p:text-gray-600" dangerouslySetInnerHTML={{ __html: cultureCapsuleHtml }} />
                </div>
            )}

            <div className="bg-white rounded-lg shadow-lg border-t-4 border-yellow-400 p-6">
                <h2 className="text-2xl font-bold font-poppins text-gray-700 mb-4">Mini-Quiz!</h2>
                {!hasQuiz ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">This lesson doesn't have a quiz. Great job reviewing the material!</p>
                    </div>
                ) : quizFinished ? (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-gray-800">Quiz Complete!</h3>
                        <p className="text-lg text-gray-600 mt-2">Your Score: <span className="font-bold text-teal-600">{score}</span> / {lesson.quiz.length}</p>
                        
                        <div className="mt-6 p-4 bg-green-100 border border-green-300/80 rounded-lg animate-fade-in">
                            <p className="text-green-800 font-semibold">🦜 Polly says: "{pollyMessage}"</p>
                        </div>

                        <div className="mt-6">
                            <Button onClick={restartQuiz}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                ) : currentQuestion && (
                    <div>
                        <p className="text-lg text-gray-700 mb-4">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={showFeedback}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 text-gray-800 font-medium ${getButtonClass(option)}`}
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