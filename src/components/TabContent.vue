<template>
  <section class="tab-container"
           role="tabpanel"
           :id="hash"
           :aria-hidden="!active">
    <slot name="title"></slot>
    <slot>
    </slot>
  </section>
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
      id: String,
      route: {
        type: [String, Object]
      },
      transitionName: String,
      transitionMode: String
    },
    computed: {
      isValidParent () {
        return this.$parent.$options.name === 'vue-tabs'
      },
      hash () {
        return `#${this.id}`
      }
    },
    data () {
      return {
        active: false,
        validationError: null
      }
    }
  }
</script>
