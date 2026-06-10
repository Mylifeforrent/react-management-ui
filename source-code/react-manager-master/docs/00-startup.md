# 项目启动与环境准备

## 项目信息
- 项目路径：`/Users/macbookair/vscode-workspace/react-management-ui/source-code/react-manager-master`
- 项目用途：基于 React + Ant Design 的后台管理教学模板。

## 技术栈清单
| 分类 | 技术 | 版本 |
|---|---|---|
| 框架 | React / React DOM | 18.2.0 |
| 构建工具 | Vite | 6.4.3 |
| 语言 | TypeScript | 5.9.3 |
| UI | Ant Design / icons | 5.6.1 / 5.1.4 |
| 路由 | react-router-dom | 6.11.0 |
| 状态管理 | Zustand | 4.3.8 |
| 请求 | Axios | 1.4.0 |
| 表格查询 | ahooks useAntdTable | 3.7.7 |
| 图表 | ECharts | 5.4.2 |
| 测试 | Vitest / Testing Library | 3.2.4 / 16.3.2 |

## 环境变量
- `.env.development`：开发模式，`VITE_MOCK=true`，默认走本地 mock。
- `.env.stag`：预发模式，走预发 API。
- `.env.production`：生产模式，走生产 API。
- `src/config/index.ts` 统一读取 `import.meta.env`，不再依赖 `index.html` 上的 `data-env`。

## 启动命令
```bash
yarn install --frozen-lockfile
yarn dev --host 127.0.0.1
```

访问地址：`http://127.0.0.1:8080/`

## 验证命令
```bash
yarn lint
yarn test
yarn build
```

## 已解决的启动问题
- 修复开发环境无法使用 `.env.development` 的问题。
- 增加本地 mock，使登录、权限、菜单、图表和列表页面不依赖外部课程接口。
- 为受保护路由增加 `errorElement`，接口异常时展示可理解的错误页面。
- 移除首页全局地图脚本，避免非地图页面出现百度地图 key/sign 控制台错误。
