<template>
    <div>
      <div id="buttonDiv" class="d-flex justify-content-center"></div>
    </div>
  </template>
  
  <script>
  import AuthenticationService from '@/views/pages/authentication/authentication.service.js'
  import useJwt from '@/auth/jwt/useJwt'
  import { getHomeRouteForLoggedInUser } from '@/auth/utils'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

  export default {
    mounted() {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: "224188928478-l145vhrguhv8jq2f5dbmnds2p5md8kjp.apps.googleusercontent.com",
          callback: this.handleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_prompt:"false"
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "filled_blue", size: "large", shape: "rectangular", type: "standard", text: "signin_with", logo_alignment: "left" } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      };
    },
    methods: {
      async handleCredentialResponse(response) {
        // You can process the response here or call a Vue method to handle it further
        const data = await AuthenticationService.loginUser(response)
        console.log(' log in data ', data)
        this.handleGoogleSignIn(response);


        const { userData } = data.data
        userData.fullName = userData.given_name
              userData.username = userData.family_name
              userData.role = 'Marketer'
              useJwt.setToken(response.credential)
              useJwt.setRefreshToken(response.credential)
              localStorage.setItem('userData', JSON.stringify(userData))
              this.updateCurrentUser(userData)
              userData.ability = [{
                action: 'manage',
                subject: 'all',
              },]
              this.$ability.update(userData.ability)

              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router.replace(getHomeRouteForLoggedInUser('admin'))
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: `Welcome ${userData.name}`,
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: `You have successfully logged in as marketer. Now you can start to explore!`, // en vez de admin userData.role
                    },
                  })
                })
      },
      handleGoogleSignIn(response) {
        // Your custom logic to handle the Google sign-in response
        // For example, you can send the ID token to your backend for authentication
        // using an API call with a library like Axios.
      },
      ...mapActions({
        updateCurrentUser: "auth/updateCurrentUser",
    }),
    },
  };
  </script>
  