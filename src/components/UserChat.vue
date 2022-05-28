<template>
  <div class="user__chat">
    <div class="user__chat__title">
      <Title>
        <template v-slot:title>
          <p>公開聊天室</p>         
        </template>
      </Title>
    </div>
    
    
  </div>
</template>
<script>
import Title from '../components/Title.vue'
export default {
  name: 'UserChat',
  components: {
    Title
  }
}
</script>
<style lang="scss" scoped>
  @import "../assets/scss/_basic.scss";
  .user__chat{
    border: 1px solid $border-grey;
    height: 100vh;
  }

</style>