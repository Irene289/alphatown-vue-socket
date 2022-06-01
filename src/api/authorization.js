import { apiHelper } from "../utils/helpers";

export default {
  signup({account, name, password, passwordCheck}){
    return apiHelper.post('user', {
      account,
      name,
      password,
      passwordCheck
    })
  }
}