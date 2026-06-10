# React 后台管理项目分阶段教学手册

## 阶段 1：项目脚手架与工程化基础
### 学习目标
- 理解 Vite + React + TypeScript 项目的启动链路。
- 识别 `package.json`、`vite.config.ts`、`tsconfig.json` 的职责。
### 知识图谱
- 入口 HTML：`index.html`
- React 挂载：`src/main.tsx`
- 构建配置：`vite.config.ts`
### 核心概念讲解
- Vite 负责开发服务器、模块转换和生产构建。
- TypeScript 负责类型检查，`tsc && vite build` 保证类型和构建都通过。
### 教学 Demo
- 文件路径：`demos/stage-1/ScaffoldDemo.tsx`
- 运行方式：`yarn demo:stage-1`
- 完整代码位于 `demos/stage-1`，入口、组件和 HTML 可独立运行。
### 项目源码对照
- `src/main.tsx#L1-L8`：真实项目 React root 挂载。
- `package.json#L6-L22`：真实项目脚本与核心依赖。
### 阶段练习
- 练习 1：新增一个 `demo:hello` 脚本，预期能打开新的 demo 页面；参考实现可仿照 `demo:stage-1`。
- 练习 2（进阶）：给 demo 增加一个环境变量展示区。
### 阶段验收标准
- [ ] 能独立说出 Vite 开发与构建流程。
- [ ] 能独立定位项目入口文件。
- [ ] demo 通过 `yarn demo:stage-1` 启动。
### 知识点检查清单
- [ ] package scripts
- [ ] Vite dev server
- [ ] React root
- [ ] TypeScript include

## 阶段 2：路由与页面布局体系
### 学习目标
- 掌握 React Router 的嵌套路由和布局组件。
- 能解释菜单、Header、Content、Outlet 的关系。
### 知识图谱
- 路由配置：`src/router/index.tsx`
- 布局容器：`src/layout/index.tsx`
- 菜单渲染：`src/components/Menu/index.tsx`
### 核心概念讲解
- `RouterProvider` 接管页面导航。
- `Outlet` 是子路由内容的渲染出口。
### 教学 Demo
- 文件路径：`demos/stage-2/RouteLayoutDemo.tsx`
- 运行方式：`yarn demo:stage-2`
### 项目源码对照
- `src/router/index.tsx#L20-L62`：受保护布局路由。
- `src/layout/index.tsx#L38-L57`：后台布局骨架。
### 阶段练习
- 练习 1：新增一个“报表页”路由，预期菜单点击能切换页面。
- 练习 2（进阶）：为未知路由增加 404 页面。
### 阶段验收标准
- [ ] 能独立配置嵌套路由。
- [ ] 能独立实现菜单跳转。
- [ ] demo 通过 `yarn demo:stage-2` 启动。
### 知识点检查清单
- [ ] createBrowserRouter
- [ ] Outlet
- [ ] Layout
- [ ] Navigate

## 阶段 3：状态管理与数据流
### 学习目标
- 使用 Zustand 管理登录态和用户信息。
- 理解 API 封装、token 和页面状态之间的数据流。
### 知识图谱
- Store：`src/store/index.ts`
- Request：`src/utils/request.ts`
- API：`src/api/index.ts`
### 核心概念讲解
- Zustand 通过 hook 暴露状态与更新函数。
- request 层统一注入 token、loading、错误提示和 mock 分流。
### 教学 Demo
- 文件路径：`demos/stage-3/StateDataDemo.tsx`
- 运行方式：`yarn demo:stage-3`
### 项目源码对照
- `src/store/index.ts#L4-L34`：全局状态定义。
- `src/utils/request.ts#L18-L99`：请求拦截与 mock 分流。
### 阶段练习
- 练习 1：给 store 增加 `logout`，预期清空 token。
- 练习 2（进阶）：在 request 中记录最近一次请求地址。
### 阶段验收标准
- [ ] 能独立说出 Zustand 的状态更新方式。
- [ ] 能独立解释 request 封装的职责。
- [ ] demo 通过 `yarn demo:stage-3` 启动。
### 知识点检查清单
- [ ] create store
- [ ] selector
- [ ] token
- [ ] mock api

## 阶段 4：UI 组件库与设计系统
### 学习目标
- 掌握 Ant Design 主题配置和常用后台表单布局。
- 能维护亮色/暗色主题变量。
### 知识图谱
- 主题入口：`src/App.tsx`
- 样式变量：`src/styles/theme.less`
- 公共表单：`src/components/SearchForm.tsx`
### 核心概念讲解
- `ConfigProvider` 统一 Ant Design token。
- CSS 变量承接项目自定义主题。
### 教学 Demo
- 文件路径：`demos/stage-4/DesignSystemDemo.tsx`
- 运行方式：`yarn demo:stage-4`
### 项目源码对照
- `src/App.tsx#L9-L27`：Ant Design 主题配置。
- `src/styles/theme.less#L1-L17`：项目主题变量。
### 阶段练习
- 练习 1：调整主色，预期按钮和控件主色同步变化。
- 练习 2（进阶）：新增一个危险操作按钮规范。
### 阶段验收标准
- [ ] 能独立配置 `ConfigProvider`。
- [ ] 能独立维护主题变量。
- [ ] demo 通过 `yarn demo:stage-4` 启动。
### 知识点检查清单
- [ ] token
- [ ] darkAlgorithm
- [ ] CSS variables
- [ ] SearchForm

## 阶段 5：表单与表格实战
### 学习目标
- 实现查询、表格、弹窗、校验和提交。
- 掌握表格列配置和 Form 校验规则。
### 知识图谱
- 用户列表：`src/views/system/user/index.tsx`
- 用户弹窗：`src/views/system/user/CreateUser.tsx`
- 订单列表：`src/views/order/OrderList/index.tsx`
### 核心概念讲解
- 表格列配置描述数据如何展示。
- 弹窗表单通过 `validateFields` 保证提交数据有效。
### 教学 Demo
- 文件路径：`demos/stage-5/FormTableDemo.tsx`
- 运行方式：`yarn demo:stage-5`
### 项目源码对照
- `src/views/system/user/index.tsx#L20-L67`：分页表格数据获取。
- `src/views/system/user/CreateUser.tsx#L55-L73`：弹窗提交。
### 阶段练习
- 练习 1：新增“手机号”列，预期表格展示手机号。
- 练习 2（进阶）：新增编辑弹窗。
### 阶段验收标准
- [ ] 能独立实现表格列。
- [ ] 能独立实现表单校验。
- [ ] demo 通过 `yarn demo:stage-5` 启动。
### 知识点检查清单
- [ ] Form
- [ ] Table
- [ ] Modal
- [ ] validateFields

## 阶段 6：权限控制与安全
### 学习目标
- 理解路由守卫、菜单权限和按钮权限。
- 能实现基于权限码的按钮显示控制。
### 知识图谱
- 路由守卫：`src/router/AuthLoader.ts`
- 布局权限判断：`src/layout/index.tsx`
- 按钮权限：`src/components/AuthButton.tsx`
### 核心概念讲解
- loader 在路由渲染前获取权限数据。
- 按钮权限通过 `buttonList.includes(auth)` 控制。
### 教学 Demo
- 文件路径：`demos/stage-6/PermissionDemo.tsx`
- 运行方式：`yarn demo:stage-6`
### 项目源码对照
- `src/router/AuthLoader.ts#L8-L16`：权限数据加载。
- `src/components/AuthButton.tsx#L11-L18`：按钮权限判断。
### 阶段练习
- 练习 1：新增 `order@delete` 权限按钮。
- 练习 2（进阶）：模拟普通用户只显示部分菜单。
### 阶段验收标准
- [ ] 能独立说明 RBAC 基本模型。
- [ ] 能独立实现权限按钮。
- [ ] demo 通过 `yarn demo:stage-6` 启动。
### 知识点检查清单
- [ ] loader
- [ ] token
- [ ] menuPathList
- [ ] buttonList

## 阶段 7：性能优化与工程实践
### 学习目标
- 掌握路由懒加载、资源按需加载和构建拆包。
- 能识别哪些资源不应该首屏加载。
### 知识图谱
- 路由懒加载：`src/router/LazyLoad.tsx`
- 地图按需加载：`src/utils/loadBMap.ts`
- 拆包配置：`vite.config.ts`
### 核心概念讲解
- `React.lazy` 将页面拆成异步 chunk。
- 地图 SDK 只在地图页面加载，减少登录页和普通页干扰。
### 教学 Demo
- 文件路径：`demos/stage-7/PerformanceDemo.tsx`
- 运行方式：`yarn demo:stage-7`
### 项目源码对照
- `src/router/index.tsx#L29-L59`：页面懒加载。
- `src/utils/loadBMap.ts#L1-L25`：地图脚本按需加载。
### 阶段练习
- 练习 1：把一个重组件改成 lazy 加载。
- 练习 2（进阶）：分析 build 输出的 chunk。
### 阶段验收标准
- [ ] 能独立说明懒加载收益。
- [ ] 能独立实现脚本按需加载。
- [ ] demo 通过 `yarn demo:stage-7` 启动。
### 知识点检查清单
- [ ] React.lazy
- [ ] Suspense
- [ ] manualChunks
- [ ] SDK loading

## 阶段 8：测试与质量保障
### 学习目标
- 使用 Vitest 和 Testing Library 测试工具函数与组件。
- 理解 lint、test、build、CI 的质量闭环。
### 知识图谱
- 测试配置：`vite.config.ts`
- 测试初始化：`src/test/setup.ts`
- CI：`.github/workflows/ci.yml`
### 核心概念讲解
- 单元测试验证行为，lint 约束代码风格，build 验证类型与产物。
- CI 将本地质量命令固化到团队流程。
### 教学 Demo
- 文件路径：`demos/stage-8/TestingDemo.tsx`
- 运行方式：`yarn demo:stage-8`
### 项目源码对照
- `src/components/SearchForm.test.tsx#L1-L31`：组件行为测试。
- `src/mock/index.test.ts#L1-L15`：mock 数据测试。
### 阶段练习
- 练习 1：为 `formatMoney` 增加单元测试。
- 练习 2（进阶）：为权限按钮补充管理员角色测试。
### 阶段验收标准
- [ ] 能独立编写一个组件测试。
- [ ] 能独立解释 CI 的执行顺序。
- [ ] `yarn test` 全部通过。
### 知识点检查清单
- [ ] Vitest
- [ ] Testing Library
- [ ] jsdom
- [ ] GitHub Actions
