import { Dashboard, Dept, Menu, Order, Result, ResultData, Role, User } from '@/types/api'

type HttpMethod = 'get' | 'post'
type MockParams = Record<string, unknown> | undefined

const now = '2026-06-10 08:00:00'

const userInfo: User.UserItem = {
  _id: 'u-admin',
  userId: 100001,
  userName: '教学管理员',
  userEmail: 'admin@mars.com',
  deptId: 'dept-ops',
  state: 1,
  mobile: '13800138000',
  job: '前端架构师',
  role: 1,
  roleList: '超级管理员',
  createId: 0,
  deptName: '运营中台',
  userImg: '/imgs/logo.png'
}

const users: User.UserItem[] = [
  userInfo,
  {
    _id: 'u-operator',
    userId: 100002,
    userName: '运营同学',
    userEmail: 'operator@mars.com',
    deptId: 'dept-ops',
    state: 1,
    mobile: '13900139000',
    job: '运营专员',
    role: 3,
    roleList: '运营角色',
    createId: 100001,
    deptName: '运营中台',
    userImg: '/imgs/logo.png'
  }
]

const deptList: Dept.DeptItem[] = [
  {
    _id: 'dept-ops',
    deptName: '运营中台',
    parentId: '',
    userName: '教学管理员',
    createTime: now,
    updateTime: now,
    children: [
      {
        _id: 'dept-city',
        deptName: '城市运营',
        parentId: 'dept-ops',
        userName: '运营同学',
        createTime: now,
        updateTime: now,
        children: []
      }
    ]
  },
  {
    _id: 'dept-tech',
    deptName: '技术平台',
    parentId: '',
    userName: '教学管理员',
    createTime: now,
    updateTime: now,
    children: []
  }
]

const menuList: Menu.MenuItem[] = [
  {
    _id: 'menu-dashboard',
    menuName: '工作台',
    menuType: 1,
    menuState: 1,
    path: '/dashboard',
    icon: 'DesktopOutlined',
    component: 'dashboard',
    createTime: now
  },
  {
    _id: 'menu-system',
    menuName: '系统管理',
    menuType: 1,
    menuState: 1,
    icon: 'SettingOutlined',
    createTime: now,
    children: [
      {
        _id: 'menu-user',
        menuName: '用户管理',
        menuType: 1,
        menuState: 1,
        path: '/userList',
        component: 'system/user',
        createTime: now,
        buttons: [
          {
            _id: 'btn-user-create',
            menuName: '新增用户',
            menuType: 2,
            menuState: 1,
            menuCode: 'user@create',
            createTime: now
          },
          {
            _id: 'btn-user-delete',
            menuName: '删除用户',
            menuType: 2,
            menuState: 1,
            menuCode: 'user@delete',
            createTime: now
          }
        ]
      },
      {
        _id: 'menu-dept',
        menuName: '部门管理',
        menuType: 1,
        menuState: 1,
        path: '/deptList',
        component: 'system/dept',
        createTime: now
      },
      {
        _id: 'menu-menu',
        menuName: '菜单管理',
        menuType: 1,
        menuState: 1,
        path: '/menuList',
        component: 'system/menu',
        createTime: now
      },
      {
        _id: 'menu-role',
        menuName: '角色管理',
        menuType: 1,
        menuState: 1,
        path: '/roleList',
        component: 'system/role',
        createTime: now
      }
    ]
  },
  {
    _id: 'menu-order',
    menuName: '订单管理',
    menuType: 1,
    menuState: 1,
    icon: 'TeamOutlined',
    createTime: now,
    children: [
      {
        _id: 'menu-order-list',
        menuName: '订单列表',
        menuType: 1,
        menuState: 1,
        path: '/orderList',
        component: 'order/OrderList',
        createTime: now
      },
      {
        _id: 'menu-order-cluster',
        menuName: '订单聚合',
        menuType: 1,
        menuState: 1,
        path: '/cluster',
        component: 'order/OrderCluster',
        createTime: now
      },
      {
        _id: 'menu-driver',
        menuName: '司机列表',
        menuType: 1,
        menuState: 1,
        path: '/driverList',
        component: 'order/DriverList',
        createTime: now
      }
    ]
  }
]

const roles: Role.RoleItem[] = [
  {
    _id: 'role-admin',
    roleName: '超级管理员',
    remark: '拥有全部菜单与按钮权限',
    createTime: now,
    updateTime: now,
    permissionList: {
      checkedKeys: ['menu-dashboard', 'menu-system', 'menu-user', 'menu-order'],
      halfCheckedKeys: []
    }
  },
  {
    _id: 'role-operator',
    roleName: '运营角色',
    remark: '负责订单和司机管理',
    createTime: now,
    updateTime: now,
    permissionList: {
      checkedKeys: ['menu-order', 'menu-order-list', 'menu-driver'],
      halfCheckedKeys: []
    }
  }
]

const orders: Order.OrderItem[] = [
  {
    _id: 'order-1',
    orderId: 'DD202606100001',
    cityName: '北京',
    userName: '王同学',
    mobile: 13800138000,
    startAddress: '北京市朝阳区望京 SOHO',
    endAddress: '北京市海淀区中关村',
    orderAmount: 128,
    userPayAmount: 118,
    driverAmount: 92,
    payType: 1,
    driverName: '李师傅',
    vehicleName: '舒适型',
    state: Order.IState.doing,
    useTime: now,
    endTime: now,
    route: [
      { lng: '116.480881', lat: '39.989410' },
      { lng: '116.397128', lat: '39.916527' },
      { lng: '116.307852', lat: '39.982027' }
    ],
    createTime: now,
    remark: '教学演示订单'
  },
  {
    _id: 'order-2',
    orderId: 'DD202606100002',
    cityName: '上海',
    userName: '陈同学',
    mobile: 13900139000,
    startAddress: '上海市浦东新区世纪大道',
    endAddress: '上海市徐汇区漕河泾',
    orderAmount: 96,
    userPayAmount: 90,
    driverAmount: 70,
    payType: 2,
    driverName: '张师傅',
    vehicleName: '商务型',
    state: Order.IState.done,
    useTime: now,
    endTime: now,
    route: [
      { lng: '121.544379', lat: '31.221517' },
      { lng: '121.473701', lat: '31.230416' },
      { lng: '121.404315', lat: '31.176653' }
    ],
    createTime: now,
    remark: '已完成订单'
  }
]

const drivers: Order.DriverItem[] = [
  {
    driverName: '李师傅',
    driverId: 9001,
    driverPhone: '13800001111',
    cityName: '北京',
    grade: true,
    driverLevel: 5,
    accountStatus: Order.DriverStatus.normal,
    carNo: '京A12345',
    vehicleBrand: '比亚迪',
    vehicleName: '舒适型',
    onlineTime: 420,
    driverAmount: 560,
    rating: 4.9,
    driverScore: 98,
    pushOrderCount: 28,
    orderCompleteCount: 25,
    createTime: now
  }
]

const cityList: Order.DictItem[] = [
  { id: '1', name: '北京' },
  { id: '2', name: '上海' },
  { id: '3', name: '深圳' }
]

const vehicleList: Order.DictItem[] = [
  { id: 'comfort', name: '舒适型' },
  { id: 'business', name: '商务型' },
  { id: 'luxury', name: '豪华型' }
]

const createResult = <T>(data: T): Result<T> => ({
  code: 0,
  data,
  msg: 'ok'
})

const createPage = <T>(list: T[], pageNum = 1, pageSize = 10): ResultData<T> => ({
  list: list.slice((pageNum - 1) * pageSize, pageNum * pageSize),
  page: {
    pageNum,
    pageSize,
    total: list.length
  }
})

const getNumber = (params: MockParams, key: string, fallback: number) => {
  const value = params?.[key]
  return typeof value === 'number' ? value : fallback
}

const getString = (params: MockParams, key: string) => {
  const value = params?.[key]
  return typeof value === 'string' ? value : ''
}

const filterByKeyword = <T>(list: T[], keyword: string, field: keyof T) => {
  if (!keyword) return list
  return list.filter(item => String(item[field]).includes(keyword))
}

export const getMockResponse = async <T = unknown>(
  url: string,
  method: HttpMethod,
  params?: MockParams
): Promise<Result<T>> => {
  await new Promise(resolve => window.setTimeout(resolve, 120))

  if (url === '/users/login' && method === 'post') return createResult('mock-token-admin') as Result<T>
  if (url === '/users/getUserInfo') return createResult(userInfo) as Result<T>
  if (url === '/users/getPermissionList') {
    return createResult({
      buttonList: ['user@create', 'user@delete', 'role@create', 'order@export'],
      menuList
    }) as Result<T>
  }

  if (url === '/order/dashboard/getReportData') {
    return createResult<Dashboard.ReportData>({
      driverCount: 1280,
      totalMoney: 896430,
      orderCount: 32041,
      cityNum: 28
    }) as Result<T>
  }
  if (url === '/order/dashboard/getLineData') {
    return createResult<Dashboard.LineData>({
      label: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      order: [120, 180, 160, 220, 260, 310, 288],
      money: [18000, 26000, 23000, 33000, 38000, 44000, 41000]
    }) as Result<T>
  }
  if (url === '/order/dashboard/getPieCityData') {
    return createResult<Dashboard.PieData[]>([
      { name: '北京', value: 420 },
      { name: '上海', value: 360 },
      { name: '深圳', value: 280 }
    ]) as Result<T>
  }
  if (url === '/order/dashboard/getPieAgeData') {
    return createResult<Dashboard.PieData[]>([
      { name: '20-30岁', value: 220 },
      { name: '31-40岁', value: 460 },
      { name: '41-50岁', value: 310 }
    ]) as Result<T>
  }
  if (url === '/order/dashboard/getRadarData') {
    return createResult<Dashboard.RadarData>({
      indicator: [
        { name: '服务', max: 100 },
        { name: '安全', max: 100 },
        { name: '准时', max: 100 },
        { name: '收入', max: 100 }
      ],
      data: [
        {
          name: '司机模型诊断',
          value: [92, 88, 95, 78]
        }
      ]
    }) as Result<T>
  }

  if (url === '/users/list') {
    const pageNum = getNumber(params, 'pageNum', 1)
    const pageSize = getNumber(params, 'pageSize', 10)
    const list = filterByKeyword(users, getString(params, 'userName'), 'userName')
    return createResult(createPage(list, pageNum, pageSize)) as Result<T>
  }
  if (url === '/users/all/list') return createResult(users) as Result<T>
  if (url.startsWith('/users/')) return createResult(true) as Result<T>

  if (url === '/dept/list') return createResult(deptList) as Result<T>
  if (url.startsWith('/dept/')) return createResult(true) as Result<T>

  if (url === '/menu/list') return createResult(menuList) as Result<T>
  if (url.startsWith('/menu/')) return createResult(true) as Result<T>

  if (url === '/roles/list') {
    const pageNum = getNumber(params, 'pageNum', 1)
    const pageSize = getNumber(params, 'pageSize', 10)
    return createResult(createPage(roles, pageNum, pageSize)) as Result<T>
  }
  if (url === '/roles/allList') return createResult(roles) as Result<T>
  if (url.startsWith('/roles/')) return createResult(true) as Result<T>

  if (url === '/order/list') {
    const pageNum = getNumber(params, 'pageNum', 1)
    const pageSize = getNumber(params, 'pageSize', 10)
    return createResult(createPage(orders, pageNum, pageSize)) as Result<T>
  }
  if (url === '/order/cityList') return createResult(cityList) as Result<T>
  if (url === '/order/vehicleList') return createResult(vehicleList) as Result<T>
  if (url.startsWith('/order/detail/')) {
    const orderId = url.replace('/order/detail/', '')
    return createResult(orders.find(item => item.orderId === orderId) || orders[0]) as Result<T>
  }
  if (url.startsWith('/order/cluster/')) {
    return createResult([
      { lng: '116.480881', lat: '39.989410' },
      { lng: '116.397128', lat: '39.916527' },
      { lng: '121.473701', lat: '31.230416' }
    ]) as Result<T>
  }
  if (url === '/order/driver/list') return createResult(createPage(drivers)) as Result<T>
  if (url.startsWith('/order/')) return createResult(true) as Result<T>

  return {
    code: 404,
    data: null,
    msg: `Mock endpoint not found: ${method.toUpperCase()} ${url}`
  } as Result<T>
}
