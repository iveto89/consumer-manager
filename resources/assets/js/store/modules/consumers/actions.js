export default {
  setConsumers ({ state, commit }, consumers) {
    commit('SET_CONSUMERS', consumers)
  },
  createConsumer ({ state, commit, dispatch }, consumer) {
    commit('CREATE_CONSUMER', consumer)
    dispatch('setTempObject', { name: '', age: null, city: '' })
  },
  removeConsumer ({ state, commit }, { index, id }) {
    commit('REMOVE_CONSUMER', { index, id })
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
  updateSearchText ({ state, commit }, searchText) {
    commit('UPDATE_SEARCH_TEXT', searchText)
  }
}
