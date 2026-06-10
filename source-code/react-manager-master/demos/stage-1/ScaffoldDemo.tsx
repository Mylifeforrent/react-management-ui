import { Card, Descriptions, Space, Tag, Typography } from 'antd'

const stack = [
  ['React', '18.2.0'],
  ['Vite', '6.4.3'],
  ['TypeScript', '5.9.3'],
  ['Ant Design', '5.6.1'],
  ['Zustand', '4.3.8']
]

export default function ScaffoldDemo() {
  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 1：项目脚手架与工程化基础'>
        <Typography.Paragraph>
          本 demo 演示一个 Vite React 项目的最小入口：HTML 容器、React root、TypeScript 组件和依赖脚本。
        </Typography.Paragraph>
        <Descriptions bordered column={1} title='工程链路'>
          <Descriptions.Item label='入口 HTML'>demos/stage-1/index.html</Descriptions.Item>
          <Descriptions.Item label='React 入口'>demos/stage-1/main.tsx</Descriptions.Item>
          <Descriptions.Item label='运行命令'>yarn demo:stage-1</Descriptions.Item>
        </Descriptions>
        <Space style={{ marginTop: 20 }} wrap>
          {stack.map(([name, version]) => (
            <Tag color='blue' key={name}>
              {name} {version}
            </Tag>
          ))}
        </Space>
      </Card>
    </main>
  )
}
