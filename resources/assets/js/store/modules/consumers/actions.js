import axios from 'axios'

export default {
  getConsumers ({ state, commit }) {
    axios.get('/api/v1/consumers')
      .then(response => commit('SET_CONSUMERS', response.data))
      .catch((resp) => {
        console.error('Could not load consumers')
      })
  },
  removeConsumer ({ state, commit }, id) {
    commit('REMOVE_CONSUMER', id)
  },
  sortConsumers ({ state, commit }, sortBy) {
    commit('SORT_CONSUMERS', sortBy)
  },
  setSearchText ({ state, commit }, searchText) {
    commit('SET_SEARCH_TEXT', searchText)
  },
  searchConsumers ({ state, commit }) {
    commit('SEARCH_CONSUMERS')
  },
  updateConsumer ({ state, commit }, consumer) {
    commit('UPDATE_CONSUMER', consumer)
  },
  setEditMode ({ state, commit }, { field, consumer }) {
    const consumerField = consumer[field]
    commit('SET_EDIT_MODE', { field, consumer })
    commit('SET_TEMP_VALUE', { field, consumerField })
  },
  removeEditMode ({ state, commit }, { field, consumer }) {
    commit('REMOVE_EDIT_MODE', { field, consumer })
    commit('SET_TEMP_VALUE', { field, consumer: null })
  }
}
