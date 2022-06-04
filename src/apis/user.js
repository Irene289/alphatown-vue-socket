import { apiHelper } from "../utils/helpers";

export default{
  getCurrentUser(){
    return apiHelper.get('current_user')
  }
}