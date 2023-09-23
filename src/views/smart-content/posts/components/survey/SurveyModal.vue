<template>
    <b-modal v-model="businessModal" title-class="h3 text-white" size="xl" centered
        title="Encuesta sobre el contenido generado" hide-footer modal-class="modal-primary" no-close-on-backdrop
        @hidden="close">

        <div class="d-flex justify-content-center align-items-center">
            <div class="question">
                <h4>{{ currentQuestion.text }}</h4>
                <div class="d-flex justify-content-center mt-2">
                    <div v-for="(option, index) in answerOptions" :key="index" class="card option ml-1" 
                    style="background-color: #E6E6E6"
                    :class="currentQuestion.answer == option ? 'bg-primary text-white' : ''"
                        @click="selectOption(option)">
                        <div class="card-body">
                            {{ option }}
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center text-danger mt-n1" v-if="currentQuestion.answer == null" >*Elije una opción</div>


                <div class="d-flex justify-content-center mt-2">
                    <b-button variant="primary" @click="prevQuestion" :disabled="currentStep === 0">Previous</b-button>
                    <b-button variant="primary" class="ml-1" @click="nextQuestion"
                        :disabled="currentStep === questions.length - 1">Next</b-button>
                    <b-button variant="primary" class="ml-1" @click="submitSurvey"
                        v-if="currentStep === questions.length - 1 && chosenPost.last_survey_id == null">Submit</b-button>
                </div>
            </div>
        </div>
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
import { mapGetters, mapActions } from 'vuex';
import AddServices from '@/views/smart-content/clients/services/AddServices.vue';
import PostsService from '@/views/smart-content/posts/posts.service.js'

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
            questions: [
                { text: 'How satisfied are you with our service?', answer: null },
                { text: 'Would you recommend us to a friend?', answer: null },
                // Add more questions here
            ],
            currentStep: 0,
        };
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/currentUser",
            chosenPost: 'PostsStore/G_CHOSEN_POST'
        }),

        minDate() {
            const date = new Date();
            date.setMonth(date.getMonth() - 1);
            return date;
        },
        currentQuestion() {
            return this.questions[this.currentStep];
        },
        answerOptions() {
            return [1, 2, 3, 4, 5];
        }
    },
    async mounted() {
        this.businessInfo = this.businessInfoDefault;
        this.businessModal = true;
        if (this.chosenPost.last_survey_id != null) {
            await this.getSurveyData();
        } else {
            await this.getSurveyQuestions();
        }
    },

    methods: {
        ...mapActions({
            A_SET_CHOSEN_POST: "PostsStore/A_SET_CHOSEN_POST",
        }),
        async closeAddServicesModal() {
            this.openModalAddServiceOwn = false;
        },

        openModalAddService() {
            this.openModalAddServiceOwn = true;
        },

        // getAllServices
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

        close() {
            this.$emit('closeModal');
        },


        nextQuestion() {
            if ((this.currentStep < this.questions.length - 1) && this.currentQuestion.answer != null) {
                this.currentStep++;
            }
        },
        prevQuestion() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
        async submitSurvey() {
            // Here you can submit the survey data to your backend
            const surveyData = this.questions.map(question => ({
                text: question.text,
                answer: question.answer
            }));

            await this.saveSurvey();
            console.log(surveyData);
        },
        selectOption(option) {
            this.currentQuestion.answer = option;
        },
        async getSurveyQuestions() {
            const data = await PostsService.getSurveyQuestions()
            if(data.status === 200){
                this.questions = data.data
            }
        },
        async getSurveyData(){
            const params = {
                postSurveyId: this.chosenPost.last_survey_id,
            }
            const data = await PostsService.getSurveyData(params)
            console.log('data', data)
            if(data.status === 200){
                this.questions = data.data
            }
        },
        async saveSurvey() {
            try {
                const params = {
                    answers: this.questions,
                    postId: this.chosenPost.id,
                }
                const data = await PostsService.saveSurvey(params)
                console.log('data', data)
                if(data.status === 200){
                    this.chosenPost.last_survey_id = data.data.post_survey_id
                    this.A_SET_CHOSEN_POST(this.chosenPost)
                    this.close()
                }               
            } catch (error) {
                console.log(error)
            }
        },

    },
};
</script>
<style scoped>
.options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.option {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.option:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Additional styling can be applied to the cards as needed */
</style>