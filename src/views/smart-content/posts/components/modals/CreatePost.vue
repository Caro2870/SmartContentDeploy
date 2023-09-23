<template>
    <b-modal v-model="businessModal" title-class="h3 text-white" size="xl" centered
        :title="edit ? 'Edit Business' : 'Create Business'" hide-footer modal-class="modal-primary" no-close-on-backdrop
        @hidden="close">

        <b-card>
            <validation-observer ref="form">
                <b-row>
                    <b-col>
                        <b-form-group label="Client">
                            <v-select v-model="clientId" class="white-background"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" placeholder="Select a client"
                                label="name" :options="clientsArray" :reduce="option => option.id" @input="clientChosen" />
                        </b-form-group>
                    </b-col>

                    <b-col>
                        <b-form-group label="Business">
                            <v-select class="white-background" v-model="businessId"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" placeholder="Select a business"
                                label="name" :disabled="clientId == null" :options="clientBusinesses"
                                :reduce="option => option.id"
                                :class="clientId == null ? 'custom-select-disabled-class' : ''" />
                        </b-form-group>
                    </b-col>

                </b-row>
            </validation-observer>
            <b-row class="mt-2">
                <b-col>
                    <div class="d-flex justify-contend-end align-items-end  ">
                        <b-button class="mr-1" variant="primary" @click="createBusiness()">
                            Create Post
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
        };
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/currentUser",
        }),

        minDate() {
            const date = new Date();
            date.setMonth(date.getMonth() - 1);
            return date;
        },
    },
    async mounted() {
        await this.getAllIndustries();
        await this.getAllServices();
        this.businessInfo = this.businessInfoDefault;
        this.businessModal = true;
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
                if (data.status === 200) {
                    this.servicesOptions = data.data;
                    console.log('services', this.servicesOptions);
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
                params.append('business_id', 1);
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
                    const paramsAddress = {
                        street: this.addressInformation.street,
                        city: this.addressInformation.city,
                        country: this.addressInformation.country,
                        postal_code: this.addressInformation.postal_code,
                    };
                    const address = await ClientService.createAddress(paramsAddress);

                    if (address.status == 201) {
                        const params = {
                            id: this.businessInfo.id,
                            name: this.businessInfo.name,
                            facebook_page: this.businessInfo.facebook_page,
                            services: this.businessInfo.services,
                            phone: this.businessInfo.phone,
                            address_id: address.data.id.id,
                            website: this.businessInfo.website,
                            mail: this.businessInfo.mail,
                            industry_id: this.businessInfo.industry_id,
                            schedule: this.businessInfo.schedule,
                            target_audience: this.businessInfo.target_audience,
                            client_id: this.clientInfo.id,
                            mission: this.businessInfo.mission,
                            vision: this.businessInfo.vision,
                            values: this.businessInfo.values,

                        };

                        const data = await BusinessService.createBusiness(params);
                        if (data.status == 201) {
                            this.close();
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },

    },
};
</script>
  