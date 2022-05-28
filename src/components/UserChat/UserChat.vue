<template>
  <div class="container">
    <div class="user__chat">
      <div class="user__chat__title">
        <Title>
          <template v-slot:title>
            <p>公開聊天室</p>         
          </template>
        </Title>
      </div>
      <div class="user__chat--container ">
        <div class="user__chat--content scrollbar">
        <UserStatus />
        <UserReceive />
        <UserSend />
        <UserStatus />
        <UserReceive />
        <UserSend />
        </div>
        <div class="user__chat--input">
          <UserInput />
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import Title from '../Title.vue'
import UserStatus from "../UserChat/UserStatus"
import UserReceive from '../UserChat/UserReceive'
import UserSend from '../UserChat/UserSend'
import UserInput from '../UserChat/UserInput'

export default {
  name: "UserChat",
  components: {
    Title,
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
  // max-width: 729px;
  padding:0;
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
    flex: 1;
    padding: 7.5px 16px;
  }
  &--input{
    height: 64px;
  }
}
.user__chat--container{
  display: flex;
  flex-flow: column;
  height: calc(100vh - 80px);
}
.scrollbar { 
  height: calc(100vh - 144px);
  overflow: scroll;
}
</style>
