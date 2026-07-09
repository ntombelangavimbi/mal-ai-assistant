## Mal Workplace Assistant AI

A premium, guest-access AI workplace companion — three tools, no accounts, no database, everything temporary to the session. AI runs through Lovable AI (AI Gateway using `LOVABLE_API_KEY`); no Supabase auth or storage is added, matching the privacy requirements. AI outputs are returned as normal human-readable markdown text (no JSON mode, no `response_format`), rendered into nicely formatted sections/cards/tables, and left editable + copyable.

### Design system (cream · brown · pink)

Rework `src/styles.css` tokens to a warm premium palette:

- **Cream** — `background`, `card`, workspace surfaces
- **Brown** — nav, branding, headings, primary text, borders (`primary`)
- **Pink** — buttons, highlights, AI actions, interactive elements (`accent`/CTA)
- Elegant serif for headings (e.g. Cormorant/Playfair) + clean sans for body (e.g. Work Sans), loaded via `<link>` in `__root.tsx`.
- Soft rounded corners, subtle shadows, spacious layout. Gradient/glow tokens for premium feel.
- A simple hand-built **"Mal" wordmark** (serif logotype, pink dot accent) used in the nav — no generic sparkles icon.

### Routes

```
/            Home Dashboard
/summarizer  Meeting Notes Summarizer
/planner     AI Task Planner
/chat        AI Workplace Chat
```

Shared brown top nav (Mal wordmark + links + a persistent "No account required" guest chip). Each route gets its own SEO `head()` (unique title/description/og). Root metadata updated away from "Lovable App" defaults.

**Home Dashboard** (`/`)

- Hero: "Welcome to Mal Workplace Assistant AI" + the description line.
- Guest banner: "Start using your AI workplace assistant instantly. No account required."
- Three feature cards (Summarizer / Planner / Chat) with description, benefit bullets, and pink CTA buttons ("Summarise Notes", "Create Plan", "Chat with Mal") linking to each tool.
- Footer with the privacy message.

**Meeting Notes Summarizer** (`/summarizer`)

- Input: "Paste your meeting notes" textarea + helper text.
- AI returns normal human-readable markdown text organised into sections: Meeting Overview, Key Discussion Points, Decisions Made, Action Items (task / owner / due displayed as a table), and Important Dates & Deadlines. Do not use structured JSON output or machine-readable formats.
- Result rendered via markdown into cards/sections, shown in an **editable** text area with a **Copy** button.
- Responsible AI notice shown on page.

**AI Task Planner** (`/planner`)

- Input: "Tell Mal about your tasks, goals, deadlines, and available time."
- AI returns normal human-readable markdown text containing: Daily Schedule, Weekly Schedule, Priority Recommendations (most important / do first / can wait), and Productivity Advice. The output must be written for users to read directly and must not use JSON formatting.
- Editable + copyable output, responsible AI notice.

**AI Workplace Chat** (`/chat`)

- Built from AI Elements (conversation, message, prompt-input, shimmer).
- Opening message: "Hello, I'm Mal, your AI workplace assistant. How can I help you today?"
- Example prompt chips: Write a professional email · Organise my tasks · Summarise a document · Prepare for a meeting · Give productivity ideas.
- Streamed markdown replies; textarea stays focused; typing indicator; single-session only (clears on refresh, no persistence).
- Responsible AI + privacy notices near the composer.

### Technical approach

- Enable Lovable AI (`LOVABLE_API_KEY`) only — **no Lovable Cloud database / auth**.
- Server-side gateway helper `src/lib/ai-gateway.server.ts` (OpenAI-compatible adapter). Model: a current Gemini flash model (fast, good for this workload).
- Summarizer + Planner: `createServerFn` (`src/lib/ai.functions.ts`) using `generateText` returning plain markdown text (no `Output.object`, no JSON mode). System prompts enforce the AI behaviour rules (professional, clear, ask when info missing, don't invent, plain human text).
- Chat: streaming server route `src/routes/api/chat.ts` + `useChat` client, sending full history each turn, no storage.
- Markdown rendered with `react-markdown` (+ table support) styled to the design tokens.
- Graceful UI handling of 429 (rate limit) / 402 (credits) / network errors.

### Out of scope

No user accounts, authentication, database tables, or saved history — matching the guest-only, temporary-assistant requirement.