import { Button, Card, List, Space, Typography } from 'antd'
import { create } from 'zustand'

interface DemoStore {
  token: string
  logs: string[]
  login: () => void
  requestProfile: () => void
}

const useDemoStore = create<DemoStore>(set => ({
  token: '',
  logs: [],
  login: () => set(state => ({ token: 'mock-token', logs: state.logs.concat('写入 token') })),
  requestProfile: () => set(state => ({ logs: state.logs.concat('携带 token 请求 /users/getUserInfo') }))
}))

export default function StateDataDemo() {
  const { token, logs, login, requestProfile } = useDemoStore()

  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 3：状态管理与数据流'>
        <Typography.Paragraph>Zustand 管理全局状态，request 层读取 token 并发起接口请求。</Typography.Paragraph>
        <Space>
          <Button type='primary' onClick={login}>
            登录
          </Button>
          <Button onClick={requestProfile} disabled={!token}>
            获取用户信息
          </Button>
        </Space>
        <List
          style={{ marginTop: 20 }}
          header={`当前 token：${token || '未登录'}`}
          bordered
          dataSource={logs}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Card>
    </main>
  )
}
