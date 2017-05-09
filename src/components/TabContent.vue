<template>
  <div>
    <slot>
    </slot>
  </div>
</template>
<script>
  export default{
    name: 'v-tab',
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
    }
  }
</script>
