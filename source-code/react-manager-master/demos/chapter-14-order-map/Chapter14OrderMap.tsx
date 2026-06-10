import ChapterShell, { ChapterLesson } from '../chapter-common/ChapterShell'

const lesson: ChapterLesson = {
  chapter: '第 14 章',
  title: '订单与地图',
  subtitle: '订单列表进入详情、轨迹地图、地图聚合和司机列表，体现外部 SDK 与业务数据结合。',
  from: ['学习资料/章节文档/第十四章/14-1 订单列表接口.md', '学习资料/章节文档/第十四章/14-4 轨迹地图.md', '学习资料/章节文档/第十四章/14-8 订单聚合.md'],
  goals: ['实现订单查询和列表操作', '理解地图 SDK 按需加载', '说明轨迹点、折线和动画的关系'],
  concepts: [
    { title: '为什么地图要按需加载', body: '地图 SDK 大且只服务订单地图页面，放在首屏会拖慢登录和普通列表。' },
    { title: '原理是什么', body: '打开地图弹窗时先加载 SDK，再用订单 route 点生成 Point、Polyline 和轨迹动画。' },
    { title: '项目落地', body: '订单页组件通过 ref 打开弹窗，地图组件内部调用 loadBMap 后再渲染地图。' }
  ],
  basic: (
    <div className='mini-table'>
      <div>
        <span>订单</span>
        <span>城市</span>
      </div>
      <div>
        <span>DD202606100001</span>
        <span>北京</span>
      </div>
    </div>
  ),
  advanced: (
    <div className='flow'>
      <div>订单详情返回 route 点位</div>
      <div>loadBMap 按需加载 SDK</div>
      <div>Polyline + TrackAnimation 播放轨迹</div>
    </div>
  ),
  project: <code>src/views/order/OrderList/components/OrderRoute.tsx#L20-L70 按需加载地图并渲染轨迹</code>,
  references: [
    { label: '轨迹地图', path: 'src/views/order/OrderList/components/OrderRoute.tsx', lines: '#L20-L70', note: '打开弹窗后加载地图 SDK 并创建轨迹动画。' },
    { label: 'SDK 加载', path: 'src/utils/loadBMap.ts', lines: '#L1-L35', note: '封装脚本加载，避免全局 index.html 预加载地图。' }
  ],
  exercise: '给订单轨迹弹窗增加“无轨迹点”空状态，并避免初始化地图。',
  checklist: ['能说明 SDK 按需加载收益', '能解释 route 点位结构', '能定位地图弹窗入口']
}

export default function Chapter14OrderMap() {
  return <ChapterShell lesson={lesson} />
}
