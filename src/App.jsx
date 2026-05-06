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

function FeedbackBlock({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="font-semibold text-gray-900 mt-4 first:mt-0">
              {line.replace(/\*\*/g, '')}
            </p>
          )
        }
        if (/^\*\*.*\*\*/.test(line)) {
          return (
            <p key={i} className="font-semibold text-gray-900 mt-4">
              {line.replace(/\*\*/g, '')}
            </p>
          )
        }
        if (line.startsWith('- ')) {
          return (
            <p key={i} className="text-gray-700 pl-4">
              • {line.slice(2)}
            </p>
          )
        }
        if (line.trim() === '') return <div key={i} className="h-1" />
        return (
          <p key={i} className="text-gray-700">
            {line}
          </p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">PM Interview Prep</h1>
          <p className="text-gray-500 text-sm mt-1">
            Practice product thinking with AI-powered feedback
          </p>
        </div>

        {/* Category selector */}
        <div className="mb-6">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 rounded text-sm font-medium border transition-none
                  ${
                    selectedCategory === cat.id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-2">{activeCategory.description}</p>
        </div>

        {/* Scenario card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="font-semibold text-gray-900">{scenario.title}</h2>
            <button
              onClick={handleNewScenario}
              className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap shrink-0"
            >
              New scenario →
            </button>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{scenario.scenario}</p>
        </div>

        {/* Answer textarea */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={8}
          className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none bg-white"
        />

        {/* Submit */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Evaluating...' : 'Get Feedback'}
          </button>
          {loading && (
            <span className="text-sm text-gray-400">This takes ~10 seconds</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Feedback</h3>
            <FeedbackBlock text={feedback} />
          </div>
        )}
      </div>
    </div>
  )
}
