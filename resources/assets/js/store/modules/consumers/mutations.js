export default {
  SET_CONSUMERS (state, consumers) {
    state.consumers = consumers
  },
  CREATE_CONSUMER (state, consumer) {
    state.consumers.push(consumer)
  },
  REMOVE_CONSUMER (state, index) {
    state.consumers.splice(index, 1)
  },
  UPDATE_CONSUMER (state, { consumer, index }) {
    if (!index) {
      index = state.consumers.findIndex(c => c.id === consumer.id)
    }
    state.consumers.splice(index, 1, consumer)
  },
  SET_EDIT_MODE (state, { field, consumer }) {
    state.editMode = true
    state.editModeField = field
    state.editedConsumer = consumer
  },
  REMOVE_EDIT_MODE (state) {
    state.editMode = false
    state.editModeField = null
    state.editedConsumer = null
  },
  SET_TEMP_VALUE (state, { field, consumerField }) {
    state.temp[field] = consumerField
  },
  SET_TEMP_OBJECT (state, consumer) {
    state.temp = consumer
  },
  TOGGLE_CREATE_MODE (state, createMode) {
    state.createMode = createMode
  },
  SORT_CONSUMERS (state, sortByObject) {
    const sortBy = sortByObject.id.split('-')
    const sortByKey = sortBy[0]
    const sortByDirection = sortBy[1]

    const consumers = state.filteredConsumers || state.consumers

    return consumers.sort((a, b) => {
      const firstEl = typeof a[sortByKey] === 'string' ? a[sortByKey].toLowerCase() : a[sortByKey]
      const secondEl = typeof b[sortByKey] === 'string' ? b[sortByKey].toLowerCase() : b[sortByKey]

      if (sortByDirection === 'asc') {
        return (firstEl > secondEl) ? 1 : -1
      } else {
        return (firstEl > secondEl) ? -1 : 1
      }
    })
  },
  SET_SEARCH_TEXT (state, searchText) {
    state.searchText = searchText
  },
  SEARCH_CONSUMERS (state) {
    const searchTextTrimmed = state.searchText.trimStart()

    const consumers = [
      ...state.consumers.filter(consumer => {
        return consumer.name && consumer.name.toLowerCase().startsWith(searchTextTrimmed.toLowerCase()) ||
          consumer.city && consumer.city.toLowerCase().startsWith(searchTextTrimmed.toLowerCase()) ||
          consumer.age && consumer.age.toString().startsWith(searchTextTrimmed)
      })
    ]
    if (searchTextTrimmed) {
      state.filteredConsumers = consumers
    } else {
      state.consumers = consumers
      state.filteredConsumers = null
    }
  }
}
