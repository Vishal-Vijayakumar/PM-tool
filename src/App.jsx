import { useState } from 'react'
import { scenarios } from './data/scenarios'
import { getAIFeedback } from './utils/api'

const CATEGORIES = [
  { id: 'metrics', label: 'Metrics Definition', description: 'Define how you would measure success for a product feature' },
  { id: 'prioritization', label: 'Prioritization', description: 'Choose what to build next when you cannot do everything' },
  { id: 'tradeoffs', label: 'Tradeoff Analysis', description: 'Analyze a product decision where every option has a cost' },
]

const ACCENT = {
  bg: 'bg-red-600',
  bgHover: 'hover:bg-red-500',
  text: 'text-red-500',
  border: 'border-red-500',
  borderHover: 'hover:border-red-500',
  ring: 'focus:ring-red-500/40',
  shadow: 'shadow-[0_0_15px_rgba(220,38,38,0.15)]',
}

function randomScenario(category) {
  const pool = scenarios.filter((s) => s.category === category)
  return pool[Math.floor(Math.random() * pool.length)]
}

function parseFeedbackSections(text) {
  const sections = []
  const lines = text.split('\n')
  let currentSection = null
  let currentLines = []

  for (const line of lines) {
    const headerMatch = line.match(/^(?:\*\*)?(?:SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP)[:\s]/i)
      || line.match(/^(?:\*\*)?(?:SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP)(?:\*\*)?$/i)

    if (headerMatch) {
      if (currentSection || currentLines.length > 0) {
        sections.push({ type: currentSection, lines: currentLines })
      }
      const cleaned = line.replace(/\*\*/g, '').trim()
      if (/^SCORE/i.test(cleaned)) currentSection = 'score'
      else if (/^STRENGTHS/i.test(cleaned)) currentSection = 'strengths'
      else if (/^GAPS/i.test(cleaned)) currentSection = 'gaps'
      else if (/^STRONG ANSWER/i.test(cleaned)) currentSection = 'example'
      else if (/^INTERVIEWER TIP/i.test(cleaned)) currentSection = 'tip'
      else currentSection = 'other'

      const remainder = cleaned.replace(/^(SCORE|STRENGTHS|GAPS|STRONG ANSWER EXAMPLE|INTERVIEWER TIP)[:\s]*/i, '').trim()
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
  if (score >= 7) return 'text-emerald-400'
  if (score >= 4) return 'text-amber-400'
  return 'text-red-400'
}

function FeedbackDisplay({ text }) {
  const sections = parseFeedbackSections(text)

  if (sections.length <= 1) {
    return (
      <div className="space-y-2">
        {text.split('\n').map((line, i) => {
          if (line.trim() === '') return <div key={i} className="h-2" />
          if (line.startsWith('- ')) {
            return <p key={i} className="text-gray-300 pl-4">{line.slice(2)}</p>
          }
          return <p key={i} className="text-gray-300">{line}</p>
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const content = section.lines.filter((l) => l.trim() !== '')

        if (section.type === 'score') {
          const scoreText = content.join(' ')
          const score = parseScore(scoreText)
          return (
            <div key={i} className="mb-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Score</span>
              <p className={`text-3xl font-bold mt-1 ${score !== null ? scoreColor(score) : 'text-white'}`}>
                {scoreText || 'N/A'}
              </p>
            </div>
          )
        }

        if (section.type === 'strengths') {
          return (
            <div key={i} className="border-l-2 border-emerald-500/60 bg-slate-800/50 rounded-sm p-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-2">Strengths</p>
              {content.map((line, j) => (
                <p key={j} className="text-gray-300 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (section.type === 'gaps') {
          return (
            <div key={i} className="border-l-2 border-amber-500/60 bg-slate-800/50 rounded-sm p-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">Gaps</p>
              {content.map((line, j) => (
                <p key={j} className="text-gray-300 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (section.type === 'example') {
          return (
            <div key={i} className={`border-l-2 ${ACCENT.border} bg-slate-800/50 rounded-sm p-4`}>
              <p className={`text-xs font-semibold tracking-widest uppercase ${ACCENT.text} mb-2`}>Strong Answer Example</p>
              {content.map((line, j) => (
                <p key={j} className="text-gray-300 text-sm leading-relaxed italic">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (section.type === 'tip') {
          return (
            <div key={i} className="bg-slate-700/40 border border-slate-600/50 rounded-sm p-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Interviewer Tip</p>
              {content.map((line, j) => (
                <p key={j} className="text-gray-300 text-sm leading-relaxed">
                  {line.startsWith('- ') ? line.slice(2) : line}
                </p>
              ))}
            </div>
          )
        }

        if (content.length === 0) return null
        return (
          <div key={i}>
            {content.map((line, j) => (
              <p key={j} className="text-gray-300 text-sm">{line}</p>
            ))}
          </div>
        )
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

  function handleCategorySelect(cat) {
    setSelectedCategory(cat.id)
    setScenario(randomScenario(cat.id))
    setAnswer('')
    setFeedback(null)
    setError(null)
  }

  function handleNewScenario() {
    setScenario(randomScenario(selectedCategory))
    setAnswer('')
    setFeedback(null)
    setError(null)
  }

  async function handleSubmit() {
    if (!answer.trim()) return
    setLoading(true)
    setFeedback(null)
    setError(null)
    try {
      const result = await getAIFeedback(
        selectedCategory,
        scenario.scenario,
        answer
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-white">
            PM Interview Prep
          </h1>
          <p className="text-gray-500 text-sm mt-2 tracking-wide uppercase">
            Practice product thinking with AI-powered feedback
          </p>
        </div>

        {/* Category selector */}
        <div className="mb-8">
          <div className="flex gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-colors duration-150
                  ${
                    selectedCategory === cat.id
                      ? `${ACCENT.bg} text-white border-transparent ${ACCENT.shadow}`
                      : `bg-transparent text-gray-400 border-slate-700 ${ACCENT.borderHover} hover:text-gray-200`
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-3 tracking-wide">{activeCategory.description}</p>
        </div>

        {/* Scenario card */}
        <div className={`bg-slate-800 border-l-2 ${ACCENT.border} rounded-sm p-6 mb-5`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="font-bold text-white text-lg">{scenario.title}</h2>
            <button
              onClick={handleNewScenario}
              className={`text-xs ${ACCENT.text} hover:text-red-400 whitespace-nowrap shrink-0 font-medium tracking-wide uppercase transition-colors duration-150`}
            >
              New scenario
            </button>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{scenario.scenario}</p>
        </div>

        {/* Answer textarea */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={8}
          className={`w-full bg-slate-800 border border-slate-700 rounded-sm p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:ring-1 ${ACCENT.ring} resize-none`}
        />

        {/* Submit */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className={`px-5 py-2.5 ${ACCENT.bg} text-white text-sm font-bold rounded-sm ${ACCENT.bgHover} transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed tracking-wide uppercase`}
          >
            {loading ? 'Evaluating...' : 'Get Feedback'}
          </button>
          {loading && (
            <span className="text-sm text-gray-500">This takes ~10 seconds</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 p-4 bg-red-950/50 border border-red-800/50 rounded-sm text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-sm p-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">Feedback</h3>
            <FeedbackDisplay text={feedback} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-4 border-t border-slate-800">
          <p className="text-center text-xs text-gray-600">
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/vishal-vijay-x0x/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${ACCENT.text} hover:text-red-400 transition-colors duration-150`}
            >
              Vishal Vijayakumar
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
