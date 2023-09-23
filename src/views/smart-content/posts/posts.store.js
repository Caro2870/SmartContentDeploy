const state = {
  chosenPost: null,
}
const getters = {
  G_CHOSEN_POST() {
    return state.chosenPost
  },
}

const mutations = {
  SET_CHOSEN_POST(state, payload) {
    state.chosenPost = payload
  },
  SET_CHOSEN_POST_CONTENT(state, payload) {
    state.chosenPost.message_id = payload.id
    state.chosenPost.content = payload.msg || payload.content
  },
}
const actions = {
  A_SET_CHOSEN_POST({ commit }, params) {
    commit("SET_CHOSEN_POST", params)
  },
  A_SET_CHOSEN_POST_CONTENT({ commit }, params) {
    commit("SET_CHOSEN_POST_CONTENT", params)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
