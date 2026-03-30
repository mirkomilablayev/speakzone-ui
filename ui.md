# SpeakZone UI Documentation

This document outlines the architecture, design system, and patterns used in the **SpeakZone UI**.

## 🚀 Core Technology Stack
- **Framework**: [React 19](https://react.dev/) (Vite 8)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/)
- **State**: React Internal State (`useState`)
- **Icons**: Custom SVG-based JSX components (`src/components/shared/Icons.jsx`)
- **Animations**: native Tailwind transitions + custom CSS keyframes (`tab-in`, `pulse-ring`, `slide-up`)

---

## 🎨 Design System

### Typography
- **Primary Body/UI**: `Inter` (Set in `index.css`)
- **Note**: Although `Syne` and `DM Sans` are defined in `tailwind.config.js`, `index.css` enforces `Inter` for the root and overrides `.font-syne` to `Inter` for consistent legibility.

### Color Palette
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `bg` | `#0d0f14` | Main application background |
| `card` | `#1e2130` | Core UI containers |
| `card-raised` | `#252840` | Hover states and active cards |
| `accent` | `#4f8ef7` | Primary buttons and brand identity |
| `gold` | `#f5c518` | Premium/VIP indicators |
| `subtle` | `rgba(255,255,255,0.07)` | Dividers and soft borders |

### Brand Gradients
- **Primary**: Blue to Purple (`#4f8ef7` → `#7b5cf0`)
- **Premium**: Gold to Orange (`#f5c518` → `#f97316`)
- **Accent**: Teal to Blue (`#2dd4bf` → `#06b6d4`)

---

## 📱 App Shell & Layout
The application is designed as a **Mobile-First App Shell**:
- **Max Width**: `430px` (Pinned to center for desktop viewing)
- **Height**: `100dvh` (Dynamic Viewport Height to ensure PWA-style fullscreen feel)
- **Navigation**: Persistent `BottomNav` with `.glass-nav` background (20px blur).
- **Scroll**: Individual scrollable `main` area with `.hide-scrollbar` utility.

### Component Structure
```text
src/
├── components/
│   ├── shared/         # Reusable primitives (Buttons, Cards, Avatars)
│   ├── tabs/           # Main view components (Home, Practice, Mock, Profile)
│   ├── modals/         # Overlays (Premium, Settings)
│   └── onboarding/     # First-time user flow
├── App.jsx             # Main router & Layout manager
└── index.css           # Global resets & Utility extensions
```

---

## ✨ Features & Micro-Interactions

### Custom Animations
- **`.animate-tab-in`**: Smooth scale and fade-in when switching tabs.
- **`.pulse-ring`**: Expanding rings for active recording or searching states.
- **`.search-ring`**: Specialized dual-ring spinning animation for IELTS partner matching.
- **`.animate-slide-up`**: Smooth upward emergence for modals and onboarding steps.

### Shared Utilities
- **`.glass-nav`**: High-blur background for navigation bars.
- **`.card-border`**: 1px subtle white border for UI depth.

---

## 🛠️ Key Components Reference

### `Button.jsx`
Supports multiple variants: `primary`, `secondary`, `gold`, `ghost`.
- `primary`: Uses `primary-gradient` with `primary-glow`.
- `gold`: Uses `gold-gradient` with `gold-glow`.

### `BottomNav.jsx`
Mobile-optimized navigation. Uses `Icons.jsx` for consistent stroke weights and size.

### `PremiumModal.jsx`
A high-conversion modal using glassmorphism and the `gold-gradient` for a premium feel.

---

## 🔧 Development Notes
- **Linter**: ESLint with React Hooks & Refresh plugins.
- **Build**: Vite optimized for fast HMR (Hot Module Replacement).
- **Deployment**: Configured for Netlify (`netlify.toml`).
