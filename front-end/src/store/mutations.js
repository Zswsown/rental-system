import { INSERT_USERINFO, CLEAN_USERINFO } from './mutation-types'
export default {
  [INSERT_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [CLEAN_USERINFO] (state) {
    state.userInfo = {}
  }
}