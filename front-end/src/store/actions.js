import { INSERT_USERINFO } from './mutation-types'
export default {
  insertUserInfo (context, userInfo) {
    context.commit(INSERT_USERINFO, userInfo)
  }
}