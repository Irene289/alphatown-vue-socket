<template>
  <div class="container">
    <div class="user__chat">
      <div class="user__chat__title">
        <Title>
          <template v-slot:title>
            <p>公開聊天室</p>
          </template>
        </Title>
      </div>
      <div class="user__chat--container scrollbar">
        <!-- TODO: 暫填，非正確 data -->
        <div
          v-for="(content, index) in contentList"
          :key="'content'+index"
          class="user__chat--content"
        >
          <!-- user status -->
          <div class="user__chat--status">
            <!-- TODO: 使用者上下線 -->
            <p v-show="content.status === 'login' " class="user__chat--status-item">{{ content.data.name }} 上線</p>
            <p v-show="content.status === 'logout'" class="user__chat--status-item">{{ content.data.name }} 離線</p>
          </div>
          <!-- user receive -->
          <div 
            v-if="content.sender.id !== currentUser.id"
            class="user__chat--receive"
          >
            <div class="user__chat--receive-img">
              <img :src="content.sender.avatar" alt="" />
            </div>
            <div v-show="content.message" class="user__chat--receive-content">
              <p class="content-text">
                {{'別人'+ content.message}}
              </p>
              <p class="content-time">
                <!-- TODO: {{ user.createdAt }} -->
                下午11:26
              </p>
            </div>
          </div>
          <!-- user send -->
          <div 
            v-else
            class="user__chat--send"
          >
            <div v-show="content.message" class="user__chat--send-content">
              <p class="content-text">
                <!-- TODO: {{ user.msg }} -->
                {{'自己'+ content.message}}
              </p>
              <p class="content-time">
                <!-- TODO: {{ user.createdAt }} -->
                下午11:26
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--  user input -->
      <div class="user__chat--input">
        <div class="user__chat--input">
          <input  v-model="msgData.text" type="text" placeholder="輸入訊息..." />
          <button @click.stop.prevent="msgSend">
            <img src="../../assets/static/images/icon_send@2x.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../Title.vue";
import { mapState } from "vuex";

export default {
  name: "UserChat",
  components: {
    Title,
  },
  data() {
    return {
      msgData:{
        id:'',
        account:'',
        name: '',
        avatar: '',
        text:""
      },
      joinUser:{},
      logoutUser:'',
      contentList:[],
      contentItem:{
        status:'',
        data:{},
        sender:{},
        message:''
      }
    }
  },
  methods: {
    msgSend() {
      console.log(this.msgData);
      this.$socket.emit("user_send_message", {
        id: this.currentUser.id,
        account: this.currentUser.account,
        name: this.currentUser.name,
        avatar: this.currentUser.avatar,
        text: this.msgData.text
      });
      this.msgData.text = ''
    
    },
    fetchNewUser() {
      this.newUser = { ...this.onlineUsers[this.onlineUsers.length - 1] };
      // console.log(this.onlineUsers[this.onlineUsers.length - 1]);
    },
  },
  created() {
    this.fetchNewUser();
  },
  sockets: {
    new_message: function(data){
      this.contentItem = {
        ...this.contentItem,
        status:'',
        data: '',
        sender: data.sender,
        message: data.message
      }
      this.contentList.push(this.contentItem)
    },
    user_leaves: function(data){
       this.contentItem = {
        ...this.contentItem,
        message:'',
        sender:{},
        data: data.data,
        status: data.status
      }
      this.contentList.push(this.contentItem)
    },
    user_joins: function(data){
      this.contentItem = {
        ...this.contentItem,
        message:'',
        sender:{},
        data: data.data,
        status: data.status
      }
      this.contentList.push(this.contentItem)
      console.log('userChat', data)
    }

  },
  computed: {
    ...mapState(["onlineUsers", "currentUser"]),
  },
  
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/basic.scss";
.container {
  padding: 0;
}
.user__chat {
  width: 100%;
  height: 100vh;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  &--title {
    @extend %heading-24;
    padding: 24px;
    border-bottom: 1px solid #e6ecf0;
  }
  &--content {
    flex: 1;
    padding: 7.5px 16px;
  }
  &--input {
    height: 64px;
  }
}
.user__chat--container {
  display: flex;
  flex-flow: column;
  height: calc(100vh - 80px);
}
.scrollbar {
  height: calc(100vh - 144px);
  overflow-y: scroll;
}
// status
.user__chat--status {
  text-align: center;
  padding: 7.5px 0;
  &-item {
    display: inline-block;
    height: 29px;
    background-color: #e5e5e5;
    color: #657786;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    border-radius: 50px;
    padding: 7px 14px;
  }
}
// receive msg
.user__chat--receive {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin: 10px 0;
  &-img img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 8px;
  }
  &-content {
    max-width: 365px;
  }
  .content-text {
    @extend %user-receive;
    margin-bottom: 2px;
  }
}
.content-time {
  @extend %user-chat-time;
}
// send msg
.user__chat--send {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: 10px 0;

  &-content {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    max-width: 365px;
  }
  .content-text {
    @extend %user-send;
    margin-bottom: 2px;
  }
}
// input
.user__chat--input {
  width: 100%;
  height: 64px;
  border-top: 1px solid #e6ecf0;
  display: flex;
  align-items: center;
}
input {
  @extend %form-input;
  width: 100%;
  border: none;
  background: $form-input-grey;
  border-radius: 50px;
  margin: 16px;
  ::placeholder {
    color: $form-input-placeholder;
  }
}
button img {
  @extend %icon-24;
  margin-left: -10px;
}
</style>