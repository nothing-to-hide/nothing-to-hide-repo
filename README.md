# Nothing to Hide

This project was originally developed in 2025 by students at the FHNW (University of Applied Sciences and Arts Northwestern Switzerland) as part of the IP34-25bb project, in collaboration with the DataPro Consortium and the University of Education Freiburg (PH Freiburg).

The vision:
_Making data protection education fun and accessible through an interactive classroom game – helping students and teachers recognize threats, act confidently, and build a safer digital future together._

The game consists of multiple scenes. Each scene is structured into three steps: an introduction, a mini-game, and a quiz.

**Technologies used:**

- **React**: For building the UI.
- **Vite**: For fast development and build tooling.
- **TypeScript**: For type-safe JavaScript development.
- **ChatGPT**: For image generation.

## Content

- [Local Development](#local-development)
- [Code Structure](#code-structure)
- [Noteworthy Components](#noteworthy-components)

## Local Development

### Prerequisites

Ensure you have the following installed:

- **NodeJS**: >=20 [Download Node.js](https://nodejs.org/en/)
- **npm**: Comes with Node.js

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

### Start the app

1. Start the development server: `npm run dev`
2. Navigate to the URL provided in the terminal (default `http://localhost:5173`).

### Build the Project

1. Build the project: `npm run build`
2. The built files will be located in the `dist` directory.

_Note: If you want to deploy the project to a specific sub-route on a website, you need to update the `vite.config.ts` file; otherwise, the assets might not be loaded correctly._

```ts
export default defineConfig({
  plugins: [react()],
  base: "/", // Replace "/" with your sub-route if needed, e.g., "/nothing-to-hide/"
});
```

### Testing

1. Run test with Jest: `npm run test`
2. Test coverage will be generated in the `coverage` directory automatically.

## Code Structure

```diff
.
├── public/                          # Static files served directly (not processed by Vite)
│   └── assets/                        - All static game assets
│       ├── avatars/                   - Player and NPC graphics
│       ├── fonts/                     - Fonts used in the game's UI
│       ├── icons/                     - Icons for buttons and UI elements
│       ├── images/                    - Scene backgrounds and other visuals
│       └── sounds/                    - Background music and sound effects
│
└── src/                             # Core application source code
    ├── app/                           - Main application setup, global styles and entry point
    │
    ├── components/                   # All UI components
    │   ├── common/                     - Shared UI elements (Button, Quiz, etc.)
    │   ├── endScreen/                  - Components for the game's end screen
    │   ├── footer/                     - Footer UI (if applicable)
    │   ├── header/                     - Header UI (if applicable)
    │   ├── scenes/                     - Individual game scenes (Intro, MiniGame, Quiz)
    │   └── startScreen/                - Components for the game's start screen
    │
    ├── constants/                    # Configuration constants and fixed values
    │
    ├── context/                      # Global state via React Context API
    │   ├── GameStateContext.tsx        - Manages player progress and state
    │   └── SettingsContext.tsx         - Manages language and user preferences
    |
    ├── tests/                        # Unit-tests
    │
    ├── translations/                 # Contains all translation-related files and language resources
    |   │─── .../                       - Translations namespace (for each languages a new folder)
    │   └── index.ts                    - Root translation module: exports all languages and their metadata
    │
    ├── types/                        # TypeScript types and interfaces organized by logical groups or features
    |   |── game                        - General types for all game related components (MiniGames, Achievements, Story, etc.)
    │   └── translations/               - Types for translation file structure
    │
    └── utils/                        # General-purpose helpers and hooks
```

## Noteworthy Components

### BaseScene.ts

`BaseScene` is the core layout for every scene. It handles the full scene flow:

- Prologue → Intro → Mini-Game → Quiz
- Rendering the correct step
- Updating game state & unlocking achievements
- Showing dialogs or quizzes in the prologue
- Enforcing landscape mode
- Displaying the scene’s background

Each scene only provides its content components — BaseScene manages everything else.

**Example usage: SocialMediaScene**
A scene simply plugs its parts into BaseScene:

```tsx
...
return (
  <BaseScene
    achievement={ACHIEVEMENT_KEY.socialMedia}
    backgroundImagePath={getSectionImage(SCENE.SCENE_1,gameState.avatar)}
    prologueElements={prologueElements}
    intro={({ onComplete }) => <SocialMediaIntro onComplete={onComplete} />}
    miniGame={({ onComplete }) => <SocialMediaMiniGame onComplete={onComplete} />}
    quiz={({ onComplete }) => <SocialMediaQuiz onComplete={onComplete} />}
  />
);
```

### useTranslation.ts

A hook to access translations based on the current language setting from SettingsContext.
Returns the full translation object for the selected language (localize).

**How translations work**:
Each language has its own folder in `src/translations`. Every folder contains structured translation files:

- General.ts – general UI labels and texts
- CommonGame.ts – texts for start/end screens and player setup
- Scenes.ts – texts for each scene (prologue, intro, mini-game, quiz)
  useTranslation automatically selects the correct language object from these files.
  Types ensure all translations exist for every language.

**Example usage:**

```tsx
const { localize } = useTranslation();

<Modal title={localize.general.settings.title} />;
```

### Global State management

Implemented using React’s built-in useContext, no external packages needed.

`GameStateContext`

Manages the game’s progress, including:

- Player name, avatar, points, current scene & step
- Unlocked achievements and replay queue
- Persisted in `localStorage` for session continuity

**Hooks & usage:**

```tsx
const { gameState, updateGameState, resetGameState } = useGameState();
```

- `updateGameState` merges and saves updates
- `resetGameState` restores the default state

`SettingsContext`

Handles user preferences, including:

- Audio settings (enabled, music & SFX volume)
- Language selection
- Persisted in `localStorage`

**Hooks & usage:**

```tsx
const { settings, updateSettings } = useSettings();
```

- `updateSettings` merges new settings and updates `localStorage`
