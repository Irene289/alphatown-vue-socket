<template>
  <div class="container">
    <InputTitle>
      <template v-slot:title>
        <h1 class="title-text">登入 Alphitter</h1>
      </template>
      <template> </template>
    </InputTitle>

    <form class="form-items" action="">

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
        <button class="form-btn" type="submit">按鈕</button>
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

export default {
  name: "Signin",
  components: {
    InputTitle,
    InputForm,
  },
  data() {
    return {
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
          label: "密碼",
          name: "password",
          type: "password",
          placeholder: "請設定密碼",
          model: ''
        },
      ],
    };
  },
};
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