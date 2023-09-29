
<template>
    <div class="catalina" v-show="isShow">
        <div class="vld-parent"  :style="{background:background}">
      <loading v-if="isFull" :active.sync="isLoading"
               :on-cancel="onCancel"
               :loader="'dots'"
               :color="'#7065e9'"
               :transition="'fade'"
               :is-full-page="fullPage">
        </loading>
      <label><input type="checkbox" v-model="fullPage">Full page?</label>
  </div>
    </div>

</template>

<script>
  // Import component
  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
      created() {
        console.log('preloader')
      },
      data() {
          return {
              isLoading: true,
              fullPage: true,
              isShow: false,
              // background: 'rgba(255, 255, 255, 0.5)',
              background: '',
              appLogoImage: require('@/assets/images/logo/logoimage.svg'),
              isFull: true,
          }
      },
      components: {
          Loading
      },
      methods: {
          doAjax() {
              this.isLoading = true;
              // simulate AJAX
              setTimeout(() => {
                  this.isLoading = false
              }, 5000)
          },
          onCancel() {
              console.log('User cancelled the loader.')
          }
      }
  }
</script>

<style>
.vld-parent{
    width: 100%;
    height: 100%;
}
</style>