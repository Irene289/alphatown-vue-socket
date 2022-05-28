<template>
  <div class="title">   
      <div class=title__content>
        <slot name="title"/>
      </div>
   
  </div>
</template>
<style lang="scss" scoped>
 @import "../assets/scss/_basic.scss";
  .title__content{
    padding: 24px;
    height: 80px;
    font-size: 24px;;
    font-weight: 700;
    border-bottom: 1px solid $border-grey;
  }
</style>