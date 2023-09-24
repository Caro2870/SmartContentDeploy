<template>
  <b-modal v-model="businessModal" title-class="h3 text-white" size="xl" centered
    :title="edit ? 'Editar Negocio' : 'Crear Negocio'" hide-footer modal-class="modal-primary" no-close-on-backdrop
    @hidden="close">
    <b-card>
      <h4 class="mb-0 ml-50">
          <div class="mb-1">
              <input type="file" id="file_input_2" @change="getImage" hidden accept="image/*"/>
              <!-- INPUT_FILE FIN -->
              <div class="m-0 cursor-pointer">
                <figure @click="inputImage()" class="m-0 image-upload">
                  <p v-if="image == null">Haga clic aquí para subir el logo del negocio</p>
                  <img v-else width="100%" height="100%" :src="image" />
                </figure>
              </div>
            </div>
      </h4>
      <hr>
      <validation-observer ref="form">
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Nombre del negocio">

                <b-form-input id="businessName" v-model="businessInfo.name" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Horario de atención">

                <b-form-input id="schedule" v-model="businessInfo.schedule" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

        </b-row>
        <b-row>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Página de facebook">

                <b-form-input id="facebook_page" v-model="businessInfo.facebook_page" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Celular" label-for="Phone">

                <b-form-input id="phone" v-model="businessInfo.phone" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>

        </b-row>
        <b-row>

          <b-col> <validation-provider>
              <b-form-group label="Dirección del negocio">
                <vue-google-autocomplete id="address_create_application_data_olas"
                  ref="address_create_application_data_olas" v-model="businessInfo.address"
                  class="form-control boder-hover-p" placeholder="Please type your address"
                  classname="input-form form-control fond-white" :country="['us', 'pe']" style="height: 35px !important"
                  @placechanged="getAddressData" />
              </b-form-group>
            </validation-provider></b-col>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Página web">

                <b-form-input id="website" v-model="businessInfo.website" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>

          <b-col> <validation-provider v-slot="{ errors }" rules="required|email">

              <b-form-group label="Correo electrónico">

                <b-form-input id="mail" v-model="businessInfo.mail" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Industria"  :state="errors[0] ? false : null">
                <v-select v-model="businessInfo.industry_id" :options="industries"
                  :reduce="option => option.id" label="name" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>

        <b-row>

          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Misión">

                <b-form-input id="mission" v-model="businessInfo.mission" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Visión">

                <b-form-input id="vision" v-model="businessInfo.vision" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
          <b-col> <validation-provider v-slot="{ errors }" rules="required">

              <b-form-group label="Audiencia Objetivo">

                <b-form-input id="values" v-model="businessInfo.target_audience" :state="errors[0] ? false : null" />

              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="d-flex">

              <div style="max-width: 100%; width: 100%;">

                <validation-provider v-slot="{ errors }" rules="required">
                  <b-form-group :state="errors[0] ? false : null" label="Servicios">
                    <v-select  v-model="businessInfo.services" multiple :options="servicesOptions" label="name"
                      />
                  </b-form-group>

                </validation-provider>

              </div>
              <div>
                <b-button class="button-little-size ml-1" size="sm" variant="primary" @click="openModalAddService()"
                  style="margin-top: 2.3rem"> <feather-icon size="14" icon="PlusIcon" /></b-button>
              </div>
            </div>
          </b-col>

        </b-row>
        <b-row>
          <b-col>
            <div class="d-flex">
              <b-form-file @change="handleFileUpload" accept=".xlsx, .xls"/>
              <!-- <b-button v-b-tooltip.hover.top="'Upload file'" @click="uploadFile" variant="outline-primary"
                class="btn-icon">
                <feather-icon icon="UploadIcon" />
              </b-button> -->
            </div>
          </b-col>
        </b-row>
      </validation-observer>
      <b-row class="mt-2">
        <b-col>
          <div class="d-flex justify-content-end">
            <b-button class="mr-1" variant="primary" @click="createBusiness()">

              Guardar</b-button>

            <b-button @click="resetInfo()">
              Deshacer cambios
            </b-button>
          </div>

        </b-col>
      </b-row>
    </b-card>
    <add-services v-if="openModalAddServiceOwn" @closeModal="closeAddServicesModal" />

  </b-modal>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import BusinessService from '@/views/smart-content/clients/business/business.service.js';
import IndustryService from '@/views/smart-content/clients/business/industries.service.js';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import ClientService from '@/views/smart-content/clients/clients.service.js';
import ServiceService from '@/views/smart-content/clients/services/services.service.js';
import vSelect from 'vue-select';
import { mapGetters } from 'vuex';
import AddServices from '@/views/smart-content/clients/services/AddServices.vue';

export default {
  components: {
    flatPickr,
    VueGoogleAutocomplete,
    vSelect,
    AddServices,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    clientInfo: {
      type: Object,
      default: () => ({}),
    },
    businessInfoDefault: {
      type: Object,
      default: () => { },
    },
  },

  data() {
    return {
      servicesOptions: [],
      businessInfo: {},
      businessModal: false,
      industries: [],
      address: {},
      addressInformation: {
        street: '',
        city: '',
        country: '',
        postal_code: '',
      },
      openModalAddServiceOwn: false,
      clientImage: null,
      viewImage: null,
      selectedFile: null,
    };
  },

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),

    minDate() {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date;
    },
    image() {
      return this.viewImage;
    },
  },
  async mounted() {
    await this.getAllIndustries();
    await this.getAllServices();
    this.businessInfo = this.businessInfoDefault;
    this.businessModal = true;
    if (this.businessInfoDefault != {}){
      this.viewImage = this.businessInfoDefault.business_image_url;
    }
  },

  methods: {
    async closeAddServicesModal() {
      this.openModalAddServiceOwn = false;
      await this.getAllServices();
    },

    openModalAddService() {
      this.openModalAddServiceOwn = true;
    },

    // getAllServices
    async getAllServices() {
      try {
        const data = await ServiceService.getAllServices();
        console.log('getAllServices', data)
        if (data.status === 200) {
          if (Array.isArray(data.data)) {
            this.servicesOptions = data.data;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      try {
        const params = new FormData();
        params.append('file', this.selectedFile, this.selectedFile.name);
        params.append('business_id', this.businessInfo.id);
        const data = BusinessService.uploadCopies(params);
        console.log('data', data);
      } catch (e) {
        console.log(e);
      }
    },

    getAddressData(addressPrincipal) {
      const mainAddress = addressPrincipal.street_number
        ? `${addressPrincipal.route} ${addressPrincipal.street_number}`
        : addressPrincipal.route;
      this.addressInformation.street = mainAddress || ' ';
      this.addressInformation.city = addressPrincipal.locality
        ? addressPrincipal.locality
        : ' ';
      this.addressInformation.country = addressPrincipal.country
        ? addressPrincipal.country
        : ' ';
      this.addressInformation.postal_code = addressPrincipal.postal_code
        ? addressPrincipal.postal_code
        : ' ';
    },
    // get-industries
    async getAllIndustries() {
      try {
        const data = await IndustryService.getAllIndustries();
        if (data.status === 200) {
          this.industries = data.data;
          console.log('industries', this.industries);
        }
      } catch (e) {
        console.log(e);
      }
    },

    close() {
      this.$emit('refreshBusinesses');
      this.$emit('closeModal');
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

    resetInfo() {
      this.businessInfo = {};
    },

    async createBusiness() {
      const validation = await this.$refs.form.validate();
      if (!validation) {

      } else {
        try {
          this.addPreloader();
          const paramsAddress = {
            street: this.addressInformation.street,
            city: this.addressInformation.city,
            country: this.addressInformation.country,
            postal_code: this.addressInformation.postal_code,
          };
          const address = await ClientService.createAddress(paramsAddress);

          if (address.status == 201) {
            console.log('asd')

            const formData = new FormData();
            formData.append('business_id', this.businessInfo.id ? this.businessInfo.id : null);
            formData.append('name', this.businessInfo.name);
            formData.append('facebook_page', this.businessInfo.facebook_page);
            formData.append('services', JSON.stringify(this.businessInfo.services));
            formData.append('phone', this.businessInfo.phone);
            formData.append('address_id', address.data.id.id);
            formData.append('website', this.businessInfo.website);
            formData.append('mail', this.businessInfo.mail);
            formData.append('industry_id', this.businessInfo.industry_id);
            formData.append('schedule', this.businessInfo.schedule);
            formData.append('target_audience', this.businessInfo.target_audience);
            formData.append('client_id', this.clientInfo.id);
            formData.append('mission', this.businessInfo.mission);
            formData.append('vision', this.businessInfo.vision);
            formData.append('values', this.businessInfo.values);
            if(this.selectedFile != null){
              formData.append('excel_copies', this.selectedFile);
            }            
            if(this.clientImage != null){
              formData.append('image', this.clientImage);
            }
            // const params = {
            //   business_id: this.businessInfo.id ? this.businessInfo.id : null,
            //   name: this.businessInfo.name,
            //   facebook_page: this.businessInfo.facebook_page,
            //   services: this.businessInfo.services,
            //   phone: this.businessInfo.phone,
            //   address_id: address.data.id.id,
            //   website: this.businessInfo.website,
            //   mail: this.businessInfo.mail,
            //   industry_id: this.businessInfo.industry_id,
            //   schedule: this.businessInfo.schedule,
            //   target_audience: this.businessInfo.target_audience,
            //   client_id: this.clientInfo.id,
            //   mission: this.businessInfo.mission,
            //   vision: this.businessInfo.vision,
            //   values: this.businessInfo.values,

            // };
            console.log('jess ')
            console.log(this.edit, 'asd23')

            const data = this.edit ? await BusinessService.updateBusiness(formData) : await BusinessService.createBusiness(formData);
            console.log(this.edit, 'asd')
            if (data.status == 200) {
              this.close();
              this.removePreloader()
            }
          }
        } catch (e) {
          this.removePreloader()
          console.log(e);
        }
      }
    },
    inputImage() {
      document.getElementById("file_input_2").click();
    },
    getImage(e) {
      if (!e.target.files.length) {
        this.clientImage = null;
        return;
      }
      let file = e.target.files[0];
      this.clientImage = file;
      this.uploadImage(file);
    },
    uploadImage: function (file) {
      console.log('file ', file)
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log('upload image e ', e)
        this.viewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

  },
};
</script>
<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";

.image-upload {
  height: 200px;
  border: 1px dashed #7367f0;
  color: hsl(245, 82%, 67%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
</style>
