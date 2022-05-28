<template>
  <div class="user__list">
    <div class="user__list__title">
      <Title>
        <template v-slot:title>
          <div class="title__container">
            <img src="../assets/static/images/navLogo@2x.png" alt="">
            <p>上線使用者(5)</p>
          </div>                
        </template>
      </Title>
    </div>
   
    
  </div>
</template>
<script>
import Title from '../components/Title.vue'
export default {
  components: {
    Title
  }
  
}
</script>
<style lang="scss" scoped>
 @import "../assets/scss/_basic.scss";
  .user__list{
    border: 1px solid $border-grey;
    border-right: 0;
    height: 100vh;
  }
  .title__container{
    display: flex;
    align-items: center;
    height: 100%;
    img{
      width: 40px;
      height: 40px;
    }
    p{
      margin-left: 1rem;
    }
  }
</style>