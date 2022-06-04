<template>
  <div class="container">
    <InputTitle>
      <template v-slot:title>
        <h1 class="title-text">建立你的帳號</h1>
      </template>
      <template> </template>
    </InputTitle>

    <form class="form-items" action="" @submit.stop.prevent="signUp">

      <InputForm v-for="item in items" :key="item.id">
        <template v-slot:input>
          <div class="form-item">
            <label class="form-label">{{ item.label }}</label>
            <input
              v-model="item.model"
              class="form-input"
              :name="item.name"
              :type="item.type"
              :placeholder="item.placeholder"
              required
            />
          </div>
        </template>
      </InputForm>
      
      <!-- btn -->
      <div class="form-btns">
        <button class="form-btn" type="submit">{{isProcessing? '處理中':'註冊'}}</button>
        <div class="form-cancel">
          <router-link class="form-cancel-btn" to="/signin"> 取消 </router-link>
        </div>
      </div>
      
    </form>
  </div>
</template>

<script>
import InputTitle from "../components/InputTitle";
import InputForm from "../components/InputForm.vue";
import authorizationAPI from "../api/authorization"
// import userAPI from "../api/user"
import {Toast} from "../utils/helpers"

export default {
  name: "Signup",
  components: {
    InputTitle,
    InputForm,
  },
  data() {
    return {
      isProcessing: false,
      items: [
        {
          id: 1,
          label: "帳號",
          name: "account",
          type: "text",
          placeholder: "請輸入帳號",
          model: ''
        },
        {
          id: 2,
          label: "名稱",
          name: "name",
          type: "text",
          placeholder: "請輸入使用者名稱",
          model: ''
        },
        {
          id: 3,
          label: "密碼",
          name: "password",
          type: "password",
          placeholder: "請設定密碼",
          model: ''
        },
        {
          id: 4,
          label: "密碼確認",
          name: "passwordCheck",
          type: "password",
          placeholder: "請再次輸入密碼",
          model: ''
        },
      ],
    };
  },
  methods:{
    async signUp(){
      //避免空白
      if (
        !this.items[0].model ||
        !this.items[1].model ||
        !this.items[2].model ||
        !this.items[3].model 
      ){
        Toast.fire({
            icon: 'warning',
            title: '請填寫完整資料，不可空白'
          })
        return 
      }
      //密碼比對
      if ( this.items[2].model !== this.items[3].model){
         Toast.fire({
            icon: 'warning',
            title: '密碼和密碼確認不同，請再次確認'
          })
        return 
      }
      try{
        this.$socket.open()
        this.isProcessing = true
        const {data} = await authorizationAPI.signup({
          account: this.items[0].model,
          name: this.items[1].model,
          password: this.items[2].model,
          passwordCheck: this.items[3].model
        })
        if(data.status !== 'success'){
          throw new Error (data.data.message)
        }
        // //socket傳送新註冊用戶資料
        this.$socket.emit('user_login', data.data) 
        const token = data.data.token
        //註冊後直接導向首頁
        localStorage.setItem('token', token)
        this.$store.commit('setToken', token)
        this.$router.push('/chat')        
      }catch(error){
        this.isProcessing = false   
        //重複註冊 
        if (error.response.status === 409){
            Toast.fire({
            icon: 'warning',
            title: error.response.data.message
          })
        } else {
          //其他錯誤
           Toast.fire({
            icon: 'error',
            title: error.response.data.message
          })
        }       
      }      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/basic.scss";
.container {
  width: 100vw;
  max-width: 1140px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
}
.title-text {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.form-btns {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.form-btn {
  @extend %button-orange;
  width: 356px;
  height: 46px;
  margin-top: 32px;
}
.form-cancel {
  margin-top: 16px;
  text-align: center;
  .form-cancel-btn {
    color: $form-link-blue;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>