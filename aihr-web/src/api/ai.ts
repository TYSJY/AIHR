import type { ApiResponse } from '@/types'

const API_BASE = '/api'

export interface AIStatus {
  configured: boolean
  currentProvider?: string
  message?: string
}

export async function getAIStatus(): Promise<AIStatus> {
  const response = await fetch(`${API_BASE}/ai/config/status`)
  const payload = (await response.json()) as ApiResponse<AIStatus>

  if (!response.ok || payload.code !== 200) {
    throw new Error(payload.message || 'AI服务状态暂不可用')
  }

  return payload.data
}
