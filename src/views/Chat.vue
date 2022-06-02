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
  sockets: {
    connect: function() {
      console.log("連線成功")
    },
    online_users(data) {
      const filteredData = data.map( user => {
        if(!user.avatar) {
          return {
            ...user,
            avatar: require("../assets/static/images/alphaTown2.png")
          }
        } else {
          return user
        }
      })
      this.$store.commit('setOnlineUsers', filteredData)

      // const newUser = filteredData.pop()
      // console.log(newUser)
    },
    user_joins(user) {
      console.log('user_joins!!', user)
    }
  }
}
</script>
<style lang="scss" scoped>
  .row > *{
    padding:0;
    margin: 0;
  }
</style>
