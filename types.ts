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

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
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
