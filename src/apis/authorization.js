import { apiHelper } from "../utils/helpers";

export default {
  signIn({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  },
  signup({account, name, password, passwordCheck}){
    return apiHelper.post('user', {
      account,
      name,
      password,
      passwordCheck
    })
  }
}