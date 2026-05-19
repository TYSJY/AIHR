import { GithubOutlined, MessageOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { brand } from './config/brand'
import { CareersPage } from './pages/CareersPage'
import { AiDemoPage } from './pages/AiDemoPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { JobDetailPage } from './pages/JobDetailPage'

const { Header, Content, Footer } = Layout

export function RootApp() {
  return (
    <Layout className="site-shell">
      <Header className="site-header">
        <Link className="brand-lockup" to="/" aria-label={`${brand.name} 首页`}>
          <span className="brand-mark">AI</span>
          <span>
            <strong>{brand.name}</strong>
            <small>Smart Hiring</small>
          </span>
        </Link>

        <nav className="top-nav" aria-label="主导航">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/ai">AI能力</NavLink>
          <NavLink to="/careers">职位</NavLink>
          <NavLink to="/contact">联系</NavLink>
        </nav>

        <Button className="header-contact" icon={<MessageOutlined />} href={`tencent://message/?uin=${brand.qq}`}>
          QQ {brand.qq}
        </Button>
      </Header>

      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai" element={<AiDemoPage />} />
          <Route path="/ai-demo" element={<AiDemoPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:jobId" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Content>

      <Footer className="site-footer">
        <div>
          <strong>{brand.name}</strong>
          <span>让招聘入口更清晰，让候选人体验更稳妥。</span>
        </div>
        <div className="footer-links">
          <span>QQ: {brand.qq}</span>
          <span className="license-line">
            <GithubOutlined /> {brand.licenseNote}
          </span>
        </div>
      </Footer>
    </Layout>
  )
}
