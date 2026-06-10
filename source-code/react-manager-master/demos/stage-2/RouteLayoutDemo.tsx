import { Layout, Menu, Typography } from 'antd'
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'

const { Header, Sider, Content } = Layout

function Shell() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: '#fff', height: 48, lineHeight: '48px', paddingLeft: 16 }}>React Manager</div>
        <Menu
          theme='dark'
          mode='inline'
          items={[
            { key: '/demos/stage-2/index.html', label: <Link to='/demos/stage-2/index.html'>首页</Link> },
            { key: '/demos/stage-2/dashboard', label: <Link to='/demos/stage-2/dashboard'>工作台</Link> }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>阶段 2：路由与页面布局体系</Header>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: '/demos/stage-2',
    element: <Shell />,
    children: [
      {
        path: 'index.html',
        element: <Typography.Title level={3}>欢迎页：由嵌套路由渲染</Typography.Title>
      },
      {
        path: 'dashboard',
        element: <Typography.Title level={3}>工作台：菜单点击切换页面</Typography.Title>
      }
    ]
  }
])

export default function RouteLayoutDemo() {
  return <RouterProvider router={router} />
}
