import { useMemo, useState } from 'react'
import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

export default function Chapter03ReactHooks() {
  const [count, setCount] = useState(1)
  const doubled = useMemo(() => count * 2, [count])
  const lesson: ChapterLesson = {
    chapter: '第 3 章',
    title: 'React Hooks',
    subtitle: '从 useState 开始理解组件状态，再进入副作用、引用、缓存和调试。',
    from: ['学习资料/章节文档/第三章/useState语法讲解.md', '学习资料/章节文档/第三章/useMemo和useCallback.md'],
    goals: ['实现函数组件状态更新', '解释 effect 和 ref 的使用边界', '理解 memo 类 Hook 的性能意义'],
    concepts: [
      { title: '为什么需要 Hooks', body: 'Hooks 让函数组件拥有状态、副作用和复用逻辑，替代 class component 中分散的生命周期。' },
      { title: '原理是什么', body: 'React 按调用顺序保存 Hook 状态，所以 Hook 必须放在组件顶层，不能写在条件分支里。' },
      { title: '项目落地', body: '登录页用 useState 控制 loading，工作台用 useEffect 拉取统计数据，自定义 hook 封装图表实例。' }
    ],
    basic: (
      <div className='metric'>
        点击次数 <b>{count}</b>
        <button onClick={() => setCount(value => value + 1)}>增加</button>
      </div>
    ),
    advanced: (
      <div className='metric'>
        useMemo 派生值 <b>{doubled}</b>
      </div>
    ),
    project: <code>src/views/login/Login.tsx#L9-L25 用 useState 管理提交 loading</code>,
    references: [
      { label: '登录交互', path: 'src/views/login/Login.tsx', lines: '#L9-L25', note: '表单提交前后切换 loading，并处理登录成功后的跳转。' },
      { label: '图表 Hook', path: 'src/hook/useCharts.ts', lines: '#L4-L12', note: '把 ECharts 初始化细节封装成可复用 Hook。' }
    ],
    exercise: '把基础示例扩展为“减少”按钮，并保证 count 不小于 0。',
    checklist: ['能解释 Hook 顶层调用规则', '能区分状态和派生值', '能读懂项目里的自定义 Hook']
  }
  return <ChapterShell lesson={lesson} />
}
