<template>
  <v-touch v-on:swiperight="onSwipeRight" v-on:swipeleft="onSwipeLeft" tag="div" v-if="active" class="tab-container">
    <slot>
    </slot>
  </v-touch>
</template>
<script>
  import {component as VTouch} from 'vue-touch'
  export default{
    name: 'v-tab',
    components: {
      VTouch
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      /***
       * Function to execute before tab switch. Return value must be boolean
       * If the return result is false, tab switch is restricted
       */
      beforeChange: {
        type: Function
      },
      route: {
        type: [String, Object]
      },
      transitionName: String,
      transitionMode: String
    },
    computed: {
      isValidParent () {
        return this.$parent.$options.name === 'vue-tabs'
      }
    },
    data () {
      return {
        active: false
      }
    },
    methods: {
      onSwipeLeft () {
        if (this.isValidParent) {
          let activeTabIndex = this.$parent.activeTabIndex
          this.$parent.changeTab(activeTabIndex, activeTabIndex + 1)
        }
      },
      onSwipeRight () {
        if (this.isValidParent) {
          let activeTabIndex = this.$parent.activeTabIndex
          this.$parent.changeTab(activeTabIndex, activeTabIndex - 1)
        }
      }
    }
  }
</script>
