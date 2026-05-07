# PM Prep Tool -- Changelog

## 5-Dimension Score Display + Beta Label -- 2026-05-07
- Evaluator prompts now output per-dimension scores in a structured DIMENSION_SCORES block
- Frontend parses dimension scores and renders them as Minecraft-themed stat bars (color-coded green/amber/red)
- Overall score displayed below dimension breakdown; graceful fallback to single score if parsing fails
- Added "BETA" badge next to main title (green Minecraft block style)
- Fulfills the "5-Dimension Scoring" value prop chip promise -- users now see all 5 dimension scores

## Value Prop Chips -- 2026-05-06
- Added three stone-panel chips below subtitle: "15 Real Scenarios", "5-Dimension Scoring", "Expert Model Answers"
- Communicates tool depth above the fold so first-time visitors know this is not a ChatGPT wrapper

## UI Fix -- 2026-05-06
- Styled "New scenario" link as a Minecraft dirt block button (brown background, white text, blocky shadow, no rounding)

## Scoring Fix -- 2026-05-06
- Added minimum effort check to all 3 evaluator prompts (gibberish gets 0/10, one-word answers get 1/10, generic answers get 2-3/10)
- Replaced scoring guidance with explicit calibration scale (0-1 gibberish through 9-10 exceptional/rare)
- Prevents inflated scores on low-effort or off-topic answers

## Phase 3 -- 2026-05-06
- Minecraft-inspired UI (warm parchment tones, blocky panels, Press Start 2P pixel font for title, green accent)
- All 15 scenarios enriched with expert model answers and scenario-specific evaluation hints
- Evaluation hints appended to AI system prompt for more targeted, scenario-aware feedback
- "See a strong answer" collapsible section after feedback, showing curated expert answer
- Structured feedback display with parsed sections (score with color scaling, strengths/gaps/example/tip with colored left borders)
- Vercel serverless proxy (api/feedback.js) with CORS headers for production deployment
- Environment-aware API routing (Vite proxy in dev, serverless function in prod)
- Footer with LinkedIn link
- Press Start 2P Google Font loaded via index.html
- README rewritten with project description, features, categories, and tech stack

## Phase 2 -- 2026-05-06
- Added Prioritization category with 5 scenarios (Notion, Uber Eats, Figma, Duolingo, Stripe)
- Added Tradeoff Analysis category with 5 scenarios (Spotify, LinkedIn, Airbnb, Slack, Reddit)
- Category-specific evaluator prompts (separate rubrics for Metrics, Prioritization, Tradeoff)
- Enabled all 3 category buttons with one-liner descriptions
- Total scenarios: 15 across 3 categories

## Phase 1 -- 2026-05-02
- Initial MVP with Metrics Definition category (5 scenarios)
- Nvidia NIM API integration (Llama 3.3 70B)
- Vite dev proxy for CORS resolution
- Single-page app with scenario selector, textarea, and AI feedback display
- Pushed to GitHub
