import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import './styles.css'
import { RootApp } from './RootApp'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#0f766e',
          colorInfo: '#0f766e',
          colorSuccess: '#15803d',
          colorWarning: '#d97706',
          borderRadius: 8,
          fontFamily:
            '"Noto Sans SC", "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif',
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 8,
          },
        },
      }}
    >
      <BrowserRouter>
        <RootApp />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
