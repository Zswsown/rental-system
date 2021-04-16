import { INSERT_USERINFO, CLEAN_USERINFO, INSERT_HOUSE_COLLECTION } from './mutation-types'
export default {
  [INSERT_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [CLEAN_USERINFO] (state) {
    state.userInfo = {}
  },
  [INSERT_HOUSE_COLLECTION] (state, userRentalHouseCollection) {
    state.userRentalHouseCollection = userRentalHouseCollection
  }
}