import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import PostsStore from '@/views/smart-content/posts/posts.store.js'
import AuthStore from '@/views/pages/authentication/auth.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
    PostsStore,
    'auth': AuthStore
  },
  strict: process.env.DEV,
})
