import {
  ApartmentOutlined,
  AuditOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileSearchOutlined,
  MessageOutlined,
  RadarChartOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Alert, Button, Input, Progress, Segmented, Tag, Timeline, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAIStatus, type AIStatus } from '@/api/ai'
import { brand } from '@/config/brand'

const { TextArea } = Input

type DemoMode = 'resume' | 'match' | 'jd' | 'interview'

const initialInputs: Record<DemoMode, string> = {
  resume:
    '候选人：张晨，5年前端经验，主导过 React + TypeScript 中后台系统重构；熟悉组件库建设、性能优化、权限模型。最近项目负责招聘 SaaS 的候选人看板和投递流程。',
  match:
    '岗位：高级前端工程师，需要 React、TypeScript、复杂表单、数据可视化、候选人体验优化经验。候选人：张晨，5年前端经验，做过招聘 SaaS 和组件库建设。',
  jd:
    '职位：AI招聘产品经理。要求：熟悉招聘流程，理解大模型应用，能把简历解析、职位匹配、面试评估做成产品闭环。',
  interview:
    '面试对象：AI产品经理候选人。背景：3年 B 端 SaaS 产品经验，做过人才库、职位发布和数据看板，对大模型提示词和评估流程有实践。',
}

const demos: Record<
  DemoMode,
  {
    eyebrow: string
    title: string
    summary: string
    inputLabel: string
    button: string
    scoreLabel: string
    score: number
    resultTitle: string
    insights: string[]
    tags: string[]
  }
> = {
  resume: {
    eyebrow: 'AI Resume',
    title: 'AI简历解析',
    summary: '把候选人简历拆成画像、技能、经历、风险点和可检索标签，进入统一人才库。',
    inputLabel: '粘贴简历文本或候选人摘要',
    button: '生成解析结果',
    scoreLabel: '资料完整度',
    score: 88,
    resultTitle: '结构化候选人画像',
    insights: [
      '候选人画像：5年前端工程师，偏中后台、招聘 SaaS、组件库方向。',
      '核心技能：React、TypeScript、权限模型、复杂表单、性能优化。',
      '经验亮点：具备从投递入口到候选人看板的完整招聘产品理解。',
      '待确认项：团队规模、最近一年核心指标、可到岗周期。',
    ],
    tags: ['React', 'TypeScript', 'SaaS', '组件库', '招聘系统'],
  },
  match: {
    eyebrow: 'AI Matching',
    title: 'AI职位匹配',
    summary: '把岗位要求与候选人经历做语义匹配，给出综合分、优势、短板和跟进建议。',
    inputLabel: '输入岗位要求与候选人摘要',
    button: '生成匹配分析',
    scoreLabel: '岗位匹配度',
    score: 92,
    resultTitle: '匹配评分与推荐理由',
    insights: [
      '综合建议：推荐进入一面，候选人与岗位职责高度贴合。',
      '匹配优势：招聘 SaaS 场景经验、React 技术栈、复杂业务表单能力。',
      '潜在短板：需要确认数据可视化深度和跨团队推动经验。',
      'HR动作：优先安排技术面，并补问候选人对 AI 招聘流程的理解。',
    ],
    tags: ['推荐一面', '高匹配', '需补问可视化', '候选人体验'],
  },
  jd: {
    eyebrow: 'AI Recruiting',
    title: 'AI招聘文案生成',
    summary: '基于业务目标生成职位 JD、任职要求、招聘亮点和候选人沟通话术。',
    inputLabel: '输入职位名称、业务目标和要求',
    button: '生成招聘内容',
    scoreLabel: 'JD可发布度',
    score: 86,
    resultTitle: 'AI生成职位草案',
    insights: [
      '职位定位：负责 AIHR 智聘中 AI 招聘能力的产品规划与落地。',
      '核心职责：设计简历解析、职位匹配、面试题生成、招聘看板等关键流程。',
      '任职要求：熟悉 B 端 SaaS、招聘业务或人才管理流程，能与算法和工程协作。',
      '招聘亮点：参与 AI 时代人力资源系统从 0 到 1 的产品建设。',
    ],
    tags: ['职位定位', '职责生成', '要求拆解', '候选人话术'],
  },
  interview: {
    eyebrow: 'AI Interview',
    title: 'AI面试问题生成',
    summary: '根据岗位、简历和匹配结论生成结构化面试题，让面试更聚焦。',
    inputLabel: '输入岗位与候选人背景',
    button: '生成面试题',
    scoreLabel: '面试覆盖度',
    score: 90,
    resultTitle: '结构化面试题建议',
    insights: [
      '请描述你如何把简历解析能力转化为 HR 可理解、可操作的产品流程。',
      '如果候选人与岗位匹配度只有 65%，你会如何设计解释与复核机制？',
      '你如何评估 AI 面试题生成是否真的提升了面试质量？',
      '当模型输出与 HR 判断冲突时，产品应该如何呈现风险和决策权？',
    ],
    tags: ['业务理解', 'AI评估', '流程设计', '风险控制'],
  },
}

const processSteps = [
  { icon: <ApartmentOutlined />, title: 'AI招聘入口', text: '官网、职位、投递表单沉淀候选人数据。' },
  { icon: <FileSearchOutlined />, title: 'AI简历解析', text: '自动抽取画像、技能、经历和可检索标签。' },
  { icon: <RadarChartOutlined />, title: 'AI职位匹配', text: '对岗位要求和候选人经历做语义评分。' },
  { icon: <AuditOutlined />, title: 'AI面试协同', text: '生成面试题、关注点和反馈结构。' },
  { icon: <BulbOutlined />, title: 'AIHR系统闭环', text: '把招聘决策、人才库和数据看板串起来。' },
]

const metrics = [
  { label: '简历解析', value: '30秒', note: '从文本到结构化画像' },
  { label: '匹配建议', value: '92%', note: '岗位语义匹配评分' },
  { label: '面试题库', value: '12题', note: '按岗位自动生成' },
  { label: '招聘闭环', value: '5步', note: '从入口到决策看板' },
]

export function AiDemoPage() {
  const [mode, setMode] = useState<DemoMode>('resume')
  const [inputs, setInputs] = useState(initialInputs)
  const [status, setStatus] = useState<AIStatus | null>(null)
  const [statusLoading, setStatusLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [demoVersion, setDemoVersion] = useState(1)

  const current = demos[mode]
  const segmentedOptions = useMemo(
    () => [
      { label: 'AI简历', value: 'resume' },
      { label: 'AI匹配', value: 'match' },
      { label: 'AI招聘', value: 'jd' },
      { label: 'AI面试', value: 'interview' },
    ],
    [],
  )

  useEffect(() => {
    void getAIStatus()
      .then(setStatus)
      .catch(() =>
        setStatus({
          configured: false,
          message: 'AI服务配置接口暂未开放给官网，当前已启用客户演示模式。',
        }),
      )
      .finally(() => setStatusLoading(false))
  }, [])

  const runDemo = () => {
    setRunning(true)
    window.setTimeout(() => {
      setRunning(false)
      setDemoVersion((value) => value + 1)
      message.success(`${current.title}演示结果已刷新`)
    }, 520)
  }

  const statusText = status?.configured
    ? `已接入 ${status.currentProvider || 'AI服务'}`
    : 'AI服务待配置，当前为演示模式'

  return (
    <main className="ai-page">
      <section className="ai-hero">
        <div className="ai-hero-copy">
          <div className="eyebrow">
            <RobotOutlined />
            AIHR Operating System
          </div>
          <h1>AI时代下的人力资源系统</h1>
          <p>
            AIHR智聘把 AI简历、AI招聘、AI面试和人才决策连接成一套可演示、可部署、可扩展的智能招聘流程。
          </p>
          <div className="hero-actions">
            <Button type="primary" size="large" icon={<ThunderboltOutlined />} onClick={runDemo}>
              运行AI演示
            </Button>
            <Button size="large" icon={<MessageOutlined />}>
              <Link to="/contact">联系 QQ {brand.qq}</Link>
            </Button>
          </div>
        </div>

        <div className="ai-command-center" aria-label="AIHR智能招聘指挥舱">
          <div className="ai-command-head">
            <span>AIHR智能招聘指挥舱</span>
            <Tag color={status?.configured ? 'success' : 'warning'}>{statusLoading ? '检测中' : statusText}</Tag>
          </div>
          <div className="ai-metric-grid">
            {metrics.map((item) => (
              <div key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
          <div className="ai-signal-board">
            <div>
              <span style={{ height: '48%' }} />
              <span style={{ height: '76%' }} />
              <span style={{ height: '62%' }} />
              <span style={{ height: '88%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '94%' }} />
            </div>
            <aside>
              <strong>AI建议</strong>
              <p>优先推进高级前端与AI产品经理岗位，候选人池质量高于近30日均值。</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="ai-status-strip">
        <Alert
          showIcon
          type={status?.configured ? 'success' : 'warning'}
          message={statusText}
          description={
            status?.configured
              ? '检测到后端已有AI配置，后续可将演示按钮切换为真实AI解析、生成与匹配接口。'
              : status?.message || '配置AI Key后，可把当前演示流程接入真实大模型服务。'
          }
        />
      </section>

      <section className="ai-flow-section">
        <div className="section-heading compact">
          <span>AI Full Flow</span>
          <h2>从职位发布到面试决策的一条线</h2>
          <p>客户看到的不只是“有 AI”，而是一套清晰的人力资源智能化流程。</p>
        </div>
        <div className="ai-process-grid">
          {processSteps.map((step, index) => (
            <article className="ai-process-card" key={step.title}>
              <div className="capability-icon">{step.icon}</div>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-demo-section">
        <div className="section-heading compact">
          <span>Live Demo</span>
          <h2>客户演示入口</h2>
          <p>选择一个 AI 场景，页面会展示输入、推理过程和输出结果；当前不依赖真实 Key，也能完整演示产品价值。</p>
        </div>

        <div className="ai-demo-toolbar">
          <Segmented
            block
            options={segmentedOptions}
            value={mode}
            onChange={(value) => setMode(value as DemoMode)}
          />
        </div>

        <div className="ai-demo-workspace">
          <section className="ai-input-panel">
            <div>
              <span>{current.eyebrow}</span>
              <h3>{current.title}</h3>
              <p>{current.summary}</p>
            </div>
            <label>{current.inputLabel}</label>
            <TextArea
              value={inputs[mode]}
              onChange={(event) =>
                setInputs((value) => ({
                  ...value,
                  [mode]: event.target.value,
                }))
              }
              autoSize={{ minRows: 7, maxRows: 10 }}
            />
            <Button type="primary" size="large" icon={<SendOutlined />} loading={running} onClick={runDemo}>
              {current.button}
            </Button>
          </section>

          <section className="ai-result-panel" aria-live="polite">
            <div className="ai-result-head">
              <div>
                <span>Result #{demoVersion}</span>
                <h3>{current.resultTitle}</h3>
              </div>
              <CheckCircleOutlined />
            </div>
            <div className="ai-score-row">
              <Progress type="circle" percent={current.score} size={112} strokeColor="#0f766e" />
              <div>
                <strong>{current.scoreLabel}</strong>
                <p>演示结果会保持稳定，便于向客户讲解流程；接入真实接口后可根据实际输入实时生成。</p>
              </div>
            </div>
            <Timeline
              className="ai-result-timeline"
              items={current.insights.map((item) => ({
                dot: <ClockCircleOutlined />,
                children: item,
              }))}
            />
            <div className="tag-row">
              {current.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="ai-contact-band">
        <div>
          <span>
            <SafetyCertificateOutlined /> AIHR System
          </span>
          <h2>用一套 AIHR 系统讲完整的人力资源智能化故事</h2>
          <p>官网负责获客展示，职位页承接投递，AI页面展示能力闭环，后续后台再承接配置、人才库、面试和看板。</p>
        </div>
        <Button type="primary" size="large">
          <Link to="/careers">查看招聘入口</Link>
        </Button>
      </section>
    </main>
  )
}
