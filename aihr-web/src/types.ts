export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp?: number
}

export interface CompanyInfo {
  name: string
  logo?: string
  intro?: string
  benefits?: string[]
  contactEmail?: string
  address?: string
  scale?: string
  industry?: string
  website?: string
}

export interface Job {
  id: number
  title: string
  deptName?: string
  jobType?: string
  jobTypeName?: string
  city?: string
  address?: string
  salaryRange?: string
  education?: string
  experience?: string
  headcount?: number
  description?: string
  requirements?: string
  highlights?: string
  tags?: string[]
  urgent?: boolean
  publishDate?: string
  hrName?: string
}

export interface ApplyPayload {
  jobId: number
  name: string
  phone: string
  email?: string
  resumePath?: string
  resumeFileName?: string
  message?: string
}

export interface ResumeUploadResult {
  path: string
  fileName: string
}
