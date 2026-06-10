# 第八章到第十五章详细内容补充

本文档是对HTML教程的补充，包含第8-15章的详细代码示例和讲解。

---

## 第八章: Zustand状态管理（补充内容）

### 8.1 为什么选择Zustand？

| 特性 | Redux | MobX | Zustand |
|------|-------|------|---------|
| 学习曲线 | 陡峭 | 中等 | 平缓 |
| 样板代码 | 多 | 少 | 极少 |
| TypeScript支持 | ✅ | ✅ | ✅ |
| 性能 | 好 | 好 | 优秀 |
| 包体积 | 大 | 中 | 小(1KB) |
| DevTools | ✅ | ✅ | ✅ |

**Zustand优势：**
- 🎯 API简洁，几行代码即可创建store
- 🚀 无需Provider包裹，直接导入使用
- ⚡️ 支持选择性订阅，避免不必要的重渲染
- 🔧 完美支持TypeScript

### 8.2 创建Store

```typescript
// src/store/index.ts
import { create } from 'zustand'
import { User } from '@/types/api'
import storage from '@/utils/storage'

export const useStore = create<{
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  isDark: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}>(set => ({
  // 初始状态
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  collapsed: false,
  isDark: storage.get('isDark') || false,
  
  // Actions
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateCollapsed: () =>
    set(state => ({
      collapsed: !state.collapsed
    }))
}))
```

### 8.3 在组件中使用

```tsx
// 方式1: 获取整个state
const store = useStore()
console.log(store.token, store.userInfo)

// 方式2: 选择性订阅（推荐，性能更好）
const token = useStore(state => state.token)
const userInfo = useStore(state => state.userInfo)
const updateToken = useStore(state => state.updateToken)

// 登录成功后更新token
const handleLogin = async (values) => {
  const data = await api.login(values)
  updateToken(data)  // 直接调用action
}
```

### 8.4 持久化存储

```typescript
// 结合localStorage实现持久化
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      token: '',
      userInfo: {},
      updateToken: (token) => set({ token }),
      updateUserInfo: (userInfo) => set({ userInfo })
    }),
    {
      name: 'app-storage', // localStorage的key
      partialize: (state) => ({ 
        token: state.token,
        userInfo: state.userInfo 
      }) // 只持久化部分字段
    }
  )
)
```

### 8.5 异步Actions

```typescript
export const useStore = create((set, get) => ({
  userList: [],
  loading: false,
  
  // 异步action
  fetchUsers: async () => {
    set({ loading: true })
    try {
      const users = await api.getUserList()
      set({ userList: users, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  }
}))

// 组件中使用
const { userList, fetchUsers } = useStore()
useEffect(() => {
  fetchUsers()
}, [])
```

---

## 第九章: 工作台Dashboard（补充内容）

### 9.1 ECharts集成

```bash
npm install echarts
```

### 9.2 自定义useCharts Hook

```typescript
// src/hook/useCharts.ts
import { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

export function useCharts() {
  const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null)
  const [chartInstance, setChartInstance] = useState<EChartsType>()

  useEffect(() => {
    if (chartRef) {
      const chart = echarts.init(chartRef)
      setChartInstance(chart)
      
      // 窗口resize时重新计算图表大小
      const handleResize = () => chart.resize()
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        chart.dispose()
      }
    }
  }, [chartRef])

  return [setChartRef, chartInstance] as const
}
```

### 9.3 Dashboard完整实现

```tsx
// src/views/dashboard/index.tsx
import { useStore } from '@/store'
import { formatDate, formatNum, formatMoney, formatState } from '@/utils'
import { Descriptions, Card, Button } from 'antd'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import api from '@/api'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function DashBoard() {
  const userInfo = useStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard.ReportData>()

  // 初始化各种图表
  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()
  
  useEffect(() => {
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  // 加载折线图数据
  const renderLineChart = async () => {
    if (!lineChart) return
    const data = await api.getLineData()
    lineChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }

  // 加载饼图 - 城市分布
  const renderPieChart1 = async () => {
    if (!pieChart1) return
    const data = await api.getPieCityData()
    pieChart1.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data
        }
      ]
    })
  }

  // 统计卡片数据
  useEffect(() => {
    getReportData()
  }, [])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  return (
    <div className={styles.dashboard}>
      {/* 用户信息 */}
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} className={styles.userImg} />
        <Descriptions title='欢迎新同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      
      {/* 统计卡片 */}
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      
      {/* 折线图 */}
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      
      {/* 饼图 */}
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={() => {
              renderPieChart1()
              renderPieChart2()
            }}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
```

### 9.4 数据格式化工具

```typescript
// src/utils/format.ts

// 日期格式化
export function formatDate(date: string | number) {
  if (!date) return '-'
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// 数字格式化
export function formatNum(num?: number) {
  if (num === undefined || num === null) return '0'
  return num.toLocaleString()
}

// 金额格式化
export function formatMoney(money?: number) {
  if (money === undefined || money === null) return '0.00'
  return money.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 状态映射
export function formatState(state: number) {
  return {
    1: '在职',
    2: '离职',
    3: '试用期'
  }[state] || '未知'
}
```

---

## 第十章: 用户管理模块（补充内容）

### 10.1 ahooks useAntdTable

```bash
npm install ahooks
```

### 10.2 完整的用户列表页面

```tsx
// src/views/system/user/index.tsx
import { PageParams, User } from '@/types/api'
import { Button, Table, Form, Input, Select, Space, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton'
import SearchForm from '@/components/SearchForm'

export default function UserList() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()

  // 获取表格数据
  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number }, 
    formData: User.SearchParams
  ) => {
    return api
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }

  // useAntdTable自动处理分页、搜索、loading
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  // 批量删除
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  // 执行删除
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({ userIds: ids })
      message.success('删除成功')
      setUserIds([])
      search.reset()
    } catch {
      message.error('删除失败，请稍后重试')
    }
  }

  // 表格列定义
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render(record: User.UserItem) {
        return (
          <Space>
            <AuthButton auth='user@edit' type='text' onClick={() => handleEdit(record)}>
              编辑
            </AuthButton>
            <AuthButton auth='user@delete' type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </AuthButton>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='user-list'>
      {/* 搜索表单 */}
      <SearchForm 
        form={form} 
        initialValues={{ state: 1 }} 
        submit={search.submit} 
        reset={search.reset}
      >
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </SearchForm>
      
      {/* 表格区域 */}
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton auth='user@create' type='primary' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        
        <Table
          bordered
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          columns={columns}
          {...tableProps}
        />
      </div>
      
      {/* 创建/编辑弹框 */}
      <CreateUser
        mRef={userRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}
```

### 10.3 搜索表单封装

```tsx
// src/components/SearchForm.tsx
import { Form, Button, Space } from 'antd'
import type { ReactNode } from 'react'

interface SearchFormProps {
  form: any
  children: ReactNode
  initialValues?: Record<string, any>
  submit: () => void
  reset: () => void
}

export default function SearchForm({ 
  form, 
  children, 
  initialValues,
  submit, 
  reset 
}: SearchFormProps) {
  return (
    <div className='search-form'>
      <Form
        form={form}
        initialValues={initialValues}
        layout='inline'
      >
        {children}
        <Form.Item>
          <Space>
            <Button type='primary' onClick={submit}>
              搜索
            </Button>
            <Button onClick={reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
```

### 10.4 创建/编辑用户弹框

```tsx
// src/views/system/user/CreateUser.tsx
import { forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Select, Upload, message } from 'antd'
import type { User } from '@/types/api'
import type { IAction } from '@/types/modal'
import api from '@/api'
import { UploadOutlined } from '@ant-design/icons'

interface CreateUserProps {
  mRef: any
  update: () => void
}

const CreateUser = forwardRef(({ mRef, update }: CreateUserProps, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [userId, setUserId] = useState<number>()

  useImperativeHandle(ref, () => ({
    open: (type: IAction, data?: User.UserItem) => {
      setAction(type)
      setVisible(true)
      if (type === 'edit' && data) {
        setUserId(data.userId)
        form.setFieldsValue(data)
      } else {
        form.resetFields()
      }
    }
  }))

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (action === 'create') {
        await api.userCreate(values)
        message.success('创建成功')
      } else {
        await api.userEdit({ ...values, userId })
        message.success('更新成功')
      }
      setVisible(false)
      update()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      width={600}
    >
      <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item 
          name='userName' 
          label='用户名'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        
        <Form.Item 
          name='userEmail' 
          label='邮箱'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱格式' }
          ]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        
        <Form.Item name='mobile' label='手机号'>
          <Input placeholder='请输入手机号' />
        </Form.Item>
        
        <Form.Item name='job' label='岗位'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        
        <Form.Item name='state' label='状态' initialValue={1}>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default CreateUser
```

---

## 第十一章: 部门管理模块（补充内容）

### 11.1 树形数据结构

```typescript
// 部门接口类型定义
export namespace Dept {
  export interface Params {
    deptName?: string
  }
  
  export interface CreateParams {
    parentId?: string
    deptName: string
    userName: string
  }
  
  export interface EditParams extends CreateParams {
    _id: string
  }
  
  export interface DelParams {
    _id: string
  }
  
  export interface DeptItem extends CreateParams {
    _id: string
    children?: DeptItem[]  // 树形子节点
  }
}
```

### 11.2 Tree组件实现

```tsx
// src/views/system/dept/index.tsx
import { useState } from 'react'
import { Tree, Button, Form, Input, Modal, Space } from 'antd'
import type { DataNode } from 'antd/es/tree'
import api from '@/api'
import { message } from '@/utils/AntdGlobal'
import CreateDept from './CreateDept'
import { IAction } from '@/types/modal'
import { useRef } from 'react'

export default function DeptList() {
  const [deptList, setDeptList] = useState<DataNode[]>([])
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const deptRef = useRef<{
    open: (type: IAction, data?: any) => void
  }>()

  // 获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptList({ deptName: searchValue })
    // 转换为Tree需要的格式
    const treeData = convertToTreeData(data)
    setDeptList(treeData)
  }

  // 数据转换
  const convertToTreeData = (data: any[]): DataNode[] => {
    return data.map(item => ({
      title: item.deptName,
      key: item._id,
      children: item.children ? convertToTreeData(item.children) : undefined
    }))
  }

  // 创建部门
  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  // 编辑部门
  const handleEdit = (node: DataNode) => {
    deptRef.current?.open('edit', node)
  }

  // 删除部门
  const handleDelete = (node: DataNode) => {
    Modal.confirm({
      title: '删除确认',
      content: '确认删除该部门吗？',
      onOk: async () => {
        await api.delDeptById({ _id: node.key as string })
        message.success('删除成功')
        getDeptList()
      }
    })
  }

  useEffect(() => {
    getDeptList()
  }, [])

  return (
    <div className='dept-list'>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门管理</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增部门
            </Button>
          </div>
        </div>
        
        <Input.Search
          placeholder='搜索部门'
          allowClear
          style={{ marginBottom: 16 }}
          onChange={e => setSearchValue(e.target.value)}
          onSearch={getDeptList}
        />
        
        <Tree
          treeData={deptList}
          expandedKeys={expandedKeys}
          onExpand={keys => setExpandedKeys(keys)}
          actionRender={(node) => (
            <Space>
              <Button type='link' size='small' onClick={() => handleEdit(node)}>
                编辑
              </Button>
              <Button type='link' size='small' danger onClick={() => handleDelete(node)}>
                删除
              </Button>
            </Space>
          )}
        />
      </div>
      
      <CreateDept
        mRef={deptRef}
        update={getDeptList}
      />
    </div>
  )
}
```

### 11.3 递归渲染树形结构

```tsx
// 手动递归渲染（不使用Tree组件）
function DeptTree({ data, level = 0 }) {
  return (
    <div style={{ paddingLeft: level * 20 }}>
      {data.map(item => (
        <div key={item._id}>
          <div className='dept-node'>
            <span>{item.deptName}</span>
            <Space>
              <Button size='small'>编辑</Button>
              <Button size='small'>添加子部门</Button>
            </Space>
          </div>
          
          {/* 递归渲染子节点 */}
          {item.children && item.children.length > 0 && (
            <DeptTree data={item.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## 第十二章: 菜单管理模块（补充内容）

### 12.1 动态菜单渲染

```tsx
// src/components/Menu/index.tsx
import { Menu as AntdMenu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '@/api'
import type { MenuType } from '@/types/api'
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  MenuOutlined,
  SafetyOutlined,
  ShoppingCartOutlined,
  ClusterOutlined
} from '@ant-design/icons'

// 图标映射
const iconMap: Record<string, any> = {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  MenuOutlined,
  SafetyOutlined,
  ShoppingCartOutlined,
  ClusterOutlined
}

export default function Menu() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuList, setMenuList] = useState<MenuType.MenuItem[]>([])

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }

  // 递归渲染菜单
  const renderMenu = (menus: MenuType.MenuItem[]) => {
    return menus.map(menu => {
      const Icon = iconMap[menu.icon || '']
      
      if (menu.children && menu.children.length > 0) {
        // 有子菜单
        return (
          <AntdMenu.SubMenu
            key={menu.path}
            icon={Icon && <Icon />}
            title={menu.menuName}
          >
            {renderMenu(menu.children)}
          </AntdMenu.SubMenu>
        )
      }
      
      // 无子菜单
      return (
        <AntdMenu.Item
          key={menu.path}
          icon={Icon && <Icon />}
          onClick={() => navigate(menu.path!)}
        >
          {menu.menuName}
        </AntdMenu.Item>
      )
    })
  }

  return (
    <AntdMenu
      mode='inline'
      theme='dark'
      selectedKeys={[pathname]}
      items={renderMenu(menuList)}
    />
  )
}
```

### 12.2 从路由配置生成菜单

```tsx
// 根据用户权限动态生成菜单
import { router } from '@/router'
import { IAuthLoader } from '@/router/AuthLoader'
import { useRouteLoaderData } from 'react-router-dom'

function DynamicMenu() {
  const data = useRouteLoaderData('layout') as IAuthLoader
  
  // 过滤出用户有权限的路由
  const authorizedRoutes = router.filter(route => 
    data.menuPathList.includes(route.path)
  )
  
  // 转换为菜单结构
  const menuItems = convertRoutesToMenus(authorizedRoutes)
  
  return <AntdMenu items={menuItems} />
}
```

---

## 第十三章: RBAC权限系统（补充内容）

### 13.1 RBAC模型介绍

RBAC（Role-Based Access Control）基于角色的访问控制：
- **用户(User)**: 系统使用者
- **角色(Role)**: 权限的集合
- **权限(Permission)**: 对资源的访问权

### 13.2 路由权限控制

```tsx
// src/layout/index.tsx - 路由权限验证
const App: React.FC = () => {
  const { userInfo } = useStore()
  const { pathname } = useLocation()
  const data = useRouteLoaderData('layout') as IAuthLoader
  
  // 权限判断
  const route = searchRoute(pathname, router as unknown as AppRoute[])
  
  if (route && route.meta?.auth === false) {
    // 公开路由，无需权限
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return <Layout>...</Layout>
}
```

### 13.3 按钮级权限

```tsx
// src/components/AuthButton.tsx
import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'
import { Button } from 'antd'
import type { ButtonProps } from 'antd'
import type { ReactNode } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

interface AuthButtonProps extends ButtonProps {
  auth?: string  // 权限标识，如 'user@create'
  children?: ReactNode
}

export default function AuthButton({ 
  auth, 
  children, 
  ...buttonProps 
}: AuthButtonProps) {
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useStore(state => state.userInfo.role)
  
  // 没有权限标识，直接显示
  if (!auth) return <Button {...buttonProps}>{children}</Button>
  
  // 有权限或是超级管理员，显示按钮
  if (data.buttonList.includes(auth) || role === 1) {
    return <Button {...buttonProps}>{children}</Button>
  }
  
  // 无权限，不显示
  return <></>
}
```

### 13.4 使用AuthButton

```tsx
// 在页面中使用
<AuthButton auth='user@create' type='primary' onClick={handleCreate}>
  新增用户
</AuthButton>

<AuthButton auth='user@edit' type='link' onClick={() => handleEdit(record)}>
  编辑
</AuthButton>

<AuthButton auth='user@delete' type='link' danger onClick={() => handleDel(record.userId)}>
  删除
</AuthButton>
```

### 13.5 角色权限设置

```tsx
// src/views/system/role/SetPermission.tsx
import { useState, useEffect } from 'react'
import { Modal, Tree, message } from 'antd'
import type { DataNode } from 'antd/es/tree'
import api from '@/api'

interface SetPermissionProps {
  roleId: string
  visible: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function SetPermission({ 
  roleId, 
  visible, 
  onClose,
  onSuccess 
}: SetPermissionProps) {
  const [menuList, setMenuList] = useState<DataNode[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (visible && roleId) {
      getMenuList()
      getRolePermission()
    }
  }, [visible, roleId])

  // 获取菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList()
    const treeData = convertToTreeData(data)
    setMenuList(treeData)
  }

  // 获取角色已有权限
  const getRolePermission = async () => {
    const role = await api.getRoleList({ roleName: '' })
    const currentRole = role.list.find(r => r._id === roleId)
    if (currentRole) {
      setCheckedKeys(currentRole.permissionList.checkedKeys)
    }
  }

  // 保存权限
  const handleSave = async () => {
    try {
      await api.updatePermission({
        _id: roleId,
        permissionList: {
          checkedKeys: checkedKeys as string[],
          halfCheckedKeys: []
        }
      })
      message.success('权限设置成功')
      onSuccess()
      onClose()
    } catch (error) {
      message.error('权限设置失败')
    }
  }

  return (
    <Modal
      title='设置权限'
      open={visible}
      onOk={handleSave}
      onCancel={onClose}
      width={600}
    >
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={keys => setCheckedKeys(keys as React.Key[])}
        treeData={menuList}
      />
    </Modal>
  )
}
```

---

## 第十四章: 订单与地图（补充内容）

### 14.1 高德地图集成

```html
<!-- public/index.html -->
<script src="https://webapi.amap.com/maps?v=2.0&key=你的KEY"></script>
```

### 14.2 订单轨迹地图

```tsx
// src/views/order/OrderList/components/OrderRoute.tsx
import { useEffect, useRef } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'

interface OrderRouteProps {
  route: Array<{ lng: string; lat: string }>
}

export default function OrderRoute({ route }: OrderRouteProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    initMap()
  }, [])

  const initMap = async () => {
    const AMap = await AMapLoader.load({
      key: '你的KEY',
      version: '2.0'
    })

    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new AMap.Map(mapRef.current, {
        zoom: 11,
        center: [116.397428, 39.90923]
      })
    }

    drawRoute()
  }

  const drawRoute = () => {
    if (!mapInstance.current || !route.length) return

    const path = route.map(point => [
      parseFloat(point.lng),
      parseFloat(point.lat)
    ])

    // 绘制轨迹线
    const polyline = new AMap.Polyline({
      path,
      strokeColor: '#1890ff',
      strokeWeight: 6,
      strokeOpacity: 0.8
    })

    mapInstance.current.add(polyline)
    
    // 调整视野
    mapInstance.current.setFitView()
  }

  return <div ref={mapRef} style={{ height: 400 }} />
}
```

### 14.3 订单聚合展示

```tsx
// src/views/order/OrderCluster/index.tsx
import { useEffect, useRef } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import api from '@/api'

export default function OrderCluster() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initMap()
  }, [])

  const initMap = async () => {
    const AMap = await AMapLoader.load({
      key: '你的KEY',
      version: '2.0',
      plugins: ['AMap.MarkerClusterer']
    })

    const map = new AMap.Map(mapRef.current!, {
      zoom: 10
    })

    // 获取订单数据
    const orders = await api.getOrderCluster(1)

    // 创建标记点
    const markers = orders.map(order => {
      return new AMap.Marker({
        position: [parseFloat(order.lng), parseFloat(order.lat)]
      })
    })

    // 创建聚合
    new AMap.MarkerClusterer(map, markers, {
      gridSize: 60,
      renderMarker: (context) => {
        context.marker.setLabel({
          content: `<div>${context.count}</div>`,
          direction: 'top'
        })
      }
    })
  }

  return <div ref={mapRef} style={{ height: '100vh' }} />
}
```

### 14.4 订单导出

```tsx
// 文件流导出
const handleExport = async () => {
  const params = {
    orderId: searchOrderId,
    userName: searchUserName,
    state: searchState
  }
  
  await api.orderExport(params)
  message.success('导出成功')
}
```

---

## 第十五章: 性能优化（补充内容）

### 15.1 路由懒加载

```tsx
// src/router/LazyLoad.tsx
import React, { Suspense } from 'react'
import { Spin } from 'antd'

export const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={
      <Spin 
        size="large" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      />
    }>
      <Component />
    </Suspense>
  )
}

// 使用
{
  path: '/dashboard',
  element: lazyLoad(React.lazy(() => import('@/views/dashboard')))
}
```

### 15.2 组件记忆化

```tsx
import React, { memo, useMemo, useCallback } from 'react'

// React.memo - 避免不必要的重渲染
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* 复杂渲染 */}</div>
})

// useMemo - 缓存计算结果
const sortedList = useMemo(() => {
  return [...list].sort((a, b) => a.price - b.price)
}, [list])

// useCallback - 缓存函数引用
const handleClick = useCallback((id) => {
  console.log(id)
}, [])
```

### 15.3 虚拟滚动

```tsx
import { VirtualList } from 'rc-virtual-list'

<VirtualList
  data={longList}
  height={600}
  itemHeight={50}
  itemKey="id"
>
  {(item, index) => (
    <div key={item.id}>{item.name}</div>
  )}
</VirtualList>
```

### 15.4 图片懒加载

```tsx
import { LazyLoadImage } from 'react-lazy-load-image-component'

<LazyLoadImage
  src="/path/to/image.jpg"
  alt="描述"
  threshold={100}
/>
```

### 15.5 代码分割优化

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        antd: ['antd'],
        echarts: ['echarts'],
        utils: ['lodash', 'dayjs']
      }
    }
  }
}
```

### 15.6 性能监控

```tsx
// 测量组件渲染时间
import { Profiler } from 'react'

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} ${phase} 耗时: ${actualDuration}ms`)
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

---

## 课程总结

恭喜你完成了整个React管理后台系统的学习！

### 知识点回顾

1. **React基础**: Hooks、组件、生命周期
2. **TypeScript**: 类型系统、接口、泛型
3. **工程化**: Vite、ESLint、Prettier
4. **路由**: React Router 6、懒加载、守卫
5. **请求**: Axios封装、拦截器、Mock
6. **认证**: 登录、Token、权限控制
7. **UI**: Ant Design、CSS Module、主题
8. **状态**: Zustand全局管理
9. **可视化**: ECharts图表
10. **CRUD**: 完整的增删改查
11. **树形**: 部门管理、递归
12. **动态菜单**: 权限路由
13. **RBAC**: 按钮级权限
14. **地图**: 高德地图集成
15. **优化**: 性能提升技巧

### 下一步学习建议

1. **深入学习React**: Concurrent Mode、Server Components
2. **状态管理进阶**: Redux Toolkit、Recoil
3. **测试**: Jest、React Testing Library
4. **服务端渲染**: Next.js
5. **移动端**: React Native
6. **微前端**: qiankun、micro-app

祝你在React开发之路上越走越远！🎉
