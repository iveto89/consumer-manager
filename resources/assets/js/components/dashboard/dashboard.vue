<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card-body">
          <consumers/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Consumers from '../consumers/consumers.vue'

  export default {
    components: {
      Consumers
    }
  }
</script>
