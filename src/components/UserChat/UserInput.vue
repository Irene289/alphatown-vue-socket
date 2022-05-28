<template>
  <div class="user__chat--input">
    <input type="text" placeholder="輸入訊息...">
    <button><img src="../../assets/static/images/icon_send@2x.png" alt=""></button>
  </div>
</template>

<script>
export default {
  name: 'UserInput'
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.user__chat--input {
  max-width: 698px;
  width: 100%;
  height: 64px;
  border-top: 1px solid #e6ecf0;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
}
input {
  @extend %form-input;
  width: 100%;
  border: none;  
  background: $form-input-grey;
  border-radius: 50px;
  margin: 16px;
  ::placeholder {
    color: $form-input-placeholder;
  }
}
button img {
  @extend %icon-24;
  margin-left: -10px;
}
</style>
