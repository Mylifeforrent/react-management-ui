import { Button, Card, List, Space, Typography } from 'antd'
import { lazy, Suspense, useState } from 'react'

const HeavyPanel = lazy(async () => ({
  default: () => <Card type='inner'>这个面板模拟图表/地图等重资源，只在需要时加载。</Card>
}))

export default function PerformanceDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 7：性能优化与工程实践'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Typography.Text>项目中对应路由懒加载、地图脚本按需加载、Vite manualChunks。</Typography.Text>
          <Button type='primary' onClick={() => setVisible(true)}>
            加载重资源
          </Button>
          {visible ? (
            <Suspense fallback='资源加载中...'>
              <HeavyPanel />
            </Suspense>
          ) : null}
          <List
            bordered
            dataSource={['React.lazy 拆页面', '按需加载地图 SDK', 'vendor chunk 分组', '构建体积检查']}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Space>
      </Card>
    </main>
  )
}
