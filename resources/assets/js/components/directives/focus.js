import Vue from 'vue'

export const Focus = {
  bind: function (el, binding, vnode) {
    if (binding.value) {
      el.focus()
    }
  },

  inserted: function (el, binding, vnode) {
    if (binding.value) {
      el.focus()
    }
  },

  update: function (el, binding, vnode) {
    if (binding.value) {
      el.focus()
    }
  }
}

Vue.directive('focus', Focus)
