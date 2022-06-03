<template>
  <div class="user__list">
    <div class="user__list__title">
      <Title>
        <template v-slot:title>
          <div class="title__container">
            <img src="../assets/static/images/alphaTown2.png" alt="">
            <p>上線使用者({{ onlineUsers.length }})</p>
          </div>                
        </template>
      </Title>     
    </div>
    <div class="user__card__list scrollbar">
        <UserCard />
    </div>
    <div 
      class="log-out-container"
      @click.stop.prevent ="onClickLogout"
    >
      <img class="hover-show" src="../assets/static/images/orangeLogout@2x.png" alt="">
      <img class="hover-hidden" src="../assets/static/images/logout@2x.png" alt="">
      <p>登出</p>
    </div>       
  </div>
</template>
<script>
import Title from '../components/Title.vue'
import UserCard from '../components/UserCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'UserList',
  components: {
    Title,
    UserCard
  },
  data() {
    return {
      users: [],
      user: {
        name: '',
        account: '',
        avatar: ''
      }
    }
  },
  methods: {
    // 登出
    onClickLogout() {
      const currentUser = {...this.currentUser}
      this.$store.commit("revokeAuthentication");
      this.$socket.emit('user_logout', currentUser)
      localStorage.removeItem("token");       
      // this.$router.push("/signin");
    }
  },
  computed: {
    ...mapState(['onlineUsers','currentUser'])
  }
}
</script>
<style lang="scss" scoped>
 @import "../assets/scss/_basic.scss";
  .user__list {
    border-left: 1px solid $border-grey;
    height: 100vh;
  }
  .title__container {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      margin-left: 1rem;
    }
  }
  .scrollbar { 
    height: calc(100vh - 144px);
    overflow-y: scroll;
  }
  .log-out-container {
    height: 64px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e6ecf0;
    img {
      width: 20px;
      height: 20px;
      margin-right: 1rem;
      margin-left: 1rem;
    }
    p {
      font-weight: 700;
      color: #44444F;
    }
    img, p {
      cursor: pointer;
    }
    .hover-show {
      display: none;
    }
    &:hover {
      p {
        color: $orange;
      }
      .hover-show {
        display: block;
      }
      .hover-hidden{
        display: none;
      }
    }
  }
</style>