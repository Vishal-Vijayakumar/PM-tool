# PM Prep Tool - Project Context

## What This Is
A lightweight PM interview prep web app. Users pick a category, get a product scenario, type their answer, and receive AI-powered structured feedback on their reasoning.

The tool exists as a networking asset — it will be shared with PMs during LinkedIn outreach to start conversations and gather feedback. It is NOT a polished product. Speed and functionality over aesthetics.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **LLM API:** Nvidia NIM (OpenAI-compatible endpoint)
  - Base URL: `https://integrate.api.nvidia.com/v1`
  - Model: `meta/llama-3.3-70b-instruct`
  - API key stored in `.env` as `VITE_NVIDIA_API_KEY`
  - Rate limit: 40 requests/minute
- **Deployment:** Vercel (free tier)
- **No backend.** API calls go directly from the client.
- **No auth.** No login, no user accounts.

## Project Structure
```
pm-prep-tool/
  api/
    feedback.js       # Vercel serverless proxy for Nvidia NIM API
  src/
    components/       # React components
    data/
      scenarios.js    # Hardcoded scenario bank
    prompts/
      evaluator.js    # System prompt for AI feedback
    utils/
      api.js          # Nvidia NIM API call logic (dev proxy / prod serverless)
    App.jsx
    main.jsx
  .env                # VITE_NVIDIA_API_KEY=nvapi-xxx (dev only)
  .gitignore
  CHANGELOG.md
  CLAUDE.md
  vercel.json         # Vercel routing config
```

## Categories
1. **Metrics Definition** — Given a product scenario, define success metrics
2. **Prioritization** — Given competing features/initiatives, prioritize and justify
3. **Tradeoff Analysis** — Given a product decision with tradeoffs, analyze and recommend

## Current Status
**Phase 3 complete + polish pass. Minecraft UI, model answers, value prop chips, 5-dimension score display, self-evaluation gate, key concepts checklist, beta label, Vercel deployment live at https://pm-interview-prep-tool.vercel.app/.**

### What's been built
- Vite + React + Tailwind CSS project with Minecraft-inspired UI (warm parchment tones, blocky panels, Press Start 2P title font, green accent)
- Value prop chips in header: "15 Real Scenarios", "5-Dimension Scoring", "Expert Model Answers" -- communicates depth above the fold so PMs know this is not a ChatGPT wrapper
- 15 scenarios across 3 categories in `src/data/scenarios.js`, each with `modelAnswer` and `evaluationHints`:
  - Metrics Definition (5): Instagram, Slack, DoorDash, Spotify, Google Maps
  - Prioritization (5): Notion, Uber Eats, Figma, Duolingo, Stripe
  - Tradeoff Analysis (5): Spotify, LinkedIn, Airbnb, Slack, Reddit
- Category-specific AI evaluation prompts in `src/prompts/evaluator.js` (one rubric per category, with minimum effort check, scoring calibration floor, and structured DIMENSION_SCORES output block)
- Scenario-specific evaluation hints appended to the system prompt at call time in `src/utils/api.js`
- Nvidia NIM API integration in `src/utils/api.js` -- dev uses Vite proxy, production uses Vercel serverless function
- Vercel serverless proxy at `api/feedback.js` -- forwards requests to Nvidia NIM with server-side API key, CORS headers set
- 5-dimension score display: each evaluator prompt outputs per-dimension scores, parsed and rendered as color-coded stat bars in a Minecraft inventory panel; graceful fallback to single overall score if parsing fails
- "BETA" badge next to main title (green Minecraft block style)
- Structured feedback display: parsed sections with color-coded left borders (green for strengths, amber for gaps, blue for examples, stone for tips), score with color scaling
- Reordered feedback flow: qualitative feedback (Strengths/Gaps/Interviewer Tip) appears first, then self-evaluation, then dimension scores + comparison + key concepts checklist, then model answer toggle. This prevents users from anchoring their self-rating to the AI's score.
- Self-evaluation gate: after qualitative feedback, users rate themselves on each dimension (Minecraft score blocks 1-10) before the AI scores or model answer unlock; comparison view shows You vs AI with color-coded gap (green within 1, amber 2-3, red 4+); graceful fallback skips gate when dimension parsing fails
- Key Concepts checklist: after self-eval reveal, the scenario's evaluationHints render as a diamond-blue checklist panel labeled "Concepts to consider for this scenario"
- "See a strong answer" collapsible section appears after self-evaluation (or directly if no dimension scores), showing the curated model answer
- Minimal footer divider line (no personal info)

### What's working
- Value prop chips visible on landing view (above the fold credibility signals)
- All 3 categories active with category-specific evaluation rubrics
- Selecting a scenario and getting AI feedback end-to-end
- Evaluation hints from each scenario are appended to the system prompt for more targeted feedback
- "New scenario" button cycles through scenarios in the active category
- Feedback parsed into styled sections: qualitative (strengths, gaps, interviewer tip) shown first; dimension scores revealed after self-eval; the AI's "strong answer example" and "scoring calibration" sections are silently dropped from rendered output
- Qualitative feedback (Strengths/Gaps/Interviewer Tip) shows immediately; dimension scores are hidden until self-evaluation is submitted
- Self-evaluation gate blocks both scores and model answer until user self-rates on all 5 dimensions
- Score comparison (You vs AI) with self-awareness summary + Key Concepts checklist (from scenario.evaluationHints) shown after self-eval
- Model answer toggle appears after self-evaluation is complete (or directly in fallback mode)
- Category descriptions shown under the selector buttons
- Error display if the API call fails
- `.env` is gitignored; API key is not in the repo
- Vercel serverless proxy deployed and live at https://pm-interview-prep-tool.vercel.app/ (`NVIDIA_API_KEY` env var set in Vercel dashboard)

### What's pending
- Improving feedback quality based on real PM feedback from LinkedIn/Reddit outreach
- Optional polish (scenario difficulty levels, share-by-URL, timer mode) -- deferred to future phases

### GitHub Repo
https://github.com/Vishal-Vijayakumar/PM-tool

### API Proxy Architecture
- **Development:** `vite.config.js` proxies `/api/nvidia/*` to `https://integrate.api.nvidia.com/v1/*`. API key comes from `.env` (`VITE_NVIDIA_API_KEY`).
- **Production (Vercel):** `api/feedback.js` serverless function proxies requests. API key comes from Vercel environment variable `NVIDIA_API_KEY` (set in dashboard, not committed).
- `src/utils/api.js` detects environment via `import.meta.env.DEV` and routes to the correct endpoint.

## Coding Rules
- Single file components where possible. No over-engineering.
- All scenarios are hardcoded in `src/data/scenarios.js` as a JS array. No database.
- The AI evaluation system prompt lives in `src/prompts/evaluator.js`. This is the most important file — it controls feedback quality.
- Use fetch for API calls, not axios. Keep dependencies minimal.
- Tailwind for all styling. No separate CSS files.
- No localStorage, no sessionStorage. Everything resets on refresh. That's fine.
- Keep the UI minimal. No animations, no transitions, no loading spinners beyond basic text.
- Error handling: if the API call fails, show a simple error message. Don't over-engineer retry logic.
- Never install new npm packages without asking first.
- Never modify `.env` or `.gitignore` without asking first.
- If something breaks, explain what went wrong before fixing it.
- Keep all components in single files, no splitting into sub-components unless necessary.
- Console.log statements are fine during development, remove before deploy.

## Writing & Content Rules
- No em dashes anywhere in the app or AI output.
- No exclamation marks in AI feedback. Keep the tone professional, not cheerful.
- AI feedback must be direct and specific, never generic encouragement like "great job" or "keep it up".
- All scenario text must be written in second person ("You are the PM for...").
- Scenarios must reference real companies and real products, not fictional ones.

## Do NOT
- Do not add authentication or user accounts
- Do not add a backend or database
- Do not add analytics or tracking
- Do not install unnecessary packages
- Do not create separate CSS files
- Do not add routing — this is a single page app
- Do not over-style. Function over form.
- Do not expose the API key in committed code. It must stay in .env and .env must be in .gitignore.

## Project Context
- This tool is a networking asset, not a commercial product.
- The target user is a PM who receives this link during LinkedIn outreach.
- First impression matters: the tool should load fast and be immediately obvious how to use.
- The AI feedback quality is more important than the UI design.
- When in doubt, keep it simple.

## Current Phase
Phase 3 shipped: Minecraft UI, model answers with evaluation hints, 5-dimension score display, self-evaluation gate with score comparison and key concepts checklist, beta label, deployed to Vercel and live. Currently in feedback-gathering mode via LinkedIn/Reddit outreach.

## Future Phases (not now)
- Phase 4: Improve feedback quality based on PM feedback from outreach
- Phase 5: Add scenario difficulty levels
- Phase 5: Community submitted scenarios

## Future Features (do not build yet)
- Ability to share a specific scenario + answer via URL
- Timer mode for interview simulation
- History of past attempts stored in localStorage (only after deploy)
