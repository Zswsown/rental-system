import { INSERT_USERINFO, CLEAN_USERINFO } from './mutation-types'
export default {
  insertUserInfo ({ commit }, userInfo) {
    commit(INSERT_USERINFO, userInfo)
  },
  cleanUserInfo ({ commit }) {
    commit(CLEAN_USERINFO)
  }
}