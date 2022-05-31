<template>
  <div class="container-logo-title">
    <!-- logo -->
    <div class="logo">
      <img
        class="logo-img"
        src="../assets/static/images/alphaTown2.png"
        alt=""
      />
    </div>
    <!-- title -->
    <div class="title">
      <slot name="title">
        <h1 class="title-text">標題</h1>
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
.container-logo-title {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.logo {
  .logo-img {
    width: 50px;
    height: 50px;
    margin: 64px 0 24px 0;
  }
}
.title {
  text-align: center
}
.title-text {
  @extend %heading;
  margin-bottom: 8px;
}
</style>