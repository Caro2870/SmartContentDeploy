<template>
  <b-modal v-model="ownControl" title-class="h3 text-white" size="xl" title="Crear Cliente" hide-footer
    modal-class="modal-primary" @hide="close">

    <div>

      <b-card>
        <b-row>

          <b-col cols="3">
            <h3>{{ userClientInfo.first_name }} {{ userClientInfo.last_name }}</h3>
            <!-- <b-img height="250" weight="250" rounded="circle"
              :src="require('@/assets/images/portrait/small/avatar-s-9.jpg')" alt="Medal Pic">
            </b-img> -->
            <div class="mb-1">
              <input type="file" id="file_input_1" @change="getImage" hidden accept="image/*"/>
              <!-- INPUT_FILE FIN -->
              <div class="m-0 cursor-pointer">
                <figure @click="inputImage()" class="m-0 image-upload">
                  <p v-if="image == null">Haga clic aquí para subir la imagen</p>
                  <img v-else width="100%" height="100%" :src="image" />
                </figure>
              </div>
            </div>
          </b-col>
          <b-col cols="9">
            <div>
              <validation-observer ref="form">
                <!-- Header: Personal Info -->
                <div class="d-flex">
                  <feather-icon icon="UserIcon" size="19" />
                  <h4 class="mb-0 ml-50">
                    Informacion personal
                  </h4>
                </div>

                <!-- Form: Personal Info Form -->
                <b-form class="mt-1">
                  <b-row>

                    <!-- Field: First Name -->

                    <b-col cols="12" md="6" lg="4">
                      <validation-provider v-slot="{ errors }" rules="required">

                        <b-form-group label="Nombre" label-for="first-name">

                          <b-form-input id="firstName" v-model="userClientInfo.first_name"
                            :state="errors[0] ? false : null" />

                        </b-form-group>
                      </validation-provider>

                    </b-col>

                    <b-col cols="12" md="6" lg="4">
                      <validation-provider v-slot="{ errors }" rules="required">
                        <b-form-group label="Apellido" label-for="last-name">

                          <b-form-input id="LastName" v-model="userClientInfo.last_name"
                            :state="errors[0] ? false : null" />

                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <!-- Field: Address -->
                    <b-col cols="12" md="6" lg="4">
                      <validation-provider>
                        <b-form-group label="Dirección" label-for="Address">
                          <vue-google-autocomplete ref="address_create_application_data"
                            id="address_create_application_data" class="form-control boder-hover-p"
                            placeholder="Please type your address" v-model="userClientInfo.address"
                            classname="input-form form-control fond-white" :country="['us', 'pe']"
                            style="height: 35px !important" @placechanged="getAddressData" />
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <!-- Field: Email -->
                    <b-col cols="12" md="6" lg="4">
                      <validation-provider v-slot="{ errors }" rules="required|email">
                        <b-form-group label="Correo electronico" label-for="Email">
                          <b-form-input id="email" v-model="userClientInfo.email" :state="errors[0] ? false : null" />
                        </b-form-group>
                      </validation-provider>
                    </b-col>



                    <!-- Field: Last Name -->


                    <!-- Field: Address -->
                    <b-col cols="12" md="6" lg="4">
                      <validation-provider v-slot="{ errors }" rules="required">
                        <b-form-group label="Teléfono" label-for="Phone">
                          <b-form-input id="Phone" v-model="userClientInfo.phone" :state="errors[0] ? false : null" />
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <!-- Field: Email -->
                    <!-- <b-col cols="12" md="6" lg="4">
                      <validation-provider v-slot="{ errors }" rules="required">
                        <b-form-group label="Created at" label-for="Created at">
                          <kendo-datepicker id="created_at" v-model="userClientInfo.created_at" :first-day-of-week="1"
                            placeholder="MM/DD/YYYY" :min="minDate"
                            class="leads-datepicker w-100 rounded bg-transparent k-picker-custom picker-select-date" />
                        </b-form-group>
                      </validation-provider>
                    </b-col> -->

                  </b-row>

                  <b-row class="mt-2">
                    <b-col>
                      <div class="d-flex justify-contend-end align-items-end  ">
                        <b-button @click="createClient(1)" class="mr-1" variant="primary">

                          Guardar</b-button>
                        <!-- <b-button @click="createClient(2)" class="mr-1" variant="primary">

                          Create Client and Add Business
                        </b-button> -->
                        <b-button @click="resetInfo()">
                          Deshacer cambios
                        </b-button>
                      </div>

                    </b-col>
                  </b-row>

                </b-form>
              </validation-observer>
            </div>
          </b-col>
        </b-row>
      </b-card>


    </div>

    <add-business v-if="createBusinessModal" :businessInfo="businessInfo" @closeModal="createBusinessModal = false">

    </add-business>

  </b-modal>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import ClientService from '@/views/smart-content/clients/clients.service.js';
import AddBusiness from '@/views/smart-content/clients/business/AddBusiness.vue'
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapGetters } from 'vuex';

export default {
  components: {
    flatPickr,
    AddBusiness,
    VueGoogleAutocomplete,
  },



  data() {
    return {

      userClientInfo: [],
      businessModal: false,
      createBusinessModal: false,
      businessInfo: [],
      ownControl: true,
      address: {},
      addressInformation: {
        street: "",
        city: "",
        country: "",
        postal_code: "",
      },
      clientImage: null,
      viewImage: null,
    };
  },
  computed: {
    minDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date
    },

    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
    image() {
      return this.viewImage;
    },
  },
  async mounted() {

  },
  methods: {

    getAddressData(addressPrincipal) {

      const mainAddress = addressPrincipal.street_number
        ? `${addressPrincipal.route} ${addressPrincipal.street_number}`
        : addressPrincipal.route;
      this.addressInformation.street = mainAddress || " ";
      this.addressInformation.city = addressPrincipal.locality
        ? addressPrincipal.locality
        : " ";
      this.addressInformation.country = addressPrincipal.country
        ? addressPrincipal.country
        : " ";
      this.addressInformation.postal_code = addressPrincipal.postal_code
        ? addressPrincipal.postal_code
        : " ";
    },
    close() {
      this.$emit('refresh')
      this.$emit('closeModal')
    },
    updateBusiness(businessInfo) {
      this.businessModal = true
      this.businessInfo = businessInfo
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

      this.userClientInfo = { ...this.userClientInfoClean }
    },

    async createClient(type) {

      const validation = await this.$refs.form.validate()
      if (!validation) {
        console.log('modal de validacion')
      } else {
        try {
          this.addPreloader()
          const paramsAddress = {
            street: this.addressInformation.street,
            city: this.addressInformation.city,
            country: this.addressInformation.country,
            postal_code: this.addressInformation.postal_code,
          };
          const address = await ClientService.createAddress(paramsAddress);


          if (address.status == 201) {

            const params = {
              first_name: this.userClientInfo.first_name,
              last_name: this.userClientInfo.last_name,
              address_id: address.data.id.id,
              email: this.userClientInfo.email,
              phone: this.userClientInfo.phone,
              profile_picture: 'prueba',
              user_id: this.currentUser.user_id,
            };

            const formData = new FormData();
            formData.append('first_name', this.userClientInfo.first_name);
            formData.append('last_name',  this.userClientInfo.last_name);
            formData.append('address_id', address.data.id.id);
            formData.append('email', this.userClientInfo.email);
            formData.append('phone', this.userClientInfo.phone);
            if(this.clientImage != null){
              formData.append('profile_picture', this.clientImage);
            }
            formData.append('user_id', this.currentUser.user_id);

            const data = await ClientService.createClient(formData);

            if (data.status == 201) {
              if (type == 1) {

                this.close()
              }
              else {

                const information = data.data.data
                this.$router.push({ name: "client", params: { client_id: information.id } });


              }

              this.removePreloader()

            }
          }


        } catch (e) {
          console.log(e);
          this.removePreloader()

        }
      }
    },
    inputImage() {
      document.getElementById("file_input_1").click();
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
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
</style>
