import { EnvironmentOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Empty, Input, Select, Skeleton, Tag } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCities, getJobs } from '@/api/careers'
import type { Job } from '@/types'

const jobTypes = [
  { label: '全部类型', value: '' },
  { label: '全职', value: 'full_time' },
  { label: '兼职', value: 'part_time' },
  { label: '实习', value: 'intern' },
]

export function CareersPage() {
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('')
  const [jobType, setJobType] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cityOptions = useMemo(
    () => [{ label: '全部城市', value: '' }, ...cities.map((item) => ({ label: item, value: item }))],
    [cities],
  )

  const loadJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getJobs({ keyword, city, jobType })
      setJobs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '职位加载失败')
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getCities().then(setCities).catch(() => setCities([]))
  }, [])

  useEffect(() => {
    void loadJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="page-wrap">
      <section className="page-hero compact-hero">
        <span>Open Roles</span>
        <h1>开放职位</h1>
        <p>筛选适合你的岗位，上传简历后会进入 AIHR智聘候选人流程。</p>
      </section>

      <section className="filter-panel">
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="搜索职位、职责或关键词"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onPressEnter={loadJobs}
          allowClear
        />
        <Select size="large" value={city} options={cityOptions} onChange={setCity} />
        <Select size="large" value={jobType} options={jobTypes} onChange={setJobType} />
        <Button size="large" type="primary" icon={<SearchOutlined />} onClick={loadJobs}>
          筛选
        </Button>
      </section>

      {error && (
        <div className="inline-alert">
          <span>{error}</span>
          <Button icon={<ReloadOutlined />} onClick={loadJobs}>
            重试
          </Button>
        </div>
      )}

      {loading ? (
        <div className="job-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="job-card" key={index}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      ) : jobs.length ? (
        <div className="job-grid">
          {jobs.map((job) => (
            <Link className="job-card" key={job.id} to={`/careers/${job.id}`}>
              <div className="job-card-head">
                <div>
                  <h2>{job.title}</h2>
                  <p>
                    <EnvironmentOutlined /> {job.city || '城市待定'} · {job.deptName || '招聘团队'}
                  </p>
                </div>
                {job.urgent && <Tag color="error">急招</Tag>}
              </div>
              <div className="job-meta">
                <span>{job.salaryRange || '薪资面议'}</span>
                <span>{job.experience || '经验不限'}</span>
                <span>{job.education || '学历不限'}</span>
              </div>
              <p className="job-summary">{job.highlights || job.description || '欢迎了解这个职位的详细要求。'}</p>
              <div className="tag-row">
                {(job.tags ?? []).slice(0, 4).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty
          className="empty-state"
          description="暂时没有匹配的职位，可以更换关键词或稍后再来。"
        />
      )}
    </main>
  )
}
