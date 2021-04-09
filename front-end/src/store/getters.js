export default {
  // 判断是否登录
  isLogin (state) {
    return Object.keys(state.userInfo).length !== 0;
  },
  // 判断用户身份
  userRole (state, getters) {
    return getters.isLogin ? state.userInfo.role : 'system error'
  }
}