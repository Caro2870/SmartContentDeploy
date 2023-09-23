import { getUserData } from '@/auth/utils';

const user = getUserData();

export default {
  namespaced: true,
  state: {
    currentUser: user,
  },
  getters: {
    currentUser: state => state.currentUser,
  },
  mutations: {
    SET_CURRENT_USER(state, val) {
      state.currentUser = val;
      // state.currentUser?.modul_id = null
    },
  },
  actions: {
    updateCurrentUser({ commit }, user) {
      commit('SET_CURRENT_USER', user);
    },
  },
};
