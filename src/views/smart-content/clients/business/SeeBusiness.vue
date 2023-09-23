<template>
  <b-modal v-model="businessModal" title-class="h3 text-white" size="xl" centered title="Business Details" hide-footer
    modal-class="modal-primary"  @hidden="close"   >


    <b-card>
      <h4 class="mb-0 ml-50">
        <b-img height="100" weight="100" rounded="circle" :src="require('@/assets/images/portrait/small/avatar-s-9.jpg')"
          alt="Medal Pic">
        </b-img>
      </h4>
      <hr>
      <validation-observer ref="form">
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Business name" label-for="business-name">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Website" label-for="website">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Business name" label-for="business-name">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Website" label-for="website">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Business name" label-for="business-name">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Website" label-for="website">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Business name" label-for="business-name">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Website" label-for="website">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Business name" label-for="business-name">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Website" label-for="website">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
      </validation-observer>
    </b-card>

  </b-modal>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import ClientService from '@/views/smart-content/clients/clients.service.js';
export default {
  components: {
    flatPickr
  },
  computed: {

  },

  props: {
    businessInfo: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {

      businessModal: false,
    };
  },
  computed: {
    minDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date
    },
  },
  async mounted() {
    this.businessModal = true

  },

  methods: {
    close(){
        this.$emit('closeModal')
    },
    parseBusinesses(businessesStr) {
      try {
        const businesses = JSON.parse(businessesStr);

        // Filtrar los negocios para evitar mostrar aquellos con valores nulos para 'id' y 'name'
        const validBusinesses = businesses.filter(
          (business) => business.id !== null && business.name !== null
        );

        return validBusinesses;
      } catch (error) {
        console.error("Error parsing businesses:", error);
        return [];
      }
    },

    resetInfo() {

      this.businessInfo = { ...this.businessInfoClean }
    },

    async updateClient() {

      const validation = await this.$refs.form.validate()
      if (!validation) {
        console.log('modal de validacion')
      } else {
        try {

          const params = {
            client_id: this.businessInfo.id,
            first_name: this.businessInfo.first_name,
            last_name: this.businessInfo.last_name,
            address_id: this.businessInfo.address_id,
            email: this.businessInfo.email,
            phone: this.businessInfo.phone,
            profile_picture: this.businessInfo.profile_picture,
            user_id: 1,
          };

          const data = await ClientService.updateClient(params);
          if (data.status == 200) {

            console.log('modal de creacion exitosa')
          }
        } catch (e) {
          console.log(e);

        }
      }
    }


  },
};
</script>
