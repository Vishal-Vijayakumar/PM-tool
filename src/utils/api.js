const BASE_URL = '/api/nvidia'
const MODEL = 'meta/llama-3.3-70b-instruct'

export async function getAIFeedback(systemPrompt, scenarioText, userAnswer) {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Scenario:\n${scenarioText}\n\nCandidate's Answer:\n${userAnswer}`,
        },
      ],
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
