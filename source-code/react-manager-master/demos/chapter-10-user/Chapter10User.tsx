import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 10 章',
  title: '用户管理',
  subtitle: '从列表查询进入分页、选择、弹窗封装、表单校验和增删改接口。',
  from: ['学习资料/章节文档/第十章/10-3 用户列表接口.md', '学习资料/章节文档/第十章/10-7 弹框封装.md'],
  goals: ['实现查询表单和分页表格', '封装创建/编辑弹窗', '处理单删和批量删除'],
  concepts: [
    { title: '为什么先做用户', body: '用户管理覆盖后台 CRUD 的通用模式，后续部门、菜单、角色都会复用这个经验。' },
    { title: '原理是什么', body: '查询条件、分页参数、表格列、弹窗表单和接口提交共同组成页面状态机。' },
    { title: '项目落地', body: '页面维护分页和勾选状态，弹窗通过 ref 暴露 open，提交后刷新列表。' }
  ],
  basic: (
    <div className='mini-form'>
      <input placeholder='请输入用户名称' />
      <button>查询</button>
    </div>
  ),
  advanced: (
    <div className='mini-table'>
      <div>
        <span>用户</span>
        <span>角色</span>
      </div>
      <div>
        <span>教学管理员</span>
        <span>超级管理员</span>
      </div>
      <div>
        <span>运营同学</span>
        <span>运营角色</span>
      </div>
    </div>
  ),
  project: <code>src/views/system/user/index.tsx#L20-L166 查询、表格、选择和删除链路</code>,
  references: [
    { label: '用户列表', path: 'src/views/system/user/index.tsx', lines: '#L20-L166', note: '页面组合查询表单、分页、表格列和操作按钮。' },
    { label: '用户弹窗', path: 'src/views/system/user/CreateUser.tsx', lines: '#L40-L170', note: '弹窗表单负责创建、编辑和校验。' }
  ],
  exercise: '给用户表格新增“手机号”查询条件，并同步更新 mock 过滤逻辑。',
  checklist: ['能说明分页参数', '能实现弹窗 open 方法', '能处理批量删除空选择']
}

export default function Chapter10User() {
  return <ChapterShell lesson={lesson} />
}
