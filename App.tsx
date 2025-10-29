import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ScenarioView } from './components/ScenarioView';
import { LessonView } from './components/LessonView';
import { GrammarClinicView } from './components/GrammarClinicView';
import { ImageEditorView } from './components/ImageEditorView';
import { PlaceholderView } from './components/PlaceholderView';
import { CommunityView } from './components/CommunityView';
import { AchievementsView } from './components/AchievementsView';
import { WordBankView } from './components/WordBankView';
import { Onboarding } from './components/Onboarding';
import { LoginPage } from './components/LoginPage'; // Import the new Login Page
import { MediaView } from './components/MediaView';
import type { View, Scenario, Language, Lesson } from './types';
import { VIEWS, SCENARIOS, LANGUAGES, LESSONS } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(VIEWS.DASHBOARD);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New authentication state

  useEffect(() => {
    if (isAuthenticated) {
      const hasOnboarded = localStorage.getItem('babbleVibeOnboarded');
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
    localStorage.setItem('babbleVibeOnboarded', 'true');
    setShowOnboarding(false);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setCurrentView(VIEWS.SCENARIO);
    setSidebarOpen(false);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentView(VIEWS.LESSON);
    setSidebarOpen(false);
  };
  
  const handleViewChange = (view: View) => {
      setCurrentView(view);
      setCurrentScenario(null);
      setCurrentLesson(null);
      setSidebarOpen(false);
  }

  const renderView = () => {
    const dashboardProps = {
        onScenarioSelect: handleScenarioSelect,
        onLessonSelect: handleLessonSelect,
        scenarios: SCENARIOS.filter(s => s.lang === currentLanguage.code),
        lessons: LESSONS.filter(l => l.lang === currentLanguage.code)
    };

    switch (currentView.id) {
      case VIEWS.DASHBOARD.id:
        return <Dashboard {...dashboardProps} />;
      case VIEWS.SCENARIO.id:
        return currentScenario ? <ScenarioView scenario={currentScenario} language={currentLanguage} /> : <Dashboard {...dashboardProps} />;
      case VIEWS.LESSON.id:
        return currentLesson ? <LessonView lesson={currentLesson} /> : <Dashboard {...dashboardProps} />;
      case VIEWS.GRAMMAR.id:
        return <GrammarClinicView />;
      case VIEWS.IMAGE_EDITOR.id:
        return <ImageEditorView />;
      case VIEWS.WORD_BANK.id:
        return <WordBankView language={currentLanguage} />;
      case VIEWS.COMMUNITY.id:
        return <CommunityView />;
      case VIEWS.ACHIEVEMENTS.id:
        return <AchievementsView />;
      case VIEWS.MEDIA.id:
        return <MediaView language={currentLanguage} />;
      case VIEWS.CHALLENGES.id:
        return <PlaceholderView title="Group Challenges" description="Compete in live quizzes and group games. Leaderboards and friend networks are on their way!" icon={VIEWS.CHALLENGES.icon} />;
      default:
        return <Dashboard {...dashboardProps} />;
    }
  };
  
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gradient-to-br from-cyan-100/30 via-white to-emerald-100/30 min-h-screen flex">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleViewChange} 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen}
        currentLanguage={currentLanguage}
      />
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
