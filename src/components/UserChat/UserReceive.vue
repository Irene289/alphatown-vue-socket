<template>
  <div class="user__chat--receive">
    <div class="user__chat--receive-img">
      <img src="../../assets/static/images/logo@2x.jpg" alt="">
    </div>
    <div class="user__chat--receive-content">
      <p class="content-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus debitis dicta velit non nihil dignissimos perferendis nam quaerat, vel blanditiis ex? Nobis quidem necessitatibus delectus laborum ab quasi nihil corrupti.
      </p>
      <p class="content-time">下午11:26</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserReceive'
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.user__chat--receive {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin: 10px 0;
  &-img img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 8px;
  }
  &-content {
    max-width: 365px;
  }
}
.content-text {
  @extend %user-receive;
  margin-bottom: 2px;
}
.content-time {
  @extend %user-chat-time ;
}
</style>
