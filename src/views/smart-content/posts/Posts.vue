<template>
  <div>
    <section id="faq-search-filter">
      <b-card no-body class="faq-search"
        :style="{ backgroundImage: `url(${require('@/assets/images/banner/banner.png')})` }">
        <b-card-body class="text-center" style="padding: 2.7rem !important">
          <h2 class="text-primary">
            Bienvenido(a) {{ currentUser.given_name }}!
          </h2>
          <b-card-text class="mb-2">
            Lleva tu contenido al siguiente nivel!
          </b-card-text>

          <!-- form -->
          <b-form class="faq-search-input">
            <b-button variant="primary" @click="createPost">
              <feather-icon icon="PlusIcon" size="15" class="mr-1" />Crear publicación
            </b-button>
          </b-form>
          <b-row class="mt-2">
            <b-col>
              <b-form-group label="Cliente">
                <v-select v-model="clientId" class="white-background" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                   placeholder="Elige un cliente" label="name" :options="clientsArray"
                  :reduce="option => option.id" @input="clientChosen"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Negocio">
                <v-select class="white-background" v-model="businessId"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"  placeholder="Elige un negocio"
                  label="name" :disabled="clientId == null" :options="clientBusinesses" :reduce="option => option.id"
                  :class="clientId == null ? 'custom-select-disabled-class' : ''" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Estado">
                <v-select class="white-background" v-model="statusId" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                   placeholder="Elige un estado" label="name" :options="statuses"
                  :reduce="option => option.id" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Desde">
                <div ></div>
                <kendo-datepicker id="date_from" v-model="dateFrom" :first-day-of-week="1" placeholder="Elige una fecha"
                  style="border-radius: 0.357rem !important; "
                  class="leads-datepicker w-100 rounded bg-transparent k-picker-custom picker-select-date form-control"
                  :class="isDarkSkin ? 'dark-datepicker' : ''" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Hasta">
                <div></div>
                <kendo-datepicker id="date_to" v-model="dateTo" :first-day-of-week="1" placeholder="Elige una fecha"
                  style="border-radius: 0.357rem !important;"
                  class="leads-datepicker w-100 rounded bg-transparent k-picker-custom picker-select-date  form-control"
                  :class="isDarkSkin ? 'dark-datepicker' : ''"  />
              </b-form-group>
            </b-col>
          </b-row>
          <!-- form -->
        </b-card-body>
      </b-card>
      <div class="d-flex">
        <post-component ref="postsComponent" :client-id="clientId" :business-id="businessId" :status-id="statusId"
          :date-from="dateFrom" :date-to="dateTo" />
      </div>
    </section>
  </div>
</template>
  
<script>
import vSelect from 'vue-select'
import PostComponent from '@/views/smart-content/posts/components/PostComponent.vue'
import CreatePost from '@/views/smart-content/posts/components/modals/CreatePost.vue'
import PostsService from '@/views/smart-content/posts/posts.service.js'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "Test",
  async created() {
    console.log('this.isDarkSkin ', this.isDarkSkin)
    this.$http.get('/blog/list/data/detail').then(res => { this.blogDetail = res.data })
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
    this.$http.get('/profile/data').then(res => { this.profileData = res.data })
    await this.getClientsByUserId()
  },
  data() {
    return {
      blogDetail: [],
      blogSidebar: {},
      clientId: null,
      businessId: null,
      statusId: null,
      dateFrom: null,
      dateTo: null,
      selected: 'e',
      profileData: {},
      posts: [],
      clientsArray: [],
      clientBusinesses: [],
      statuses: [
        { name: 'Borrador', id: "draft" },
        { name: 'Publicado', id: "published" },]
    }
  },
  components: {
    vSelect,
    PostComponent,
  },
  methods: {
    ...mapActions({
      A_SET_CHOSEN_POST: "PostsStore/A_SET_CHOSEN_POST",
    }),
    async getClientsByUserId() {
      const params = {
        userId: this.currentUser.user_id,
      }
      const data = await PostsService.getClientsByUserId(params)
      if (data.status === 200) {
        this.clientsArray = data.data
      }
      console.log('clients data ', data)
    },
    async getClientBusinesses() {
      const params = {
        clientId: this.clientId,
      }
      const data = await PostsService.getBusinessesByClientId(params)
      if (data.status === 200) {
        this.clientBusinesses = data.data
      }
      console.log('businesses data ', data)
    },
    createPost() {
      this.A_SET_CHOSEN_POST(null)
      this.$router.push({ name: 'chat-history' });
    },
    async clientChosen() {
      await this.getClientBusinesses()
    },
    async refreshPosts() {
      await this.$refs.postsComponent.getPosts()
    },
  },
  computed: {
    ...mapGetters({
      skin: "appConfig/skin",
      currentUser: "auth/currentUser",
    }),
  }
};
</script>
  
<style lang="scss">
@import '@core/scss/vue/pages/page-faq.scss';

.white-background {
  background: white;
  border-radius: 10px;
  border-radius: 0.357rem !important;
}

.custom-select-disabled-class .vs__dropdown-toggle {
  opacity: 0.9 !important;
}

.leads-datepicker {
  height: 35px !important;
  border: none !important;
}

.leads-datepicker .k-picker-wrap {
  border-radius: 0.3rem;
}

.dark-datepicker .k-picker-wrap {
  background: #283046;
  border: 1px solid #404656;
  border-radius: 0.357rem !important;
}

.leads-datepicker .k-picker-wrap .k-select {
  border-radius: 0.3rem;
}

.dark-datepicker .k-picker-wrap span {
  background: #283046;
}

.dark-datepicker .k-picker-wrap span:hover {
  background: #283046;
}
</style>