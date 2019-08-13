export default {
  consumers: state => {
    return state.consumers
  },
  filteredConsumers: state => {
    const searchText = state.searchText.trimStart().toLowerCase()
    const consumers = state.consumers

    if (!searchText) {
      return consumers
    }

    return consumers.filter(consumer => {
      return (consumer.name && consumer.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        consumer.city && consumer.city.toLowerCase().startsWith(searchText.toLowerCase()) ||
        consumer.age && consumer.age.toString().startsWith(searchText)) || !consumer.id
    })
  }
}
