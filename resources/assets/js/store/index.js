import Vue from 'vue'
import Vuex from 'vuex'
import consumers from './modules/consumers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { consumers }
})
