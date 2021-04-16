export default {
  // 系统导航菜单
  navMenu: [{
    path: '/home',
    text: '首页',
  },
  {
    path: '/entireRent',
    text: '整租',
  },
  {
    path: '/shareRent',
    text: '合租',
  },
  {
    path: '/publishHouse',
    text: '发布房源',
  },
  {
    path: '/reportFakeHouse',
    text: '举报虚假房源',
  },
  {
    path: '/advice',
    text: '反馈意见',
  },
  ],
  // 侧边栏导航菜单
  siderMenu: [{
    path: '/collection',
    text: '我关注的房源',
    icon: 'smile'
  },
  {
    path: '/publishHouse',
    text: '发布房源',
    icon: 'bank'
  },
  {
    path: '/reportFakeHouse',
    text: '举报虚假房源',
    icon: 'dislike'
  },
  {
    path: '/advice',
    text: '反馈意见',
    icon: 'notification'
  },
  ],
  // 房源状态
  statusList: {
    disRented: {
      color: '#1890ff',
      key: 'disRented',
      label: '未出租',
    },
    rented: {
      color: '#0F62FE',
      key: 'rented',
      label: '出租中',
    },
    offline: {
      color: '#52C41A',
      key: 'offline',
      label: '已下架',
    },
  },
  // 出租方式 选项列表
  typeList: [
    { label: '不限', value: 'null' },
    { label: '整租', value: 'entire' },
    { label: '分租', value: 'share' }
  ],
  // 房间朝向 选项列表
  directList: [
    { label: '东', value: 'east' },
    { label: '西', value: 'west' },
    { label: '南', value: 'south' },
    { label: '北', value: 'north' }
  ],
  // 出租价格 选项列表
  priceList: [
    { label: '≤1500', value: '0-1500' },
    { label: '1500-2000', value: '1500-2000' },
    { label: '2000-3000', value: '2000-3000' },
    { label: '3000-5000', value: '3000-5000' },
    { label: '5000-8000', value: '5000-8000' },
    { label: '≥8000', value: '8000-?' },
  ],
  // 房间数量 选项列表
  numList: [
    { label: '一居', value: '1' },
    { label: '两居', value: '2' },
    { label: '三居', value: '3' },
    { label: '四居+', value: '4' },
  ],
}