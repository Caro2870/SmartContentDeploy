import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'
import clients from './p-routes/clients'
import posts from '@/views/smart-content/posts/posts.router.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/'
    , redirect: { name: 'user-posts' } 
  },
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    ...others,
    ...clients,
    ...posts,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn();

  // Check if the route is neither 'auth-login' nor 'auth-register'
  if (to.name !== "auth-login" && to.name !== "auth-register") {
    if (!isLoggedIn) {
      // If the user is not authenticated, redirect to the login page.
      return next({ name: 'auth-login' });
    }
  }

  // If the user is authenticated, check if a redirection is needed.
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData();
    const homeRoute = getHomeRouteForLoggedInUser(userData ? userData.role : null);

    // Redirect the user to the appropriate home route.
    return next(homeRoute);
  }

  // If the user is authenticated and no redirection is needed, or if it's a public route, allow navigation.
  next();
});



// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
