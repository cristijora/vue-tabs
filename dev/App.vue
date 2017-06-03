<template>
  <div>
    <vue-tabs class="card" @on-error="handleError">
      <!--<template slot="tab" scope="props">
        <li :class="{active:props.tab.active}" >
          <a href="" @click.prevent="props.clickHandler(props.index)" style="border-radius:50%">
           {{props.tab.title}}
          </a>
        </li>
      </template>-->
      <v-tab title="First tab" icon="ti-bag" :before-change="validateFirstTab">
        <div>adsdaasd</div>
        <div>adsdaasd</div>
        <div>adsdaasd</div>
        <div>adsdaasd</div>
        <div>adsdaasd</div>
      </v-tab>

      <v-tab title="Second tab" icon="ti-bag">
        Second
      </v-tab>

      <v-tab title="Third tab" icon="ti-bag">
        Third tab
      </v-tab>

      <div v-if="error">{{error}}</div>
    </vue-tabs>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data(){
      return {
        error: '',
      }
    },
    methods: {
      handleError(error){
        this.error = error
      },
      validateFirstTab(){
        return new Promise((resolve, reject) => {
          resolve(true)
        })
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

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for <2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

</style>
