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
import UserChat from "../components/UserChat.vue";
import { mapState } from 'vuex'
export default {
  name: "Chat",
  components: {
    UserList,
    UserChat
  },
  data() {
    return {
      onlineUser: []
    }
  },
  created() {
    this.connect()
    this.getOnlineUsers(this.onlineUser)
  },
  methods: {
    connect() {
      this.$socket.emit('user_login', this.currentUser)
    },
    getOnlineUsers(data) {
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
    }
  },
  sockets: {
    online_users(data) {
      this.getOnlineUsers(data)
      this.onlineUser = [...data]
    }
  },
  computed: {
    ...mapState(['onlineUsers','currentUser'])
  },
}
</script>
<style lang="scss" scoped>
  .row > *{
    padding:0;
    margin: 0;
  }
</style>
