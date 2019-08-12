export default {
  setConsumers ({ state, commit }, consumers) {
    commit('SET_CONSUMERS', consumers)
  },
  createConsumer ({ state, commit, dispatch }, consumer) {
    commit('CREATE_CONSUMER', consumer)
    dispatch('setTempObject', { name: '', age: null, city: '' })
  },
  removeConsumer ({ state, commit }, index) {
    commit('REMOVE_CONSUMER', index)
  },
  updateConsumer ({ state, commit }, { consumer, index }) {
    commit('UPDATE_CONSUMER', { consumer, index })
  },
  setEditMode ({ state, commit }, { field, consumer }) {
    const consumerField = consumer[field]
    commit('SET_EDIT_MODE', { field, consumer })
    commit('SET_TEMP_VALUE', { field, consumerField })
  },
  removeEditMode ({ state, commit }, { field, consumer }) {
    commit('REMOVE_EDIT_MODE', { field, consumer })
    commit('SET_TEMP_VALUE', { field, consumer: null })
  },
  setTempObject ({ state, commit }, consumer) {
    commit('SET_TEMP_OBJECT', consumer)
  },
  toggleCreateMode ({ state, commit }, createMode) {
    commit('TOGGLE_CREATE_MODE', createMode)
  },
  sortConsumers ({ state, commit }, sortBy) {
    commit('SORT_CONSUMERS', sortBy)
  },
  setSearchText ({ state, commit }, searchText) {
    commit('SET_SEARCH_TEXT', searchText)
  },
  searchConsumers ({ state, commit, dispatch }, searchText) {
    dispatch('setSearchText', searchText)
    commit('SEARCH_CONSUMERS')
  }
}
