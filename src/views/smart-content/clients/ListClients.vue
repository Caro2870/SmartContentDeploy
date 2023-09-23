<template>
  <div>
    <header-slot>
      <template #actions>
        <b-button
          variant="success"
          @click="openCreateClientModal()"
        >
          Crear Cliente
        </b-button>
      </template>
    </header-slot>

    <filter-slot
      :filter="[]"
      :filter-principal="filterPrincipal"
      :total-rows="totalRows"
      :paginate="paginate"
      :start-page="startPage"
      :to-page="toPage"
      @onChangeCurrentPage="refreshTable"
      @reload="refreshTable"
    >
    <template #table>
        <div v-if="isLoading">
          <div class="text-center text-primary my-2">
              <b-spinner class="align-middle mr-1" />
              <strong>Cargando ...</strong>
          </div>
        </div>
    
        <!-- Pagination Controls -->
   <div v-else="isLoading">
    <b-card
          v-for="client in clients"
          v-if="client"
          ref="refListClients"
          :key="client.id"
        >

          <h5>Creado el {{ client.created_at | myGlobal }}</h5>
          <hr>
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="auto">

                  <!-- <b-img
                    height="100"
                    weight="100"
                    rounded="circle"
                    :src="client.profile_picture"
                    alt="Medal Pic"
                  /> -->
                  <b-avatar :src="client.profile_picture" size="80" class="mr-1" />
                </b-col>

                <b-col>
                  <b-link     @click="showClientInfo(client)" class="font-medium-1 font-weight-bolder ">{{ client.first_name }}</b-link>
                  <br>
                  <span v-if="parseBusinesses(client.business_id).length > 0">Negocios: </span>
                  <ul v-if="parseBusinesses(client.business_id).length > 0">

                    <li
                      v-for="business in parseBusinesses(client.business_id)"
                      :key="business.id"
                    >
                      {{ business.name }}
                    </li>
                  </ul>
                  <p v-else>
                    No tiene negocios aún
                  </p>
                </b-col>
              </b-row>

            </b-col>
            <b-col>
              <div class="d-flex justify-content-end align-contend-end">
                <b-button
                  variant="primary"
                  @click="showClientInfo(client)"
                >

                  Informacion del cliente
                </b-button>

              </div>

            </b-col>
          </b-row>

        </b-card>
   </div>
      
      </template>
    </filter-slot>
    <create-client
    @refresh="getAllClients"

      v-if="clientModal"
      @closeModal="clientModal=false"
    />

  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import ClientService from '@/views/smart-content/clients/clients.service.js';
import CreateClient from '@/views/smart-content/clients/CreateClient.vue';
import { mapGetters } from 'vuex';


 

export default {
  components: {
    flatPickr,
    CreateClient,
  },
  props: {

  },
  data() {
    return {
      isLoading: false,
      clients: [],
      clientModal: false,
      filterPrincipal: {
        type: 'input',
        inputType: 'text',
        placeholder: 'Buscar...',
        model: '',
      },
      paginate: {
        currentPage: 1,
        perPage: 10,
      },
      totalRows: 0,
      startPage: 0,
      toPage: 0,

    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),

  },
  async mounted() {
    await this.getAllClients();
  },
  methods: {

    refreshTable() {
      this.getAllClients();
    },
    openCreateClientModal() {
      this.clientModal = true;
    },

    showClientInfo(client) {
      this.$router.push({
        name: 'client',
        params: {
          data: client,
          client_id: client.id,
        },
      });
    },

    parseBusinesses(businessesStr) {
      try {
        const businesses = JSON.parse(businessesStr);

        // Filtrar los negocios para evitar mostrar aquellos con valores nulos para 'id' y 'name'
        const validBusinesses = businesses.filter(
          business => business.id !== null && business.name !== null,
        );

        return validBusinesses;
      } catch (error) {
        console.error('Error parsing businesses:', error);
        return [];
      }
    },

    async getAllClients() {
      try {
        this.isLoading = true
        const params = {

          text: this.filterPrincipal.model,
          date_from: null,
          date_to: null,
          perPage: this.paginate.perPage,
          npage: this.paginate.currentPage,
          order_by: 'name',
          orden: 'ASC',
          user_id: this.currentUser.user_id

        };
        
        const response = await ClientService.getAllClients(params);
        this.clients = response.data.data;
        this.totalRows = response.data.total;
        this.startPage = response.data.from || 0;
        this.toPage = response.data.to || 0;
        this.paginate.currentPage = response.data.current_page;
        this.paginate.perPage = response.data.per_page;
        this.isLoading = false

      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>
