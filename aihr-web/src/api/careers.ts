import { brand, fallbackBenefits } from '@/config/brand'
import type { ApiResponse, ApplyPayload, CompanyInfo, Job, ResumeUploadResult } from '@/types'

const API_BASE = '/api'

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    })
  } catch {
    throw new Error('后端服务暂未启动，职位数据稍后即可同步。')
  }

  let payload: ApiResponse<T>
  try {
    payload = (await response.json()) as ApiResponse<T>
  } catch {
    throw new Error('后端服务暂未启动，职位数据稍后即可同步。')
  }

  if (!response.ok || payload.code !== 200) {
    throw new Error(payload.message || '服务暂不可用，请稍后再试')
  }

  return payload.data
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const data = await requestJson<CompanyInfo>('/public/company')
    return {
      ...data,
      name: data.name || brand.name,
      intro: data.intro || brand.tagline,
      benefits: data.benefits?.length ? data.benefits : fallbackBenefits,
    }
  } catch {
    return {
      name: brand.name,
      intro: brand.tagline,
      benefits: fallbackBenefits,
      contactEmail: brand.email,
      website: brand.website,
    }
  }
}

export async function getJobs(filters: {
  keyword?: string
  city?: string
  jobType?: string
}): Promise<Job[]> {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  const query = params.toString()
  return requestJson<Job[]>(`/public/jobs${query ? `?${query}` : ''}`)
}

export async function getJobDetail(jobId: string): Promise<Job> {
  return requestJson<Job>(`/public/jobs/${jobId}`)
}

export async function getCities(): Promise<string[]> {
  return requestJson<string[]>('/public/cities')
}

export async function checkApplied(jobId: number, phone: string): Promise<boolean> {
  const params = new URLSearchParams({ jobId: String(jobId), phone })
  return requestJson<boolean>(`/public/check-applied?${params.toString()}`)
}

export async function uploadResume(file: File): Promise<ResumeUploadResult> {
  const body = new FormData()
  body.append('file', file)

  let response: Response
  try {
    response = await fetch(`${API_BASE}/public/upload-resume`, {
      method: 'POST',
      body,
    })
  } catch {
    throw new Error('后端服务暂未启动，简历上传暂不可用。')
  }
  let payload: ApiResponse<ResumeUploadResult>
  try {
    payload = (await response.json()) as ApiResponse<ResumeUploadResult>
  } catch {
    throw new Error('后端服务暂未启动，简历上传暂不可用。')
  }

  if (!response.ok || payload.code !== 200) {
    throw new Error(payload.message || '简历上传失败，请稍后再试')
  }

  return payload.data
}

export async function applyJob(payload: ApplyPayload): Promise<number> {
  return requestJson<number>('/public/apply', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
