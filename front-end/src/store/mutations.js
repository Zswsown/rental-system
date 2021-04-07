import { INSERT_USERINFO } from './mutation-types'
export default {
  [INSERT_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}