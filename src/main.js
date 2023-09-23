import Vue from 'vue'
import {
  ToastPlugin,
  ModalPlugin,
  BootstrapVue,
  BootstrapVueIcons,
} from "bootstrap-vue"
import VueCompositionAPI from '@vue/composition-api'

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
import { ValidationProvider, ValidationObserver } from "vee-validate"
import { initialize } from "@/views/smart-content/service/general.js"
import money from "v-money"
import "@progress/kendo-ui"
import "@progress/kendo-theme-default/dist/all.css"
import { DateinputsInstaller } from "@progress/kendo-dateinputs-vue-wrapper"
// Axios Mock Adapter
import '@/@fake-db/db'
import "./filters/dates"
import "./validation/rules"
import generalMixins from '@/@core/mixins/general.js'
import bFormSlider from 'vue-bootstrap-slider';
import vueLoader from "./directives/preloader/index";

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(bFormSlider)
Vue.use(money, { precision: 4 })
// KENDO PLUGIN
Vue.use(DateinputsInstaller)
// Composition API
Vue.use(VueCompositionAPI)
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
Vue.use(BootstrapVue, {
  BModal: { headerBgVariant: "primary", titleClass: "text-light" },
  breakpoints: ["xs", "sm", "md", "lg", "xl", "xxl"],
})
Vue.use(BootstrapVueIcons)
Vue.mixin(generalMixins)
Vue.use(vueLoader, "loading");

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

initialize(router)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
