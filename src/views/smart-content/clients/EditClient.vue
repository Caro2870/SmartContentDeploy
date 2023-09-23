<template>
  <div>

    <b-card>
      <b-row class="m-2">

        <b-col cols="4">
          <h3>{{ userClientInfo.first_name }} {{ userClientInfo.last_name }}</h3>
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
        <b-col cols="8">
          <div>
            <validation-observer ref="form">
              <!-- Header: Personal Info -->
              <div class="d-flex">
                <feather-icon
                  icon="UserIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Informacion Personal
                </h4>
              </div>

              <!-- Form: Personal Info Form -->
              <b-form class="mt-1">
                <b-row>

                  <!-- Field: First Name -->

                  <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                    >

                      <b-form-group
                        label="Nombre"
                        label-for="first-name"
                      >

                        <b-form-input
                          id="firstName"
                          v-model="userClientInfo.first_name"
                          :state="errors[0] ? false : null"
                        />

                      </b-form-group>
                    </validation-provider>

                  </b-col>

                                    <!-- Field: Last Name -->
                                    <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <b-form-group
                        label="Apellido"
                        label-for="last-name"
                      >

                        <b-form-input
                          id="LastName"
                          v-model="userClientInfo.last_name"
                          :state="errors[0] ? false : null"
                        />

                      </b-form-group>
                    </validation-provider>
                  </b-col>

                  <!-- Field: Address -->
                  <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider>
                      <b-form-group
                        label="Dirección"
                        label-for="Address"
                      >
                        <vue-google-autocomplete
                          id="address_create_application_data"
                          ref="address_create_application_data"
                          v-model="userClientInfo.address"
                          class="form-control boder-hover-p"
                          placeholder="Please type your address"
                          classname="input-form form-control fond-white"
                          :country="['us', 'pe']"
                          style="height: 35px !important"
                          @placechanged="getAddressData"
                        />
                      </b-form-group>
                    </validation-provider>
                  </b-col>

                  <!-- Field: Email -->
                  <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <b-form-group
                        label="Correo"
                        label-for="Email"
                      >
                        <b-form-input
                          id="email"
                          v-model="userClientInfo.email"
                          :state="errors[0] ? false : null"
                        />
                      </b-form-group>
                    </validation-provider>
                  </b-col>



                  <!-- Field: Address -->
                  <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <b-form-group
                        label="Celular"
                        label-for="Phone"
                      >
                        <b-form-input
                          id="Phone"
                          v-model="userClientInfo.phone"
                          :state="errors[0] ? false : null"
                        />
                      </b-form-group>
                    </validation-provider>
                  </b-col>

                  <!-- Field: Email -->
                  <!-- <b-col
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <b-form-group
                        label="Fecha de creación"
                        label-for="Created at"
                      >
                        <kendo-datepicker
                          id="created_at"
                          v-model="userClientInfo.created_at"
                          :first-day-of-week="1"
                          placeholder="MM/DD/YYYY"
                          :min="minDate"
                          class="leads-datepicker w-100 rounded bg-transparent k-picker-custom picker-select-date"
                        />
                      </b-form-group>
                    </validation-provider>
                  </b-col> -->

                </b-row>

                <b-row class="mt-2">
                  <b-col>
                    <div class="d-flex justify-contend-end align-items-end  ">
                      <b-button
                        class="mr-1"
                        variant="primary"
                        @click="updateClient()"
                      >

                        Actualizar
                      </b-button>
                      <!-- <b-button @click="resetInfo()">
                        Reset
                      </b-button> -->
                    </div>

                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col>
        <h3>Negocios</h3>
        <span>Aqui están los negocios de este cliente</span>
      </b-col>
      <b-col>
        <div class="d-flex justify-content-end align-items-end">
          <b-button
            variant="primary"
            @click="createBusiness({})"
          >
            Crear negocio
          </b-button>

        </div>

      </b-col>
    </b-row>
    <template>

      <b-row>
        <!-- Mostrar los negocios en 3 columnas horizontales si hay negocios disponibles -->
        <b-col
          v-for="business in parseBusinesses(userClientInfo.business_id)"
          v-if="parseBusinesses(userClientInfo.business_id).length > 0"
          :key="business.id"
          cols="4"
        >
          <b-card>
            <h3>{{ business.name }}</h3>

            <br>

            <b-row>
              <b-col>
              <b-avatar :src="business.business_image_url" size="100" class="mr-1" />
              </b-col>
              <b-col>
                <h3>{{ business.service_name }}</h3>
                <span>Registrado el {{ business.created_at | myGlobal }}</span>
                <br>
                <b-link> {{ business.website }}</b-link>
                <br>
                <b-button
                  variant="primary"
                  @click="updateBusiness(business)"
                >
                  Informacion del negocio
                </b-button>
              </b-col>
            </b-row>

          </b-card>
        </b-col>

      </b-row>

    </template>
    <business
      v-if="businessModal"
      :business-info="businessInfo"
      @closeModal="businessModal = false"
    />
    <add-business
      v-if="createBusinessModal"
      :client-info="userClientInfo"
      :business-info-default="businessInfo"
      :edit="editBusiness"
      @refreshBusinesses="getClientById"
      @closeModal="closeAddBusinessModal"
    />
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import ClientService from '@/views/smart-content/clients/clients.service.js';
import Business from '@/views/smart-content/clients/business/SeeBusiness.vue';
import AddBusiness from '@/views/smart-content/clients/business/AddBusiness.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { mapGetters } from 'vuex';

export default {
  components: {
    flatPickr,
    Business,
    AddBusiness,
    VueGoogleAutocomplete,
  },

  data() {
    return {
      editBusiness: false,
      userClientInfoClean: { ...this.userClientInfo },
      userClientInfo: [],
      businessModal: false,
      businessInfo: [],
      createBusinessModal: false,
      address: {},
      addressInformation: {
        street: '',
        city: '',
        country: '',
        postal_code: '',
      },
      clientImage: null,
      viewImage: null,
    };
  },
  computed: {
    minDate() {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date;
    },
    image() {
      return this.viewImage;
    },
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  async mounted() {
    await this.getClientById();
  },
  methods: {
    async closeAddBusinessModal() {
      await this.getClientById();
      this.createBusinessModal = false;
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
    // getClientById
    async getClientById() {
      try {
        const params = {
          client_id: this.$route.params.client_id,
        };

        const data = await ClientService.getClientByIdA(params);

        if (data.status == 200) {
          this.userClientInfo = data.data;
          if(this.userClientInfo.profile_picture != null && this.userClientInfo.profile_picture != ''){
            this.viewImage = this.userClientInfo.profile_picture
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    updateBusiness(businessInfo) {
      this.createBusinessModal = true;
      this.businessInfo = businessInfo;
      this.editBusiness = true;
    },
    createBusiness(businessInfo) {
      this.createBusinessModal = true;
      this.businessInfo = businessInfo;
      this.editBusiness = false;
    },
    parseBusinesses(businessesStr) {
      try {
        if (businessesStr == null) {
          return [];
        }
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
      this.userClientInfo = { ...this.userClientInfoClean };
    },

    async updateClient() {
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

            const formData = new FormData();
            formData.append('client_id', this.userClientInfo.id);
            formData.append('first_name',this.userClientInfo.first_name);
            formData.append('last_name', this.userClientInfo.last_name);
            formData.append('address_id',  address.data.id.id);
            formData.append('email', this.userClientInfo.email);
            formData.append('phone', this.userClientInfo.phone);
            formData.append('user_id', this.currentUser.user_id);
            console.log('clientImage ', typeof this.clientImage)
            if(this.clientImage != null){
              formData.append('profile_picture', this.clientImage);
            }
            // const params = {
            //   client_id: this.userClientInfo.id,
            //   first_name: this.userClientInfo.first_name,
            //   last_name: this.userClientInfo.last_name,
            //   address_id: address.data.id.id,
            //   email: this.userClientInfo.email,
            //   phone: this.userClientInfo.phone,
            //   profile_picture: this.userClientInfo.profile_picture,
            //   user_id: 1,
            //   clientImage: this.clientImage,
            // };

            const data = await ClientService.updateClient(formData);
            if (data.status == 200) {
              this.$swal({
        position: 'center',
        icon: 'success',
        title: 'Client updated successfully',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
                this.close()
                this.removePreloader()
            }
          }
        } catch (e) {
          console.log(e);
          this.removePreloader()
        }
      }
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
    inputImage() {
      document.getElementById("file_input_1").click();
    },

  },
};
</script>
<style lang="scss" scoped>
.image-upload {
  height: 200px;
  width: 200px;
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