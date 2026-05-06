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
  src/
    components/       # React components
    data/
      scenarios.js    # Hardcoded scenario bank
    prompts/
      evaluator.js    # System prompt for AI feedback
    utils/
      api.js          # Nvidia NIM API call logic
    App.jsx
    main.jsx
  .env                # VITE_NVIDIA_API_KEY=nvapi-xxx
  .gitignore
  CLAUDE.md
```

## Categories
1. **Metrics Definition** — Given a product scenario, define success metrics
2. **Prioritization** — Given competing features/initiatives, prioritize and justify
3. **Tradeoff Analysis** — Given a product decision with tradeoffs, analyze and recommend

## Current Status
**Phase 2 is complete. All 3 categories are live.**

### What's been built
- Vite + React + Tailwind CSS project scaffolded and configured
- 15 scenarios across 3 categories in `src/data/scenarios.js`:
  - Metrics Definition (5): Instagram, Slack, DoorDash, Spotify, Google Maps
  - Prioritization (5): Notion, Uber Eats, Figma, Duolingo, Stripe
  - Tradeoff Analysis (5): Spotify, LinkedIn, Airbnb, Slack, Reddit
- Category-specific AI evaluation prompts in `src/prompts/evaluator.js` (one rubric per category)
- Nvidia NIM API integration in `src/utils/api.js` using fetch, accepts category to select the right evaluator prompt
- Full single-page UI in `src/App.jsx`: category selector with descriptions, scenario card, textarea, submit button, feedback display
- Vite dev proxy configured in `vite.config.js` to route `/api/nvidia` to `https://integrate.api.nvidia.com/v1` — this resolves CORS in development
- Git repo initialized, committed, and pushed to GitHub

### What's working
- All 3 categories active with category-specific evaluation rubrics
- Selecting a scenario and getting AI feedback end-to-end
- "New scenario" button cycles through scenarios in the active category
- Category descriptions shown under the selector buttons
- Error display if the API call fails
- `.env` is gitignored; API key is not in the repo

### What's pending
- **Vercel deployment** — the Vite proxy only works in dev. Production needs a serverless function (Vercel API route) to proxy the Nvidia NIM request server-side so the API key stays secret and CORS is resolved
- Improving feedback quality based on real PM feedback

### GitHub Repo
https://github.com/Vishal-Vijayakumar/PM-tool

### CORS Proxy Note
In development, `vite.config.js` proxies `/api/nvidia/*` to `https://integrate.api.nvidia.com/v1/*`. In production on Vercel, this proxy does not exist. A serverless function at `api/nvidia.js` (or similar) must be created to forward requests and inject the API key from a Vercel environment variable. Do not deploy without this — the API key would either be exposed or requests would fail.

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
Phase 2: All 3 categories live — 15 scenarios, category-specific evaluator prompts.

## Future Phases (not now)
- Phase 3: Improve feedback quality based on PM feedback from outreach
- Phase 4: Add scenario difficulty levels
- Phase 5: Community submitted scenarios

## Future Features (do not build yet)
- Ability to share a specific scenario + answer via URL
- Timer mode for interview simulation
- History of past attempts stored in localStorage (only after deploy)
