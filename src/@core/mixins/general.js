export default {
  data() {
    return {
      skindos: 'bri',
    };
  },
  computed: {
    isDarkSkin() {
      return this.$store.getters['appConfig/skin'] === 'dark';
    },
    isLightSkin() {
      return this.$store.getters['appConfig/skin'] === 'light';
    },

  },
  methods: {
    addPreloader() {
      this.$store.commit('app/SET_LOADING', true);
    },
    removePreloader() {
      this.$store.commit('app/SET_LOADING', false);
    },
  },
};
