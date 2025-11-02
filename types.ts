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
  category: 'Conversation' | 'Career Focus';
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
