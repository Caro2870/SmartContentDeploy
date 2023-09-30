<template>
  <div class="w-100">
    <filter-slot :filter="[]" :filter-principal="filterPrincipal" :total-rows="totalRows" :paginate="paginate" :start-page="startPage"
      :to-page="toPage" @onChangeCurrentPage="refreshPosts" @reload="refreshPosts" :noVisiblePrincipalFilter="true">
      <template #table>
        <div v-if="isLoading">
          <div class="text-center text-primary my-2">
              <b-spinner class="align-middle mr-1" />
              <strong>Cargando ...</strong>
          </div>
        </div>
        <div v-else>
          <div v-if="posts.length == 0" class="d-flex justify-content-center">No se encontraron publicaciones</div>
          <b-row v-else>
          <b-col cols="4" v-for="(data) in posts" :key="data.id">
            <b-card class="post-card">
              <div>
                <!-- <b-form-radio
                v-model="selected"
                name="some-radio9"
                value="e"
                class="custom-control-success mb-1"
            >
                {{ data.status }}
            </b-form-radio> -->
                <div class="d-flex align-items-center mb-1">
                  <span class="status-circle"
                    :class="{ 'text-success': data.status == 'published', 'text-warning': data.status == 'draft' }"></span>
                  <span>{{ data.status == 'draft'? 'Borrador': 'Publicado' }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <b-button v-if="data.status == 'published'" variant="primary" class="mb-1 w-100"  @click="goToPostHistory(data, 'published')">Ver chat</b-button>
                <b-button v-if="data.status != 'published'" variant="primary" class="mb-1 w-100"  @click="goToPostHistory(data, 'draft')">Editar</b-button>
                <b-button v-if="data.status != 'published'" variant="outline-danger" class="mb-1 ml-1 w-100"  @click="deletePost(data)">Eliminar</b-button>
              </div>
              <div class="d-flex justify-content-start align-items-center mb-1">
                <!-- avatar -->
                <b-avatar :src="data.business_image" size="50" class="mr-1" />
                <!--/ avatar -->
                <div class="profile-user-info">
                  <h6 class="mb-0">
                    {{ data.business_name }}
                  </h6>
                  <small class="text-muted">{{ data.created_at | myDateGlobalWithHour }}</small>
                </div>
              </div>
              <b-card-text v-html="data.content">
                {{ data.content }}
              </b-card-text>

              <!-- post img -->
              <b-img v-if="data.image_url" block fluid-grow rounded center class="mb-25 custom-image"
                :src="data.image_url" />
              <b-img v-else block fluid rounded center class="mb-25 custom-image" :src="NoImage" />
            </b-card>
            </b-col>
          </b-row>
        </div>
      </template>
    </filter-slot>
  </div>
</template>
  
<script>
import {
  BAvatar, BCard, BCardText, BImg, BLink, BRow, BCol, BAvatarGroup, VBTooltip, BFormTextarea, BButton, BFormGroup, BEmbed,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import PostsService from '@/views/smart-content/posts/posts.service.js'
import NoImage from '@/assets/images/no-image/noimage.jpg';

export default {
  components: {
    BAvatar,
    BCard,
    BCardText,
    BButton,
    BFormTextarea,
    BImg,
    BFormGroup,
    BRow,
    BLink,
    BCol,
    BAvatarGroup,
    BEmbed,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  async created() {
    await this.getPosts()
  },
  data() {
    return {
      selected: 'e',
      paginate: {
        currentPage: 1,
        perPage: 10,
      },
      filterPrincipal: {
        type: 'input',
        inputType: 'text',
        placeholder: 'Search...',
        model: '',
      },
      totalRows: 0,
      startPage: 0,
      toPage: 0,
      posts: [],
      isLoading: false,
      NoImage,
    }
  },
  props: {
    clientId: {
      type: Number,
      default: null,
    },
    businessId: {
      type: Number,
      default: null,
    },
    statusId: {
      type: Number,
      default: null,
    },
    dateFrom: {
      type: String,
      default: null,
    },
    dateTo: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      chosenPost: 'PostsStore/G_CHOSEN_POST'
    }),
  },
  methods: {
    kFormatter,
    ...mapActions({
      A_SET_CHOSEN_POST: "PostsStore/A_SET_CHOSEN_POST",
    }),
    goToPostHistory(itemData, status) {
      console.log('itemData ', itemData)
      this.A_SET_CHOSEN_POST(itemData)
      this.chosenPost.previousStatus = status
      this.A_SET_CHOSEN_POST(itemData)
      this.$router.push({ name: 'chat-history' });
    },
    async refreshPosts() {
      await this.getPosts()
    },
    async deletePost(item) {
      try {
        const params = {
          postId: item.id
        }
        const data = await PostsService.deletePost(params)
        if (data.status == 200) {
          await this.getPosts()
        }
      } catch (error) {
        console.log('ERROR ON deletePost ', error) 
      }
    },
    async getPosts() {
      try {
        this.isLoading = true
        const params = {
          clientId: this.clientId,
          businessId: this.businessId,
          statusId: this.statusId,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          perPage: this.paginate.perPage,
          npage: this.paginate.currentPage,
          userId: this.currentUser.user_id,
        }
        const data = await PostsService.getPosts(params)
        if (data.status) {
          this.isLoading = false
          this.posts = data.data.data
          this.totalRows = data.data.total;
          this.startPage = data.data.from || 0;
          this.toPage = data.data.to || 0;
          this.paginate.currentPage = data.data.current_page;
          this.paginate.perPage = data.data.per_page;
        }
      } catch (error) {
        console.log('ERROR ON GETPOSTS ', error) 
      }
    },
  },
  watch: {
    async clientId() {
      await this.getPosts()
    },
    async businessId() {
      await this.getPosts()
    },
    async statusId() {
      await this.getPosts()
    },
    async dateFrom() {
      await this.getPosts()
    },
    async dateTo() {
      await this.getPosts()
    },
  },
}
</script>
<style scoped>
.custom-image {
  width: 100%;
  /* height: 120px; */
  /* Set your desired max height for the image */
  object-fit: cover;
  /* This ensures the image covers the container while maintaining aspect ratio */
}

.post-card {
  height: 95%;
  /* Set your desired fixed card height */
}

.status-circle {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 5px;
  /* Adjust as needed */
}

.text-success {
  background-color: #28c76f;
  /* Green color */
}

.text-warning {
  background-color: #ff9f43;
  /* Orange color */
}
</style>