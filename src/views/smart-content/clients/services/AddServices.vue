<template>
  <b-modal
    v-model="servicesModal"
    title-class="h3 text-white"
    size="lg"
    centered
    title="Crear Servicio"
    hide-footer
    modal-class="modal-primary"
    no-close-on-backdrop
    @hidden="close"
  >

    <b-card>
      <validation-observer ref="form">
        <b-row>
          <b-col> <validation-provider
            v-slot="{ errors }"
            rules="required"
          >

            <b-form-group label="Nombre del servicio">

              <b-form-input
                id="service_name"
                v-model="services.name"
                :state="errors[0] ? false : null"
              />

            </b-form-group>
          </validation-provider></b-col>

          <b-col> <validation-provider
            v-slot="{ errors }"
            rules="required"
          >

            <b-form-group label="Descripcion">

              <b-form-input
                id="description"
                v-model="services.description"
                :state="errors[0] ? false : null"
              />

            </b-form-group>
          </validation-provider></b-col>
        

        </b-row>
      </validation-observer>
      <b-row class="mt-2">
        <b-col>
          <div class="d-flex justify-contend-end align-items-end  ">
            <b-button
              class="mr-1"
              variant="primary"
              @click="createServices()"
            >

              Guardar</b-button>

            <b-button @click="resetInfo()">
              Deshacer cambios
            </b-button>
          </div>

        </b-col>
      </b-row>
    </b-card>

  </b-modal>
</template>

<script>

import ServiceService from '@/views/smart-content/clients/services/services.service.js';

import { mapGetters } from 'vuex';
import { VMoney }  from 'v-money';

export default {
  components: {
    VMoney,
  },
  directives: { money: VMoney },

  data() {
    return {
      services: [],
      servicesModal: false,
      vMoney: {
        decimal: ',',
        thousand: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        min: 0.0,
        masked: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),

  },
  async mounted() {
    this.servicesModal = true;
  },

  methods: {

    close() {
      this.$emit('closeModal');
    },

    resetInfo() {
      this.ServicesInfo = {};
    },

    async createServices() {
      const validation = await this.$refs.form.validate();
      if (!validation) {

      } else {
        try {
          const params = {
            name: this.services.name,
            description: this.services.description,
            created_by: this.currentUser.user_id,
          };

          const data = await ServiceService.createServices(params);
          if (data.status == 201) {
            this.close();
          }
        } catch (e) {
          console.log(e);
        }
      }
    },

  },
};
</script>
