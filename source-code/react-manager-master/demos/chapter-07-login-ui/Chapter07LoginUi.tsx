import { useState } from 'react'
import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

export default function Chapter07LoginUi() {
  const [loading, setLoading] = useState(false)
  const lesson: ChapterLesson = {
    chapter: '第 7 章',
    title: '登录与 UI 基础',
    subtitle: 'CSS Module 控制局部样式，AntD 负责表单体验，登录成功后写入 token 并跳转。',
    from: ['学习资料/章节文档/第七章/7-2 CSS Module.md', '学习资料/章节文档/第七章/7-4 登录.md'],
    goals: ['实现登录表单校验', '说明 CSS Module 的局部作用域', '理解全局 loading 和错误提示'],
    concepts: [
      { title: '为什么先做登录', body: '登录是权限、用户信息和业务页面的入口，也是 request token 逻辑的第一个落点。' },
      { title: '原理是什么', body: 'Form 收集字段，submit 调 API，成功后 token 写入 storage 和 store，再按 callback 跳转。' },
      { title: '项目落地', body: '登录页使用 CSS Module 包住背景和卡片，按钮 loading 由组件状态驱动。' }
    ],
    basic: (
      <div className='mini-form'>
        <input placeholder='用户名' />
        <input placeholder='密码' type='password' />
        <button onClick={() => setLoading(value => !value)}>{loading ? '登录中...' : '登录'}</button>
      </div>
    ),
    advanced: (
      <div className='flow'>
        <div>校验用户名和密码</div>
        <div>调用 /users/login</div>
        <div>保存 token 并跳转 /welcome</div>
      </div>
    ),
    project: <code>src/views/login/Login.tsx#L11-L25 展示登录提交、token 保存和跳转</code>,
    references: [
      { label: '登录逻辑', path: 'src/views/login/Login.tsx', lines: '#L11-L25', note: '完整体现提交、loading、token 持久化和 callback 跳转。' },
      { label: '登录样式', path: 'src/views/login/index.module.less', lines: '#L1-L47', note: 'CSS Module 让登录页样式不污染后台页面。' }
    ],
    exercise: '给登录表单增加“记住账号”字段，并把账号名显示在登录按钮上方。',
    checklist: ['能解释 CSS Module', '能描述登录数据流', '能处理 loading 状态']
  }
  return <ChapterShell lesson={lesson} />
}
