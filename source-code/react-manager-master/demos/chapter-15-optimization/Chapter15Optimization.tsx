import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 15 章',
  title: '工程优化',
  subtitle: '把路由懒加载、主题切换、构建拆包、测试和 CI 收束成可持续维护的工程闭环。',
  from: ['学习资料/章节文档/第十五章/15-2 路由懒加载.md', '学习资料/章节文档/第十五章/15-6 主题定制.md', '学习资料/章节文档/第十五章/15-7课程总结.md'],
  goals: ['实现路由懒加载', '解释主题切换链路', '建立 lint/test/build/CI 质量闭环'],
  concepts: [
    { title: '为什么最后做优化', body: '优化必须基于真实业务形态，否则容易为了技巧而技巧；项目完成后才能判断瓶颈。' },
    { title: '原理是什么', body: '懒加载减少首屏模块，主题 token 统一视觉变量，CI 固化团队验证流程。' },
    { title: '项目落地', body: '路由用 React.lazy，Vite manualChunks 拆 vendor，Vitest 和 GitHub Actions 承接质量检查。' }
  ],
  basic: (
    <div className='flow'>
      <div>React.lazy 拆分页面 chunk</div>
      <div>Suspense 提供加载态</div>
      <div>manualChunks 控制 vendor 分组</div>
    </div>
  ),
  advanced: (
    <div className='chip-row'>
      <span className='chip'>yarn lint</span>
      <span className='chip'>yarn test</span>
      <span className='chip'>yarn build</span>
      <span className='chip'>GitHub Actions</span>
    </div>
  ),
  project: <code>src/router/LazyLoad.tsx#L1-L15 与 vite.config.ts#L20-L34 共同完成加载优化</code>,
  references: [
    { label: '路由懒加载', path: 'src/router/LazyLoad.tsx', lines: '#L1-L15', note: '统一包裹 lazy 页面并提供 Suspense fallback。' },
    { label: '打包拆分', path: 'vite.config.ts', lines: '#L20-L34', note: '将 React、AntD、ECharts 拆成稳定 vendor chunk。' }
  ],
  exercise: '把一个新页面改成 lazyLoad，并观察 build 输出是否多出异步 chunk。',
  checklist: ['能说明懒加载适用场景', '能解释主题 token', '能跑通质量命令']
}

export default function Chapter15Optimization() {
  return <ChapterShell lesson={lesson} />
}
