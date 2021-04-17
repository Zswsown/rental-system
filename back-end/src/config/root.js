export default {
  // 侧边栏导航菜单
  siderMenu: [{
    path: '/news',
    text: '推送租房资讯',
    icon: 'smile'
  },
  {
    path: '/code',
    text: '审核房源管家账号',
    icon: 'bank'
  },
  {
    path: '/advice',
    text: '查看反馈意见',
    icon: 'dislike'
  },
  {
    path: '/report',
    text: '查看举报信息',
    icon: 'notification'
  },
  ],
  // 回复 举报虚假房源状态列表
  replyStatusList: {
    replied: {
      color: '#1890ff',
      label: '已回复'
    },
    unreplied: {
      color: '#0F62FE',
      label: '未回复',
    }
  },
  // 出租方式 选项列表
  typeList: [
    { label: '不限', value: 'null' },
    { label: '整租', value: 'entire' },
    { label: '分租', value: 'share' }
  ],
  statusList: {
    disRented: {
      color: '#1890ff',
      label: '未出租',
    },
    rented: {
      color: '#0F62FE',
      label: '出租中',
    },
    offline: {
      color: '#52C41A',
      label: '已下架',
    },
  }
}