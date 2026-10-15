export interface DocumentAnalysis {
  summary: string
  document_type: string
  key_fields: Record<string, string | number>
  entities: Array<{
    type: string
    value: string
    context?: string
  }>
  risks_or_flags: string[]
  answer: string | null
  raw?: string
}

export interface DocumentRecord {
  id: string
  user_id: string
  file_name: string
  file_path: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  analysis: DocumentAnalysis | null
  credits_used: number
  created_at: string
}
