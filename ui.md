# SpeakZone UI Documentation

This document outlines the architecture, design system, and patterns used in the **SpeakZone UI** after its comprehensive visual and architectural overhaul.

## 🚀 Core Technology Stack
- **Framework**: [React 19](https://react.dev/) (Vite 8)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Global stores for User, Session, and Practice)
- **i18n**: [i18next](https://www.i18next.com/) with translation files for English, O'zbek, and Русский.
- **Icons**: Custom geometric SVG-based JSX components.

---

## 🎨 Design System (Premium Dark Navy & Teal)

### Typography
- **Primary Font**: `Space Grotesk` (Geometric sans-serif)
- **Character**: Sharp headings, clean readable body text weights.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#070b13` | Deep dark navy application base |
| `surface` | `#0d1525` | Lighter navy for cards |
| `elevated` | `#142030` | Active/elevated components |
| `teal` | `#00c9b1` | **Electric Teal**: Main accent, CTA |
| `amber` | `#f59e0b` | **Warm Amber**: Streaks, warnings |

---

## 📱 Tab Inventory & Content

### 1. Home Tab (`HomeTab.jsx`)
The main dashboard providing a snapshot of the user's progress.
- **Top Bar**: SpeakZone/SpeakAI adaptive wordmark and a persistent notification bell with a flame streak badge.
- **Greeting**: Personalized user greeting based on time of day (Good morning, etc.).
- **Band Score Badge**: A glowing teal surface card showing the "Estimated Band" (e.g., 6.5) alongside a "Target" and "Improving" status.
- **Primary CTAs**:
    - **"Start Speaking"**: Large solid teal button with microphone icon.
    - **"Start Mock Test"**: Outlined teal button for exam simulation.
- **Stats Row**: Side-by-side cards for "Day Streak" (amber flame) and "Daily Goal" progress (teal progress bar).
- **Band Trend Chart**: A custom SVG line curve showing performance over the last 7 sessions/days.
- **Last Session**: Compact activity card showing session type, date, and band score.
- **Social Proof**: Centered hint text ("2,400 students improving...").

### 2. Mock Tab (`MockTab.jsx`)
The full IELTS exam experience.
- **Mock List**: Scrollable list of tests. Each mock card shows topics, duration, and status (Complete/Available/Locked).
- **Exam Flow** (`screen === 'flow'`):
    - Header with Part counter (e.g., Part 1/3) and an active digital timer.
    - Progress dots indicate completion of Part 1, 2, and 3.
    - **Question Card**: Elevated dark card with large centered question text.
    - **Voice UI**: Animated teal mic pulse during recording.
- **AI Evaluation**: "Analyzing your response" loading state with custom spinning rings.
- **Results Screen**:
    - Large overall band score badge.
    - 2x2 grid of criteria scores (Fluency, Vocabulary, Grammar, Pronunciation) with progress bars.
    - Detailed bullet points for **Strengths** (teal) and **Areas to Improve** (amber).

### 3. Practice/Speak Tab (`PracticeTab.jsx`)
Focused linguistic training and vocabulary.
- **Topics Grid**: 2-column grid of vocabulary categories (Education, Tech, Health, etc.).
- **Status Badges**: Each topic is tagged as "Mastered" (teal), "Learning" (amber), or "New" (blue).
- **Vocab Due Banner**: Amber-edged card highlighting words ready for review.
- **Learning Interface**: 
    - Full-screen "Vocab Card" showing definition, part of speech, and IELTS example sentences.
    - **Interactive Buttons**: "I know this" (teal), "Still learning" (amber), "Don't know" (muted).
- **Improve Answer**: Interface for refining user speech into Band 8.5 level responses.

### 4. Profile Tab (`ProfileTab.jsx`)
User management and historical analytics.
- **Header**: Circular teal avatar with initials, Telegram username, and "PRO" or "FREE" membership badge.
- **Metrics Grid**: 4 key stats (Sessions, Talk Time, Mocks, Words Mastered).
- **Upgrade Banner**: Conversion-focused card for free users showing premium benefits and price.
- **Activity History**: Vertical list of all historical mock sessions with score trends.
- **Settings Panel**: 
    - Interactive rows for Daily Reminders (toggle), Goal Setting, and App Language (select menu).
    - "Clear History" action in cautionary red.
- **Footer**: Feedback, Rating, and Privacy links with a "Log Out" outlined button.

---

## ✨ Micro-Interactions
- **`.animate-tab-in`**: Subtle slide-up when switching tabs.
- **`.animate-mic-pulse`**: Deep teal glow that pulses in sync with recording state.
- **`.glass-nav`**: 24px background blur on the bottom navigation bar.
- **Haptic Feedback**: Triggered via `useTelegram` on all significant interactions.
