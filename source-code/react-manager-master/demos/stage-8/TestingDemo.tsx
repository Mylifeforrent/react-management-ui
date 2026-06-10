import { Card, Checkbox, List, Progress, Typography } from 'antd'
import { useState } from 'react'

const checks = ['yarn lint', 'yarn test', 'yarn build', 'GitHub Actions CI']

export default function TestingDemo() {
  const [selected, setSelected] = useState<string[]>(['yarn lint'])

  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 8：测试与质量保障'>
        <Typography.Paragraph>质量保障由本地脚本和 CI 共同完成，先小步验证，再进入集成流程。</Typography.Paragraph>
        <Checkbox.Group value={selected} onChange={value => setSelected(value.map(String))}>
          <List
            bordered
            dataSource={checks}
            renderItem={item => (
              <List.Item>
                <Checkbox value={item}>{item}</Checkbox>
              </List.Item>
            )}
          />
        </Checkbox.Group>
        <Progress style={{ marginTop: 20 }} percent={Math.round((selected.length / checks.length) * 100)} />
      </Card>
    </main>
  )
}
