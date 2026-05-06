// PM Prep Tool - Scenario Bank
// 15 scenarios across 3 categories, each with model answers and evaluation hints

export const scenarios = [
  // === Metrics Definition (5) ===
  {
    id: 1,
    category: "metrics",
    title: "Instagram Reels Engagement Drop",
    scenario:
      "You are the PM for Instagram Reels. Over the past 3 weeks, daily active users are up 15% but average watch time per session has dropped from 12 minutes to 8 minutes. Your VP asks you to define the success metrics you would track to diagnose this problem and measure whether your fix is working. What metrics do you define and why?",
    modelAnswer: `North Star Metric: Weekly active Reels creators who publish 2+ Reels. This captures both creation and habit formation, which drives the supply side of the content ecosystem.

Leading Indicators: Reels completion rate (% of viewers who watch >75% of a Reel), creator-to-viewer ratio by cohort, average time from app open to first Reel view (content discovery speed), share rate per Reel (organic distribution signal).

Lagging Indicators: 30-day creator retention (are new creators still posting after a month?), Reels contribution to overall DAU (is Reels pulling people into the app or just redistributing existing usage?), revenue per Reels ad impression vs Feed ad impression.

Guardrail Metrics: Feed engagement (make sure Reels growth is not cannibalizing Feed), average session quality score (make sure we are not creating addictive scroll patterns that hurt user sentiment), creator burnout rate (creators who posted 5+ times then stopped entirely).

Decision Criteria: If Reels completion rate drops below 40% for two consecutive weeks, investigate content quality. If creator retention at 30 days falls below 15%, the creation tools need improvement. If Feed engagement drops more than 10% while Reels grows, we are cannibalizing rather than expanding.`,
    evaluationHints: [
      "Must identify a North Star metric, not just a list of KPIs",
      "Should distinguish between creator-side and viewer-side metrics",
      "Must include at least one guardrail metric to prevent negative side effects",
      "Should address the cannibalization risk (Reels vs Feed)",
      "Decision criteria should tie specific metric thresholds to specific product actions"
    ]
  },
  {
    id: 2,
    category: "metrics",
    title: "Slack Huddles Adoption",
    scenario:
      "You are the PM for Slack Huddles (the audio/video call feature inside Slack). The feature launched 6 months ago. Leadership wants to know if Huddles is successful. Define the metrics framework you would use to evaluate whether Huddles is meeting its goals. Consider both leading and lagging indicators.",
    modelAnswer: `North Star Metric: Weekly teams with 3+ completed huddles. This captures recurring team-level adoption, not just individual trial.

Leading Indicators: Huddle initiation rate (how often users start a huddle vs send a message when they need to discuss something), time-to-first-huddle for new Slack workspaces, huddle join rate (% of invited participants who actually join within 2 minutes), average huddle duration (signals whether people find them useful or drop quickly).

Lagging Indicators: Reduction in scheduled meetings per team (are huddles replacing unnecessary calendar meetings?), workspace-level Slack retention correlated with huddle usage, paid plan conversion rate for free workspaces that use huddles heavily.

Guardrail Metrics: Message volume (make sure huddles are not replacing async communication that should stay written), meeting fatigue signals (if huddle frequency exceeds 8+ per day per user, we may be creating a new interruption problem), audio quality complaint rate.

Decision Criteria: If huddle join rate is below 50%, the notification and invitation flow needs work. If average duration is under 90 seconds, users are trying huddles but not finding them useful for real discussions. If teams with high huddle usage show lower retention than teams without, the feature may be hurting more than helping.`,
    evaluationHints: [
      "Must frame metrics at team level, not just individual level since Huddles are collaborative",
      "Should address whether Huddles replace meetings (positive) or replace async messages (potentially negative)",
      "Must include audio/technical quality as a factor since it is a real-time communication tool",
      "Should recognize the free-to-paid conversion angle for Slack's business model",
      "Decision criteria should include a signal for when Huddles are being overused"
    ]
  },
  {
    id: 3,
    category: "metrics",
    title: "DoorDash New Market Launch",
    scenario:
      "DoorDash is launching in a mid-size city (population 250K) where they have zero presence. You are the PM responsible for this market launch. Define the metrics you would track during the first 90 days to determine whether the launch is on track. How would you know if you need to change strategy?",
    modelAnswer: `North Star Metric: DashPass subscriber order frequency relative to non-subscribers. The subscription only works if it changes behavior, meaning subscribers order meaningfully more often, not just the same amount with lower fees.

Leading Indicators: Trial-to-paid conversion rate at day 7 and day 14, first-week order count for new subscribers (early ordering pattern predicts long-term retention), DashPass upsell impression-to-conversion rate, average order value change post-subscription (do subscribers order more or less per order?).

Lagging Indicators: 90-day subscriber retention rate, subscriber lifetime value vs acquisition cost, DashPass contribution margin per subscriber (revenue from subscription fee + incremental orders minus delivery cost subsidy), churn reason distribution (price, frequency, competitor switch).

Guardrail Metrics: Non-subscriber order frequency (make sure DashPass is not just shifting existing customers to a lower-margin channel), restaurant partner satisfaction scores (make sure higher order volume from DashPass is not overwhelming restaurant capacity), driver earnings per delivery for DashPass orders vs standard (make sure driver economics remain sustainable).

Decision Criteria: If trial-to-paid conversion is below 30%, the trial experience is not demonstrating enough value. If subscriber order frequency is less than 1.5x non-subscriber frequency, the subscription is not driving incremental behavior. If restaurant partner satisfaction drops below 4.0 during high DashPass volume periods, we need to add capacity controls.`,
    evaluationHints: [
      "Must address the marketplace dynamics (three sides: customers, restaurants, drivers)",
      "Should distinguish between subscribers who would have ordered anyway vs truly incremental behavior",
      "Must include unit economics and contribution margin, not just top-line growth metrics",
      "Should recognize trial-to-paid conversion as the critical leading indicator",
      "Decision criteria should address marketplace health, not just subscriber growth"
    ]
  },
  {
    id: 4,
    category: "metrics",
    title: "Spotify Podcast Monetization",
    scenario:
      "Spotify is rolling out a new feature that lets podcast creators sell premium episodes directly to listeners. You are the PM for this feature. Define the success metrics for the first 6 months post-launch. Consider all sides of the marketplace: creators, listeners, and Spotify as a platform.",
    modelAnswer: `North Star Metric: Monthly listeners who consume podcasts on 3+ distinct days. This measures habitual podcast listening, not just trial. Frequency of distinct days matters more than total hours because it indicates Spotify becoming the default podcast app.

Leading Indicators: First-podcast-listen rate for music-only users (content discovery effectiveness), podcast episode completion rate by genre, playlist-to-podcast crossover rate (users who discover podcasts through algorithmic recommendations), creator publishing consistency (supply health).

Lagging Indicators: Podcast share of total listening time (is the ratio growing?), exclusive podcast listener retention vs music-only retention (do podcast listeners churn less?), ad revenue per podcast listener vs music revenue per listener, competitive platform migration rate (are users leaving Apple Podcasts/YouTube for Spotify podcasts?).

Guardrail Metrics: Music listening time per user (make sure podcast growth is additive, not substitutional), audio ad load perception (survey-based, make sure podcast ads do not degrade the overall Spotify experience), creator satisfaction with Spotify's podcast tools and monetization.

Decision Criteria: If podcast discovery rate for music-only users is below 5%, the recommendation algorithm needs better cross-format suggestions. If completion rate for episodes over 30 minutes drops below 25%, consider investing in short-form podcast formats. If podcast listeners show 20%+ better retention than music-only, double down on investment.`,
    evaluationHints: [
      "Must address the platform strategy angle: podcasts as a retention and differentiation tool, not just a content type",
      "Should distinguish between music-only users discovering podcasts vs existing podcast listeners migrating to Spotify",
      "Must include creator/supply-side metrics since podcasts require a healthy creator ecosystem",
      "Should address the advertising revenue model since podcasts monetize differently than music",
      "Decision criteria should cover both the demand side (listeners) and supply side (creators)"
    ]
  },
  {
    id: 5,
    category: "metrics",
    title: "Google Maps EV Charging",
    scenario:
      "Google Maps has added a feature showing real-time EV charging station availability. You are the PM. The feature has been live for 2 months. Define the metrics you would use to evaluate whether this feature is delivering value to users and worth continued investment. What would make you decide to expand vs. deprioritize this feature?",
    modelAnswer: `North Star Metric: Weekly EV drivers who use Google Maps to navigate to a charging station and successfully charge. This captures the full value loop: discovery, navigation, and real-world outcome.

Leading Indicators: EV charging search volume trend (demand signal), click-through rate from charging station listing to navigation, real-time availability accuracy score (% of times the station was actually available when shown as available), average detour distance users accept to reach a charger (willingness to trust the feature).

Lagging Indicators: Repeat usage rate (EV drivers who use the feature 3+ times per month), Google Maps market share among EV drivers vs competitors (PlugShare, ChargePoint app), integration partnership growth (number of charging networks providing real-time data to Google), user satisfaction with charging station information accuracy.

Guardrail Metrics: Non-EV user experience (make sure EV charging UI elements do not clutter the experience for the 95% of users who do not need them), map load time with charging overlay enabled, false availability rate (users who navigate to a station shown as available but find it occupied or broken).

Decision Criteria: If false availability rate exceeds 15%, the real-time data pipeline needs investment before expanding the feature. If repeat usage is below 20% of first-time users, the information quality is not reliable enough. If EV driver share of Google Maps usage grows 10%+ quarter over quarter, prioritize expanding charging network partnerships.`,
    evaluationHints: [
      "Must address data accuracy as a core metric since the feature depends on real-time third-party data",
      "Should recognize this as a niche feature within a massive product and address how to measure without disrupting the main experience",
      "Must include the partnership/supply side (charging network data integrations)",
      "Should frame success in terms of Google Maps becoming the default EV planning tool, not just a feature",
      "Decision criteria should have a clear 'do not expand until X' threshold around data quality"
    ]
  },

  // === Prioritization (5) ===
  {
    id: 6,
    category: "prioritization",
    title: "Notion AI Feature Roadmap",
    scenario: `You are the PM for Notion's AI features. Your team has capacity for only 2 of the following 4 initiatives this quarter:

A) AI-powered meeting notes summarization that auto-generates action items from integrated calendar recordings
B) Smart database autofill that predicts and populates fields based on patterns in existing data
C) AI writing assistant improvements -- tone adjustment, length control, and multilingual translation
D) Natural language database queries -- let users ask questions like "show me all tasks assigned to Sarah that are overdue" instead of building filters manually

Your engineering team is 6 people. Initiatives A and D each require 4 engineers for the full quarter. B and C each require 3. You cannot split engineers across more than 2 initiatives. Notion's current strategic priority is expanding enterprise adoption.

Which 2 do you pick, and why? What are you explicitly deprioritizing and what is the risk of doing so?`,
    modelAnswer: `I would pick B (Smart database autofill) and D (Natural language database queries).

Reasoning: Notion's strategic priority is enterprise expansion. Enterprises live in databases. They have hundreds of project trackers, CRMs, and wikis built in Notion databases. Both B and D directly reduce friction in the core enterprise workflow.

D (natural language queries) is the higher-impact bet. Enterprise users managing complex databases spend significant time building filters and views. Letting them query in natural language removes a major skill barrier and makes Notion accessible to non-power-users on a team. This directly supports seat expansion within enterprise accounts.

B (smart autofill) compounds D's value. If the database is easier to query AND easier to populate, the entire database experience levels up. These two features together create a coherent "AI-powered databases" narrative for enterprise sales.

What I am cutting: A (meeting notes) competes in a crowded space (Otter, Fireflies, Granola) and requires calendar integrations that add scope. C (writing assistant improvements) is incremental, not a new capability. Both are valuable but neither moves the enterprise needle as directly.

Resource allocation: D gets 4 engineers (high complexity, high ceiling). B gets 3 engineers (the 6th engineer from D is not needed if we scope D tightly to the query interface without rebuilding the filter backend).

Risk of deprioritization: Cutting A means competitors with meeting AI features may win users who want an all-in-one workspace. I would monitor competitor adoption of meeting AI features quarterly and reassess if meeting notes become a top-3 enterprise request.`,
    evaluationHints: [
      "Must make a clear, unambiguous choice of exactly 2 initiatives",
      "Must connect choices back to the stated strategic priority (enterprise adoption)",
      "Should address resource constraints explicitly (6 engineers, can't split across more than 2)",
      "Must acknowledge what is being cut AND the risk of cutting it",
      "Should explain why the two chosen initiatives work together, not just why each is good individually"
    ]
  },
  {
    id: 7,
    category: "prioritization",
    title: "Uber Eats Engagement",
    scenario: `You are a PM at Uber Eats. Monthly active users have plateaued for 2 consecutive quarters. Your VP wants a plan to reignite growth. You have budget and engineering capacity to pursue 2 of these 4 initiatives:

A) Grocery delivery expansion -- partner with 3 major grocery chains in your top 10 markets
B) Social features -- let users share orders, create group carts, and see what friends are ordering
C) Subscription tier upgrade -- add a premium tier above Uber One with perks like priority delivery, exclusive restaurant access, and no surge pricing
D) 15-minute delivery for convenience items -- build a network of dark stores in 5 pilot cities

Each initiative has a different time-to-impact: A is 6 months to meaningful data, B is 3 months, C is 2 months, D is 9 months. Your annual planning cycle resets in 8 months.

Prioritize 2 and justify. Explain what framework you used, what assumptions you made, and what would change your mind.`,
    modelAnswer: `I would pick C (Subscription tier upgrade) and B (Social features).

Reasoning: MAU has plateaued, meaning we have an engagement and retention problem, not an acquisition problem. Both C and B target existing users rather than new markets.

C (premium tier) ships in 2 months, well within the 8-month planning cycle. It directly monetizes the most engaged users and creates switching costs. If even 5% of Uber One subscribers upgrade, the revenue impact is measurable within one quarter. Low-risk, fast signal.

B (social features) ships in 3 months and targets the virality gap. Seeing what friends order creates organic discovery (reduces decision fatigue, the #1 reason users browse and leave without ordering) and group carts increase average order value. Social features also create network effects that make it harder to switch to DoorDash.

What I am cutting: A (grocery) is a 6-month bet in a space where Instacart has deep advantages, and our core platform is not optimized for grocery logistics. D (15-minute delivery) requires 9 months and massive capex for dark stores, putting results outside the planning cycle. Both are strategic but wrong for a "reignite growth now" mandate.

Framework: I weighted time-to-impact heavily because the VP wants a plan, not a 2-year strategy. C and B together give us data within 5 months, leaving 3 months to adjust before the planning cycle resets.

What would change my mind: If data showed that MAU plateau is driven by market saturation (not engagement), then A (grocery expansion) becomes the right play because we need new use cases, not deeper engagement with existing ones.`,
    evaluationHints: [
      "Must explicitly address the time-to-impact constraint (8-month planning cycle)",
      "Should distinguish between acquisition problem vs engagement/retention problem",
      "Must connect choices to the specific problem stated (MAU plateau)",
      "Should name a framework or structured reasoning approach, even if informal",
      "Must include a 'what would change my mind' condition showing intellectual flexibility"
    ]
  },
  {
    id: 8,
    category: "prioritization",
    title: "Figma Collaboration Backlog",
    scenario: `You are a PM on Figma's collaboration team. After interviewing 30 enterprise design teams, you have identified these 4 high-demand features:

A) Real-time commenting on prototypes during user testing sessions (requested by 73% of interviewees)
B) Role-based access controls with approval workflows for design systems (requested by 60%, but exclusively by teams with 50+ designers)
C) Offline mode with conflict resolution for syncing changes (requested by 45%, strongest demand from teams with remote/traveling members)
D) Built-in design review workflows with version comparison and sign-off tracking (requested by 55%)

Constraints: Your team is 4 engineers and 1 designer. You can realistically ship 1 feature fully and get a second to beta by end of quarter. Figma's board has stated that enterprise revenue must grow 40% this fiscal year. Your largest enterprise prospect ($2M ARR deal) has told sales that role-based access controls are a blocker for signing.

How do you prioritize? When raw user demand conflicts with a single high-value deal, how do you decide?`,
    modelAnswer: `Ship B (Role-based access controls) fully. Get D (Design review workflows) to beta.

The $2M ARR deal decides this. In normal circumstances, building for one customer is a red flag. But this is not one customer wanting a custom feature. 60% of enterprise interviewees also requested RBAC, it just happens that one prospect made it a contract blocker. The feature has broad demand AND a specific revenue trigger.

B also unlocks future enterprise deals. Every company with 50+ designers (Figma's growth tier) needs access controls. Shipping this removes a category of objection from enterprise sales conversations permanently.

D (design review) gets the beta slot because it complements B. Once teams have role-based controls, they need workflows to actually use those roles (reviewer, approver, editor). D makes B more valuable, and getting it to beta means we can validate with the $2M prospect during their onboarding.

What I am cutting: A (prototype commenting) has the highest raw demand at 73%, but it serves individual designers more than enterprise buyers. It does not move the 40% revenue growth target. C (offline mode) serves a real but narrow use case and the conflict resolution engineering is disproportionately complex for a 4-person team.

How I handle the tension: Raw user demand (73% for A) vs revenue concentration ($2M for B) is a false choice here because B also has 60% demand. If B had 10% demand and only mattered for one deal, I would push back. But the data supports both the revenue case and the demand case.`,
    evaluationHints: [
      "Must directly address the tension between raw user demand (73% for A) and the $2M deal (for B)",
      "Should explain why building for one large customer is justified in this specific case",
      "Must work within the stated team constraints (4 engineers, 1 designer, 1 full + 1 beta)",
      "Should connect the choice to the board-level revenue target (40% enterprise growth)",
      "Must explain why the two chosen features are complementary, not just individually strong"
    ]
  },
  {
    id: 9,
    category: "prioritization",
    title: "Duolingo Retention Strategy",
    scenario: `You are a PM at Duolingo responsible for learner retention. Data shows that 40% of users drop off between days 7 and 14. You need to pick 2 of these 4 experiments to run this quarter:

A) Adaptive difficulty engine -- dynamically adjust lesson difficulty based on real-time performance signals instead of the current fixed progression
B) Social accountability features -- let users form study groups, set shared goals, and see a group leaderboard
C) Streak recovery improvements -- allow users to "freeze" streaks proactively (not just retroactively), add a 24-hour grace window, and reduce the psychological penalty of breaking a streak
D) Content variety push -- add short-form video lessons, podcast-style listening exercises, and cultural context modules to break up the repetitive drill format

Your data science team has estimated impact ranges:
- A: +3-8% retention lift, high eng complexity
- B: +2-5% retention lift, medium eng complexity
- C: +4-6% retention lift, low eng complexity
- D: +1-4% retention lift, high content production cost

Which 2 do you run? Walk through your reasoning, including how you weigh estimated impact against certainty, complexity, and reversibility.`,
    modelAnswer: `Run C (Streak recovery improvements) and A (Adaptive difficulty engine).

C goes first because it is the highest-certainty, lowest-complexity bet. The impact range (4-6% retention lift) has a tight band, meaning the data science team is confident in the estimate. Low engineering complexity means it ships fast. And it targets the exact problem: the day 7-14 drop-off is when users first face streak pressure. A broken streak at day 10 feels devastating. Reducing that psychological penalty directly addresses the retention cliff.

A is the higher-ceiling play. The 3-8% range is wide, reflecting uncertainty, but the upside is massive. Adaptive difficulty addresses a root cause: users who find lessons too easy get bored, users who find them too hard get frustrated. Both leave between days 7-14. This is the only option that fixes the underlying experience rather than adding a wrapper around it.

What I am cutting: B (social accountability) has a 2-5% range and medium complexity. Social features require a critical mass of friends on the platform to work, which we cannot guarantee for most users. D (content variety) has the lowest estimated impact (1-4%) and high production cost with ongoing content creation obligations.

How I weigh the tradeoffs: I prioritize certainty and speed for one slot (C) and ceiling for the other (A). C gives us a measurable win within weeks. A gives us a structural improvement within the quarter. Together they address both the symptom (streak anxiety) and the cause (lesson-experience mismatch).

Reversibility check: C is fully reversible (we can remove grace windows if they reduce streak motivation). A is partially reversible (we can roll back the algorithm but the engineering investment is sunk). Both are acceptable risks.`,
    evaluationHints: [
      "Must use the provided impact estimates and complexity data in their reasoning, not ignore them",
      "Should weigh certainty vs ceiling explicitly (tight confidence interval vs wide range)",
      "Must connect choices to the specific retention window (days 7-14)",
      "Should address reversibility since these are experiments, not permanent features",
      "Must explain why the two chosen experiments complement each other rather than overlap"
    ]
  },
  {
    id: 10,
    category: "prioritization",
    title: "Stripe Developer Platform",
    scenario: `You are a PM on Stripe's developer platform team. The following requests have come from different stakeholders:

FROM SALES: "Our top 3 enterprise prospects need SOC 2 compliance dashboards and audit logging. Combined deal value: $4.5M ARR." (Estimated effort: 1 quarter, 3 engineers)

FROM DEVELOPER RELATIONS: "Our integration docs have a 2.3/5 satisfaction rating. Developers are churning to competitors because onboarding is too hard. We need interactive API explorers and better quickstart guides." (Estimated effort: 1 quarter, 2 engineers + 1 technical writer)

FROM ENGINEERING: "Our webhook delivery system has 99.1% reliability. Industry standard is 99.9%. Every failure means a merchant misses a payment event. This is a ticking time bomb." (Estimated effort: 1 quarter, 4 engineers)

FROM PRODUCT ANALYTICS: "Usage data shows 60% of developers only use 2 of our 15 products. Cross-product discovery and bundled pricing could significantly increase revenue per customer." (Estimated effort: 2 quarters, 3 engineers + 1 designer)

You have 5 engineers, 1 designer, and 1 technical writer available this quarter. You cannot do everything. Prioritize and explain your reasoning. How do you handle the tension between revenue, reliability, and developer experience?`,
    modelAnswer: `Priority 1: Engineering's webhook reliability (4 engineers). Priority 2: Developer Relations' documentation (2 engineers + 1 technical writer). That uses all 5 engineers, 0 of 1 designer, and the technical writer.

Webhook reliability is non-negotiable. 99.1% sounds high until you realize that at Stripe's scale, 0.9% failure rate means thousands of merchants missing payment events daily. Every missed webhook is a failed payment notification, a broken integration, a support ticket, and erosion of the trust that Stripe's entire brand is built on. This is not a feature request. It is infrastructure debt that compounds. The engineering team flagged it as a ticking time bomb and they are right.

Developer documentation is my second pick because it addresses the top of the funnel. A 2.3/5 satisfaction rating on integration docs means developers are churning before they even become paying customers. You cannot upsell products to developers who gave up during onboarding. This also requires the technical writer who would be idle otherwise.

What I am cutting: Sales' compliance dashboards ($4.5M ARR) is painful to deprioritize. I would have a direct conversation with sales: "We are fixing the infrastructure that those enterprise customers will depend on. Shipping compliance dashboards on unreliable webhooks creates a worse problem." I would commit to compliance dashboards as Q2 priority and ask sales to negotiate a timeline with the prospects.

Product Analytics' cross-product discovery is a 2-quarter initiative that does not fit this quarter's capacity regardless. I would slot it for planning next cycle.

The designer is unallocated this quarter. I would have them start research and prototyping for the compliance dashboards so engineering can start immediately in Q2.`,
    evaluationHints: [
      "Must address the reliability issue as potentially existential, not just another feature request",
      "Should explain how to handle the sales team pushback on deprioritizing the $4.5M ARR opportunity",
      "Must account for all available resources (5 engineers, 1 designer, 1 technical writer)",
      "Should recognize that the cross-product initiative does not fit regardless of prioritization",
      "Must demonstrate stakeholder communication thinking, not just technical prioritization"
    ]
  },

  // === Tradeoff Analysis (5) ===
  {
    id: 11,
    category: "tradeoffs",
    title: "Spotify Podcast Monetization",
    scenario: `You are a PM at Spotify. The podcast team wants to introduce mid-roll ads into all free-tier podcast listening, similar to how music has ads between songs. The expected revenue impact is $80M annually.

However, your research team has flagged a concern: podcast listeners on Spotify currently experience fewer ads than on Apple Podcasts or YouTube. This "cleaner" experience is a key reason creators direct listeners to Spotify. Internal data shows that 22% of podcast-only users (who do not use Spotify for music) would likely churn within 6 months of mid-roll ad introduction.

You have three paths:

PATH A: Implement mid-roll ads for all free-tier podcast listeners. Maximize short-term revenue.
PATH B: Implement mid-roll ads only for podcasts longer than 30 minutes, exempting short-form content. Estimated revenue: $50M (vs $80M for full rollout).
PATH C: No mid-roll ads. Instead, introduce a "Podcast Plus" tier at $4.99/month for ad-free podcasts, exclusive early access to episodes, and downloadable transcripts.

Analyze the tradeoffs. Which path do you recommend and why? What second-order effects should leadership consider? What data would you want before making this decision final?`,
    modelAnswer: `I recommend Path B (mid-roll ads only for podcasts over 30 minutes) as a starting point, with a structured test of Path C (Podcast Plus tier) running in parallel.

Path B captures 63% of the revenue ($50M vs $80M) while protecting the short-form podcast experience that differentiates Spotify. Most podcast listeners accept that long-form content has ad breaks. The 30-minute threshold also aligns with listener expectations from traditional radio and other podcast platforms.

Why not Path A: The 22% projected churn among podcast-only users is catastrophic when you consider second-order effects. These users are Spotify's proof point to podcast creators that the platform drives listenership. Losing them weakens the creator acquisition pipeline, which reduces content supply, which reduces listener value. It is a flywheel in reverse.

Why not pure Path C: A $4.99 podcast tier is interesting but unproven. Podcast listeners have never paid for ad-free podcasts at scale (unlike music). Launching it as the only monetization strategy is high-risk.

The parallel play: Run Path B immediately for revenue. Simultaneously launch Path C as a test in 2-3 markets. If Podcast Plus shows a willingness-to-pay signal above 8% conversion, it becomes the long-term strategy and you can roll back mid-roll ads. If it underperforms, Path B is already generating revenue.

Data I would need: Current podcast-only user lifetime value (to quantify the true cost of 22% churn), competitive analysis of ad loads on Apple Podcasts and YouTube by episode length, and creator sentiment survey on ad insertion (some creators may resist ads in their content regardless of platform policy).`,
    evaluationHints: [
      "Must address the flywheel/second-order effect of losing podcast-only users on creator acquisition",
      "Should not just pick one path but explain the conditions under which they would switch",
      "Must engage with the specific numbers provided (22% churn, $80M vs $50M)",
      "Should recognize the difference between music subscription willingness-to-pay and podcast WTP",
      "Must identify what data is missing before making a final commitment"
    ]
  },
  {
    id: 12,
    category: "tradeoffs",
    title: "LinkedIn Algorithm Transparency",
    scenario: `You are a PM at LinkedIn responsible for the feed algorithm. A growing number of creators and recruiters are publicly complaining that LinkedIn's algorithm is opaque and unpredictable. Some high-profile creators have moved to posting on X/Twitter instead, citing more predictable reach.

Your team has proposed three levels of algorithm transparency:

OPTION A: Full transparency -- publish the ranking signals (recency, engagement velocity, network relevance, content type weights) and update the documentation quarterly. Let users see why a specific post appeared in their feed.
OPTION B: Partial transparency -- publish general principles ("we prioritize content from your network over viral content from strangers") but do not reveal specific weights or signals. Add a "Why am I seeing this?" button on each post.
OPTION C: No change to transparency, but invest in creator analytics -- give creators detailed breakdowns of their post performance (impressions by source, engagement by follower vs non-follower, optimal posting times).

The tension: Full transparency could lead to gaming and spam optimization. No transparency risks continued creator attrition. The feed algorithm is also LinkedIn's core competitive moat against other professional networks.

Which option do you recommend? What are the risks of each path? How do you measure whether your choice is working 6 months later?`,
    modelAnswer: `I recommend Option B (partial transparency) combined with the analytics investment from Option C.

Full transparency (Option A) sounds good in principle but creates a gaming problem that undermines the feed for everyone. If creators know that "engagement velocity in the first 30 minutes" is the top signal, every creator optimizes for engagement bait. We have seen this exact dynamic destroy content quality on every platform that over-exposed its algorithm (Facebook 2016-2018, YouTube clickbait era). LinkedIn's professional context makes this worse because gaming looks like thought-leader cringe posts.

Pure analytics (Option C) does not address the perception problem. Creators are not just frustrated by performance, they are frustrated by feeling powerless. Analytics tell you what happened. Transparency tells you why.

Option B with analytics gives creators both: general principles that help them understand the system ("we prioritize your network over viral content") plus detailed performance data that helps them improve. The "Why am I seeing this?" button gives regular users transparency without exposing exploitable signals.

How I measure success at 6 months: Creator posting frequency (are creators who were declining now posting more?), creator satisfaction survey score (target: move from current baseline by 15%+), feed engagement rate (make sure transparency does not reduce engagement), and ratio of original content to reshared content (a proxy for content quality).

The risk I am watching: Even partial transparency can be gamed. If we see a spike in formulaic content that matches our stated principles ("tag 5 people, ask a question, post at 8am"), we need to rotate the public guidance or add more nuance.`,
    evaluationHints: [
      "Must address the gaming/optimization risk of full transparency with specific examples",
      "Should reference historical precedent from other platforms (Facebook, YouTube, etc.)",
      "Must explain why the chosen option addresses both creator frustration AND user feed quality",
      "Should include specific 6-month measurement criteria, not vague 'we will monitor'",
      "Must acknowledge the risk that even partial transparency can be gamed"
    ]
  },
  {
    id: 13,
    category: "tradeoffs",
    title: "Airbnb Instant Book vs Host Control",
    scenario: `You are a PM at Airbnb. Data shows that listings with Instant Book enabled convert at 2.4x the rate of listings requiring host approval. Airbnb's strategic goal is to increase booking conversion by 15% this year.

The growth team wants to make Instant Book mandatory for all listings. Their argument: the approval step adds 6-18 hours of delay, during which 35% of guests abandon and book a hotel instead. Removing this friction directly increases revenue.

However, the host community team is pushing back hard. Their data shows:
- Hosts who manually review guests report 40% fewer problematic stays
- Superhosts (your highest-quality supply) are 3x more likely to use manual approval
- In a survey of 5,000 hosts, 28% said they would delist if forced into Instant Book
- Hosts in certain markets (luxury properties, shared spaces) have legitimate safety reasons for screening guests

You have three options:

OPTION A: Make Instant Book mandatory for all listings. Accept short-term host churn for long-term conversion gains.
OPTION B: Make Instant Book the default for new listings, but let existing hosts opt out. Quietly deprioritize non-Instant Book listings in search rankings.
OPTION C: Keep the current system but add "Quick Approve" -- hosts get a push notification and have a 2-hour window to approve or auto-approve kicks in.

Analyze the tradeoffs between guest conversion and host satisfaction. Which option do you recommend? What could go wrong with your choice, and how would you mitigate it?`,
    modelAnswer: `I recommend Option C (Quick Approve with 2-hour auto-approve window), with modifications.

The core tension is that guest conversion and host quality are not opposing forces on a long enough timeline. Superhosts who screen guests have fewer problems, which means better reviews, which means more bookings. Forcing Instant Book optimizes short-term conversion at the cost of long-term supply quality.

Why not Option A: Losing 28% of hosts who would delist is unacceptable. But more importantly, losing Superhosts (3x more likely to use manual approval) means losing your best supply. A 15% conversion gain means nothing if your best listings disappear and average review scores drop.

Why not Option B: Quietly deprioritizing non-Instant Book listings in search is deceptive. Hosts will figure it out (they always do), and the backlash will be worse than a transparent policy change. Trust with hosts is a long-term asset.

Option C modified: Set the auto-approve window at 2 hours but add a "Host Preferences" screen where hosts can set guest criteria (verified ID required, minimum reviews, no same-day bookings). If a guest meets all host criteria, auto-approve is instant. If they do not, the host gets the 2-hour window. This gives hosts control through criteria rather than manual review, reducing delay while respecting their concerns.

What could go wrong: Hosts may set overly restrictive criteria, recreating the conversion problem. I would monitor the criteria rejection rate. If more than 20% of booking attempts are blocked by host criteria, we need to nudge hosts toward more reasonable settings or add a maximum number of criteria.`,
    evaluationHints: [
      "Must address the Superhost retention risk specifically, not just overall host numbers",
      "Should explain why short-term conversion and long-term supply quality are connected",
      "Must engage with Option B's deception problem (quietly deprioritizing is a trust issue)",
      "Should propose a modification or hybrid rather than picking an option exactly as stated",
      "Must include a failure condition and mitigation plan for their recommendation"
    ]
  },
  {
    id: 14,
    category: "tradeoffs",
    title: "Slack AI Data Privacy",
    scenario: `You are a PM at Slack working on Slack AI (the built-in AI assistant that can summarize channels, answer questions about message history, and draft responses). Enterprise customers love the feature, but you have hit a critical decision point.

Currently, Slack AI processes data within each customer's own workspace boundaries. No cross-customer data is used for training or inference. This is a key selling point for regulated industries (healthcare, finance, government).

Your ML team has proposed using anonymized, aggregated cross-customer data to improve the AI models. Their projections:
- Answer quality improves by 35% (measured by user satisfaction scores)
- Summarization accuracy improves by 28%
- The model learns general workplace communication patterns that make it dramatically better at understanding context, jargon, and intent

The tradeoff:
- 3 of your top 10 enterprise accounts (combined ARR: $12M) have contracts that explicitly prohibit cross-customer data usage. Changing the approach would require contract renegotiation.
- Your security team rates the risk of a data incident at "low but non-zero" and notes that even the perception of cross-customer data mixing could damage trust
- Competitors (Microsoft Teams Copilot, Google Workspace AI) are already using cross-tenant data and shipping faster improvements

Do you use cross-customer data to improve the models, keep the current isolated approach, or find a middle path? What are the second-order consequences of each choice? How do you frame this decision to your VP?`,
    modelAnswer: `Keep the isolated approach for now. Do not use cross-customer data.

This is a one-way door decision disguised as a product improvement. The 35% quality improvement is real, but the trust risk is asymmetric. If we use cross-customer data and nothing goes wrong, we get better AI. If anything goes wrong (a data incident, a regulatory investigation, or even a competitor marketing campaign that says "Slack reads your messages across companies"), the damage to enterprise trust is existential. Slack's entire enterprise value proposition is "your workspace, your data."

The $12M ARR at risk from contract renegotiation is the floor, not the ceiling. Every enterprise buyer's security team reviews data handling practices. If word gets out that Slack changed its data isolation model, it affects pipeline far beyond those 3 accounts.

What I would do instead: Invest in improving the models within the isolated architecture. Techniques like federated learning, synthetic data generation, and transfer learning from public datasets can close much of the quality gap without crossing the data isolation boundary. The 35% improvement is the ceiling with cross-customer data. The question is how close we can get without it.

How I frame this to my VP: "Our competitors are using cross-tenant data and shipping faster. But they are also one incident away from an enterprise trust crisis. Our isolation model is a competitive moat, not a limitation. I want to invest in closing the quality gap within our architecture rather than abandoning the thing that makes enterprise buyers choose us."

Conditions that would change my mind: If a major competitor ships dramatically better AI AND wins 3+ of our enterprise renewals citing AI quality as the reason, I would revisit. But only with explicit opt-in consent per workspace, not a blanket policy change.`,
    evaluationHints: [
      "Must identify this as a one-way door decision where the downside is asymmetrically larger than the upside",
      "Should address the competitive pressure honestly rather than dismissing it",
      "Must propose alternative technical approaches to close the quality gap (federated learning, synthetic data, etc.)",
      "Should frame the recommendation in terms of how to communicate it to leadership",
      "Must include a specific condition that would make them reverse their position"
    ]
  },
  {
    id: 15,
    category: "tradeoffs",
    title: "Reddit Moderation Automation",
    scenario: `You are a PM at Reddit responsible for content moderation tooling. Reddit currently relies heavily on volunteer moderators (over 50,000 active mods across major subreddits). Your team has built an AI moderation system that can automatically flag and remove rule-violating content with 94% accuracy.

The product question: How aggressively do you deploy this?

OPTION A: Full automation -- the AI system handles first-pass moderation for all subreddits. Volunteer mods become an appeals layer. This reduces mod workload by an estimated 70% and cuts average rule-violation visibility time from 4 hours to 8 minutes.

OPTION B: Hybrid -- AI flags content but human mods make the final removal decision. This keeps mods in control but only reduces their workload by 30%. Violation visibility time drops to about 45 minutes.

OPTION C: Opt-in -- let each subreddit's mod team decide their automation level. Some communities will go full auto, some will stay manual. This respects community autonomy but creates an inconsistent user experience across Reddit.

Key tensions:
- Reddit's volunteer mod community is already frustrated after the 2023 API pricing backlash. Removing their authority could trigger another revolt.
- The 6% error rate means roughly 1 in 17 removals is wrong. At Reddit's scale, that is tens of thousands of wrongful removals per day.
- Advertisers are pressuring Reddit to reduce harmful content visibility times. Every hour of delay is a brand safety risk.
- Some subreddits have extremely nuanced rules that AI cannot reliably interpret (satire communities, debate forums, communities with context-dependent slang).

Which option do you recommend? How do you manage the relationship with volunteer moderators while meeting advertiser and user safety demands?`,
    modelAnswer: `I recommend Option C (opt-in per subreddit), but with a platform-wide baseline that is non-negotiable.

The key insight is that Reddit is not one community. It is thousands of communities with fundamentally different moderation needs. A satire subreddit and a medical advice subreddit cannot use the same automation rules. Forcing uniform automation (Option A) guarantees high-profile false positive scandals in nuanced communities, and the 6% error rate at Reddit's scale means tens of thousands of wrongful removals daily.

However, pure opt-in with no baseline is too permissive. Some content (CSAM, doxxing, credible threats, illegal content) must be automatically removed platform-wide regardless of subreddit preferences. The non-negotiable baseline handles legal and safety requirements. Everything above that baseline is the subreddit's choice.

Why not Option A: The 2023 API pricing backlash proved that Reddit's volunteer mod community will revolt if they feel their autonomy is stripped. Mods are unpaid labor that Reddit depends on. Alienating them is an existential risk to the platform's content moderation capacity. Also, the 6% error rate is unacceptable at full automation scale.

Why not Option B: A 30% workload reduction is not compelling enough to justify keeping humans in the loop for every decision. Mods will still burn out.

Managing advertiser pressure: Present the opt-in model as "community-appropriate moderation" and publish transparency reports showing that content violation visibility times decrease as subreddits adopt higher automation levels. Advertisers care about brand safety metrics, not implementation details.

The inconsistent experience risk: Create 3 recommended automation tiers (Low, Medium, Full) that subreddits can adopt as packages. This reduces fragmentation while preserving choice.`,
    evaluationHints: [
      "Must address the mod community relationship as an existential dependency, not just a stakeholder concern",
      "Should propose a hybrid that acknowledges the 6% error rate is unacceptable at full scale",
      "Must distinguish between content that requires mandatory automation (legal/safety) and content that is community-dependent",
      "Should address the advertiser pressure with a specific communication strategy",
      "Must acknowledge the inconsistency problem of opt-in and propose a mitigation (tiers, templates, etc.)"
    ]
  },
];
