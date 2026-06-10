import { Button, Card, ConfigProvider, Form, Input, Space, Switch, theme } from 'antd'
import { useState } from 'react'

export default function DesignSystemDemo() {
  const [dark, setDark] = useState(false)

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#ed6c00', borderRadius: 6 },
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <main style={{ padding: 24, minHeight: '100vh', background: dark ? '#000' : '#f5f7fb' }}>
        <Card
          title='阶段 4：UI 组件库与设计系统'
          extra={<Switch checked={dark} checkedChildren='暗色' unCheckedChildren='亮色' onChange={setDark} />}
        >
          <Form layout='inline'>
            <Form.Item label='用户名称'>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type='primary'>搜索</Button>
                <Button>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </ConfigProvider>
  )
}
