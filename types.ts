// Fix: Import React to resolve namespace errors for React.FC and React.SVGProps.
import React from 'react';

export interface Language {
  code: string;
  name: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  emoji: string;
  systemPrompt: string;
  lang: string;
  category: 'Conversation' | 'Career Focus' | 'Cultural Immersion' | 'Keigo Mastery';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  grammarFeedback?: GrammarFeedback;
}

export interface GrammarFeedback {
  correction: string;
  explanation: string;
}

export interface View {
  id: string;
  label: string;
}

export interface CommunityUser {
  id: string;
  name: string;
  nativeLanguage: string; // Language code
  learningLanguage: string; // Language code
  bio: string;
  isOnline: boolean;
}

export interface LessonContent {
  word: string;
  transliteration: string;
  meaning: string;
  example: string;
  audio: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface CultureCapsule {
  title: string;
  icon: string; // emoji
  content: string; // Markdown content
}

export interface Lesson {
  lesson_id: string;
  language: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  content: LessonContent[];
  quiz: QuizQuestion[];
  emoji: string;
  lang: string;
  category: 'Lesson';
  cultureCapsule?: CultureCapsule;
}

export interface AchievementBadge {
  badge_id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Challenge {
  id: string;
  type: 'daily' | 'weekly' | 'event';
  title: string;
  description: string;
  icon: string;
  reward: string;
  relatedViewId?: string;
}

export interface PostLessonMessage {
  id: string;
  message: string;
}

export interface VocabularyWord {
  word: string;
  transliteration: string;
  meaning: string;
  audio_prompt: string;
}

export interface LessonUnit {
    unitId: string;
    title: string;
    emoji: string;
    words: VocabularyWord[];
    isLocked?: boolean;
}

export interface LearningModule {
    level: string;
    theme: string;
    description: string;
    units: LessonUnit[];
}

export interface MediaItem {
  id: string;
  type: 'podcast' | 'short_film' | 'comic';
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  lang: string;
}

export interface Workshop {
  id: string;
  title: string;
  host: string;
  date: string;
  price: string;
  isPro: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  nativeLanguage: string; // Language code
  specialty: string;
  bio: string;
  isOnline: boolean;
  pricePerSession: string; // e.g., "$15 / 30 min"
  avatarUrl: string;
}

export interface TranscriptionFeedback {
  transcription: string;
  feedback: string;
}

export interface ImageVocabularyWord {
  word: string;
  transliteration: string;
  meaning: string;
}

export interface PracticePhrase {
    id: string;
    phrase: string;
    translation: string;
    audio_prompt: string;
}

export interface PhraseCategory {
    category: string;
    phrases: PracticePhrase[];
}

export interface Kanji {
  character: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  jlpt: number;
  mnemonic: string;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  score: number;
  avatarUrl: string;
}

export interface Persona {
  id: 'all-rounder' | 'traveler' | 'student' | 'professional';
  label: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  categories: (Scenario['category'] | 'Lesson')[];
}
