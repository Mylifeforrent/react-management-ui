import { useState } from 'react'
import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const pages = ['welcome', 'dashboard', 'userList']

export default function Chapter05Router() {
  const [active, setActive] = useState('welcome')
  const lesson: ChapterLesson = {
    chapter: '第 5 章',
    title: 'React Router',
    subtitle: '从页面跳转进入嵌套路由、Data API、loader 守卫和错误兜底。',
    from: ['学习资料/章节文档/第五章/5-4 通过API创建路由.md', '学习资料/章节文档/第五章/5-6 Data API.md'],
    goals: ['配置 createBrowserRouter', '说明 Layout 和 Outlet 的关系', '理解 loader 在页面渲染前拦截请求'],
    concepts: [
      { title: '为什么需要路由体系', body: '后台不是单页内容堆叠，而是菜单、权限、标签页和页面状态共同驱动的应用。' },
      { title: '原理是什么', body: '根路由承载布局，children 承载页面；loader 在 element 渲染前拿到权限或抛出错误。' },
      { title: '项目落地', body: '受保护路由统一挂在 layout 下，错误由 RouteError 接管，页面通过 lazyLoad 懒加载。' }
    ],
    basic: (
      <div className='chip-row'>
        {pages.map(page => (
          <button key={page} onClick={() => setActive(page)}>
            /{page}
          </button>
        ))}
      </div>
    ),
    advanced: (
      <div className='flow'>
        <div>进入 /{active}</div>
        <div>loader 获取权限</div>
        <div>Layout 渲染菜单和 Outlet</div>
      </div>
    ),
    project: <code>src/router/index.tsx#L21-L63 受保护路由、loader、errorElement、children</code>,
    references: [
      { label: '路由配置', path: 'src/router/index.tsx', lines: '#L21-L63', note: '后台页面都挂在 layout 路由下，统一获得权限和布局能力。' },
      { label: '权限 loader', path: 'src/router/AuthLoader.ts', lines: '#L1-L18', note: '进入受保护页面前获取菜单和按钮权限。' },
      { label: '错误兜底', path: 'src/router/RouteError.tsx', lines: '#L1-L34', note: '权限接口失败时展示可理解的错误页。' }
    ],
    exercise: '新增一个 /report 路由，要求它出现在菜单点击链路中，并能落入 Layout 的内容区。',
    checklist: ['能画出路由树', '能解释 loader 的执行时机', '能说明 errorElement 的价值']
  }
  return <ChapterShell lesson={lesson} />
}
