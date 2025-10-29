// Fix: Import React to resolve namespace errors for React.FC and React.SVGProps.
import React from 'react';
import type { Language, Scenario, View, CommunityUser, Lesson, AchievementBadge, DailyChallenge, PostLessonMessage, MediaItem } from './types';
import { HomeIcon, GrammarIcon, VocabularyIcon, CommunityIcon, MediaIcon, ChallengesIcon, AchievementsIcon, WordBankIcon } from './components/icons/SidebarIcons';
import { ChatBubbleIcon } from './components/icons/Icons';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'kn', name: 'Kannada' },
];

export const MOTIVATIONAL_QUOTES: string[] = [
    "A new language is a new life.",
    "To learn a language is to have one more window from which to look at the world.",
    "One language sets you in a corridor for life. Two languages open every door along the way.",
    "The limits of my language are the limits of my world.",
    "Don't be afraid to make mistakes. In learning, they are your stepping stones.",
    "Practice makes progress, not perfect. Keep chirping!",
];

export const COMMUNITY_USERS: CommunityUser[] = [
    {
        id: '1',
        name: 'Maria Garcia',
        nativeLanguage: 'es',
        learningLanguage: 'fr',
        bio: 'Hola! I love French cinema and want to practice my conversation skills. Let\'s chat!'
    },
    {
        id: '2',
        name: 'John Smith',
        nativeLanguage: 'en',
        learningLanguage: 'ja',
        bio: 'I\'m a beginner in Japanese, planning a trip to Tokyo next year. Happy to help with English in return.'
    },
    {
        id: '3',
        name: 'Anne Dubois',
        nativeLanguage: 'fr',
        learningLanguage: 'de',
        bio: 'Bonjour! I work in engineering and need to improve my technical German. I enjoy hiking and cooking.'
    },
    {
        id: '4',
        name: 'Ken Tanaka',
        nativeLanguage: 'ja',
        learningLanguage: 'en',
        bio: 'こんにちは！Looking for a partner to discuss technology and current events in English.'
    },
    {
        id: '5',
        name: 'Lukas Müller',
        nativeLanguage: 'de',
        learningLanguage: 'es',
        bio: 'Guten Tag! I lived in Madrid for a year and want to keep my Spanish fresh. Let\'s talk about travel.'
    },
    {
        id: '6',
        name: 'Chloe Wright',
        nativeLanguage: 'en',
        learningLanguage: 'fr',
        bio: 'Hi! I\'m preparing for a proficiency exam in French. I can help you with English idioms and slang.'
    }
];

export const LESSONS: Lesson[] = [
    {
        lesson_id: "sanskrit_01",
        language: "Sanskrit",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Sanskrit with a fun quiz.",
        level: "Beginner",
        emoji: "🙏",
        lang: 'sa',
        category: 'Lesson',
        content: [
            {
                word: "नमः",
                // Fix: Corrected malformed object key from `transliteration"` to `transliteration`.
                transliteration: "namah",
                meaning: "Hello / Greetings",
                example: "त्वं कथं भवसि? नमः!",
                audio: "audio/namah.mp3"
            },
            {
                word: "धन्यवादः",
                // Fix: Corrected malformed object key from `transliteration"` to `transliteration`.
                transliteration: "dhanyavaadah",
                meaning: "Thank you",
                example: "ते धन्यवादः।",
                audio: "audio/dhanyavaadah.mp3"
            },
            {
                word: "शुभरात्रिः",
                // Fix: Corrected malformed object key from `transliteration"` to `transliteration`.
                transliteration: "shubha-raatrih",
                meaning: "Good night",
                example: "शुभरात्रिः मित्र!",
                audio: "audio/shubharatrih.mp3"
            }
        ],
        quiz: [
            {
                question: "What does 'धन्यवादः' mean?",
                options: ["Hello", "Thank you", "Good night"],
                answer: "Thank you"
            },
            {
                question: "How do you say 'Good night' in Sanskrit?",
                options: ["शुभरात्रिः", "नमः", "धन्यवादः"],
                answer: "शुभरात्रिः"
            }
        ]
    }
];


export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe-fr',
    title: 'Ordering Coffee in Paris',
    description: 'Practice your French by ordering drinks and pastries at a Parisian café.',
    emoji: '☕',
    lang: 'fr',
    category: 'Conversation',
    systemPrompt: "You are a friendly Parisian barista. The user is a customer trying to order in French. Be patient, help them if they struggle, and respond naturally in French. Keep your responses brief and conversational."
  },
  {
    id: 'greetings-fr',
    title: 'French Greetings 101',
    description: 'Learn essential French greetings and farewells for everyday conversations.',
    emoji: '👋',
    lang: 'fr',
    category: 'Conversation',
    systemPrompt: `You are a friendly and encouraging French tutor named Chloé. Your goal is to teach the user basic French greetings.

First, greet the user warmly in French and English. Then, present the following lesson clearly using markdown.

**Lesson: Common French Greetings**

Here are a few essential words to get you started:

*   **Bonjour** - Hello (formal, used during the day)
    *   *Example:* Bonjour, madame ! (Hello, madam!)
*   **Bonsoir** - Good evening
    *   *Example:* Bonsoir, monsieur. (Good evening, sir.)
*   **Salut** - Hi (informal, used with friends)
    *   *Example:* Salut, Marie ! (Hi, Marie!)
*   **Au revoir** - Goodbye
    *   *Example:* Au revoir, à demain ! (Goodbye, see you tomorrow!)
*   **Merci** - Thank you
    *   *Example:* Merci beaucoup ! (Thank you very much!)

After presenting the list, ask the user the following mini-quiz question and wait for their response:

**Mini-Quiz!**
What would you say to a friend you meet in the afternoon?
A) Bonjour
B) Salut
C) Bonsoir

Provide feedback on their answer.`
  },
  {
    id: 'directions-ja',
    title: 'Asking for Directions in Tokyo',
    description: 'Navigate the bustling streets of Tokyo by asking for directions in Japanese.',
    emoji: '🗺️',
    lang: 'ja',
    category: 'Conversation',
    systemPrompt: "You are a helpful local in Tokyo. The user is a lost tourist asking for directions in Japanese. Provide simple, clear directions and be encouraging. Respond in Japanese."
  },
  {
    id: 'market-es',
    title: 'At the Market in Madrid',
    description: 'Haggle for prices and buy groceries at a vibrant Spanish market.',
    emoji: '🍎',
    lang: 'es',
    category: 'Conversation',
    systemPrompt: "You are a vendor at a market in Madrid. The user wants to buy some fruit. Interact with them in Spanish, be lively, and maybe try to upsell them on your best produce."
  },
  {
    id: 'interview-de',
    title: 'Job Interview in Berlin',
    description: 'Practice for a professional job interview with a German tech company.',
    emoji: '💼',
    lang: 'de',
    category: 'Career Focus',
    systemPrompt: "You are a hiring manager at a tech startup in Berlin conducting a job interview in German. Ask the user common interview questions about their skills and experience. Maintain a professional but friendly tone."
  },
  {
    id: 'chat-de',
    title: 'German Chat: Lukas & Anna',
    description: 'Follow a simple conversation between two friends and practice your German.',
    emoji: '🍻',
    lang: 'de',
    category: 'Conversation',
    systemPrompt: `You are a German language coach. Your task is to present a simple conversation script and then invite the user to practice.

First, present this conversation script clearly:

**Conversation: Ein Tag in Berlin**

**(1. Greetings)**
**Lukas:** Hallo Anna! Wie geht's? (Hello Anna! How's it going?)
**Anna:** Hallo Lukas! Gut, danke. Und dir? (Hello Lukas! Good, thanks. And you?)

**(2. Ordering Food)**
**Lukas:** Ich habe Hunger. Ich bestelle eine Currywurst. (I'm hungry. I'm ordering a currywurst.)
**Anna:** Gute Idee! Ich nehme ein Schnitzel. (Good idea! I'll have a schnitzel.)

**(3. Travel Plans)**
**Lukas:** Fährst du morgen nach Hamburg? (Are you going to Hamburg tomorrow?)
**Anna:** Ja, ich fahre mit dem Zug. (Yes, I'm going by train.)

After presenting the script, invite the user to practice by taking on the role of Anna. Start the conversation by saying:

"Super! Now, let's practice. You are Anna. I'll start as Lukas."

Then, as Lukas, say the first line and wait for the user's response: "Hallo, ich bin Lukas. Wie geht's?"`
  },
  {
    id: 'restaurant-en',
    title: 'Dinner Reservation',
    description: 'Call a restaurant to book a table for a special occasion.',
    emoji: '🍽️',
    lang: 'en',
    category: 'Conversation',
    systemPrompt: "You are a host at a popular restaurant. The user is calling to make a dinner reservation. Guide them through the process, asking for the date, time, and number of guests. Be polite and helpful."
  },
  {
    id: 'vocab-sa',
    title: 'First Words in Sanskrit',
    description: 'Learn 20 essential Sanskrit words to begin your journey.',
    emoji: '🕉️',
    lang: 'sa',
    category: 'Conversation',
    systemPrompt: `You are a Sanskrit Guru. The user is a new student. Greet them warmly in English and Sanskrit (e.g., 'Namaste!'). Your first task is to present a list of 20 foundational Sanskrit words with their English translations and a simple example sentence for each. Format this list clearly using markdown. After presenting the list, encourage the user to try using one of the words.

Here is the list to provide:
- **नमस्ते (Namaste)** - Hello/Greetings - *नमस्ते, मित्र!* (Hello, friend!)
- **धन्यवादः (Dhanyavādah)** - Thank you - *साहाय्यार्थं धन्यवादः।* (Thank you for the help.)
- **जलम् (Jalam)** - Water - *कृपया मह्यं जलं ददातु।* (Please give me water.)
- **सूर्यः (Sūryah)** - Sun - *सूर्यः आकाशे प्रकाशते।* (The sun shines in the sky.)
- **चन्द्रः (Chandrah)** - Moon - *रात्रौ चन्द्रः दृश्यते।* (The moon is seen at night.)
- **अग्निः (Agnih)** - Fire - *अग्निः उष्णः अस्ति।* (Fire is hot.)
- **पुस्तकम् (Pustakam)** - Book - *अहं पुस्तकं पठामi।* (I am reading a book.)
- **गृहम् (Gr̥ham)** - House - *मम गृहं सुन्दरम् अस्ति।* (My house is beautiful.)
- **मित्रम् (Mitram)** - Friend - *सः मम मित्रम् अस्ति।* (He is my friend.)
- **गुरुः (Guruh)** - Teacher - *गुरुः ज्ञानं ददाति।* (The teacher gives knowledge.)
- **फलम् (Phalam)** - Fruit - *अहं फलं खादामि।* (I eat fruit.)
- **वृक्षः (Vr̥kṣaḥ)** - Tree - *उद्याने एकः वृक्षः अस्ति।* (There is a tree in the garden.)
- **पुष्पम् (Puṣpam)** - Flower - *पुष्पं सुगन्धितम् अस्ति।* (The flower is fragrant.)
- **योगः (Yogaḥ)** - Yoga/Union - *योगः मनः शान्तं करोति।* (Yoga calms the mind.)
- **शान्तिः (Śāntiḥ)** - Peace - *सर्वत्र शान्तिः भवतु।* (Let there be peace everywhere.)
- **प्रेम (Prema)** - Love - *प्रेम सर्वत्र विजयते।* (Love conquers all.)
- **सत्यम् (Satyam)** - Truth - *सत्यं वद।* (Speak the truth.)
- **धर्मः (Dharmaḥ)** - Duty/Righteousness - *स्वधर्मं पालय।* (Follow your duty.)
- **कर्म (Karma)** - Action/Deed - *कर्मफलं निश्चितम्।* (The result of an action is certain.)
- **मोक्षः (Mokṣaḥ)** - Liberation/Freedom - *मोक्षः जीवनस्य परमं लक्ष्यम्।* (Liberation is the ultimate goal of life.)`
  }
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
    {
        badge_id: "b001",
        name: "Feathered Fluent",
        description: "Complete 5 lessons in one week.",
        icon: "🪶"
    },
    {
        badge_id: "b002",
        name: "Chirpy Beginner",
        description: "Finish your first language lesson.",
        icon: "🐣"
    },
    {
        badge_id: "b003",
        name: "Daily Song",
        description: "Practice for 7 days in a row.",
        icon: "🎵"
    },
    {
        badge_id: "b004",
        name: "Vibo’s Favorite",
        description: "Score 90% or more on a quiz.",
        icon: "💚"
    },
    {
        badge_id: "b005",
        name: "Polyglot Parrot",
        description: "Try lessons in 3 different languages.",
        icon: "🦜"
    },
    {
        badge_id: "b006",
        name: "Grammar Guru",
        description: "Use the Grammar Clinic 10 times.",
        icon: "🧑‍🏫"
    }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
    {
        id: 'dc01',
        title: "Translate This!",
        description: "Translate 'Good morning, how are you?' into your target language without using a translator.",
        icon: "↔️"
    },
    {
        id: 'dc02',
        title: "Adjective Adventure",
        description: "Describe your favorite food using 5 new adjectives you learned this week.",
        icon: "🍕"
    },
    {
        id: 'dc03',
        title: "Listen Up!",
        description: "Listen to a song in your target language and write down 3 words you recognize.",
        icon: "🎶"
    },
    {
        id: 'dc04',
        title: "Quick Query",
        description: "Ask a question in a conversation scenario, like 'What time is it?' or 'Where is the library?'",
        icon: "❓"
    },
    {
        id: 'dc05',
        title: "Photo Flashcard",
        description: "Use the Vocabulary tool to add a label to a photo of something in your room.",
        icon: "🖼️"
    }
];

export const POST_LESSON_Messages: PostLessonMessage[] = [
    { id: 'plm01', message: "Squawk! You're a natural! That was amazing!" },
    { id: 'plm02', message: "Great job! My feathers are ruffled with excitement for your progress!" },
    { id: 'plm03', message: "You're smarter than a cracker-stealing crow! Keep it up!" },
    { id: 'plm04', message: "Wow! You're learning so fast, you'll be teaching me soon!" },
    { id: 'plm05', message: "That was perfect! You deserve a shiny seed... or maybe another lesson?" }
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'podcast-fr-1',
    type: 'podcast',
    title: 'Le Français Quotidien',
    description: 'A short podcast discussing daily life in Paris, perfect for intermediate learners.',
    thumbnailUrl: 'https://picsum.photos/seed/podcast1/400/300',
    duration: '12 min',
    lang: 'fr',
  },
  {
    id: 'film-es-1',
    type: 'short_film',
    title: 'Un Día en Madrid',
    description: 'Follow a character through a day in Madrid in this beautifully shot short film.',
    thumbnailUrl: 'https://picsum.photos/seed/film1/400/300',
    duration: '8:45',
    lang: 'es',
  },
  {
    id: 'comic-ja-1',
    type: 'comic',
    title: '猫の冒険 (Neko no Bōken)',
    description: 'An interactive comic about a cat exploring Tokyo. Tap panels to see translations.',
    thumbnailUrl: 'https://picsum.photos/seed/comic1/400/300',
    duration: '10 min read',
    lang: 'ja',
  },
  {
    id: 'podcast-de-1',
    type: 'podcast',
    title: 'Kaffeeklatsch',
    description: 'Listen to a casual chat in German about culture and hobbies.',
    thumbnailUrl: 'https://picsum.photos/seed/podcast2/400/300',
    duration: '15 min',
    lang: 'de',
  },
  {
    id: 'film-en-1',
    type: 'short_film',
    title: 'The London Commute',
    description: 'A dialogue-heavy short film about two people meeting on the tube.',
    thumbnailUrl: 'https://picsum.photos/seed/film2/400/300',
    duration: '6:20',
    lang: 'en',
  },
    {
    id: 'podcast-sa-1',
    type: 'podcast',
    title: 'Sanskrit Sāhitya',
    description: 'Explore the beauty of Sanskrit literature with this beginner-friendly podcast.',
    thumbnailUrl: 'https://picsum.photos/seed/podcast3/400/300',
    duration: '18 min',
    lang: 'sa',
  },
];


export const VIEWS = {
  DASHBOARD: { id: 'dashboard', label: 'Learn', icon: HomeIcon },
  SCENARIO: { id: 'scenario', label: 'Scenarios', icon: ChatBubbleIcon },
  LESSON: { id: 'lesson', label: 'Lesson' },
  GRAMMAR: { id: 'grammar', label: 'Grammar', icon: GrammarIcon },
  IMAGE_EDITOR: { id: 'image_editor', label: 'Vocabulary', icon: VocabularyIcon },
  WORD_BANK: { id: 'word_bank', label: 'Word Bank', icon: WordBankIcon },
  COMMUNITY: { id: 'community', label: 'Community', icon: CommunityIcon },
  ACHIEVEMENTS: { id: 'achievements', label: 'Achievements', icon: AchievementsIcon },
  MEDIA: { id: 'media', label: 'Media', icon: MediaIcon },
  CHALLENGES: { id: 'challenges', label: 'Challenges', icon: ChallengesIcon },
};

export const ALL_VIEWS: (View & { icon: React.FC<React.SVGProps<SVGSVGElement>> })[] = [
    VIEWS.DASHBOARD,
    VIEWS.GRAMMAR,
    VIEWS.IMAGE_EDITOR,
    VIEWS.WORD_BANK,
    VIEWS.COMMUNITY,
    VIEWS.ACHIEVEMENTS,
    VIEWS.MEDIA,
    VIEWS.CHALLENGES,
];