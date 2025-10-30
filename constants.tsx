// Fix: Import React to resolve namespace errors for React.FC and React.SVGProps.
import React from 'react';
import type { Language, Scenario, View, CommunityUser, Lesson, AchievementBadge, Challenge, PostLessonMessage, MediaItem, Tutor, Workshop } from './types';
import { HomeIcon, GrammarIcon, VocabularyIcon, CommunityIcon, MediaIcon, ChallengesIcon, AchievementsIcon, WordBankIcon, TutorIcon, AccentTrainingIcon } from './components/icons/SidebarIcons';
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
                transliteration: "namah",
                meaning: "Hello / Greetings",
                example: "त्वं कथं भवसि? नमः!",
                audio: "audio/namah.mp3"
            },
            {
                word: "धन्यवादः",
                transliteration: "dhanyavaadah",
                meaning: "Thank you",
                example: "ते धन्यवादः।",
                audio: "audio/dhanyavaadah.mp3"
            },
            {
                word: "शुभरात्रिः",
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
    },
    {
        lesson_id: "en_01",
        language: "English",
        title: "Basic Greetings",
        description: "Learn your first few greetings in English with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'en',
        category: 'Lesson',
        content: [
            { word: "Hello", transliteration: "Hello", meaning: "Hello", example: "Hello, how are you?", audio: "audio/hello_en.mp3" },
            { word: "Thank you", transliteration: "Thank you", meaning: "Thank you", example: "Thank you so much!", audio: "audio/thankyou_en.mp3" },
            { word: "Good night", transliteration: "Good night", meaning: "Good night", example: "Good night, see you tomorrow.", audio: "audio/goodnight_en.mp3" }
        ],
        quiz: [
            { question: "What does 'Thank you' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in English?", options: ["Good night", "Hello", "Thank you"], answer: "Hello" }
        ]
    },
    {
        lesson_id: "es_01",
        language: "Spanish",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Spanish with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'es',
        category: 'Lesson',
        content: [
            { word: "Hola", transliteration: "Hola", meaning: "Hello", example: "Hola, ¿cómo estás?", audio: "audio/hola_es.mp3" },
            { word: "Gracias", transliteration: "Gracias", meaning: "Thank you", example: "Muchas gracias.", audio: "audio/gracias_es.mp3" },
            { word: "Buenas noches", transliteration: "Buenas noches", meaning: "Good night", example: "Buenas noches, hasta mañana.", audio: "audio/buenasnoches_es.mp3" }
        ],
        quiz: [
            { question: "What does 'Gracias' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in Spanish?", options: ["Buenas noches", "Hola", "Gracias"], answer: "Hola" }
        ]
    },
    {
        lesson_id: "fr_01",
        language: "French",
        title: "Basic Greetings",
        description: "Learn your first few greetings in French with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'fr',
        category: 'Lesson',
        content: [
            { word: "Bonjour", transliteration: "Bonjour", meaning: "Hello", example: "Bonjour, comment ça va ?", audio: "audio/bonjour_fr.mp3" },
            { word: "Merci", transliteration: "Merci", meaning: "Thank you", example: "Merci beaucoup.", audio: "audio/merci_fr.mp3" },
            { word: "Bonsoir", transliteration: "Bonsoir", meaning: "Good evening", example: "Bonsoir, madame.", audio: "audio/bonsoir_fr.mp3" }
        ],
        quiz: [
            { question: "What does 'Merci' mean?", options: ["Hello", "Good evening", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in French?", options: ["Bonsoir", "Bonjour", "Merci"], answer: "Bonjour" }
        ]
    },
    {
        lesson_id: "de_01",
        language: "German",
        title: "Basic Greetings",
        description: "Learn your first few greetings in German with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'de',
        category: 'Lesson',
        content: [
            { word: "Hallo", transliteration: "Hallo", meaning: "Hello", example: "Hallo, wie geht's?", audio: "audio/hallo_de.mp3" },
            { word: "Danke", transliteration: "Danke", meaning: "Thank you", example: "Danke schön.", audio: "audio/danke_de.mp3" },
            { word: "Gute Nacht", transliteration: "Gute Nacht", meaning: "Good night", example: "Gute Nacht, schlaf gut.", audio: "audio/gutenacht_de.mp3" }
        ],
        quiz: [
            { question: "What does 'Danke' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in German?", options: ["Gute Nacht", "Hallo", "Danke"], answer: "Hallo" }
        ]
    },
    {
        lesson_id: "ja_01",
        language: "Japanese",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Japanese with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'ja',
        category: 'Lesson',
        content: [
            { word: "こんにちは", transliteration: "Konnichiwa", meaning: "Hello", example: "こんにちは、田中さん。", audio: "audio/konnichiwa_ja.mp3" },
            { word: "ありがとう", transliteration: "Arigatou", meaning: "Thank you", example: "どうもありがとう。", audio: "audio/arigatou_ja.mp3" },
            { word: "おやすみなさい", transliteration: "Oyasuminasai", meaning: "Good night", example: "おやすみなさい、また明日。", audio: "audio/oyasuminasai_ja.mp3" }
        ],
        quiz: [
            { question: "What does 'ありがとう' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in Japanese?", options: ["おやすみなさい", "こんにちは", "ありがとう"], answer: "こんにちは" }
        ]
    },
    {
        lesson_id: "hi_01",
        language: "Hindi",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Hindi with a fun quiz.",
        // Fix: Corrected typo in 'level' from 'Beginger' to 'Beginner'.
        level: "Beginner",
        emoji: "🙏",
        lang: 'hi',
        category: 'Lesson',
        content: [
            { word: "नमस्ते", transliteration: "Namaste", meaning: "Hello", example: "नमस्ते, आप कैसे हैं?", audio: "audio/namaste_hi.mp3" },
            { word: "धन्यवाद", transliteration: "Dhanyavaad", meaning: "Thank you", example: "बहुत धन्यवाद।", audio: "audio/dhanyavaad_hi.mp3" },
            { word: "शुभ रात्रि", transliteration: "Shubh raatri", meaning: "Good night", example: "शुभ रात्रि, फिर मिलेंगे।", audio: "audio/shubhraatri_hi.mp3" }
        ],
        quiz: [
            { question: "What does 'धन्यवाद' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in Hindi?", options: ["शुभ रात्रि", "नमस्ते", "धन्यवाद"], answer: "नमस्ते" }
        ]
    },
    {
        lesson_id: "ta_01",
        language: "Tamil",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Tamil with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'ta',
        category: 'Lesson',
        content: [
            { word: "வணக்கம்", transliteration: "Vanakkam", meaning: "Hello", example: "வணக்கம், எப்படி இருக்கிறீர்கள்?", audio: "audio/vanakkam_ta.mp3" },
            { word: "நன்றி", transliteration: "Nandri", meaning: "Thank you", example: "மிக்க நன்றி.", audio: "audio/nandri_ta.mp3" },
            { word: "இனிய இரவு", transliteration: "Iniya iravu", meaning: "Good night", example: "இனிய இரவு, நாளை சந்திப்போம்.", audio: "audio/iniyairavu_ta.mp3" }
        ],
        quiz: [
            { question: "What does 'நன்றி' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in Tamil?", options: ["இனிய இரவு", "வணக்கம்", "நன்றி"], answer: "வணக்கம்" }
        ]
    },
    {
        lesson_id: "kn_01",
        language: "Kannada",
        title: "Basic Greetings",
        description: "Learn your first few greetings in Kannada with a fun quiz.",
        level: "Beginner",
        emoji: "👋",
        lang: 'kn',
        category: 'Lesson',
        content: [
            { word: "ನಮಸ್ಕಾರ", transliteration: "Namaskara", meaning: "Hello", example: "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಾ?", audio: "audio/namaskara_kn.mp3" },
            { word: "ಧನ್ಯವಾದಗಳು", transliteration: "Dhanyavadagalu", meaning: "Thank you", example: "ತುಂಬಾ ಧನ್ಯವಾದಗಳು.", audio: "audio/dhanyavadagalu_kn.mp3" },
            { word: "ಶುಭರಾತ್ರಿ", transliteration: "Shubharatri", meaning: "Good night", example: "ಶುಭರಾತ್ರಿ, ನಾಳೆ ಸಿಗೋಣ.", audio: "audio/shubharatri_kn.mp3" }
        ],
        quiz: [
            { question: "What does 'ಧನ್ಯವಾದಗಳು' mean?", options: ["Hello", "Good night", "Thank you"], answer: "Thank you" },
            { question: "How do you say 'Hello' in Kannada?", options: ["ಶುಭರಾತ್ರಿ", "ನಮಸ್ಕಾರ", "ಧನ್ಯವಾದಗಳು"], answer: "ನಮಸ್ಕಾರ" }
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

export const CHALLENGES: Challenge[] = [
    {
        id: 'dc01',
        type: 'daily',
        title: "Translate This!",
        description: "Translate 'Good morning, how are you?' into your target language without using a translator.",
        icon: "↔️",
        reward: "20 XP"
    },
    {
        id: 'dc02',
        type: 'daily',
        title: "Adjective Adventure",
        description: "Describe your favorite food using 5 new adjectives you learned this week.",
        icon: "🍕",
        reward: "25 XP"
    },
    {
        id: 'dc03',
        type: 'daily',
        title: "Listen Up!",
        description: "Listen to a song in your target language and write down 3 words you recognize.",
        icon: "🎶",
        reward: "15 XP"
    },
    {
        id: 'dc04',
        type: 'daily',
        title: "Quick Query",
        description: "Ask a question in a conversation scenario, like 'What time is it?' or 'Where is the library?'",
        icon: "❓",
        reward: "15 XP"
    },
    {
        id: 'dc05',
        type: 'daily',
        title: "Photo Flashcard",
        description: "Use the Vocabulary tool to add a label to a photo of something in your room.",
        icon: "🖼️",
        reward: "20 XP"
    },
    {
        id: 'wc01',
        type: 'weekly',
        title: "Scenario Streak",
        description: "Complete 3 conversation scenarios in a week with 80% grammar accuracy.",
        icon: "💬",
        reward: "100 XP & 💎"
    },
    {
        id: 'wc02',
        type: 'weekly',
        title: "Vocabulary Voyager",
        description: "Learn 20 new words using the Word Bank and score 90% on a lesson quiz.",
        icon: "📚",
        reward: "120 XP"
    },
    {
        id: 'ec01',
        type: 'event',
        title: "Weekend Warrior",
        description: "Complete a lesson every day this weekend (Friday, Saturday, Sunday).",
        icon: "🗓️",
        reward: "75 XP & ✨"
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

export const WORKSHOPS: Workshop[] = [
    {
        id: 'w01',
        title: 'Mastering the French Subjunctive',
        host: 'Elodie Moreau',
        date: 'October 28, 2024',
        price: '$25',
        isPro: true,
    },
    {
        id: 'w02',
        title: 'German Cases Made Easy: A Beginner\'s Guide',
        host: 'Lars Weber',
        date: 'November 5, 2024',
        price: 'Free',
        isPro: false,
    },
    {
        id: 'w03',
        title: 'Writing Professional Emails in English',
        host: 'John Smith',
        date: 'November 12, 2024',
        price: '$25',
        isPro: true,
    },
    {
        id: 'w04',
        title: 'Japanese Kanji Practice Session',
        host: 'Kenji Tanaka',
        date: 'November 18, 2024',
        price: '$15',
        isPro: true,
    },
];

export const TUTORS: Tutor[] = [
    {
        id: 'tutor-1',
        name: 'Elodie Moreau',
        nativeLanguage: 'fr',
        specialty: 'Conversational French & Accent Correction',
        bio: 'Bonjour! Let\'s chat about French culture, food, and film. I can help you sound like a true Parisian!',
        isOnline: true,
        pricePerSession: '$20 / 30 min',
        avatarUrl: 'https://picsum.photos/seed/tutor1/200'
    },
    {
        id: 'tutor-2',
        name: 'Kenji Tanaka',
        nativeLanguage: 'ja',
        specialty: 'Beginner Japanese & JLPT N5 Prep',
        bio: 'こんにちは！I make learning Japanese fun and easy, focusing on practical phrases for your first trip to Japan.',
        isOnline: true,
        pricePerSession: '$25 / 30 min',
        avatarUrl: 'https://picsum.photos/seed/tutor2/200'
    },
    {
        id: 'tutor-3',
        name: 'Sofia Rossi',
        nativeLanguage: 'es',
        specialty: 'Business Spanish & DELE Exam Prep',
        bio: 'Hola! I have 5 years of experience helping professionals master Spanish for the workplace. Let\'s elevate your career.',
        isOnline: false,
        pricePerSession: '$30 / 30 min',
        avatarUrl: 'https://picsum.photos/seed/tutor3/200'
    },
    {
        id: 'tutor-4',
        name: 'Lars Weber',
        nativeLanguage: 'de',
        specialty: 'German Grammar & Pronunciation',
        bio: 'Guten Tag! German grammar can be tricky, but I have simple methods to help you understand it perfectly.',
        isOnline: true,
        pricePerSession: '$22 / 30 min',
        avatarUrl: 'https://picsum.photos/seed/tutor4/200'
    },
    {
        id: 'tutor-5',
        name: 'Aarav Sharma',
        nativeLanguage: 'hi',
        specialty: 'Hindi Script & Daily Conversation',
        bio: 'नमस्ते! Learn to read, write, and speak Hindi with confidence. We can practice dialogues for everyday situations.',
        isOnline: false,
        pricePerSession: '$18 / 30 min',
        avatarUrl: 'https://picsum.photos/seed/tutor5/200'
    },
];


export const VIEWS = {
  DASHBOARD: { id: 'dashboard', label: 'Learn', icon: HomeIcon },
  SCENARIO: { id: 'scenario', label: 'Scenarios', icon: ChatBubbleIcon },
  LESSON: { id: 'lesson', label: 'Lesson' },
  GRAMMAR: { id: 'grammar', label: 'Grammar', icon: GrammarIcon },
  IMAGE_EDITOR: { id: 'image_editor', label: 'Vocabulary', icon: VocabularyIcon },
  WORD_BANK: { id: 'word_bank', label: 'Word Bank', icon: WordBankIcon },
  ACCENT_TRAINING: { id: 'accent_training', label: 'Accent Training', icon: AccentTrainingIcon },
  COMMUNITY: { id: 'community', label: 'Community', icon: CommunityIcon },
  ACHIEVEMENTS: { id: 'achievements', label: 'Achievements', icon: AchievementsIcon },
  MEDIA: { id: 'media', label: 'Media', icon: MediaIcon },
  CHALLENGES: { id: 'challenges', label: 'Challenges', icon: ChallengesIcon },
  TUTORS: { id: 'tutors', label: 'Tutors', icon: TutorIcon },
  ABOUT: { id: 'about', label: 'About Us' },
  TERMS: { id: 'terms', label: 'Terms of Service' },
  PRIVACY: { id: 'privacy', label: 'Privacy Policy' },
};

export const ALL_VIEWS: (View & { icon: React.FC<React.SVGProps<SVGSVGElement>> })[] = [
    VIEWS.DASHBOARD,
    VIEWS.GRAMMAR,
    VIEWS.IMAGE_EDITOR,
    VIEWS.WORD_BANK,
    VIEWS.ACCENT_TRAINING,
    VIEWS.COMMUNITY,
    VIEWS.ACHIEVEMENTS,
    VIEWS.MEDIA,
    VIEWS.CHALLENGES,
    VIEWS.TUTORS,
];
