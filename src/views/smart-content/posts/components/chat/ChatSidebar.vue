<template>
  <div class="sidebar-left">
    <div class="sidebar">

      <!-- Logged In User Profile Sidebar -->
      <!-- Sidebar Content -->
      <div class="sidebar-content">

        <!-- Sidebar close icon -->
        <span class="sidebar-close-icon">
          <feather-icon icon="XIcon" size="16" @click="$emit('update:mq-shall-show-left-sidebar', false)" />
        </span>

        <!-- Header -->
        <!-- <div class="chat-fixed-search">
            <div class="d-flex align-items-center w-100">
              <div class="sidebar-profile-toggle">
                <b-avatar
                  size="42"
                  class="cursor-pointer badge-minimal avatar-border-2"
                  :src="profileUserMinimalData.avatar"
                  variant="transparent"
                  badge
                  badge-variant="success"
                  @click.native="$emit('show-user-profile')"
                />
              </div> -->
        <!-- Search -->
        <!-- <b-input-group class="input-group-merge ml-1 w-100 round">
                <b-input-group-prepend is-text>
                  <feather-icon
                    icon="SearchIcon"
                    class="text-muted"
                  />
                </b-input-group-prepend>
                <b-form-input
                  v-model="searchQuery"
                  placeholder="Search..."
                />
              </b-input-group> -->
        <!-- </div>
          </div> -->

        <!-- ScrollArea: Chat & Contacts -->
        <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="chat-user-list-wrapper list-group scroll-area">
          <validation-observer ref="vform">
            <!-- Chats Title -->
            <h4 class="chat-list-title">
              Información de la publicación
            </h4>

            <ul class="chat-users-list chat-list media-list">
              <div class="px-2">
                <validation-provider v-slot="{ errors }" name="client" rules="required">
                  <b-form-group label="Elegir cliente" :state="errors[0] ? false : null">
                    <v-select v-model="templateForm.clientId" class="white-background"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" placeholder="Elegir cliente" label="name"
                      :options="clientsArray" :reduce="option => option.id" @input="clientChosen" :disabled="isEditing"
                      :class="isEditing? 'custom-select-disabled-class' : ''"  />
                  </b-form-group>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="business" rules="required">
                  <b-form-group label="Elegir negocio" :state="errors[0] ? false : null">
                    <v-select class="white-background" v-model="templateForm.businessId"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" placeholder="Elegir negocio" label="name"
                      :options="clientBusinesses" :reduce="option => option.id"
                      :class="templateForm.clientId == null || isEditing? 'custom-select-disabled-class' : ''" :disabled="isEditing"
                      @input="getBusinessServices" />
                  </b-form-group>
                </validation-provider>
                <!-- <validation-provider v-slot="{ errors }" name="statusPost" rules="required">
                  <b-form-group label="Choose post status" :state="errors[0] ? false : null">
                    <v-select class="white-background" v-model="templateForm.postStatus"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" placeholder="Select a status" label="name"
                      :options="postsStatuses" :reduce="option => option.id" @input="changeStatus"/>
                  </b-form-group>
                </validation-provider> -->
              </div>
            </ul>


            <h4 class="chat-list-title">
              Detalles de la publicación
            </h4>

            <!-- Chats -->
            <ul class="chat-users-list chat-list media-list">
              <div class="px-2">
                <b-form-group label="Ocasión">
                  <b-form-input v-model="templateForm.ocassion" placeholder="Ocasión" :disabled="isEditing"/>
                </b-form-group>
                <b-form-group label="Promoción">
                  <b-form-input v-model="templateForm.promo" placeholder="Promoción" :disabled="isEditing"/>
                </b-form-group>
                <b-form-group label="Objetivo">
                  <b-form-input v-model="templateForm.objective" placeholder="Objetivo" :disabled="isEditing"/>
                </b-form-group>
                <b-form-group label="Lenguaje">
                  <v-select v-model="templateForm.language" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :clearable="false" :options="languagesOptions" :disabled="isEditing" label="name"
                      :reduce="option => option.id"/>
                </b-form-group>
                <validation-provider v-slot="{ errors }" name="copySize" rules="required">
                  <b-form-group label="Tamaño del copy" :state="errors[0] ? false : null">
                    <v-select v-model="templateForm.copySize" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :clearable="false" :options="copySizeOptions" :disabled="isEditing" label="name"
                      :reduce="option => option.id"/>
                  </b-form-group>
                </validation-provider>
                <b-form-group>
                  <b-form-checkbox v-model="templateForm.useEmojisAnswer" switch value="yes" unchecked-value="no" :disabled="isEditing">
                    Use Emojis
                  </b-form-checkbox>
                </b-form-group>
                <b-form-group label="Creatividad" class="w-100">
                  <b-form-slider v-model="templateForm.creativityLevel" @slide-start="slideStart" @slide-stop="slideStop"
                    class="w-100" :disabled="isEditing"></b-form-slider>
                </b-form-group>
                <b-form-group label="Palabras clave" class="w-100" >
                  <b-form-tags v-model="templateForm.keywords" tag-variant="primary" separator=" "
                    placeholder="Introduzca nuevas etiquetas separadas por espacios" :disabled="isEditing"></b-form-tags>
                </b-form-group>
              </div>
            </ul>

            <!-- Contacts Title -->
            <h4 class="chat-list-title">
              Detalles del negocio
            </h4>

            <!-- Contacts -->
            <ul class="chat-users-list contact-list media-list">
              <b-form-group>
                <div class="px-2">
                  <b-form-checkbox v-model="templateForm.includeBusinessInfo" switch value="yes" unchecked-value="no" :disabled="isEditing">
                    Incluir ubicación, teléfono, correo
                  </b-form-checkbox>
                  <b-form-group label="Productos/servicios a incluir">
                    <v-select v-model="templateForm.productsToInclude" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="name"
                      :reduce="option => option.id"
                      multiple :options="businessProducts" 
                      :disabled="isEditing" 
                      />
                  </b-form-group>
                </div>
              </b-form-group>
              <!-- <chat-contact
                v-for="contact in filteredContacts"
                :key="contact.id"
                :user="contact"
                tag="li"
                @click="$emit('open-chat', contact.id)"
              /> -->
            </ul>
            <!-- <b-button class="mx-2" variant="primary">Generate</b-button> -->
          </validation-observer>
        </vue-perfect-scrollbar>
        <ul class="chat-users-list contact-list media-list px-2">
          <b-button class="m-0 w-100" variant="primary" @click="generatePost" :disabled="isEditing">{{ generateButtonTitle }}</b-button>
        </ul>
        <!-- 
          <div class="mx-2 w-100">
            <b-button class="mx-2" variant="primary">Generate</b-button>
          </div> -->
      </div>

    </div>
  </div>
</template>
  
<script>
import {
  BAvatar, BInputGroup, BInputGroupPrepend, BFormInput,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
//   import ChatContact from './ChatContact.vue'
import UserProfileSidebar from '@/views/apps/chat/UserProfileSidebar.vue'
import bFormSlider from 'vue-bootstrap-slider/es/form-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import vSelect from 'vue-select'
import PostsService from '@/views/smart-content/posts/posts.service.js'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: {

    // BSV
    BAvatar,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,

    // 3rd party
    VuePerfectScrollbar,

    // SFC
    //   ChatContact,
    UserProfileSidebar,
    vSelect,
  },
  props: {

  },
  async mounted() {
    await this.getClientsByUserId()
    if (this.chosenPost !== null) {
      await this.getPostDetail()
      await this.getClientBusinesses()
      await this.getBusinessServices()
    }
  },
  data() {
    return {
      templateForm: {
        ocassion: '',
        promo: '',
        objective: '',
        language: 'Spanish',
        useEmojisAnswer: 'no',
        creativityLevel: 5,
        keywords: [],
        productsToInclude: [],
        productsToIncludeNames: [],
        includeBusinessInfo: 'no',
        copySize: null,
        businessId: null,
        clientId: null,
        postStatus: 'draft',
      },
      languagesOptions: [
        {
          id: 'Spanish',
          name: 'Español',
        },
        {
          id: 'English',
          name: 'Ingles',
        },
      ],
      copySizeOptions: [
        {
          id: 'Short',
          name: 'Pequeño',
        },
        {
          id: 'Medium',
          name: 'Mediano',
        },
        {
          id: 'High',
          name: 'Grande',
        },
      ],
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      clientBusinesses: [],
      clientsArray: [],
      postsStatuses: [
        {
          id: 'draft',
          name: 'Draft',
        },
        {
          id: 'published',
          name: 'Published',
        },
      ],
      generateButtonTitle: 'Generar',
      businessProducts: [],
    }
  },
  methods: {
    ...mapActions({
      A_SET_CHOSEN_POST: "PostsStore/A_SET_CHOSEN_POST",
    }),
    slideStart() {
      console.log('slideStarted')
    },
    slideStop() {
      console.log('slideStopped')
    },
    async getClientBusinesses() {
      const params = {
        clientId: this.templateForm.clientId,
      }
      const data = await PostsService.getBusinessesByClientId(params)
      if (data.status === 200) {
        this.clientBusinesses = data.data
      }
      if (data.status === 404) {
        this.clientBusinesses = []
      }
    },
    async clientChosen() {
      await this.getClientBusinesses()
    },
    async getClientsByUserId() {
      const params = {
        userId: this.currentUser.user_id,
      }
      const data = await PostsService.getClientsByUserId(params)
      if (data.status === 200) {
        this.clientsArray = data.data
      }
    },
    async generatePost() {
      try {
        const validate = await this.$refs.vform.validate();
        if (validate) {
          this.addPreloader()
          this.templateForm.productsToIncludeNames = this.templateForm.productsToInclude.map((productId) => {
            const product = this.businessProducts.find((item) => item.id === productId);
            return product ? product.name : null;
          });

          console.log(this.templateForm.productsToIncludeNames)

          const data = await PostsService.generatePost(this.templateForm)
          if (data.status === 200) {
            this.A_SET_CHOSEN_POST(data.data.post)
            this.$emit('postGenerated')
            console.log('post generated', data)
            this.removePreloader()
          }
        }
      } catch (error) {
        console.log('error', error)
        this.removePreloader()
      }
    },
    async getPostDetail() {
      try {
        const params = {
          postId: this.chosenPost.id,
        }
        const data = await PostsService.getPostDetail(params)
        if (data.status === 200) {
          this.templateForm = data.data
          this.templateForm.keywords = JSON.parse(this.templateForm.keywords)
          this.templateForm.productsToInclude = JSON.parse(this.templateForm.productsToInclude)
        }
        console.log('data ', data)
      } catch (error) {
        console.log('error ', error)
      }
    },
    async getBusinessServices() {
      try {
        const params = {
          businessId: this.templateForm.businessId,
        }
        const data = await PostsService.getBusinessServices(params)
        if (data.status === 200) {
          this.businessProducts = data.data.services
        }
        console.log('data ',  this.businessProducts)
      } catch (error) {
        console.log('error ', error)
      }
    },
    changeStatus() {
      this.chosenPost.status = this.templateForm.postStatus
      this.A_SET_CHOSEN_POST(this.chosenPost)
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "auth/currentUser",
      chosenPost: 'PostsStore/G_CHOSEN_POST'
    }),
    isEditing() {
      return this.chosenPost!=null
    }
  }
}
</script>
<style scoped>
.form-control {
  margin-top: -0.3rem;
}

.custom-select-disabled-class .vs__dropdown-toggle {
  opacity: 0.9 !important;
}
</style>

<style>
.slider-horizontal {
  width: 100% !important;
}
.slider-handle{
  background-color: #7367f0;
  background-image: linear-gradient(to bottom, #7367f0 0%, #7367f0 100%);
}
/* .slider-horizontal .slider-track .slider-track-high{
  background: #1b2337 !important;
}
.slider-horizontal .slider-track .slider-selection{
  background: #1b2337 !important;
}

.slider-horizontal .slider-track .slider-track-high{
  background: #1b2337 !important;
}
.slider-horizontal .slider-track .slider-selection{
  background: #1b2337 !important;
} */
</style>