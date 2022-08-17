const state = () => ({
  user: null,
});

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

const getters = {
  getUser(state) {
    return state.user
  },
}

const actions = {
  onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
      commit('setUser', null)
      this.$router.push('/auth')
    } else {
      const { uid, email } = authUser
      commit('setUser', { uid, email })
    }
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
