export default {
    // 系统导航菜单
    navMenu: [{
        path: 'home',
        text: '首页',
    },
    {
        path: 'entireRent',
        text: '整租',
    },
    {
        path: 'shareRent',
        text: '合租',
    },
    {
        path: 'publishHouse',
        text: '发布房源',
    },
    {
        path: 'reportFakeHouse',
        text: '举报虚假房源',
    },
    ],
    // 侧边栏导航菜单
    siderMenu: [{
        path: 'collection',
        text: '我关注的房源',
        icon: 'smile'
    },
    {
        path: 'publishHouse',
        text: '发布房源',
        icon: 'bank'
    },
    {
        path: 'reportFakeHouse',
        text: '举报虚假房源',
        icon: 'dislike'
    },
    {
        path: 'advice',
        text: '反馈意见',
        icon: 'notification'
    },
    ],
    // 房源状态
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