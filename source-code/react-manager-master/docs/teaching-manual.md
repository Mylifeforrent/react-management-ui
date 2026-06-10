# React 后台管理项目系统化教学手册

本项目的主教学入口已经升级为本地 HTML 教程站：

- 教程站入口：`docs/tutorial/index.html`
- 启动命令：`yarn tutorial`
- 章节实验：`yarn demo:chapter-02` 到 `yarn demo:chapter-15`

这份 Markdown 保留为索引说明，完整教学内容、源码对照、代码片段、练习与验收标准请以 HTML 教程站为准。

## 学习主线

教程站按 `学习资料/章节文档` 的课程推进重新组织，而不是沿用原来的 8 个浅层 stage：

| 章节 | 主题 | 章节实验 |
| --- | --- | --- |
| 第 2 章 | 工程化环境 | `demos/chapter-02-engineering` |
| 第 3 章 | React Hooks | `demos/chapter-03-react-hooks` |
| 第 4 章 | TypeScript | `demos/chapter-04-typescript` |
| 第 5 章 | React Router | `demos/chapter-05-router` |
| 第 6 章 | 接口契约与请求层 | `demos/chapter-06-api-request` |
| 第 7 章 | 登录与 UI 基础 | `demos/chapter-07-login-ui` |
| 第 9 章 | 工作台 | `demos/chapter-09-dashboard` |
| 第 10 章 | 用户管理 | `demos/chapter-10-user` |
| 第 11 章 | 部门管理 | `demos/chapter-11-dept` |
| 第 12 章 | 菜单管理 | `demos/chapter-12-menu` |
| 第 13 章 | 角色与 RBAC | `demos/chapter-13-rbac` |
| 第 14 章 | 订单与地图 | `demos/chapter-14-order-map` |
| 第 15 章 | 工程优化 | `demos/chapter-15-optimization` |

## 每章结构

每章都按同一套学习路径展开：

1. 为什么需要：先讲业务或工程背景，避免只背 API。
2. 原理是什么：解释核心机制和边界。
3. demo 怎么写：通过独立章节实验演示最小概念、进阶交互、项目对照。
4. 项目怎么落地：映射到当前项目源码，并标注真实文件和行号。
5. 常见错误：列出学习和开发中最容易踩的坑。
6. 练习与验收：给出可操作练习和检查清单。

## 推荐使用方式

先运行：

```bash
yarn tutorial
```

然后按教程站左侧章节顺序学习。每章学习时再打开对应实验，例如：

```bash
yarn demo:chapter-05
```

旧的 `demos/stage-*` 入口仍然保留，用于兼容之前的阶段演示；新学习主线以 `demos/chapter-*` 为准。
