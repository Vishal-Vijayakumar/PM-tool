import { EVALUATOR_PROMPTS } from '../prompts/evaluator'

const MODEL = 'meta/llama-3.3-70b-instruct'

function getBaseUrl() {
  if (import.meta.env.DEV) {
    return '/api/nvidia/chat/completions'
  }
  return '/api/feedback'
}

export async function getAIFeedback(category, scenarioText, userAnswer) {
  const systemPrompt = EVALUATOR_PROMPTS[category]
  const url = getBaseUrl()

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `Scenario:\n${scenarioText}\n\nCandidate's Answer:\n${userAnswer}`,
    },
  ]

  if (import.meta.env.DEV) {
    const apiKey = import.meta.env.VITE_NVIDIA_API_KEY
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.5,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`API error ${response.status}: ${err}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  // Production: call Vercel serverless function
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.5,
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`API error ${response.status}: ${err}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
