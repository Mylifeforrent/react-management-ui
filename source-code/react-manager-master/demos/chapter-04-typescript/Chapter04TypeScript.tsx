import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

interface ApiRow {
  name: string
  type: 'string' | 'number' | 'boolean'
}

const rows: ApiRow[] = [
  { name: 'userName', type: 'string' },
  { name: 'role', type: 'number' },
  { name: 'enabled', type: 'boolean' }
]

const lesson: ChapterLesson = {
  chapter: '第 4 章',
  title: 'TypeScript',
  subtitle: '把接口、组件 props、工具函数和第三方 SDK 都纳入类型系统。',
  from: ['学习资料/章节文档/第四章/接口.md', '学习资料/章节文档/第四章/泛型.md', '学习资料/章节文档/第四章/void、never、any、unknown类型.md'],
  goals: ['用 interface 描述业务对象', '用泛型表达接口响应', '知道 unknown 比 any 更安全'],
  concepts: [
    { title: '为什么需要类型', body: '后台字段多、接口多，类型能把字段约定前移到开发阶段，减少运行时才发现的错误。' },
    { title: '原理是什么', body: 'TypeScript 在编译阶段检查结构兼容性，运行时仍是 JavaScript，所以边界数据仍要校验。' },
    { title: '项目落地', body: 'src/types/api.ts 集中描述登录、用户、菜单、角色、订单等接口契约。' }
  ],
  basic: (
    <div className='mini-table'>
      <div>
        <span>字段</span>
        <span>类型</span>
      </div>
      {rows.map(row => (
        <div key={row.name}>
          <span>{row.name}</span>
          <span>{row.type}</span>
        </div>
      ))}
    </div>
  ),
  advanced: <code>{'request.get<User.UserItem[]>("/users/all/list")'}</code>,
  project: <code>src/types/api.ts#L1-L155 定义通用 Result、分页和 Dashboard 类型</code>,
  references: [
    { label: '接口类型', path: 'src/types/api.ts', lines: '#L1-L155', note: '类型文件把 API 返回和页面字段统一起来。' },
    { label: '全局声明', path: 'src/types/index.d.ts', lines: '#L1-L38', note: '为 BMapGL 等全局 SDK 补声明，避免散落 any。' }
  ],
  exercise: '为一个“课程章节”对象补充 interface，包含 title、path、finished 三个字段。',
  checklist: ['能写 interface', '能解释泛型返回值', '能说明 declare 的使用场景']
}

export default function Chapter04TypeScript() {
  return <ChapterShell lesson={lesson} />
}
