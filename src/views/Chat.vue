<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <UserList />
      </div>
      <div class="col-8">
        <UserChat />
      </div>
    </div>
  </div>
</template>
<script>
import UserList from "../components/UserList.vue";
import UserChat from "../components/UserChat/UserChat.vue";
export default {
  name: "Chat",
  components: {
    UserList,
    UserChat
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .row > *{
    padding:0;
    margin: 0;
  }
</style>
