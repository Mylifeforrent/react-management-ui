import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 9 章',
  title: '工作台',
  subtitle: '把用户信息、统计指标和 ECharts 图表组合成后台首页的数据看板。',
  from: ['学习资料/章节文档/第九章/工作台个人信息交互.md', '学习资料/章节文档/第九章/工作台图表数据交互.md'],
  goals: ['从 store 读取用户信息', '调用统计接口渲染卡片', '理解 ECharts option 和自定义 useCharts'],
  concepts: [
    { title: '为什么工作台重要', body: '工作台是用户登录后第一屏，需要同时验证用户态、接口层、图表渲染和布局承载能力。' },
    { title: '原理是什么', body: '页面 useEffect 拉取数据，useCharts 初始化实例，接口返回被转成 ECharts option。' },
    { title: '常见错误', body: '图表容器没有尺寸、setOption 数据结构不匹配、组件卸载后仍更新图表。' }
  ],
  basic: (
    <div className='metric'>
      今日订单 <b>32,041</b>
    </div>
  ),
  advanced: (
    <div className='chip-row'>
      <span className='chip'>折线图：订单 / 流水</span>
      <span className='chip'>饼图：城市 / 年龄</span>
      <span className='chip'>雷达图：司机模型</span>
    </div>
  ),
  project: <code>src/views/dashboard/index.tsx#L28-L146 把接口数据转成 ECharts option</code>,
  references: [
    { label: '工作台页面', path: 'src/views/dashboard/index.tsx', lines: '#L28-L146', note: '四类图表分别从接口拿数据后 setOption。' },
    { label: '图表 Hook', path: 'src/hook/useCharts.ts', lines: '#L4-L12', note: '统一初始化 ECharts 实例并返回 ref 和 chart。' }
  ],
  exercise: '新增一个“开通城市增长率”指标卡，并给出 mock 数据。',
  checklist: ['能说明统计卡片数据来源', '能写出基础 ECharts option', '能解释 useCharts 返回值']
}

export default function Chapter09Dashboard() {
  return <ChapterShell lesson={lesson} />
}
