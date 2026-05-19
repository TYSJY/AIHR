import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { brand } from '@/config/brand'

export function ContactPage() {
  return (
    <main className="page-wrap">
      <section className="page-hero contact-hero">
        <span>Contact</span>
        <h1>联系 AIHR智聘</h1>
        <p>部署、试用、定制和功能建议都可以通过 QQ 联系。</p>
      </section>

      <section className="contact-panel contact-panel-only">
        <div className="contact-primary">
          <MessageOutlined />
          <div>
            <span>QQ咨询</span>
            <strong>{brand.qq}</strong>
            <p>部署、试用、定制、功能建议都可以通过这个 QQ 联系。</p>
          </div>
        </div>
        <Button type="primary" size="large" href={`tencent://message/?uin=${brand.qq}`}>
          打开 QQ 咨询
        </Button>
      </section>
    </main>
  )
}
