<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <input
              type="text"
              @keyup="search"
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

        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="consumer, index in getFilteredConsumers">
              <td>{{ index + 1 }}</td>
              <td class="tableRow" :class="{ 'text-success': consumer.age < 18, 'text-danger': consumer.age > 60 }">
                <input
                  v-if="isEditable('name', consumer)"
                  class="form-control"
                  v-model="temp.name"
                  minlength="4"
                  maxlength="40"
                  spellcheck="false" />
                <div v-if="isEditable('name', consumer)"
                   @click="updateField('name', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditable('name', consumer)"
                  @click.prevent.stop="cancelUpdate('name', consumer)"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-else
                  :class="{
                    title: true,
                    cursor: true,
                    error: error
                  }"
                 @dblclick="editField('name', consumer)">{{ consumer.name }}</span>
              </td>
              <td>
                <input
                  v-if="isEditable('age', consumer)"
                  class="form-control"
                  v-model="consumer.age"
                  minlength="14"
                  maxlength="99"
                  spellcheck="false" />
                <div v-if="isEditable('age', consumer)"
                   @click="updateField('age', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditable('age', consumer)"
                  @click.prevent.stop="updateField"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-else
                  :class="{
                    title: true,
                    cursor: true,
                    error: error
                  }"
                  @dblclick="editField('age', consumer)">{{ consumer.age }}</span>
              </td>
              <td>
                <input
                  v-if="isEditable('city', consumer)"
                  class="form-control"
                  v-model="consumer.city"
                  minlength="14"
                  maxlength="99"
                  spellcheck="false" />
                <div v-if="isEditable('city', consumer)"
                   @click="updateField('city', consumer)"
                   class="tickIcon text-success"></div>
                <span v-if="isEditable('city', consumer)"
                  @click.prevent.stop="updateField"
                  class="cancelIcon"
                  title="Cancel"></span>
                <span
                  v-else
                  :class="{
                    title: true,
                    cursor: true,
                    error: error
                  }"
                  @dblclick="editField('city', consumer)">{{ consumer.city }}</span>
              </td>
              <td>
                <a href="javascript:;"
                   class="btn btn-xs btn-danger"
                   :disabled="busy"
                   @click="deleteConsumer(consumer.id)">
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="uppercase">NAME</td>
              <td class="uppercase">AGE</td>
              <td class="uppercase">CITY</td>
              <td>
                <a href="javascript:;"
                  class="btn btn-xs btn-danger uppercase"
                  :disabled="busy"
                  @click="addConsumer(consumer.id, index)">
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
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapGetters, mapActions } = createNamespacedHelpers('consumers')

  export default {
    data: function () {
      return {
        sortBy: { id: 'idAsc', name: 'ID Asc' },
        sortOptions: [
          { id: 'id-asc', name: 'ID Asc' },
          { id: 'id-desc', name: 'ID Desc' },
          { id: 'name-asc', name: 'Name Asc' },
          { id: 'name-desc', name: 'Name Desc' }
        ],
        busy: null,
        error: false
      }
    },
    computed: {
      ...mapState([
        'searchText',
        'editModeField',
        'editedConsumer',
        'temp'
      ]),
      ...mapGetters([
        'consumers',
        'filteredConsumers'
      ]),
      getFilteredConsumers () {
        return this.filteredConsumers || this.consumers
      }
    },
    components: {
      Multiselect
    },
    created () {
      this.getConsumers()
    },
    methods: {
      ...mapActions([
        'getConsumers',
        'removeConsumer',
        'sortConsumers',
        'searchConsumers',
        'updateConsumer',
        'setEditMode',
        'removeEditMode',
        'setSearchText'
      ]),
      sortData () {
        this.sortConsumers(this.sortBy)
      },
      search (element) {
        this.setSearchText(element.target.value)
        this.searchConsumers()
      },
      deleteConsumer (id) {
        if (confirm('Are you sure want to delete it?')) {
          this.busy = true
          axios.delete(`/api/v1/consumers/${id}`)
            .then((resp) => {
              this.removeConsumer(id)
              this.busy = false
            })
            .catch(error => {
              this.busy = false
              console.error(error.error)
            })
        }
      },
      isEditable (field, consumer) {
        return this.editedConsumer === consumer && this.editModeField === field
      },
      editField (field, consumer) {
        this.setEditMode({ field, consumer })
      },
      updateField (field, consumer) {
        this.busy = true
        const payload = {
          [field]: this.temp[field]
        }
        axios.put(`/api/v1/consumers/${consumer.id}`, payload)
          .then((response) => {
            this.busy = false
            this.updateConsumer(response.data)
            this.removeEditMode(field, response.data)
            this.sortData()
            this.searchConsumers()
          })
          .catch(error => {
            this.busy = false
            console.error(error.error)
          })
      },
      cancelUpdate (field, consumer) {
        this.removeEditMode(field, consumer)
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./consumers.css"></style>
<!--<style module lang="less" src="./consumers.less"></style>-->

