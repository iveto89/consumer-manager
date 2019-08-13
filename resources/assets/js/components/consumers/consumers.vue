<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <input
              type="text"
              v-model="searchText"
              placeholder="Search..."
              class="searchField form-control"/>
          </div>
          <div class="col-md-6">
            <multiselect
              id="sortFilter"
              v-model="sortBy"
              @input="sortData"
              label="name"
              track-by="id"
              placeholder="Sort option"
              open-direction="bottom"
              :allow-empty="false"
              :show-labels="true"
              :options="sortOptions">
              <span slot="noResult">No matches found</span>
            </multiselect>
          </div>
        </div>
        <p v-if="errors.name"><span class="error">{{errors.name}}</span></p>
        <p v-if="errors.age"><span class="error">{{errors.age}}</span></p>
        <p v-if="errors.city"><span class="error">{{errors.city}}</span></p>

        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th width="30%">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="consumer, index in filteredConsumers">
              <td>{{ index + 1 }}</td>
              <td class="tableColumn"
                  :class="colorObject(consumer)">
                <input
                  v-if="isEditable('name', consumer, index)"
                  class="form-control"
                  :class="{ 'error': errors.name}"
                  v-model="temp.name"
                  v-focus="!isCreateMode(consumer)"
                  minlength="4"
                  maxlength="40"
                  spellcheck="false" />
                <div v-if="isEditMode('name', consumer)"
                   @click="updateField('name', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditMode('name', consumer)"
                  @click="cancelUpdate('name', consumer)"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-if="isShowMode('name', consumer)"
                  @dblclick="editField('name', consumer)">{{ consumer.name }}</span>
              </td>
              <td class="tableColumn">
                <input
                  v-if="isEditable('age', consumer, index)"
                  class="form-control"
                  :class="{ 'error': errors.age}"
                  v-focus="!isCreateMode(consumer)"
                  v-model="temp.age"
                  minlength="14"
                  maxlength="99"
                  spellcheck="false" />
                <div v-if="isEditMode('age', consumer)"
                   @click="updateField('age', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditMode('age', consumer)"
                  @click="cancelUpdate('age', consumer)"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-if="isShowMode('age', consumer)"
                  @dblclick="editField('age', consumer)">{{ consumer.age }}</span>
              </td>
              <td class="tableColumn">
                <input
                  v-if="isEditable('city', consumer, index)"
                  v-focus="!isCreateMode(consumer)"
                  class="form-control"
                  :class="{ 'error': errors.city}"
                  v-model="temp.city"
                  minlength="14"
                  maxlength="99"
                  spellcheck="false" />
                <div v-if="isEditMode('city', consumer)"
                   @click="updateField('city', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditMode('city', consumer)"
                  @click="cancelUpdate('city', consumer)"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-if="isShowMode('city', consumer)"
                  @dblclick="editField('city', consumer)">{{ consumer.city }}</span>
              </td>
              <td>
                <a href="javascript:void(0)"
                   class="btn btn-xs btn-danger uppercase"
                   :disabled="busy"
                   @click="deleteConsumer(index, consumer)">
                  Delete
                </a>
                <a v-if="isCreateMode(consumer)"
                   href="javascript:void(0)"
                   class="btn btn-xs btn-success uppercase"
                   :disabled="busy"
                   @click="addConsumer(temp)">
                  Save
                </a>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="uppercase">Name</td>
              <td class="uppercase">Age</td>
              <td class="uppercase">City</td>
              <td>
                <a href="javascript:void(0)"
                  class="btn btn-xs btn-success uppercase"
                  :disabled="busy"
                  @click="addConsumer()">
                  Add user</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'
  import { Focus } from '../directives/focus.js'
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapGetters, mapActions } = createNamespacedHelpers('consumers')

  export default {
    data: function () {
      return {
        sortByDefault: { id: 'idAsc', name: 'ID Asc' },
        sortOptions: [
          { id: 'id-asc', name: 'ID Asc' },
          { id: 'id-desc', name: 'ID Desc' },
          { id: 'name-asc', name: 'Name Asc' },
          { id: 'name-desc', name: 'Name Desc' }
        ],
        busy: false,
        errors: []
      }
    },
    computed: {
      ...mapState([
        'editModeField',
        'editedConsumer',
        'editMode',
        'createMode',
        'temp',
        'consumers',
        'createdConsumerIndex'
      ]),
      ...mapGetters([
        'filteredConsumers'
      ]),
      searchText: {
        get () {
          return this.$store.state.consumers.searchText
        },
        set (value) {
          this.$store.commit('consumers/UPDATE_SEARCH_TEXT', value)
        }
      }
    },
    components: {
      Multiselect
    },
    directives: {
      Focus
    },
    created () {
      this.sortBy = this.sortByDefault
      this.getConsumers()
    },
    methods: {
      ...mapActions([
        'setConsumers',
        'createConsumer',
        'removeConsumer',
        'sortConsumers',
        'updateConsumer',
        'setEditMode',
        'removeEditMode',
        'toggleCreateMode',
        'updateSearchText'
      ]),
      colorObject (consumer) {
        return {
          'text-success': consumer.age < 18,
          'text-danger': consumer.age > 60
        }
      },
      isEditable (field, consumer, index) {
        if (this.isCreateMode(consumer)) {
          return this.filteredConsumers[index] === consumer
        }
        return this.editedConsumer === consumer && this.editModeField === field
      },
      isEditMode (field, consumer) {
        return this.editMode && this.editedConsumer === consumer && this.editModeField === field
      },
      isCreateMode (consumer) {
        return this.createMode && !consumer.id
      },
      isShowMode (field, consumer) {
        return this.isEditMode(field, consumer) === false && this.isCreateMode(consumer) === false
      },
      editField (field, consumer) {
        this.setEditMode({ field, consumer })
      },
      sortData () {
        this.sortConsumers(this.sortBy)
      },
      getConsumers () {
        axios.get('/api/v1/consumers')
          .then(response => {
            this.setConsumers(response.data)
          })
          .catch((error) => {
            this.handleErrors(error.response.data)
          })
      },
      deleteConsumer (index, consumer) {
        this.errors = []
        if (confirm('Are you sure want to delete it?')) {
          this.busy = true
          if (!consumer.id) {
            this.removeConsumer(index)
            this.busy = false
            return
          }

          axios.delete(`/api/v1/consumers/${consumer.id}`)
            .then((resp) => {
              this.removeConsumer({ index: null, id: consumer.id })
              this.busy = false
            })
            .catch(error => {
              this.busy = false
              this.handleErrors(error.response.data)
            })
        }
      },
      addConsumer (consumer) {
        if (!consumer) {
          consumer = {
            name: '',
            age: null,
            city: ''
          }
          this.toggleCreateMode(true)
          this.createConsumer(consumer)
          return
        }

        this.storeConsumer(consumer)
      },
      storeConsumer (consumer) {
        this.errors = []
        this.busy = true

        const payload = {
          name: consumer.name,
          age: consumer.age,
          city: consumer.city
        }

        return axios
          .post(`/api/v1/consumers`, payload)
          .then((response) => {
            this.busy = false
            this.updateSearchText('')
            this.sortBy = this.sortByDefault
            this.sortData()

            const index = this.filteredConsumers.length - 1
            this.updateConsumer({ consumer: response.data, index })
            this.toggleCreateMode(false)
          })
          .catch(error => {
            this.busy = false
            this.handleErrors(error.response.data)
          })
      },
      updateField (field, consumer) {
        this.errors = []
        this.busy = true
        const payload = {
          [field]: this.temp[field]
        }

        if (consumer.id) {
          return axios.put(`/api/v1/consumers/${consumer.id}`, payload)
            .then((response) => {
              this.busy = false
              this.updateConsumer({ consumer: response.data })
              this.removeEditMode(field, response.data)
            })
            .catch(error => {
              this.busy = false
              this.handleErrors(error.response.data)
            })
        }
      },
      cancelUpdate (field, consumer) {
        this.removeEditMode(field, consumer)
      },
      handleErrors (errors) {
        if (errors.hasOwnProperty('errors')) {
          Object.keys(errors.errors).forEach((key) => {
            this.errors[key] = errors.errors[key][0]
          })
        }
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./consumers.css"></style>

