<template>
  <div class="user__chat--status">
    <p class="user__chat--status-item">Esther Howard 上線</p>
  </div>
</template>

<script>
export default {
  name: "UserStatus",
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.user__chat--status {
  text-align: center;
  padding: 7.5px 0;
  &-item {
    display: inline-block;
    height: 29px;
    background-color: #e5e5e5;
    color: #657786;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    border-radius: 50px;
    padding: 7px 14px;
  }
}
</style>