<template>
  <div class="container">
    <!-- logo -->
    <div class="logo">
      <img
        class="logo-img"
        src="../assets/static/images/logo@2x.jpg"
        alt=""
      />
    </div>
    <!-- title -->
    <div class="title">
      <slot name="title">
        <h1 class="title-text">
          標題
        </h1>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
name: 'InputTitle'  
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/basic.scss";
.logo {
  .logo-img {
    width: 50px;
    height: 50px;
    margin: 64px 0 24px 0;
  }
}
.title-text {
  @extend %heading;
  margin-bottom: 8px;
}
</style>