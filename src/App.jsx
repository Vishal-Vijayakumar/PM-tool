import React, { useState } from 'react'
import { scenarios } from './data/scenarios'
import { getAIFeedback } from './utils/api'

const CATEGORIES = [
  { id: 'metrics', label: 'Metrics Definition', description: 'Define how you would measure success for a product feature' },
  { id: 'prioritization', label: 'Prioritization', description: 'Choose what to build next when you cannot do everything' },
  { id: 'tradeoffs', label: 'Tradeoff Analysis', description: 'Analyze a product decision where every option has a cost' },
]

function randomScenario(category) {
  const pool = scenarios.filter((s) => s.category === category)
  return pool[Math.floor(Math.random() * pool.length)]
}

function parseDimensionScores(text) {
  // Match DIMENSION_SCORES block ending at END_SCORES, or at the first feedback section header, or at a double newline
  const match = text.match(/DIMENSION_SCORES:\s*\n([\s\S]*?)(?:END_SCORES|(?=\n\s*(?:STRENGTHS|GAPS|STRONG ANSWER|INTERVIEWER TIP|SCORE)[:\s])|\n\s*\n\s*\n)/)
  if (!match) return null

  const block = match[1]
  const dimensions = []
  let overall = null

  for (const line of block.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const overallMatch = trimmed.match(/^OVERALL:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i)
    if (overallMatch) {
      overall = parseFloat(overallMatch[1])
      continue
    }
    const dimMatch = trimmed.match(/^(.+?):\s*(\d+(?:\.\d+)?)\s*\/\s*10/)
    if (dimMatch) {
      dimensions.push({ name: dimMatch[1].trim(), score: parseFloat(dimMatch[2]) })
    }
  }

  if (dimensions.length === 0) return null
  return { dimensions, overall }
}

function stripDimensionBlock(text) {
  return text.replace(/DIMENSION_SCORES:\s*\n[\s\S]*?(?:END_SCORES\s*\n?|(?=\n\s*(?:STRENGTHS|GAPS|STRONG ANSWER|INTERVIEWER TIP|SCORE)[:\s])|\n\s*\n\s*\n)/, '').trim()
}

function parseFeedbackSections(text) {
  const cleaned = stripDimensionBlock(text)
  const sections = []
  const lines = cleaned.split('\n')
  let currentSection = null
  let currentLines = []

  for (const line of lines) {
    const headerMatch = line.match(/^(?:\*\*)?(?:SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP|SCORING CALIBRATION)[:\s]/i)
      || line.match(/^(?:\*\*)?(?:SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP|SCORING CALIBRATION)(?:\*\*)?$/i)

    if (headerMatch) {
      if (currentSection || currentLines.length > 0) {
        sections.push({ type: currentSection, lines: currentLines })
      }
      const cleanedLine = line.replace(/\*\*/g, '').trim()
      if (/^SCORING CALIBRATION/i.test(cleanedLine)) currentSection = 'calibration'
      else if (/^SCORE/i.test(cleanedLine)) currentSection = 'score'
      else if (/^STRENGTHS/i.test(cleanedLine)) currentSection = 'strengths'
      else if (/^GAPS/i.test(cleanedLine)) currentSection = 'gaps'
      else if (/^STRONG ANSWER/i.test(cleanedLine)) currentSection = 'example'
      else if (/^INTERVIEWER TIP/i.test(cleanedLine)) currentSection = 'tip'
      else currentSection = 'other'

      const remainder = cleanedLine.replace(/^(SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP|SCORING CALIBRATION)[:\s]*/i, '').trim()
      currentLines = remainder ? [remainder] : []
    } else {
      currentLines.push(line)
    }
  }
  if (currentSection || currentLines.length > 0) {
    sections.push({ type: currentSection, lines: currentLines })
  }
  return sections
}

function parseScore(text) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*\/\s*10/)
  return match ? parseFloat(match[1]) : null
}

function scoreColor(score) {
  if (score >= 7) return 'text-green-700'
  if (score >= 4) return 'text-yellow-700'
  return 'text-red-700'
}

function dimScoreColor(score) {
  if (score >= 7) return 'bg-green-700'
  if (score >= 4) return 'bg-yellow-600'
  return 'bg-red-700'
}

function dimScoreBg(score) {
  if (score >= 7) return 'bg-green-50'
  if (score >= 4) return 'bg-yellow-50'
  return 'bg-red-50'
}

function gapColor(gap) {
  if (gap <= 1) return { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-400' }
  if (gap <= 3) return { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400' }
  return { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-400' }
}

function ScoreBlock({ value, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 text-xs font-black border-2 transition-colors duration-100
        ${selected
          ? 'bg-[#5B8C3E] text-white border-[#3d6129]'
          : 'bg-stone-200 text-stone-500 border-stone-400 hover:bg-stone-300 hover:text-stone-700'
        }`}
    >
      {value}
    </button>
  )
}

function SelfEvaluation({ dimensions, onSubmit }) {
  const [ratings, setRatings] = useState({})

  const allRated = dimensions.every((dim) => ratings[dim.name] !== undefined)

  function handleRate(dimName, score) {
    setRatings((prev) => ({ ...prev, [dimName]: score }))
  }

  return (
    <div className="mt-6 pt-4 border-t-2 border-stone-300">
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Self-Evaluation</p>
      <p className="text-sm text-stone-600 mb-4">Before seeing your scores, rate your own response on each dimension:</p>
      <div className="border-2 border-stone-400 bg-stone-100 p-3 space-y-3">
        {dimensions.map((dim) => (
          <div key={dim.name}>
            <span className="text-xs font-bold text-stone-600 block mb-1">{dim.name}</span>
            <div className="flex gap-1 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                <ScoreBlock
                  key={v}
                  value={v}
                  selected={ratings[dim.name] === v}
                  onClick={() => handleRate(dim.name, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onSubmit(ratings)}
        disabled={!allRated}
        className="mt-4 px-6 py-2.5 bg-[#5B8C3E] text-white text-sm font-bold border-2 border-[#3d6129] hover:bg-[#4a7832] transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(61,97,41,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
      >
        Submit Self-Evaluation
      </button>
    </div>
  )
}

function ScoreComparison({ dimensions, selfRatings }) {
  const withinOne = dimensions.filter((dim) => Math.abs(dim.score - (selfRatings[dim.name] || 0)) <= 1).length

  return (
    <div className="mt-6 pt-4 border-t-2 border-stone-300">
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Self-Awareness Check</p>
      <div className="border-2 border-stone-400 bg-stone-100 p-3 space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 gap-y-2 items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Dimension</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 text-center w-12">You</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 text-center w-12">AI</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 text-center w-12">Gap</span>
          {dimensions.map((dim) => {
            const self = selfRatings[dim.name] || 0
            const gap = Math.abs(dim.score - self)
            const colors = gapColor(gap)
            return (
              <React.Fragment key={dim.name}>
                <span className="text-xs font-bold text-stone-600 truncate">{dim.name}</span>
                <span className="text-xs font-black text-stone-700 text-center w-12">{self}</span>
                <span className="text-xs font-black text-stone-700 text-center w-12">{dim.score}</span>
                <span className={`text-xs font-black text-center w-12 py-0.5 border ${colors.text} ${colors.bg} ${colors.border}`}>
                  {gap === 0 ? '0' : `${gap}`}
                </span>
              </React.Fragment>
            )
          })}
        </div>
      </div>
      <p className="text-sm text-stone-600 mt-3">
        Self-awareness score: <span className="font-black">{withinOne}/{dimensions.length}</span> dimensions within 1 point of the AI rating
      </p>
    </div>
  )
}

function DimensionScores({ dimensionData }) {
  const { dimensions, overall } = dimensionData
  return (
    <div className="mb-5">
      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Dimension Scores</span>
      <div className="mt-2 border-2 border-stone-400 bg-stone-100 p-3">
        <div className="space-y-2">
          {dimensions.map((dim, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-600 w-44 shrink-0 truncate">{dim.name}</span>
              <div className="flex-1 h-4 bg-stone-300 border border-stone-400 relative">
                <div
                  className={`h-full ${dimScoreColor(dim.score)}`}
                  style={{ width: `${dim.score * 10}%` }}
                />
              </div>
              <span className={`text-xs font-black w-8 text-right ${scoreColor(dim.score)}`}>{dim.score}</span>
            </div>
          ))}
        </div>
        {overall !== null && (
          <div className="mt-3 pt-3 border-t-2 border-stone-300 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Overall</span>
            <span className={`text-2xl font-black ${scoreColor(overall)}`}>{overall}/10</span>
          </div>
        )}
      </div>
    </div>
  )
}

function KeyConcepts({ hints }) {
  if (!hints || hints.length === 0) return null
  return (
    <div className="mt-6 border-l-4 border-sky-500 bg-sky-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">Concepts to consider for this scenario</p>
      <ul className="space-y-1.5">
        {hints.map((hint, i) => (
          <li key={i} className="text-stone-700 text-sm leading-relaxed flex items-start gap-2">
            <span className="text-sky-600 font-black mt-0.5 shrink-0">▢</span>
            <span>{hint}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeedbackDisplay({ text }) {
  const dimensionData = parseDimensionScores(text)
  const sections = parseFeedbackSections(text)

  // Fallback for gibberish/low-effort responses (no structured sections, no dimensions)
  if (sections.length <= 1 && !dimensionData) {
    // Try to surface a single SCORE line if present, otherwise render raw text
    const score = parseScore(text)
    return (
      <div className="space-y-2">
        {score !== null && (
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Score</span>
            <p className={`text-3xl font-black mt-1 ${scoreColor(score)}`}>{score}/10</p>
          </div>
        )}
        {text.split('\n').map((line, i) => {
          if (line.trim() === '') return <div key={i} className="h-2" />
          if (line.startsWith('- ')) {
            return <p key={i} className="text-stone-700 pl-4">{line.slice(2)}</p>
          }
          return <p key={i} className="text-stone-700">{line}</p>
        })}
      </div>
    )
  }

  // Qualitative-only render: STRENGTHS, GAPS, INTERVIEWER TIP. Hide dimensions,
  // score line, strong answer example, and calibration. The App orchestrates
  // when dimension scores and the curated model answer become visible.
  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const content = section.lines.filter((l) => l.trim() !== '')

        if (section.type === 'strengths') {
          return (
            <div key={i} className="border-l-4 border-green-600 bg-green-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">Strengths</p>
              {content.map((line, j) => (
                <p key={j} className="text-stone-700 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (section.type === 'gaps') {
          return (
            <div key={i} className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-yellow-700 mb-2">Gaps</p>
              {content.map((line, j) => (
                <p key={j} className="text-stone-700 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (section.type === 'tip') {
          return (
            <div key={i} className="border-l-4 border-stone-400 bg-stone-100 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Interviewer Tip</p>
              {content.map((line, j) => (
                <p key={j} className="text-stone-700 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        // Drop dimension score, strong answer example, calibration, and other
        // internal sections. Scores reveal after self-eval; example is replaced
        // by the curated modelAnswer behind the gate.
        return null
      })}
    </div>
  )
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('metrics')
  const [scenario, setScenario] = useState(() => randomScenario('metrics'))
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const [selfEvalRatings, setSelfEvalRatings] = useState(null)
  const [selfEvalComplete, setSelfEvalComplete] = useState(false)

  function handleCategorySelect(cat) {
    setSelectedCategory(cat.id)
    setScenario(randomScenario(cat.id))
    setAnswer('')
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
    setSelfEvalRatings(null)
    setSelfEvalComplete(false)
  }

  function handleNewScenario() {
    setScenario(randomScenario(selectedCategory))
    setAnswer('')
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
    setSelfEvalRatings(null)
    setSelfEvalComplete(false)
  }

  async function handleSubmit() {
    if (!answer.trim()) return
    setLoading(true)
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
    setSelfEvalRatings(null)
    setSelfEvalComplete(false)
    try {
      const result = await getAIFeedback(
        selectedCategory,
        scenario.scenario,
        answer,
        scenario.evaluationHints
      )
      setFeedback(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory)

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-3">
            <h1
              className="text-2xl md:text-3xl text-stone-800 tracking-wide"
              style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: '1.4' }}
            >
              PM Interview Prep
            </h1>
            <span className="mt-1 bg-[#5B8C3E] border-2 border-[#3d6129] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[1px_1px_0px_0px_rgba(61,97,41,0.5)]">
              Beta
            </span>
          </div>
          <p className="text-stone-500 text-sm mt-3">
            Practice product thinking with AI-powered feedback
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            {['15 Real Scenarios', '5-Dimension Scoring', 'Expert Model Answers'].map((label) => (
              <span
                key={label}
                className="bg-stone-200 border-2 border-stone-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-stone-600"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Category selector */}
        <div className="mb-8">
          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2.5 text-sm font-bold border-2 transition-colors duration-100
                  ${
                    selectedCategory === cat.id
                      ? 'bg-[#5B8C3E] text-white border-[#3d6129]'
                      : 'bg-stone-100 text-stone-600 border-stone-300 hover:border-[#5B8C3E] hover:text-stone-800'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="text-stone-500 text-sm mt-3">{activeCategory.description}</p>
        </div>

        {/* Scenario card */}
        <div className="bg-amber-100 border-3 border-stone-400 p-6 mb-5 shadow-[3px_3px_0px_0px_rgba(120,100,80,0.3)]" style={{ borderWidth: '3px' }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="font-bold text-stone-800 text-lg">{scenario.title}</h2>
            <button
              onClick={handleNewScenario}
              className="text-xs text-white whitespace-nowrap shrink-0 font-bold uppercase tracking-wide bg-[#8B6B4A] border-2 border-[#5C3D2E] px-3 py-1.5 hover:bg-[#9E7B56] transition-colors duration-100 shadow-[2px_2px_0px_0px_rgba(92,61,46,0.5)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              New scenario
            </button>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">{scenario.scenario}</p>
        </div>

        {/* Answer textarea */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={8}
          className="w-full bg-amber-100 border-2 border-stone-400 p-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#5B8C3E] focus:ring-2 focus:ring-[#5B8C3E]/30 resize-none"
        />

        {/* Submit */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className="px-6 py-2.5 bg-[#5B8C3E] text-white text-sm font-bold border-2 border-[#3d6129] hover:bg-[#4a7832] transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(61,97,41,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            {loading ? 'Evaluating...' : 'Get Feedback'}
          </button>
          {loading && (
            <span className="text-sm text-stone-500">This takes ~10 seconds</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 p-4 bg-red-100 border-2 border-red-400 text-sm text-red-800">
            {error}
          </div>
        )}

        {/* Feedback */}
        {feedback && (() => {
          const dimData = parseDimensionScores(feedback)
          const hasDimensions = dimData && dimData.dimensions.length > 0
          const showModelAnswerToggle = scenario.modelAnswer && (!hasDimensions || selfEvalComplete)

          return (
            <div className="mt-8 bg-amber-100 border-2 border-stone-400 p-6 shadow-[3px_3px_0px_0px_rgba(120,100,80,0.3)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-5">Feedback</h3>

              {/* Qualitative feedback only (strengths, gaps, tip). No scores yet. */}
              <FeedbackDisplay text={feedback} />

              {/* Self-evaluation gate -- only when dimensions parsed and not yet submitted */}
              {hasDimensions && !selfEvalComplete && (
                <SelfEvaluation
                  dimensions={dimData.dimensions}
                  onSubmit={(ratings) => {
                    setSelfEvalRatings(ratings)
                    setSelfEvalComplete(true)
                  }}
                />
              )}

              {/* Score reveal: dimension scores, comparison, key concepts */}
              {hasDimensions && selfEvalComplete && (
                <div className="mt-6 pt-4 border-t-2 border-stone-300">
                  <DimensionScores dimensionData={dimData} />
                  <ScoreComparison dimensions={dimData.dimensions} selfRatings={selfEvalRatings} />
                  <KeyConcepts hints={scenario.evaluationHints} />
                </div>
              )}

              {/* Model answer toggle -- after self-eval or in fallback mode */}
              {showModelAnswerToggle && (
                <div className="mt-6 pt-4 border-t-2 border-stone-300">
                  <button
                    onClick={() => setShowModelAnswer(!showModelAnswer)}
                    className="text-sm font-bold text-[#5B8C3E] hover:text-[#3d6129] transition-colors duration-100 flex items-center gap-2"
                  >
                    <span className="text-base leading-none">{showModelAnswer ? '▼' : '▶'}</span>
                    See a strong answer
                  </button>
                  {showModelAnswer && (
                    <div className="mt-4 bg-amber-50 border-2 border-stone-300 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Expert Answer</p>
                      <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">{scenario.modelAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })()}

        {/* Footer */}
        <div className="mt-16 border-t-2 border-stone-300" />
      </div>
    </div>
  )
}
