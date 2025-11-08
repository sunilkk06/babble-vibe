

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ScenarioView } from './components/ScenarioView';
import { LessonView } from './components/LessonView';
import { GrammarClinicView } from './components/GrammarClinicView';
import { ImageEditorView } from './components/ImageEditorView';
import { ChallengesView } from './components/ChallengesView';
import { CommunityView } from './components/CommunityView';
import { AchievementsView } from './components/AchievementsView';
import { WordBankView } from './components/WordBankView';
import { Onboarding } from './components/Onboarding';
import { LoginPage } from './components/LoginPage';
import { AITutorView } from './components/AITutorView';
import { TutorView } from './components/TutorView';
import { AccentTrainingView } from './components/AccentTrainingView';
import { KanjiLairView } from './components/KanjiLairView';
import { Footer } from './components/Footer';
import { AboutView } from './components/AboutView';
import { TermsView } from './components/TermsView';
import { PrivacyView } from './components/PrivacyView';
import { LanguagesView } from './components/LanguagesView';
import { PlaceholderView } from './components/PlaceholderView';
import { CommunityIcon, AchievementsIcon, ChallengesIcon, TutorIcon } from './components/icons/SidebarIcons';
import type { View, Scenario, Language, Lesson } from './types';
import { VIEWS, SCENARIOS, LANGUAGES, LESSONS } from './constants';
import { Button } from './components/common/Button';
import { ShareIcon, XMarkIcon } from './components/icons/Icons';

// Wrapper component to handle URL parameters for ScenarioView
const ScenarioViewWrapper = ({ language }: { language: Language }) => {
    const { id } = useParams<{ id: string }>();
    const scenario = SCENARIOS.find(s => s.id === id);
    // If a scenario is not found for the given ID, redirect to the dashboard.
    return scenario ? <ScenarioView scenario={scenario} language={language} /> : <Navigate to="/" replace />;
};

// Wrapper component to handle URL parameters for LessonView
const LessonViewWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const lesson = LESSONS.find(l => l.lesson_id === id);
    // If a lesson is not found for the given ID, redirect to the dashboard.
    return lesson ? <LessonView lesson={lesson} /> : <Navigate to="/" replace />;
};


export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const inactivityTimer = useRef<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const resetInactivityTimer = React.useCallback(() => {
    if (isInactive) {
      setIsInactive(false);
    }
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = window.setTimeout(() => {
      setIsInactive(true);
    }, 120000); // 2 minutes
  }, [isInactive]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetInactivityTimer]);


  useEffect(() => {
    const initializeNativeFeatures = async () => {
      if (Capacitor.isNativePlatform()) {
        await StatusBar.setStyle({ style: Style.Light });
      }
    };
    initializeNativeFeatures();
  }, []);
  
  useEffect(() => {
    // Check if banner was already dismissed
    if (localStorage.getItem('chirPollyInstallDismissed') === 'true') {
        return;
    }
    
    const beforeInstallHandler = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e);
        setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    const checkIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    }
    const checkStandalone = () => ('standalone' in window.navigator) && ((window.navigator as any).standalone);

    if (checkIos() && !checkStandalone()) {
        setIsIos(true);
        setShowInstallBanner(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const hasOnboarded = localStorage.getItem('chirPollyOnboarded');
      if (hasOnboarded !== 'true') {
        setShowOnboarding(true);
      }
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('chirPollyOnboarded', 'true');
    setShowOnboarding(false);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    navigate(VIEWS.SCENARIO.path.replace(':id', scenario.id));
    setSidebarOpen(false);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    navigate(VIEWS.LESSON.path.replace(':id', lesson.lesson_id));
    setSidebarOpen(false);
  };
  
  const handleLanguageChange = (newLang: Language) => {
    if (newLang.code === currentLanguage.code) return; // No change

    const { pathname } = location;
    // Check if the current URL matches the lesson path structure
    const lessonMatch = pathname.match(new RegExp(`^${VIEWS.LESSON.path.replace(':id', '(.*)')}`));
    // Check if the current URL matches the scenario path structure
    const scenarioMatch = pathname.match(new RegExp(`^${VIEWS.SCENARIO.path.replace(':id', '(.*)')}`));

    if (lessonMatch) {
        const currentLessonId = lessonMatch[1];
        const currentLesson = LESSONS.find(l => l.lesson_id === currentLessonId);
        
        if (currentLesson) {
            const lessonIdParts = currentLesson.lesson_id.split('_');
            if (lessonIdParts.length > 1) {
                const lessonIdentifier = lessonIdParts.slice(1).join('_');
                const newLessonId = `${newLang.code}_${lessonIdentifier}`;
                const newLesson = LESSONS.find(l => l.lesson_id === newLessonId);
                
                if (newLesson) {
                    navigate(VIEWS.LESSON.path.replace(':id', newLessonId));
                } else {
                    navigate(VIEWS.DASHBOARD.path);
                }
            } else {
                navigate(VIEWS.DASHBOARD.path);
            }
        }
    } else if (scenarioMatch) {
        const currentScenarioId = scenarioMatch[1];
        const currentScenario = SCENARIOS.find(s => s.id === currentScenarioId);

        if (currentScenario) {
            const scenarioIdParts = currentScenario.id.split('-');
            const langCodeIndex = scenarioIdParts.lastIndexOf(currentLanguage.code);
            
            if (langCodeIndex !== -1) {
                const newScenarioIdParts = [...scenarioIdParts];
                newScenarioIdParts[langCodeIndex] = newLang.code;
                const newScenarioId = newScenarioIdParts.join('-');
                const newScenario = SCENARIOS.find(s => s.id === newScenarioId);

                if (newScenario) {
                    navigate(VIEWS.SCENARIO.path.replace(':id', newScenarioId));
                } else {
                    navigate(VIEWS.DASHBOARD.path);
                }
            } else {
                navigate(VIEWS.DASHBOARD.path);
            }
        }
    }

    if (pathname === VIEWS.KANJI_LAIR.path && newLang.code !== 'ja') {
        navigate(VIEWS.DASHBOARD.path);
    }
    
    setCurrentLanguage(newLang);
  }

  const handleLanguageSelectFromPage = (newLang: Language) => {
    setCurrentLanguage(newLang);
    navigate(VIEWS.DASHBOARD.path);
  };

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        setInstallPrompt(null);
        setShowInstallBanner(false);
    });
  };

  const handleDismissBanner = () => {
      localStorage.setItem('chirPollyInstallDismissed', 'true');
      setShowInstallBanner(false);
  };
  
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const dashboardProps = {
    onScenarioSelect: handleScenarioSelect,
    onLessonSelect: handleLessonSelect,
    scenarios: SCENARIOS.filter(s => s.lang === currentLanguage.code),
    lessons: LESSONS.filter(l => l.lang === currentLanguage.code),
    onNavigate: (view: View) => navigate(Object.values(VIEWS).find(v => v.id === view.id)?.path || '/'),
    isInactive,
  };


  return (
    <div className="bg-gradient-to-br from-sky-200 via-teal-100 to-yellow-100 min-h-screen flex">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen}
        currentLanguage={currentLanguage}
      />
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-72">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path={VIEWS.DASHBOARD.path} element={<Dashboard {...dashboardProps} />} />
            <Route path={VIEWS.LANGUAGES_PAGE.path} element={<LanguagesView onLanguageSelect={handleLanguageSelectFromPage} lessons={LESSONS} />} />
            <Route path={VIEWS.SCENARIO.path} element={<ScenarioViewWrapper language={currentLanguage} />} />
            <Route path={VIEWS.LESSON.path} element={<LessonViewWrapper />} />
            <Route path={VIEWS.GRAMMAR.path} element={<GrammarClinicView />} />
            <Route path={VIEWS.IMAGE_EDITOR.path} element={<ImageEditorView language={currentLanguage} />} />
            <Route path={VIEWS.WORD_BANK.path} element={<WordBankView language={currentLanguage} />} />
            <Route path={VIEWS.KANJI_LAIR.path} element={<KanjiLairView language={currentLanguage} />} />
            <Route path={VIEWS.ACCENT_TRAINING.path} element={<AccentTrainingView language={currentLanguage} />} />
            <Route path={VIEWS.COMMUNITY.path} element={<CommunityView />} />
            <Route path={VIEWS.ACHIEVEMENTS.path} element={<AchievementsView />} />
            <Route path={VIEWS.CHALLENGES.path} element={<ChallengesView />} />
            <Route path={VIEWS.TUTORS.path} element={<TutorView />} />
            <Route path={VIEWS.AI_TUTOR_CHAT.path} element={<AITutorView language={currentLanguage} />} />
            <Route path={VIEWS.ABOUT.path} element={<AboutView />} />
            <Route path={VIEWS.TERMS.path} element={<TermsView />} />
            <Route path={VIEWS.PRIVACY.path} element={<PrivacyView />} />
            {/* Fallback route to redirect any unknown paths to the dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>

       {showInstallBanner && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 border-t border-slate-200/80 shadow-lg z-50 animate-fade-in-up md:ml-72">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img src="/icon.svg" alt="ChirPolly Icon" className="h-12 w-12 hidden sm:block" />
                        <div>
                            <h3 className="font-bold text-slate-800">Get the full experience!</h3>
                            <p className="text-sm text-slate-600">Install ChirPolly on your device for easy access.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {installPrompt && (
                            <Button onClick={handleInstallClick}>Install</Button>
                        )}
                        {isIos && (
                            <p className="text-sm text-slate-600 font-semibold text-center bg-slate-100 p-2 rounded-md flex items-center gap-1">
                                Tap <ShareIcon className="w-5 h-5"/> then "Add to Home Screen"
                            </p>
                        )}
                        <button onClick={handleDismissBanner} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full" title="Dismiss">
                            <XMarkIcon className="h-6 w-6"/>
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}