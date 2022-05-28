<template>
  <div class="user__chat--send">
    <div class="user__chat--send-content">
      <p class="content-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus debitis dicta velit non nihil dignissimos perferendis nam quaerat, vel rupti.
      </p>
      <p class="content-time">下午11:26</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSend'
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.user__chat--send {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: 10px 0;
  
  &-content {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    max-width: 365px;
  }
}
.content-text {
  @extend %user-send;
  margin-bottom: 2px;
}
.content-time {
  @extend %user-chat-time;
}
</style>
