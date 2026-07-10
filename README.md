# Mal Workplace Assistant AI

A premium, guest-access AI workplace companion built with TanStack Start. Mal helps professionals summarise meetings, plan tasks, and get workplace advice through a clean, private chat interface — no account required, no data persistence, and no database.

## Features Implemented

- **Home Dashboard** (`/`)
  - Warm, branded landing page with a clear value proposition and feature cards.
  - One-click navigation to each AI tool.
  - Persistent "No account required" privacy chip.

- **Meeting Notes Summarizer** (`/summarizer`)
  - Paste raw meeting notes or transcripts and receive a structured Markdown summary.
  - AI output includes: Meeting Overview, Key Discussion Points, Decisions Made, Action Items table (Task | Owner | Due Date), and Important Dates & Deadlines.
  - Result is editable and copyable for easy sharing.

- **AI Task Planner** (`/planner`)
  - Describe your tasks, goals, deadlines, and available time to get a personalised work plan.
  - AI output includes: Daily Schedule, Weekly Schedule, Priority Recommendations, and Productivity Advice.
  - Result is editable and copyable.

- **AI Workplace Chat** (`/chat`)
  - Real-time streaming chat with Mal, the workplace assistant.
  - Example prompt chips for quick starts (e.g. "Write a professional email", "Organise my tasks").
  - Single-session only — conversations clear on refresh for privacy.
  - Responsible AI and privacy notices near the composer.

- **Shared Design & UX**
  - Custom cream / brown / pink colour palette with elegant serif headings and clean sans-serif body text.
  - Hand-built "Mal" wordmark used across the app.
  - Responsive layout with a shared brown navigation bar and footer.
  - Per-route SEO metadata (title, description, Open Graph tags).

## Technologies and Tools Used

- **Framework**: [TanStack Start](https://tanstack.com/start) with [TanStack Router](https://tanstack.com/router) for file-based routing and SSR.
- **UI**: React 19, Tailwind CSS 4, shadcn/ui components, and custom AI Elements components.
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) (`ai`, `@ai-sdk/react`) with the Lovable AI Gateway (OpenAI-compatible adapter).
- **Model**: `google/gemini-2.5-flash` for fast, helpful responses.
- **Streaming Chat**: TanStack Start server route at `/api/chat` using `streamText` and `DefaultChatTransport`.
- **Markdown Rendering**: `react-markdown` with `remark-gfm` for tables, lists, and styled output.
- **Form Validation**: Zod for input validation on server functions.
- **Notifications**: Sonner toast messages for error handling.
- **Icons**: Lucide React.
- **Build Tool**: Vite 8.
- **Type Safety**: TypeScript 5 with strict mode enabled.

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 20+ with your preferred package manager.
- A Lovable API key for AI Gateway access (set as `LOVABLE_API_KEY`).

### Install Dependencies

```bash
bun install
```

Or with npm:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and add:

```env
LOVABLE_API_KEY=your-lovable-api-key
```

The app uses this key for server-side AI generation through the Lovable AI Gateway.

### Run the Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

### Lint and Format

```bash
bun run lint
bun run format
```

## Project Notes

- **No accounts or database**: Mal is intentionally guest-only. Sessions are temporary and no user data is stored.
- **No Supabase / Lovable Cloud**: AI functionality is powered entirely by the Lovable AI Gateway via `LOVABLE_API_KEY`.
- **AI output format**: All AI responses are returned as plain human-readable Markdown. No structured JSON or machine-readable formats are used for the summarizer or planner outputs.
- **Responsible AI**: The app includes notices that AI-generated suggestions may not be perfect and should be reviewed before making professional decisions.
