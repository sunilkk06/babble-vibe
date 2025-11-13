# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: ChirPolly (React + Vite + TypeScript, SPA)

Quick start and common commands

- Install dependencies
  ```bash path=null start=null
  npm install
  ```
- Configure API key (required)
  - Create a `.env.local` in the repo root with:
    ```bash path=null start=null
    GEMINI_API_KEY={{YOUR_GEMINI_API_KEY}}
    ```
  - Note: `.env.local` is gitignored via `*.local` in `.gitignore`.
- Run the dev server (Vite)
  ```bash path=null start=null
  npm run dev
  ```
  - Serves on http://localhost:3000 (configured host `0.0.0.0`, HashRouter is used).
- Build for production
  ```bash path=null start=null
  npm run build
  ```
- Preview the production build locally
  ```bash path=null start=null
  npm run preview
  ```

Linting and tests

- Lint: not configured in this repo (no eslint config or script).
- Tests: not configured (no test runner/scripts). If tests are added later (e.g., Vitest/Jest), include the relevant scripts here, including how to run a single test.

Environment and runtime

- Vite loads `GEMINI_API_KEY` from env and injects it at build time as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (see `vite.config.ts`).
- The app expects the key to be present; missing keys will throw at runtime in the browser when initializing Google GenAI client code.

High-level architecture

- App shell and routing
  - Entry: `index.html`, `index.tsx` mounts React.StrictMode and wraps the app in `HashRouter`.
  - `App.tsx` defines global layout (Sidebar, Header, Footer) and all routes via `react-router-dom`. Routes are driven by the `VIEWS` object from `constants.tsx`.
  - State in `App.tsx`: current language, sidebar open, authentication gate (local only), onboarding modal, inactivity timer, and PWA install banner. Uses Capacitor for native status bar styling when running on native.

- Data and configuration (static, in-repo)
  - `types.ts`: shared domain types (Language, Scenario, Lesson, QuizQuestion, VocabularyWord, etc.).
  - `constants.tsx`: large configuration surface:
    - Supported languages, UI copy (quotes), challenge/persona metadata, static lessons per language, and scenario definitions (each with a `systemPrompt`).
    - View definitions (`VIEWS`, `ALL_VIEWS`) that centralize route ids, labels, icons, and paths consumed by routing and navigation components.
  - `i18n/`: lightweight i18n assets
    - `translations.ts` maps English UI labels to per-language labels for navigation.
    - Additional content like `learningPath.ts`, `kanji.ts`, `vocabulary.ts` provide structured content used by feature views.

- Feature views (selected highlights)
  - Conversational AI
    - `components/AITutorView.tsx`: live, voice-first conversation with the AI tutor (Polly). Uses `@google/genai` Live API, WebAudio for input/output, and streams transcription plus AI audio responses. System prompt is templated from `AI_TUTOR_PROMPT` in `constants.tsx`.
    - `components/ScenarioView.tsx`: text chat scenarios (e.g., café ordering, interviews). Wraps `startChat`/`sendMessage` from `services/geminiService.ts` and optionally parses a grammar feedback block appended by the model into a typed `grammarFeedback` per user message.
  - Learning content
    - `components/LessonView.tsx`: renders static lesson vocab and a mini-quiz; optional culture capsule rendered via `marked` (Markdown to HTML).
    - `components/WordBankView.tsx`: structured learning path modules/units from `i18n/learningPath.ts`; per-word TTS playback via `generateSpeech`; dynamic MCQ quiz generation via `generateQuizForUnit`. Progress is persisted to `localStorage` by language.
  - Layout and navigation
    - `components/Sidebar.tsx` and `components/Header.tsx`: top-level navigation, language switcher, simple user dropdown; Sidebar labels localized via `i18n/translations.ts`.

- AI integration (`services/geminiService.ts`)
  - Centralized wrapper for `@google/genai` using `process.env.API_KEY` (populated from `GEMINI_API_KEY`). Exposes:
    - Chat lifecycle: `startChat(systemPrompt)`, `sendMessage(message, includeGrammarCheck)`.
    - Text analysis: `analyzeGrammar(text)`.
    - Vision: `generateImage(prompt)`, `editImage(base64, mimeType, prompt)`, `generateVocabularyFromImage(base64, mimeType, languageName)` with JSON schema responses.
    - Speech/TTS: `generateSpeech(prompt)` returns base64 audio; consumers use WebAudio to play.
    - Content generation: `getPronunciationFeedback`, `generateQuizForUnit(words, languageName)`.

- Build and tooling
  - Vite config (`vite.config.ts`):
    - Server: host `0.0.0.0`, port `3000`.
    - Aliases: `@` → repo root.
    - `define` injects env keys for runtime code.
  - TypeScript (`tsconfig.json`): ES2022 target, JSX `react-jsx`, bundler resolution, alias paths for `@/*`.

- PWA/native affordances
  - `manifest.json`, `sw.js`, and install banner logic in `App.tsx` provide a PWA experience (with `HashRouter`).
  - Capacitor Status Bar integration for native builds; otherwise runs as a web app.

Notes derived from README.md

- Prerequisites: Node.js
- Run locally:
  1) `npm install`
  2) Create `.env.local` and set `GEMINI_API_KEY`
  3) `npm run dev`

Repository conventions

- Routing and navigation labels are centralized in `constants.tsx` and `i18n/translations.ts`; prefer updating those instead of scattering route strings.
- All AI calls should go through `services/geminiService.ts` so environment and model configs remain consistent.
