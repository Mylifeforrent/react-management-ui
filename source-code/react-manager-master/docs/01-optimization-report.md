# 项目审视与优化报告

## 优化清单
| 文件路径 | 修改内容摘要 | 优化理由 |
|---|---|---|
| `package.json`、`yarn.lock` | 升级 Vite、TypeScript、ESLint 链路，新增 lint/test/demo 脚本 | 修复 audit 漏洞，补齐质量命令 |
| `vite.config.ts` | 增加 Vitest 配置、vendor chunk 分组、chunk 警告阈值 | 支撑测试并降低构建噪音 |
| `.env.*`、`src/config/index.ts` | 统一读取 `import.meta.env`，开发默认启用 mock | 修复启动环境不生效的问题 |
| `src/mock/index.ts` | 增加本地 mock API 数据 | 让项目和教学 demo 可离线复现 |
| `src/utils/request.ts` | request 层按 `env.mock` 分流到 mock 或 Axios | 保持业务 API 层不变 |
| `src/router/index.tsx`、`src/router/RouteError.tsx` | 增加受保护路由错误兜底 | 避免默认异常页影响体验 |
| `src/components/SearchForm.tsx`、`src/components/AuthButton.tsx` | 补充组件 props 类型 | 降低公共组件误用风险 |
| `src/App.less`、`src/styles/theme.less`、`src/layout/index.module.less` | 统一查询区、表格区、暗色主题和移动端布局 | 提升后台 UI 一致性 |
| `index.html`、`src/utils/loadBMap.ts`、订单地图组件 | 地图脚本从全局加载改为按需加载 | 提升首屏稳定性和性能 |
| `demos/stage-*`、`docs/teaching-manual.md` | 新增 8 阶段教学 demo 与手册 | 支撑分阶段实操教学 |

## 变更影响矩阵
| 变更 | 目标版本 | 理由 | 影响范围 |
|---|---:|---|---|
| Vite | 6.4.3 | 覆盖 Vite/esbuild 安全问题，仍保留 Vite 架构 | dev/build 配置 |
| @vitejs/plugin-react | 4.7.0 | 兼容 Vite 6，更新 Babel 链路 | React 编译插件 |
| TypeScript | 5.9.3 | 配合新版 TS ESLint，避免跳到 6.x | 类型检查 |
| ESLint / TS ESLint | 8.57.1 / 8.61.0 | 保留 `.eslintrc.cjs`，修复 lint 工具链 | lint |
| eslint-plugin-react-refresh | 0.4.26 | 补齐现有配置引用的插件 | lint |
| Vitest | 3.2.4 | 与 Yarn v1 + Vite 6 稳定安装；替代原计划 Vitest 4 | 单元测试 |

## 保留不变
- 不替换 React、Ant Design、Zustand、React Router。
- 不引入 Redux/Zustand 替换、Vite/Webpack 替换等架构级变更。
- `学习资料/` 保留为原始参考资料。
