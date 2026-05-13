# PM Prep Tool -- Changelog

## Parser Resilience + Calibration Strip -- 2026-05-13
- Fixed dimension score parser that was failing when the LLM omitted the END_SCORES closing marker. The DIMENSION_SCORES block was rendering as raw text and the self-eval gate was being skipped.
- The regex now terminates on END_SCORES (if present), the first feedback section header (STRENGTHS, GAPS, etc.), or a double blank line, whichever comes first.
- Added recognition for the SCORING CALIBRATION section header so it no longer leaks into the Interviewer Tip content. It is now silently dropped from rendered output.
- Backward compatible: responses that still include END_SCORES continue to parse correctly.

## Remove Personal Info From Footer -- 2026-05-13
- Removed the "Built by Vishal Vijayakumar" text and LinkedIn link from the footer; replaced with a minimal divider line. The tool is shared via Reddit and LinkedIn outreach, and identifying info in the app itself was unnecessary.

## Feedback Flow Reorder + Key Concepts Checklist -- 2026-05-13
- Restructured feedback flow so self-evaluation happens BEFORE the AI scores are revealed (prevents users from anchoring to the AI rating)
- New order after submission: qualitative feedback (Strengths, Gaps, Interviewer Tip) -> self-evaluation -> reveal of dimension scores + comparison + Overall -> key concepts checklist -> model answer toggle
- Added "Concepts to consider for this scenario" panel that renders scenario.evaluationHints as a checklist with diamond-blue left border, shown alongside the score comparison
- Hid the AI-generated STRONG ANSWER EXAMPLE section entirely; the curated modelAnswer behind the gate now serves that role
- Hid the SCORE: header line when dimension scores are present (was duplicating the Overall row)
- Fallback path (gibberish/low-effort): self-eval gate is still skipped and the model answer toggle appears directly

## Self-Evaluation Gate -- 2026-05-13
- Model answer is now gated behind a self-evaluation step: users must rate themselves on each dimension before the expert answer unlocks
- Self-eval uses Minecraft-styled score blocks (1-10) for each of the 5 dimensions
- After submitting self-ratings, a comparison view shows "You vs AI" for each dimension with color-coded gap (green within 1, amber 2-3, red 4+)
- Self-awareness summary line: "X/5 dimensions within 1 point of the AI rating"
- Graceful fallback: if dimension parsing fails (low-effort/gibberish responses), self-eval gate is skipped and model answer toggle shows directly
- All state resets on new scenario, category change, or new submission

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
