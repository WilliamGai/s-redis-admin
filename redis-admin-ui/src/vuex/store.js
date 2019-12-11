import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export const redisStore =  new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment(state) {
//       state.count++
//     },
//     setValue(state, value) {
//       state.count = value
//     }
//   }
// })
export default new Vuex.Store({
  state: {
    count: 0,
    redisId: 0,
    redisName: ''
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setValue(state, value) {
      state.count = value
    },
    setRedisName(state, value) {
      state.redisName = value
    },
    setRedisId(state, value) {
      state.redisId = value
    },
  }
})
