<template>
  <div>
    <vue-tabs class="card col-xs-8 col-xs-offset-2">
      <tab-content title="First tab" icon="ti-">
        <div class="col-xs-10">First tab</div>
      </tab-content>

      <tab-content title="Second tab">
        <div class="col-xs-10">Second</div>
      </tab-content>

      <tab-content title="Third tab">
        <div class="col-xs-10">Third tab</div>
      </tab-content>
    </vue-tabs>
  </div>
</template>

<script>

  export default {
    name: 'app',
    methods: {
      onComplete () {
        alert('Yay!')
      }
    }
  }
</script>
<style lang="scss">
  $border-radius-extreme: 6px !default;
  $white-color: white;
  $gray-input-bg: #F3F2EE !default;
  $card-black-color: #252422 !default;

  body {
    margin-top: 20px;
    background-color: #ecf0f1;
  }

  .card-footer {
    padding: 0px 20px;
  }

  .card {
    border-radius: $border-radius-extreme;
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
    background-color: $white-color;
    color: $card-black-color;
    padding: 10px 0;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

</style>
