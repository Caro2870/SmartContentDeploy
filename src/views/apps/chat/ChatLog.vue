<template>
  <div class="chats">
    <div v-for="(msgGrp, index) in formattedChatData.formattedChatLog" :key="msgGrp.senderId + String(index)" class="chat"
      :class="{ 'chat-left': msgGrp.senderId === formattedChatData.contact.id }">
      <div class="chat-avatar">
        <b-avatar size="36" class="avatar-border-2 box-shadow-1" variant="transparent"
          :src="msgGrp.senderId === formattedChatData.contact.id ? require('@/assets/images/avatars/AI ASSISTANT.png') : profileUserAvatar" />
      </div>
      <div class="chat-body">

        <div v-for="msgData in msgGrp.messages" :key="msgData.time">
          <div>
            <div class="chat-content">
              <div>
                <p v-html="msgData.msg"> </p>
                <div class="d-flex justify-content-end">
                  <b-button v-if="showChosenButton(msgData)" variant="outline-primary" class="btn-icon" v-b-tooltip.hover.top="'Choose copy'"  @click="chosenMessage(msgData)" :disabled="editing">
                  <feather-icon icon="CheckIcon"/>
                </b-button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BAvatar } from 'bootstrap-vue'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import PostsService from '@/views/smart-content/posts/posts.service.js'

export default {
  components: {
    BAvatar,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
    profileUserAvatar: {
      type: String,
      required: true,
      default: ''
    },
  },
  filters: {
    newlineToBr: function (value) {
      return value.replace(/\n/g, '<br>');
    }
  },
  mounted() {
    console.log('this chatDsata', this.chatData)
  },
  computed: {
    formattedChatData() {
      const contact = {
        id: 'system',
      }

      let chatLog = []
      if (this.chatData.chat) {
        chatLog = this.chatData.chat.chat
      }

      const formattedChatLog = []
      console.log('chatLog ', chatLog)
      let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : undefined
      let msgGroup = {
        senderId: chatMessageSenderId,
        messages: [],
      }

      chatLog.forEach((msg, index) => {
        if (chatMessageSenderId === msg.senderId) {
          msgGroup.messages.push({
            msg: msg.message,
            time: msg.time,
            selectable: msg.selectable,
            id: msg.id,
            chosen: msg.chosen,
          })
        } else {
          chatMessageSenderId = msg.senderId
          formattedChatLog.push(msgGroup)
          msgGroup = {
            senderId: msg.senderId,
            messages: [{
              msg: msg.message,
              time: msg.time,
              selectable: msg.selectable,
              id: msg.id,
              chosen: msg.chosen,
            }],
          }
        }
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
      })

      console.log('formattedChatLog ', formattedChatLog)

      return {
        formattedChatLog,
        contact,
        profileUserAvatar: this.profileUserAvatar,
      }
    },
    editing() {
      return this.chosenPost.previousStatus == 'published'
    },
    ...mapGetters({
      currentUser: 'auth/currentUser',
      chosenPost: 'PostsStore/G_CHOSEN_POST'
    }),
  },
  methods: {
    ...mapActions({
      A_SET_CHOSEN_POST_CONTENT: "PostsStore/A_SET_CHOSEN_POST_CONTENT",
    }),
    async chosenMessage(msg) {
      try {
        console.log('msg ', msg)
        this.$emit('chosenMessage', msg)
        this.A_SET_CHOSEN_POST_CONTENT(msg)
        msg.chosen = 1
        msg.postId = this.chosenPost.id
        const data = await PostsService.updateMessage(msg)
        console.log('data chosen message ', data)
      } catch (error) {
        console.log('error chosenMessage ', error)
      }

    },
    showChosenButton(msg){
      if(this.chosenPost.previousStatus == 'published') {
        return msg.chosen == '1'
      }
      return msg.selectable === 'yes'
    }
  }
}
</script>

<style>
.formatted-text {
  white-space: pre-line;
}
</style>
