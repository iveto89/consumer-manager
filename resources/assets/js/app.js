/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import 'es6-promise/auto'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Vuex)

import dashboard from './components/dashboard/dashboard.vue'

const routes = [
  {
    path: '/',
    components: {
      dashboard: dashboard
    }
  }
]

const router = new VueRouter({ routes })

new Vue({ router, store }).$mount('#app')
