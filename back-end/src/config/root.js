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
  statusKeyValue: {
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