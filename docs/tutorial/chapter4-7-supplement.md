# 第四章到第七章详细内容补充

本文档是对HTML教程的补充，包含第4-7章的详细代码示例和讲解。

## 第四章: React Router路由系统（补充内容）

### 4.1 BrowserRouter vs HashRouter对比

| 特性 | BrowserRouter | HashRouter |
|------|--------------|------------|
| URL格式 | /about, /user/123 | /#/about, /#/user/123 |
| 服务器配置 | 需要配置 | 不需要 |
| 美观度 | ✅ 更clean | ❌ 有#号 |
| SEO友好 | ✅ 更好 | ❌ 较差 |
| 适用场景 | 现代应用（推荐） | 静态文件托管 |

**Nginx配置示例：**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 4.2 完整路由配置（含所有页面）

```tsx
// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Layout from '@/layout'
import AuthLoader from './AuthLoader'
import { lazyLoad } from './LazyLoad'
import RouteError from './RouteError'

export const router = [
  // 根路径重定向
  {
    path: '/',
    element: <Navigate to="/welcome" />
  },
  
  // 登录页（独立布局）
  {
    path: '/login',
    element: <Login />
  },
  
  // 主布局（带侧边栏和头部）
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,      // 路由守卫：验证权限
    errorElement: <RouteError />,  // 错误边界
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard')))
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept')))
      },
      {
        path: '/menuList',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu')))
      },
      {
        path: '/roleList',
        element: lazyLoad(React.lazy(() => import('@/views/system/role')))
      },
      {
        path: '/orderList',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderList')))
      },
      {
        path: '/cluster',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderCluster')))
      },
      {
        path: '/driverList',
        element: lazyLoad(React.lazy(() => import('@/views/order/DriverList')))
      }
    ]
  },
  
  // 404页面
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default createBrowserRouter(router)
```

### 4.3 路由守卫实现

```tsx
// src/router/AuthLoader.tsx
import { redirect } from 'react-router-dom'
import storage from '@/utils/storage'
import api from '@/api'

export interface IAuthLoader {
  menuPathList: string[]  // 用户可访问的路径列表
  buttonList: string[]   // 用户可用的按钮权限
}

/**
 * 路由守卫Loader
 * 在路由切换前验证权限
 */
export default async function AuthLoader() {
  const token = storage.get('token')
  
  // 未登录跳转到登录页
  if (!token) {
    return redirect(`/login?callback=${encodeURIComponent(location.href)}`)
  }
  
  try {
    // 获取用户权限信息
    const data = await api.getPermissionList()
    
    // 返回权限数据供子组件使用
    return {
      menuPathList: data.menuList.map(item => item.path),
      buttonList: data.buttonList
    } as IAuthLoader
  } catch (error) {
    // 获取权限失败，清除token并跳转登录
    storage.remove('token')
    return redirect('/login')
  }
}
```

### 4.4 动态路由参数

```tsx
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

// 动态路由: /order/:orderId
function OrderDetail() {
  const { orderId } = useParams()
  
  return <div>订单ID: {orderId}</div>
}

// 查询参数: /userList?page=1&size=10
function UserList() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const size = searchParams.get('size')
  
  return <div>第{page}页，每页{size}条</div>
}

// 编程式导航
function UserForm() {
  const navigate = useNavigate()
  
  const handleSubmit = async (values) => {
    await api.userCreate(values)
    message.success('创建成功')
    
    // 方式1: 简单跳转
    navigate('/userList')
    
    // 方式2: 带状态跳转
    navigate('/userList', { state: { from: 'create' } })
    
    // 方式3: 返回上一页
    navigate(-1)
  }
  
  return <Form onFinish={handleSubmit} />
}
```

---

## 第五章: API请求封装（补充内容）

### 5.1 Axios完整封装

```typescript
// src/utils/request.ts
import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import { getMockResponse } from '@/mock'

// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 显示loading
    if (config.showLoading) showLoading()
    
    // 添加Token
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    
    // 环境配置（支持Mock模式）
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    
    // Blob类型直接返回（用于文件下载）
    if (response.config.responseType === 'blob') {
      return response as never
    }
    
    // Token过期处理
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      // 根据配置决定是否显示错误
      if (response.config.showError === false) {
        return Promise.resolve(data) as never
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    
    return data.data as never
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

const defaultOptions: Required<IConfig> = {
  showLoading: true,
  showError: true
}

// Mock模式支持
const requestMock = async <T>(
  url: string, 
  method: 'get' | 'post', 
  params?: object, 
  options: IConfig = defaultOptions
) => {
  if (options.showLoading) showLoading()
  const data = await getMockResponse<T>(url, method, params as Record<string, unknown> | undefined)
  hideLoading()
  
  if (data.code !== 0) {
    if (options.showError === false) return data as T
    message.error(data.msg)
    return Promise.reject(data)
  }
  return data.data
}

export default {
  get<T>(url: string, params?: object, options: IConfig = defaultOptions): Promise<T> {
    if (env.mock) return requestMock<T>(url, 'get', params, options)
    return instance.get(url, { params, ...options }) as Promise<T>
  },
  
  post<T>(url: string, params?: object, options: IConfig = defaultOptions): Promise<T> {
    if (env.mock) return requestMock<T>(url, 'post', params, options)
    return instance.post(url, params, options) as Promise<T>
  },
  
  // 文件下载
  downloadFile(url: string, data: object, fileName = 'fileName.xlsx') {
    if (env.mock) {
      // Mock模式下导出JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json;charset=utf-8'
      })
      const link = document.createElement('a')
      link.download = fileName.replace(/\.xlsx$/, '.json')
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
      return
    }
    
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
```

### 5.2 API接口统一管理

```typescript
// src/api/index.ts
import request from '@/utils/request'
import { Login, User, Dept, Role, MenuType, OrderType, ResultData } from '../types/api'

export default {
  /* ===== 认证相关 ===== */
  
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },
  
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  
  // 获取用户权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: MenuType.MenuItem[] }>('/users/getPermissionList')
  },

  /* ===== Dashboard统计 ===== */
  
  // 获取折线图数据
  getLineData() {
    return request.get<OrderType.LineData>('/order/dashboard/getLineData')
  },
  
  // 获取饼图数据
  getPieCityData() {
    return request.get<OrderType.PieData[]>('/order/dashboard/getPieCityData')
  },
  
  getPieAgeData() {
    return request.get<OrderType.PieData[]>('/order/dashboard/getPieCityData')
  },
  
  // 获取雷达图数据
  getRadarData() {
    return request.get<OrderType.RadarData>('/order/dashboard/getRadarData')
  },
  
  // 获取统计数据
  getReportData() {
    return request.get<OrderType.ReportData>('/order/dashboard/getReportData')
  },

  /* ===== 用户管理 ===== */
  
  // 获取用户列表（分页）
  getUserList(params?: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  
  // 获取全量用户列表
  getAllUserList(params?: User.Params) {
    return request.get<User.UserItem[]>('/users/all/list', params)
  },
  
  // 用户添加
  userCreate(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  
  // 用户编辑
  userEdit(params: User.CreateParams) {
    return request.post('/users/edit', params)
  },
  
  // 用户删除
  userDel(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  /* ===== 部门管理 ===== */
  
  getDeptList(params: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  
  delDeptById(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },

  /* ===== 菜单管理 ===== */
  
  getMenuList(params: MenuType.Params = {}) {
    return request.get<MenuType.MenuItem[]>('/menu/list', params)
  },
  
  createMenu(params: MenuType.CreateParams) {
    return request.post('/menu/create', params)
  },
  
  editMenu(params: MenuType.EditParams) {
    return request.post('/menu/edit', params)
  },
  
  delMenuById(params: MenuType.DelParams) {
    return request.post('/menu/delete', params)
  },

  /* ===== 角色管理 ===== */
  
  getRoleAllList() {
    return request.get<Role.RoleItem[]>('/roles/allList', {})
  },
  
  getRoleList(params: Role.Params) {
    return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
  },
  
  createRole(params: Role.CreateParams) {
    return request.post('/roles/create', params)
  },
  
  editRole(params: Role.EditParams) {
    return request.post('/roles/edit', params)
  },
  
  delRoleById(params: { _id: string }) {
    return request.post('/roles/delete', params)
  },
  
  updatePermission(params: Role.CreatePermission) {
    return request.post('/roles/update/permission', params)
  },

  /* ===== 订单管理 ===== */
  
  getVehicleList() {
    return request.get<OrderType.DictItem[]>('/order/vehicleList')
  },
  
  getCityList() {
    return request.get<OrderType.DictItem[]>('/order/cityList')
  },
  
  getOrderList(params: OrderType.OrderSearchParams) {
    return request.get<OrderType.OrderData<OrderType.OrderItem>>('/order/list', params)
  },
  
  createOrder(params: OrderType.OrderItem) {
    return request.post('/order/create', params)
  },
  
  updateOrderInfo(params: OrderType.OrderRoute) {
    return request.post('/order/edit', params)
  },
  
  getOrderDetail(orderId: string) {
    return request.get<OrderType.OrderItem>(`/order/detail/${orderId}`)
  },
  
  deleteOrder(params: { _id: string }) {
    return request.post('/order/delete', params)
  },
  
  getOrderCluster(cityId: number) {
    return request.get<Array<{ lng: string; lat: string }>>(`/order/cluster/${cityId}`)
  },
  
  getDriverList(params: { driverName: string; accountStatus: number }) {
    return request.get<OrderType.OrderData<OrderType.DriverItem>>(`/order/driver/list`, params)
  },
  
  // 文件流导出
  orderExport(data: OrderType.OrderSearchParams) {
    request.downloadFile('/order/orderExport', data)
  }
}
```

### 5.3 Loading全局控制

```typescript
// src/utils/loading.ts
import { Spin } from 'antd'

let loadingCount = 0
let loadingInstance: any = null

export function showLoading() {
  if (loadingCount === 0) {
    loadingInstance = Spin.loading({
      tip: '加载中...',
      duration: 0
    })
  }
  loadingCount++
}

export function hideLoading() {
  loadingCount--
  if (loadingCount <= 0) {
    loadingInstance?.remove()
    loadingCount = 0
  }
}
```

---

## 第六章: 登录认证系统（补充内容）

### 6.1 登录表单完整实现

```tsx
// src/views/login/Login.tsx
import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useStore } from '@/store'

export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)
  
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      
      // 存储Token
      storage.set('token', data)
      updateToken(data)
      
      message.success('登录成功')
      
      // 获取回调地址并跳转
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form 
          name='basic' 
          initialValues={{ remember: true }} 
          onFinish={onFinish} 
          autoComplete='off'
        >
          <Form.Item 
            name='userName' 
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item 
            name='userPwd' 
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button 
              type='primary' 
              block 
              htmlType='submit' 
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
```

### 6.2 Token存储与管理

```typescript
// src/utils/storage.ts
class Storage {
  // 设置
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  // 获取
  get(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }
  
  // 删除
  remove(key: string) {
    localStorage.removeItem(key)
  }
  
  // 清空
  clear() {
    localStorage.clear()
  }
}

export default new Storage()
```

### 6.3 Layout中权限验证

```tsx
// src/layout/index.tsx
import React, { useEffect } from 'react'
import { Layout, theme, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'
import TabsFC from '@/components/Tabs'

const { Sider } = Layout

type AppRoute = {
  path?: string
  meta?: {
    auth?: boolean
  }
  children?: AppRoute[]
}

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo } = useStore()
  const { pathname } = useLocation()
  
  useEffect(() => {
    getUserInfo()
  }, [])
  
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router as unknown as AppRoute[])
  
  if (route && route.meta?.auth === false) {
    // 公开路由，无需权限验证
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Watermark content='React'>
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Menu />
          </Sider>
          <Layout>
            <NavHeader />
            <TabsFC />
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet></Outlet>
              </div>
              <NavFooter />
            </div>
          </Layout>
        </Layout>
      ) : null}
    </Watermark>
  )
}

export default App
```

### 6.4 登录安全最佳实践

1. **密码加密传输**：使用HTTPS或前端加密
2. **Token过期处理**：自动刷新或重新登录
3. **防XSS攻击**：Token存储在HttpOnly Cookie中更佳
4. **防CSRF攻击**：添加CSRF Token验证
5. **登录失败限制**：防止暴力破解

详见：[前端登录安全方案](../guides/06-security/前端登录安全方案.md)

---

## 第七章: UI组件库与主题（补充内容）

### 7.1 Ant Design 5.x集成

```tsx
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App'
import './index.css'

// 设置中文locale
dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
```

### 7.2 CSS Module样式隔离

```less
// src/views/login/index.module.less
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .loginWrapper {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
  }
}
```

```tsx
// 使用CSS Module
import styles from './index.module.less'

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        {/* 类名会被hash处理，避免冲突 */}
      </div>
    </div>
  )
}
```

### 7.3 主题定制

```tsx
// main.tsx - 自定义主题
import { ConfigProvider, theme } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
        fontSize: 14
      }
    }}
  >
    <App />
  </ConfigProvider>
)
```

### 7.4 全局Message和Notification

```typescript
// src/utils/AntdGlobal.ts
import { message, notification, Modal } from 'antd'

export { message, notification, Modal }

// 使用示例
message.success('操作成功')
message.error('操作失败')

notification.success({
  message: '通知标题',
  description: '通知内容'
})

Modal.confirm({
  title: '确认删除',
  content: '确定要删除此项吗？',
  onOk: () => {
    // 确认操作
  }
})
```

---

## 学习建议

1. **循序渐进**：按照章节顺序学习，不要跳章
2. **动手实践**：每个代码示例都要亲自敲一遍
3. **理解原理**：不仅要看代码，更要理解为什么这样写
4. **查阅文档**：遇到问题及时查看官方文档
5. **总结归纳**：学完一章后做笔记总结

祝学习顺利！🎉
