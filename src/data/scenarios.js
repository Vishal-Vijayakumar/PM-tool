// PM Prep Tool - Scenario Bank
// 15 scenarios across 3 categories

export const scenarios = [
  // === Metrics Definition (5) ===
  {
    id: 1,
    category: "metrics",
    title: "Instagram Reels Engagement Drop",
    scenario:
      "You are the PM for Instagram Reels. Over the past 3 weeks, daily active users are up 15% but average watch time per session has dropped from 12 minutes to 8 minutes. Your VP asks you to define the success metrics you would track to diagnose this problem and measure whether your fix is working. What metrics do you define and why?",
  },
  {
    id: 2,
    category: "metrics",
    title: "Slack Huddles Adoption",
    scenario:
      "You are the PM for Slack Huddles (the audio/video call feature inside Slack). The feature launched 6 months ago. Leadership wants to know if Huddles is successful. Define the metrics framework you would use to evaluate whether Huddles is meeting its goals. Consider both leading and lagging indicators.",
  },
  {
    id: 3,
    category: "metrics",
    title: "DoorDash New Market Launch",
    scenario:
      "DoorDash is launching in a mid-size city (population 250K) where they have zero presence. You are the PM responsible for this market launch. Define the metrics you would track during the first 90 days to determine whether the launch is on track. How would you know if you need to change strategy?",
  },
  {
    id: 4,
    category: "metrics",
    title: "Spotify Podcast Monetization",
    scenario:
      "Spotify is rolling out a new feature that lets podcast creators sell premium episodes directly to listeners. You are the PM for this feature. Define the success metrics for the first 6 months post-launch. Consider all sides of the marketplace: creators, listeners, and Spotify as a platform.",
  },
  {
    id: 5,
    category: "metrics",
    title: "Google Maps EV Charging",
    scenario:
      "Google Maps has added a feature showing real-time EV charging station availability. You are the PM. The feature has been live for 2 months. Define the metrics you would use to evaluate whether this feature is delivering value to users and worth continued investment. What would make you decide to expand vs. deprioritize this feature?",
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
  },
];
