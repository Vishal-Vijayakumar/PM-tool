import { useState } from 'react'
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
  if (score >= 7) return 'text-green-700'
  if (score >= 4) return 'text-yellow-700'
  return 'text-red-700'
}

function FeedbackDisplay({ text }) {
  const sections = parseFeedbackSections(text)

  if (sections.length <= 1) {
    return (
      <div className="space-y-2">
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

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const content = section.lines.filter((l) => l.trim() !== '')

        if (section.type === 'score') {
          const scoreText = content.join(' ')
          const score = parseScore(scoreText)
          return (
            <div key={i} className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Score</span>
              <p className={`text-3xl font-black mt-1 ${score !== null ? scoreColor(score) : 'text-stone-800'}`}>
                {scoreText || 'N/A'}
              </p>
            </div>
          )
        }

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

        if (section.type === 'example') {
          return (
            <div key={i} className="border-l-4 border-sky-500 bg-sky-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">Strong Answer Example</p>
              {content.map((line, j) => (
                <p key={j} className="text-stone-700 text-sm leading-relaxed italic">
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

        if (content.length === 0) return null
        return (
          <div key={i}>
            {content.map((line, j) => (
              <p key={j} className="text-stone-700 text-sm">{line}</p>
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
  const [showModelAnswer, setShowModelAnswer] = useState(false)

  function handleCategorySelect(cat) {
    setSelectedCategory(cat.id)
    setScenario(randomScenario(cat.id))
    setAnswer('')
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
  }

  function handleNewScenario() {
    setScenario(randomScenario(selectedCategory))
    setAnswer('')
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
  }

  async function handleSubmit() {
    if (!answer.trim()) return
    setLoading(true)
    setFeedback(null)
    setError(null)
    setShowModelAnswer(false)
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
          <h1
            className="text-2xl md:text-3xl text-stone-800 tracking-wide"
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: '1.4' }}
          >
            PM Interview Prep
          </h1>
          <p className="text-stone-500 text-sm mt-3">
            Practice product thinking with AI-powered feedback
          </p>
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
              className="text-xs text-[#5B8C3E] hover:text-[#3d6129] whitespace-nowrap shrink-0 font-bold uppercase tracking-wide transition-colors duration-100"
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
        {feedback && (
          <div className="mt-8 bg-amber-100 border-2 border-stone-400 p-6 shadow-[3px_3px_0px_0px_rgba(120,100,80,0.3)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-5">Feedback</h3>
            <FeedbackDisplay text={feedback} />

            {/* Model Answer toggle */}
            {scenario.modelAnswer && (
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
        )}

        {/* Footer */}
        <div className="mt-16 pt-4 border-t-2 border-stone-300">
          <p className="text-center text-xs text-stone-400">
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/vishal-vijay-x0x/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B8C3E] hover:text-[#3d6129] transition-colors duration-100"
            >
              Vishal Vijayakumar
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
