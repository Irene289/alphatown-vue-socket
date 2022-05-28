<template>
  <div class="container">
    <div>
      <UserList />
    </div>
     <div>
      <UserChat />
    </div>

  </div>
</template>
<script>
import UserList from '../components/UserList.vue'
import UserChat from '../components/UserChat.vue'
export default {
  name:'Chat',
  components:{
    UserList,
    UserChat
  }
  
}
</script>