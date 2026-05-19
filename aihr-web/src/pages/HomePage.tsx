import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloudServerOutlined,
  FileSearchOutlined,
  LineChartOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCompanyInfo } from '@/api/careers'
import { brand, fallbackBenefits } from '@/config/brand'
import type { CompanyInfo } from '@/types'

const capabilities = [
  {
    icon: <FileSearchOutlined />,
    title: '职位与简历集中入口',
    text: '公开职位、候选人投递、简历文件上传集中在一个外部官网中完成。',
  },
  {
    icon: <TeamOutlined />,
    title: '候选人体验优先',
    text: '岗位信息、薪资、要求和投递状态提示清晰呈现，降低重复沟通成本。',
  },
  {
    icon: <LineChartOutlined />,
    title: 'AI招聘流程衔接',
    text: '为后续简历解析、匹配评分、面试管理保留完整数据流。',
  },
  {
    icon: <CloudServerOutlined />,
    title: '支持私有化部署',
    text: '适合中小企业、团队招聘站和内部人才入口使用。',
  },
]

const steps = ['发布职位', '筛选岗位', '上传简历', '投递入库', 'HR跟进']

export function HomePage() {
  const [company, setCompany] = useState<CompanyInfo>({
    name: brand.name,
    intro: brand.tagline,
    benefits: fallbackBenefits,
  })

  useEffect(() => {
    void getCompanyInfo().then(setCompany)
  }, [])

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <SafetyCertificateOutlined />
            AI招聘官网与职位投递入口
          </div>
          <h1>{company.name || brand.name}</h1>
          <p className="hero-lede">{company.intro || brand.tagline}</p>
          <div className="hero-actions">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              <Link to="/careers">查看开放职位</Link>
            </Button>
            <Button size="large" icon={<MessageOutlined />}>
              <Link to="/contact">联系 QQ {brand.qq}</Link>
            </Button>
          </div>
          <div className="benefit-row" aria-label="能力标签">
            {(company.benefits?.length ? company.benefits : fallbackBenefits).slice(0, 4).map((item) => (
              <Tag key={item} className="brand-tag">
                {item}
              </Tag>
            ))}
          </div>
        </div>

        <ProductVisual />
      </section>

      <section className="section-band">
        <div className="section-heading">
          <span>Core Capabilities</span>
          <h2>外部招聘入口先变成你的产品</h2>
          <p>第一版聚焦候选人看到的官网、职位列表和投递流程，让访问者从第一屏开始识别 AIHR智聘。</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.title}>
              <div className="capability-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-section">
        <div className="section-heading compact">
          <span>Hiring Flow</span>
          <h2>从公开职位到候选人入库</h2>
        </div>
        <div className="flow-rail">
          {steps.map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-strip" id="contact">
        <div>
          <span>Contact</span>
          <h2>需要部署、定制或试用，直接联系 QQ</h2>
          <p>咨询入口统一通过 QQ 处理，方便同步部署需求、试用安排和功能建议。</p>
        </div>
        <Button type="primary" size="large" icon={<MessageOutlined />} href={`tencent://message/?uin=${brand.qq}`}>
          QQ {brand.qq}
        </Button>
      </section>
    </main>
  )
}

function ProductVisual() {
  return (
    <div className="product-visual" aria-label="AIHR智聘产品界面预览">
      <div className="product-topbar">
        <span />
        <span />
        <span />
        <strong>招聘工作台</strong>
      </div>
      <div className="product-body">
        <aside className="product-menu">
          <span className="active">职位</span>
          <span>简历</span>
          <span>候选人</span>
          <span>面试</span>
        </aside>
        <div className="product-main">
          <div className="metric-row">
            <div>
              <small>开放职位</small>
              <strong>18</strong>
            </div>
            <div>
              <small>今日投递</small>
              <strong>42</strong>
            </div>
            <div>
              <small>AI匹配</small>
              <strong>91%</strong>
            </div>
          </div>
          <div className="pipeline">
            <span style={{ height: '42%' }} />
            <span style={{ height: '68%' }} />
            <span style={{ height: '54%' }} />
            <span style={{ height: '83%' }} />
            <span style={{ height: '61%' }} />
          </div>
          <div className="candidate-line">
            <CheckCircleOutlined />
            <div>
              <strong>高级前端工程师</strong>
              <small>上海 · React · 匹配度 88%</small>
            </div>
          </div>
          <div className="candidate-line muted">
            <CheckCircleOutlined />
            <div>
              <strong>AI产品经理</strong>
              <small>远程 · 大模型 · 匹配度 92%</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
