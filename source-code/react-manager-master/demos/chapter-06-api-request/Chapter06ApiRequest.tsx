import { useState } from 'react'
import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const mockResult = {
  code: 0,
  data: { userName: '教学管理员' },
  msg: 'ok'
}

export default function Chapter06ApiRequest() {
  const [token, setToken] = useState('mock-token-admin')
  const lesson: ChapterLesson = {
    chapter: '第 6 章',
    title: '接口契约与请求层',
    subtitle: '先定义接口边界，再用 request 层统一处理 token、loading、错误和 mock 分流。',
    from: ['学习资料/章节文档/第六章/接口文档.md'],
    goals: ['读懂 API 类型定义', '说明 request 拦截器职责', '理解本地 mock 为什么适合教学'],
    concepts: [
      { title: '为什么需要请求层', body: '页面不应重复处理 baseURL、token、错误弹窗和 loading，这些横切逻辑应集中在 request。' },
      { title: '原理是什么', body: '请求拦截器补 token 和 baseURL，响应拦截器解包 Result，mock 模式直接返回本地数据。' },
      { title: '常见错误', body: '把 AxiosResponse 当业务数据、漏处理 token 失效、接口类型和页面字段不一致。' }
    ],
    basic: (
      <div className='mini-form'>
        <input value={token} onChange={event => setToken(event.target.value)} />
        <code>Authorization: Bearer {token}</code>
      </div>
    ),
    advanced: (
      <div className='flow'>
        <div>page 调用 api.getUserInfo()</div>
        <div>request 注入 token 和 baseURL</div>
        <div>response 解包 data：{mockResult.data.userName}</div>
      </div>
    ),
    project: <code>src/utils/request.ts#L19-L88 拦截器、本地 mock、错误提示集中处理</code>,
    references: [
      { label: '请求封装', path: 'src/utils/request.ts', lines: '#L19-L88', note: '把 token、baseURL、loading、错误和 mock 都放在统一边界。' },
      { label: 'API 聚合', path: 'src/api/index.ts', lines: '#L1-L36', note: '页面只关心业务方法，不直接拼接口地址。' }
    ],
    exercise: '给 request 增加一个 showError=false 的调用示例，验证失败时页面自己接管错误提示。',
    checklist: ['能解释 Result 解包', '能说明 mock 分流位置', '能读懂 token 注入逻辑']
  }
  return <ChapterShell lesson={lesson} />
}
