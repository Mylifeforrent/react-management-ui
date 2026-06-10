window.TUTORIAL_CHAPTERS = [
  {
    id: 'chapter-02',
    chapter: '第 2 章',
    title: '工程化环境',
    demo: '../../demos/chapter-02-engineering/index.html',
    sources: ['学习资料/章节文档/第二章/2-5 Yarn 和 Npm 配置.md', '学习资料/章节文档/第二章/2-7 ESLint配置.md'],
    summary: '从安装依赖、脚本入口、格式化、Lint 到 Vite 配置，先建立项目可运行、可检查、可构建的底座。',
    goals: ['能解释 package scripts', '能区分 dev/lint/test/build', '能定位 Vite alias 与端口配置'],
    steps: [
      ['为什么需要', '后台模板会长期迭代，工程化把启动、检查、构建变成团队共同语言。'],
      ['原理是什么', 'Yarn 锁定依赖，Vite 负责开发服务和构建，ESLint/Prettier 负责约束代码一致性。'],
      ['demo 怎么写', '章节 demo 展示从 install 到 build 的命令链路，并强调 TSX 入口必须通过 Vite 编译。'],
      ['项目怎么落地', 'package.json 聚合所有脚本，vite.config.ts 统一 host、port、proxy、alias 和 chunk 配置。'],
      ['常见错误', '直接双击 demo HTML、端口被占用、eslint 插件缺失、环境变量没有 VITE_ 前缀。']
    ],
    refs: [
      ['package.json', '#L6-L35', '脚本入口，包括 tutorial、stage demo 和 chapter demo。'],
      ['vite.config.ts', '#L6-L34', '开发服务、代理、路径别名、打包拆分和测试环境。']
    ],
    snippet: 'yarn install --frozen-lockfile\\nyarn dev --host 127.0.0.1\\nyarn lint\\nyarn test\\nyarn build',
    practice: ['新增一个 demo 脚本并指定 5173 端口', '说明为什么 file:// 打不开 TSX demo', '验收：能从命令行打开章节实验']
  },
  {
    id: 'chapter-03',
    chapter: '第 3 章',
    title: 'React Hooks',
    demo: '../../demos/chapter-03-react-hooks/index.html',
    sources: ['学习资料/章节文档/第三章/useState语法讲解.md', '学习资料/章节文档/第三章/useEffect语法讲解.md', '学习资料/章节文档/第三章/useMemo和useCallback.md'],
    summary: '从函数组件状态进入副作用、引用、缓存和调试，理解项目中登录、工作台、图表 hook 的写法。',
    goals: ['能使用 useState 和 useEffect', '能解释 Hook 顶层调用规则', '能读懂 useCharts'],
    steps: [
      ['为什么需要', 'Hooks 让函数组件拥有状态和副作用，替代 class component 的生命周期拆分。'],
      ['原理是什么', 'React 按 Hook 调用顺序保存状态，所以 Hook 不能写在 if、循环和普通函数里。'],
      ['demo 怎么写', '章节实验用计数器和 useMemo 展示状态、派生值和重新渲染。'],
      ['项目怎么落地', '登录页用 useState 管 loading，工作台 useEffect 拉数据，useCharts 封装 ECharts 实例。'],
      ['常见错误', '依赖数组缺失、闭包读到旧值、条件调用 Hook、组件卸载后继续 setState。']
    ],
    refs: [
      ['src/views/login/Login.tsx', '#L9-L25', '登录按钮 loading 和提交后的状态切换。'],
      ['src/hook/useCharts.ts', '#L4-L12', '自定义 Hook 返回图表容器 ref 和 ECharts 实例。']
    ],
    snippet: 'const [loading, setLoading] = useState(false)\\nuseEffect(() => {\\n  getReportData()\\n}, [])',
    practice: ['给 demo 增加减少按钮', '把派生值改为列表筛选', '验收：能解释 useMemo 不等于缓存接口数据']
  },
  {
    id: 'chapter-04',
    chapter: '第 4 章',
    title: 'TypeScript',
    demo: '../../demos/chapter-04-typescript/index.html',
    sources: ['学习资料/章节文档/第四章/接口.md', '学习资料/章节文档/第四章/泛型.md', '学习资料/章节文档/第四章/void、never、any、unknown类型.md'],
    summary: '把接口响应、组件 props、工具函数和第三方 SDK 纳入类型系统，减少后台复杂字段的误用。',
    goals: ['能写业务 interface', '能用泛型描述接口返回', '能说明 unknown 与 any 的差别'],
    steps: [
      ['为什么需要', '后台页面字段多、接口多，类型能让错误在开发阶段暴露。'],
      ['原理是什么', 'TypeScript 做静态结构检查，不改变运行时，所以外部数据仍需要边界处理。'],
      ['demo 怎么写', '章节实验用 ApiRow 展示 interface、联合字面量和数组类型。'],
      ['项目怎么落地', 'src/types/api.ts 定义 Login、User、Menu、Role、Order、Dashboard 等命名空间。'],
      ['常见错误', '滥用 any、接口类型和 mock 不一致、第三方全局变量缺 declare。']
    ],
    refs: [
      ['src/types/api.ts', '#L1-L155', '通用 Result、分页和 Dashboard 类型。'],
      ['src/types/index.d.ts', '#L1-L38', 'BMapGL 这类全局 SDK 的类型声明。']
    ],
    snippet: 'export interface Result<T = unknown> {\\n  code: number\\n  data: T\\n  msg: string\\n}',
    practice: ['为章节对象定义 interface', '把 Result 改为泛型示例', '验收：能解释 declare global 的用途']
  },
  {
    id: 'chapter-05',
    chapter: '第 5 章',
    title: 'React Router',
    demo: '../../demos/chapter-05-router/index.html',
    sources: ['学习资料/章节文档/第五章/5-4 通过API创建路由.md', '学习资料/章节文档/第五章/5-6 Data API.md'],
    summary: '从跳转进入嵌套路由、Data API、loader 守卫、懒加载和错误兜底。',
    goals: ['能配置 createBrowserRouter', '能解释 Layout/Outlet', '能说明 loader 的权限职责'],
    steps: [
      ['为什么需要', '后台页面由菜单、权限、标签页和布局共同驱动，路由必须集中建模。'],
      ['原理是什么', '父路由提供 Layout，children 渲染页面；loader 在页面渲染前准备权限数据。'],
      ['demo 怎么写', '章节实验模拟菜单切换、loader 流程和 Layout 内容区。'],
      ['项目怎么落地', '受保护页面统一挂在 layout 路由下，并配置 errorElement 兜底。'],
      ['常见错误', '路由路径和菜单 path 不一致、loader 抛错无兜底、懒加载页面未包 Suspense。']
    ],
    refs: [
      ['src/router/index.tsx', '#L21-L63', '受保护路由、loader、errorElement、children。'],
      ['src/router/AuthLoader.ts', '#L1-L18', '加载菜单权限和按钮权限。']
    ],
    snippet: 'const router = createBrowserRouter([\\n  { element: <Layout />, loader: AuthLoader, children: [...] }\\n])',
    practice: ['新增 /report 路由', '给未知路由补 404', '验收：能画出当前路由树']
  },
  {
    id: 'chapter-06',
    chapter: '第 6 章',
    title: '接口契约与请求层',
    demo: '../../demos/chapter-06-api-request/index.html',
    sources: ['学习资料/章节文档/第六章/接口文档.md'],
    summary: '把 API 类型、axios 封装、环境变量、本地 mock、loading 和错误提示统一到请求边界。',
    goals: ['能读懂接口文档', '能解释 request 拦截器', '能说明 mock 的教学价值'],
    steps: [
      ['为什么需要', '页面不应重复写 token、baseURL、错误弹窗和 loading。'],
      ['原理是什么', '请求拦截器补配置，响应拦截器解包 Result，本地 mock 在开发环境直接返回数据。'],
      ['demo 怎么写', '章节实验展示 token 注入、Result 解包和 mock 数据返回。'],
      ['项目怎么落地', 'src/utils/request.ts 统一控制 env.mock、showLoading、showError。'],
      ['常见错误', '直接在页面使用 axios、把 AxiosResponse 当业务数据、接口类型和页面字段不匹配。']
    ],
    refs: [
      ['src/utils/request.ts', '#L19-L88', '请求拦截、响应解包、本地 mock 分流。'],
      ['src/mock/index.ts', '#L330-L395', '本地 mock 覆盖权限、工作台和业务页面接口。']
    ],
    snippet: 'if (env.mock) return requestMock<T>(url, "get", params, options)\\nreturn instance.get(url, { params, ...options }) as Promise<T>',
    practice: ['新增 showError=false 的调用示例', '补一个 mock 接口测试', '验收：能解释 data.code 非 0 的处理']
  },
  {
    id: 'chapter-07',
    chapter: '第 7 章',
    title: '登录与 UI 基础',
    demo: '../../demos/chapter-07-login-ui/index.html',
    sources: ['学习资料/章节文档/第七章/7-2 CSS Module.md', '学习资料/章节文档/第七章/7-4 登录.md', '学习资料/章节文档/第七章/7-5 全局控制loading和报错提示.md'],
    summary: '用 CSS Module、AntD Form 和 request 层完成登录体验，并把 token 接入后续页面。',
    goals: ['能实现登录表单', '能说明 CSS Module 作用域', '能处理 loading 和 callback 跳转'],
    steps: [
      ['为什么需要', '登录是权限、用户信息和所有业务页面的数据入口。'],
      ['原理是什么', 'Form 校验字段后提交，接口返回 token，storage 和 store 同步，再跳转 callback。'],
      ['demo 怎么写', '章节实验展示登录表单、loading 切换和提交流程。'],
      ['项目怎么落地', 'Login.tsx 保存 token，request.ts 后续请求自动带 Authorization。'],
      ['常见错误', '只写 storage 不更新 store、失败后 loading 不复位、callback 未编码。']
    ],
    refs: [
      ['src/views/login/Login.tsx', '#L11-L25', '登录提交、token 保存、成功提示和跳转。'],
      ['src/views/login/index.module.less', '#L1-L47', '登录页局部样式和窄屏适配。']
    ],
    snippet: 'const data = await api.login(values)\\nstorage.set("token", data)\\nupdateToken(data)\\nlocation.href = params.get("callback") || "/welcome"',
    practice: ['新增记住账号字段', '模拟登录失败提示', '验收：能说明 token 后续在哪里被使用']
  },
  {
    id: 'chapter-09',
    chapter: '第 9 章',
    title: '工作台',
    demo: '../../demos/chapter-09-dashboard/index.html',
    sources: ['学习资料/章节文档/第九章/工作台个人信息交互.md', '学习资料/章节文档/第九章/工作台图表数据交互.md'],
    summary: '把用户信息、统计卡片和 ECharts 图表组合成登录后的第一屏。',
    goals: ['能从 store 读取用户信息', '能调用统计接口', '能把接口数据转为 ECharts option'],
    steps: [
      ['为什么需要', '工作台同时验证用户态、接口、布局和图表，是后台首页的综合练习。'],
      ['原理是什么', 'useEffect 请求数据，useCharts 初始化实例，setOption 渲染不同图表。'],
      ['demo 怎么写', '章节实验拆成指标卡、图表类型和源码对照三段。'],
      ['项目怎么落地', 'dashboard 页面分别渲染折线、饼图、玫瑰图和雷达图。'],
      ['常见错误', '容器没有高度、雷达图 data 不是数组、数据加载早于 chart 实例。']
    ],
    refs: [
      ['src/views/dashboard/index.tsx', '#L28-L146', '接口数据转换为 ECharts option。'],
      ['src/hook/useCharts.ts', '#L4-L12', '图表实例初始化封装。']
    ],
    snippet: 'const data = await api.getLineData()\\nlineChart?.setOption({ xAxis: { data: data.label }, series: [...] })',
    practice: ['新增一个统计卡片', '为雷达图 mock 增加第二组数据', '验收：能解释 setOption 的数据结构']
  },
  {
    id: 'chapter-10',
    chapter: '第 10 章',
    title: '用户管理',
    demo: '../../demos/chapter-10-user/index.html',
    sources: ['学习资料/章节文档/第十章/10-3 用户列表接口.md', '学习资料/章节文档/第十章/10-7 弹框封装.md', '学习资料/章节文档/第十章/10-9 用户删除、批量删除接口.md'],
    summary: '用用户列表掌握后台 CRUD 标准套路：查询、分页、表格、弹窗、校验、创建编辑删除。',
    goals: ['能实现查询分页表格', '能封装弹窗表单', '能处理单删和批量删除'],
    steps: [
      ['为什么需要', '用户管理是后续部门、菜单、角色模块的 CRUD 模板。'],
      ['原理是什么', '查询条件和分页组成请求参数，表格展示结果，弹窗表单负责新增编辑。'],
      ['demo 怎么写', '章节实验用简化表格和表单展示查询到提交的路径。'],
      ['项目怎么落地', '用户页维护 selectedIds、pagination、columns 和 CreateUser 弹窗 ref。'],
      ['常见错误', '分页 total 取错、编辑时邮箱未禁用、删除空选择没有提示。']
    ],
    refs: [
      ['src/views/system/user/index.tsx', '#L20-L166', '查询、分页、选择和删除。'],
      ['src/views/system/user/CreateUser.tsx', '#L40-L170', '创建编辑弹窗和校验。']
    ],
    snippet: 'const values = await form.validateFields()\\nawait api.createUser(values)\\nmessage.success("创建成功")\\nprops.update()',
    practice: ['增加手机号查询', '新增编辑弹窗字段回显', '验收：能说明分页参数流向']
  },
  {
    id: 'chapter-11',
    chapter: '第 11 章',
    title: '部门管理',
    demo: '../../demos/chapter-11-dept/index.html',
    sources: ['学习资料/章节文档/第十一章/11-1 部门列表接口.md', '学习资料/章节文档/第十一章/11-2部门创建、编辑接口.md'],
    summary: '用组织架构学习树形数据、parentId、children、负责人选择和部门 CRUD。',
    goals: ['能渲染树形数据', '能解释 parentId', '能实现部门弹窗'],
    steps: [
      ['为什么需要', '组织结构不是扁平列表，页面必须表达上下级关系。'],
      ['原理是什么', 'children 表示展示层级，parentId 表示创建或编辑时的归属。'],
      ['demo 怎么写', '章节实验展示树形层级和创建流程。'],
      ['项目怎么落地', '部门列表读取树形接口，弹窗提供上级部门和负责人选择。'],
      ['常见错误', '删除父部门时未检查子节点、编辑节点把 parentId 改成自己。']
    ],
    refs: [
      ['src/views/system/dept/index.tsx', '#L20-L150', '部门列表和操作入口。'],
      ['src/views/system/dept/CreateDept.tsx', '#L1-L150', '部门创建编辑弹窗。']
    ],
    snippet: 'interface DeptItem {\\n  _id: string\\n  parentId: string\\n  children?: DeptItem[]\\n}',
    practice: ['禁止删除含子部门节点', '新增负责人必填校验', '验收：能手写一个树形部门对象']
  },
  {
    id: 'chapter-12',
    chapter: '第 12 章',
    title: '菜单管理',
    demo: '../../demos/chapter-12-menu/index.html',
    sources: ['学习资料/章节文档/第十二章/12-1 菜单接口.md', '学习资料/章节文档/第十二章/12-5 菜单动态渲染.md'],
    summary: '菜单是导航、权限树、按钮权限和动态路由之间的共同模型。',
    goals: ['能区分菜单/按钮/页面节点', '能递归渲染菜单', '能维护图标和权限码'],
    steps: [
      ['为什么需要', '菜单不是静态 UI，它决定用户能看到哪些页面和哪些操作。'],
      ['原理是什么', '菜单树递归生成侧边栏，按钮节点通过 menuCode 进入权限判断。'],
      ['demo 怎么写', '章节实验展示菜单树、menuType 和 menuCode。'],
      ['项目怎么落地', 'Menu 组件从 loader 数据中递归生成 AntD items。'],
      ['常见错误', 'menuType 混用、path 缺失、动态图标不存在、递归 key 不稳定。']
    ],
    refs: [
      ['src/components/Menu/index.tsx', '#L20-L85', '递归转换菜单树。'],
      ['src/views/system/menu/index.tsx', '#L25-L160', '菜单管理页面。']
    ],
    snippet: 'menuList.map(menu => ({\\n  key: menu.path || menu._id,\\n  children: menu.children ? renderMenu(menu.children) : undefined\\n}))',
    practice: ['新增报表菜单和导出按钮', '为不存在图标提供兜底', '验收：能解释 menuCode 和 path 的区别']
  },
  {
    id: 'chapter-13',
    chapter: '第 13 章',
    title: '角色与 RBAC',
    demo: '../../demos/chapter-13-rbac/index.html',
    sources: ['学习资料/章节文档/第十三章/13-4 权限设置.md', '学习资料/章节文档/第十三章/13-7 按钮权限.md'],
    summary: '将用户、角色、菜单和按钮权限串起来，形成可配置的后台权限模型。',
    goals: ['能解释 RBAC', '能区分 checkedKeys/halfCheckedKeys', '能实现 AuthButton'],
    steps: [
      ['为什么需要', '权限写死在页面里无法适应不同角色和后续菜单变更。'],
      ['原理是什么', '用户关联角色，角色关联菜单和按钮，页面入口和操作按钮分别校验。'],
      ['demo 怎么写', '章节实验切换管理员和普通用户，观察按钮授权结果。'],
      ['项目怎么落地', 'AuthLoader 返回 buttonList，AuthButton 用 auth 决定是否渲染。'],
      ['常见错误', '父节点全选导致新增按钮被自动授权、普通用户绕过按钮权限、403 与 404 混淆。']
    ],
    refs: [
      ['src/components/AuthButton.tsx', '#L13-L20', '按钮权限判断。'],
      ['src/views/system/role/SetPermission.tsx', '#L20-L130', '权限树 checkedKeys 和 halfCheckedKeys。']
    ],
    snippet: 'if (data.buttonList.includes(auth) || role === 1) {\\n  return <Button>{children}</Button>\\n}',
    practice: ['新增 order@delete 权限按钮', '模拟普通用户菜单', '验收：能说明半选父节点的意义']
  },
  {
    id: 'chapter-14',
    chapter: '第 14 章',
    title: '订单与地图',
    demo: '../../demos/chapter-14-order-map/index.html',
    sources: ['学习资料/章节文档/第十四章/14-1 订单列表接口.md', '学习资料/章节文档/第十四章/14-4 轨迹地图.md', '学习资料/章节文档/第十四章/14-8 订单聚合.md'],
    summary: '订单模块把列表、详情、轨迹、地图 SDK、聚合和司机列表串成完整业务链路。',
    goals: ['能实现订单列表', '能解释地图 SDK 按需加载', '能说明轨迹动画数据结构'],
    steps: [
      ['为什么需要', '订单地图是外部 SDK 与业务数据结合的典型复杂页面。'],
      ['原理是什么', '订单详情返回 route 点，加载 BMap 后创建 Point、Polyline 和 TrackAnimation。'],
      ['demo 怎么写', '章节实验展示订单行、点位流和 SDK 加载流程。'],
      ['项目怎么落地', 'OrderRoute 弹窗打开后调用 loadBMap，再初始化地图轨迹。'],
      ['常见错误', '首屏加载地图 SDK、route 为空还初始化地图、全局类型缺失导致 any。']
    ],
    refs: [
      ['src/views/order/OrderList/components/OrderRoute.tsx', '#L20-L70', '地图轨迹弹窗。'],
      ['src/utils/loadBMap.ts', '#L1-L35', '地图 SDK 按需加载。']
    ],
    snippet: 'await loadBMap()\\nconst map = new window.BMapGL.Map("orderRouteMap")\\nconst polyline = new window.BMapGL.Polyline(point, options)',
    practice: ['为空轨迹增加空状态', '给地图加载失败增加提示', '验收：能说明为何不在 index.html 加载地图']
  },
  {
    id: 'chapter-15',
    chapter: '第 15 章',
    title: '工程优化',
    demo: '../../demos/chapter-15-optimization/index.html',
    sources: ['学习资料/章节文档/第十五章/15-2 路由懒加载.md', '学习资料/章节文档/第十五章/15-6 主题定制.md', '学习资料/章节文档/第十五章/15-7课程总结.md'],
    summary: '最后把懒加载、主题切换、构建拆包、测试和 CI 固化为长期维护能力。',
    goals: ['能实现路由懒加载', '能说明主题切换', '能跑通质量闭环'],
    steps: [
      ['为什么需要', '优化必须服务真实业务，避免首屏过重、主题割裂和质量命令靠人工记忆。'],
      ['原理是什么', 'React.lazy 生成异步 chunk，AntD token 统一主题，CI 固化 lint/test/build。'],
      ['demo 怎么写', '章节实验把 lazy、manualChunks、质量脚本放在一条工程链路里。'],
      ['项目怎么落地', 'router 使用 lazyLoad，vite.config.ts 拆出 react、antd、charts chunk。'],
      ['常见错误', '所有页面一次性导入、主题变量和 AntD token 不一致、只跑 dev 不跑 build。']
    ],
    refs: [
      ['src/router/LazyLoad.tsx', '#L1-L15', '页面懒加载包装。'],
      ['vite.config.ts', '#L20-L34', 'manualChunks 和 chunkSizeWarningLimit。']
    ],
    snippet: 'element: lazyLoad(React.lazy(() => import("@/views/dashboard")))\\nmanualChunks: { react: ["react", "react-dom"], antd: ["antd"] }',
    practice: ['新增 lazy 页面并观察 build 输出', '给主题切换增加持久化说明', '验收：能独立跑通 lint/test/build']
  }
]
