import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 12 章',
  title: '菜单管理',
  subtitle: '菜单不仅是导航，也是权限树和动态路由的基础数据。',
  from: ['学习资料/章节文档/第十二章/12-1 菜单接口.md', '学习资料/章节文档/第十二章/12-5 菜单动态渲染.md'],
  goals: ['区分菜单、按钮、页面三类节点', '理解菜单递归渲染', '维护动态图标和路由路径'],
  concepts: [
    { title: '为什么菜单是模型', body: '菜单数据决定侧边栏、面包屑、按钮权限和角色授权，不只是 UI 文案。' },
    { title: '原理是什么', body: '菜单树递归渲染，叶子节点对应页面路径，按钮节点提供 menuCode。' },
    { title: '项目落地', body: 'Menu 组件从 loader 数据读取 menuList，再递归转换为 AntD Menu items。' }
  ],
  basic: (
    <div className='mini-tree'>
      <span>系统管理</span>
      <span className='child'>用户管理 /userList</span>
      <span className='child'>新增用户 user@create</span>
    </div>
  ),
  advanced: (
    <div className='chip-row'>
      <span className='chip'>1 菜单</span>
      <span className='chip'>2 按钮</span>
      <span className='chip'>3 页面</span>
    </div>
  ),
  project: <code>src/components/Menu/index.tsx#L20-L85 递归转换菜单树为 AntD items</code>,
  references: [
    { label: '菜单渲染', path: 'src/components/Menu/index.tsx', lines: '#L20-L85', note: '把后端菜单树递归映射为侧边栏结构。' },
    { label: '菜单管理页', path: 'src/views/system/menu/index.tsx', lines: '#L25-L160', note: '维护菜单字段、状态、类型和操作。' }
  ],
  exercise: '新增一个“报表管理”菜单节点，包含一个“导出报表”按钮权限码。',
  checklist: ['能区分 menuType', '能解释递归渲染', '能说明 menuCode 用途']
}

export default function Chapter12Menu() {
  return <ChapterShell lesson={lesson} />
}
