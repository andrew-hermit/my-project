import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     count: 0,
     posts: []
  },
  mutations: {
    increment (state, payload) {
       state.count = state.count + payload.amount
       state.posts.push(payload.text)
    }
  },
  actions: {
    increment(context, payload) {
      context.commit('increment', payload);
     },
     incrementAsync ({ commit, state }, payload) {
console.log(state)
         setTimeout(() => {
                commit('increment', payload)
         }, 100)
     }
  }
})
