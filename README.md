# Security+ SY0-801 — Windows & Android Learning Platform

**100% offline** desktop and mobile application covering all **27 official objectives** of the CompTIA Security+ SY0-801 V8 certification (document v2.0, ©2025).

## Launch the Application

- **Portable Windows Executable**: `release/SecurityPlus-SY0-801-Portable-0.1.0.exe` (~106 MB, no installer, user-level permissions).
- The first launch may be delayed by a few seconds due to Windows antivirus scanning.
- **From source**: `npm install` → `npm run build` → `npm start`
- **Development mode**: `npm run dev` then `SP801_DEV=1 npm start`
- **Rebuild the .exe**: `npm run dist`
- **Build Android APK**: Built automatically via GitHub Actions (`.github/workflows/android-apk.yml`) using Capacitor (`android/`).

## Included Content

| Item | Quantity |
|---|---|
| Official objectives covered | **27 / 27** (5 domains, 716 subtopics) |
| Structured lessons | **64** |
| Flashcards (Leitner spaced repetition, 5 boxes) | **520** |
| Graded quizzes with explanations and sources | **27** (6 questions each) |
| Practical exercises (PBQs: classification, ordering, matching, table, calculation) | **28** |
| 3-level decision assessment scenarios | **27** |
| Interactive SVG diagrams (Explore / Quiz / Order) | **92** — at least one in each of the 64 lessons, two in 28 of them; **Expand** button for fullscreen view |
| Animated simulations (TLS, crypto, network attack, OSI, Zero Trust, RTO/RPO, IR, IAM) | **8** |

Every concept is linked to a **real reference** (book, chapter, page) or, when none of the four reference books cover it, to the **official exam objectives** with an explicit "Not in books" badge. No fabricated citations.

## Duolingo-Style Gamification

- **Real XP**: lesson +20, quiz up to +40 (based on score), exercise +25, scenario +30, flashcard +3 (40 XP/day cap). Everything is calculated from actual progress history—no fake scores.
- **Levels**: 100 XP per level, evolving title (Novice → Master), animated XP bar in the top bar and on the dashboard.
- **Streak & Daily Goal**: consecutive days, daily goal in minutes, animated counter.
- **8 Badges** unlocked automatically (First Steps, Explorer, Sharpshooter, Elephant Memory, On Fire, Veteran, All-Terrain, Commander).
- **Celebrations**: animated overlay with confetti and "+20 XP" upon completing a lesson, quiz, exercise, or scenario; level-up screen and toggleable soft sound effects.
- **Clean Interface**: 5-domain path dashboard, animated mascot, large typography, minimal borders, large touch targets.

## Interactive Learning Experience

- **Dashboard = Training Center**: weighted overall progress, five clickable domains, mastery rate per domain, mastered objectives, resume last activity, recommendations calculated from real progress, recent results, study time, review streak, and 7-day activity.
- **Step-by-Step Lesson Reader**: each lesson is broken into steps with navigation, progressive explanations, and a toggle to continuous reading mode. Diagrams, simulations, and quick checks are first-class steps.
- **Animated Simulations**: TLS handshake, symmetric vs. asymmetric, network attack, OSI layers, Zero Trust components, RTO/RPO, incident response cycle, IAM cycle. Each simulation plays step-by-step and ends with a comprehension question and immediate explanation.
- **Pedagogical Feedback**: every incorrect answer is explained; weak concepts (quiz < 70% or flashcards with ≥ 3 misses) automatically surface in "Up next".
- **Progressive Unlocking**: the first objective of each domain is unlocked; subsequent ones unlock at 35% progress on the previous objective, with an option to unlock manually.
- **End-of-Objective Assessment**: graded quiz, practical exercise, and scenario linked directly from the objective card.
- **Responsive & Touch-Ready**: responsive layout, large touch targets, mouse or touch navigation. The React UI layer is separated from logic (`lib/`) and data (`content/`) for Android reuse via Capacitor/WebView—a single codebase, not two separate apps.

## Interface & Design

- **Sleek Dark Theme** by default, cyan/blue accents, per-domain colors, subtle animations.
- **Light/Dark Toggle** in the top bar (preference saved locally).
- Custom Windows icon (gradient shield) embedded in the executable.
- Dashboard with official domain weights (16 / 24 / 19 / 27 / 14%) and weighted progress.
- Navigation by domain and objective, full-text search (`Ctrl+K`), glossary, progress tracking.
- Progress saved locally; JSON export/import via the **File** menu.

## Code Structure

```
src/content/objectives.json        # The 27 official objectives and their subtopics
src/content/lessons/*.json         # 64 lessons (typed blocks)
src/content/flashcards/*.json      # 27 decks
src/content/quizzes/*.json         # 27 quizzes
src/content/pbqs/*.json            # 28 practical exercises
src/content/scenarios/*.json       # 27 scenarios
src/content/diagrams.json          # Initial prototype diagrams
src/content/diagrams-extra/*.json  # Production objective diagrams
src/content/diagrams-extra/        # Interactive diagrams by objective and batch
src/content/simulations.json       # 8 animated simulations
tools/insert_diagrams.py           # Diagram insertion and validation in lessons
src/engines/                       # Lesson, diagram, simulation, and step-reader engines
src/routes/                        # Screens (dashboard, objective, lesson, quiz, lab, scenario…)
src/lib/learning.ts                # Learning insights (recommendations, weaknesses, unlocking)
src/lib/                           # Content loading, progress, search, router
electron/                          # Electron main process (window, menu, save)
android/                           # Capacitor Android project
build/icon.ico                     # Windows icon
tools/integrate.py                 # Content validation and integration
docs/CONTENT_SPEC.md               # Content specification
```

Adding or updating an objective = edit its JSON files and run `python tools/integrate.py`. **No code changes required.**

## Verification

- `python tools/integrate.py`: 27/27 objectives complete, **0** reference issues.
- `npm run typecheck`: OK · `npm run build`: OK · `npm run dist`: OK.

## Source Pagination

- *SOC Analyst Notes*: PDF page = book page.
- *11 Strategies of a World-Class SOC* (Knerler, Parker & Zimmerman, MITRE, 2nd ed. 2022): printed page = PDF page − 20.
- *Defensive Security Handbook* (Brotherston & Berlin, O'Reilly, 2017): printed page = PDF page − 22.
- *Networking Fundamentals for SOC Analyst* (CyberSecXperts, OCR): PDF page.
