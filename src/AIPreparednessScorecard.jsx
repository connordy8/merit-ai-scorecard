import { useState } from "react";

const MA_PRIMARY = "#001846";
const MA_TEAL = "#2DD7B9";
const MA_BLUE = "#3F6DE4";
const MA_DARK = "#001846";
const MA_MID = "#313233";
const MA_LIGHT = "#F5F5F5";
const MA_BORDER = "#D7DBE7";
const MA_WHITE = "#FFFFFF";

const RISKS = {
  external: [
    {
      rank: 1,
      label: "Jobs change faster than we can keep up",
      detail: "There are jobs available to our learners, but they're evolving faster than we can update our tracks. The role we trained someone for six months ago looks meaningfully different today.",
    },
    {
      rank: 2,
      label: "AI supplants human coaching",
      detail: "AI doesn't just proliferate as an alternative — it actually gets as good as, or better than, our human coaches at the core things we do. The line we've drawn in the sand — that human coaches are meaningfully better — stops being true. This is the most direct threat to our core value proposition.",
    },
    {
      rank: 3,
      label: "Part of our approach becomes irrelevant",
      detail: "There are failure points throughout the model that could make it stop working — the tech and touch model, the tools we use, our distribution channels. We don't know which part breaks first. Any one of them becoming uncompetitive could undermine the whole thing.",
    },
    {
      rank: 4,
      label: "Not enough jobs to place learners in",
      detail: "AI reduces the number of entry-level roles our learners are trained for. It's not that the jobs change — it's that there aren't enough of them. Placement rates drop not because of program quality, but because the demand side shrinks.",
    },
    {
      rank: 5,
      label: "Our economic model stops working",
      detail: "Learners become unwilling to take on a loan when they're uncertain about job outcomes. B2B deals with employers dry up as hiring volumes shrink. The funding structures that allow us to offer $0 upfront training become harder to sustain.",
    },
    {
      rank: 6,
      label: "A new competitor builds what we do, but AI-native from day one",
      detail: "Someone builds an AI-first workforce training program from scratch — no legacy systems, no existing staff model, no institutional inertia. They can offer personalized coaching through AI agents at a fraction of our cost, iterate on curriculum in days, and scale to hundreds of thousands of learners without scaling headcount. They don't have to transform — they just have to build.",
    },
  ],
  internal: [
    {
      rank: 1,
      label: "We can't move fast enough",
      detail: "The external shocks pile up faster than we can respond. We can't adjust staffing, retool the economic model, or redirect programs quickly enough. Every major change requires months of planning, buy-in, and execution — and by the time we ship it, the problem has already shifted. This isn't one specific failure. It's what happens when all the other risks compound and we don't have the organizational muscle to keep up.",
    },
    {
      rank: 2,
      label: "We don't learn fast enough about AI",
      detail: "As an organization, we aren't staying close enough to what AI can actually do right now. People across the org don't understand the latest tools or how they fit into their work. There's no real culture of experimentation or curiosity about AI. We fall behind — not because the technology isn't available, but because we aren't using it, and we aren't learning.",
    },
    {
      rank: 3,
      label: "We don't capture what makes us unique",
      detail: "Every coaching interaction, learner milestone, and employer outcome that goes unrecorded is competitive advantage we're leaving on the table. If we don't systematically capture and structure the data behind what makes our model work, someone else will build a version of it — trained on their data, not ours — and we'll have nothing proprietary to fall back on.",
    },
  ],
};

const criteria = [
  {
    rank: 1,
    title: "Curriculum Velocity",
    subtitle: "How fast can we ship a new track?",
    description:
      "Can we identify a viable new career, design the training, and enroll a first cohort in under 8 weeks? Can we kill a track that's no longer working just as fast? We need to shorten our new track development timeline from 6+ months to less than two, with the goal of launching new tracks faster than the rate at which our current ones are disrupted.",
    scoreDescriptions: [
      "Curriculum review happens once a year. No process for sunsetting tracks.",
      "Updates are possible but take 6-12 months and require a lot of buy-in.",
      "Quarterly reviews with labor market data. Pilots can launch in 3-4 months.",
      "Continuous job market signals feed track decisions. New pilots in 6-8 weeks. Tracks get retired when data says so.",
      "Near real-time labor market intelligence feeds curriculum. AI drafts new modules for human review in days. New tracks launch faster than old ones die. There's an actual sunset process.",
    ],
    icon: "⚡",
    accent: "#2DD7B9",
    mitigates: ["Jobs change faster than we can keep up", "Part of our approach becomes irrelevant"],
  },
  {
    rank: 2,
    title: "Organizational Agility",
    subtitle: "Can we change directions in months, not years?",
    description:
      "Startup urgency. Bias for action. The ability to reallocate budget mid-year, kill a failing program, and launch something new without a 6-month approval cycle. For gnarly technical problems? Scotch tape and bubble gum. By the time a 'proper' solution gets built, the underlying problem may have fundamentally changed. Quick fixes and manual workarounds beat sophisticated systems that arrive too late.",
    scoreDescriptions: [
      "Annual planning cycles. Budget reallocation requires lots of approvals. Change is treated as a disruption.",
      "Major pivots run through committees and take 12+ months in practice.",
      "Quarterly priorities resets. Small teams can pilot without org-wide sign-off. Budget can shift mid-year.",
      "Leadership can kill and launch programs month-to-month. Scotch tape and bubble gum is a compliment here.",
      "Continuous planning. Any team can go from idea to deployed in days. Budget is a living doc. The org moves at the pace of the market.",
    ],
    icon: "🔄",
    accent: "#3F6DE4",
    mitigates: ["We can't move fast enough", "A new competitor builds what we do, but AI-native from day one"],
  },
  {
    rank: 3,
    title: "Head & Hands Portfolio",
    subtitle: "Are we training for roles AI can't do?",
    description:
      "The roles that survive combine brain and brawn — physical presence or manual dexterity plus critical reasoning. Think semiconductor technicians, advanced manufacturing, phlebotomists, data center ops, megatronics. Highly regulated industries — healthcare, education, government — will also adopt AI more slowly due to regulatory constraints, creating more predictable shelter for our learners. We need to evaluate every track we offer for disruption risk: is it highly unlikely to be disrupted, or directly tied to the AI revolution itself? Tracks that don't meet either condition need a sunset plan.",
    scoreDescriptions: [
      "Entirely white-collar knowledge work. High displacement risk across the board.",
      "A head-and-hands track or two exists, but it's not a strategic priority.",
      "Explicit philosophy around brain-and-brawn roles. At least 30% of tracks are in AI-resistant or AI-adjacent territory.",
      "Portfolio actively scored against a career durability index. Investment shifts toward AI-resistant and AI-adjacent roles on a regular cadence.",
      "Quarterly portfolio rebalancing against live AI capability benchmarks. Formal process to sunset vulnerable tracks and seed new ones. AR/VR being tested to train manual skills at scale where in-person isn't viable.",
    ],
    icon: "🔧",
    accent: "#2EC4B6",
    mitigates: ["Jobs change faster than we can keep up", "Not enough jobs to place learners in"],
  },
  {
    rank: 4,
    title: "Coaching Model Adaptability",
    subtitle: "Is our coaching model built to change, or built to last?",
    description:
      "It's hard to imagine a world where we keep offering only human-to-human coaching. What we're moving toward is coaches partnering with teams of AI agents trained on their unique voice and approach — deploying those agents across a much larger set of learners, dramatically increasing reach without losing the bespoke experience. We need a laser focus on constantly pivoting around the cost-effective human interactions that can't easily be replicated by machines, while acknowledging that this line will constantly shift. The risk isn't just that AI coaching proliferates — it's that AI coaching actually gets as good as we are, and we haven't figured out what we do next.",
    scoreDescriptions: [
      "All human-to-human coaching. No AI integration. Model unchanged.",
      "AI handles scheduling and admin. Core coaching stays fully human.",
      "AI handles routine check-ins and progress tracking. Human coaches focus on the interactions that actually require them.",
      "Coaches actively deploy AI agents trained on their methodology. The human-AI ratio is measured and actually optimized.",
      "Coaching model is continuously re-evaluated against AI capability advances. Coaches run 'teams' of agents that extend their reach 5-10x. There's a formal process for identifying which coaching moments must stay human as AI improves. Labor model gets restructured accordingly.",
    ],
    icon: "💬",
    accent: "#8338EC",
    mitigates: ["AI supplants human coaching", "A new competitor builds what we do, but AI-native from day one"],
  },
  {
    rank: 5,
    title: "AI-Native Pedagogy",
    subtitle: "Is AI baked in, or bolted on?",
    description:
      "Every track needs to be reconceived around AI-augmented work — not just have an AI module tacked on at the end. The question for every piece of content: what does this task look like when the person doing it has an AI copilot? Work is reorganizing around human-agent teams. Graduates need to be able to plan a task, delegate parts of it to an AI agent, verify the output, and iterate. If a grad leaves the program and has never worked with AI in the context of their specific career, we've failed them.",
    scoreDescriptions: [
      "AI is a standalone optional module if it exists at all. Core curriculum is unchanged.",
      "AI overview tacked onto each track, but not integrated into how the skills actually get taught.",
      "AI tools used in exercises. Graduates can use copilots in their specific field.",
      "Every curriculum module reimagined around AI-augmented workflows. Graduates can manage AI agents for role-specific tasks.",
      "AI fluency is the foundational layer of every track. Graduates can design, delegate to, and critically evaluate AI agents in their domain. Employers helped define what competency looks like.",
    ],
    icon: "🤖",
    accent: "#06A77D",
    mitigates: ["Jobs change faster than we can keep up", "Part of our approach becomes irrelevant"],
  },
  {
    rank: 6,
    title: "Speed-to-Credential",
    subtitle: "How long does it actually take?",
    description:
      "Our learners are entering the most uncertain and fast-changing labor market ever. They don't have years to spend in training. A skill learned 18 months ago may already be outdated. How do we build a program that moves at the pace of the market — rolling enrollment, self-paced completion, stackable credentials that let someone be job-ready at multiple milestones rather than only at the end?",
    scoreDescriptions: [
      "Fixed quarterly or semester cohort starts. One-size timeline for everyone.",
      "Monthly cohort starts. Some pacing flexibility but the core timeline is fixed.",
      "Weekly or rolling enrollment. Learners can move faster through content they've already mastered.",
      "Continuous enrollment. Fully self-paced with competency gates. Most learners finishing in 8-12 weeks.",
      "Near-instant enrollment. AI-personalized pacing for fast learners. Stackable micro-credentials mean learners are job-ready at multiple milestones. Employers validate at each stage.",
    ],
    icon: "🏃",
    accent: "#FF6B6B",
    mitigates: ["Jobs change faster than we can keep up", "Our economic model stops working"],
  },
  {
    rank: 7,
    title: "Technology Adoption Culture",
    subtitle: "Does everyone here actually use AI every day?",
    description:
      "Everyone in the org should be constantly partnering with an LLM throughout their workday. Not some people. Everyone. We need to continuously scout for efficiency — regularly doing AI audits to find which areas of our work can be done better or cheaper. This also means using new tools, sharing what we learn, and encouraging each other to deploy technology to drive more value for learners. The orgs that move fastest externally are the ones moving fastest internally.",
    scoreDescriptions: [
      "AI tool adoption is individual and ad hoc. No org-wide expectation.",
      "Some teams use AI tools. Leadership encourages it in theory. No systematic adoption.",
      "Org-wide access to AI tools. Periodic sharing of what's working. Leadership models usage visibly.",
      "Quarterly AI audits identify functions for enhancement or replacement. Everyone has an actual AI workflow. Culture of sharing wins org-wide.",
      "Partnering with AI is a core job expectation for every role. Monthly efficiency reviews reallocate savings to mission. A dedicated internal AI lab gets the best new tools into people's hands within weeks of release.",
    ],
    icon: "🛠️",
    accent: "#F7A325",
    mitigates: ["We can't move fast enough", "We don't learn fast enough about AI"],
  },
  {
    rank: 8,
    title: "Human Judgment Development",
    subtitle: "Are we making career athletes, or single-track specialists?",
    description:
      "The technical skills our learners acquire today may not be relevant a few years from now. The most durable skill in the AI economy is the ability to scope a problem clearly, delegate it to an AI, evaluate whether the output is any good, and make a call under ambiguity. These are management skills — and they matter more than any specific technical capability. We need to create career athletes who can thrive in any environment, not just the one they trained for. Our learners, who've spent years being resourceful in low-wage work, may have a natural advantage here over college grads who've never managed anyone.",
    scoreDescriptions: [
      "Purely technical training. No explicit focus on meta-skills or judgment.",
      "Soft skills workshop exists. Treated as supplementary, not core.",
      "Professional coaching explicitly builds metacognitive skills, adaptability, and critical evaluation.",
      "Dedicated modules on learning how to learn and AI judgment across all tracks. Graduates can self-direct their own upskilling after program end.",
      "Human judgment, metacognition, and career adaptability run through every track — assessed through scenarios where learners catch AI errors, navigate ambiguity, and pivot on demand. Graduates leave as career athletes.",
    ],
    icon: "🧠",
    accent: "#E040FB",
    mitigates: ["Jobs change faster than we can keep up", "Part of our approach becomes irrelevant"],
  },
  {
    rank: 9,
    title: "Employer Co-Design",
    subtitle: "Is the labor market pulling curriculum, or are we pushing?",
    description:
      "Distribution is king. As AI tools become ubiquitous and product features get commoditized, the ability to reach learners through superior channels — and the trust of employers who hire them — matters more than any single product improvement. Employer co-design isn't just about curriculum relevance. It's a distribution strategy. The employers who co-designed the program will hire our graduates first. That trust becomes a moat that's genuinely hard to copy. An annual advisory board isn't enough. If employers can't surface a skill gap and see it reflected in curriculum within weeks, the relationship is decorative.",
    scoreDescriptions: [
      "Annual advisory board. Curriculum changes lag employer needs by a year or more.",
      "Quarterly check-ins. Curriculum updates still lag by 6+ months.",
      "Employers embedded in curriculum design. Major updates within 2-3 months.",
      "Employers co-teach modules and provide real work projects. Graduates validated by employers before certification.",
      "Employers surface skill gaps in real time and curriculum responds within weeks. Employers co-fund tracks tied to their pipeline. That employer network becomes a real distribution moat.",
    ],
    icon: "🤝",
    accent: "#00B4D8",
    mitigates: ["Jobs change faster than we can keep up", "Our economic model stops working"],
  },
  {
    rank: 10,
    title: "Data Capture",
    subtitle: "Training data is the new oil. Are we drilling?",
    description:
      "Every uncaptured coaching interaction today is lost competitive advantage tomorrow. Our coaching methodology, learner transformation patterns, employer outcomes, career trajectories over time — that's the moat. We need to systematically capture what makes us unique before someone else commoditizes it. This data will let us train AI models that amplify human coaching effectiveness, predict and prevent drop-offs, personalize learning at scale. The institution that builds a rich proprietary dataset around how low-wage workers transform into career-ready professionals has something no AI startup can replicate.",
    scoreDescriptions: [
      "Outcome data collected manually and inconsistently. No real dataset to speak of.",
      "Basic outcome data collected but not linked to coaching inputs or program decisions.",
      "Structured data on learner progress, completion, and wage outcomes. Some coaching interactions documented.",
      "Granular data on coaching interactions, learner behaviors, employer feedback, and multi-year wage trajectories. Being used to train internal models.",
      "Every coaching interaction, learner milestone, employer signal, and career trajectory captured and structured. Proprietary AI models trained on this data create a flywheel — more learners make coaching smarter, smarter coaching attracts more learners and employers.",
    ],
    icon: "🗄️",
    accent: "#FB8500",
    mitigates: ["AI supplants human coaching", "We don't capture what makes us unique"],
  },
];

const SCORE_LABELS = ["Not Present", "Emerging", "Developing", "Advanced", "World-Class"];

export default function Scorecard() {
  const [scores, setScores] = useState(Object.fromEntries(criteria.map((c) => [c.rank, 0])));
  const [expanded, setExpanded] = useState(null);
  const [view, setView] = useState("risks");

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = criteria.length * 4;
  const pct = Math.round((totalScore / maxScore) * 100);

  const getRating = (pct) => {
    if (pct >= 85) return { label: "World-Class", color: "#2DD7B9" };
    if (pct >= 70) return { label: "Advanced", color: "#3F6DE4" };
    if (pct >= 50) return { label: "Developing", color: "#F7A325" };
    if (pct >= 30) return { label: "Emerging", color: "#FF6B6B" };
    return { label: "Not Ready", color: "#b32d2e" };
  };

  const rating = getRating(pct);
  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const tabs = [
    { id: "risks", label: "Risk Framing" },
    { id: "scorecard", label: "Score Criteria" },
    { id: "summary", label: "Summary" },
  ];

  const allRisks = [
    ...RISKS.external.map(r => ({ ...r, type: "external" })),
    ...RISKS.internal.map(r => ({ ...r, type: "internal" })),
  ].sort((a, b) => a.rank - b.rank);

  return (
    <div style={{ background: MA_LIGHT, minHeight: "100vh", fontFamily: "'Helvetica Neue', Arial, sans-serif", color: MA_DARK }}>

      {/* Header */}
      <div style={{ background: MA_WHITE, borderBottom: `1px solid ${MA_BORDER}`, padding: "28px 32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, background: MA_TEAL, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 14, height: 14, background: "white", borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: MA_TEAL, letterSpacing: "0.05em", textTransform: "uppercase" }}>Merit America</span>
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>/</span>
                <span style={{ fontSize: 12, color: MA_MID }}>Internal</span>
              </div>
              <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, margin: 0, color: MA_DARK, lineHeight: 1.25 }}>
                Merit AI Preparedness
              </h1>
              <p style={{ color: MA_MID, marginTop: 8, fontSize: 14, maxWidth: 500, lineHeight: 1.65, marginBottom: 0 }}>
                A look at the most meaningful shocks we should be prepared for, and a scorecard to evaluate how ready we are to withstand them.
              </p>
              <div style={{ display: "flex", gap: 4, marginTop: 18 }}>
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setView(t.id)}
                    style={{
                      padding: "6px 14px", borderRadius: 4,
                      border: view === t.id ? `1.5px solid ${MA_TEAL}` : `1.5px solid ${MA_BORDER}`,
                      background: view === t.id ? MA_TEAL : MA_WHITE,
                      color: view === t.id ? MA_WHITE : MA_MID,
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.15s",
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Score ring */}
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto" }}>
                <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="55" cy="55" r="46" fill="none" stroke={MA_BORDER} strokeWidth="8" />
                  <circle cx="55" cy="55" r="46" fill="none" stroke={rating.color} strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s" }} />
                </svg>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: MA_DARK, lineHeight: 1 }}>{pct}%</div>
                  <div style={{ fontSize: 10, color: "#AAA", marginTop: 3, fontFamily: "monospace" }}>{totalScore}/{maxScore}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: rating.color, fontWeight: 700, marginTop: 6 }}>{rating.label}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 32px 72px" }}>

        {/* RISK VIEW */}
        {view === "risks" && (
          <div>
            <p style={{ color: MA_MID, fontSize: 14, lineHeight: 1.75, maxWidth: 640, marginBottom: 8 }}>
              Below are the most significant AI shocks to Merit America's core model, force-ranked by likelihood. In the "Score Criteria" tab, we score ourselves against how prepared we are to respond to each one.
            </p>
            <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.65, maxWidth: 640, marginBottom: 24 }}>
              External shocks are forces outside our control. Internal shocks are failures that emerge on their own if we don't build systems to prevent them.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {/* External */}
              <div style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: MA_TEAL }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: MA_TEAL }}>External</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {RISKS.external.map((r) => (
                    <div key={r.rank} style={{ padding: "12px 13px", background: MA_LIGHT, borderRadius: 6, borderLeft: `3px solid ${MA_TEAL}` }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: MA_TEAL, fontFamily: "monospace", marginTop: 2, minWidth: 16 }}>#{r.rank}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: MA_DARK }}>{r.label}</span>
                      </div>
                      <div style={{ fontSize: 12, color: MA_MID, lineHeight: 1.65, paddingLeft: 24 }}>{r.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal */}
              <div style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: MA_DARK }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: MA_DARK }}>Internal</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {RISKS.internal.map((r) => (
                    <div key={r.rank} style={{ padding: "12px 13px", background: MA_LIGHT, borderRadius: 6, borderLeft: `3px solid ${MA_DARK}` }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: MA_MID, fontFamily: "monospace", marginTop: 2, minWidth: 16 }}>#{r.rank}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: MA_DARK }}>{r.label}</span>
                      </div>
                      <div style={{ fontSize: 12, color: MA_MID, lineHeight: 1.65, paddingLeft: 24 }}>{r.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Criteria-risk map */}
            <div style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 22, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: MA_MID, marginBottom: 16 }}>
                How the 10 criteria map to these shocks
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {criteria.map((c, idx) => (
                  <div key={c.rank} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
                    borderBottom: idx < criteria.length - 1 ? `1px solid ${MA_BORDER}` : "none"
                  }}>
                    <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace", minWidth: 22 }}>#{c.rank}</div>
                    <div style={{ fontSize: 14, minWidth: 22 }}>{c.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: MA_DARK, minWidth: 190 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {c.mitigates.map((m, i) => (
                        <span key={i} style={{
                          fontSize: 11, padding: "2px 8px", borderRadius: 3,
                          background: MA_LIGHT, color: MA_MID, border: `1px solid ${MA_BORDER}`
                        }}>{m}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setView("scorecard")} style={{
              display: "block", margin: "0 auto", padding: "10px 24px", background: MA_TEAL, border: "none",
              color: MA_WHITE, borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 600,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>
              Score the Criteria →
            </button>
          </div>
        )}

        {/* SCORECARD VIEW */}
        {view === "scorecard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {criteria.map((c) => {
              const isOpen = expanded === c.rank;
              const score = scores[c.rank];
              return (
                <div key={c.rank} style={{
                  background: MA_WHITE,
                  border: isOpen ? `1.5px solid ${c.accent}` : `1px solid ${MA_BORDER}`,
                  borderRadius: 8, overflow: "hidden", transition: "border 0.15s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: "pointer" }}
                    onClick={() => setExpanded(isOpen ? null : c.rank)}>
                    <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace", minWidth: 20 }}>
                      {String(c.rank).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 18, minWidth: 24 }}>{c.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: MA_DARK }}>{c.title}</span>
                        <span style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic" }}>{c.subtitle}</span>
                      </div>
                      <div style={{ display: "flex", gap: 3, marginTop: 7 }}>
                        {[0,1,2,3,4].map((i) => (
                          <div key={i}
                            onClick={(e) => { e.stopPropagation(); setScores((s) => ({ ...s, [c.rank]: i })); }}
                            style={{
                              height: 4, flex: 1, borderRadius: 2,
                              background: i <= score ? c.accent : MA_BORDER,
                              cursor: "pointer", transition: "background 0.15s"
                            }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 84 }}>
                      <div style={{ fontSize: 11, color: c.accent, fontWeight: 700 }}>{SCORE_LABELS[score]}</div>
                      <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>{score}/4</div>
                    </div>
                    <div style={{ color: "#9CA3AF", fontSize: 10, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>▶</div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${MA_BORDER}` }}>
                      <p style={{ color: MA_MID, fontSize: 13, lineHeight: 1.8, marginTop: 14, marginBottom: 10 }}>
                        {c.description}
                      </p>
                      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                        {c.mitigates.map((m, i) => (
                          <span key={i} style={{
                            fontSize: 11, padding: "2px 8px", borderRadius: 3,
                            background: MA_LIGHT, color: MA_MID, border: `1px solid ${MA_BORDER}`
                          }}>Mitigates: {m}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {c.scoreDescriptions.map((desc, i) => (
                          <div key={i} onClick={() => setScores((s) => ({ ...s, [c.rank]: i }))}
                            style={{
                              display: "flex", gap: 11, padding: "10px 12px", borderRadius: 6, cursor: "pointer",
                              background: score === i ? `${c.accent}0D` : "transparent",
                              border: score === i ? `1px solid ${c.accent}50` : `1px solid transparent`,
                              transition: "all 0.12s",
                            }}>
                            <div style={{
                              width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                              border: `2px solid ${score === i ? c.accent : MA_BORDER}`,
                              background: score === i ? c.accent : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 9, color: score === i ? "white" : "#9CA3AF",
                              fontWeight: 700, fontFamily: "monospace",
                            }}>{i}</div>
                            <div>
                              <div style={{
                                fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                                color: score === i ? c.accent : "#6B7280", marginBottom: 3
                              }}>{SCORE_LABELS[i]}</div>
                              <div style={{ fontSize: 12, color: score === i ? MA_DARK : MA_MID, lineHeight: 1.65 }}>{desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SUMMARY VIEW */}
        {view === "summary" && (
          <div>
            <div style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 22, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: MA_MID, marginBottom: 12 }}>
                Overall Score
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: rating.color, marginBottom: 4 }}>{rating.label}</div>
              <div style={{ color: "#6B7280", fontSize: 13, fontFamily: "monospace" }}>{totalScore} / {maxScore} · {pct}%</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))", gap: 8, marginBottom: 16 }}>
              {criteria.map((c) => {
                const score = scores[c.rank];
                return (
                  <div key={c.rank} style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 15 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>#{c.rank}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: MA_DARK, marginTop: 2 }}>{c.icon} {c.title}</div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: c.accent, fontFamily: "monospace" }}>{score}/4</div>
                    </div>
                    <div style={{ height: 3, background: MA_LIGHT, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(score / 4) * 100}%`, background: c.accent, borderRadius: 2, transition: "width 0.4s" }} />
                    </div>
                    <div style={{ fontSize: 10, color: c.accent, marginTop: 7, fontWeight: 700 }}>{SCORE_LABELS[score]}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: MA_WHITE, border: `1px solid ${MA_BORDER}`, borderRadius: 8, padding: 22, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: MA_MID, marginBottom: 14 }}>
                Highest-Priority Gaps
              </div>
              {criteria.filter((c) => scores[c.rank] < 3).sort((a, b) => a.rank - b.rank).slice(0, 5).map((c, idx, arr) => (
                <div key={c.rank} style={{
                  display: "flex", gap: 10, padding: "10px 0",
                  borderBottom: idx < arr.length - 1 ? `1px solid ${MA_BORDER}` : "none"
                }}>
                  <span style={{ fontSize: 15 }}>{c.icon}</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: MA_DARK }}>{c.title}: </span>
                    <span style={{ fontSize: 13, color: MA_MID }}>{SCORE_LABELS[scores[c.rank]]} · #{c.rank} in priority</span>
                    <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                      {c.mitigates.map((m, i) => (
                        <span key={i} style={{
                          fontSize: 10, padding: "2px 7px", borderRadius: 3,
                          background: MA_LIGHT, color: MA_MID, border: `1px solid ${MA_BORDER}`
                        }}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {criteria.filter((c) => scores[c.rank] < 3).length === 0 && (
                <p style={{ color: "#2DD7B9", fontSize: 13, margin: 0 }}>No critical gaps.</p>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={() => setView("scorecard")} style={{
                padding: "9px 20px", background: "transparent", border: `1.5px solid ${MA_BORDER}`,
                color: MA_MID, borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 600,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>← Back to Scorecard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
