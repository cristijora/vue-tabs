<template>
  <div>
    <vue-tabs class="card"
              active-tab-color="#e74c3c"
              active-text-color="white"
              disabled-color="lightgrey"
              disabled-text-color="grey"
              centered
              type="pills"
              @tab-change="handleTabChange"
              @on-error="handleError">
          
          <v-tab          
             aniimate-in-class="animated flipInX"
             title="tab-1">       
             <h1> this tab-1</h1>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
        </v-tab>
          <v-tab 
             aniimate-in-class="animated rollIn"
             title="tab-2">
             <h1> this tab-2</h1>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
        </v-tab>
          <v-tab 
             aniimate-in-class="animated zoomIn"
             title="tab-3">
             <h1> this tab-3</h1>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
             <p>Eiusmod elit nostrud culpa nisi in officia reprehenderit laborum est tempor. Cillum officia esse mollit velit eiusmod dolor eiusmod tempor cupidatat nisi Lorem do reprehenderit deserunt. Exercitation Lorem voluptate sint sunt irure.</p>
        </v-tab>
       
    
    </vue-tabs>
    <!-- <button @click="tabList.push({name:'test'})">Add more!</button> -->
    <!-- <button @click="tabList.splice(0,1)">Remove first</button> -->
  </div>
</template>

<script>

  export default {
    name: 'app',
    data(){
      return {
        transitionName: "animated zoomIn"
      }
    },
    methods: {
      handleError(error){
        this.error = error
      },
      handleTabChange(tabIndex, newTab, oldTab){
          console.log(tabIndex, newTab.title, oldTab.title)
      }
    }
  }
</script>
<style lang="scss">
  /*.vue-tabs .active_tab{
    background-color: #4caf50 !important;
    box-shadow: 0 4px 20px 0px rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(#4caf50, 0.4) !important;
  }*/
  @import '../node_modules/animate.css/animate.min.css';
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
