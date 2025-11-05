

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const location = useLocation();

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
  
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const dashboardProps = {
    onScenarioSelect: handleScenarioSelect,
    onLessonSelect: handleLessonSelect,
    scenarios: SCENARIOS.filter(s => s.lang === currentLanguage.code),
    lessons: LESSONS.filter(l => l.lang === currentLanguage.code),
    onNavigate: (view: View) => navigate(Object.values(VIEWS).find(v => v.id === view.id)?.path || '/')
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
            <Route path={VIEWS.COMMUNITY.path} element={<PlaceholderView title="Community Hub" description="Practice with other learners, find language partners, and join study groups. This feature is coming soon!" icon={CommunityIcon} />} />
            <Route path={VIEWS.ACHIEVEMENTS.path} element={<PlaceholderView title="Achievements" description="Earn badges for your progress, celebrate milestones, and track your learning journey. This feature is under development!" icon={AchievementsIcon} />} />
            <Route path={VIEWS.CHALLENGES.path} element={<PlaceholderView title="Challenges" description="Take on daily and weekly challenges to test your skills and earn rewards. Get ready for some friendly competition!" icon={ChallengesIcon} />} />
            <Route path={VIEWS.TUTORS.path} element={<AITutorView language={currentLanguage} />} />
            <Route path={VIEWS.ABOUT.path} element={<AboutView />} />
            <Route path={VIEWS.TERMS.path} element={<TermsView />} />
            <Route path={VIEWS.PRIVACY.path} element={<PrivacyView />} />
            {/* Fallback route to redirect any unknown paths to the dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}