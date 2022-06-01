<template>
  <div>
    <div v-for="user in onlineUsers" :key="user.id" class="user__card">
      <img class="user__card__avatar" :src="user.avatar" alt="" />
      <p class="user__card__name">{{ user.name }}</p>
      <p class="user__card__account">@{{ user.account }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["onlineUsers"]),
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_basic.scss";
.user__card {
  display: flex;
  align-items: center;
  padding: 16px;
  height: 81px;
  @extend %bottom-line;
  &__avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__name {
    margin-right: 5px;
    @extend %tweet-name;
  }
  &__account {
    display: inline;
    @extend %tweet-account;
    vertical-align: baseline;
  }
}
</style>