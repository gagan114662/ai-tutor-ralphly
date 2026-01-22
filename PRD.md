# AI Tutor Platform - Production-Ready PRD

## Overview
Build an AI-powered learning platform with vision AI, interactive tutors, and adaptive learning. This PRD is structured for autonomous development with proper testing and sequencing.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **AI**: Google Gemini (Vision + Text), OpenAI (Whisper for audio)
- **Testing**: Jest, React Testing Library, Playwright (E2E)
- **State**: Zustand for client state, React Query for server state

---

## Phase 0: Project Foundation (MUST COMPLETE FIRST)

### 0.1 Project Setup
- [ ] Initialize Next.js 14 project with TypeScript, Tailwind CSS, ESLint, Prettier. Create src/app directory structure with layout.tsx and page.tsx. Add .env.example with placeholder values. Include unit test to verify app renders without crashing.
- [ ] Set up Jest and React Testing Library with proper configuration. Create jest.config.js, jest.setup.js, add test scripts to package.json. Create src/__tests__/setup.test.ts that verifies testing works. All tests must pass.
- [ ] Set up Playwright for E2E testing. Create playwright.config.ts, e2e/ directory. Create e2e/home.spec.ts that tests homepage loads successfully. Configure for headless Chrome.
- [ ] Create shared UI component library foundation in src/components/ui/. Build Button, Input, Card, Modal, Spinner, Toast components with TypeScript props. Write unit tests for each component. Export from src/components/ui/index.ts.
- [ ] Set up Supabase client in src/lib/supabase/. Create client.ts for browser, server.ts for server components, middleware.ts for auth. Add types in src/types/database.ts. Write unit tests mocking Supabase client.

### 0.2 Authentication System
- [ ] Create Supabase auth schema with users table extending auth.users. Add fields: full_name, avatar_url, role (student/teacher/admin), created_at, updated_at. Write migration in supabase/migrations/. Include database types.
- [ ] Build auth UI components in src/components/auth/. Create LoginForm, SignupForm, ForgotPasswordForm, ResetPasswordForm with proper validation using zod. Write unit tests for form validation logic.
- [ ] Implement auth pages: src/app/(auth)/login/page.tsx, signup/page.tsx, forgot-password/page.tsx. Use server actions for form submission. Include loading states and error handling. Write E2E test for complete signup and login flow.
- [ ] Create auth middleware in src/middleware.ts protecting /dashboard/* routes. Redirect unauthenticated users to /login. Write unit tests for middleware logic.
- [ ] Build user profile page at src/app/dashboard/profile/page.tsx. Allow editing name, avatar upload to Supabase storage. Write unit tests for profile form and E2E test for profile update flow.

### 0.3 Core Layout & Navigation
- [ ] Create responsive dashboard layout in src/app/dashboard/layout.tsx with sidebar navigation, header with user menu, and main content area. Use Tailwind for styling. Write unit tests for layout components.
- [ ] Build Sidebar component in src/components/layout/Sidebar.tsx with navigation links: Dashboard, Learn, Practice, Progress, Settings. Highlight active route. Collapsible on mobile. Unit tests for active state logic.
- [ ] Create Header component in src/components/layout/Header.tsx with search bar, notifications bell, user dropdown menu (profile, settings, logout). Unit tests for dropdown behavior.
- [ ] Build landing page at src/app/page.tsx with hero section, features grid, testimonials, CTA. Fully responsive. Include SEO metadata. E2E test for page load and navigation to signup.
- [ ] Implement dark mode support using next-themes. Add theme toggle in Header. Persist preference. Update all components for dark mode. Unit test theme switching logic.

---

## Phase 1: Learning Foundation

### 1.1 Subject & Topic System
- [ ] Create database schema for subjects and topics. Tables: subjects (id, name, slug, description, icon, color), topics (id, subject_id, name, slug, description, order, prerequisites). Write migration and TypeScript types.
- [ ] Build SubjectCard component displaying subject with icon, name, progress percentage. Create SubjectsGrid layout. Write unit tests for progress calculation and rendering.
- [ ] Create subjects listing page at src/app/dashboard/learn/page.tsx fetching from Supabase. Server component with suspense. Include loading skeleton. E2E test for subjects display.
- [ ] Build topic tree component showing hierarchical topics with completion status. Expandable/collapsible. Prerequisites shown as locked. Unit tests for tree logic.
- [ ] Create subject detail page at src/app/dashboard/learn/[subject]/page.tsx showing all topics in subject. Track user progress. E2E test for topic navigation.

### 1.2 Question Engine
- [ ] Create database schema for questions. Tables: questions (id, topic_id, type, difficulty, content, options, correct_answer, explanation, created_at), user_answers (id, user_id, question_id, answer, is_correct, time_spent, created_at). Write migration and types.
- [ ] Build question components for different types: MultipleChoice, TrueFalse, FillInBlank, ShortAnswer. Each with proper state management and validation. Unit tests for answer validation.
- [ ] Create QuestionCard wrapper component handling question display, timer, answer submission, and explanation reveal. Animate transitions. Unit tests for timer and submission logic.
- [ ] Build practice session page at src/app/dashboard/practice/[topic]/page.tsx. Fetch questions, track progress, show results. Server action for answer submission. E2E test for complete practice session.
- [ ] Create results summary component showing score, time, incorrect answers with explanations. Option to retry wrong questions. Unit tests for score calculation.

### 1.3 AI Integration Foundation
- [ ] Set up Google Gemini API client in src/lib/ai/gemini.ts. Create wrapper functions for text generation and vision. Add rate limiting and error handling. Unit tests with mocked API responses.
- [ ] Create AI service abstraction in src/lib/ai/service.ts. Interface for different AI providers. Factory pattern for provider selection. Unit tests for abstraction layer.
- [ ] Build AI explanation generator in src/lib/ai/explanations.ts. Takes question and wrong answer, generates personalized explanation. Cache responses. Unit tests with mocked AI.
- [ ] Create hint system in src/lib/ai/hints.ts. Progressive hints (3 levels) that guide without revealing answer. Unit tests for hint generation logic.
- [ ] Build AI question generator in src/lib/ai/questions.ts. Generate questions from topic description. Validate generated questions. Unit tests for question format validation.

---

## Phase 2: Vision AI Features

### 2.1 Camera Integration
- [ ] Create camera access hook in src/hooks/useCamera.ts. Handle permissions, stream management, device selection (front/back). Cleanup on unmount. Unit tests for permission states.
- [ ] Build CameraView component in src/components/camera/CameraView.tsx. Live preview, capture button, switch camera, flash toggle. Responsive design. Unit tests for UI states.
- [ ] Create image capture utility in src/lib/camera/capture.ts. Capture frame from video stream, convert to base64, compress for API. Unit tests for image processing.
- [ ] Build CameraModal component wrapping CameraView with overlay UI. Instruction text, close button, capture feedback. Unit tests for modal behavior.
- [ ] Create camera permission flow component. Request permission, show instructions if denied, provide settings link. E2E test for permission flow.

### 2.2 Homework Help Scanner
- [ ] Build image upload component in src/components/upload/ImageUpload.tsx. Drag-drop, file picker, paste from clipboard, camera capture. Preview before submit. Unit tests for file handling.
- [ ] Create Gemini Vision integration for homework analysis in src/lib/ai/vision/homework.ts. Send image, get structured response with detected problems and solutions. Unit tests with mocked responses.
- [ ] Build HomeworkScanner page at src/app/dashboard/homework/page.tsx. Upload/capture image, show analysis loading, display results. E2E test for complete flow.
- [ ] Create solution display component showing step-by-step breakdown. Expandable steps, LaTeX rendering for math, syntax highlighting for code. Unit tests for rendering.
- [ ] Build homework history feature. Save scanned homework to database with results. List previous scans. Unit tests for history queries.

### 2.3 Math Equation Solver
- [ ] Create math OCR integration using Gemini Vision in src/lib/ai/vision/math.ts. Extract equations from images, return LaTeX format. Unit tests with sample images.
- [ ] Build equation display component using KaTeX. Render LaTeX equations properly. Handle inline and block equations. Unit tests for LaTeX rendering.
- [ ] Create step-by-step math solver in src/lib/ai/math/solver.ts. Take equation, return solution steps with explanations. Unit tests for solution format.
- [ ] Build MathSolver page at src/app/dashboard/math/page.tsx. Camera/upload input, equation recognition preview, solve button, step-by-step results. E2E test.
- [ ] Add graph visualization for equations using recharts. Plot functions, show intercepts, domain/range. Unit tests for data transformation.

### 2.4 Document Scanner
- [ ] Create document detection in src/lib/ai/vision/document.ts. Detect document type (textbook, notes, worksheet). Extract text and structure. Unit tests.
- [ ] Build document viewer component. Display extracted text with highlighting. Navigate pages/sections. Unit tests for navigation.
- [ ] Create quiz generator from documents in src/lib/ai/documents/quiz.ts. Analyze document content, generate relevant questions. Unit tests for question quality.
- [ ] Build DocumentScanner page at src/app/dashboard/documents/page.tsx. Upload document, show extraction progress, display results with generated quiz. E2E test.
- [ ] Add document library feature. Save scanned documents, organize by subject, search content. Database schema and queries with tests.

---

## Phase 3: AI Tutor System

### 3.1 Chat Interface
- [ ] Create chat message types and database schema. Tables: conversations (id, user_id, subject_id, created_at), messages (id, conversation_id, role, content, metadata, created_at). Migration and types.
- [ ] Build ChatMessage component displaying user and AI messages. Support markdown, code blocks, LaTeX, images. Typing indicator. Unit tests for message rendering.
- [ ] Create ChatInput component with textarea, send button, attachment options. Handle multiline, keyboard shortcuts. Unit tests for input handling.
- [ ] Build ChatContainer managing message list with auto-scroll, load more history, optimistic updates. Unit tests for scroll behavior.
- [ ] Create streaming response handler in src/lib/ai/streaming.ts. Handle SSE from AI, update UI progressively. Unit tests for stream parsing.

### 3.2 Tutor Personas
- [ ] Create tutor persona system in src/lib/tutors/personas.ts. Define persona interface: name, avatar, personality, expertise, communication style. TypeScript types.
- [ ] Build persona definitions: Einstein (physics/math, playful), Curie (chemistry, methodical), Ada (programming, logical), Socrates (philosophy, questioning). Export from src/lib/tutors/index.ts.
- [ ] Create TutorAvatar component displaying persona image/animation, name badge, expertise tags. Unit tests for rendering variants.
- [ ] Build TutorSelector component for choosing tutor. Grid of available tutors, preview card with description. Persist selection. Unit tests.
- [ ] Implement persona-aware prompting in src/lib/ai/tutors/prompt.ts. Inject persona characteristics into AI system prompt. Unit tests for prompt generation.

### 3.3 Tutoring Session
- [ ] Create tutoring session state management with Zustand. Track current topic, messages, tutor, progress. Persist across page refreshes. Unit tests for store.
- [ ] Build TutorChat page at src/app/dashboard/tutor/page.tsx. Tutor selection, topic picker, chat interface. Server actions for message handling. E2E test.
- [ ] Implement context-aware responses in src/lib/ai/tutors/context.ts. Include conversation history, user level, current topic in prompts. Unit tests.
- [ ] Create learning path suggestions. AI analyzes conversation, suggests next topics to study. Display as actionable cards. Unit tests for suggestion logic.
- [ ] Build session summary feature. At end of session, generate summary of topics covered, key learnings, areas to review. Unit tests.

---

## Phase 4: Progress & Analytics

### 4.1 Progress Tracking
- [ ] Create progress database schema. Tables: user_progress (id, user_id, topic_id, mastery_level, questions_attempted, questions_correct, last_practiced, streak_days). Migration and types.
- [ ] Build progress calculation service in src/lib/progress/calculate.ts. Mastery algorithm based on accuracy, recency, difficulty. Unit tests for calculation logic.
- [ ] Create ProgressRing component showing circular progress indicator. Animated fill, percentage display, color coding by level. Unit tests.
- [ ] Build progress dashboard at src/app/dashboard/progress/page.tsx. Overall stats, subject breakdown, recent activity, streak display. E2E test.
- [ ] Implement streak tracking system. Calculate consecutive practice days, handle timezone, streak freeze feature. Unit tests for streak logic.

### 4.2 Analytics Dashboard
- [ ] Create analytics data aggregation in src/lib/analytics/aggregate.ts. Daily/weekly/monthly rollups for practice sessions, accuracy, time spent. Unit tests.
- [ ] Build charts using recharts: LineChart for progress over time, BarChart for subject comparison, PieChart for time distribution. Unit tests for data transformation.
- [ ] Create analytics dashboard at src/app/dashboard/analytics/page.tsx. Time range selector, multiple chart views, export data option. E2E test.
- [ ] Build strength/weakness analyzer in src/lib/analytics/insights.ts. Identify strong topics (high accuracy) and weak topics (low accuracy, avoiding). Unit tests.
- [ ] Create recommendations engine in src/lib/analytics/recommendations.ts. Suggest what to study based on weakness, forgetting curve, goals. Unit tests.

### 4.3 Achievements & Gamification
- [ ] Create achievements database schema. Tables: achievements (id, name, description, icon, criteria, points), user_achievements (id, user_id, achievement_id, earned_at). Migration and types.
- [ ] Build achievement checker in src/lib/achievements/check.ts. Define achievement criteria, check after each action, award new achievements. Unit tests for criteria evaluation.
- [ ] Create AchievementBadge component displaying badge icon, name, earned status. Locked/unlocked states, animation on earn. Unit tests.
- [ ] Build achievements page at src/app/dashboard/achievements/page.tsx. Grid of all achievements, filter by earned/locked, progress toward next. E2E test.
- [ ] Implement XP and leveling system in src/lib/gamification/xp.ts. XP for activities, level thresholds, level-up notifications. Unit tests.

---

## Phase 5: Real-Time Features

### 5.1 WebSocket Infrastructure
- [ ] Set up Supabase Realtime subscription wrapper in src/lib/realtime/client.ts. Connect, subscribe to channels, handle reconnection. Unit tests with mocked client.
- [ ] Create presence system in src/lib/realtime/presence.ts. Track online users, typing indicators, active sessions. Unit tests for presence state.
- [ ] Build notification system with Supabase. Tables: notifications (id, user_id, type, title, body, read, created_at). Real-time subscription for new notifications. Tests.
- [ ] Create NotificationBell component with unread count badge. Dropdown showing recent notifications, mark as read. Unit tests.
- [ ] Build toast notification system for real-time events. Achievement earned, streak milestone, friend activity. Unit tests for toast queue.

### 5.2 Collaborative Features
- [ ] Create study room database schema. Tables: study_rooms (id, name, subject_id, created_by, is_private, created_at), room_members (id, room_id, user_id, role, joined_at). Migration.
- [ ] Build study room list at src/app/dashboard/rooms/page.tsx. Show public rooms, create room button, join by code. Unit tests for room filtering.
- [ ] Create study room page at src/app/dashboard/rooms/[id]/page.tsx. Member list, shared content area, chat. Real-time sync. E2E test.
- [ ] Implement shared whiteboard using canvas. Real-time drawing sync via Supabase Realtime. Basic tools: pen, eraser, colors. Unit tests for draw commands.
- [ ] Build collaborative quiz feature. Room host starts quiz, all members answer simultaneously, show leaderboard. Unit tests for scoring.

---

## Phase 6: Mobile & PWA

### 6.1 PWA Setup
- [ ] Create PWA manifest in public/manifest.json. App name, icons (all sizes), theme colors, display standalone. Configure in next.config.js.
- [ ] Implement service worker for offline caching using next-pwa. Cache static assets, API responses for viewed content. Unit tests for cache strategies.
- [ ] Create offline indicator component. Detect connection status, show banner when offline, queue actions for sync. Unit tests.
- [ ] Build install prompt component for PWA. Detect installable, show custom install button, track installs. Unit tests for install detection.
- [ ] Add app shortcuts in manifest. Quick access to Practice, Scan Homework, Chat with Tutor from home screen icon.

### 6.2 Mobile Optimization
- [ ] Audit and fix all touch targets. Minimum 44x44px tap areas, proper spacing. Update all interactive elements. Visual regression tests.
- [ ] Implement pull-to-refresh on list pages. Dashboard, progress, achievements. Smooth animation, loading state. Unit tests.
- [ ] Create bottom navigation for mobile in src/components/layout/BottomNav.tsx. Home, Learn, Scan, Progress, Profile. Show on mobile only. Unit tests.
- [ ] Optimize images using Next.js Image component. Proper sizing, lazy loading, blur placeholders. Lighthouse audit should pass.
- [ ] Add haptic feedback for key interactions using navigator.vibrate. Button presses, achievements, errors. Feature detection for unsupported browsers.

---

## Phase 7: Settings & Admin

### 7.1 User Settings
- [ ] Create settings page at src/app/dashboard/settings/page.tsx. Tabbed interface: Profile, Preferences, Notifications, Privacy. E2E test.
- [ ] Build notification preferences form. Toggle email/push for: daily reminders, streak alerts, achievement unlocks, tips. Save to database. Unit tests.
- [ ] Create learning preferences form. Preferred subjects, difficulty level, daily goal (minutes/questions), preferred tutor. Unit tests for validation.
- [ ] Implement data export feature. Download all user data as JSON. GDPR compliance. Unit tests for export format.
- [ ] Add account deletion flow. Confirmation dialog, 30-day grace period, data anonymization. E2E test for deletion flow.

### 7.2 Admin Dashboard (Future)
- [ ] Create admin role check middleware. Only allow admin users to /admin routes. Unit tests for role validation.
- [ ] Build admin dashboard at src/app/admin/page.tsx. User count, active sessions, popular subjects, error rates. Charts and stats.
- [ ] Create user management page at src/app/admin/users/page.tsx. List users, search, filter by role, view details. Pagination. Unit tests.
- [ ] Build content management for subjects/topics at src/app/admin/content/page.tsx. CRUD operations, reorder topics, bulk import. E2E test.
- [ ] Create analytics overview at src/app/admin/analytics/page.tsx. Platform-wide metrics, user engagement trends, AI usage stats.

---

## Testing Requirements

### For Every Task
1. **Unit Tests**: Test individual functions and components in isolation
2. **Integration Tests**: Test component interactions and API calls
3. **E2E Tests**: Test critical user flows end-to-end (where specified)

### Test Commands (must pass before task is complete)
```bash
npm run test          # Run Jest unit tests
npm run test:e2e      # Run Playwright E2E tests
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript compiler check
npm run build         # Verify production build
```

### Coverage Requirements
- Unit test coverage: minimum 70%
- All critical paths must have E2E tests
- No failing tests allowed

---

## Environment Variables Required
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google AI
GOOGLE_AI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Notes for Ralphy

1. **Complete Phase 0 first** - All other phases depend on the foundation
2. **Run tests after each task** - `npm run test && npm run lint && npm run build`
3. **Follow the order** - Tasks within each section build on each other
4. **Create mock data** - Use realistic seed data for development
5. **Handle errors gracefully** - Always show user-friendly error messages
6. **Mobile-first** - Design for mobile, enhance for desktop
7. **TypeScript strict** - No `any` types, proper interfaces for all data
