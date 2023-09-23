<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->

  <div style="height: inherit">
    <!-- <pre>activeChat {{ activeChat }}</pre> -->

    <!-- Main Area -->
    <section class="chat-app-window">
      <b-row class="chat-app-window">
        <b-col cols="8" class="chat-app-window">
          <!-- <div> -->
          <div v-if="chosenPost == null" class="start-chat-area">
            <div class="mb-1 start-chat-icon">
              <feather-icon icon="MessageSquareIcon" size="56" />
            </div>
            <h4 class="sidebar-toggle start-chat-text" @click="startConversation">
              First fill the form to start conversation
            </h4>
          </div>
          <!-- Chat Content -->
          <div v-else class="active-chat">
            <!-- Chat Navbar -->
            <div class="chat-navbar">
              <header class="chat-header">

                <!-- Avatar & Name -->
                <div class="d-flex align-items-center">

                  <!-- Toggle Icon -->
                  <div class="sidebar-toggle d-block d-lg-none mr-1">
                    <feather-icon icon="MenuIcon" class="cursor-pointer" size="21"
                      @click="mqShallShowLeftSidebar = true" />
                  </div>

                  <b-avatar size="36" :src="require('@/assets/images/avatars/AI ASSISTANT.png')"
                    class="mr-1 cursor-pointer badge-minimal" badge :badge-variant="'info'"
                    @click.native="shallShowActiveChatContactSidebar = true" />
                  <h6 class="mb-0">
                    Content Assistant
                  </h6>
                </div>

              </header>
            </div>

            <!-- User Chat Area -->
            <vue-perfect-scrollbar ref="refChatLogPS" :settings="perfectScrollbarSettings" class="user-chats scroll-area">
              <chat-log :chat-data="activeChat" :profile-user-avatar="profileUserDataMinimal.avatar"
                @chosenMessage="messageChosen" />
            </vue-perfect-scrollbar>

            <!-- Message Input -->
            <div>
              <b-form class="chat-app-form" @submit.prevent="sendMessage">
                  <div  class="w-100" v-if="numberOfUserMessages >= 5 || editing">
                    <b-button v-if="!chosenPost.last_survey_id" class="w-100 button-animation" v-b-tooltip.hover
                    title="Enviaste el máximo de mensajes permitidos (5)" variant="primary" @click="openSurvey">Cuéntanos tu
                    opinión</b-button>
                    <b-button v-else variant="primary" @click="openSurvey" class="w-100">Resultados de la encuesta</b-button>
                  </div>
                <template v-else>
                  <b-input-group class="input-group-merge form-send-message mr-1">
                    <b-form-input v-model="chatInputMessage" placeholder="Escribe tu mensaje" :disabled="editing" />
                  </b-input-group>
                  <b-button variant="primary" type="submit" :disabled="editing">
                    Enviar
                  </b-button>
                </template>

              </b-form>
            </div>
          </div>
          <!-- </div> -->
        </b-col>
        <b-col cols="4">
          <vue-perfect-scrollbar ref="refChatLogPS2" :settings="perfectScrollbarSettings" class="user-chats scroll-area">
          <h4 class="chat-list-title text-primary d-block mt-2">
            Previsualización
          </h4>
          <div class="d-flex justify-content-start align-items-center mb-1 mt-1">
            <!-- avatar -->
            <b-avatar :src="businessImageUrl" size="50" class="mr-1" />
            <!--/ avatar -->
            <div class="profile-user-info">
              <h6 class="mb-0">
                {{ postBusinessName }}
              </h6>
              <small class="text-muted"></small>
            </div>
          </div>

          <!-- <b-form-textarea placeholder="Escrible el contenido aquí.." class="mb-1" style="height: 250px;"
            v-model="form.postContent" @input="updateContentValue" :disabled="editing">
          </b-form-textarea> -->

          <quill-editor
                placeholder="Escrible el contenido aquí.."
                class="mb-1"
                v-model="form.postContent"
                style="height: 300px;"
                :disabled="editing"
                :options="editorOption"
                @input="updateContentValue"
              />

          <!-- post img -->
          <!-- <b-img block fluid-grow rounded center class="mb-25 custom-image" :src="'https://placekitten.com/408/308'" /> -->
          <div class="mb-1">
            <input type="file" id="file_input_1" @change="getImage" hidden :disabled="editing" accept="image/*" />
            <!-- INPUT_FILE FIN -->
            <div class="m-0 cursor-pointer">
              <figure @click="inputImage()" class="m-0 image-upload">
                <p v-if="image == null">Presiona aquí para subir una imagen</p>
                <img v-else width="100%" height="100%" :src="image" />
              </figure>
            </div>
          </div>
          <b-form-group>
            <v-select class="white-background" v-model="form.status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              placeholder="Select a status" label="name" :options="postsStatuses" :reduce="option => option.id"
              @input="changeStatus" :disabled="editing" />
          </b-form-group>
          <!-- </div> -->
          <b-button class="w-100" variant="primary" @click="savePost" :disabled="editing">Guardar</b-button>
        </vue-perfect-scrollbar>
        </b-col>
      </b-row>

      <!-- Start Chat Logo -->
    </section>


    <!-- Active Chat Contact Details Sidebar -->

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <chat-sidebar @postGenerated="getPostChat" />
    </portal>

    <survey-modal v-if="openSurveyModal" @closeModal="closeSurvey"/>

  </div>
</template>

<script>
import store from '@/store'
import {
  BAvatar, BDropdown, BDropdownItem, BForm, BInputGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// import { formatDate } from '@core/utils/filter'
import { $themeBreakpoints } from '@themeConfig'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import ChatSidebar from '@/views/smart-content/posts/components/chat/ChatSidebar.vue'
import chatStoreModule from '@/views/apps/chat/chatStoreModule'
import ChatActiveChatContentDetailsSidedbar from '@/views/apps/chat/ChatActiveChatContentDetailsSidedbar.vue'
import ChatLog from '@/views/apps/chat/ChatLog.vue'
import useChat from '@/views/apps/chat/useChat'
import PostsService from '@/views/smart-content/posts/posts.service.js'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import vSelect from 'vue-select'
import SurveyModal from '@/views/smart-content/posts/components/survey/SurveyModal.vue'
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {

    // BSV
    BAvatar,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,

    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    ChatSidebar,
    ChatActiveChatContentDetailsSidedbar,
    ChatLog,
    vSelect,
    SurveyModal,
    quillEditor
  },
  props: {
    businessId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      CHAT_APP_STORE_MODULE_NAME: 'app-chat',
      resolveAvatarBadgeVariant: null,
      refChatLogPS: null,
      perfectScrollbarSettings: { maxScrollbarLength: 150 },
      chatsContacts: [],
      contacts: [],
      activeChat: {
        chat: {
          chat: [],
        },
        contact: {
          id: 'system',
        }
      },
      chatInputMessage: '',
      profileUserData: {},
      profileUserDataMinimal: {},
      shallShowUserProfileSidebar: false,
      shallShowActiveChatContactSidebar: false,
      mqShallShowLeftSidebar: false,
      templateFinished: false,
      form: {
        images: null,
        postContent: null,
        status: 'draft',
      },
      viewImage: null,
      postsStatuses: [
        {
          id: 'draft',
          name: 'Borrador',
        },
        {
          id: 'published',
          name: 'Publicado',
        },
      ],
      openSurveyModal: false,
      editorOption: {
        modules: { toolbar: false },
      },
    }
  },
  created() {
    const chatComposition = useChat(); // Call the composition function
    if (!this.$store.hasModule(this.CHAT_APP_STORE_MODULE_NAME)) this.$store.registerModule(this.CHAT_APP_STORE_MODULE_NAME, chatStoreModule)
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    this.mqShallShowLeftSidebar = mqShallShowLeftSidebar

  },
  async mounted() {
    this.refChatLogPS = this.$refs.chatLogPS;
    if (this.chosenPost != null) {
      this.form.postContent = this.chosenPost.content
      this.form.status = this.chosenPost.status
      this.viewImage = this.chosenPost.image_url
      await this.getPostChat()
    }

  },
  beforeDestroy() {
    this.CHAT_APP_STORE_MODULE_NAME = 'app-chat';
    if (this.$store.hasModule(this.CHAT_APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(this.CHAT_APP_STORE_MODULE_NAME);
    }
  },
  computed: {
    image() {
      return this.viewImage;
    },
    ...mapGetters({
      currentUser: 'auth/currentUser',
      chosenPost: 'PostsStore/G_CHOSEN_POST'
    }),
    editing() {
      return this.chosenPost == null || (this.chosenPost.previousStatus == 'published')
    },
    businessImageUrl() {
      if (this.chosenPost != null) {
        return this.chosenPost.business_image ? this.chosenPost.business_image : ''
      }
      return ''
    },
    postBusinessName() {
      if (this.chosenPost != null) {
        return this.chosenPost.business_name ? this.chosenPost.business_name : 'Business Name'
      }
      return 'Business Name'
    },
    numberOfUserMessages() {
      const senderIdToFind = 'user'
      const count = this.activeChat.chat.chat.reduce((acc, message) => {
        if (message.senderId === senderIdToFind) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return count
    },
    thereIsAChosenMessage() {
      const isChosen = '1'
      console.log('this.activeChat.chat.chat ', this.activeChat.chat.chat)
      const count = this.activeChat.chat.chat.reduce((acc, message) => {
        if (message.chosen == isChosen) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return count > 0
    }
  },
  methods: {
    ...mapActions({
      A_SET_CHOSEN_POST: "PostsStore/A_SET_CHOSEN_POST",
      A_SET_CHOSEN_POST_CONTENT: "PostsStore/A_SET_CHOSEN_POST_CONTENT",
    }),
    scrollToBottomInChatLog() {
      const scrollEl = this.$refs.chatLogPS; // Access the ref using this.$refs
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    },
    async sendMessage() {
      console.log('chatInputMessage ', this.chatInputMessage)
      console.log('check chatinputmessage ',!this.chatInputMessage)
      console.log('numberOfUserMessages ', this.numberOfUserMessages)
      console.log('this.numberOfUserMessages >= 5 ', this.numberOfUserMessages >= 5)
      console.log('tthereIsAChosenMessage ', this.thereIsAChosenMessage)
      console.log('this.activeChat.chat.chat ', this.activeChat.chat.chat)
      if (!this.chatInputMessage || this.chatInputMessage == '') return;

      // Count user message, it must be 5 or less
      // const senderIdToFind = 'user'
      // const count = this.activeChat.chat.chat.reduce((acc, message) => {
      //   if (message.senderId === senderIdToFind) {
      //     return acc + 1;
      //   }
      //   return acc;
      // }, 0);

      if (this.numberOfUserMessages >= 5) return;


      if (this.thereIsAChosenMessage == false) return;

      this.addPreloader()
      const payload = {
        // eslint-disable-next-line no-use-before-define
        roleName: 'user',
        messageContent: this.chatInputMessage,
        postId: this.chosenPost.id,
      };

      const data = await PostsService.sendMessage(payload)

      if (data.status === 200) {
        const newMessageData = {
          message: this.chatInputMessage,
          time: new Date(),
          senderId: 'user',
        }

        this.activeChat.chat.chat.push(newMessageData);
        await this.getPostChat()


        // Reset send message input value
        this.chatInputMessage = '';

        // Scroll to bottom (implement your own scrollToBottomInChatLog method)
        this.scrollToBottomInChatLog();
        this.removePreloader()
      }
      this.removePreloader();
    },
    startConversation() {
      if (this.$store.state.app.windowWidth < $themeBreakpoints.lg) {
        this.mqShallShowLeftSidebar = true;
      }
    },
    getImage(e) {
      if (!e.target.files.length) {
        this.form.images = null;
        return;
      }
      let file = e.target.files[0];
      this.form.images = file;
      this.uploadImage(file);

      const formData = new FormData();
      formData.append('file', file);
      // const data = PostsService.uploadFile(formData)
      // console.log('data upload ', data)
    },
    uploadImage: function (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.viewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    inputImage() {
      document.getElementById("file_input_1").click();
    },
    async savePost() {
      try {
        this.addPreloader()
        const formData = new FormData();
        formData.append('postId', this.chosenPost.id);
        formData.append('status', this.chosenPost.status);
        formData.append('content', this.chosenPost.content);
        if(this.form.images != null){
          formData.append('image', this.form.images);
        }
        // const params = {
        //   postId: this.chosenPost.id,
        //   status: this.chosenPost.status,
        //   content: this.chosenPost.content,
        //   image: this.form.images,
        // }
        const data = await PostsService.savePost(formData)
        if (data.status === 200) {
          this.removePreloader()
          this.$router.push({ name: 'user-posts' });
        }
      } catch (error) {
        this.removePreloader()
        console.log('error ', error)
      }
    },
    async getPostChat() {
      try {
        this.chatInputMessage = '';
        this.addPreloader()
        const params = {
          postId: this.chosenPost.id,
        }
        const data = await PostsService.getPostChat(params)
        if (data.status === 200) {
          this.activeChat.chat.chat = data.data
          this.activeChat.chat.chat = this.activeChat.chat.chat.map(item => {
            if (item.message.startsWith('"') && item.message.endsWith('"')) {
              // Elimina las comillas dobles al comienzo y al final
              item.message = item.message.slice(1, -1);
            }

            return {
              ...item,
              message: item.message.replace(/\n/g, '<br>')
            };
          });
          this.removePreloader()
          this.scrollToBottomInChatLog();
        }
      } catch (error) {
        this.removePreloader()
        console.log('error ', error)
      }
    },
    updateContentValue() {
      this.chosenPost.content = this.form.postContent
      this.A_SET_CHOSEN_POST_CONTENT(this.chosenPost)
    },
    changeStatus() {
      this.chosenPost.status = this.form.status
      this.A_SET_CHOSEN_POST(this.chosenPost)
    },
    messageChosen(msg) {
      this.form.postContent = msg.msg
      const newValue = '1';
      const foundMessageIndex = this.activeChat.chat.chat.findIndex(message => message.id === msg.id);

      if (foundMessageIndex !== -1) {
        // Found the message with ID 62
        this.activeChat.chat.chat[foundMessageIndex].chosen =newValue;
      }
    },
    openSurvey() {
      this.openSurveyModal = true
    },
    closeSurvey() {
      this.openSurveyModal = false
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
</style>

<style lang="scss" scoped>
.image-upload {
  height: 200px;
  border: 1px dashed #7367f0;
  color: #7367f0;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.button-animation {
  animation: pulse 1s alternate infinite;
  /* Adjust the animation duration as needed */
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
    /* Increase the scale factor to make it grow */
  }
}
</style>

