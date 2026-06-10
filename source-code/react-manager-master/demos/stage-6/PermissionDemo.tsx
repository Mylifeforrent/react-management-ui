import { Button, Card, Result, Space, Tag } from 'antd'
import { useState } from 'react'

const buttonList = ['user@create', 'order@export']

function PermissionButton({ auth, children }: { auth: string; children: string }) {
  if (!buttonList.includes(auth)) return null
  return <Button type='primary'>{children}</Button>
}

export default function PermissionDemo() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return (
      <Result
        status='403'
        title='需要登录'
        subTitle='路由 loader 可以在进入页面前检查 token 与菜单权限。'
        extra={<Button onClick={() => setLoggedIn(true)}>模拟登录</Button>}
      />
    )
  }

  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 6：权限控制与安全'>
        <Space direction='vertical'>
          <Tag color='green'>已加载权限：{buttonList.join('、')}</Tag>
          <Space>
            <PermissionButton auth='user@create'>新增用户</PermissionButton>
            <PermissionButton auth='user@delete'>删除用户</PermissionButton>
            <PermissionButton auth='order@export'>导出订单</PermissionButton>
          </Space>
        </Space>
      </Card>
    </main>
  )
}
