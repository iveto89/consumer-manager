export default {
  SET_CONSUMERS (state, consumers) {
    state.consumers = consumers
  },
  REMOVE_CONSUMER (state, id) {
    const index = state.consumers.findIndex(c => c.id === id)
    state.consumers.splice(index, 1)
  },
  SORT_CONSUMERS (state, sortByObject) {
    const sortBy = sortByObject.id.split('-')
    const sortByKey = sortBy[0]
    const sortByDirection = sortBy[1]

    return state.consumers.sort((a, b) => {
      const firstEl = typeof a[sortByKey] === 'string' ? a[sortByKey].toLowerCase() : a[sortByKey]
      const secondEl = typeof b[sortByKey] === 'string' ? b[sortByKey].toLowerCase() : b[sortByKey]

      if (sortByDirection === 'asc') {
        return (firstEl > secondEl) ? 1 : -1
      } else {
        return (firstEl > secondEl) ? -1 : 1
      }
    })
  },
  SEARCH_CONSUMERS (state, searchText) {
    const searchTextTrimmed = searchText.trimStart()
    state.filteredConsumers = [
      ...state.consumers.filter(consumer => {
        return consumer.name.toLowerCase().startsWith(searchTextTrimmed.toLowerCase()) ||
          consumer.city.toLowerCase().startsWith(searchTextTrimmed.toLowerCase()) ||
          consumer.age.toString().startsWith(searchTextTrimmed)
      })
    ]
  },
  UPDATE_CONSUMER (state, consumer) {
    const index = state.consumers.findIndex(c => c.id === consumer.id)
    state.consumers.splice(index, 1, consumer)
  },
  SET_EDIT_MODE (state, { field, consumer }) {
    state.editModeField = field
    state.editedConsumer = consumer
  },
  REMOVE_EDIT_MODE (state) {
    state.editModeField = null
    state.editedConsumer = null
  },
  SET_TEMP_VALUE (state, { field, consumerField }) {
    state.temp[field] = consumerField
  }
}
