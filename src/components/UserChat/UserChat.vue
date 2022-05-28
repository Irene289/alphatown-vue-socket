<template>
  <div class="container">
    <div class="user__chat">
      <h1 class="user__chat--title">公開聊天室</h1>
      <div class="user__chat--content">
        <UserStatus />
        <UserReceive />
        <UserSend />
      </div>
      <div class="user__chat--input">
        <UserInput />
      </div>
    </div>
  </div>
</template>

<script>
import UserStatus from "../UserChat/UserStatus"
import UserReceive from '../UserChat/UserReceive'
import UserSend from '../UserChat/UserSend'
import UserInput from '../UserChat/UserInput'

export default {
  name: "UserChat",
  components: {
    UserStatus,
    UserReceive,
    UserSend,
    UserInput
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.container {
  max-width: 729px;
}
.user__chat {
  width: 100%;
  height: 100vh;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  &--title {
    @extend %heading-24;
    padding: 24px;
    border-bottom: 1px solid #e6ecf0;
  }
  &--content {
    padding: 7.5px 16px;
  }
}
</style>
