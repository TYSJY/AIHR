import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  SendOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Descriptions, Form, Input, Skeleton, Tag, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { applyJob, checkApplied, getJobDetail, uploadResume } from '@/api/careers'
import type { ApplyPayload, Job, ResumeUploadResult } from '@/types'

const { Dragger } = Upload
const { TextArea } = Input

interface ApplyFormValues {
  name: string
  phone: string
  email?: string
  message?: string
}

export function JobDetailPage() {
  const { jobId } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [resume, setResume] = useState<ResumeUploadResult | null>(null)
  const [form] = Form.useForm<ApplyFormValues>()

  useEffect(() => {
    if (!jobId) return
    setLoading(true)
    void getJobDetail(jobId)
      .then(setJob)
      .catch((err) => message.error(err instanceof Error ? err.message : '职位详情加载失败'))
      .finally(() => setLoading(false))
  }, [jobId])

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: '.pdf,.doc,.docx',
    beforeUpload: async (file) => {
      try {
        const result = await uploadResume(file)
        setResume(result)
        message.success('简历上传成功')
      } catch (err) {
        setResume(null)
        message.error(err instanceof Error ? err.message : '简历上传失败')
      }
      return Upload.LIST_IGNORE
    },
  }

  const handleSubmit = async (values: ApplyFormValues) => {
    if (!job) return
    setSubmitting(true)
    try {
      const alreadyApplied = await checkApplied(job.id, values.phone)
      if (alreadyApplied) {
        message.warning('你已经投递过该职位，请勿重复投递。')
        return
      }

      const payload: ApplyPayload = {
        jobId: job.id,
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        resumePath: resume?.path,
        resumeFileName: resume?.fileName,
      }
      await applyJob(payload)
      message.success('投递成功，HR 将尽快处理你的简历。')
      form.resetFields()
      setResume(null)
    } catch (err) {
      message.error(err instanceof Error ? err.message : '投递失败，请稍后再试')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="page-wrap detail-layout">
        <Skeleton active paragraph={{ rows: 10 }} />
      </main>
    )
  }

  if (!job) {
    return (
      <main className="page-wrap">
        <div className="empty-detail">
          <h1>职位不存在或已关闭</h1>
          <Button type="primary">
            <Link to="/careers">返回职位列表</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="page-wrap detail-layout">
      <section className="job-detail-main">
        <Button type="text" icon={<ArrowLeftOutlined />}>
          <Link to="/careers">返回职位列表</Link>
        </Button>
        <div className="detail-title">
          <div>
            <h1>{job.title}</h1>
            <p>
              <EnvironmentOutlined /> {job.city || '城市待定'} · {job.deptName || '招聘团队'}
            </p>
          </div>
          {job.urgent && <Tag color="error">急招</Tag>}
        </div>

        <Descriptions className="job-descriptions" column={{ xs: 1, sm: 2, md: 4 }}>
          <Descriptions.Item label="薪资">{job.salaryRange || '面议'}</Descriptions.Item>
          <Descriptions.Item label="经验">{job.experience || '不限'}</Descriptions.Item>
          <Descriptions.Item label="学历">{job.education || '不限'}</Descriptions.Item>
          <Descriptions.Item label="人数">{job.headcount ? `${job.headcount}人` : '若干'}</Descriptions.Item>
        </Descriptions>

        <ArticleBlock title="职位亮点" content={job.highlights} fallback="该职位亮点会由招聘团队持续补充。" />
        <ArticleBlock title="岗位职责" content={job.description} fallback="职位职责暂未填写，可先提交简历沟通。" />
        <ArticleBlock title="任职要求" content={job.requirements} fallback="任职要求暂未填写，可先提交简历沟通。" />

        <div className="tag-row large">
          {(job.tags ?? []).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>

      <aside className="apply-panel">
        <div className="apply-head">
          <span>Apply Now</span>
          <h2>投递这个职位</h2>
          <p>请填写真实联系方式，简历上传支持 PDF、DOC、DOCX。</p>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input size="large" placeholder="你的姓名" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input size="large" placeholder="用于 HR 联系和重复投递校验" />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input size="large" placeholder="可选" />
          </Form.Item>

          <Dragger {...uploadProps} className="resume-uploader">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{resume ? resume.fileName : '点击或拖拽上传简历'}</p>
            <p className="ant-upload-hint">文件上传成功后会随投递一起提交</p>
          </Dragger>

          <Form.Item name="message" label="留言">
            <TextArea rows={4} placeholder="可补充到岗时间、期望方向或其他说明" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" icon={<SendOutlined />} loading={submitting}>
            提交投递
          </Button>
        </Form>

        <div className="apply-note">
          <TeamOutlined />
          <span>投递后将进入候选人库，招聘团队会根据岗位匹配度跟进。</span>
        </div>
        <div className="apply-note">
          <CalendarOutlined />
          <span>请勿重复投递同一职位，系统会自动校验手机号。</span>
        </div>
      </aside>
    </main>
  )
}

function ArticleBlock({ title, content, fallback }: { title: string; content?: string; fallback: string }) {
  const lines = (content || fallback)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <section className="article-block">
      <h2>{title}</h2>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
  )
}
