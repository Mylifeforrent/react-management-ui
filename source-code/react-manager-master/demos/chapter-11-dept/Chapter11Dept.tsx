import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 11 章',
  title: '部门管理',
  subtitle: '理解树形数据、父子部门、负责人选择和组织架构 CRUD。',
  from: ['学习资料/章节文档/第十一章/11-1 部门列表接口.md', '学习资料/章节文档/第十一章/11-2部门创建、编辑接口.md'],
  goals: ['渲染树形表格', '理解 parentId 和 children 的关系', '实现部门创建编辑删除'],
  concepts: [
    { title: '为什么需要树形结构', body: '组织架构天然有层级，部门数据不仅要展示列表，还要保留上下级关系。' },
    { title: '原理是什么', body: '父节点通过 children 包含子部门，创建时传 parentId，编辑时保留当前节点身份。' },
    { title: '项目落地', body: '部门页面使用 Tree/Table 式数据展示，弹窗选择负责人和上级部门。' }
  ],
  basic: (
    <div className='mini-tree'>
      <span>运营中台</span>
      <span className='child'>城市运营</span>
      <span>技术平台</span>
    </div>
  ),
  advanced: (
    <div className='flow'>
      <div>选择父级部门</div>
      <div>填写部门名称和负责人</div>
      <div>提交后刷新树形列表</div>
    </div>
  ),
  project: <code>src/views/system/dept/index.tsx#L20-L150 部门查询、树表格和操作</code>,
  references: [
    { label: '部门列表', path: 'src/views/system/dept/index.tsx', lines: '#L20-L150', note: '树形数据在表格中展开，操作按钮进入创建或编辑弹窗。' },
    { label: '部门弹窗', path: 'src/views/system/dept/CreateDept.tsx', lines: '#L1-L150', note: '弹窗承接上级部门、负责人和提交动作。' }
  ],
  exercise: '新增“禁止删除含子部门的部门”的前端提示。',
  checklist: ['能解释 children 树结构', '能说明 parentId 作用', '能实现部门弹窗提交']
}

export default function Chapter11Dept() {
  return <ChapterShell lesson={lesson} />
}
