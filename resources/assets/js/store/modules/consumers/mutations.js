export default {
  SET_CONSUMERS (state, consumers) {
    state.consumers = consumers
  },
  CREATE_CONSUMER (state, consumer) {
    state.consumers.push(consumer)
  },
  REMOVE_CONSUMER (state, { index, id }) {
    if (index) {
      state.consumers.splice(index, 1)
    }
    index = state.consumers.findIndex(c => c.id === id)
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
  UPDATE_INPUT_FILED (state, { index, field, value }) {
    state.consumers[index][field] = value
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
  UPDATE_SEARCH_TEXT (state, searchText) {
    state.searchText = searchText
  }
}
