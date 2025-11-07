


import type { LearningModule } from '../types';

export const LEARNING_PATH: Record<string, LearningModule[]> = {
  en: [
    {
      level: 'A1',
      theme: 'Everyday Basics',
      description: 'Start your journey with the absolute essentials of English, from simple greetings to core nouns.',
      units: [
        {
          unitId: 'en-a1-u1',
          title: 'Greetings & Politeness',
          emoji: '👋',
          words: [
            { word: "Hello", transliteration: "Hello", meaning: "Hello", audio_prompt: "Say 'Hello', the English word for Hello." },
            { word: "Thank you", transliteration: "Thank you", meaning: "Thank you", audio_prompt: "Say 'Thank you', the English expression." },
            { word: "Please", transliteration: "Please", meaning: "Please", audio_prompt: "Say 'Please', the English word for Please." },
            { word: "Yes", transliteration: "Yes", meaning: "Yes", audio_prompt: "Say 'Yes', the English word for Yes." },
            { word: "No", transliteration: "No", meaning: "No", audio_prompt: "Say 'No', the English word for No." },
            { word: "Sorry", transliteration: "Sorry", meaning: "Sorry", audio_prompt: "Say 'Sorry', the English word for Sorry." },
            { word: "Goodbye", transliteration: "Goodbye", meaning: "Goodbye", audio_prompt: "Say 'Goodbye', the English word for Goodbye." },
          ]
        },
        {
          unitId: 'en-a1-u2',
          title: 'Core Nouns',
          emoji: '📦',
          words: [
            { word: "Sun", transliteration: "Sun", meaning: "Sun", audio_prompt: "Say 'Sun', the English word for Sun." },
            { word: "Water", transliteration: "Water", meaning: "Water", audio_prompt: "Say 'Water', the English word for Water." },
            { word: "Friend", transliteration: "Friend", meaning: "Friend", audio_prompt: "Say 'Friend', the English word for Friend." },
            { word: "Fire", transliteration: "Fire", meaning: "Fire", audio_prompt: "Say 'Fire', the English word for Fire." },
            { word: "Book", transliteration: "Book", meaning: "Book", audio_prompt: "Say 'Book', the English word for Book." },
            { word: "House", transliteration: "House", meaning: "House", audio_prompt: "Say 'House', the English word for House." },
          ]
        },
        {
            unitId: 'en-a1-u3',
            title: 'Key Concepts',
            emoji: '💡',
            words: [
                { word: "Love", transliteration: "Love", meaning: "Love", audio_prompt: "Say 'Love', the English word for Love." },
                { word: "Peace", transliteration: "Peace", meaning: "Peace", audio_prompt: "Say 'Peace', the English word for Peace." },
            ]
        }
      ]
    },
    {
      level: 'A2',
      theme: 'Useful Expressions',
      description: 'Build on your basics with phrases for everyday situations.',
      units: [
         { unitId: 'en-a2-u1', title: 'Asking Directions', emoji: '🗺️', words: [] },
         { unitId: 'en-a2-u2', title: 'Telling Time', emoji: '⏰', words: [] },
         { unitId: 'en-a2-u3', title: 'Daily Routine', emoji: '☕', words: [] },
      ]
    },
  ],
  es: [
    {
      level: 'A1',
      theme: 'Conceptos básicos de todos los días',
      description: 'Comienza tu viaje con lo esencial del español, desde saludos simples hasta sustantivos básicos.',
      units: [
        {
          unitId: 'es-a1-u1',
          title: 'Saludos y Cortesía',
          emoji: '👋',
          words: [
            { word: "Hola", transliteration: "Hola", meaning: "Hello", audio_prompt: "Say 'Hola', the Spanish word for Hello." },
            { word: "Gracias", transliteration: "Gracias", meaning: "Thank you", audio_prompt: "Say 'Gracias', the Spanish word for Thank you." },
            { word: "Por favor", transliteration: "Por favor", meaning: "Please", audio_prompt: "Say 'Por favor', the Spanish word for Please." },
            { word: "Sí", transliteration: "Sí", meaning: "Yes", audio_prompt: "Say 'Sí', the Spanish word for Yes." },
            { word: "No", transliteration: "No", meaning: "No", audio_prompt: "Say 'No', the Spanish word for No." },
            { word: "Lo siento", transliteration: "Lo siento", meaning: "I'm sorry", audio_prompt: "Say 'Lo siento', the Spanish for I'm sorry." },
          ]
        },
        {
          unitId: 'es-a1-u2',
          title: 'Sustantivos básicos',
          emoji: '📦',
          words: [
            { word: "Sol", transliteration: "Sol", meaning: "Sun", audio_prompt: "Say 'Sol', the Spanish word for Sun." },
            { word: "Agua", transliteration: "Agua", meaning: "Water", audio_prompt: "Say 'Agua', the Spanish word for Water." },
            { word: "Amigo", transliteration: "Amigo", meaning: "Friend", audio_prompt: "Say 'Amigo', the Spanish word for Friend." },
            { word: "Fuego", transliteration: "Fuego", meaning: "Fire", audio_prompt: "Say 'Fuego', the Spanish word for Fire." },
            { word: "Libro", transliteration: "Libro", meaning: "Book", audio_prompt: "Say 'Libro', the Spanish word for Book." },
            { word: "Casa", transliteration: "Casa", meaning: "House", audio_prompt: "Say 'Casa', the Spanish word for House." },
            { word: "Pan", transliteration: "Pan", meaning: "Bread", audio_prompt: "Say 'Pan', the Spanish word for Bread." },
          ]
        },
        {
            unitId: 'es-a1-u3',
            title: 'Conceptos Clave',
            emoji: '💡',
            words: [
                { word: "Amor", transliteration: "Amor", meaning: "Love", audio_prompt: "Say 'Amor', the Spanish word for Love." },
                { word: "Paz", transliteration: "Paz", meaning: "Peace", audio_prompt: "Say 'Paz', the Spanish word for Peace." },
            ]
        }
      ]
    },
    {
        level: 'A2',
        theme: 'Expresiones Útiles',
        description: 'Amplía tus conocimientos básicos con frases para situaciones cotidianas.',
        units: [
            { unitId: 'es-a2-u1', title: 'Pedir Direcciones', emoji: '🗺️', words: [] },
            { unitId: 'es-a2-u2', title: 'Decir la Hora', emoji: '⏰', words: [] },
            { unitId: 'es-a2-u3', title: 'Rutina Diaria', emoji: '☕', words: [] },
        ]
    }
  ],
  ja: [
      {
          level: 'A1',
          theme: '日常の基本',
          description: '簡単な挨拶から基本的な名詞まで、日本語の絶対的な基礎から旅を始めましょう。',
          units: [
               {
                  unitId: 'ja-a1-u1',
                  title: '挨拶と丁寧な言葉',
                  emoji: '👋',
                  words: [
                    { word: "ありがとう", transliteration: "Arigatou", meaning: "Thank you", audio_prompt: "Say 'Arigatou', the Japanese word for Thank you." },
                    { word: "はい", transliteration: "Hai", meaning: "Yes", audio_prompt: "Say 'Hai', the Japanese word for Yes." },
                    { word: "いいえ", transliteration: "Iie", meaning: "No", audio_prompt: "Say 'Iie', the Japanese word for No." },
                    { word: "すみません", transliteration: "Sumimasen", meaning: "Excuse me", audio_prompt: "Say 'Sumimasen', the Japanese for Excuse me." },
                    { word: "おはよう", transliteration: "Ohayō", meaning: "Good morning", audio_prompt: "Say 'Ohayō', the Japanese for Good morning." },
                  ]
              },
              {
                  unitId: 'ja-a1-u2',
                  title: '中心的な名詞',
                  emoji: '📦',
                  words: [
                    { word: "太陽", transliteration: "Taiyō", meaning: "Sun", audio_prompt: "Say 'Taiyō', the Japanese word for Sun." },
                    { word: "水", transliteration: "Mizu", meaning: "Water", audio_prompt: "Say 'Mizu', the Japanese word for Water." },
                    { word: "友達", transliteration: "Tomodachi", meaning: "Friend", audio_prompt: "Say 'Tomodachi', the Japanese word for Friend." },
                    { word: "火", transliteration: "Hi", meaning: "Fire", audio_prompt: "Say 'Hi', the Japanese word for Fire." },
                    { word: "本", transliteration: "Hon", meaning: "Book", audio_prompt: "Say 'Hon', the Japanese word for Book." },
                    { word: "家", transliteration: "Ie", meaning: "House", audio_prompt: "Say 'Ie', the Japanese word for House." },
                    { word: "猫", transliteration: "Neko", meaning: "Cat", audio_prompt: "Say 'Neko', the Japanese word for Cat." },
                    { word: "寿司", transliteration: "Sushi", meaning: "Sushi", audio_prompt: "Say 'Sushi', the Japanese word for Sushi." },
                  ]
              },
          ]
      },
      {
        level: 'A2',
        theme: '便利な表現',
        description: '日常の状況で使えるフレーズで基礎を固めましょう。',
        units: [
            { unitId: 'ja-a2-u1', title: '道を尋ねる', emoji: '🗺️', words: [] },
            { unitId: 'ja-a2-u2', title: '時間を言う', emoji: '⏰', words: [] },
            { unitId: 'ja-a2-u3', title: '日常の習慣', emoji: '☕', words: [] },
        ]
      }
  ],
  fr: [
    {
      level: 'A1',
      theme: 'Bases de tous les jours',
      description: 'Commencez votre voyage avec les bases essentielles du français.',
      units: [
        {
          unitId: 'fr-a1-u1',
          title: 'Salutations et Politesse',
          emoji: '👋',
          words: [
            { word: "Bonjour", transliteration: "Bonjour", meaning: "Hello", audio_prompt: "Say 'Bonjour', the French word for Hello." },
            { word: "Merci", transliteration: "Merci", meaning: "Thank you", audio_prompt: "Say 'Merci', the French word for Thank you." },
            { word: "Bonsoir", transliteration: "Bonsoir", meaning: "Good evening", audio_prompt: "Say 'Bonsoir', the French word for Good evening." },
            { word: "Oui", transliteration: "Oui", meaning: "Yes", audio_prompt: "Say 'Oui', the French word for Yes." },
            { word: "Non", transliteration: "Non", meaning: "No", audio_prompt: "Say 'Non', the French word for No." },
          ]
        },
        {
          unitId: 'fr-a1-u2',
          title: 'Noms de Base',
          emoji: '📦',
          words: [
            { word: "Soleil", transliteration: "Soleil", meaning: "Sun", audio_prompt: "Say 'Soleil', the French word for Sun." },
            { word: "Eau", transliteration: "Eau", meaning: "Water", audio_prompt: "Say 'Eau', the French word for Water." },
            { word: "Ami", transliteration: "Ami", meaning: "Friend", audio_prompt: "Say 'Ami', the French word for Friend." },
            { word: "Livre", transliteration: "Livre", meaning: "Book", audio_prompt: "Say 'Livre', the French word for Book." },
            { word: "Maison", transliteration: "Maison", meaning: "House", audio_prompt: "Say 'Maison', the French word for House." },
          ]
        }
      ]
    },
    {
      level: 'A2',
      theme: 'Expressions Utiles',
      description: 'Développez vos bases avec des phrases pour les situations de tous les jours.',
      units: [
         { unitId: 'fr-a2-u1', title: 'Demander son chemin', emoji: '🗺️', words: [] },
         { unitId: 'fr-a2-u2', title: 'Dire l\'heure', emoji: '⏰', words: [] },
      ]
    }
  ],
  de: [
    {
      level: 'A1',
      theme: 'Alltägliche Grundlagen',
      description: 'Beginnen Sie Ihre Reise mit den wesentlichen Grundlagen des Deutschen.',
      units: [
        {
          unitId: 'de-a1-u1',
          title: 'Begrüßungen & Höflichkeit',
          emoji: '👋',
          words: [
            { word: "Hallo", transliteration: "Hallo", meaning: "Hello", audio_prompt: "Say 'Hallo', the German word for Hello." },
            { word: "Danke", transliteration: "Danke", meaning: "Thank you", audio_prompt: "Say 'Danke', the German word for Thank you." },
            { word: "Gute Nacht", transliteration: "Gute Nacht", meaning: "Good night", audio_prompt: "Say 'Gute Nacht', the German for Good night." },
            { word: "Ja", transliteration: "Ja", meaning: "Yes", audio_prompt: "Say 'Ja', the German word for Yes." },
            { word: "Nein", transliteration: "Nein", meaning: "No", audio_prompt: "Say 'Nein', the German word for No." },
          ]
        },
        {
          unitId: 'de-a1-u2',
          title: 'Grundnomen',
          emoji: '📦',
          words: [
            { word: "Sonne", transliteration: "Sonne", meaning: "Sun", audio_prompt: "Say 'Sonne', the German word for Sun." },
            { word: "Wasser", transliteration: "Wasser", meaning: "Water", audio_prompt: "Say 'Wasser', the German word for Water." },
            { word: "Freund", transliteration: "Freund", meaning: "Friend", audio_prompt: "Say 'Freund', the German word for Friend." },
            { word: "Buch", transliteration: "Buch", meaning: "Book", audio_prompt: "Say 'Buch', the German word for Book." },
            { word: "Haus", transliteration: "Haus", meaning: "House", audio_prompt: "Say 'Haus', the German word for House." },
          ]
        }
      ]
    },
    {
        level: 'A2',
        theme: 'Nützliche Ausdrücke',
        description: 'Bauen Sie auf Ihren Grundlagen mit Sätzen für alltägliche Situationen auf.',
        units: [
           { unitId: 'de-a2-u1', title: 'Nach dem Weg fragen', emoji: '🗺️', words: [] },
           { unitId: 'de-a2-u2', title: 'Uhrzeit angeben', emoji: '⏰', words: [] },
        ]
    }
  ],
  sa: [
    {
      level: 'A1',
      theme: 'मूल शब्दावली (Basic Vocabulary)',
      description: 'संस्कृतस्य आवश्यकशब्दानां सह स्वस्य यात्रां आरभत। (Start your journey with the essential words of Sanskrit.)',
      units: [
        {
          unitId: 'sa-a1-u1',
          title: 'Greetings',
          emoji: '🙏',
          words: [
            { word: "नमस्ते", transliteration: "Namaste", meaning: "Hello/Greetings", audio_prompt: "Say 'Namaste', the Sanskrit for Greetings." },
            { word: "धन्यवादः", transliteration: "Dhanyavādah", meaning: "Thank you", audio_prompt: "Say 'Dhanyavādah', the Sanskrit for Thank you." },
          ]
        },
        {
          unitId: 'sa-a1-u2',
          title: 'Core Nouns',
          emoji: '📦',
          words: [
            { word: "जलम्", transliteration: "Jalam", meaning: "Water", audio_prompt: "Say 'Jalam', the Sanskrit for Water." },
            { word: "सूर्यः", transliteration: "Sūryah", meaning: "Sun", audio_prompt: "Say 'Sūryah', the Sanskrit for Sun." },
            { word: "चन्द्रः", transliteration: "Chandrah", meaning: "Moon", audio_prompt: "Say 'Chandrah', the Sanskrit for Moon." },
            { word: "अग्निः", transliteration: "Agnih", meaning: "Fire", audio_prompt: "Say 'Agnih', the Sanskrit for Fire." },
            { word: "पुस्तकम्", transliteration: "Pustakam", meaning: "Book", audio_prompt: "Say 'Pustakam', the Sanskrit for Book." },
            { word: "गृहम्", transliteration: "Gr̥ham", meaning: "House", audio_prompt: "Say 'Gr̥ham', the Sanskrit for House." },
            { word: "मित्रम्", transliteration: "Mitram", meaning: "Friend", audio_prompt: "Say 'Mitram', the Sanskrit for Friend." },
            { word: "गुरुः", transliteration: "Guruh", meaning: "Teacher", audio_prompt: "Say 'Guruh', the Sanskrit for Teacher." },
            { word: "फलम्", transliteration: "Phalam", meaning: "Fruit", audio_prompt: "Say 'Phalam', the Sanskrit for Fruit." },
            { word: "वृक्षः", transliteration: "Vr̥kṣaḥ", meaning: "Tree", audio_prompt: "Say 'Vr̥kṣaḥ', the Sanskrit for Tree." },
            { word: "पुष्पम्", transliteration: "Puṣpam", meaning: "Flower", audio_prompt: "Say 'Puṣpam', the Sanskrit for Flower." },
          ]
        },
        {
          unitId: 'sa-a1-u3',
          title: 'Key Concepts',
          emoji: '💡',
          words: [
            { word: "योगः", transliteration: "Yogaḥ", meaning: "Yoga/Union", audio_prompt: "Say 'Yogaḥ', the Sanskrit for Yoga." },
            { word: "शान्तिः", transliteration: "Śāntiḥ", meaning: "Peace", audio_prompt: "Say 'Śāntiḥ', the Sanskrit for Peace." },
            { word: "प्रेम", transliteration: "Prema", meaning: "Love", audio_prompt: "Say 'Prema', the Sanskrit for Love." },
            { word: "सत्यम्", transliteration: "Satyam", meaning: "Truth", audio_prompt: "Say 'Satyam', the Sanskrit for Truth." },
            { word: "धर्मः", transliteration: "Dharmaḥ", meaning: "Duty/Righteousness", audio_prompt: "Say 'Dharmaḥ', the Sanskrit for Duty." },
            { word: "कर्म", transliteration: "Karma", meaning: "Action/Deed", audio_prompt: "Say 'Karma', the Sanskrit for Action." },
            { word: "मोक्षः", transliteration: "Mokṣaḥ", meaning: "Liberation/Freedom", audio_prompt: "Say 'Mokṣaḥ', the Sanskrit for Liberation." },
          ]
        }
      ]
    },
    {
      level: 'A2',
      theme: 'व्यवहारिकवाक्यानि (Practical Sentences)',
      description: 'Build on your basics with phrases for everyday situations.',
      units: [
         { unitId: 'sa-a2-u1', title: 'Asking Questions', emoji: '🗺️', words: [] },
         { unitId: 'sa-a2-u2', title: 'Daily Actions', emoji: '☕', words: [] },
      ]
    }
  ],
  hi: [
    {
      level: 'A1',
      theme: 'रोज़मर्रा की मूल बातें',
      description: 'हिन्दी की आवश्यक बातों के साथ अपनी यात्रा शुरू करें।',
      units: [
        {
          unitId: 'hi-a1-u1',
          title: 'नमस्ते और शिष्टाचार',
          emoji: '🙏',
          words: [
            { word: "नमस्ते", transliteration: "Namaste", meaning: "Hello", audio_prompt: "Say 'Namaste', the Hindi for Hello." },
            { word: "धन्यवाद", transliteration: "Dhanyavaad", meaning: "Thank you", audio_prompt: "Say 'Dhanyavaad', the Hindi for Thank you." },
            { word: "शुभ रात्रि", transliteration: "Shubh raatri", meaning: "Good night", audio_prompt: "Say 'Shubh raatri', the Hindi for Good night." },
          ]
        }
      ]
    }
  ],
  ta: [
    {
      level: 'A1',
      theme: 'அன்றாட அடிப்படைகள்',
      description: 'தமிழின் அத்தியாவசிய அடிப்படைகளுடன் உங்கள் பயணத்தைத் தொடங்குங்கள்.',
      units: [
        {
          unitId: 'ta-a1-u1',
          title: 'வாழ்த்துக்கள்',
          emoji: '👋',
          words: [
            { word: "வணக்கம்", transliteration: "Vanakkam", meaning: "Hello", audio_prompt: "Say 'Vanakkam', the Tamil for Hello." },
            { word: "நன்றி", transliteration: "Nandri", meaning: "Thank you", audio_prompt: "Say 'Nandri', the Tamil for Thank you." },
            { word: "இனிய இரவு", transliteration: "Iniya iravu", meaning: "Good night", audio_prompt: "Say 'Iniya iravu', the Tamil for Good night." },
          ]
        }
      ]
    }
  ],
  kn: [
    {
      level: 'A1',
      theme: 'ದೈನಂದಿನ ಮೂಲಭೂತಗಳು',
      description: 'ಕನ್ನಡದ ಅಗತ್ಯ ಮೂಲಭೂತಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ.',
      units: [
        {
          unitId: 'kn-a1-u1',
          title: 'ಶುಭಾಶಯಗಳು',
          emoji: '👋',
          words: [
            { word: "ನಮಸ್ಕಾರ", transliteration: "Namaskara", meaning: "Hello", audio_prompt: "Say 'Namaskara', the Kannada for Hello." },
            { word: "ಧನ್ಯವಾದಗಳು", transliteration: "Dhanyavadagalu", meaning: "Thank you", audio_prompt: "Say 'Dhanyavadagalu', the Kannada for Thank you." },
            { word: "ಶುಭರಾತ್ರಿ", transliteration: "Shubharatri", meaning: "Good night", audio_prompt: "Say 'Shubharatri', the Kannada for Good night." },
          ]
        }
      ]
    }
  ],
  te: [
    {
      level: 'A1',
      theme: 'రోజువారీ ప్రాథమికాలు',
      description: 'తెలుగు యొక్క అవసరమైన ప్రాథమికాలతో మీ ప్రయాణాన్ని ప్రారంభించండి.',
      units: [
        {
          unitId: 'te-a1-u1',
          title: 'శుభాకాంక్షలు',
          emoji: '👋',
          words: [
            { word: "నమస్కారం", transliteration: "Namaskāram", meaning: "Hello", audio_prompt: "Say 'Namaskāram', the Telugu for Hello." },
            { word: "ధన్యవాదాలు", transliteration: "Dhan'yavādālu", meaning: "Thank you", audio_prompt: "Say 'Dhan'yavādālu', the Telugu for Thank you." },
            { word: "శుభ రాత్రి", transliteration: "Śubha rātri", meaning: "Good night", audio_prompt: "Say 'Śubha rātri', the Telugu for Good night." },
          ]
        }
      ]
    }
  ],
  ml: [
    {
      level: 'A1',
      theme: 'ദൈനംദിന അടിസ്ഥാനങ്ങൾ',
      description: 'മലയാളത്തിലെ അടിസ്ഥാന കാര്യങ്ങൾ പഠിച്ച് നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക.',
      units: [
        {
          unitId: 'ml-a1-u1',
          title: 'ആശംസകൾ',
          emoji: '👋',
          words: [
            { word: "നമസ്കാരം", transliteration: "Namaskāram", meaning: "Hello", audio_prompt: "Say 'Namaskāram', the Malayalam for Hello." },
            { word: "നന്ദി", transliteration: "Nandi", meaning: "Thank you", audio_prompt: "Say 'Nandi', the Malayalam for Thank you." },
            { word: "ശുഭരാത്രി", transliteration: "Śubharātri", meaning: "Good night", audio_prompt: "Say 'Śubharātri', the Malayalam for Good night." },
          ]
        }
      ]
    }
  ],
  mr: [
    {
      level: 'A1',
      theme: 'दैनंदिन मूलभूत गोष्टी',
      description: 'मराठीच्या आवश्यक मूलभूत गोष्टींसह आपला प्रवास सुरू करा.',
      units: [
        {
          unitId: 'mr-a1-u1',
          title: 'शुभेच्छा',
          emoji: '👋',
          words: [
            { word: "नमस्कार", transliteration: "Namaskār", meaning: "Hello", audio_prompt: "Say 'Namaskār', the Marathi for Hello." },
            { word: "धन्यवाद", transliteration: "Dhan'yavād", meaning: "Thank you", audio_prompt: "Say 'Dhan'yavād', the Marathi for Thank you." },
            { word: "शुभ रात्री", transliteration: "Śubha rātrī", meaning: "Good night", audio_prompt: "Say 'Śubha rātrī', the Marathi for Good night." },
          ]
        }
      ]
    }
  ],
  or: [
    {
      level: 'A1',
      theme: 'ଦୈନନ୍ଦିନ ମୌଳିକ',
      description: 'ଓଡିଆର ଅତ୍ୟାବଶ୍ୟକ ମୌଳିକ ସହିତ ଆପଣଙ୍କର ଯାତ్రా ଆରମ୍ଭ କରନ୍ତୁ |',
      units: [
        {
          unitId: 'or-a1-u1',
          title: 'ଅଭିବାଦନ',
          emoji: '👋',
          words: [
            { word: "ନମସ୍କାର", transliteration: "Namaskāra", meaning: "Hello", audio_prompt: "Say 'Namaskāra', the Odia for Hello." },
            { word: "ଧନ୍ୟବାଦ", transliteration: "Dhan'yabāda", meaning: "Thank you", audio_prompt: "Say 'Dhan'yabāda', the Odia for Thank you." },
            { word: "ଶୁଭ ରାତ୍ରି", transliteration: "Śubha rātri", meaning: "Good night", audio_prompt: "Say 'Śubha rātri', the Odia for Good night." },
          ]
        }
      ]
    }
  ],
  gu: [
    {
      level: 'A1',
      theme: 'રોજિંદા મૂળભૂત બાબતો',
      description: 'ગુજરાતીની આવશ્યક મૂળભૂત બાબતો સાથે તમારી મુસાફરી શરૂ કરો.',
      units: [
        {
          unitId: 'gu-a1-u1',
          title: 'શુભેચ્છાઓ',
          emoji: '👋',
          words: [
            { word: "નમસ્તે", transliteration: "Namaste", meaning: "Hello", audio_prompt: "Say 'Namaste', the Gujarati for Hello." },
            { word: "આભાર", transliteration: "Ābhāra", meaning: "Thank you", audio_prompt: "Say 'Ābhāra', the Gujarati for Thank you." },
            { word: "શુભ રાત્રી", transliteration: "Śubha rātrī", meaning: "Good night", audio_prompt: "Say 'Śubha rātrī', the Gujarati for Good night." },
          ]
        }
      ]
    }
  ],
  bn: [
    {
      level: 'A1',
      theme: 'প্রতিদিনের মূল বিষয়',
      description: 'বাংলার অপরিহার্য মূল বিষয়গুলি দিয়ে আপনার যাত্রা শুরু করুন।',
      units: [
        {
          unitId: 'bn-a1-u1',
          title: 'শুভেচ্ছা',
          emoji: '👋',
          words: [
            { word: "নমস্কার", transliteration: "Nômôśkār", meaning: "Hello", audio_prompt: "Say 'Nômôśkār', the Bengali for Hello." },
            { word: "ধন্যবাদ", transliteration: "Dhonnobād", meaning: "Thank you", audio_prompt: "Say 'Dhonnobād', the Bengali for Thank you." },
            { word: "শুভ রাত্রি", transliteration: "Śubhô rātri", meaning: "Good night", audio_prompt: "Say 'Śubhô rātri', the Bengali for Good night." },
          ]
        }
      ]
    }
  ],
  it: [
    {
      level: 'A1',
      theme: 'Basi quotidiane',
      description: 'Inizia il tuo viaggio con le basi essenziali dell\'italiano.',
      units: [
        {
          unitId: 'it-a1-u1',
          title: 'Saluti e Cortesia',
          emoji: '👋',
          words: [
            { word: "Ciao", transliteration: "Ciao", meaning: "Hello", audio_prompt: "Say 'Ciao', the Italian for Hello." },
            { word: "Grazie", transliteration: "Grazie", meaning: "Thank you", audio_prompt: "Say 'Grazie', the Italian for Thank you." },
            { word: "Buona notte", transliteration: "Buona notte", meaning: "Good night", audio_prompt: "Say 'Buona notte', the Italian for Good night." },
          ]
        }
      ]
    }
  ],
  nl: [
    {
      level: 'A1',
      theme: 'Dagelijkse basis',
      description: 'Begin je reis met de essentiële basis van het Nederlands.',
      units: [
        {
          unitId: 'nl-a1-u1',
          title: 'Groeten & Beleefdheid',
          emoji: '👋',
          words: [
            { word: "Hallo", transliteration: "Hallo", meaning: "Hello", audio_prompt: "Say 'Hallo', the Dutch for Hello." },
            { word: "Dank je", transliteration: "Dank je", meaning: "Thank you", audio_prompt: "Say 'Dank je', the Dutch for Thank you." },
            { word: "Goedenacht", transliteration: "Goedenacht", meaning: "Good night", audio_prompt: "Say 'Goedenacht', the Dutch for Good night." },
            { word: "Ja", transliteration: "Ja", meaning: "Yes", audio_prompt: "Say 'Ja', the Dutch word for Yes." },
            { word: "Nee", transliteration: "Nee", meaning: "No", audio_prompt: "Say 'Nee', the Dutch word for No." },
          ]
        },
        {
          unitId: 'nl-a1-u2',
          title: 'Kern Nomen',
          emoji: '📦',
          words: [
            { word: "Zon", transliteration: "Zon", meaning: "Sun", audio_prompt: "Say 'Zon', the Dutch word for Sun." },
            { word: "Water", transliteration: "Water", meaning: "Water", audio_prompt: "Say 'Water', the Dutch word for Water." },
            { word: "Vriend", transliteration: "Vriend", meaning: "Friend", audio_prompt: "Say 'Vriend', the Dutch word for Friend." },
            { word: "Boek", transliteration: "Boek", meaning: "Book", audio_prompt: "Say 'Boek', the Dutch word for Book." },
            { word: "Huis", transliteration: "Huis", meaning: "House", audio_prompt: "Say 'Huis', the Dutch word for House." },
          ]
        }
      ]
    },
    {
        level: 'A2',
        theme: 'Handige Uitdrukkingen',
        description: 'Bouw voort op je basiskennis met zinnen voor alledaagse situaties.',
        units: [
           { unitId: 'nl-a2-u1', title: 'De weg vragen', emoji: '🗺️', words: [] },
           { unitId: 'nl-a2-u2', title: 'Tijd vertellen', emoji: '⏰', words: [] },
        ]
    }
  ],
  da: [
    {
      level: 'A1',
      theme: 'Daglige grundlæggende',
      description: 'Start din rejse med de væsentlige grundlæggende elementer i dansk.',
      units: [
        {
          unitId: 'da-a1-u1',
          title: 'Hilsner & Høflighed',
          emoji: '👋',
          words: [
            { word: "Hej", transliteration: "Hej", meaning: "Hello", audio_prompt: "Say 'Hej', the Danish for Hello." },
            { word: "Tak", transliteration: "Tak", meaning: "Thank you", audio_prompt: "Say 'Tak', the Danish for Thank you." },
            { word: "Godnat", transliteration: "Godnat", meaning: "Good night", audio_prompt: "Say 'Godnat', the Danish for Good night." },
          ]
        }
      ]
    }
  ],
  pt: [
    {
      level: 'A1',
      theme: 'Básico do dia a dia',
      description: 'Comece sua jornada com o básico essencial do português.',
      units: [
        {
          unitId: 'pt-a1-u1',
          title: 'Saudações e Cortesia',
          emoji: '👋',
          words: [
            { word: "Olá", transliteration: "Olá", meaning: "Hello", audio_prompt: "Say 'Olá', the Portuguese for Hello." },
            { word: "Obrigado/a", transliteration: "Obrigado/a", meaning: "Thank you", audio_prompt: "Say 'Obrigado', the Portuguese for Thank you." },
            { word: "Boa noite", transliteration: "Boa noite", meaning: "Good night", audio_prompt: "Say 'Boa noite', the Portuguese for Good night." },
          ]
        }
      ]
    }
  ],
  fi: [
    {
      level: 'A1',
      theme: 'Päivittäiset perusteet',
      description: 'Aloita matkasi suomen kielen perusteista.',
      units: [
        {
          unitId: 'fi-a1-u1',
          title: 'Tervehdykset & Kohteliaisuus',
          emoji: '👋',
          words: [
            { word: "Hei", transliteration: "Hei", meaning: "Hello", audio_prompt: "Say 'Hei', the Finnish for Hello." },
            { word: "Kiitos", transliteration: "Kiitos", meaning: "Thank you", audio_prompt: "Say 'Kiitos', the Finnish for Thank you." },
            { word: "Hyvää yötä", transliteration: "Hyvää yötä", meaning: "Good night", audio_prompt: "Say 'Hyvää yötä', the Finnish for Good night." },
          ]
        }
      ]
    }
  ]
};