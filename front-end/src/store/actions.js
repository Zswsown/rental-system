import { INSERT_USERINFO, CLEAN_USERINFO, INSERT_HOUSE_COLLECTION } from './mutation-types'
export default {
  insertUserInfo ({ commit }, userInfo) {
    commit(INSERT_USERINFO, userInfo)
  },
  cleanUserInfo ({ commit }) {
    commit(CLEAN_USERINFO)
  },
  insertHouseCollection ({ commit }, userRentalHouseCollection) {
    commit(INSERT_HOUSE_COLLECTION, userRentalHouseCollection)
  }
}