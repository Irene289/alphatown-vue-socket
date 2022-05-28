<template>
  <div class="user__card">
    <img class="user__card__avatar" src="https://picsum.photos/50" alt="">
    <p class="user__card__name">Apple</p>
    <p class="user__card__account">@apple</p>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/_basic.scss";
  .user__card{
    display: flex;
    align-items: center;
    padding: 16px;
    height: 81px;
    @extend %bottom-line;
    &__avatar{
      margin-right: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    &__name{
      margin-right: 5px;
      @extend %tweet-name;
    }
    &__account{
      display: inline;
      @extend %tweet-account;
      vertical-align: baseline;
    }
    
  }
</style>