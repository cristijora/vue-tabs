<template>
  <div class="vue-tabs">
    <ul class="nav nav-tabs">
      <li v-for="(tab, index) in tabs" :class="{active:tab.active}">
        <a href="" @click.prevent="navigateToTab(index)">
          <div v-if="tab.active">
            <i :class="tab.icon">{{tab.title}}</i>
          </div>
          <i v-if="!tab.active" :class="tab.icon" class="icon">{{tab.title}}</i>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      /***
       * Applies to text, border and circle
       */
      color: {
        type: String,
        default: '#e74c3c'
      },
      shape: {
        type: String,
        default: 'tab'
      },
      /**
       * Name of the transition when transition between steps
       * */
      transition: {
        type: String,
        default: ''
      },
      /***
       *
       * Index of the initial tab to display
       */
      startIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        activeTabIndex: 0,
        tabs: []
      }
    },
    computed: {
      isTabShape () {
        return this.shape === 'tab'
      }
    },
    methods: {
      navigateToTab (index) {
        if (this.beforeTabChange(this.activeTabIndex)) {
          this.changeTab(this.activeTabIndex, index)
        }
      },
      beforeTabChange (index) {
        let oldTab = this.tabs[index]
        if (oldTab && oldTab.beforeChange !== undefined) {
          return oldTab.beforeChange()
        }
        return true
      },
      changeTab (oldIndex, newIndex) {
        let oldTab = this.tabs[oldIndex]
        let newTab = this.tabs[newIndex]
        if (oldTab) {
          oldTab.show = false
          oldTab.active = false
        }
        if (newTab) {
          newTab.show = true
          newTab.active = true
        }
        this.activeTabIndex = newIndex
        this.tryChangeRoute(newTab)
        return true
      },
      tryChangeRoute (tab) {
        if (this.$router && tab.route) {
          this.$router.push(tab.route)
        }
      }
    },
    mounted () {
      this.tabs = this.$children.filter((comp) => comp.$options.name === 'tab-content')
      if (this.tabs.length > 0) {
        let firstTab = this.tabs[this.activeTabIndex]
        firstTab.show = true
        firstTab.active = true
        this.tryChangeRoute(firstTab)
      }
      if (this.startIndex < this.tabs.length) {
        this.activeTabIndex = this.startIndex
        this.tryChangeRoute(this.tabs[this.startIndex])
      } else {
        console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of tabs - ${this.tabs.length}. Make sure that the starting index is less than the number of tabs registered`)
      }
    },
    watch: {
      activeTabIndex: function (newVal, oldVal) {
        if (this.beforeTabChange(oldVal)) {
          this.changeTab(oldVal, newVal)
        }
      }
    }
  }
</script>
<style>
</style>
<style lang="scss">
  @import "./../assets/tabs";
</style>
