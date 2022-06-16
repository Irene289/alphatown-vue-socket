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
      <div class="user__chat--container scrollbar" ref="chat__container" >
        <div
          v-for="(content, index) in contentList"
          :key="'content'+ index"
          class="user__chat--content"
        >
          <!-- user status -->
          <div v-if="!content.message" class="user__chat--status">
            <p v-show="content.status === 'login'" class="user__chat--status-item">{{ content.data.name }} 上線</p>
            <p v-show="content.status === 'logout'" class="user__chat--status-item">{{ content.data.name }} 離線</p>
          </div>
          <!-- user receive -->
          <div
            v-if="content.sender.id !== currentUser.id && !content.status"
            class="user__chat--receive"
          >
            <div class="user__chat--receive-img">
              <img :src="content.sender.avatar" alt="" />
            </div>
            <div v-show="content.message" class="user__chat--receive-content">
              <p class="content-text">
                {{content.message}}
              </p>
              <p class="content-time">
                {{ content.createdAt }}
              </p>
            </div>
          </div>
          <!-- user send -->
          <div 
            v-else-if="content.sender.id === currentUser.id && !content.status"
            class="user__chat--send"
          >
            <div v-show="content.message" class="user__chat--send-content">
              <p class="content-text">
                {{content.message}}
              </p>
              <p class="content-time">
                {{ content.createdAt }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--  user input -->
      <div class="user__chat--input">
        <form action="" class="user__chat--input" @submit.stop.prevent="msgSend">
          <input v-model.trim="msgData.text" type="text" placeholder="輸入訊息..." />
          <button>
            <img src="../assets/static/images/icon_send@2x.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./Title.vue";
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
        text: '',
        createdAt: ''
      },
      joinUser:{},
      logoutUser:'',
      contentList:[],
      contentItem:{
        status:'',
        data:{},
        sender:{},
        message:'',
        createdAt: '',
      }
    }
  },
  methods: {
    msgSend() {
      if (!this.msgData.text) {
        return
      } 
      this.$socket.emit("user_send_message", {
        id: this.currentUser.id,
        account: this.currentUser.account,
        name: this.currentUser.name,
        avatar: this.currentUser.avatar,
        text: this.msgData.text,
        createdAt: new Date()
      });
      this.msgData.text = ''
    },
    //每次有新訊息scroll都會自動捲至最底部，顯示新訊息
    scrollBottom(){
      //等畫面更新後再即時抓取屬性
      this.$nextTick(() => {
        let dom = this.$refs.chat__container
        dom.scrollTop = dom.scrollHeight 
      })
    }
  },
  sockets: {
    new_message: function(data){
      this.contentItem = {
        ...this.contentItem,
        status:'',
        data: '',
        sender: data.sender,
        message: data.message,
        createdAt: data.createdAt
      }
      if (!this.contentItem.sender.avatar) {
        this.contentItem.sender.avatar = require("../assets/static/images/alphaTown2.png")
      }
      this.contentItem.createdAt = this.$timeFormat(this.contentItem.createdAt)
      this.contentList.push(this.contentItem)
    },
    user_leaves: function(data){
       this.contentItem = {
        ...this.contentItem,
        message:'',
        sender:{},
        data: data.data,
        status: data.status,
        createdAt: '',
      }
      this.contentList.push(this.contentItem)
    },
    user_joins: function(data){
      this.contentItem = {
        ...this.contentItem,
        message:'',
        sender:{},
        data: data.data,
        status: data.status,
        createdAt: '',
      }
      this.contentList.push(this.contentItem)
    }
  },
  computed: {
    ...mapState(["onlineUsers", "currentUser"]),
  },
  updated(){
    this.scrollBottom()
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/basic.scss";
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
    // flex: 1;
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