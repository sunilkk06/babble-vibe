
import React, { useState } from 'react';
import { ParrotIcon } from './icons/ParrotIcon';
import { Button } from './common/Button';
import { SparklesIcon } from './icons/Icons';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to ChirPolly!",
    subtitle: "Meet Vibo — your friendly green parrot guide.",
    body: "Vibo speaks dozens of languages and is excited to help you master one chirp at a time!",
    icon: <ParrotIcon className="h-12 w-auto mx-auto mb-4" />,
  },
  {
    title: "Learn with Joy",
    subtitle: "Earn feathers for every milestone!",
    body: "Each lesson brings you new words, sentences, and fun quizzes.",
    icon: <SparklesIcon className="w-24 h-24 mx-auto mb-4 text-amber-500" />,
  },
  {
    title: "Stay Consistent",
    subtitle: "Practice just 5 minutes a day.",
    body: "Vibo will remind you — gently, not squawk loudly (well, maybe a little).",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto mb-4 text-cyan-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
  },
  {
    title: "Ready to Start?",
    subtitle: "",
    body: "",
    buttonText: "Let’s Chirp!",
    icon: <ParrotIcon className="h-12 w-auto mx-auto mb-4" />,
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const currentStep = onboardingSteps[step];

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-white/30 transform transition-all animate-fade-in">
        {currentStep.icon}

        <h1 className="text-3xl font-bold font-poppins text-slate-800 mb-2">{currentStep.title}</h1>
        
        {currentStep.subtitle && (
          <p className="text-md text-slate-600 font-semibold mb-4">{currentStep.subtitle}</p>
        )}

        {currentStep.body && (
          <p className="text-slate-500">{currentStep.body}</p>
        )}

        <div className="mt-8 flex justify-center gap-x-4">
          {step > 0 && step < onboardingSteps.length - 1 && (
            <button onClick={handleBack} className="inline-flex items-center justify-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-200 transition-colors">Back</button>
          )}

          {step < onboardingSteps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={onComplete}>{currentStep.buttonText}</Button>
          )}
        </div>
        
        <div className="mt-8">
            <div className="flex justify-center gap-x-2">
                {onboardingSteps.map((_, index) => (
                    <div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${step === index ? 'bg-cyan-600' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
                Step {step + 1} of {onboardingSteps.length}
            </p>
        </div>
      </div>
    </div>
  );
};
