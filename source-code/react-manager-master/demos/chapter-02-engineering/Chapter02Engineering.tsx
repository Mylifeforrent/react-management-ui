import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 2 章',
  title: '工程化环境',
  subtitle: '先把项目跑稳，再用脚本、格式化、Lint 和 Vite 建立团队协作的底座。',
  from: ['学习资料/章节文档/第二章/2-5 Yarn 和 Npm 配置.md', '学习资料/章节文档/第二章/2-7 ESLint配置.md'],
  goals: ['解释 package scripts 的职责', '区分 dev、lint、test、build 的验证边界', '定位 Vite 配置和路径别名'],
  concepts: [
    { title: '为什么需要工程化', body: '后台项目会长期迭代，工程化把启动、检查、构建变成团队共享的标准动作。' },
    { title: '原理是什么', body: 'Vite 负责开发服务和模块转换，TypeScript 做类型约束，ESLint/Prettier 约束代码一致性。' },
    { title: '常见错误', body: '直接打开 TSX 入口、端口被占用、依赖未安装、脚本和真实配置不一致。' }
  ],
  basic: (
    <div className='flow'>
      <div>yarn install：安装依赖并锁定版本</div>
      <div>yarn dev：启动 Vite 开发服务</div>
      <div>yarn build：类型检查后生成生产产物</div>
    </div>
  ),
  advanced: (
    <div className='mini-table'>
      <div>
        <span>脚本</span>
        <span>用途</span>
      </div>
      <div>
        <span>lint</span>
        <span>提前发现风格和潜在错误</span>
      </div>
      <div>
        <span>test</span>
        <span>验证函数和组件行为</span>
      </div>
    </div>
  ),
  project: <code>vite.config.ts:7-31 配置 host、port、proxy、alias 和 build chunks</code>,
  references: [
    { label: '脚本入口', path: 'package.json', lines: '#L6-L35', note: '把开发、教程、章节 demo、测试和构建统一成可复用命令。' },
    { label: '构建配置', path: 'vite.config.ts', lines: '#L6-L34', note: 'Vite dev server、路径别名和打包拆分都在这里收口。' }
  ],
  exercise: '新增一个只打开本章 demo 的脚本，要求使用 5173 端口并能通过浏览器访问。',
  checklist: ['能说出每个脚本的用途', '能解释为什么 demo 必须通过 Vite 打开', '能定位 alias 配置']
}

export default function Chapter02Engineering() {
  return <ChapterShell lesson={lesson} />
}
