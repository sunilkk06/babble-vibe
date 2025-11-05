
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ScenarioView } from './components/ScenarioView';
import { LessonView } from './components/LessonView';
import { GrammarClinicView } from './components/GrammarClinicView';
import { ImageEditorView } from './components/ImageEditorView';
import { ImageGeneratorView } from './components/ImageGeneratorView';
import { ChallengesView } from './components/ChallengesView';
import { CommunityView } from './components/CommunityView';
import { AchievementsView } from './components/AchievementsView';
import { WordBankView } from './components/WordBankView';
import { Onboarding } from './components/Onboarding';
import { LoginPage } from './components/LoginPage';
import { TutorView } from './components/TutorView';
import { AccentTrainingView } from './components/AccentTrainingView';
import { KanjiLairView } from './components/KanjiLairView';
import { Footer } from './components/Footer';
import { AboutView } from './components/AboutView';
import { TermsView } from './components/TermsView';
import { PrivacyView } from './components/PrivacyView';
import { LanguagesView } from './components/LanguagesView';
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

  const handleLanguageChange = (newLang: Language) => {
    if (newLang.code === currentLanguage.code) return; // No change

    // If user is in a Lesson view, try to find the equivalent lesson in the new language
    if (currentView.id === VIEWS.LESSON.id && currentLesson) {
        const lessonIdParts = currentLesson.lesson_id.split('_');
        if (lessonIdParts.length > 1) { // e.g., 'es_01' -> ['es', '01']
            const lessonIdentifier = lessonIdParts.slice(1).join('_'); // e.g., '01'
            const newLessonId = `${newLang.code}_${lessonIdentifier}`;
            const newLesson = LESSONS.find(l => l.lesson_id === newLessonId);
            
            if (newLesson) {
                setCurrentLesson(newLesson);
            } else {
                // Fallback: no equivalent lesson found, go to dashboard
                handleViewChange(VIEWS.DASHBOARD);
            }
        } else {
            handleViewChange(VIEWS.DASHBOARD);
        }
    }

    // If user is in a Scenario view, try to find the equivalent scenario
    if (currentView.id === VIEWS.SCENARIO.id && currentScenario) {
        const scenarioIdParts = currentScenario.id.split('-');
        const langCodeIndex = scenarioIdParts.lastIndexOf(currentLanguage.code);
        
        if (langCodeIndex !== -1) { // e.g., 'cafe-fr' -> ['cafe', 'fr']
            const newScenarioIdParts = [...scenarioIdParts];
            newScenarioIdParts[langCodeIndex] = newLang.code;
            const newScenarioId = newScenarioIdParts.join('-');
            const newScenario = SCENARIOS.find(s => s.id === newScenarioId);

            if (newScenario) {
                setCurrentScenario(newScenario);
            } else {
                // Fallback: no equivalent scenario found, go to dashboard
                handleViewChange(VIEWS.DASHBOARD);
            }
        } else {
            handleViewChange(VIEWS.DASHBOARD);
        }
    }

    // If the user is in the Kanji Lair and switches away from Japanese, navigate to the dashboard.
    if (currentView.id === VIEWS.KANJI_LAIR.id && newLang.code !== 'ja') {
        handleViewChange(VIEWS.DASHBOARD);
    }
    
    // Finally, update the language state
    setCurrentLanguage(newLang);
  }

  const handleLanguageSelectFromPage = (newLang: Language) => {
    handleLanguageChange(newLang);
    handleViewChange(VIEWS.DASHBOARD);
  };

  const renderView = () => {
    const dashboardProps = {
        onScenarioSelect: handleScenarioSelect,
        onLessonSelect: handleLessonSelect,
        scenarios: SCENARIOS.filter(s => s.lang === currentLanguage.code),
        lessons: LESSONS.filter(l => l.lang === currentLanguage.code),
        onNavigate: handleViewChange
    };

    switch (currentView.id) {
      case VIEWS.DASHBOARD.id:
        return <Dashboard {...dashboardProps} />;
      case VIEWS.LANGUAGES_PAGE.id:
        return <LanguagesView onLanguageSelect={handleLanguageSelectFromPage} lessons={LESSONS} />;
      case VIEWS.SCENARIO.id:
        return currentScenario ? <ScenarioView scenario={currentScenario} language={currentLanguage} /> : <Dashboard {...dashboardProps} />;
      case VIEWS.LESSON.id:
        return currentLesson ? <LessonView lesson={currentLesson} /> : <Dashboard {...dashboardProps} />;
      case VIEWS.GRAMMAR.id:
        return <GrammarClinicView />;
      case VIEWS.IMAGE_EDITOR.id:
        return <ImageEditorView language={currentLanguage} />;
      case VIEWS.IMAGE_GENERATOR.id:
        return <ImageGeneratorView />;
      case VIEWS.WORD_BANK.id:
        return <WordBankView language={currentLanguage} />;
      case VIEWS.KANJI_LAIR.id:
        return <KanjiLairView language={currentLanguage} />;
      case VIEWS.ACCENT_TRAINING.id:
        return <AccentTrainingView language={currentLanguage} />;
      case VIEWS.COMMUNITY.id:
        return <CommunityView />;
      case VIEWS.ACHIEVEMENTS.id:
        return <AchievementsView />;
      case VIEWS.CHALLENGES.id:
        return <ChallengesView />;
      case VIEWS.TUTORS.id:
        return <TutorView />;
      case VIEWS.ABOUT.id:
        return <AboutView />;
      case VIEWS.TERMS.id:
        return <TermsView />;
      case VIEWS.PRIVACY.id:
        return <PrivacyView />;
      default:
        return <Dashboard {...dashboardProps} />;
    }
  };
  
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gradient-to-br from-sky-200 via-teal-100 to-yellow-100 min-h-screen flex">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleViewChange} 
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
          {renderView()}
        </main>
        <Footer onNavigate={handleViewChange} />
      </div>
    </div>
  );
}
