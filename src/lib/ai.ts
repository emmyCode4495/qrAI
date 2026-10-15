import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 * Best current model for document intelligence:
 * Claude 4 Sonnet / Opus (or Claude 3.5 Sonnet as fallback)
 * Excellent long-context understanding + reasoning.
 */
export const MODEL = 'claude-sonnet-4-20250514' // Update to latest Claude 4 when available

export async function analyzeDocument(
  documentText: string,
  userQuery?: string
) {
  const systemPrompt = `You are an expert Document Intelligence AI.
Your job is to extract structured information, answer questions, and provide insights from documents.

Always respond in valid JSON with this structure:
{
  "summary": "brief summary of the document",
  "document_type": "contract | invoice | report | letter | other",
  "key_fields": { "field_name": "value", ... },
  "entities": [{ "type": "person|organization|date|money|location", "value": "...", "context": "..." }],
  "risks_or_flags": ["any potential issues or important notes"],
  "answer": "direct answer to the user query if provided, otherwise null"
}`

  const userContent = userQuery
    ? `Document content:\n\n${documentText}\n\n---\nUser question: ${userQuery}`
    : `Document content:\n\n${documentText}\n\nExtract all key information.`

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userContent,
      },
    ],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from AI')
  }

  try {
    // Extract JSON from the response (Claude sometimes wraps it)
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    return JSON.parse(jsonMatch[0])
  } catch {
    return {
      summary: textBlock.text,
      document_type: 'unknown',
      key_fields: {},
      entities: [],
      risks_or_flags: [],
      answer: null,
      raw: textBlock.text,
    }
  }
}

export { anthropic }
