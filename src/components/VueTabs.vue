<template>
  <div class="vue-tabs" :class="stackedClass">
    <ul :class="classList">

      <slot name="tab" v-for="(tab, index) in tabs"
            :tab="tab"
            :index="index"
            :click-handler="navigateToTab">
        <li :class="{active:tab.active}" class="tab" :key="tab">
          <span v-if="textPosition === 'top'" class="title title_top" :style="tab.active ? activeTitleColor: {}">
              {{tab.title}}
          </span>

          <a href="" @click.prevent="navigateToTab(index)" :style="tab.active ? activeTabStyle : {}">
            <i :class="tab.icon">
              <span v-if="textPosition === 'center'">
                 {{tab.title}}
              </span>
            </i>
          </a>

          <span v-if="textPosition === 'bottom'" class="title title_bottom"
                :style="tab.active ? activeTitleColor: {}">
              {{tab.title}}
          </span>

        </li>
      </slot>

    </ul>
    <div class="tab-content">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'vue-tabs',
    props: {
      activeTabColor: String,
      activeTextColor: String,
      /**
       * Tab title position: center | bottom | top
       */
      textPosition: {
        type: String,
        default: 'center'
      },
      /**
       * Tab type: tabs | pills
       */
      type: {
        type: String,
        default: 'tabs'
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      /**
       * Centers the tabs and makes the container div full width
       */
      centered: Boolean,
      /***
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
      tabCount () {
        return this.tabs.length
      },
      isTabShape () {
        return this.type === 'tabs'
      },
      isStacked () {
        return this.direction === 'vertical'
      },
      classList () {
        let navType = this.isTabShape ? 'nav-tabs' : 'nav-pills'
        let centerClass = this.centered ? 'nav-justified' : ''
        let isStacked = this.isStacked ? 'nav-stacked' : ''
        let classes = `nav ${navType} ${centerClass} ${isStacked}`
        return classes
      },
      stackedClass () {
        return this.isStacked ? 'stacked' : ''
      },
      activeTabStyle () {
        return {
          backgroundColor: this.activeTabColor,
          color: this.activeTextColor
        }
      },
      activeTitleColor () {
        return {
          color: this.activeTabColor
        }
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
        if (newIndex < 0 || newIndex >= this.tabCount) {
          return
        }
        let oldTab = this.tabs[oldIndex]
        let newTab = this.tabs[newIndex]
        if (oldTab) {
          oldTab.active = false
          if (newTab) {
            newTab.active = true
          }
        }
        this.activeTabIndex = newIndex
        this.$emit('tab-change', newIndex, newTab, oldTab)
        this.tryChangeRoute(newTab)
      },
      tryChangeRoute (tab) {
        if (this.$router && tab && tab.route) {
          this.$router.push(tab.route)
        }
      }
    },
    mounted () {
      this.tabs = this.$children.filter((comp) => comp.$options.name === 'v-tab')
      if (this.tabs.length > 0 && this.startIndex === 0) {
        let firstTab = this.tabs[this.activeTabIndex]
        firstTab.active = true
        this.tryChangeRoute(firstTab)
      }
      if (this.startIndex < this.tabs.length) {
        let tabToActivate = this.tabs[this.startIndex]
        this.activeTabIndex = this.startIndex
        tabToActivate.active = true
        this.tryChangeRoute(this.tabs[this.startIndex])
      } else {
        console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of tabs - ${this.tabs.length}. Make sure that the starting index is less than the number of tabs registered`)
      }
    }
  }
</script>
<style>
</style>
<style lang="scss">
  @import "./../assets/tabs";
</style>
