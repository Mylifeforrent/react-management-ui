import { useState } from 'react'
import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

export default function Chapter13Rbac() {
  const [isAdmin, setIsAdmin] = useState(true)
  const lesson: ChapterLesson = {
    chapter: '第 13 章',
    title: '角色与 RBAC',
    subtitle: '把用户、角色、菜单和按钮权限串起来，形成可维护的权限模型。',
    from: ['学习资料/章节文档/第十三章/13-4 权限设置.md', '学习资料/章节文档/第十三章/13-7 按钮权限.md'],
    goals: ['理解 RBAC 模型', '区分 checkedKeys 和 halfCheckedKeys', '实现按钮权限控制'],
    concepts: [
      { title: '为什么需要 RBAC', body: '后台用户多、功能多，权限不能写死在页面里，需要通过角色承载可配置授权。' },
      { title: '原理是什么', body: '用户拥有角色，角色拥有菜单和按钮权限；菜单控制页面入口，按钮控制具体操作。' },
      { title: '项目落地', body: 'AuthLoader 提供 buttonList，AuthButton 根据 auth 和管理员角色决定是否渲染按钮。' }
    ],
    basic: (
      <div className='chip-row'>
        <button onClick={() => setIsAdmin(value => !value)}>{isAdmin ? '超级管理员' : '普通运营'}</button>
        <span className='chip'>{isAdmin ? '显示全部按钮' : '只显示授权按钮'}</span>
      </div>
    ),
    advanced: (
      <div className='mini-tree'>
        <span>系统管理 halfChecked</span>
        <span className='child'>用户管理 checked</span>
        <span className='child'>新增用户 button checked</span>
      </div>
    ),
    project: <code>src/components/AuthButton.tsx#L13-L20 根据 auth、buttonList、role 渲染按钮</code>,
    references: [
      { label: '按钮权限', path: 'src/components/AuthButton.tsx', lines: '#L13-L20', note: '管理员默认放行，否则校验 buttonList 是否包含权限码。' },
      { label: '权限树', path: 'src/views/system/role/SetPermission.tsx', lines: '#L20-L130', note: '角色授权时维护 checkedKeys 和 halfCheckedKeys。' }
    ],
    exercise: '新增 order@delete 按钮权限，并在订单列表中用 AuthButton 包裹删除按钮。',
    checklist: ['能解释 RBAC', '能说明半选节点意义', '能实现按钮权限']
  }
  return <ChapterShell lesson={lesson} />
}
